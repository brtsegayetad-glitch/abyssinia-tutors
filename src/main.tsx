import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Silence benign development-only environment warnings and logs (Vite HMR Connection Failures inside Sandboxes)
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason && 
      (event.reason.message?.includes('WebSocket') || 
       event.reason.toString?.().includes('WebSocket') ||
       event.reason.message?.includes('vite'))
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener('error', (event) => {
    if (
      event.message && 
      (event.message.includes('WebSocket') || 
       event.message.includes('vite') ||
       event.message.includes('HMR'))
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
