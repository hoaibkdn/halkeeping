// @ts-nocheck
import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import Field from '../../components/Form/Field';
import { Label, Textarea } from '../../components/Form/style';
import { connect } from 'react-redux';
import { PublicReducer } from '../redux/reducer';
import {
  Form,
  Schema,
  Button,
  SelectPicker,
  DatePicker,
  Checkbox,
  CheckboxGroup,
  Modal,
} from "rsuite";
import moment from 'moment';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getJobDetails } from './actions';

const Container = styled.div`
  width: 60%;
  margin: 110px auto;
`;

const Title = styled.h6`
  color: #606060;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 650;
`;

const Note = styled.p`
  color: #b29700;
  font-size: 17px;
  margin-bottom: 20px;
`;

const Col = styled.div`
  width: 47%;
`;

const Row = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const optionsPay = [
  {
    value: 'Tiền mặt',
    label: 'Tiền mặt',
  },
  {
    value: 'Thẻ thanh toán',
    label: 'Thẻ thanh toán',
  },
];

const optionsHours = [
  {
    value: 1,
    label: '1 Tiếng',
  },
  {
    value: 2,
    label: '2 Tiếng',
  },
  {
    value: 3,
    label: '3 Tiếng',
  },
  {
    value: 4,
    label: '4 Tiếng',
  },
  {
    value: 5,
    label: '5 Tiếng',
  },
  {
    value: 6,
    label: '6 Tiếng',
  },
  {
    value: 7,
    label: '7 Tiếng',
  },
  {
    value: 8,
    label: '8 Tiếng',
  },
];

const optionsCleaners = [
  {
    value: 1,
    label: '1 Người',
  },
  {
    value: 2,
    label: '2 Người',
  },
  {
    value: 3,
    label: '3 Người',
  },
  {
    value: 4,
    label: '4 Người',
  },
];

const optionsMinutes = [
  {
    value: 10,
    label: '10 Phút',
  },
  {
    value: 20,
    label: '20 Phút',
  },
  {
    value: 30,
    label: '30 Phút',
  },
  {
    value: 40,
    label: '40 Phút',
  },
  {
    value: 50,
    label: '50 Phút',
  },
];

interface State {
  publicPages: PublicReducer;
}

