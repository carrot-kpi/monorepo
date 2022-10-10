/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { ReactNode } from 'react'
import { ThemeProvider } from '@emotion/react'

// importing required fonts
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'

const theme = {
  colors: {
    white: '#FFF',

    gray1: '#F5F5F5',
    gray2: '#E9E9E9',
    gray3: '#CCCCCC',
    gray4: '#B3B3B3',
    gray5: '#999999',
    gray6: '#808080',
    gray7: '#666666',
    gray8: '#4D4D4D',
    gray9: '#272727',
    gray10: '#000000',

    orange1: '#FDF0EA',
    orange2: '#FBDFD3',
    orange3: '#F7C1A9',
    orange4: '#F4A380',
    orange5: '#F2804C',
    orange6: '#EF692B',
    orange7: '#D55C25',
    orange8: '#B24C1D',
    orange9: '#923E17',
    orange10: '#733011',
  },
}

interface CarrotUIProviderProps {
  children: ReactNode
}

export const CarrotUIProvider = ({ children }: CarrotUIProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
