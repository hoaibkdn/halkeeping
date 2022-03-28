// @ts-nocheck
import type { Dispatch } from "../../reduxStore/store";
import { saveToken, createActionType } from "../../utils/apiConfig/url";
import { api } from "../../utils/admin/api";

export const LOGIN = createActionType("LOGIN");
export const GET_ALL_JOBS = createActionType("GET_ALL_JOBS");
export const GET_ALL_CLEANERS = createActionType("GET_ALL_CLEANERS");
export const GET_JOB_DETAILS = createActionType("GET_JOB_DETAILS");
export const GET_PAYMENT_METHODS = createActionType("GET_PAYMENT_METHODS");
export const ADD_EDIT_PAYMENT_METHOD = createActionType("ADD_EDIT_PAYMENT_METHOD");
export const EDIT_JOB = createActionType("EDIT_JOB")
export const GET_ALL_CUSTOMERS = createActionType('GET_ALL_CUSTOMERS')
export const DELETE_PAYMENT_METHOD = createActionType("DELETE_PAYMENT_METHOD");

export function login(data: Record<string, any>) {
  return async function (dispatch: Dispatch) {
    const response = await api.login(data);

    if (response?.data?.error === 0) {
      const token = `Bearer ${response.data.token}`;
      dispatch({
        type: LOGIN.SUCCEED,
        data: {
          token: token,
          email: data.email.value,
        },
      });
      // save token
      saveToken(token);
      return { error: false };
    }
    dispatch({
      type: LOGIN.FAILED,
    });
    return { error: true, message: response.message };
  };
}

export function getAllJobs({ limit = 10, offset = 0 }) {
  return async function (dispatch: Dispatch) {
    const response = await api.getAllJobs({ limit, offset });
    if (response?.data?.error === 0) {
      dispatch({
        type: GET_ALL_JOBS.SUCCEED,
        data: {
          jobs: response.data.jobs,
          hasMore: response.data.hasMore,
          offset: response.data.offset,
        },
      });
      return { error: false };
    }
    dispatch({
      type: GET_ALL_JOBS.FAILED,
    });
    return { error: true, message: response.message };
  };
}

export function getAllCleaners({ limit = 10, offset = 0 }) {
  return async function (dispatch: Dispatch) {
    const response = await api.getAllCleaners({ limit, offset });
    if (response?.error === 0) {
      dispatch({
        type: GET_ALL_CLEANERS.SUCCEED,
        data: {
          cleaners: response.cleaners,
          hasMore: response.hasMore,
          offset: response.offset,
        },
      });
      return { error: false };
    }
    dispatch({
      type: GET_ALL_CLEANERS.FAILED,
    });
    return { error: true, message: response.message };
  };
}

export function getJobDetails(id) {
  return async function(dispatch: Dispatch) {
    const response = await api.getJobDetails(id)
    if (response?.data?.error === 0) {
      dispatch({
        type: GET_JOB_DETAILS.SUCCEED,
        data: response?.data?.job,
      })
      return { error: false }
    }
    dispatch({
      type: GET_JOB_DETAILS.FAILED,
    });
    return { error: true, message: response.message };
  };
}

export function getAllPaymentMethod() {
  return async function (dispatch: Dispatch) {
    const response = await api.getPaymentMethods();
    
    if (response?.error === 0) {
      dispatch({
        type: GET_PAYMENT_METHODS.SUCCEED,
        paymentMethods: response.data,
      });
      return { error: false };
    }
    dispatch({
      type: GET_PAYMENT_METHODS.FAILED,
    });
    return { error: true, message: response.message };
  };
}

export function editPaymentMethod(method) {
  return async function(dispatch: Dispatch) {
    const response = await api.addOrEditPaymentMethod(method);
    if(response?.error === 0 || response?.data?.error === 0) {
      dispatch({
        type: ADD_EDIT_PAYMENT_METHOD.SUCCEED,
        method
      })
    }
  }
}

export function editJob(id, data) {
  return async function(dispatch: Dispatch) {
    const response = await api.editJob(id, data)
    if (response?.data?.error === 0) {
      dispatch({
        type: EDIT_JOB.SUCCEED,
      })
      return { error: false }
    }
    dispatch({
      type: EDIT_JOB.FAILED,
    })
    return { error: true, message: response.message }
  }
}

export function getAllCustomers({ limit = 10, offset = 0 }) {
  return async function (dispatch: Dispatch) {

    const response = await api.getAllCustomers({ limit, offset });
    if (response?.data.error === 0) {
      dispatch({
        type: GET_ALL_CUSTOMERS.SUCCEED,
        data: {
          customers: response.data.customers,
          hasMore: response.data.hasMore,
          offset: response.data.offset,
        },
      });
      return { error: false };
    }
    dispatch({
      type: GET_ALL_CUSTOMERS.FAILED,
    });
    return { error: true, message: response.data.message };
  };
}

export function deletePayment(id) {
  return async function(dispatch: Dispatch) {
    const response = await api.deletePaymentMethod(id)
    if (response?.data?.error === 0) {
      dispatch({
        type: DELETE_PAYMENT_METHOD.SUCCEED,
        id,
      })
      return { error: false }
    }
    dispatch({
      type: DELETE_PAYMENT_METHOD.FAILED,
    })
    return { error: true, message: response.message }
  }
}
