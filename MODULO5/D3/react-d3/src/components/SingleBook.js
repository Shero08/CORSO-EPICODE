import React, {useState} from 'react'
import Card from 'react-bootstrap/Card';
import '../css/singleBook.css';

const SingleBook = (props) => {
  const [selected, setSelected] = useState(false);

  const changeBorder = () => {
    setSelected(!selected)
  }

  return (
    <div className='col'>
      <Card 
        className={selected ? 'selected' : ''}
        onClick={changeBorder}
      >
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleBook 