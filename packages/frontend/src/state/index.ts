import { configureStore } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import { userReducer } from './user/reducer'
import { transactionsReducer } from './transactions/reducer'
import { multiChainLinksReducer } from './multi-chain-links/reducer'
import { multicallReducer } from '@carrot-kpi/react'

const PERSISTED_KEYS: string[] = ['user', 'transactions']

const persistenceNamespace = 'carrot'
export const store = configureStore({
  reducer: {
    user: userReducer,
    multicall: multicallReducer,
    transactions: transactionsReducer,
    multiChainLinks: multiChainLinksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(save({ states: PERSISTED_KEYS, namespace: persistenceNamespace })),
  preloadedState: load({ states: PERSISTED_KEYS, namespace: persistenceNamespace }),
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
