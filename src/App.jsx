import NavBar from "./NavBar.jsx";
import List from "./List.jsx";
import RecipeDetails from "./RecipeDetails.jsx";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [recipeArray, setRecipeArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Errors, setErrors] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const apiKey = "11b09299-d782-4926-81a0-b3493686a9cc";

  useEffect(
    function () {
      async function fetchRecipe() {
        setIsLoading(true);
        if (query.length === 0) {
          setIsLoading(false);
          setErrors("");
        }
        try {
          const res = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=${apiKey}`
          );

          const data = await res.json();
          // console.log(data);
          // console.log(data);
          // console.log(data.results);
          if (query != 0 && data.results === 0) {
            throw new Error("cound't find your request");
          }

          // console.log(data);
          setRecipeArray(data.data.recipes);
          // console.log(recipeArray);
          setIsLoading(false);
          setErrors("");
        } catch (err) {
          setErrors(err.message);
          setIsLoading(false);
        }
      }
      fetchRecipe();
    },
    [query]
  );

  return (
    <div className="container">
      <NavBar query={query} setQuery={setQuery} />
      <div className="Content">
        <List
          recipeArray={recipeArray}
          setRecipeArray={setRecipeArray}
          isLoading={isLoading}
          Errors={Errors}
          setSelectedItem={setSelectedItem}
        />
        <RecipeDetails selectedItem={selectedItem} />
      </div>
    </div>
  );
}
