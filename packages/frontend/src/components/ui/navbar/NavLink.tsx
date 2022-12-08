import React, { ReactNode } from 'react'

export const NavLink = ({ children }: { children: ReactNode }) => (
  <li className="flex items-start space-x-2 cursor-pointer">
    <span className="font-mono text-2xl md:text-base">↳</span>

    <p className="font-mono text-black text-2xl hover:underline md:text-base uppercase underline-offset-[12px]">
      {children}
    </p>
  </li>
)
