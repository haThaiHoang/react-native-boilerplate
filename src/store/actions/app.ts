import { createAsyncThunk } from '@reduxjs/toolkit';

import * as Storage from '@/utils/storage'

import { baseRestApi } from '../apis/base'

export const resetAppState = createAsyncThunk('app/resetAppState', async (_, { dispatch }) => {
  dispatch(baseRestApi.util.resetApiState())

  await Storage.removeItem("GOOGLE_TOKEN")
  await Storage.removeItem("SHOW_WALLET_ASSETS")
})
