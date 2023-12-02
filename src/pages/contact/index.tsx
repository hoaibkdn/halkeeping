/** @format */

import * as React from 'react';
// import bannerShort from "./../../assets/images/banner_short.png";
import styled from 'styled-components';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Wrapper = styled.div`
  margin: auto;
  margin-top: 150px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  & > ul {
    margin-top: 50px;
    list-style: none;
    line-height: 30px;
  }
  margin-bottom: 100px;
`;

const Contact = () => {
  return (
    <>
      <Header />
      {/* <BannerShort src={bannerShort} /> */}
      <Wrapper>
        <h3>Liên hệ chúng tôi</h3>
        <i>Halkeeping nhận khảo sát và tư vấn hoàn toàn miễn phí</i>
        <br />
        <i>
          Halkeeping có thể làm bất cứ khu vực nào ở Đà Nẵng, khách chỉ cần đặt
          dọn vệ sinh để nhận được sự tiện ích mọi nơi
        </i>
        <ul>
          <li>
            Hotline / zalo:{' '}
            <a href='tel:0785359038'>
              <b>078.5359.038</b>
            </a>
          </li>
          <li>Địa chỉ: 94/74 Đà Sơn 2, Liên Chiểu, Đà Nẵng</li>
          <li>
            Website:{' '}
            <a href='https://halkeeping.com/'>https://halkeeping.com/</a>
          </li>
        </ul>

        <b>
          <i>Dọn định kỳ để có giá tốt</i>
        </b>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Contact;
