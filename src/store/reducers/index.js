import { combineReducers } from 'redux'
import { localizeReducer } from 'react-localize-redux'
import { createNavigationReducer } from 'react-navigation-redux-helpers'

import { RootNavigator } from '@/app/navigation'
import auth from './auth'
import doctors from './doctors'

const appReducer = combineReducers({
  navigation: createNavigationReducer(RootNavigator),
  localize: localizeReducer,
  auth,
  doctors
})

export default (state, action) => {
  if (
    action.type === '@@router/LOCATION_CHANGE'
    && action.payload.location.pathname === '/login'
    && action.payload.action === 'PUSH'
  ) {
    state = {
      localize: state.localize
    }
  }

  return appReducer(state, action)
}
