import { types, flow, getSnapshot, applySnapshot, destroy } from 'mobx-state-tree'
import AsyncStorage from '@react-native-community/async-storage'

import Toast from '@/components/toast'
import Misc from '@/utils/misc'
import Request from '@/utils/request'
import { navigate } from '@/utils/navigation'
import ERROR_MESSAGE from '@/constants/error-messages'

const Model = types.model('MobxModelHelper', {
  type: types.maybeNull(types.number),
  error: types.frozen()
})
  .actions((self) => ({
    afterCreate() {
      self.INIT_VALUES = getSnapshot(self)
    },

    clear() {
      applySnapshot(self, self.INIT_VALUES)
    },

    remove(item) {
      destroy(item)
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
          const result = yield api(payload)

          if (onSuccess) onSuccess(result)

          if (successMessage) {
            Toast.show(successMessage)
          }

          success = true
          data = result
        }
      } catch (e) {
        const error = (yield Misc.getErrorJsonBody(e)) || e
        self.error = error
        data = error
        // eslint-disable-next-line no-console
        console.warn(error)

        if (['PERMISSION_DENIED', 'TOKEN_INVALID', 'TOKEN_EXPIRED'].includes(error.statusText)) {
          Request.removeAccessToken()
          yield AsyncStorage.removeItem('ACCESS_TOKEN')
          navigate('Login')

          return { success: false }
        }

        if (onError) onError(e)

        if (!disabledErrorMessage) {
          if (handleError) {
            const handledError = handleError(error)

            if (handledError) {
              Toast.error(ERROR_MESSAGE[handledError] || handledError)
            }
          } else {
            Toast.error(
              (ERROR_MESSAGE[error.statusText] || error.statusText)
              || error.message
            )
          }
        }
      }

      self.type = null

      return { success, data, payload }
    })
  }))

export {
  Model
}
