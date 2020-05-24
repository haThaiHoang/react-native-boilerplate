import { types } from 'mobx-state-tree'

import { Model, createTypes } from '@/utils/mobx-model-helper'
import { login } from '@/api/auth'

const TYPES = createTypes([
  'LOGIN'
])

const AuthStore = Model.named('AuthStore')
  .props({
    loggedIn: types.boolean
  })
  .actions((self) => ({
    setLoggedIn(loggedIn) {
      self.loggedIn = loggedIn
    },

    login(payload) {
      return self.request({
        type: TYPES.LOGIN,
        api: login,
        payload,
        onSuccess: () => {
          self.loggedIn = true
        }
      })
    },

    logout() {
      self.loggedIn = false
    }
  }))

export {
  TYPES
}
export default AuthStore.create({
  loggedIn: false
})
