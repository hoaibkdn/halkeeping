// @ts-nocheck
import React from "react"
import styled from "styled-components"
import { Label, MessageError } from "./style"
import { Typeahead } from "react-bootstrap-typeahead"

const Content = styled.div`
  display: flex;
  align-items: center;
`

interface Props {
  label?: string
  options: {
    id: string
    name: string
  }[]
  value?: any
  placeholder?: string
  message?: string
  onChange?: (item: any) => void
  widthLabel?: string
  isSubmitted?: boolean
  invalid?: boolean
}

const AutoComplete = ({
  label,
  value,
  message,
  placeholder,
  options,
  onChange,
  widthLabel,
  isSubmitted,
  invalid,
}: Props) => {
  return (
    <div>
      <Content>
        {label ? <Label width={widthLabel}>{label}</Label> : ""}
        <Typeahead
          style={{ width: "100%" }}
          clearButton
          id="basic-typeahead-single"
          labelKey="name"
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          selected={value}
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

export default AutoComplete
