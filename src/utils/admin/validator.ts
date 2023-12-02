// @ts-nocheck
import { FormValidation, FormData } from "../apiConfig/apiTypes"

// formValidation = [{type: email, required: true, maxLength: 10, value: ''}]
export function getEmailError(email: FormValidation) {
  if (!email.value && email.required) {
    return "Email is required"
  }
  if (!email.value && !email.required) {
    return ""
  }

  const mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  const isValidEmail = mailformat.test(String(email.value).toLowerCase())
  if (!isValidEmail) {
    return "Email is incorrect"
  }
  return ""
}

export function getPhoneError(phone: FormValidation) {
  if (!phone.value && phone.required) {
    return "Phone is required"
  }
  if (!phone.value && !phone.required) {
    return ""
  }

  // eslint-disable-next-line no-useless-escape
  const phoneFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  const isValidNumber = phoneFormat.test(String(phone.value).toLowerCase())
  if (!isValidNumber) {
    return "Phone is incorrect"
  }
  return ""
}

export function getBirthDayError(day: FormValidation) {
  if (!day.value && day.required) {
    return "Birthday is required"
  }
  if (!day.value && !day.required) {
    return ""
  }

  const dayFormat =  /^\d{1,2}\/\d{1,2}\/\d{4}$/
  const isValidDay = dayFormat.test(String(day.value).toLowerCase())
  if (!isValidDay) {
    return "Birthday is incorrect"
  }
  return ""
}

export function validateForm(
  formData: Record<string, FormData>
): Record<string, FormData> {
  const formError = { ...formData }
  Object.keys(formData).forEach((item: string) => {
    if (item === "email") {
      formError[item].error = getEmailError({
        type: "email",
        value: formData[item].value,
        required: true,
      })
    }

    else if (item === "phone") {
      formError[item].error = getPhoneError({
        type: "phone",
        value: formData[item].value,
        required: true,
      })
    }

    else if (item === "birthDay") {
      formError[item].error = getBirthDayError({
        type: "birthDay",
        value: formData[item].value,
      })
    }
     else {
      formError[item].error = !formData[item].value ? `${item} is required` : ""
    }
  })
  return formError
}