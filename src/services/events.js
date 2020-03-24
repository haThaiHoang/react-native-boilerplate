import { EventEmitter } from 'fbemitter'

const emitter = new EventEmitter()

const createEmitter = (key) => ({
  on: (handler) => emitter.addListener(key, handler),
  emit: (payload) => emitter.emit(key, payload),
  off: (token) => token.remove && token.remove()
})

// Create event emitters here
export const loginSuccess = createEmitter('LOGIN_SUCCESS')
