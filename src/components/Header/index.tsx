// @ts-nocheck
import React, { FC, useState } from "react";
import styled from "styled-components";
import Navigation from "../Navigation";

import logo from "../../assets/images/logo.png";

const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  height: auto;
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  z-index: 101;
  height: 70px;
  background-color: white;

  & > div {
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  @media (min-width: 640px) {
    & > div {
      max-width: 70%;
    }
  }
`;

const Logo = styled.h1`
  margin: 0;
  // width: 60px;
  padding-left: 20px;
  height: 60px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 50px;
    height: 50px;
    margin: auto;
    object-fit: contain;
  }

  & > span {
    padding-left: 20px;
    font-size: 30px;
    padding-top: 15px;
    & > a {
      text-decoration: none;
      color: #042c41;
    }
  }
`;

const ToggleIcon = styled.div`
  font-size: 18px;
  position: absolute;
  display: block;
  top: 14px;
  right: 10px;
  width: 20px;
  z-index: 101;
  transition: all 0.5s ease-in-out;

  &:after,
  &:before,
  & > span {
    background-color: #606060;
    border-radius: 3px;
    content: "";
    display: block;
    height: 3px;
    margin: 5px 0;
    transition: all 0.2s ease-in-out;
  }

  &.opened:before {
    transform: translateY(8px) rotate(135deg);
  }

  &.opened:after {
    transform: translateY(-8px) rotate(-135deg);
  }

  &.opened > span {
    transform: scale(0);
  }

  @media (min-width: 640px) {
    display: none;
  }
`;

const Header = () => {
  const [isOpened, setIsOpened] = useState(false);
  const nav = [{ name: "Liên hệ", url: "/contact" }];

  return (
    <>
      <HeaderWrapper>
        <div>
          <Logo>
            <a href='/'>
              <img src={logo} alt='logo' />
            </a>
            <span>
              <a href='/'>Halkeeping</a>
            </span>
          </Logo>

          <ToggleIcon
            className={`${isOpened ? "opened" : ""}`}
            onClick={() => setIsOpened(!isOpened)}
          >
            <span></span>
          </ToggleIcon>
          <Navigation nav={nav} active='home' isOpened={isOpened} />
        </div>
      </HeaderWrapper>
    </>
  );
};

export default Header;
