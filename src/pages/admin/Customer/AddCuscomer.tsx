import {
  Form,
  Schema,
  ButtonToolbar,
  Button,
} from 'rsuite';
import { useRef, useEffect, useState, FC } from 'react';
import Field from '../../../components/Form/Field';
import { asyncCheckPhone } from '../../../components/Form/form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { addCleaner, getCustomerDetails, editCustomer } from '../actions';
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

const AddCleanerForm: FC<any> = ({ addCleaner, getCustomerDetails, customerDetails, editCustomer }) => {
  console.log('customerDetails', customerDetails)
  const id = window.location.pathname.split("/").pop();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  } as any);
  const formRef = useRef();
  const history = useHistory();


  useEffect(() => {
    getCustomerDetails(id)
  }, [id])

  useEffect(() => {
    if(id && customerDetails) {
      setFormData(customerDetails)
    }
  }, [id, customerDetails])

  // const onChangeDistricts = useCallback((val: string) => {
  //   const options = getWards(val);

  //   setWardsOptions(options || []);
  // }, []);

  const { StringType } = Schema.Types;

  const model = Schema.Model({
    name: StringType().isRequired('Vui lòng nhập tên nhân viên'),
    phone: StringType()
      .isRequired('Vui lòng nhập số điện thoại')
      .addRule(
        (value, data) => asyncCheckPhone(value),
        'Vui lòng nhập đúng số điện thoại hợp lệ'
      ),
    address: StringType().isRequired('Vui lòng chọn thông tin chọn quận'),
    email: StringType(),
  });

  const onSubmit = async () => {
    if ((formRef?.current as any)?.check()) {
      const {
        name,
        phone,
        address,
        email,
      } = formData;

      if(id) {
        await editCustomer({
          name,
          phone,
          email,
          address,
        }, id);
  
        history.push(`/admin/customers`);

        return
      }

      // await addC({
      //   name,
      //   phone,
      //   email,
      //   address,
      // });

      // history.push(`/admin/customers`);
    }
  };

  return (
    <div style={{ width: '80%', margin: '50px auto' }}>
      <Title></Title>
      <Form
        layout='horizontal'
        ref={formRef as any}
        model={model}
        onChange={setFormData}
        formValue={formData}
      >
        <Field
          label='Teen Khách hàng'
          name='name'
          placeholder='Vui lòng điền tên khách hàng'
        />

        <Field
          label='Số điện thoại *'
          name='phone'
          placeholder='Nhập số điện thoại'
        />
        <Field
          label='Địa chỉ'
          name='address'
          placeholder='Vui lòng điền thông tin địa chỉ cụ thể'
        />
        <Field
          label='Email'
          name='email'
          placeholder='Nhập email'
        />  

        <ButtonToolbar>
          <Button appearance='primary' type='submit' onClick={onSubmit}>
            Submit
          </Button>
          <Button appearance='default'>Cancel</Button>
        </ButtonToolbar>
      </Form>
    </div>
  );
};

const mapDispatchToProps = {
  // getProvinces,
  addCleaner,
  getCustomerDetails,
  editCustomer
};

const mapStateToProps = (state: State) => { 

  // console.log('state?.publicPages?.customers', state?.publicPages)
  
  return{
  // provinces: state?.publicPages.province,
  customerDetails: state?.adminInfo?.customers.customerDetail
}};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCleanerForm as any);
