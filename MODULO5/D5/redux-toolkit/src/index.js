import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import productsReducer from './states/ProductState';
import 'bootstrap/dist/css/bootstrap.min.css';

const reducer = combineReducers({
  productsStore: productsReducer
})

const store = configureStore({
  reducer, 
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

