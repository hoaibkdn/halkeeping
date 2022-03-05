// @ts-nocheck
import { LOGIN, GET_ALL_JOBS } from "./actions"
import getJobsList from "./transforms"

export interface AdminReducer {
  type: string
  adminAuth?: {
    token?: string
    email?: string
  }
  jobs: Object
}

const initState = {
  type: "",
  adminAuth: {
    token: "",
    email: "",
  },
  jobs: {},
}

function adminReducer(state: AdminReducer = initState, action: any) {
  switch (action.type) {
    case LOGIN.SUCCEED:
      console.log({
        adminData: action.data,
      })
      return {
        ...state,
        adminAuth: action.data,
      }
    case GET_ALL_JOBS.SUCCEED:
      return {
        ...state,
        jobs: {
          list: getJobsList(action.data.jobs),
          hasMore: action.data.hasMore,
          offset: action.data.offset
        },
      }
    default:
      return state
  }
}

export default adminReducer