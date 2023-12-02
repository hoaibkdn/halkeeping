// @ts-nocheck
import React from "react";
import styled from "styled-components";
import { Form } from "rsuite";

const Group = styled.div`
  display: flex;
`;

const Label = styled.label`
  width: 40%;
  color: rgb(68, 68, 68);
  font-size: 17px;
  margin-bottom: 0px;
  font-weight: 600;
`;

const Field = ({
  label,
  value,
  name,
  placeholder,
  hint,
  accepter,
  className,
  onChange,
  ...rest
}: Props) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <Form.Group className="field-control" controlId={`${name}-3`}>
        <Group>
          <Label>{label} </Label>
          <Form.Control
            style={{ width: "100%" }}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            accepter={accepter}
            {...rest}
          />
        </Group>
        <Form.HelpText>{hint}</Form.HelpText>
      </Form.Group>
    </div>
  );
};

export default Field;
