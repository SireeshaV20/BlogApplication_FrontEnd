import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _debounce from 'lodash/debounce';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  const checkUsernameAvailability = _debounce(async (username) => {
    if (username.trim() !== '') {
      try {
        const response = await axios.get(`http://localhost:8080/api/check-username/${username}`);
        setIsUsernameAvailable(response.data);
      } catch (error) {
        setIsUsernameAvailable(false);
      }
    } else {
      setIsUsernameAvailable(true);
    }
  }, 300);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
    checkUsernameAvailability(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await axios.post('http://localhost:8080/api/register', { email, username, password });
      setLoading(false);
      setSuccessMessage('Registration successful!');
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message || 'Registration failed.');
      } else {
        setError('Registration failed.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          {!isUsernameAvailable && (
            <p className="error-message">This username is already taken.</p>
          )}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="button" type="submit" disabled={loading || !isUsernameAvailable}>
            {loading ? 'Loading...' : 'Register'}
          </button>
          <p className="login-link">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
