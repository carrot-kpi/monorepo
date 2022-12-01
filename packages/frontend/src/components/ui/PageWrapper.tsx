import React, { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
  bgColor?: string
}

export const PageWrapper = ({
  children,
  bgColor = 'bg-transparent',
}: PageWrapperProps) => {
  return <div className={`px-6 lg:px-32 ${bgColor}`}>{children}</div>
}
