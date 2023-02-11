import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import '../css/mycard.css';

const MyCard = (props) => {

  return (
    <Col>
      <Card>
        <div className='bd-placeholder-img card-img-top' style={{backgroundImage: `url(${props.img})`}}></div>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.category}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default MyCard