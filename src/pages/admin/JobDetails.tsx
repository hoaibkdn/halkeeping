// @ts-nocheck
import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import Field from "../../components/Form/Field";
import { Textarea } from "../../components/Form/style";
import { connect } from "react-redux";
import { PublicReducer } from "../redux/reducer";
import {
  Form,
  Button,
  DatePicker,
  Checkbox,
  CheckboxGroup,
  Modal,
  CheckPicker,
} from "rsuite";
import { getJobDetails, getAllCleaners, editJob } from "./actions";

const Container = styled.div`
  width: 100%;
  margin: 110px auto;
`;

const Title = styled.h6`
  color: #606060;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 650;
`;

export const Note = styled.p`
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

export const optionsPay = [
  {
    value: "Tiền mặt",
    label: "Tiền mặt",
  },
  {
    value: "Thẻ thanh toán",
    label: "Thẻ thanh toán",
  },
];

export const optionsHours = [
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

export const optionsCleaners = [
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

export const optionsMinutes = [
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

const JobDetails: FC<any, State> = ({
  job,
  getJobDetails,
  cleaners,
  getAllCleaners,
  editJob,
}) => {
  const [formValue, setFormValue] = useState({} as any);
  const [cleanerData, setCleanerData] = useState([] as any);
  const [signedCleaners, setSignedCleaners] = useState([]);
  const [errors, setErrors] = useState("");
  const id = window.location.pathname.split("/").pop();

  useEffect(() => {
    getJobDetails(id);

    getAllCleaners({
      limit: 10,
      offset: 0,
    });
  }, [getJobDetails, getAllCleaners, id]);

  useEffect(() => {
    if (job) {
      const details = {
        ...job?.customer[0],
        ...job,
      };

      setFormValue({
        name: details.name || "",
        phone: details.phone || "",
        email: details.email || "",
        address: details.address?.replace("\n", "") || "",
        preferDate: new Date(details.preferDate?.split(" ")[0]) || "",
        cleaningTool: details.cleaningTool || "",
        basicTool: details?.cleaningTool?.basic || "",
        vacuum: details?.cleaningTool?.vacuum || "",
        cleaningToolFee: JSON.parse(details.cleaningToolFee) || "",
        durationTime: details.durationTime || "",
        pricePerHour: details.pricePerHour || "",
        total: details.total || "",
        note: details?.note || "",
        numberOfCleaners: details?.numberOfCleaners || 1,
      });

      setSignedCleaners(details.cleanerId || []);
    }

    if (cleaners) {
      setCleanerData(
        cleaners.map((item) => ({
          label: `${item.name} - ${item.phone}`,
          value: item._id,
        }))
      );
    }
  }, [job, cleaners]);

  const handleSubmit = async () => {
    if (formValue.numberOfCleaners !== signedCleaners.length) {
      setErrors(`Vui lòng chọn ${formValue.numberOfCleaners} người dọn`);

      return;
    }

    const uploadData = {
      phone: formValue.phone,
      name: formValue.name,
      address: formValue.address,
      email: formValue.email,
      preferDate: formValue.preferDate,
      // time: time,
      durationTime: formValue.durationTime,
      cleaningTool: job.cleaningTool,
      cleaningToolFee: job.cleaningToolFee,
      unit: "vnd",
      note: formValue.note || "",
      numberOfCleaners: formValue.numberOfCleaners,
      pricePerHour: formValue.pricePerHour,
      cleanerId: signedCleaners,
    };

    const res = await editJob(id, uploadData);
    if (!res.error) {
      setErrors("Assigned successfully");
    }
  };

  return (
    <>
      {" "}
      <Container>
        <Title>Đặt dịch vụ theo giờ</Title>
        <Row style={{ alignItems: "baseline" }}>
          <Col>
            <Form
              // ref={formRef as any}
              // model={model}
              onChange={() => {}}
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
              <Field
                label="Địa chỉ"
                name="address"
                // onChange={(e: any) => onChangeDistricts(e)}
              />
              <Field
                label="Ngày làm*"
                accepter={DatePicker}
                name="preferDate"
                placeholder="Chọn ngày làm"
                format="dd-MM-yyyy"
              />
              <Field
                label="Giờ làm"
                name="durationTime"
                // onChange={(e: any) => onChangeDistricts(e)}
              />
              <Field
                label="Số tiền 1 giờ"
                name="pricePerHour"
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
                    Chổi, cây lau nhà, xô chậu, dẻ, vim, nước lau sàn, dụng cụ
                    chùi toilet,...
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
                  onClick={handleSubmit}
                >
                  Xác Nhận
                </Button>
              </Row>
            </Form>
          </Col>
          <Col style={{ display: "flex", alignItems: "center" }}>
            {/* <span>Chọn {formValue.numberOfCleaners || 1} người dọn:</span> */}
            <CheckPicker
              placeholder={`Chọn ${formValue.numberOfCleaners || 1} người dọn:`}
              data={cleanerData}
              style={{ width: 224, marginTop: "30px" }}
              value={signedCleaners}
              onChange={setSignedCleaners}
            />
          </Col>
        </Row>
        <Modal size="sm" open={!!errors} onClose={() => setErrors("")}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <Modal.Title style={{ height: "100px" }}>{errors}</Modal.Title>
            <Modal.Footer style={{ width: "100%", textAlign: "center" }}>
              <Button
                onClick={() => setErrors("")}
                appearance="primary"
                style={{ width: "150px" }}
              >
                Ok
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </Container>
    </>
  );
};

const mapDispatchToProps = {
  getJobDetails,
  getAllCleaners,
  editJob,
};

const mapStateToProps = (state) => {
  const job = state.adminInfo.jobDetail;

  const cleaners = state.adminInfo?.cleaners?.list || [];

  return {
    job,
    cleaners,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails as any);
