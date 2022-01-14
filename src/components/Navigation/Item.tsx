// @ts-nocheck
import React, { FC } from "react"
import styled from "styled-components"

import { Link } from 'react-router-dom'

const NavLink = styled(Link)`
  color: ${(props: { isActive?: boolean }) =>
    props.isActive ? "#606060" : "rgb(168, 168, 168)"};
  font-size: 16px;
  text-decoration: none;

  border-bottom: ${(props: { isActive?: boolean }) =>
    props.isActive ? "1px solid #606060" : ""};

  &:hover {
    color: #606060;
    text-decoration: none;
    border-bottom: 1px solid #606060;
  }

  @media (min-width: 640px) {
    padding-bottom: 3px;
    color: #606060;
  }
`
const NavItem = styled.li`
  background-color: white;
  list-style: none;
  padding: 0px 0 30px 0;
  text-align: center;
  margin-left: 0;

  @media (min-width: 640px) {
    margin-left: 20px;
    text-align: left;
    padding: 0;
  }
`

interface ItemProps {
  item: Link
  active: string
}

const Item: FC<ItemProps> = ({ item, active }) => {
  return (
    <NavItem>
      <NavLink to={item.url} isActive={active === item.name}>
        {item.name}
      </NavLink>
    </NavItem>
  )
}

export default Item
