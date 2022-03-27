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

const ContactText = styled.span`
  margin-left: 5px;
`;

const Contact = styled.strong`
  color: white;
  font-size: 18px;
  display: block;
  padding-top: 10px;
`;

const NetworkIcons = styled.div`
  display: flex;
`;

const LinkIcon = styled.a`
  margin-right: 10px;
`;

interface IconProps {
  width: string;
  height: string;
}

const Icon = styled.img`
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

const Footer: FC<FooterProps> = ({}) => {
  //   const contact = [
  //     {
  //       icon: {
  //         url: mapPin,
  //         alt: "map",
  //       },
  //       text: data?.address,
  //     },
  //     {
  //       icon: {
  //         url: mobile,
  //         alt: "phone",
  //       },
  //       text: data?.phone,
  //     },
  //     {
  //       icon: {
  //         url: globe,
  //         alt: "web",
  //       },
  //       text: data?.website,
  //     },
  //   ]

  //   const icons = [
  //     {
  //       url: data?.instagram,
  //       icon: {
  //         url: ins,
  //         alt: "ins",
  //       },
  //     },
  //     {
  //       url: data?.facebook,
  //       icon: {
  //         url: fb,
  //         alt: "fb",
  //       },
  //     },
  //     {
  //       url: data?.youtube,
  //       icon: {
  //         url: yout,
  //         alt: "youtube",
  //       },
  //     },
  //   ]

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v10.0";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
  }, []);

  return (
    <Wrapper>
      <Chatboxes></Chatboxes>
      <Container>
        <Left>
          <Name>Halkeeping</Name>
          <FBPage
            className="fb-page"
            data-href="https://www.facebook.com/halkeepingdanang/"
            data-tabs="timeline"
            data-width={`${
              window.innerWidth > 1024 || window.innerWidth < 768
                ? "270"
                : "180"
            }`}
            data-height="160"
            data-small-header="false"
            data-adapt-container-width="false"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote
              cite="https://www.facebook.com/halkeepingdanang/"
              className="fb-xfbml-parse-ignore"
            >
              <a href="https://www.facebook.com/halkeepingdanang/">Facebook</a>
            </blockquote>
          </FBPage>
        </Left>
        <Center>
          <Contact>Thông tin Halkeeping</Contact>
          <ContactWrapper>
            <ContactItem>
              Địa chỉ: 86 Phan Phu Tiên, Thanh Khê, Đà Nẵng
              {/* <ContactText>{text}</ContactText> */}
            </ContactItem>
            <ContactItem>
              Số điện thoai / zalo: 0706145980
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
          <ContactItem>website: https://halkeeping.web.app/</ContactItem>
        </Right>
      </Container>
    </Wrapper>
  );
};

export default Footer;
