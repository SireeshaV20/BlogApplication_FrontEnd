import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/UserContext'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUserDetails } = useUser(); 

  const handleLogin = () => {
    setError('');

    
    axios
      .post('http://localhost:8080/api/login', { username, password })
      .then(response => {
        setUserDetails(response.data); 
        navigate('/recipes'); 
      })
      .catch(error => {
        setError('Invalid username or password.');
      });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <button className="button" onClick={handleLogin}>Login</button>
        <p className="register-link">
          New User? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
