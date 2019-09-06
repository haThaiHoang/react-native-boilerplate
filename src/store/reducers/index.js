import { combineReducers } from 'redux'
import { localizeReducer } from 'react-localize-redux'
import { createNavigationReducer } from 'react-navigation-redux-helpers'

import { RootNavigator } from '@/app/navigation'
import { TYPES } from '@/store/actions'
import auth from './auth'
import doctors from './doctors'

const appReducer = combineReducers({
  navigation: createNavigationReducer(RootNavigator),
  localize: localizeReducer,
  auth,
  doctors
})

export default (state, action) => {
  if (action.type === TYPES.CLEAR_STORE) {
    state = {
      localize: state.localize,
      navigation: state.navigation
    }
  }

  return appReducer(state, action)
}
