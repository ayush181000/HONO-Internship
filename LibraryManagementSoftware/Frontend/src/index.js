import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import axios from 'axios';
import store from './store';
import App from './App';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

axios.defaults.baseURL = 'https://honolibrary.onrender.com/';
// axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers['Content-Type'] = 'application/json';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
