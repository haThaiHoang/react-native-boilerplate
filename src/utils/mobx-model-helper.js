import { types, flow, getSnapshot, applySnapshot } from 'mobx-state-tree'
import { Toast } from 'native-base'
import lodash from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'

import Misc from '@/utils/misc'
import Request from '@/utils/request'
import { navigate } from '@/utils/navigation'
import ERROR_MESSAGE from '@/constants/error-messages'

const Modal = types.model('MobxModalHelper', {
  type: types.maybeNull(types.string),
  error: types.frozen()
})
  .actions((self) => ({
    afterCreate() {
      self.INIT_VALUES = getSnapshot(self)
    },

    clear() {
      applySnapshot(self, self.INIT_VALUES)
    },

    request: flow(function* ({
      type,
      api,
      payload,
      onSuccess,
      onError,
      handleError,
      disabledErrorMessage,
      successMessage
    }) {
      if (type) {
        self.type = type
      }
      self.error = null

      let data = null
      let success = false

      try {
        if (api) {
          const { data: result, status } = yield api(payload)

          if (status) {
            if (onSuccess) onSuccess(result)

            if (successMessage) {
              Toast.show({
                type: 'success',
                text: successMessage,
                buttonText: 'Ok'
              })
            }

            success = true
            data = result
          } else {
            success = false
            data = result

            throw result
          }
        }
      } catch (e) {
        const error = yield Misc.getErrorJsonBody(e)
        self.error = error
        // eslint-disable-next-line no-console
        console.warn(error)

        if (error.messageCode === 'TOKEN_INVALID') {
          Request.removeAccessToken()
          yield AsyncStorage.removeItem('ACCESS_TOKEN')
          navigate('Login')

          return { success: false }
        }

        if (onError) onError(e)

        if (!disabledErrorMessage) {
          Toast.show({
            type: 'danger',
            text: (handleError && (ERROR_MESSAGE[handleError(error)] || handleError(error)))
              || (ERROR_MESSAGE[error.messageCode] || error.messageCode)
              || `Error code: ${error.status || '0'}`,
            buttonText: 'Ok'
          })
        }
      }

      self.type = null

      return { success, data, payload }
    })
  }))

const createTypes = (typeArray) => lodash.reduce(typeArray, (map, value) => {
  map[value] = value

  return map
}, {})

export {
  Modal,
  createTypes
}
