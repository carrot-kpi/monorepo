import { cva } from 'class-variance-authority'
import React, { ReactNode } from 'react'

const buttonStyles = cva(
  [
    'font-mono rounded-2xl border border-black disabled:text-white disabled:bg-gray-400 disabled:border-gray-400',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-black text-white hover:bg-carrot-orange hover:text-black',
        secondary: 'bg-transparent hover:bg-black hover:text-white text-black',
      },
      size: {
        big: ['px-6 py-5'],
        small: ['px-6 py-4 text-xs'],
        xsmall: ['p-4 text-xs'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'big',
    },
  }
)

export interface CarrotButtonProps {
  onClick?: (event: React.MouseEvent) => void
  href?: string
  disabled?: boolean
  loading?: boolean
  className?: string
  size?: 'big' | 'small' | 'xsmall'
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

export const Button = ({
  href,
  variant,
  size,
  disabled,
  onClick,
  loading,
  children,
  className,
}: CarrotButtonProps) => {
  if (href) {
    return (
      <a className={buttonStyles({ size, variant, className })} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button
      disabled={disabled || loading}
      className={buttonStyles({ size, variant, className })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
