import { combineReducers } from 'redux'
import { localizeReducer } from 'react-localize-redux'

import { TYPES } from '@/store/actions'
import auth from './auth'
import products from './products'

const appReducer = combineReducers({
  localize: localizeReducer,
  auth,
  products
})

export default (state, action) => {
  if (action.type === TYPES.CLEAR_STORE) {
    state = {
      localize: state.localize
    }
  }

  return appReducer(state, action)
}
