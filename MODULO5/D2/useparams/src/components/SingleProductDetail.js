import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const SingleProductDetail = () => {
  const [singleProduct, setSingleProduct] = useState(null);
  // creiamoci uno stato che ci dice quando il fetch è terminato
  const [loading, setLoading] = useState(false);
  // prendiamoci il parametro direttamente, utilizzando l'hook useParams()
  const { id } = useParams();

  // avendo ora l'id del nostro libro possiamo ovviamente ad esempio ricevere tutte le informazioni dell'id corrente.
  const getSingleProducts = async () => {
    // dato che la nostra funzione deve ancora essere eseguita, impostiamo lo stato loading a true
    setLoading(true);
    const productData = await fetch(`https://dummyjson.com/products/${id}`);
    const finalData = await productData.json();
    setSingleProduct(finalData);
    // ora abbiamo i nostri dati, quindi impostiamo lo stato del loading a false
    setLoading(false);
  };

  // chiediamo ad useeffect di prelevare i dati prima che il componente venga montato
  useEffect(() => {
    getSingleProducts();
  }, []);

  return (
    <>
      {loading && <h1>Caricamento in corso</h1>}
      <div>
        {/* qui avremo automaticamente l'id del nostro libro, controlliamo che siano true prima di renderizzare il tutto, e che il loading sia su false */}
        {!loading && singleProduct && (
          <div>
            <div>L'ID del libro è {singleProduct.id}</div>
            <h1>{singleProduct.title}</h1>
            <p>{singleProduct.description}</p>
            <img src={singleProduct.images[0]} width={300} alt="" />
          </div>
        )}
        <Link to="/products">
          <button>Torna a tutti i prodotti</button>
        </Link>
      </div>
    </>
  );
};

export default SingleProductDetail;
