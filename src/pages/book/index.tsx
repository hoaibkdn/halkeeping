import { FC, useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import Input from "../../components/Form/Input"
import { Label } from "../../components/Form/style"
import AutoComplete from "../../components/Form/AutoComplete"
import DateTimeInput from "../../components/Form/DateTime"
import { Form } from "react-bootstrap"
import RadioInput from "../../components/Form/Radio"
import Checkbox from "../../components/Form/Checkbox"
import ConfirmModal from "../../components/Form/Popup"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import { getProvinces, book, getBasicInfo } from "../redux/actions"
import { PublicReducer } from "../../pages/redux/reducer"

const Container = styled.div`
  width: 60%;
  margin: 110px auto;
`

const Title = styled.h6`
  color: #606060;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 650;
`

const Field = styled.div`
  margin-bottom: 20px;
  width: 100%;
`

const Row = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`

const optionsPay = [
  {
    id: "Tiền mặt",
    name: "Tiền mặt",
  },
  {
    id: "Thẻ thanh toán",
    name: "Thẻ thanh toán",
  },
]

const optionsHour = [
  {
    id: "1",
    name: "1 Tiếng",
  },
  {
    id: "2",
    name: "2 Tiếng",
  },
  {
    id: "3",
    name: "3 Tiếng",
  },
  {
    id: "4",
    name: "4 Tiếng",
  },
  {
    id: "5",
    name: "5 Tiếng",
  },
  {
    id: "6",
    name: "6 Tiếng",
  },
  {
    id: "7",
    name: "7 Tiếng",
  },
  {
    id: "8",
    name: "8 Tiếng",
  },
]

const optionsMinutes = [
  {
    id: "10",
    name: "10 Phút",
  },
  {
    id: "20",
    name: "20 Phút",
  },
  {
    id: "30",
    name: "30 Phút",
  },
  {
    id: "40",
    name: "40 Phút",
  },
  {
    id: "50",
    name: "50 Phút",
  },
]

interface State {
  publicPages: PublicReducer
}

const Book: FC<any> = ({ data = [], getProvinces, book, getBasicInfo }) => {
  const [formData, setFormData] = useState({
    name: data?.book?.name,
    phone: data?.book?.phone,
    email: data?.book?.email,
    district: data?.book?.district,
    wards: data?.book?.wards,
    numberHouse: data?.book?.numberHouse,
    date: data?.book?.date,
    hour: data?.book?.hour,
    minutes: data?.book?.minutes,
    time: data?.book?.time,
    tool: data?.book?.tool,
    cleanerTool: data?.book?.cleanerTool,
    note: data?.book?.note,
    pay: data?.book?.pay,
    count: data?.book?.count,
    durationTime: data?.book?.durationTime,
    wardsState: data?.book?.wardsState,
    districtState: data?.book?.districtState,
    hourState: data?.book?.hourState,
    minutesState: data?.book?.minutesState,
    payState: data?.book?.payState,
    countPay: data?.book?.countPay || 0,
    durationTimeApi: data?.book?.durationTimeApi,
  })

  let today =
    new Date().getFullYear() +
    "-" +
    `${new Date().getMonth() + 1}`.padStart(2, "0") +
    "-" +
    `${new Date().getDate()}`.padStart(2, "0")

  const [isSubmitted, setSubmitted] = useState(false)
  const [invalidPhone, setInvalidPhone] = useState(
    formData.phone ? false : true
  )
  const [invalidEmail, setInvalidEmail] = useState(
    formData.email ? false : true
  )

  const [invalidDistrict, setInvalidDistrict] = useState(
    formData.district ? false : true
  )
  const [invalidWards, setInvalidWards] = useState(
    formData.district ? false : true
  )
  const [invalidTime, setInvalidTime] = useState(formData.time ? false : true)
  const [invalidNumberHouse, setInvalidNumberHouse] = useState(
    formData.numberHouse ? false : true
  )
  const [invalidDate, setInvalidDate] = useState(formData.date ? false : true)
  const [statusTool, setStatusTool] = useState(!!formData?.tool)
  const [statusToolBasic, setStatusToolBasic] = useState(!!formData?.tool)
  const [statusToolCleaner, setStatusToolCleaner] = useState(
    !!formData?.cleanerTool
  )
  const [wardsOptions, setWardsOptions] = useState([])
  const [wards, setWards] = useState(formData?.wardsState || [])
  const [isVisibleConfirmModal, setVisibleConfirmModal] = useState(false)

  const basicInfo = data?.basicInfo
  const districts = data?.province?.districts?.map((i: any) => {
    return {
      id: i.codename,
      name: i.name,
      wards: i.wards,
    }
  })

  const regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

  useEffect(() => {
    getProvinces()
    getBasicInfo({
      durationTime: formData.durationTimeApi,
      cleaningTool: {
        basic: formData.tool,
        vacuum: formData.cleanerTool,
      },
    })
  }, [])

  const onChangeDistricts = useCallback(
    (val: any) => {
      const value = val?.[0]
      const options = val?.[0]?.wards?.map((k: any) => {
        return {
          id: k.codename,
          name: k.name,
        }
      })
      setWardsOptions(options || [])
      setInvalidDistrict(value?.name ? false : true)
      setWards([])

      setFormData({
        ...formData,
        district: value?.name,
        districtState: val,
      })
    },
    [formData]
  )

  const onChangeWards = (val: any) => {
    const value = val?.[0]
    setInvalidWards(value?.name ? false : true)
    setWards(val)

    setFormData({
      ...formData,
      wards: value?.name,
      wardsState: val,
    })
  }
  const onChangeNumberHouse = (val: string) => {
    setInvalidNumberHouse(val ? false : true)

    setFormData({
      ...formData,
      numberHouse: val,
    })
  }

  const onChangeDate = (val: any) => {
    const date = val.target.value
    setInvalidDate(date ? false : true)

    setFormData({
      ...formData,
      date: date,
    })
  }

  const onChangeTime = (val: any) => {
    const time = val.target.value
    setInvalidTime(time ? false : true)

    setFormData({
      ...formData,
      time: time,
    })
  }

  const onChangeOptions = (val: any, type: string) => {
    const value = val?.[0]?.id
    const durationTime =
      type === "hour"
        ? Number(value || 0) * 60 + Number(formData?.minutes || 0)
        : type === "minutes"
        ? Number(formData?.hour || 0) * 60 + Number(value || 0)
        : Number(value || 0) * 60 + Number(formData?.minutes || 0)

    if (type === "hour" || type === "minutes") {
      getBasicInfo({
        durationTime,
        cleaningTool: {
          basic: formData.tool,
          vacuum: formData.cleanerTool,
        },
      })
    }

    setFormData({
      ...formData,
      [type]: value,
      [`${type}State`]: val,
      durationTime: durationTime.toString(),
    })
  }

  const onChangeValue = useCallback(
    (val, type) => {
      if (type === "email") {
        if (!regexEmail.test(val)) {
          setInvalidEmail(true)
        } else {
          setInvalidEmail(val ? false : true)
        }
      }

      if (type === "phone") {
        if (!regexPhone.test(val)) {
          setInvalidPhone(true)
        } else {
          setInvalidPhone(val ? false : true)
        }
      }

      setFormData({
        ...formData,
        [type]: val,
      })
    },
    [formData]
  )
  const onChangeToolBasic = useCallback(
    (val: string, type: string) => {
      let tool

      if (val) {
        setStatusToolBasic(true)
        setStatusTool(true)
        tool = true
      } else {
        tool = false
        setStatusToolBasic(false)
        setStatusTool(!statusToolCleaner ? false : true)
      }

      getBasicInfo({
        durationTime: getDurationTime(),
        cleaningTool: {
          basic: tool,
          vacuum: formData.cleanerTool,
        },
      })

      setFormData({
        ...formData,
        tool: tool,
      })
    },
    [formData]
  )

  const onChangeToolCleaner = useCallback(
    (val: string, type: string) => {
      let value: boolean = false

      if (type === "cleaner") {
        if (val) {
          setStatusToolCleaner(true)
          setStatusTool(true)
          value = true
        } else {
          value = false
          setStatusToolCleaner(false)
          setStatusTool(!statusToolBasic ? false : true)
        }
      }
      getBasicInfo({
        durationTime: getDurationTime(),
        cleaningTool: {
          basic: formData.tool,
          vacuum: value,
        },
      })

      setFormData({
        ...formData,
        cleanerTool: value,
      })
    },
    [formData]
  )

  const onChangeTool = useCallback(
    (val: string, type: string) => {
      if (type === "yes") {
        setStatusToolBasic(true)
        setStatusTool(true)
        getBasicInfo({
          durationTime: getDurationTime(),
          cleaningTool: {
            basic: true,
            vacuum: formData?.cleanerTool,
          },
        })

        setFormData({
          ...formData,
          tool: true,
        })
      } else {
        setStatusTool(false)
        setStatusToolBasic(false)
        setStatusToolCleaner(false)
        getBasicInfo({
          durationTime: getDurationTime(),
          cleaningTool: {
            basic: false,
            vacuum: false,
          },
        })
        setFormData({
          ...formData,
          tool: false,
          cleanerTool: false,
        })
      }
    },
    [formData]
  )

  const getDurationTime = () =>
    Number(formData?.hour || 0) * 60 + Number(formData?.minutes || 0)

  const history = useHistory()

  const onSubmit = () => {
    const data = {
      ...formData,
      address: `${formData.district}, ${formData.wards}, ${formData.numberHouse}`,
      preferDate: `${formData.date}`,
      durationTime: `${formData.hour} tiếng ${formData.minutes || 0} phút`,
      durationTimeApi:
        parseInt(formData.hour, 10) * 60 + parseInt(formData.minutes, 10),
      payMethod: formData.pay || "Tiền mặt",
      countPay: basicInfo?.total | 0,
    }

    book(data)

    history.push(`/book-confirm`)
  }

  const openConfirmModal = () => {
    setSubmitted(true)

    const isValid: boolean =
      !invalidPhone &&
      !invalidEmail &&
      !invalidDistrict &&
      !invalidWards &&
      !invalidDate &&
      !invalidNumberHouse &&
      !invalidTime

    if (isValid) {
      onSubmit()
    }
  }

  const confirm = () => {
    setVisibleConfirmModal(false)
    onSubmit()
  }

  return (
    <>
      <Container>
        <Title>Đặt dịch vụ theo giờ</Title>
        {/* <form onSubmit={onSubmit}> */}
        <Field>
          <Input
            label="Tên khách hàng"
            value={formData?.name}
            placeholder="Vui lòng điền tên người đặt dịch vụ"
            onChange={(e) => onChangeValue(e, "name")}
          />
        </Field>
        <Field>
          <Input
            label="Số điện thoại *"
            value={formData?.phone}
            placeholder="Nhập số điện thoại"
            message="Vui lòng nhập đúng số điện thoại hợp lệ"
            isSubmitted={isSubmitted}
            invalid={invalidPhone}
            onChange={(e) => onChangeValue(e, "phone")}
          />
        </Field>
        <Field>
          <Input
            label="Email *"
            value={formData?.email}
            placeholder="Email để xác nhận đơn dọn vệ sinh"
            message="Vui lòng nhập định dạng email"
            isSubmitted={isSubmitted}
            invalid={invalidEmail}
            onChange={(e) => onChangeValue(e, "email")}
          />
        </Field>
        <Row>
          <Label>Địa chỉ *</Label>
        </Row>
        <Row>
          <div style={{ marginRight: "20px", width: "50%" }}>
            <AutoComplete
              label="Quận/ Huyện"
              placeholder="Vui lòng chọn quận"
              value={formData?.districtState}
              message="Vui lòng chọn thông tin chọn quận"
              invalid={invalidDistrict}
              onChange={(e) => onChangeDistricts(e)}
              isSubmitted={isSubmitted}
              options={districts}
            />
          </div>
          <div style={{ width: "50%" }}>
            <AutoComplete
              label="Phường/ xã"
              placeholder="Vui lòng chọn phường/ xã"
              message="Vui lòng chọn thông tin chọn phường/xã"
              invalid={invalidWards}
              isSubmitted={isSubmitted}
              onChange={(e) => onChangeWards(e)}
              options={wardsOptions}
              value={wards}
            />
          </div>
        </Row>
        <Field>
          <Input
            label="Số nhà cụ thể"
            value={formData?.numberHouse}
            widthLabel="16%"
            marginLeft="14%"
            placeholder="Vui lòng điền thông tin địa chỉ cụ thể"
            message="Vui lòng điền thông tin địa chỉ cu thể"
            invalid={invalidNumberHouse}
            isSubmitted={isSubmitted}
            onChange={(e) => onChangeNumberHouse(e)}
          />
        </Field>
        <Row>
          <div style={{ marginRight: "20px", width: "100%" }}>
            <DateTimeInput
              label="Ngày làm*"
              value={formData?.date}
              placeholder="Chọn ngày làm"
              message="Vui lòng chọn ngày làm việc"
              invalid={invalidDate}
              isSubmitted={isSubmitted}
              onChange={(e) => onChangeDate(e)}
              min={today}
            />
          </div>
          <Label width="30%">Số giờ làm</Label>
          <div style={{ width: "30%", marginRight: "20px" }}>
            <AutoComplete
              placeholder="Hour"
              value={formData?.hourState}
              onChange={(e) => onChangeOptions(e, "hour")}
              options={optionsHour}
            />
          </div>
          <div style={{ width: "30%" }}>
            <AutoComplete
              placeholder="Minutes"
              value={formData?.minutesState}
              onChange={(e) => onChangeOptions(e, "minutes")}
              options={optionsMinutes}
            />
          </div>
        </Row>
        <Field style={{ width: "49%" }}>
          <DateTimeInput
            label="Thời gian làm*"
            widthLabel="40%"
            type="time"
            value={formData?.time}
            placeholder="Chọn thời gian làm"
            message="Vui lòng chọn thời gian làm"
            invalid={invalidTime}
            isSubmitted={isSubmitted}
            onChange={(e) => onChangeTime(e)}
            min="06:30AM"
          />
        </Field>
        <Row>
          <Label>Bạn có cần chúng tôi mang theo dụng cụ?</Label>
        </Row>
        <div style={{ marginBottom: "20px" }}>
          <RadioInput
            name="tool"
            label="Có"
            value={statusTool}
            onChange={(e) => onChangeTool(e, "yes")}
          />
          <div style={{ marginLeft: "30px" }}>
            <Checkbox
              name="tool"
              label={`Dụng cụ cơ bản - phụ phí: ${basicInfo?.cleaning_tool_fee?.basic} vnd`}
              value={statusToolBasic}
              note="Chổi, cây lau nhà, xô chậu, dẻ, vim, nước lau sàn, dụng cụ chùi
        toilet,..."
              onChange={(e) => onChangeToolBasic(e, "basic")}
            />

            <Checkbox
              name="tool"
              label={`Máy hút bụi vừa (hút thảm hoặc ghế sofa, nệm) - ${basicInfo?.cleaning_tool_fee?.vacuum} vnd`}
              value={statusToolCleaner}
              onChange={(e) => onChangeToolCleaner(e, "cleaner")}
            />
          </div>
          <RadioInput
            name="tool"
            label="No"
            value={!statusTool}
            onChange={(e) => onChangeTool(e, "no")}
          />
        </div>
        <Field>
          <Label style={{ marginBottom: "10px" }}>Dặn dò thêm</Label>
          <Form.Control
            as="textarea"
            value={formData?.note}
            placeholder="Bạn có thể ghi chú thêm những việc bạn muốn nhân viên dọn vệ sinh chú ý khi làm"
            style={{ height: "100px" }}
            onChange={(e) => onChangeValue(e.target.value, "note")}
          />
        </Field>
        <Field style={{ width: "49%" }}>
          <AutoComplete
            label="Thanh toán"
            widthLabel="40%"
            value={formData?.payState}
            placeholder="Tiền mặt"
            onChange={(e) => onChangeOptions(e, "pay")}
            options={optionsPay}
          />
        </Field>
        <span>Tổng</span>:{" "}
        <span style={{ color: "#01527C", fontSize: "30px" }}>
          {basicInfo?.total?.toLocaleString("vi")} đồng
        </span>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{
              borderColor: "#042C41",
              backgroundColor: "#042C41",
              width: "150px",
              height: "60px",
            }}
            as="input"
            type="submit"
            value="Xác nhận"
            onClick={openConfirmModal}
          />
        </div>
        <ConfirmModal
          isVisible={isVisibleConfirmModal}
          reject={() => setVisibleConfirmModal(false)}
          accept={confirm}
        ></ConfirmModal>
        {/* </form> */}
      </Container>
    </>
  )
}

const mapDispatchToProps = {
  getProvinces,
  book,
  getBasicInfo,
}

const mapStateToProps = (state: State) => ({
  data: state?.publicPages,
})

export default connect(mapStateToProps, mapDispatchToProps)(Book as any)
