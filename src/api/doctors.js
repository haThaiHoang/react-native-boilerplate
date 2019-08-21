import { TokenApi } from './endpoint'

export const getDoctors = () => TokenApi.get('/doctors')
