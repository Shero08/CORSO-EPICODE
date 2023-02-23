import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-black text-white sticky top-0 z-50'>
        <div className="mx-auto max-w-2xl py-2 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <nav className='flex'>
                <div className='brand'>
                    <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                </div>
                <ul className='flex items-center px-4'>
                    <li className='px-2'><Link to={'/'} className='hover:font-bold'>Home</Link></li>
                    <li className='px-2'><Link to={'/about'} className='hover:font-bold'>About</Link></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header