import React from 'react'
import BookList from '../components/BookList'
import Header from '../components/Header'

const Home = () => {
  return (
    <div>
        <Header /> 
        <section className="main flex mx-auto max-w-full lg:max-w-full">
            <BookList />
        </section>
    </div>
  )
}

export default Home