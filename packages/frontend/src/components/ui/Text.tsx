import React, { ReactNode } from 'react'

interface MainTitleProps {
  children: ReactNode
}

export const MainTitle = ({ children }: MainTitleProps) => {
  return <h1 className="text-5xl font-bold md:text-6xl">{children}</h1>
}

// interface TextProps {
//   size: string
//   color: string
//   weight: string
//   uppercase: boolean
//   children: ReactNode
// }

// export const Text = ({ children }: TextProps) => {
//   return <h1>{children}</h1>
// }
