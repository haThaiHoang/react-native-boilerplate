import { NavigationActions } from 'react-navigation'
import { put, select } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'

import Notification from '@/utils/notification'
import { actions } from '@/store/actions'

export default function sagaHelper({ api, successMessage, errorHandler }) {
  return function* ({ type, data, callback }) {
    const requestType = `${type}_REQUEST`
    const successType = `${type}_SUCCESS`
    const failureType = `${type}_FAILURE`

    try {
      yield put({ type: requestType, payload: data })

      const { success, result } = yield api(data)

      if (success) {
        yield put({ type: successType, data: result, payload: data })

        if (successMessage) Notification.success(successMessage)

        if (callback) callback(successType, result)
      } else {
        throw result
      }
    } catch (e) {
      yield put({ type: failureType, error: e })

      const localize = yield select((state) => state.localize)
      const languageIndex = localize.languages[0].active ? 0 : 1
      const getLocalizeErrorMessages = (name) => (localize.translations[`error-messages.${name}`] || [])[languageIndex]

      if (['TOKEN_EXPIRED'].includes(e.name)) {
        yield AsyncStorage.removeItem('ACCESS_TOKEN')
        yield put(NavigationActions.navigate({ routeName: 'Login' }))
        yield put(actions.clearStore())
      }

      if (errorHandler) {
        errorHandler(e, getLocalizeErrorMessages)
      } else {
        Notification.error(getLocalizeErrorMessages(e.name) || e)
      }

      if (callback) callback(failureType, e)
    }
  }
}
