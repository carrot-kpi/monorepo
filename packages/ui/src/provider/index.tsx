import React, { ReactNode } from 'react'

import '../global.css'
// importing required fonts
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'

interface CarrotUIProviderProps {
  children: ReactNode
}

export const CarrotUIProvider = ({ children }: CarrotUIProviderProps) => <>{children}</>
