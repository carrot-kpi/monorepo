import { configureStore } from '@reduxjs/toolkit'
import { multicallReducer } from './multicall/reducer'

export const coreStore = configureStore({
  reducer: {
    multicall: multicallReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }),
})

export type CoreAppState = ReturnType<typeof coreStore.getState>
export type CoreAppDispatch = typeof coreStore.dispatch

export * from './multicall'
