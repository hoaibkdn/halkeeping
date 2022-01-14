// @ts-nocheck
import React from "react"
import styled from "styled-components"

const Content = styled.div``
const Radio = styled.input`
  width: auto;
  margin-right: 20px;
`
const Label = styled.label`
  color: #606060;
  font-size: 16px;
`

interface Props {
  label: string
  name: string
  value?: any
  onChange?: (e: string) => void
  widthLabel?: string
}

const RadioInput = ({ label, value, onChange, widthLabel, name }: Props) => {
  return (
    <Content>
      <Radio
        type="radio"
        name={name}
        checked={!!value ? true : false}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Label width={widthLabel}>{label}</Label>
    </Content>
  )
}

export default RadioInput
