import { combineReducers } from 'redux'

import { TYPES } from '@/store/actions'
import auth from './auth'
import products from './products'

const appReducer = combineReducers({
  auth,
  products
})

export default (state, action) => {
  if (action.type === TYPES.CLEAR_STORE) {
    state = {}
  }

  return appReducer(state, action)
}
