
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; 
import { productsApi } from './features/productsApi';
import cartReducer, { getTotals } from './features/cartSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer  :{
    cart:cartReducer,
   [productsApi.reducerPath] : productsApi.reducer  , 
    
  } , 
  middleware : (defaultMiddleware)=>{ 
      return defaultMiddleware().concat(productsApi.middleware) ;
  }
}) ; 
store.dispatch(getTotals()) ; 
  
root.render(
  <React.StrictMode> 
    <Provider store={store} > 
    <App />
  </Provider>    
  </React.StrictMode>
);

