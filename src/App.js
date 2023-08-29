import './App.css';
import { useState, useEffect } from 'react';
import video from "./food.mp4";
import MyRecipesComponent from './MyRecipesComponets';

function App() {

const MY_ID = "c2af274e";
const MY_KEY = "12b7b84c885c7f90085b2fe0fb20745f";

const[search, setSearch] = useState("");
const[myRecipes, setMyRecipes] = useState([]);
const[wordSubmitted, setWordSubmitted] = useState("");

useEffect(() => {
const getRecipe = async() => {
const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY} ` );
const data = await response.json();
setMyRecipes(data.hits);
  }
  getRecipe();
}, [wordSubmitted])

const mySearch = (e) => {
setSearch(e.target.value);
}

const finalSearch = (e) => {
  e.preventDefault();
  setWordSubmitted(search);
}

  return (
  <div className="App">
    
  <div className='container'>
      <video autoPlay muted loop >
        <source src= {video} type='video/mp4' />
      </video>
      <h1>Find Recipe</h1>
    </div>

  <div className='container'>
    <form onSubmit={finalSearch}>
      <input onChange={mySearch} value={search} className='search' type="text" placeholder='Search..' />
    </form>
  </div>
  
  <div className='container'>
  <button onClick={finalSearch} >
    <img src="https://img.icons8.com/fluency/48/000000/fry.png " alt="icon" />
  </button>
  </div>

{ myRecipes.map((element, index) => {
  return(
<MyRecipesComponent key={index}
label = { element.recipe.label } 
calories = { element.recipe.calories}
image = {element.recipe.image} 
ingredients = {element.recipe.ingredientLines} />
)
})} 
</div>
  );
}

export default App;
