import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { Button, Modal, Spinner } from "react-bootstrap"
import { PublicReducer } from "../redux/reducer"
import { connect } from "react-redux"

import { createJob } from "../redux/actions"
import { useState } from "react"
import { useEffect } from "react"

interface State {
  publicPages: PublicReducer
}

interface Props {
  createJob: (formData: Record<string, any>) => { error: boolean }
  data: any
}

const Container = styled.div`
  width: 60%;
  margin: 110px auto;
  background-color: #fffbf4;
  padding: 40px 50px;
`

const Title = styled.h6`
  color: #444444;
  margin-bottom: 30px;
  font-size: 28px;
`

const Row = styled.div`
  margin-bottom: 20px;
  display: flex;
`

const Label = styled.label`
  color: #444444;
  font-size: 17px;
  margin-right: 30px;
`

const Text = styled.label`
  color: #757575;
  font-size: 17px;
`

const BookConfirm = (props: Props) => {
  const [processing, setProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (isEmpty(data)) {
      history.push("/")
    }
  }, [isSuccess])

  const data = props.data || {}
  let countTool = 0
  let tool = ""
  switch (true) {
    case data.tool:
      countTool += 30000
      tool += `Có mang dụ cụ cơ bản (+ 30.000)`
      break
    case data.cleanerTool:
      countTool += 30000
      tool += `Máy hút bụi vừa (hút thảm hoặc ghế sofa, nệm) - 30.000 vnd`
      break
  }

  const isEmpty = (obj: object) => {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false
    }

    return true
  }

  const onBook = async () => {
    setProcessing(true)
    const uploadData = {
      phone: data.phone,
      name: data.name,
      address: data.address,
      email: data.email,
      preferDate: data.date,
      durationTime: data.durationTimeApi,
      time: data.time,
      cleaningTool: {
        basic: data.tool,
        vacuum: data.cleanerTool,
      },
      unit: "vnd",
      note: data.note,
    }

    const res = await props.createJob(uploadData)

    setProcessing(false)

    if (res.error === false) {
      setIsSuccess(true)
    }
  }

  return (
    <>
      <Modal show={isSuccess} animation size="lg">
        <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
          <Modal.Title style={{ textAlign: "center", width: "80%" }}>
            Halkeeping xin chân thành cảm ơn quý khách đã tin cậy sử dụng dịch
            vụ của chúng tôi!!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          Chúng tôi sẽ sớm liên hệ để hỗ trợ thông tin chi tiết.
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ width: "100px" }}
            onClick={() => {
              history.push("/")
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Title>Thông tin dọn cụ thể</Title>
        <Row>
          <Label>Tên khách hàng</Label>
          <Text>{data.name}</Text>
        </Row>
        <Row>
          <Label>Địa chỉ</Label>
          <Text>{data.address}</Text>
        </Row>
        <Row>
          <Label>Ngày làm</Label>
          <Text>{data.date}</Text>
        </Row>
        <Row>
          <Label>Thời gian làm</Label>
          <Text>{data.time}</Text>
        </Row>
        <Row>
          <Label>Số giờ làm</Label>
          <Text>{data.durationTime}</Text>
        </Row>
        {tool ? (
          <Row>
            <Label>Mang dụng cụ</Label>
            <Text>{tool}</Text>
          </Row>
        ) : (
          ""
        )}
        {data.note ? (
          <div style={{ marginBottom: "20px" }}>
            <Label>Dặn dò thêm</Label>
            <div style={{ marginLeft: "30px" }}>
              <Text style={{ display: "block" }}>{data.note}</Text>
            </div>
          </div>
        ) : (
          ""
        )}
        <Row>
          <Label>Thanh toán</Label>
          <Text>{data.payMethod}</Text>
        </Row>

        <div
          style={{
            display: "flex",
            marginBottom: "30px",
            marginTop: "40px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "40%" }}>
            <Label style={{ fontWeight: 700 }}>Tổng</Label>
            <Text style={{ color: "#01527C", fontWeight: 700 }}>
              {data?.countPay?.toLocaleString("vi")} đồng
            </Text>
            <p
              style={{
                fontSize: "16px",
                color: "#606060",
                fontStyle: "italic",
              }}
            >
              Chúng tôi sẽ xác nhận đơn đặt dọn vệ sinh của bạn qua email và
              điện thoại
            </p>
          </div>
          <Button
            style={{
              borderColor: "#042C41",
              backgroundColor: "#042C41",
              width: "150px",
              height: "60px",
            }}
            onClick={onBook}
          >
            {processing ? <Spinner animation="border" /> : "Đặt ngay"}
          </Button>
        </div>
      </Container>
    </>
  )
}

const mapDispatchToProps = {
  createJob,
}

const mapStateToProps = (state: State) => ({
  data: state?.publicPages?.book,
})

export default connect(mapStateToProps, mapDispatchToProps)(BookConfirm as any)
