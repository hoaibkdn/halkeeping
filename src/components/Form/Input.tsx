// @ts-nocheck
import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import { Form } from "react-bootstrap"
import { Label, MessageError } from "./style"

const Content = styled.div`
  display: flex;
  align-items: center;
`

interface Props {
  label: string
  value?: any
  placeholder?: string
  type?: string // text, number ...
  message?: string
  onChange?: (e: string) => void
  widthLabel?: string
  marginLeft?: string
  isSubmitted?: boolean
  invalid?: boolean
}

const Input = ({
  label,
  value,
  type = "text",
  message,
  placeholder,
  onChange,
  widthLabel,
  isSubmitted,
  invalid,
  marginLeft,
}: Props) => {
  return (
    <div>
      <Content>
        <Label width={widthLabel}>{label}</Label>
        <Form.Control
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </Content>

      {message && isSubmitted && invalid ? (
        <MessageError marginLeft={marginLeft}>{message}</MessageError>
      ) : (
        ""
      )}
    </div>
  )
}

export default Input
