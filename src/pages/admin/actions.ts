// @ts-nocheck
import type { Dispatch } from "../../reduxStore/store"
import { saveToken, createActionType } from "../../utils/apiConfig/url"
import { api } from "../../utils/admin/api"

export const LOGIN = createActionType("LOGIN")
export const GET_ALL_JOBS = createActionType("GET_ALL_JOBS")

export function login(data: Record<string, any>) {
  return async function (dispatch: Dispatch) {
    const response = await api.login(data)

    if (response?.data?.error === 0) {
      const token = `Bearer ${response.data.token}`
      console.log({
        token
      })
      dispatch({
        type: LOGIN.SUCCEED,
        data: {
          token: token,
          email: data.email.value,
        },
      })
      // save token
      saveToken(token)
      return { error: false }
    }
    dispatch({
      type: LOGIN.FAILED,
    })
    return { error: true, message: response.message }
  }
}


export function getAllJobs({
  limit = 10,
  offset = 0
}) {
  return async function(dispatch: Dispatch) {
    const response = await api.getAllJobs({ limit, offset })
    if (response?.data?.error === 0) {
      console.log({
        response
      })
      dispatch({
        type: GET_ALL_JOBS.SUCCEED,
        data: {
          jobs: response.data.jobs,
          hasMore: response.data.hasMore,
          offset: response.data.offset
        },
      })
      return { error: false }
    }
    dispatch({
      type: GET_ALL_JOBS.FAILED,
    })
    return { error: true, message: response.message }

  }
}