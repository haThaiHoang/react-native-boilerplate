import { baseRestApi } from './apis/base'
import * as reducers from './reducers'

export * from './apis/config'
export * from './hooks'
export * from './apis'
export * from './actions'

export const coreReducers = {
  [baseRestApi.reducerPath]: baseRestApi.reducer,
  ...reducers
}

export const coreMiddlewares = [
  baseRestApi.middleware,
]
