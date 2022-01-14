import styled from "styled-components"

export const Label = styled.label`
  width: ${(props: { width?: string }) => (props.width ? props.width : "40%")};
  color: #444444;
  font-size: 17px;
  margin-bottom: 0;
  font-weight: 600;
`

export const MessageError = styled.span`
  color: #ff0000;
  font-size: 12px;
  font-style: italic;
  margin-left: ${(props: { marginLeft?: string }) =>
    props.marginLeft ? props.marginLeft : "29%"};
`
