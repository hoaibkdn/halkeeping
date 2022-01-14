// @ts-nocheck
import React from "react"
import styled from "styled-components"
import { Label, MessageError } from "./style"
import { Form } from "react-bootstrap"

const Content = styled.div`
  display: flex;
  align-items: center;
`

interface Props {
  label: string
  value?: any
  placeholder?: string
  type?: string
  message?: string
  widthLabel?: string
  isSubmitted?: boolean
  invalid?: boolean
  min?: string
  onChange?: (e: string) => void
}

const DateTimeInput = ({
  label,
  value,
  message,
  placeholder,
  onChange,
  type = "date",
  widthLabel,
  isSubmitted,
  min,
  invalid,
}: Props) => {
  return (
    <div>
      <Content>
        <Label width={widthLabel}>{label}</Label>
        <Form.Control
          id="dateTime"
          type={type}
          onChange={(date) => onChange(date)}
          placeholder={placeholder}
          min={min}
          value={value}
        />
      </Content>
      {message && isSubmitted && invalid ? (
        <MessageError>{message}</MessageError>
      ) : (
        ""
      )}
    </div>
  )
}

export default DateTimeInput
