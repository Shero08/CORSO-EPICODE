import React from 'react'
import Container from 'react-bootstrap/Container';
import '../css/welcome.css'

const Welcome = () => {
  return (
    <section>
        <Container fluid className='jumbotron'>
            <Container className='py-5'>
                <h1 className='fw-bold py-4 text-white'>Book-commerce</h1>
            </Container>
        </Container>
    </section>
  )
}

export default Welcome