import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContext';
import { PlayerContextProvider } from './context/PlayerContext.jsx';
import { BlogProvider } from './context/BlogContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <PlayerContextProvider>
      <BlogProvider>
        <App />
      </BlogProvider>
    </PlayerContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
