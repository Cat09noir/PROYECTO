import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/styles.css';

// Punto de entrada: React monta la aplicación dentro del elemento root.
createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
