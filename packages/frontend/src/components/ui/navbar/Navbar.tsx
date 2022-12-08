import React, { useState } from 'react'
import { Logo } from '../Logo'
import { Button } from '@carrot-kpi/ui'
import { cva } from 'class-variance-authority'
import { GridPatternBg } from '../GridPatternBg'
import { NavLink } from './NavLink'
import { CloseMenuIcon } from './CloseMenuIcon'
import { HamburguerMenuIcon } from './HamburguerMenuIcon'

const navWrapperStyles = cva([''], {
  variants: {
    bgColor: {
      green: ['bg-carrot-green'],
      orange: ['bg-carrot-orange'],
    },
    isOpen: {
      true: ['fixed top-0 left-0 z-10 h-screen w-full'],
    },
  },
})

const navbarStyles = cva(
  ['relative flex items-center justify-between px-6 py-8 md:py-11 lg:px-32'],
  {
    variants: {
      bgColor: {
        green: ['bg-carrot-green'],
        orange: ['bg-carrot-orange'],
      },
      isOpen: {
        true: ['z-10'],
      },
    },
  }
)

const navStyles = cva([], {
  variants: {
    isOpen: {
      true: ['absolute flex flex-col top-28 left-0 px-6 py-16  w-full'],
      false: ['hidden md:flex '],
    },
  },
})

const navLinksStyles = cva(['flex'], {
  variants: {
    isOpen: {
      true: ['flex-col items-start space-y-8 relative'],
      false: ['items-center space-x-8'],
    },
  },
})

interface NavbarProps {
  bgColor?: 'green' | 'orange'
}

export const Navbar = ({ bgColor }: NavbarProps) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div className={navWrapperStyles({ isOpen, bgColor })}>
      <GridPatternBg className="md:hidden" />
      <div className={navbarStyles({ bgColor, isOpen })}>
        <Logo />
        <nav className={navStyles({ isOpen })}>
          <ul className={navLinksStyles({ isOpen })}>
            <NavLink>About</NavLink>
            <NavLink>Campaigns</NavLink>
            <NavLink>Community</NavLink>
          </ul>
        </nav>
        <Button className="absolute top-96 md:static" size="small">
          Connect wallet
        </Button>
        <div className="md:hidden" onClick={() => setOpen(!isOpen)}>
          {isOpen ? <CloseMenuIcon /> : <HamburguerMenuIcon />}
        </div>
      </div>
    </div>
  )
}
