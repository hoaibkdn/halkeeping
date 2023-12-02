// @ts-nocheck
import React, { FC, useEffect } from "react";
import styled from "styled-components";
import Chatboxes from "./../Chatboxes";

const Left = styled.div`
  text-align: left;
  width: 95%;

  @media (min-width: 768px) {
    width: 28%;
  }
`;

const Center = styled.div`
  text-align: left;
  width: 95%;
  margin-top: 30px;

  @media (min-width: 640px) {
    width: 33%;
    margin: 0 30px;
    margin-top: 0;
  }
`;

const Right = styled.div`
  text-align: left;
  width: 95%;
  margin-top: 30px;

  @media (min-width: 640px) {
    width: 27%;
    margin-top: 0;
  }

  @media (min-width: 1024px) {
    width: 27%;
  }
`;

const Wrapper = styled.footer`
  padding: 20px;
  margin: auto;
  background-color: #042c41;
  @media (min-width: 640px) {
    justify-content: space-between;
    padding: 51px;
  }
`;

const Name = styled.h3`
  font-size: 20px;
  color: white;
`;

const FBPage = styled.a`
  cursor: pointer;
  font-size: 20px;
  word-break: break-all;
  width: 100%;
`;

const ContactWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;

  @media (min-width: 640px) {
    justify-content: space-between;
    margin-top: 0px;
  }
`;

const ContactItem = styled.li`
  font-size: 15px;
  line-height: 30px;
  color: white;
  margin: 0;
  display: flex;
  align-items: baseline;
  font-weight: 300;
`;

export const ContactText = styled.span`
  margin-left: 5px;
`;

const Contact = styled.strong`
  color: white;
  font-size: 18px;
  display: block;
  padding-top: 10px;
`;

export const NetworkIcons = styled.div`
  display: flex;
`;

export const LinkIcon = styled.a`
  margin-right: 10px;
`;

interface IconProps {
  width: string;
  height: string;
}

export const Icon = styled.img`
  width: ${(props: IconProps) => props.width};
  height: ${(props: IconProps) => props.height};
  margin-top: -4px;
`;

const Container = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  align-items: baseline;
  margin: 0 auto;

  @media (min-width: 1240px) {
    max-width: 95%;
  }

  @media (min-width: 1920px) {
    max-width: 1440px;
  }
`;

const fbLink = "https://www.facebook.com/donvesinhdiabandanang";
const Footer: FC<FooterProps> = () => {
  useEffect(() => {}, []);

  return (
    <Wrapper>
      <Chatboxes></Chatboxes>
      <Container>
        <Left>
          <Name>Halkeeping</Name>
          <FBPage
            className='fb-page'
            data-href={fbLink}
            data-tabs='timeline'
            data-width={`${
              window.innerWidth > 1024 || window.innerWidth < 768
                ? "270"
                : "180"
            }`}
            data-height='160'
            data-small-header='false'
            data-adapt-container-width='false'
            data-hide-cover='false'
            data-show-facepile='true'
          >
            <blockquote cite={fbLink} className='fb-xfbml-parse-ignore'>
              <a href={fbLink}>Facebook</a>
            </blockquote>
          </FBPage>
        </Left>
        <Center>
          <Contact>Thông tin Halkeeping</Contact>
          <ContactWrapper>
            <ContactItem>
              Địa chỉ: 94/74 Đà Sơn 2, Liên Chiểu, Đà Nẵng
              {/* <ContactText>{text}</ContactText> */}
            </ContactItem>
            <ContactItem>
              Số điện thoai / zalo: 078.5359.038
              {/* <ContactText>{text}</ContactText> */}
            </ContactItem>
            <ContactItem>
              Facebook: Dịch vụ dọn vệ sinh theo giờ Đà Nẵng - HalKeeping
            </ContactItem>
          </ContactWrapper>
        </Center>
        <Right>
          <Contact>Liên hệ chúng tôi</Contact>
          <ContactItem>Email: halStorm13@gmail.com</ContactItem>
          <ContactItem>website: https://halkeeping.com/</ContactItem>
        </Right>
      </Container>
    </Wrapper>
  );
};

export default Footer;
