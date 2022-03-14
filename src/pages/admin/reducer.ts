// @ts-nocheck
import { LOGIN, GET_ALL_JOBS, GET_ALL_CLEANERS, GET_JOB_DETAILS } from "./actions";
import getJobsList from "./transforms";

export interface AdminReducer {
  type: string;
  adminAuth?: {
    token?: string;
    email?: string;
  };
  jobs: Object;
  cleaners: Object;
}

const initState = {
  type: "",
  adminAuth: {
    token: "",
    email: "",
  },
  jobs: {},
  cleaners: {},
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
        }
      };

      case GET_JOB_DETAILS.SUCCEED:
        return {
          ...state,
          currentJob: {
            list: action.data
          }
        };
    default:
      return state;
  }
}

export default adminReducer;
