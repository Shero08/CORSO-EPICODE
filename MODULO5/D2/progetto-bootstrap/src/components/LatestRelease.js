import '../css/LatestRelease.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import MyCard from './MyCard';
import data from '../json/fantasy.json';

const LatestRelease = () => {
    

  return (
    <main>
        <Container className='py-5'>
            <h1>Latest Release</h1>
            <Row className='row-cols-2 row-cols-sm-3 row-cols-md-5 g-4'>
                {data.map((book) => {
                    return(
                        <MyCard 
                            img={book.img}
                            title={book.title}
                            category={book.category}
                        />
                    )
                })}
            </Row>
        </Container>
    </main>
  )
}

export default LatestRelease