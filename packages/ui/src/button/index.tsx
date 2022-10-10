/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Theme } from '@emotion/react'
import { ReactNode } from 'react'

export interface ButtonProps {
  variant: 'primary' | 'secondary'
  size: 'standard' | 'small'
  label: ReactNode
}

const specBySize: Record<ButtonProps['size'], any> = {
  standard: { height: 64, paddingLeft: 24, paddingRight: 24, borderRadius: 16 },
  small: { height: 48, paddingLeft: 16, paddingRight: 16, borderRadius: 10 },
}

const specByVariant = (theme: Theme): Record<ButtonProps['variant'], any> => {
  return {
    primary: {
      border: `1px solid ${theme.colors.gray10}`,
      backgroundColor: theme.colors.orange6,

      // TODO: once a typography component is developed, use it instead of these hardcoded styles
      fontFamily: '"IBM Plex Mono", monospace;',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 24,
      letterSpacing: 0,
      textAlign: 'center',

      ':hover': {
        backgroundColor: theme.colors.gray10,
        color: theme.colors.orange6,
        borderColor: theme.colors.orange6,
      },
    },
    secondary: {
      border: `1px solid ${theme.colors.gray10}`,
      backgroundColor: 'transparent',

      // TODO: once a typography component is developed, use it instead of these hardcoded styles
      fontFamily: '"IBM Plex Mono", monospace;',
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 16,
      letterSpacing: '0.02em',
      textAlign: 'center',

      ':hover': {
        backgroundColor: theme.colors.gray10,
        color: theme.colors.white,
        borderColor: theme.colors.white,
      },
    },
  }
}

export const Button = ({ variant, size, label, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      css={(theme) => {
        return {
          ...specBySize[size],
          ...specByVariant(theme)[variant],
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          textTransform: 'uppercase',
          transition: 'background-color .2s ease, color .2s ease, border-color .2s ease',
        }
      }}
    >
      {label}
    </button>
  )
}
