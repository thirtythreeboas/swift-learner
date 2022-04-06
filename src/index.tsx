import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import logic from './Logic';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

ReactDOM.render(
  <BrowserRouter>
    <Provider logic={logic}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
