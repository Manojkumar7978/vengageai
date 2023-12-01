import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Phonebook from '../pages/phonebook'

export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/phonebook' element={<Phonebook/>} />
    </Routes>
  )
}
