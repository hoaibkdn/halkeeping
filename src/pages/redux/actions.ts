// @ts-nocheck
import type { Dispatch } from "../../reduxStore/store"
import * as api from "./api"
import { createActionType } from "../../utils/apiConfig/url"

export const CREATE_JOB = createActionType("CREATE_JOB")

export const BOOK = createActionType("BOOK")

export const GET_PROVINCES = createActionType("GET_PROVINCES")

export const GET_BASIC_INFO = createActionType("GET_BASIC_INFO")

export const RESET_BOOK = createActionType("RESET_BOOK")

export function book(formData: Record<string, any>) {
  return async function (dispatch: Dispatch) {
    dispatch({
      type: BOOK.SUCCEED,
      formData,
    })
  }
}

export function resetBook() {
  return async function (dispatch: Dispatch) {
    dispatch({
      type: RESET_BOOK.SUCCEED,
    })
  }
}

export function createJob(formData: Record<string, any>) {
  return async function (dispatch: Dispatch) {
    dispatch({
      type: CREATE_JOB.REQUESTED,
    })
    const response = await api.createJob(formData)

    if (response?.data?.error === 0) {
      dispatch({
        type: CREATE_JOB.SUCCEED,
      })
      return {
        error: false,
      }
    }
    dispatch({
      type: CREATE_JOB.FAILED,
    })
    return {
      error: true,
    }
  }
}

export function getProvinces() {
  return async function (dispatch: Dispatch) {
    dispatch({
      type: GET_PROVINCES.REQUESTED,
    })
    const response = await api.getProvinces()
    const province = response?.province

    if (response) {
      dispatch({
        type: GET_PROVINCES.SUCCEED,
        province,
      })
      return {
        error: false,
      }
    }
    dispatch({
      type: GET_PROVINCES.FAILED,
    })
    return {
      error: true,
    }
  }
}

export function getBasicInfo(data) {
  return async function (dispatch: Dispatch) {
    dispatch({
      type: GET_BASIC_INFO.REQUESTED,
    })
    const response = await api.getBasicInfo(data)

    if (response) {
      dispatch({
        type: GET_BASIC_INFO.SUCCEED,
        data: response?.data,
      })
      return {
        error: false,
      }
    }
    dispatch({
      type: GET_BASIC_INFO.FAILED,
    })
    return {
      error: true,
    }
  }
}
