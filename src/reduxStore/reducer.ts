import { combineReducers } from "redux"
import publicReducer from "../pages/redux/reducer"

export default combineReducers({
  publicPages: publicReducer,
})
