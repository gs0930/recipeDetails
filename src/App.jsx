import React, { useEffect, useState } from 'react';
import './App.css';
import FoodInfo from './Components/foodInfo';
// import Plot from 'plotly.js-dist-min';
// import Chart from 'chart.js/auto';
import { Link } from "react-router-dom";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [diet, setDiet] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [chartData, setChartData] = useState([]);


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&diet=${diet}&cuisineType=${cuisine}&app_id=a4a07192&app_key=6021841523f8ebb66f7253646351c79c`);
        const data = await response.json();
        setRecipes(data.hits);
        const chartData = data.hits.map(recipe => {
          return {
            name: recipe.recipe.label,
            time: recipe.recipe.totalTime? recipe.recipe.totalTime : null
          };
        });
        setChartData(chartData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm, diet, cuisine]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDietChange = (event) => {
    setDiet(event.target.value);
  };

  const handleCuisineChange = (event) => {
    setCuisine(event.target.value);
  };

  const [recipe, setRecipe] = useState(null);
  

  useEffect(() => {
    const getRecipe = async () => {
      try {
        if (recipe) {
          const response = await fetch(
            `https://api.edamam.com/api/recipes/v2/?type=public&app_id=a4a07192&app_key=6021841523f8ebb66f7253646351c79c`
          );
          const json = await response.json();
          setRecipe(json);

          
  
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    getRecipe();
  }, [recipe]);

  const handleRecipeClick = (recipe) => {
    setRecipe(recipe);
  };

  return (
    <div className="App">
      <h3># of Dishes Displayed: {recipes?.length}</h3>
      <h1>Recipe Finder</h1>
      <div>
        <label htmlFor="searchTerm">Search: </label>
        <input type="text" id="searchTerm" value={searchTerm} onChange={handleSearch} />
      </div>
      <div>
        <label htmlFor="diet">Diet: </label>
        <select id="diet" value={diet} onChange={handleDietChange}>
          <option value="">Any</option>
          <option value="balanced">Balanced</option>
          <option value="high-protein">High-Protein</option>
          <option value="low-fat">Low-Fat</option>
          <option value="low-carb">Low-Carb</option>
        </select>
      </div>
      <div>
        <label htmlFor="cuisine">Cuisine: </label>
        <select id="cuisine" value={cuisine} onChange={handleCuisineChange}>
          <option value="">Any</option>
          <option value="american">American</option>
          <option value="asian">Asian</option>
          <option value="british">British</option>
          <option value="caribbean">Caribbean</option>
          <option value="central europe">Central Europe</option>
          <option value="chinese">Chinese</option>
          <option value="eastern europe">Eastern Europe</option>
          <option value="french">French</option>
          <option value="indian">Indian</option>
          <option value="italian">Italian</option>
          <option value="japanese">Japanese</option>
        
          
        </select>
      </div>
      <div>
      <h4>Total Time (mins)</h4>
      <h6>Some recipes do not have total time given</h6>

      <BarChart width={800} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="time" fill="#8884d8" />
      </BarChart>

      <h3>Recipes</h3>

    </div>
      {recipes?.map((recipe) => (
        <div key={recipe.title}>
          <p></p>
          <Link
            // style=Unspecified
            to={`/foodDetails/${recipe.recipe.label}`}
            key={recipe.recipe.label}
          >
            <p>{recipe.recipe.label}</p>
            
            {/* {label} <span className="tab"></span> ${recipe.label}  */}
          </Link>
          {/* <h2>{recipe.recipe.label}</h2> */}
          <p>Calories: {Math.round(recipe.recipe.calories)}</p>
          {/* <p>Instructions: {recipe.recipe.instructions}</p> */}

          {recipe.recipe.totalTime > 0 && <p>Time: {recipe.recipe.totalTime} minutes</p>}
          {/* <p>Ingreients: {recipe.nutrition?.nutrients.map((nutrient) => `${nutrient.title}: ${nutrient.amount}${nutrient.unit}`).join(', ')}</p> */}
        <img src={recipe.recipe.images.SMALL.url}/>
        

        {/* <FoodInfo
              id={recipe.id}
            /> */}
        </div>
      ))}
    </div>
  );
  
}

export default App;