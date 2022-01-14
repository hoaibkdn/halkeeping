
// @ts-nocheck
import React, { FC } from "react"
import styled from "styled-components"
import banner from "../../assets/images/banner.png"

export const BannerWrapper = styled.section`
  position: relative;
  padding-top: 50px;
`
const BannerImage = styled.img`
  width: 100%;
  object-fit: cover;
  height: 385px;

  @media (min-width: 640px) {
    max-height: 100vh;
    height: 385px;

  }
`

export const BannerContent = styled.div`
  position: absolute;
  margin: auto;
  transform: translate(-50%, -50%);
  text-align: center;
  top: 50%;
  left: 50%;

  & .title {
    color: white;
    font-size: 25px;
    & .bold {
      font-weight: 700;
      font-size: 30px;
    }
  }

  & .order-btn {
    background-color: #EEAD4B;
    padding: 10px 40px 12px 40px;
    color: white;
    font-size: 16px;
    text-align: center;
    line-height: 18.4px;
    &:hover {
      color: white;
      text-decoration: none;
    }
  }

  & .slogan {
    background-color: rgba(255, 242, 223, 0.2);
    padding: 0px;
    display: flex;
    width: 70%;
    justify-content: center;
    align-items: center;
    margin: 50px auto;
    font-size: 18px;
    font-weight: 700px;
    border: 1px solid #FFF2DF;
    border-radius: 50px;
    color: #FFCF88;
    list-style-type: none;
    & li {
      padding: 15px;
      letter-spacing: 5%;
      line-height: 21px;
    }

    & .center {
      border-left: 1px solid #FFF2DF;
      border-right: 1px solid #FFF2DF;
    }
  }


  @media (min-width: 640px) {
    top: 50%;
    left: 50%;
    text-align: center;
  }
`

const Banner: FC<BannerProps> = ({
}) => {

  return (
      <BannerWrapper>
        <BannerContent>
          <h2 className="title"><span className="bold">Halkeeping</span> cung cấp dịch vụ dọn vệ sinh theo giờ</h2>
          <ul className="slogan">
            <li>Chăm chỉ</li>
            <li className="center">Trung thực</li>
            <li>Nhanh nhẹn</li>
          </ul>
          <a href="/book" className="order-btn">Đặt dọn vệ sinh ngay</a>
        </BannerContent>
          <picture>
            <source srcSet={banner} media="(min-width: 640px)" />
            <source
              srcSet={banner}
              media="(max-width: 639px)"
            />
            <BannerImage
              alt="banner"
              src={banner}
            />
          </picture>
      </BannerWrapper>
  )

}


export default Banner