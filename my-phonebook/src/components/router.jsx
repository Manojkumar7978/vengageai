import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Phonebook from '../pages/phonebook'
import Addcontact from '../pages/addcontact'
import Editpage from '../pages/editpage'

export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/phonebook' element={<Phonebook/>} />
        <Route path='/addcontact' element={<Addcontact/>} />
        <Route path='/editcontact/:id' element={<Editpage/>} />

    </Routes>
  )
}
