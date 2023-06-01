import React, { useEffect, useState, useRef } from 'react';
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
        let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=a4a07192&app_key=6021841523f8ebb66f7253646351c79c`;

        if (searchTerm) {
          url += `&q=${searchTerm}`;
        }
        if (diet) {
          url += `&diet=${diet}`;
        }
        if (cuisine) {
          url += `&cuisineType=${cuisine}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setRecipes(data.hits);
        const chartData = data.hits.map(recipe => ({
          name: recipe.recipe.label,
          time: recipe.recipe.totalTime ? recipe.recipe.totalTime : null
        }));
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

  const recipesRef = useRef(null);

  const handleClickBar = (data, index) => {
    // Scroll to the corresponding recipe
    recipesRef.current.children[index].scrollIntoView({ behavior: 'smooth' });
    
  };

  const [recipe, setRecipe] = useState(null);
  const handleClearResults = () => {
    setCuisine('');
    setDiet('');
    setSearchTerm('');
  };


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
      {/* {recipes?.length > 0 && (
        <h3>Number of Dishes Displayed: {recipes.length}</h3>
      )}       */}
      <h1>Recipe Finder</h1>
      <h5>Search for foods to get recipes from the Edamam API! 😋 </h5>
      <div>
        <label className="big" htmlFor="searchTerm">Search: </label>
        
        <input className="bigger" type="text" id="searchTerm" value={searchTerm} onChange={handleSearch} placeholder="Enter food name..." />
      </div>
      <div>
        <label className="big" htmlFor="diet">Diet: </label>
        
        <select className="medium" id="diet" value={diet} onChange={handleDietChange}>
          <option value="">Any</option>
          <option value="balanced">Balanced</option>
          <option value="high-protein">High-Protein</option>
          <option value="low-fat">Low-Fat</option>
          <option value="low-carb">Low-Carb</option>
        </select>
       
      </div>
      <div>
        <label className="big" htmlFor="cuisine">Cuisine: </label>
        <select className="medium" id="cuisine" value={cuisine} onChange={handleCuisineChange}>
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
          <option value="korean">Korean</option>
          <option value="mexican">Mexican</option>
          <option value="middle eastern">Middle Eastern</option>
          <option value="south east asian">South East Asian</option>

        </select>
      </div>
      <button className="clear" onClick={handleClearResults}>Clear Selections</button>

      {recipes?.length == 0 && (
          <div className="bottom"><h5>Emily Suh</h5></div>
        )}

      <div>
        {recipes?.length > 0 && (
          <h4>Total Time (mins) For Each Recipe: </h4>
        )}
        {recipes?.length > 0 && (
          <h6>Recipes that do not have total time given are not displayed</h6>
        )}


        {chartData.length > 0 && (
          <BarChart width={800} height={300} data={chartData.filter(data => data.time !== null)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="time" fill="#8884d8" />
          </BarChart>
        )}

        {recipes?.length > 0 && (
          <h2>Recipes</h2>
        )}
        

        {recipes?.length == 0 && (searchTerm?.length>0 || diet?.length>0 ||cuisine?.length>0) && (
          <h3>No Results Found. Please adjust filters.</h3>
        )}


      </div>

      <div ref={recipesRef}>
        {recipes?.map((recipe) => (
          <div key={recipe.title} className="recipe-background">
            <p></p>
            <h2>{recipe.recipe.label}</h2>
            <Link
              // style=Unspecified
              to={`/foodDetails/${recipe.recipe.label}`}
              key={recipe.recipe.label}
              
            >
              <h3>See Recipe</h3>


            </Link>
            <p>Calories: {Math.round(recipe.recipe.calories)}</p>

            {recipe.recipe.totalTime > 0 && <p>Time: {recipe.recipe.totalTime} minutes</p>}
            {/* <p>Ingreients: {recipe.nutrition?.nutrients.map((nutrient) => `${nutrient.title}: ${nutrient.amount}${nutrient.unit}`).join(', ')}</p> */}
            <img src={recipe.recipe.images.SMALL.url} />


            {/* <FoodInfo
              id={recipe.id}
            /> */}
          </div>

        ))}
      </div>

      {recipes?.length > 0 && (
          <h4>© 2023 Emily Suh</h4>
        )}
    </div>
  );

}

export default App;