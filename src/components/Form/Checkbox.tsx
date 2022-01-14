// @ts-nocheck
import React from "react"
import styled from "styled-components"

const Checkbox = styled.input`
  width: auto;
  margin-right: 20px;
`
const Label = styled.label`
  color: #606060;
  font-size: 16px;
`
const Content = styled.div``

interface Props {
  label: string
  name: string
  value?: any
  onChange?: (e: string) => void
  widthLabel?: string
  note?: string
}

const RadioInput = ({
  label,
  value,
  onChange,
  widthLabel,
  name,
  note,
}: Props) => {
  return (
    <Content>
      <Checkbox
        type="checkbox"
        name={name}
        checked={!!value ? true : false}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Label width={widthLabel}>{label}</Label>
      <span
        style={{
          fontSize: "12px",
          color: "#C0C0C0",
          display: "block",
          marginLeft: "32px",
        }}
      >
        {note}
      </span>
    </Content>
  )
}

export default RadioInput
