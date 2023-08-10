import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import App from './App';
import './index.css';

ReactDOM.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>,
  document.getElementById('root')
);