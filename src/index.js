import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const isViewportLarge = window.innerWidth >= 1024;

if (!isViewportLarge) {
  ReactDOM.render(
    <div>This device is not supported.</div>,
    document.getElementById('root')
  );
} else {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

reportWebVitals();
