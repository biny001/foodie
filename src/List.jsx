/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function List({
  recipeArray,
  isLoading,
  Errors,
  setSelectedItem,
}) {
  return (
    <ul className="List">
      {isLoading ? (
        <Loader />
      ) : Errors ? (
        <p className="err">{Errors}</p>
      ) : (
        recipeArray
          .slice(0, 9)
          .map((item, index) => (
            <ListItem
              key={index}
              recipeItem={item}
              setSelectedItem={setSelectedItem}
            />
          ))
      )}
      {/* {isLoading ? (
        <Loader />
      ) : (
        recipeArray
          .slice(0, 9)
          .map((item, index) => <ListItem key={index} recipeItem={item} />)
      )} */}
    </ul>
  );
}

function ListItem({ recipeItem, setSelectedItem }) {
  function handleSelect(id) {
    if (id == recipeItem.id) {
      setSelectedItem(recipeItem.id);
    }
  }
  // useEffect(() => {
  //   setRecipe(recipeItem);
  // }, []);
  // console.log(Recipe);
  // console.log(recipeItem);
  return (
    <li onClick={() => handleSelect(recipeItem.id)}>
      <img src={recipeItem.image_url} />
      <div>
        <p>{recipeItem.title}</p>
        <span>{recipeItem.publisher}</span>
      </div>
    </li>
  );
}

function Loader() {
  return <span className="loader"></span>;
}
