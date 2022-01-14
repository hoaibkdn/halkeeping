// @ts-nocheck
export const BASE_URL = "https://halkeeping.herokuapp.com"
// export const BASE_URL = "http://localhost:3000"

export const createActionType = (rootType: string) => {
  return {
    REQUESTED: `${rootType}_REQUESTED`,
    SUCCEED: `${rootType}_SUCCEED`,
    FAILED: `${rootType}_FAILED`,
  }
}

export function saveToken(token: string) {
  localStorage.setItem("token", token)
}
export function getToken(): string {
  const token = localStorage.getItem("token")
  return token || ""
}
