import React from 'react'
import Header from '../components/Header'

const ErrorPage = () => {
  return (
    <div>
        <Header />

        <div className="mx-auto max-w-2xl py-8 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1>OPS! Qualcosa è andato storto</h1>
        </div>
    </div>
  )
}

export default ErrorPage