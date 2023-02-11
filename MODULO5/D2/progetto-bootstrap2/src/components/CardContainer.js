import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import MyCard from './MyCard';

const CardContainer = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const [productID, setProductID] = useState(1);

  const nextProd = () => {
    setProductID(productID+1);
  }

  const getData = async () => {
    const products = await fetch(`https://dummyjson.com/products/${productID}`);
    const response = await products.json();
    setData(response);
  }

  useEffect(() => {
    getData();
  }, [productID])

  return (
    <div>
        <Container>
            <h1>Card Container</h1>
            {data && <MyCard 
                title={data.title}
                description={data.description}
                images={data && data.thumbnail}
            />}
            <button onClick={nextProd}>Prodotto Successivo</button>
        </Container>
    </div>
  )
}

export default CardContainer