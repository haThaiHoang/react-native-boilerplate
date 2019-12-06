import { put } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'
import { Toast } from 'native-base'

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

        if (successMessage) {
          Toast.show({
            type: 'success',
            text: successMessage,
            buttonText: 'Ok'
          })
        }

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
        Toast.show({
          type: 'danger',
          text: error.name || `Error code: ${error.status}`,
          buttonText: 'Ok'
        })
      }

      if (callback) callback(false, error)
    }
  }
}
