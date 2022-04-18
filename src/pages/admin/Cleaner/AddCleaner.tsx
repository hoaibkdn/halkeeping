import {
  Form,
  Schema,
  ButtonToolbar,
  Button,
  Toggle,
} from 'rsuite';
import { useRef, useEffect, useState, FC, useCallback } from 'react';
import Field from '../../../components/Form/Field';
import { asyncCheckPhone } from '../../../components/Form/form';
import { connect } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import styled from 'styled-components';
import { addCleaner, getCleanerDetails, editCleaner } from '../actions';
import { AdminReducer } from '../reducer';

export interface PublicReducer {
  type: string;
  book: any;
  province: any;
}

interface State {
  publicPages: PublicReducer;
  adminInfo: AdminReducer
}

const Title = styled.h6`
  color: #606060;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 650;
`;

const AddCleanerForm: FC<any> = ({ addCleaner, getCleanerDetails, cleanerDetails, editCleaner }) => {
  const {id } = useParams() as {id: string}
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    facebook: '',
    address: '',
    isActive: true,
  } as any);
  const formRef = useRef();
  const history = useHistory();

  // const districts = provinces?.districts?.map((i: any) => {
  //   return {
  //     value: i.codename,
  //     label: i.name,
  //     wards: i.wards,
  //   };
  // });
  // const getWards = (value: string) => {
  //   return districts
  //     ?.filter((i: any) => i.value === value)?.[0]
  //     ?.wards?.map((k: any) => ({
  //       value: k.codename,
  //       label: k.name,
  //     }));
  // };
  // const [wards, setWardsOptions] = useState([]);

  // useEffect(() => {
  //   // getProvinces();
  //   setWardsOptions(getWards(formData.district));
  //   return () => {};
  // }, []);

  useEffect(() => {
    if(id) {
      getCleanerDetails(id)
    }
    return () => {};
  }, [id]);

  useEffect(() => {
    if(id && cleanerDetails) {
      setFormData(cleanerDetails)
    }
    return () => {};
  }, [id, cleanerDetails]);

  // const onChangeDistricts = useCallback((val: string) => {
  //   const options = getWards(val);

  //   setWardsOptions(options || []);
  // }, []);

  const { StringType, BooleanType } = Schema.Types;

  const onChangeRadio = (checked: boolean) => {
    setFormData({
      ...formData,
      isActive: checked,
    });
  };

  const model = Schema.Model({
    name: StringType().isRequired('Vui lòng nhập tên nhân viên'),
    phone: StringType()
      .isRequired('Vui lòng nhập số điện thoại')
      .addRule(
        (value, data) => asyncCheckPhone(value),
        'Vui lòng nhập đúng số điện thoại hợp lệ'
      ),
    address: StringType().isRequired('Vui lòng chọn thông tin chọn quận'),
    isActive: BooleanType(),
  });
  

  const onSubmit = async () => {
    if ((formRef?.current as any)?.check()) {
      const {
        name,
        phone,
        facebook,
        address,
        isActive,
      } = formData
      if(id) {
        await editCleaner({name, phone, facebook, address,  isActive}, id)
        history.push(`/admin/cleaners`);

        return
      }

      await addCleaner({name, phone, facebook, address,  isActive})
      history.push(`/admin/cleaners`);
  
    }
    
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
        <Field
          label='Địa chỉ *'
          name='address'
          placeholder='Vui lòng điền thông tin địa chỉ cụ thể'
        />
        <Field
          name='isActive'
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
  addCleaner,
  getCleanerDetails,
  editCleaner,
};

const mapStateToProps = (state: State) => ({
  provinces: state?.publicPages.province,
  cleanerDetails: state?.adminInfo?.cleanerDetails
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCleanerForm as any);
