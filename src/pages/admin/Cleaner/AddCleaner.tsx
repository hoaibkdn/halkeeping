import {
  Form,
  Schema,
  ButtonToolbar,
  Button,
  Row,
  SelectPicker,
  Container,
  Toggle,
} from 'rsuite';
import { useRef, useEffect, useState, FC, useCallback } from 'react';
import Field from '../../../components/Form/Field';
import { asyncCheckPhone } from '../../../components/Form/form';
import { getProvinces } from '../../redux/actions';
import { connect } from 'react-redux';
import { Label } from '../../../components/Form/style';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { addCleaner } from '../actions';

export interface PublicReducer {
  type: string;
  book: any;
  province: any;
}

interface State {
  publicPages: PublicReducer;
}

const Title = styled.h6`
  color: #606060;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 650;
`;

const AddCleanerForm: FC<any> = ({ getProvinces, provinces, addCleaner }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    facebook: '',
    district: '',
    ward: '',
    numberHouse: '',
    isActive: true,
  } as any);
  const formRef = useRef();
  const history = useHistory();

  const districts = provinces?.districts?.map((i: any) => {
    return {
      value: i.codename,
      label: i.name,
      wards: i.wards,
    };
  });
  const getWards = (value: string) => {
    return districts
      ?.filter((i: any) => i.value === value)?.[0]
      ?.wards?.map((k: any) => ({
        value: k.codename,
        label: k.name,
      }));
  };
  const [wards, setWardsOptions] = useState([]);

  useEffect(() => {
    getProvinces();
    setWardsOptions(getWards(formData.district));
    return () => {};
  }, []);

  const onChangeDistricts = useCallback((val: string) => {
    const options = getWards(val);

    setWardsOptions(options || []);
  }, []);

  const { StringType, BooleanType } = Schema.Types;

  const onChangeRadio = (checked: boolean) => {
    setFormData({
      ...formData,
      isActive: checked,
    });
  };

  const model = Schema.Model({
    name: StringType(),
    phone: StringType()
      .isRequired('Vui Lòng nhập số điện thoại')
      .addRule(
        (value, data) => asyncCheckPhone(value),
        'Vui lòng nhập đúng số điện thoại hợp lệ'
      ),
    address: StringType().isRequired('Vui lòng chọn thông tin chọn quận'),
    ward: StringType().isRequired('Vui lòng chọn thông tin chọn phường/xã'),
    numberHouse: StringType().isRequired(
      'Vui lòng điền thông tin địa chỉ cu thể'
    ),
    isActive: BooleanType(),
  });
  

  const onSubmit = async () => {
    const {
      name,
      phone,
      facebook,
      district,
      ward,
      numberHouse,
      isActive,
    } = formData
    await addCleaner({
      name, phone, facebook, address: `${numberHouse}, ${ward}, ${district}`,  isActive
    })

    history.push(`/admin/cleaners`);
  }

  return (
    <div style={{ width: '80%', margin: '50px auto' }}>
      <Title>Thêm nhân viên</Title>
      <Form
        layout='horizontal'
        ref={formRef as any}
        model={model}
        onChange={setFormData}
        formValue={formData}
      >
        <Field
          label='Tên nhân viên'
          name='name'
          placeholder='Vui lòng điền tên nhân viên'
        />

        <Field
          label='Số điện thoại *'
          name='phone'
          placeholder='Nhập số điện thoại'
        />
        <Field
          label='Facebook'
          name='facebook'
          placeholder='Vui lòng điền link facebook'
        />
        <Row>
          <Label>Địa chỉ *</Label>
        </Row>
        <Field
          label='Quận/ Huyện'
          name='district'
          accepter={SelectPicker}
          placeholder='Vui lòng chọn quận'
          onChange={(e: any) => onChangeDistricts(e)}
          data={districts}
        />
        <Field
          label='Phường/ xã'
          name='ward'
          accepter={SelectPicker}
          placeholder='Vui lòng chọn phường/ xã'
          data={wards}
        />
        <Field
          label='Số nhà cụ thể'
          name='numberHouse'
          placeholder='Vui lòng điền thông tin địa chỉ cụ thể'
          rows={5}
        />

        <Field
          name='ward'
          accepter={() => (
            <Toggle
              onChange={onChangeRadio}
              size='lg'
              checkedChildren='Active'
              unCheckedChildren='InActive'
              checked={formData.isActive}
            />
          )}
          placeholder='Vui lòng chọn phường/ xã'
          data={wards}
        />

        <ButtonToolbar>
          <Button appearance='primary' type="submit" onClick={onSubmit}>Submit</Button>
          <Button appearance='default'>Cancel</Button>
        </ButtonToolbar>
      </Form>
    </div>
  );
};

const mapDispatchToProps = {
  getProvinces,
  addCleaner,
};

const mapStateToProps = (state: State) => ({
  provinces: state?.publicPages.province,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCleanerForm as any);
