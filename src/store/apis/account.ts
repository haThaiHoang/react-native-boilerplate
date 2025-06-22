import { baseRestApi } from './base'
import { type TUser } from '@/types'

export const authApi = baseRestApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<TUser | null, void>({
      query: () => {
        return {
          method: 'get',
          url: '/api/v1/me',
          toastError: false
        }
      },
    }),
    login: builder.mutation<{ user: TUser } | { error: string }, { email: string, password: string }>({
      query: (payload) => {
        return {
          method: 'post',
          url: '/api/v1/login',
          data: payload,
          mockData: {
            data: {
              accessToken: 'ABC123'
            }
          }
        }
      },
    }),
  }),
})