const JobDetails: FC<any> = ({
  currentJob,
  getJobDetails,
  jobs
}) => {



  // const [isSuccess, setIsSuccess] = useState(false);
  // const handleClose = () => setIsSuccess(false);

  // useEffect(() => {
  //   getProvinces();
  //   getBasicInfo({
  //     durationTime: getDurationTime(),
  //     cleaningTool: {
  //       basic: formValue?.tool?.includes('toolBasic'),
  //       vacuum: formValue?.tool?.includes('toolCleaner'),
  //     },
  //     requestedTime: {
  //       timeStamp: getTimeStamp(),
  //       timeZone: getTimeZone(),
  //     },
  //   });
  //   return () => {};
  // }, []);

  // const workingTime = {
  //   start: basicInfo?.validWorkingTime?.start,
  //   end: basicInfo?.validWorkingTime?.end,
  //   dailyWorkingTime: basicInfo?.validWorkingTime?.dailyWorkingTime || {
  //     start: 8,
  //     end: 18,
  //   },
  // };

  // const getTimeZone = () => {
  //   return -(new Date().getTimezoneOffset() / 60);
  // };

  // const getTimeStamp = () => {
  //   return new Date().getTime();
  // };

  // const getDurationTime = () =>
  //   Number(formValue?.hour || 0) * 60 + Number(formValue?.minutes || 0);

  // const history = useHistory();
  // const onSubmit = () => {
  //   const data = {
  //     ...formValue,
  //     address: `${formValue.numberHouse},
  //     ${
  //       getWards(formValue.district).filter(
  //         (i: any) => i.value === formValue.ward
  //       )[0]?.label
  //     },
  //     ${
  //       districts?.filter((i: any) => i.value === formValue.district)[0]?.label
  //     }`,
  //     durationTime: `${formValue.hour} tiếng ${formValue.minutes || 0} phút`,
  //     payMethod: formValue.pay || "Tiền mặt",
  //     countPay: basicInfo?.total | 0,
  //   };

  //   book(data);

  //   history.push(`/book-confirm`);
  // };

  // const onChange = (value: any, type: string) => {
  //   const durationTime =
  //     type === 'hour'
  //       ? Number(value || 0) * 60 + Number(formValue?.minutes || 0)
  //       : type === 'minutes'
  //       ? Number(formValue?.hour || 0) * 60 + Number(value || 0)
  //       : Number(value || 0) * 60 + Number(formValue?.minutes || 0);

  //   if (type === 'hour' || type === 'minutes') {
  //     getBasicInfo({
  //       durationTime,
  //       cleaningTool: {
  //         basic: formValue?.tool?.includes('toolBasic'),
  //         vacuum: formValue?.tool?.includes('toolCleaner'),
  //       },
  //     });
  //   }

  //   if (type === 'tool') {
  //     getBasicInfo({
  //       durationTime: getDurationTime(),
  //       cleaningTool: {
  //         basic: !!value?.filter((i: any) => i === 'toolBasic').length,
  //         vacuum: !!value?.filter((i: any) => i === 'toolCleaner').length,
  //       },
  //     });
  //   }
  // };

  const id = window.location.pathname.split('/'). pop()

  useEffect(() => {
    const id = window.location.pathname

    getJobDetails(id)
  }, [])

  console.log('window.location.pathname', window.location.pathname)
  const job = jobs.find(item => id === item.customer._id)
  const details = {
    ...job?.customer,
    ...job.jobDetail
  }

  console.log(details)

  const [formValue, setFormValue] = React.useState({
    name: details.name,
    phone: details.phone,
    email: details.email,
    address: details.address.replace('\n', ''),
    preferDate: new Date(details.preferDate.split(' ')[0]),
    cleaningTool: details.cleaningTool,
    basicTool: details.cleaningTool === "Basic tool",
    vacuum: details.cleaningTool.includes('vacuum'),
    cleaningToolFee: JSON.parse(details.cleaningToolFee),
    durationTime: details.durationTime,
    pricePerHour: details.pricePerHour,
    total: details.total,
    note: details?.note,
  } as any);

  // const formRef = React.useRef();

  // const handleSubmit = () => {
  //   if ((formRef?.current as any)?.check()) {
  //     setIsSuccess(true);
  //   }
  // };

  const { StringType, NumberType, DateType, BooleanType } = Schema.Types;

  const model = Schema.Model({
    name: StringType(),
    phone: StringType(),
    email: StringType(),
    address: StringType().isRequired('Vui lòng nhập address'),
    preferDate: DateType().isRequired('Vui lòng chọn ngày làm việc'),
    durationTime: NumberType().isRequired('Vui Lòng nhập số giờ làm'),
    cleaningTool: NumberType(),
    pricePerHour: StringType(),
    note:StringType(),
    total: StringType(),
  });

  return (
    <>
      <Container>
        <Title>Đặt dịch vụ theo giờ</Title>
        <Form
          // ref={formRef as any}
          // model={model}
          onChange={() => {}}
          formValue={formValue}
        >
          <Field
            label='Tên khách hàng'
            name='name'
            placeholder='Vui lòng điền tên người đặt dịch vụ'
          />
          <Field
            label='Số điện thoại *'
            name='phone'
            placeholder='Nhập số điện thoại'
          />
          <Field
            label='Email *'
            name='email'
            placeholder='Email để xác nhận đơn dọn vệ sinh'
          />
          <Field
            label='Địa chỉ'
            name='address'
            // onChange={(e: any) => onChangeDistricts(e)}
          />
          <Field
            label="Ngày làm*"
            accepter={DatePicker}
            name='preferDate'
            placeholder="Chọn ngày làm"
          />
          <Field
            label='Giờ làm'
            name='durationTime'
            // onChange={(e: any) => onChangeDistricts(e)}
          />
          <Field
            label='Dụng cụ'
            name='cleaningTool'
            // onChange={(e: any) => onChangeDistricts(e)}
          />
          <Field
            label='Số tiền 1 giờ'
            name='pricePerHour'
            // onChange={(e: any) => onChangeDistricts(e)}
          />
          <Field
            label='Total'
            name='total'
            // onChange={(e: any) => onChangeDistricts(e)}
          />
          
          <Form.Group controlId={`tool-3`}>
            <Form.Control
              name="tool"
              accepter={CheckboxGroup}
              // onChange={(e: any) => onChange(e, "tool")}
            >
              <Checkbox
                checked={formValue.basicTool}
              >{`Dụng cụ cơ bản - phụ phí: ${formValue?.cleaningToolFee?.basic} vnd`}</Checkbox>
              <Form.HelpText style={{ margin: "-10px 0 10px 10px" }}>
                Chổi, cây lau nhà, xô chậu, dẻ, vim, nước lau sàn, dụng cụ chùi
                toilet,...
              </Form.HelpText>
              <Checkbox
                checked={formValue.vacuum}
              >{`Máy hút bụi vừa(hút thảm hoặc ghế sofa, nệm) - ${formValue?.cleaningToolFee?.vacuum} vnd`}</Checkbox>
            </Form.Control>
          </Form.Group>
          <Field
            label="Dặn dò thêm"
            rows={5}
            name="note"
            accepter={Textarea}
            placeholder="Bạn có thể ghi chú thêm những việc bạn muốn nhân viên dọn vệ sinh chú ý khi làm"
          />
          <Row>
            <div>
              <span>Tổng</span>:{" "}
              <span style={{ color: "#01527C", fontSize: "30px" }}>
                {formValue.total} đồng
              </span>
            </div>

            <Button
              type="submit"
              style={{
                borderColor: "#042C41",
                backgroundColor: "#042C41",
                width: "150px",
                height: "60px",
                color: "#fff",
              }}
              // onClick={handleSubmit}
            >
              Xác Nhận
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
};

const mapDispatchToProps = {
  getJobDetails,
};

const mapStateToProps = (state) => {
  const jobs = state.adminInfo.jobs.list || [];
  return {
    jobs,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(JobDetails as any);
