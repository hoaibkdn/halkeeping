// @ts-nocheck
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { createBrowserHistory } from "history"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import rootReducer from "./reducer"

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["adminInfo.sections"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Note: this API requires redux@>=3.1.0
export const history = createBrowserHistory()
const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
export type Dispatch = typeof store.dispatch
export default store
