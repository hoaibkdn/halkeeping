// @ts-nocheck
import { configCRUD } from "../apiConfig/api-config-crud"
import { FormData } from "@hal-group/ui"

const config = configCRUD()

export namespace api {
  export async function login(data: Record<string, FormData>) {
    return await config.jsonPost({
      url: "/api/login",
      data: {
        email: data.email.value,
        password: data.password.value,
      },
    })
  }

  export async function getAllJobs({offset, limit}: {
    offset: number, 
    limit: number
  }) {
    return await config.fetchJson(`/api/job/all?offset=${offset}&limit=${limit}`)
  }

  export async function getAllCleaners({offset, limit}: {
    offset: number, 
    limit: number
  }) {
    return await config.fetchJson(`/api/cleaner?offset=${offset}&limit=${limit}`)
  }
}