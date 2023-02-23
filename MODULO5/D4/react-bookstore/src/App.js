import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ErrorPage from './pages/ErrorPage';
import About from './pages/About';
import SingleBook from './components/SingleBook';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/:asin" element={<SingleBook />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
