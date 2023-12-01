import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Phonebook from '../pages/phonebook'
import Addcontact from '../pages/addcontact'
import Editpage from '../pages/editpage'
import Privateroute from './privateroute'

export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/phonebook' element={<Privateroute>
          <Phonebook/>
        </Privateroute>} />
        <Route path='/addcontact' element={<Privateroute><Addcontact/></Privateroute>} />
        <Route path='/editcontact/:id' element={<Privateroute><Editpage/></Privateroute>} />
        <Route path='/*' element={<>404 not found</>} />

    </Routes>
  )
}
