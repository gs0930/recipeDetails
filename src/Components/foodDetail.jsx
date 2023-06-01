

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailView() {
  const { title } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${title}&app_id=a4a07192&app_key=6021841523f8ebb66f7253646351c79c`);
        const data = await response.json();
        setRecipe(data.hits[0].recipe);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [title]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{recipe.label}</h2>
      <img src={recipe.image} alt={recipe.label} />
      <p></p>
      <button className="recipe-button">
        <a href={recipe.url} target="_blank" rel="noreferrer">
          Link to Recipe
        </a>
      </button>
      <div className="ingred-background">
      <h3>Ingredients</h3>
     
        <ul className="list">
          {recipe.ingredientLines.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>


      <h3>Health Labels</h3>
      <ul>
        {recipe.healthLabels.map((healthLabel) => (
          <li className="healthLabels" key={healthLabel}>*{healthLabel}</li>
        ))}
      </ul>

    </div>
  );
}

export default DetailView;
