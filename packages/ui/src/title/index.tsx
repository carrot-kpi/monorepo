import React, { ReactNode } from 'react'
import { cva } from 'class-variance-authority'

const titleStyles = cva(['font-sans', 'font-bold'], {
  variants: {
    color: {
      white: 'text-white',
      black: 'text-black',
    },
    size: {
      sm: ['text-sm'],
      xl: ['text-xl'],
      '2xl': ['text-2xl'],
      '3xl': ['text-3xl'],
      '4xl': ['text-4xl'],
      '5xl': ['text-5xl'],
      '6xl': ['text-6xl'],
      '7xl': ['text-7xl'],
      '8xl': ['text-8xl'],
      '9xl': ['text-9xl'],
    },
  },
  defaultVariants: {
    color: 'black',
    size: 'sm',
  },
})

export interface TitleProps {
  size?: 'sm' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
  color?: 'white' | 'black'
  className?: string
  children: ReactNode
}

export const Title = ({ children, size, color, className }: TitleProps) => {
  return <p className={titleStyles({ color, size, className })}>{children}</p>
}
