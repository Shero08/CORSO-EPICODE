import React from 'react';
import { Link } from 'react-router-dom';

const InitialPage = () => {
  return (
    <div>
      <div>PAgina iniziale</div>
      <Link to="/products">
        <button>Vai ai Prodotti</button>
      </Link>
    </div>
  );
};

export default InitialPage;
