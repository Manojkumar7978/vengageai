import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Privateroute({children}) {

    let user=useSelector((e)=>e.user)
  return (
    <div>
        {
            user.length!=0 ? <>
            {children}
            </>
            :
            <>
            <Navigate to='/' />
            </>
        }
      
    </div>
  )
}
