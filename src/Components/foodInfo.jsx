import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const API_KEY = import.meta.env.VITE_APP_API_KEY;

//THIS THING isn't used
const FoodInfo = ({ id }) => {
  const [recipe, setRecipe] = useState(null);


  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=a4a07192&app_key=6021841523f8ebb66f7253646351c79c`);
        const data = await response.json();
        setRecipe(data.recipe);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(id);


    getRecipe();
  }, [id]);


  return (
    <div>
      {recipe && (
        <div>
          <p>{recipe.label}</p>
          <img src={recipe.image} alt={recipe.title} />
          {/* <p>{recipe.recipe.instructions} </p> */}
          <Link
            // style=Unspecified
            to={`/foodDetails/${recipe.label}`}
            key={recipe.label}
          >
            <p>hello {recipe.label}</p>
            
            {/* {label} <span className="tab"></span> ${recipe.label}  */}
          </Link>
        </div>
      )}
    </div>
  );
};


export default FoodInfo;
{/* <option value="caribbean">Caribbean</option>
          <option value="central europe">Central Europe</option>
          <option value="chinese">Chinese</option>
          <option value="eastern europe">Eastern Europe</option>
          <option value="french">French</option>
          <option value="indian">Indian</option>
          <option value="italian">Italian</option>
          <option value="japanese">Japanese</option> */}

          // <option value="american">American</option>
          // <option value="asian">Asian</option>
          // <option value="british">British</option>