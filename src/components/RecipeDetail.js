import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './styles.css';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();
  const loggedInUser = useUser();
  const loggedInUserId = loggedInUser?.user?.id;
  const navigate = useNavigate(); 

  useEffect(() => {
    setLoading(true);
    setError('');

  
    axios
      .get(`http://localhost:8080/api/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        setError('Failed to fetch recipe details.');
      });

    axios
      .get(`http://localhost:8080/api/recipes/${id}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        setError('Failed to fetch comments.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleCommentSubmit = () => {
    setError('');

    if (!loggedInUserId) {
      setError('User not logged in.');
      return;
    }

    const newCommentData = {
      text: newComment,
      userDetails: {
        id: loggedInUserId,
        
      },
    };

    axios
      .post(`http://localhost:8080/api/recipes/${id}/comments`, newCommentData)
      .then(response => {
        const newCommentWithUserDetails = { ...response.data, userDetails: loggedInUser.user };
        setComments(prevComments => [...prevComments, newCommentWithUserDetails]); 
        setNewComment('');
      })
      .catch(error => {
        setError('Failed to submit comment.');
      });
  };
  return (
    <div className="recipe-detail">
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>

      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>User: {comment.userDetails.username}</strong>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>

      <div className="add-comment">
        <h3>Add Comment</h3>
        <textarea rows="4" value={newComment} onChange={e => setNewComment(e.target.value)} />
        <button onClick={handleCommentSubmit}>Submit Comment</button>
      </div>

      <button onClick={() => navigate('/recipes')}>Back to Recipes List</button> 
    </div>
  );
};

export default RecipeDetail;
