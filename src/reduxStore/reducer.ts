import { combineReducers } from "redux"
import publicReducer from "../pages/redux/reducer"
import adminReducer from '../pages/admin/reducer'

export default combineReducers({
  publicPages: publicReducer,
  adminInfo: adminReducer
})
