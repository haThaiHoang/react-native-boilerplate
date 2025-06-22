import { createAction } from '@reduxjs/toolkit'
import { AppStateStatus } from 'react-native'

const PREFIX = 'NATIVE_APP_ACTION/'

const changeAppStatus = createAction<AppStateStatus>(
  `${PREFIX}CHANGE_APP_STATUS`
)

const openDeepLink = createAction<string>(`${PREFIX}OPEN_DEEP_LINK`);

export default {
  changeAppStatus,
  openDeepLink,
}
