import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ProductCard = ({ singleProduct }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={singleProduct.images[0]} />
      <Card.Body>
        <Card.Title>{singleProduct.title}</Card.Title>
        <Card.Text>{singleProduct.description}</Card.Text>
        <Link to={`/products/${singleProduct.id}`}>
          <Button variant="primary">
            Vai al Prodotto - {singleProduct.price}€
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
