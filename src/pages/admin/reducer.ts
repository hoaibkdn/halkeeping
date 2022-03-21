// @ts-nocheck
import {
  LOGIN,
  GET_ALL_JOBS,
  GET_ALL_CLEANERS,
  GET_JOB_DETAILS,
  GET_PAYMENT_METHODS,
  ADD_EDIT_PAYMENT_METHOD,
} from "./actions";
import getJobsList, { transformPaymentMethods } from "./transforms";

export interface AdminReducer {
  type: string;
  adminAuth?: {
    token?: string;
    email?: string;
  };
  jobs: Object;
  cleaners: Object;
  paymentMethods: {
    listIds: Array<string>;
    paymentDetail: Object;
  };
}

const initState = {
  type: "",
  adminAuth: {
    token: "",
    email: "",
  },
  jobs: {},
  cleaners: {},
  paymentMethods: {
    listIds: [],
    paymentDetail: {},
  },
};

function adminReducer(state: AdminReducer = initState, action: any) {
  switch (action.type) {
    case LOGIN.SUCCEED:
      console.log({
        adminData: action.data,
      });
      return {
        ...state,
        adminAuth: action.data,
      };
    case GET_ALL_JOBS.SUCCEED:
      return {
        ...state,
        jobs: {
          list: getJobsList(action.data.jobs),
          hasMore: action.data.hasMore,
          offset: action.data.offset,
        },
      };
    case GET_ALL_CLEANERS.SUCCEED:
      return {
        ...state,
        cleaners: {
          list: action.data.cleaners,
          hasMore: action.data.hasMore,
          offset: action.data.offset,
        },
      };

    case GET_JOB_DETAILS.SUCCEED:
      return {
        ...state,
        currentJob: {
          list: action.data,
        },
      };

    case GET_PAYMENT_METHODS.SUCCEED:
      return {
        ...state,
        paymentMethods: transformPaymentMethods(action.paymentMethods),
      };
    case ADD_EDIT_PAYMENT_METHOD.SUCCEED:
      const edittingId = action.method._id || action.method.id;
      const getNewMethodIds = () => {
        if (state.paymentMethods.listIds.includes(edittingId)) {
          return state.paymentMethods.listIds;
        }
        return [...state.paymentMethods.listIds, edittingId];
      };
      const newMethodIds = getNewMethodIds();
      return {
        ...state,
        paymentMethods: {
          listIds: newMethodIds,
          paymentDetail: {
            ...state.paymentMethods.paymentDetail,
            [edittingId]: { ...action.method, updatedAt: String(new Date()) },
          },
        },
      };
    default:
      return state;
  }
}

export default adminReducer;
