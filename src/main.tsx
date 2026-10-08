import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/global.css';
import './styles/refinements.css';
import './styles/narration.css';
import './styles/closing.css';
import './styles/renewables.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
