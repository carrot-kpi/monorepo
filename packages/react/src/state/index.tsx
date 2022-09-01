import { configureStore } from '@reduxjs/toolkit'
import React, { ReactNode } from 'react'
import { multicallReducer } from './multicall/reducer'
import { MulticallStateUpdater } from './multicall/updater'

export const coreStore = configureStore({
  reducer: {
    multicall: multicallReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }),
})

export type CoreAppState = ReturnType<typeof coreStore.getState>
export type CoreAppDispatch = typeof coreStore.dispatch

interface CoreProviderProps {
  children: ReactNode
}

export const CoreProvider = ({ children }: CoreProviderProps) => {
  return (
    <>
      <MulticallStateUpdater />
      {children}
    </>
  )
}

export * from './multicall'
