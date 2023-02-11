import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductMap = () => {
  const [arrOfProducts, setArrOfProducts] = useState([]);

  const getProducts = async () => {
    const arr = await fetch('https://dummyjson.com/products');
    return await arr.json();
  };

  useEffect(() => {
    getProducts().then((res) => setArrOfProducts(res.products));
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center gap-4 p-4">
      {arrOfProducts &&
        arrOfProducts.map((product, i) => {
          return <ProductCard key={i} singleProduct={product} />;
        })}
    </div>
  );
};

export default ProductMap;
