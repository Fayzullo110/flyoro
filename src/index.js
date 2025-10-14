import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import './i18n';
import { CurrencyProvider } from './context/CurrencyContext.jsx';
import { initAnalytics } from './firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </React.StrictMode>
);

// Initialize analytics (no-op on unsupported environments)
initAnalytics();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
