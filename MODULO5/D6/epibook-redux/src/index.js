import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import searchReducer from './states/SearchState';
import themeReducer from './states/ThemeState';

const reducer = combineReducers({
  searchStore: searchReducer,
  themeStore: themeReducer
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
