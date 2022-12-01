import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../home'
import { Campaign } from '../campaign'
import { Create } from '../create'
import { Navbar } from '../../components/ui/Navbar'

export function App() {
  return (
    <>
      <Navbar bgColorClass="bg-carrot-orange" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns/:address" element={<Campaign />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  )
}
