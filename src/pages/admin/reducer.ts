// @ts-nocheck
import {
  LOGIN,
  GET_ALL_JOBS,
  GET_ALL_CLEANERS,
  GET_JOB_DETAILS,
  GET_PAYMENT_METHODS,
  ADD_EDIT_PAYMENT_METHOD,
  EDIT_JOB,
  GET_ALL_CUSTOMERS,
  DELETE_PAYMENT_METHOD,
} from "./actions";
import getJobsList, {
  transformPaymentMethods,
  convertCustomers,
} from "./transforms";

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
  customers: {
    listIds: Array<string>;
    customerDetail: Object;
    hasMore: boolean;
    offset: number;
  };
}

const initState = {
  type: "",
  adminAuth: {
    token: "",
    email: "",
  },
  jobs: {
    list: [],
    hasMore: true,
    offset: 0,
  },
  cleaners: {},
  paymentMethods: {
    listIds: [],
    paymentDetail: {},
  },
  customers: {
    listIds: [],
    customerDetail: {},
    hasMore: true,
    offset: 0,
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
        return [edittingId, ...state.paymentMethods.listIds];
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

    case GET_JOB_DETAILS.SUCCEED:
      return {
        ...state,
        jobDetail: action.data,
      };

    case EDIT_JOB.SUCCEED:
      return {
        ...state,
        editJobState: "success",
      };

    case GET_ALL_CUSTOMERS.SUCCEED:
      return {
        ...state,
        customers: convertCustomers(action.data),
      };

    case DELETE_PAYMENT_METHOD.SUCCEED:
      const paymentMethodsIds = state.paymentMethods?.listIds.filter(
        (item) => item !== action.id
      );

      delete state.paymentMethods.paymentDetail[action.id]
      return {
        ...state,
        paymentMethods: {
          listIds: paymentMethodsIds,
          paymentDetail: state.paymentMethods.paymentDetail 
        },
      };
    default:
      return state;
  }
}

export default adminReducer;
