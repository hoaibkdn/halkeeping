import styled from "styled-components";
import React from "react";
import { Input } from "rsuite";

export const Label = styled.label`
  width: ${(props: { width?: string }) => (props.width ? props.width : "40%")};
  color: #444444;
  font-size: 17px;
  margin-bottom: 0;
  font-weight: 600;
`;

export const Textarea = React.forwardRef((props: any, ref: any) => (
  <Input {...props} as="textarea" ref={ref} />
));
