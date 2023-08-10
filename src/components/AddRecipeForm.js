import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const navigate = useNavigate();

  const handleAddRecipe = () => {
    
    axios
      .post('http://localhost:8080/api/recipes', {
        name: recipeName,
        description: recipeDescription,
      })
      .then(response => {
        console.log('Recipe added successfully:', response.data);
        navigate('/recipes'); 
      })
      .catch(error => {
        console.error('Failed to add recipe:', error);
      });
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      <div>
        <label htmlFor="recipeName">Recipe Name:</label>
        <input
          type="text"
          id="recipeName"
          value={recipeName}
          onChange={e => setRecipeName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="recipeDescription">Recipe Description:</label>
        <textarea
          id="recipeDescription"
          value={recipeDescription}
          onChange={e => setRecipeDescription(e.target.value)}
        />
      </div>
      <button onClick={handleAddRecipe}>Add Recipe</button>
    </div>
  );
};

export default AddRecipeForm;
