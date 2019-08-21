import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { LocalizeProvider } from 'react-localize-redux'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import sagas from './sagas'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose
const sagaMiddleware = createSagaMiddleware()
const navigationMiddleware = createReactNavigationReduxMiddleware(state => state.navigation)
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      navigationMiddleware
    )
  )
)

sagaMiddleware.run(sagas)

export default ({ children }) => (
  <Provider store={store}>
    <LocalizeProvider store={store}>
      {children}
    </LocalizeProvider>
  </Provider>
)
