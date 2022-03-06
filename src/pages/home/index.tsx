import Banner from "./Banner";
import Services from "./Services";
import Advantages from "./Advantages";
import styled from "styled-components";
import Feedbacks from "./Feedbacks";
import Slide from "./Slide";
import btn_background from "../../assets/images/btn-background.png";
import { connect } from "react-redux";
import { resetBook } from "../redux/actions";
import { FC, useEffect } from "react";
import Header from "rsuite/esm/Calendar/Header";
import Footer from "../../components/Footer";

const BgButton = styled.div`
  position: relative;

  & img {
    height: 257px;
    width: 100%;
    opacity: 0.6;
    object-fit: cover;
  }

  & a {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 1;
    text-align: center;
    top: 50%;
    left: 50%;
    background-color: #042c41;
    padding: 30px 63px 33px 63px;
    color: white;
    font-size: 24px;
    text-align: center;
    line-height: 18.4px;
    border-radius: 5px;
    &:hover {
      color: white;
      text-decoration: none;
    }
  }
`;

const Home: FC<any> = ({ resetBook }) => {
  useEffect(() => {
    resetBook();
  }, []);

  return (
    <>
      <Header />
      <Banner />
      <Slide />
      <Services />
      <Advantages />
      <BgButton>
        <a href="/book">Đặt dịch vụ ngay</a>
        <img src={btn_background} />
      </BgButton>
      <Feedbacks />
      <Footer />
    </>
  );
};

const mapDispatchToProps = {
  resetBook,
};

export default connect(null, mapDispatchToProps)(Home as any);
