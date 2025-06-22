import axios, { AxiosInstance } from 'axios'

type ApiConfig = {
  baseUrl: string
}

let apiConfig: ApiConfig = {
  baseUrl: '',
}

export let axiosInstance: AxiosInstance

export const setApiConfig = async ({ ...config }: ApiConfig) => {
  apiConfig = {
    ...apiConfig,
    ...config,
  }
  axiosInstance = axios.create({
    withCredentials: true,
    baseURL: apiConfig.baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export const getAxiosInstance = () => axiosInstance

export const getApiConfig = () => apiConfig
