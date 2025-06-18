import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row  gap-4 justify-end font-medium  bg-gray-800 p-4 w-full'>
        <NavLink
        to={'/'}>
           <h1>Home</h1>
        </NavLink>
         <NavLink
        to={'/pastes'}>
            <h1>Pastes</h1>
        </NavLink>
    </div>
  )
}

export default Navbar