import { createReducer } from '@reduxjs/toolkit'

import * as AccountActions from '../actions/account'

type Account = {
  isLogined: boolean
}

const defaultState: Account = {
  isLogined: false
}

export default createReducer<Account>(defaultState, (builder) => {
  builder
    .addCase(AccountActions.setIsLogined, (state, { payload }) => {
      state.isLogined = payload
    })
})
