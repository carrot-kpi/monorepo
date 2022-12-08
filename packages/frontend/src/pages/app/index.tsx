import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../home'
import { Campaign } from '../campaign'
import { Create } from '../create'
import { Navbar } from '../../components/ui/navbar/Navbar'

export function App() {
  return (
    <>
      <Navbar bgColor="orange" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns/:address" element={<Campaign />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  )
}
