import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

  //all components are rendered in the app
  const container = document.getElementById('app');
  const root = ReactDOM.createRoot(container);

  //rendering the app
  root.render(< App/>);
