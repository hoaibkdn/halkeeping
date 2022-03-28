// @ts-nocheck
import { configCRUD } from "../apiConfig/api-config-crud";
import { FormData } from "@hal-group/ui";

const config = configCRUD();

export namespace api {
  export async function login(data: Record<string, FormData>) {
    return await config.jsonPost({
      url: "/api/login",
      data: {
        email: data.email.value,
        password: data.password.value,
      },
    });
  }

  export async function getAllJobs({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) {
    return await config.fetchJson(
      `/api/job/all?offset=${offset}&limit=${limit}`
    );
  }

  export async function getAllCleaners({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) {
    return await config.fetchJson(
      `/api/cleaner?offset=${offset}&limit=${limit}`
    );
  }

  export async function getJobDetails(id: number) {
    return await config.fetchJson(`/api/job/detail/${id}`)
  }

  export async function editJob(id: number, data) {
    return await config.formPost(`/api/job/edit/${id}`, data, 'POST')
  }

  export async function getPaymentMethods() {
    return await config.fetchJson(`/api/paymentmethods`);
  }
  
  export async function addOrEditPaymentMethod(method) {
    return await config.jsonPost({
      url: `/api/paymentmethods/add`,
      data: method,
    });
  }

  export async function getAllCustomers() {
    return await config.fetchJson(`/api/customer/get`);
  }
}
