import { all } from 'redux-saga/effects'
//
import auth from './auth'
import doctors from './doctors'

export default function* sagas() {
  yield all([
    auth(),
    doctors()
  ])
}
