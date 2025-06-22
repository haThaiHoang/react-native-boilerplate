import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { getItem, setItem, removeItem } from '@/utils/storage'
import { setupListeners } from '@reduxjs/toolkit/query'
import { coreReducers, coreMiddlewares } from '@/store'

const persistConfig = {
  key: 'root',
  storage: {
    getItem,
    setItem,
    removeItem,
  },
  whitelist: [],
}

const rootReducers = combineReducers({
  ...coreReducers,
})
const persistedReducer = persistReducer(persistConfig, rootReducers)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware): any => {
    const middlewares = getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
    return middlewares.concat(...coreMiddlewares)
  },
  devTools: process.env.NODE_ENV !== 'production',
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const MainStore = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
)

export default MainStore
