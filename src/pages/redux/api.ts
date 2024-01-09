// @ts-nocheck
import { configCRUD } from "../../utils/apiConfig/api-config-crud"
export const BASE_URL = "https://halkeeping.onrender.com"

const config = configCRUD()

export interface FormData {
  value: string
  error: string
}
export async function createJob(data: Record<string, FormData>) {
  return await config.jsonPost({
    url: `/api/job/create`,
    data: data,
  })
}

export async function getProvinces() {
  const requestOption = {
    method: "GET",
    headers: {
      ...config.header,
      "Content-Type": "application/json",
    },
  }
  return await fetch(
    `${BASE_URL}/api/provinces?code=48`,
    requestOption
  ).then((response) => response.json())
}

export async function getBasicInfo(data: Record<string, FormData>) {
  return await config.jsonPost({
    url: `/api/job/basic-info`,
    data: data,
  })
}

