import React, { ReactNode } from 'react'
import { cva } from 'class-variance-authority'

const textStyles = cva(['font-mono'], {
  variants: {
    caps: {
      true: ['uppercase'],
    },
    bold: {
      true: ['font-bold'],
    },
    color: {
      white: 'text-white',
      black: 'text-black',
    },
    size: {
      '2xs': ['text-2xs'],
      xs: ['text-xs'],
      sm: ['text-sm'],
      md: ['text-md'],
      lg: ['text-lg'],
      xl: ['text-xl'],
      '2xl': ['text-2xl'],
    },
  },
  defaultVariants: {
    color: 'black',
    size: 'md',
  },
})

interface TextProps {
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  color?: 'white' | 'black'
  bold?: boolean
  caps?: boolean
  className?: string
  children: ReactNode
}

export const TextMono = ({ children, size, color, caps, bold, className }: TextProps) => {
  return <p className={textStyles({ color, size, caps, bold, className })}>{children}</p>
}
