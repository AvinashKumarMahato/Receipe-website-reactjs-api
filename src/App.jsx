import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Simulate fetching data from the API
    fetchRecipes();
  }, []);

  useEffect(() => {
    // Update filteredRecipes when recipes changes
    setFilteredRecipes(recipes);
  }, [recipes]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('https://avinashkumarmahato.github.io/Dummy-Receipe-Api/db.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      //console.log('API Data:', data);
      setRecipes(data);
    } catch (error) {
      //console.error('Error fetching recipes:', error);
    }
  };

  const handleSearch = () => {
    // Check if recipes is defined before searching
    if (!recipes) {
      //console.error('Recipes is not defined.');
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = recipes.filter(recipe => recipe.title.toLowerCase().includes(lowerCaseSearchTerm));
    setFilteredRecipes(filtered);
  };

  return (
    <div className="App">
      <h1>Recipe Website</h1>

      {/* Search bar and button */}
      <div id="search-container">
        <input
          type="text"
          id="search-bar"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button id="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Recipes container */}
      <div id="recipes-container">
        {filteredRecipes && filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Instructions: {recipe.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
