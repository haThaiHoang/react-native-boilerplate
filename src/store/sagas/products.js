import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { getProducts } from '@/api/products'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.GET_PRODUCTS, sagaHelper({
      api: getProducts
    }))
  ])
}
