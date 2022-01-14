// @ts-nocheck
import React, { FC } from "react"
import styled from "styled-components"
import Item from "./Item"

import fb from "../../assets/images/icons/facebook.png"
import yout from "../../assets/images/icons/youtube.png"
import ins from "../../assets/images/icons/instagram.png"
import { Link } from "react-router-dom"

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  position: absolute;
  padding: 0;
  top: 0;
  transform: translateY(-100%);
  transition: transform 0.3s cubic-bezier(1, 0.5, 0, 1);
  padding-top: 50px;
  height: 100vh;

  &.opened {
    transform: translateY(0);
    top: 60px;

    & > li {
      margin: 0 auto;
    }
  }

  & > .contact {
    padding: 10px 10px 20px 10px;
    background-color: white;
    display: flex;
    align-items: center;

    & > a.center {
      margin: 0 20px;
    }

    @media only screen and (min-width: 664px) {
      padding: 0 0 0 20px;
      height: 60px;
      transform: unset;
      & > a {
        margin-right: 0 10px 0 0;
      }
    }

    & img {
      width: 32px;
      height: 32px;
    }
  }

  @media only screen and (min-width: 664px) {
    flex-direction: row;
    justify-content: space-between;
    transform: translateX(0px);
    padding: 0;
    align-items: center;
    width: max-content;
    position: inherit;
    height: max-content;
  }
`

const BookButton = styled(Link)`
  background-color: #042C41;
  padding: 11px 40px 12px 40px;
  color: white;
  font-size: 16px;
  text-align: center;
  line-height: 18.4px;
  border-radius: 5px;
  &:hover {
    color: white;
    text-decoration: none;
  }
`

interface NavigationProps {
  nav: Array<Link>
  active: string
  isOpened: boolean
}

const Navigation: FC<NavigationProps> = ({
  nav,
  active,
  isOpened,
}) => (
  <NavList className={`${isOpened ? "opened" : ""}`}>
        <li className="contact">
      <BookButton to="/book">Đặt dịch vụ</BookButton>
    </li>
    {nav.map((item) => (
      <Item item={item} key={item.name} active={active} />
    ))}

    {/* <li className="contact">
      <a href="#" target="_blank" rel="noopener noreferrer">
        <img src={fb} />
      </a>
      <a
         href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="center"
      >
        <img src={ins} />
      </a>
      <a  href="#" target="_blank" rel="noopener noreferrer">
        <img src={yout} />
      </a>
    </li> */}
  </NavList>
)

export default Navigation
