import React, { FC, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Field from "../../components/Form/Field";
import { Label, Textarea } from "../../components/Form/style";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getProvinces, book, getBasicInfo } from "../redux/actions";
import { PublicReducer } from "../../pages/redux/reducer";
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
import { asyncCheckPhone } from "../../components/Form/form";
import moment from "moment";

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
    value: "Tiền mặt",
    label: "Tiền mặt",
  },
  {
    value: "Thẻ thanh toán",
    label: "Thẻ thanh toán",
  },
];

const optionsHours = [
  {
    value: 1,
    label: "1 Tiếng",
  },
  {
    value: 2,
    label: "2 Tiếng",
  },
  {
    value: 3,
    label: "3 Tiếng",
  },
  {
    value: 4,
    label: "4 Tiếng",
  },
  {
    value: 5,
    label: "5 Tiếng",
  },
  {
    value: 6,
    label: "6 Tiếng",
  },
  {
    value: 7,
    label: "7 Tiếng",
  },
  {
    value: 8,
    label: "8 Tiếng",
  },
];

const optionsCleaners = [
  {
    value: 1,
    label: "1 Người",
  },
  {
    value: 2,
    label: "2 Người",
  },
  {
    value: 3,
    label: "3 Người",
  },
  {
    value: 4,
    label: "4 Người",
  },
];

const optionsMinutes = [
  {
    value: 10,
    label: "10 Phút",
  },
  {
    value: 20,
    label: "20 Phút",
  },
  {
    value: 30,
    label: "30 Phút",
  },
  {
    value: 40,
    label: "40 Phút",
  },
  {
    value: 50,
    label: "50 Phút",
  },
];

interface State {
  publicPages: PublicReducer;
}

