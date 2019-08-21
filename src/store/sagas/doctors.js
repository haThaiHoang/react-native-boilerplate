import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { getDoctors } from '@/api/doctors'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.GET_DOCTORS, sagaHelper({
      api: getDoctors
    }))
  ])
}
