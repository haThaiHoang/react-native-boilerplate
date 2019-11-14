import { all } from 'redux-saga/effects'
//
import auth from './auth'
import products from './products'

export default function* sagas() {
  yield all([
    auth(),
    products()
  ])
}
