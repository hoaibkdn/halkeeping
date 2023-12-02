/** @format */

import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { PublicReducer } from '../redux/reducer';
import { connect } from 'react-redux';

import { createJob } from '../redux/actions';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { Modal, Button, Loader } from 'rsuite';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface State {
  publicPages: PublicReducer;
}

interface Props {
  createJob: (formData: Record<string, any>) => { error: boolean };
  data: any;
}

const Container = styled.div`
  width: 60%;
  margin: 110px auto;
  background-color: #fffbf4;
  padding: 40px 50px;
`;

const Title = styled.h6`
  color: #444444;
  margin-bottom: 30px;
  font-size: 28px;
`;

const Row = styled.div`
  margin-bottom: 20px;
  display: flex;
`;

const Label = styled.label`
  color: #444444;
  font-size: 17px;
  margin-right: 30px;
`;

const Text = styled.label`
  color: #757575;
  font-size: 17px;
`;

const BookConfirm = (props: Props) => {
  const [processing, setProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleClose = () => setIsSuccess(false);
  const history = useHistory();
  const data = props.data || {};

  useEffect(() => {
    if (!data?.date || !data?.time || !data?.hour) {
      history.push('/book');
    }
  }, [data?.date, data?.time, data?.hour, isSuccess, history]);

  const date = moment(data.date).format('YYYY-MM-DD');
  const time = moment(data.time).format('hh:mm');
  // let countTool = 0;
  let tool = '';
  switch (true) {
    case data.tool:
      // countTool += 30000;
      tool += `Có mang dụ cụ cơ bản (+ 30.000)`;
      break;
    case data.cleanerTool:
      // countTool += 30000;
      tool += `Máy hút bụi vừa (hút thảm hoặc ghế sofa, nệm) - 30.000 vnd`;
      break;
  }

  const onBook = async () => {
    setProcessing(true);
    const uploadData = {
      phone: data.phone,
      name: data.name,
      address: data.address,
      email: data.email,
      preferDate: new Date(data.date)?.getTime(),
      startWorkingTime: time,
      durationTime: (data.hour || 0) * 60 + (data.minutes || 0),
      cleaningTool: {
        basic: data?.tool?.includes('toolBasic'),
        vacuum: data?.tool?.includes('toolCleaner'),
      },
      unit: 'vnd',
      note: data.note,
      numberOfCleaners: data.numberOfCleaners || 1,
      payMethod: data?.payMethod,
    };

    const res = await props.createJob(uploadData);

    setProcessing(false);

    if (res.error === false) {
      setIsSuccess(true);
    }
  };

  return (
    <>
      <Header />
      <Modal open={isSuccess} onClose={handleClose}>
        <Modal.Header style={{ display: 'flex', justifyContent: 'center' }}>
          <Modal.Title style={{ textAlign: 'center', width: '80%' }}>
            Halkeeping xin chân thành cảm ơn quý khách đã tin cậy sử dụng dịch
            vụ của chúng tôi!!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          Chúng tôi sẽ sớm liên hệ để hỗ trợ thông tin chi tiết.
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            appearance='primary'
            style={{ width: '100px' }}
            onClick={() => {
              history.push('/');
            }}>
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
          <Text>{date}</Text>
        </Row>
        <Row>
          <Label>Thời gian làm</Label>
          <Text>{time}</Text>
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
          ''
        )}
        {data.note ? (
          <div style={{ marginBottom: '20px' }}>
            <Label>Dặn dò thêm</Label>
            <div style={{ marginLeft: '30px' }}>
              <Text style={{ display: 'block' }}>{data.note}</Text>
            </div>
          </div>
        ) : (
          ''
        )}
        <Row>
          <Label>Thanh toán</Label>
          <Text>{data.payMethod}</Text>
        </Row>

        <div
          style={{
            display: 'flex',
            marginBottom: '30px',
            marginTop: '40px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <div style={{ width: '40%' }}>
            <Label style={{ fontWeight: 700 }}>Tổng</Label>
            <Text style={{ color: '#01527C', fontWeight: 700 }}>
              {data?.countPay?.toLocaleString('vi')} đồng
            </Text>
            <p
              style={{
                fontSize: '16px',
                color: '#606060',
                fontStyle: 'italic',
              }}>
              Chúng tôi sẽ xác nhận đơn đặt dọn vệ sinh của bạn qua email và
              điện thoại
            </p>
          </div>
          <Button
            style={{
              borderColor: '#042C41',
              backgroundColor: '#042C41',
              color: '#fff',
              width: '150px',
              height: '60px',
            }}
            disabled={processing}
            onClick={onBook}>
            {processing ? <Loader /> : 'Đặt ngay'}
          </Button>
        </div>
      </Container>
      <Footer />
    </>
  );
};

const mapDispatchToProps = {
  createJob,
};

const mapStateToProps = (state: State) => ({
  data: state?.publicPages?.book,
});

export default connect(mapStateToProps, mapDispatchToProps)(BookConfirm as any);
