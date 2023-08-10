import React, { } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import { useUser } from './contexts/UserContext';
import { UserProvider } from './contexts/UserContext';
import AddRecipeForm from './components/AddRecipeForm'; 

import './App.css';

const UserInfo = () => {
  const loggedInUser = useUser();

  if (loggedInUser?.user) {
    return (
      <div className="user-info">
        <p>Welcome, {loggedInUser.user.username}!</p>
        <button onClick={loggedInUser.clearUserDetails}>Logout</button>
      </div>
    );
  }
  return null;
};

const App = () => {
  //const navigate = useNavigate();

  const renderUserInfo = () => <UserInfo />;

  return (
    <UserProvider>
      <div className="App-header">
        {renderUserInfo()}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="home-title">Welcome to My Blog!</h1>
                <p className="home-description">Discover amazing recipes from around the world.</p>
                <LoginForm onLoginClick={renderUserInfo} />
              </div>
            }
          />
          <Route path="/register" element={<RegisterForm onLoginClick={renderUserInfo} />} />
          <Route path="/login" element={<LoginForm onLoginClick={renderUserInfo} />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/add-recipe" element={<AddRecipeForm />} /> 
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;
