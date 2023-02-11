import React from 'react';
import InitialPage from './components/InitialPage';
import ProductMap from './components/ProductMap';
import SingleProductDetail from './components/SingleProductDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<InitialPage />} />
        <Route path="/products">
          <Route exact path="/products" element={<ProductMap />} />
          <Route exact path="/products/:id" element={<SingleProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
