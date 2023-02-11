import React from 'react'
import backgroundImage from '../assets/businessman.jpg'

const HeroImage = () => {
  return (
    <section>
        <div className='overlay'></div>
        <div className='w-full bg-cover bg-center' style={{ backgroundImage: `url(${backgroundImage})`}}>
            <div className='container mx-auto'>
                <h1 className='p-20 text-white'>CharlieStore</h1>
            </div>
        </div>
    </section>
  )
}

export default HeroImage