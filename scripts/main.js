const searchForm = document.getElementById("top-search");
const foodUL = document.getElementById("rhyme-results");
searchForm.onsubmit = (ev) => {
  console.log("submitted top-search with", ev);
  ev.preventDefault();
  foodUL.innerHTML = "";
  getTime();
  const formData = new FormData(ev.target);

  const queryText = formData.get("query");
  // console.log("queryText", queryText);
  const recipes = getRecipes(queryText);
  recipes.then((recipe) => {
    const mealsArray = recipe.meals;
    const listItems = mealsArray.map(createFood);
    listItems.forEach((item) => {
      foodUL.appendChild(item);
    });
  });
};

const getRecipeLink = (word) => {
  // const apiKey = "33991f0720b24445860d544fbd81853f";
  console.log("attempting to get recipie for", word);
  return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${word}&number=1&addRecipeInformation=true`)
    .then(response => response.json())
    .then(data => {
      const recipeLink = data.results[0].spoonacularSourceUrl;
      window.open(recipeLink, "_blank");
    })
    .catch(error => console.log(error));

}

const getRecipes = (word) => {
  return fetch(
    `https://themealdb.com/api/json/v1/1/filter.php?a=${word}&apiKey=1`
  ).then((resp) => resp.json());
};

const createFood = (recipe) => {
  const foodList = document.createElement("div");
  const img = document.createElement("img");
  // const name = document.createElement("p");
  const name = document.createElement("button");
  name.onclick = () => getRecipeLink(recipe.strMeal);
  name.textContent = recipe.strMeal;
  foodList.appendChild(img);
  foodList.appendChild(name);
  img.src = recipe.strMealThumb;
  img.width = 300;
  img.height = 300;
  return foodList;
};

const getTime = () => {
  const url = `http://worldtimeapi.org/api/ip`;
  return fetch(url).then((resp) => resp.json()).then(data => {
    const datetime = new Date(data.datetime);
    const date = datetime.toLocaleDateString();
    const time = datetime.toLocaleTimeString();
    const timeOfDay = document.getElementById("timeOfDay");
    timeOfDay.innerText = `The current date is: ${date}\nThe current time is: ${time}`;
  });
};