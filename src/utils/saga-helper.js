import { put } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'

import Notification from '@/components/notification'
import Misc from '@/utils/misc'
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

        if (callback) callback(true, result)
      } else {
        throw result
      }
    } catch (e) {
      const error = yield Misc.getErrorJsonBody(e)
      yield put({ type: failureType, error })

      if (['TOKEN_EXPIRED'].includes(error.name)) {
        yield AsyncStorage.removeItem('ACCESS_TOKEN')
        yield put(actions.clearStore())
      }

      if (errorHandler) {
        errorHandler(error)
      } else {
        Notification.error(error.name || `Error code: ${error.status}`)
      }

      if (callback) callback(false, error)
    }
  }
}
