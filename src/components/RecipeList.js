import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './styles.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Recipe Blog</h1>
    
      <button onClick={() => navigate('/add-recipe')}>Add Recipe</button>

      <ul className="recipe-list">
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h3>
              <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
            </h3>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
