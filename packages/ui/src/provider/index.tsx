import React, { ReactNode } from 'react'

import '../global.css'

interface CarrotUIProviderProps {
  children: ReactNode
}

export const CarrotUIProvider = ({ children }: CarrotUIProviderProps) => <>{children}</>
