import React, { ReactElement, ReactNode } from 'react'
import { MulticallStateUpdater } from '../state/multicall'

interface CoreProviderProps {
  children: ReactNode
}

export const CoreProvider = ({ children }: CoreProviderProps): ReactElement => {
  return (
    <>
      <MulticallStateUpdater />
      {children}
    </>
  )
}
