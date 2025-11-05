import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'

export const DEV_URL = '/api'

const baseAPI = (url: string, options?: CreateAxiosDefaults): AxiosInstance => {
  return axios.create({ baseURL: url, ...options })
}

const authAPI = (url: string, options?: CreateAxiosDefaults): AxiosInstance => {
  return axios.create({
    baseURL: url,
    withCredentials: true,
    ...options
  })
}

export const baseInstance = baseAPI(DEV_URL)
export const authInstance = authAPI(DEV_URL)