const Book: FC<any> = ({ data = [], getProvinces, book, getBasicInfo }) => {
  const basicInfo = data?.basicInfo;

  const districts = data?.province?.districts?.map((i: any) => {
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
  const [isSuccess, setIsSuccess] = useState(false);
  const handleClose = () => setIsSuccess(false);

  useEffect(() => {
    getProvinces();
    getBasicInfo({
      durationTime: getDurationTime(),
      cleaningTool: {
        basic: formValue?.tool?.includes("toolBasic"),
        vacuum: formValue?.tool?.includes("toolCleaner"),
      },
      requestedTime: {
        timeStamp: getTimeStamp(),
        timeZone: getTimeZone(),
      },
    });
    setWardsOptions(getWards(data?.book?.district));
    return () => {};
  }, []);

  const workingTime = {
    start: basicInfo?.validWorkingTime?.start,
    end: basicInfo?.validWorkingTime?.end,
    dailyWorkingTime: basicInfo?.validWorkingTime?.dailyWorkingTime || {
      start: 8,
      end: 18,
    },
  };

  const getTimeZone = () => {
    return -(new Date().getTimezoneOffset() / 60);
  };

  const getTimeStamp = () => {
    return new Date().getTime();
  };

  const onChangeDistricts = useCallback((val: string) => {
    const options = getWards(val);

    setWardsOptions(options || []);
  }, []);

  const getDurationTime = () =>
    Number(formValue?.hour || 0) * 60 + Number(formValue?.minutes || 0);

  const history = useHistory();
  const onSubmit = () => {
    const data = {
      ...formValue,
      address: `${formValue.numberHouse}, 
      ${
        getWards(formValue.district).filter(
          (i: any) => i.value === formValue.ward
        )[0]?.label
      }, 
      ${
        districts?.filter((i: any) => i.value === formValue.district)[0]?.label
      }`,
      durationTime: `${formValue.hour} tiếng ${formValue.minutes || 0} phút`,
      payMethod: formValue.pay || "Tiền mặt",
      countPay: basicInfo?.total | 0,
    };

    book(data);

    history.push(`/book-confirm`);
  };

  const onChange = (value: any, type: string) => {
    const durationTime =
      type === "hour"
        ? Number(value || 0) * 60 + Number(formValue?.minutes || 0)
        : type === "minutes"
        ? Number(formValue?.hour || 0) * 60 + Number(value || 0)
        : Number(value || 0) * 60 + Number(formValue?.minutes || 0);

    if (type === "hour" || type === "minutes") {
      getBasicInfo({
        durationTime,
        cleaningTool: {
          basic: formValue?.tool?.includes("toolBasic"),
          vacuum: formValue?.tool?.includes("toolCleaner"),
        },
      });
    }

    if (type === "tool") {
      getBasicInfo({
        durationTime: getDurationTime(),
        cleaningTool: {
          basic: !!value?.filter((i: any) => i === "toolBasic").length,
          vacuum: !!value?.filter((i: any) => i === "toolCleaner").length,
        },
      });
    }
  };

  const [formValue, setFormValue] = React.useState({
    name: data?.book?.name,
    phone: data?.book?.phone,
    email: data?.book?.email,
    district: data?.book?.district,
    ward: data?.book?.ward,
    numberHouse: data?.book?.numberHouse,
    date: data?.book?.date ? new Date(data?.book?.date) : null,
    hour: data?.book?.hour,
    minutes: data?.book?.minutes,
    time: data?.book?.time ? new Date(data?.book?.time) : null,
    tool: data?.book?.tool,
    note: data?.book?.note,
    pay: data?.book?.pay,
    durationTime: data?.book?.durationTime,
    countPay: data?.book?.countPay || 0,
  } as any);
  const formRef = React.useRef();

  const handleSubmit = () => {
    if ((formRef?.current as any)?.check()) {
      setIsSuccess(true);
    }
  };

  const { StringType, NumberType, DateType, BooleanType } = Schema.Types;

  const model = Schema.Model({
    name: StringType(),
    phone: StringType()
      .isRequired("Vui Lòng nhập số điện thoại")
      .addRule(
        (value, data) => asyncCheckPhone(value),
        "Vui lòng nhập đúng số điện thoại hợp lệ"
      ),
    email: StringType()
      .isRequired("Vui Lòng nhập Email")
      .isEmail("Vui lòng nhập đúng địa chỉ email"),
    district: StringType().isRequired("Vui lòng chọn thông tin chọn quận"),
    ward: StringType().isRequired("Vui lòng chọn thông tin chọn phường/xã"),
    numberHouse: StringType().isRequired(
      "Vui lòng điền thông tin địa chỉ cu thể"
    ),
    date: DateType().isRequired("Vui lòng chọn ngày làm việc"),
    hour: NumberType().isRequired("Vui Lòng nhập số giờ làm"),
    minutes: NumberType(),
    time: DateType().isRequired("Vui lòng chọn thời gian làm"),
    toolBasic: BooleanType(),
    toolCleaner: BooleanType(),
    note: StringType(),
    pay: StringType(),
  });

  return (
    <>
      <Container>
        <Title>Đặt dịch vụ theo giờ</Title>
        <Form
          ref={formRef as any}
          model={model}
          onChange={setFormValue}
          formValue={formValue}
        >
          <Field
            label="Tên khách hàng"
            name="name"
            placeholder="Vui lòng điền tên người đặt dịch vụ"
          />
          <Field
            label="Số điện thoại *"
            name="phone"
            placeholder="Nhập số điện thoại"
          />
          <Field
            label="Email *"
            name="email"
            placeholder="Email để xác nhận đơn dọn vệ sinh"
          />
          <Row>
            <Label>Địa chỉ *</Label>
          </Row>
          <Field
            label="Quận/ Huyện"
            name="district"
            accepter={SelectPicker}
            placeholder="Vui lòng chọn quận"
            onChange={(e: any) => onChangeDistricts(e)}
            data={districts}
          />
          <Field
            label="Phường/ xã"
            name="ward"
            accepter={SelectPicker}
            placeholder="Vui lòng chọn phường/ xã"
            data={wards}
          />
          <Field
            label="Số nhà cụ thể"
            name="numberHouse"
            placeholder="Vui lòng điền thông tin địa chỉ cụ thể"
            rows={5}
          />
          <Note>
            {/* Để tiết kiệm thời gian, cũng như đễ dàng cho bên mình thu xếp người
            làm, bạn vui lòng đặt trước giúp bên mình, bắt đầu từ{" "}
            {new Date(workingTime.start).getHours()} giờ, ngày{" "}
            {moment(new Date(workingTime.start)).format("DD-MM-YYYY")} */}
            Vùi lòng đặt trước ít nhất 3h để tiện sắp xếp người làm
          </Note>
          <Row>
            <Col>
              <Field
                label="Ngày làm*"
                accepter={DatePicker}
                name="date"
                disabledDate={(date: any) => {
                  const diff =
                    new Date().getDate() -
                    new Date(workingTime.start).getDate() +
                    1;

                  return moment(date).isBefore(
                    moment(new Date()).subtract(diff, "days")
                  );
                }}
                placeholder="Chọn ngày làm"
              />
            </Col>
            <Col>
              <Field
                label="Thời gian làm*"
                name="time"
                format="hh:mm"
                ranges={[]}
                disabledHours={(hour: any) => {
                  let start = new Date(workingTime.start).getHours();
                  let end = workingTime.dailyWorkingTime.end;

                  if (
                    new Date(formValue.date).getDate() -
                      new Date(workingTime.start).getDate() >
                    0
                  ) {
                    start = workingTime.dailyWorkingTime.start;
                  }

                  return hour < start || hour > end;
                }}
                accepter={DatePicker}
                placeholder="Chọn thời gian làm"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                label="Số người làm"
                placeholder="Cleaners"
                name="numberOfCleaners"
                searchable={false}
                onChange={(e: any) => onChange(e, "numberOfCleaners")}
                accepter={SelectPicker}
                data={optionsCleaners}
              />
            </Col>
            <Col style={{ display: "flex" }}>
              <Label width="30%" style={{ marginTop: "10px" }}>
                Số giờ làm*
              </Label>
              <Col>
                <Field
                  placeholder="Hour"
                  name="hour"
                  searchable={false}
                  onChange={(e: any) => onChange(e, "hour")}
                  accepter={SelectPicker}
                  data={optionsHours}
                />
              </Col>
              <Col>
                <Field
                  placeholder="Minutes"
                  name="minutes"
                  accepter={SelectPicker}
                  searchable={false}
                  onChange={(e: any) => onChange(e, "minutes")}
                  data={optionsMinutes}
                />
              </Col>
            </Col>
          </Row>
          <Col>
            <Field
              label="Thanh toán"
              name="pay"
              accepter={SelectPicker}
              placeholder="Tiền mặt"
              searchable={false}
              data={optionsPay}
            />
          </Col>

          <Label>Bạn có cần chúng tôi mang theo dụng cụ?</Label>
          <Form.Group controlId={`tool-3`}>
            <Form.Control
              name="tool"
              accepter={CheckboxGroup}
              onChange={(e: any) => onChange(e, "tool")}
            >
              <Checkbox
                value={"toolBasic"}
              >{`Dụng cụ cơ bản - phụ phí: ${basicInfo?.cleaningToolFee?.basic} vnd`}</Checkbox>
              <Form.HelpText style={{ margin: "-10px 0 10px 10px" }}>
                Chổi, cây lau nhà, xô chậu, dẻ, vim, nước lau sàn, dụng cụ chùi
                toilet,...
              </Form.HelpText>
              <Checkbox
                value={"toolCleaner"}
              >{`Máy hút bụi vừa(hút thảm hoặc ghế sofa, nệm) - ${basicInfo?.cleaningToolFee?.vacuum} vnd`}</Checkbox>
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
                {basicInfo?.total?.toLocaleString("vi")} đồng
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
              onClick={handleSubmit}
            >
              Xác Nhận
            </Button>
          </Row>
        </Form>
      </Container>

      <Modal size="xs" open={isSuccess} onClose={handleClose}>
        <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
          <Modal.Title
            style={{ textAlign: "center", width: "80%", paddingBottom: "30px" }}
          >
            Are you sure you want to leave this page?
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body style={{ textAlign: "center" }}>
          Chúng tôi sẽ sớm liên hệ để hỗ trợ thông tin chi tiết.
        </Modal.Body> */}
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <Button
            appearance="primary"
            style={{ width: "100px" }}
            onClick={() => onSubmit()}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapDispatchToProps = {
  getProvinces,
  book,
  getBasicInfo,
};

const mapStateToProps = (state: State) => ({
  data: state?.publicPages,
});

export default connect(mapStateToProps, mapDispatchToProps)(Book as any);
