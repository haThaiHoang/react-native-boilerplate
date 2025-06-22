import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import camelcaseKeys from 'camelcase-keys'
import decamelizeKeys from 'decamelize-keys'
import type { AxiosRequestConfig, AxiosError } from 'axios'

import { setIsLogined } from '@/store'
import { TMockApi, MockApi, emitter } from '@/utils'
import { SET_NAVIGATOR_FLOW_EMMITER } from '@/constants'
import i18n from '@/locale'
import { axiosInstance } from '../config'

type RequestConfig = {
  mockData?: TMockApi<unknown>
  decamelizeData?: boolean
} & AxiosRequestConfig

type AxiosBaseQueryError = {
  status: number | undefined
  data: { error: string, error_code: string } | unknown
}

const baseQuery: BaseQueryFn<RequestConfig, unknown, AxiosBaseQueryError> = async ({
  url,
  method,
  data,
  params,
  mockData,
  decamelizeData = true,
}, { dispatch }) => {
  try {
    if (mockData) {
      const result = await MockApi(mockData)

      return { data: camelcaseKeys(result as any, { deep: true }) }
    }

    const result = await axiosInstance({
      url,
      method,
      data: decamelizeData ? decamelizeKeys(data, { deep: true }) : data,
      params: decamelizeData ? decamelizeKeys(params, { deep: true }) : params,
    })

    return { data: camelcaseKeys(result.data, { deep: true }) }
  } catch (axiosError) {
    const err = axiosError as AxiosError<{ error: string, error_code: string }>
    let message = `${err.response?.data?.error || err.message || i18n.t('something_went_wrong')}`

    console.log(`Rest api error - [${method}] ${url} - `, message)

    if (err.response?.data?.error_code === 'other_unauthorized') {
      dispatch(setIsLogined(false))
      emitter.emit(SET_NAVIGATOR_FLOW_EMMITER, 'login')
    }

    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    }
  }
}

export const baseRestApi = createApi({
  reducerPath: 'rest-api',
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
})
