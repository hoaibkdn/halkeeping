// @ts-nocheck
import React, { useState, useCallback } from "react"
import { connect } from "react-redux"
import { useHistory, Redirect } from "react-router-dom"
import { Form, Button, Container, Panel, FlexboxGrid, Content, ButtonToolbar } from 'rsuite'

import { FormData } from "../../utils/apiConfig/apiTypes"
import { validateForm } from "../../utils/admin/validator"

import { login } from "../admin/actions"
import { AdminReducer } from "../admin/reducer"

const initFormData: Record<string, FormData> = {
  email: {
    value: "",
    error: "",
  },
  password: {
    value: "",
    error: "",
  },
}

interface State {
  adminInfo: AdminReducer
}

interface LoginResponse {
  error: boolean
  message: string | undefined
}

interface Props {
  loginAction: (form: Record<string, FormData>) => LoginResponse
  adminRole: {
    token?: string
    email?: string
  }
}

const Login = (props: Props) => {
  const formRef = React.useRef();

  const [formData, setFormData] = useState(initFormData)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const onChangeValue = useCallback(
    (value) => {
      const newData = {}

      Object.keys(value).forEach(key => {
        newData[key] = {
          value: value[key],
          error: ''
        }
      })
      setFormData({
        ...newData,
      })
    },
    [formData]
  )

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault()
      setLoading(true)
      const errorForm: Record<string, FormData> = validateForm(formData)
      console.log('errorForm', errorForm)
      if (!errorForm.email.error && !errorForm.password.error) {
        const response = await props.loginAction(formData)
        console.log({
          response,
        })
        if (!response?.error) {
          history.push("/admin/dashboard")
        } else if (response.message) {
          setFormData({
            ...formData,
            password: {
              ...formData.password,
              error: response.message,
            },
          })
        }
      } else {
        setFormData(errorForm)
      }
      setLoading(false)
    },
    [formData, history, props]
  )

  if (props.adminRole?.token) {
    return <Redirect to="/admin/dashboard" />
  }

  const formValues = {
    email: formData?.email?.value,
    password: formData?.password?.value
  }

  return (
    <div className="show-fake-browser login-page">
    <Container>
      <Content>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>Login</h3>} bordered>
              <Form ref={formRef} fluid  onChange={onChangeValue} formValue={formValues}>
                <Form.Group controlId="formBasicEmail">
                  <Form.ControlLabel>Email*</Form.ControlLabel>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                  />
                  {formData.email.error && (
                    <p style={{color: 'red'}}>{formData.email.error}</p>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  {formData.password.error && (
                    <p style={{color: 'red'}}>{formData.password.error}</p>
                  )}
                </Form.Group>
                <Form.Group>
                  <ButtonToolbar>
                    <Button appearance="primary" loading={loading} onClick={handleLogin}>Submit</Button>
                    {/* <Button appearance="link">Forgot password?</Button> */}
                  </ButtonToolbar>
                </Form.Group>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  </div>
  )
}

const mapStateToProps = (state: State) => {
  console.log({
    admin: state,
  })
  return {
    adminRole: state?.adminInfo?.adminAuth,
  }
}

const mapDispatchToProps = {
  loginAction: login,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login as any)