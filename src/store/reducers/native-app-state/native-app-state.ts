import { createReducer } from '@reduxjs/toolkit'
import { type NativeAppState } from '@/types/native-app-state.types'
import { NativeAppActions } from '../../actions'

const initNativeAppState: NativeAppState = {
  appStatus: 'active',
}
const nativeAppState = createReducer(initNativeAppState, (builder) => {
  builder.addCase(NativeAppActions.changeAppStatus, (state, action) => {
    if (state.appStatus !== action.payload) {
      state.appStatus = action.payload
    }
    return state
  })
})

export default nativeAppState
