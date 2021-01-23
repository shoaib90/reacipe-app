import React, {useEffect,useState} from "react";
import './App.css';
// import './components/recipe.component'
import Recipe from "./components/recipe.component";

const App = () => {

  const APP_ID = "b11b9fa6";
  const APP_KEY = "44e20c360e7733c867a7375e7912c18b";
  // const exampleReq = 
  // `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  //This is similar to this.state in classes, here array destructuring is taking place as useState() is giving
  // 2 values in return, the 2nd variable is function  can be used to change the value of first one. 
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  //This gets fired whenever the rendering happens, this is similar to lifecycle methods in classes, this function takes an arrow fn as a parameter.
  useEffect(() => {
    getRecipes() ;
  }, [query]); 

  // useEffect(() => {
  //   console.log(recipes[0].recipe.label); 
  // }, [recipes]); 
//As this fn. gets fired whenever the rendering happens, thus we give it a second argument as empty array which means it will only run
//once, other than that we can also set the state as in we can pass in or set it to something on the change of which this will change, like 
// we can pass in "recipes"  


  const getRecipes = async () => {
    const response = await fetch( 
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  // Any time we get the data from the external source or hit the external API, we neeed to use async await, as we don't know how much time
  // it would take to get the data from that source, thus we need to use await with every promise, or we can use .then approach but this simpler. 

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return(
    <div className= "App">
      <form onSubmit = {getSearch} className="search-form">
        <input className="search-bar" type="text" value = {search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          search
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe key= {recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
      ))  }
      </div>
    </div>
  );
}

export default App;
