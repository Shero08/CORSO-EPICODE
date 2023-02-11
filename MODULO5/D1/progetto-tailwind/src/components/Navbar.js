import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full bg-rose-700 p-4 text-white md:bg-red-600 lg:bg-blue-600'>
      <nav className='container mx-auto'>
        <ul className='flex justify-between'>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
        </ul>
      </nav>
    </div>
    
  )
}

export default Navbar