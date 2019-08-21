import { TokenApi } from './endpoint'

export const login = payload => TokenApi.post('/login', payload)
