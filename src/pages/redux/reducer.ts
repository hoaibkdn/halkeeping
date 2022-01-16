// @ts-nocheck
import {
  GET_PROVINCES,
  BOOK,
  GET_BASIC_INFO,
  CREATE_JOB,
  RESET_BOOK,
} from "./actions";
export interface PublicReducer {
  type: string;
  book: any;
  province: any;
}

const initState = {
  type: "",
};

function publicReducer(state: PublicReducer = initState, action: any) {
  switch (action.type) {
    case GET_PROVINCES.SUCCEED:
      return {
        ...state,
        province: {
          ...action.province,
        },
      };

    case BOOK.SUCCEED:
      return {
        ...state,
        book: {
          ...action.formData,
        },
        type: action.type,
      };
    case RESET_BOOK.SUCCEED:
      return {
        ...state,
        book: {
          ...state?.book,
          hour: null,
          minutes: null,
          date: null,
          time: null,
        },
        type: action.type,
      };
    case GET_BASIC_INFO.SUCCEED:
      return {
        ...state,
        basicInfo: {
          ...action.data,
        },
      };

    case CREATE_JOB.SUCCEED:
      return {
        ...state,
        type: action.type,
      };

    default:
      return state;
  }
}

export default publicReducer;
