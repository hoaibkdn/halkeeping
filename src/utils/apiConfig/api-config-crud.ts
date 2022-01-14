import { BASE_URL, getToken } from "./url"
import { GetJson, PostJson } from "./apiTypes"

export function configCRUD(baseUrl: string = BASE_URL) {
  function fetchJson(url: string) {
    const token = getToken()
    const requestOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
    return fetch(`${baseUrl}${url}`, requestOption).then((response) =>
      response.json()
    )
  }

  function formPost(url: string, data: Record<string, any>, method?: string) {
    const bodyData = new FormData()

    for (const key in data) {
      bodyData.append(key, data[key])
    }
    const token = getToken()

    const requestOption = {
      method: method || "POST",
      headers: {
        Authorization: token,
      },
      body: bodyData,
    }

    return fetch(`${BASE_URL}${url}`, requestOption).then((response) =>
      response.json()
    )
  }

  function formPut(url: string, data: Record<string, any>) {
    const bodyData = new FormData()

    for (const key in data) {
      bodyData.append(key, data[key])
    }

    const token = getToken()

    const requestOption = {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: bodyData,
    }

    return fetch(`${BASE_URL}${url}`, requestOption).then((response) =>
      response.json()
    )
  }

  function formDelete(url: string) {
    const token = getToken()

    const requestOption = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }

    return fetch(`${BASE_URL}${url}`, requestOption).then((response) =>
      response.json()
    )
  }

  function jsonGet(config: GetJson) {
    const requestOption = {
      method: "GET",
      headers: {
        ...config.header,
        "Content-Type": "application/json",
      },
    }
    return fetch(`${BASE_URL}${config.url}`, requestOption).then((response) =>
      response.json()
    )
  }

  function jsonPost(config: PostJson) {
    const token = getToken()
    const requestOption = {
      method: "POST",
      headers: {
        ...config.header,
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(config.data),
    }
    return fetch(`${BASE_URL}${config.url}`, requestOption).then((response) =>
      response.json()
    )
  }

  return { fetchJson, formPost, formPut, formDelete, jsonGet, jsonPost }
}
