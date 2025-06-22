import { createAction } from '@reduxjs/toolkit'

const PREFIX = 'APP'

export const setIsLogined = createAction<boolean>(`${PREFIX}/SET_IS_LOGINED`)
