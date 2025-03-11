// RECIPE DATA
const apiKey = "a4a3ccd716344f26b393d88964bbac7e";
const URL = `https://api.spoonacular.com/recipes/random?number=7&apiKey=${apiKey}`;
let recipeData = [];

const fetchRecipeData = async () => {
  const cachedRecipeData = localStorage.getItem("recipes");

  if (cachedRecipeData && cachedRecipeData !== "[]") {
    recipeData = JSON.parse(cachedRecipeData);
    loadRecipeData(recipeData);
  } else {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("API limit reached. Please try again later");
        }
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      recipeData = data.recipes;
      localStorage.setItem("recipes", JSON.stringify(recipeData));
      loadRecipeData(recipeData);
      console.log(recipeData);
    } catch (error) {
      recipesContainer.innerHTML = `<div>${error.message}</div>`;
    }
  }
};

document.addEventListener("DOMContentLoaded", fetchRecipeData);

// DISPLAY RECIPE DATA
const recipesContainer = document.querySelector(".recipes");
let isLoading = true;

const loadRecipeData = (recipesArray) => {
  recipesContainer.innerHTML = "";
  if (isLoading) {
    recipesContainer.innerHTML = `<div>Loading...</div>`;
  }

  if (recipesArray.length) {
    recipesArray.forEach((recipe) => {
      const numberOfIngredients = recipe.extendedIngredients.length;
      recipesContainer.innerHTML += `
       <div
             class="recipe"
             data-category="${recipe.cuisines.join(", ")} ${recipe.diets.join(
        ", "
      )} ${recipe.readyInMinutes} ${numberOfIngredients}"
           >
             <div class="img-container">
               <img
                 class="recipe-img"
                 src=${recipe.image}
               />
             </div>
             <h2 class="recipe-title">${recipe.title}</h2>
             <hr />
             <div class="recipe-text-container">
               <h3 class="recipe-subtitle">Cuisine:</h3>
               <p class="recipe-text">${recipe.cuisines
                 .map((cuisine) => {
                   return cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
                 })
                 .join(", ")}</p>
             </div>
   
             <div class="recipe-text-container">
               <h3 class="recipe-subtitle">Diet:</h3>
               <p class="recipe-text">${recipe.diets
                 .map((diet) => {
                   return diet.charAt(0).toUpperCase() + diet.slice(1);
                 })
                 .join(", ")}</p>
             </div>
   
             <div class="recipe-text-container">
               <h3 class="recipe-subtitle">Time:</h3>
               <p class="recipe-text">${recipe.readyInMinutes}min</p>
             </div>
             <hr />
   
             <div class="recipe-text-container ingredients-container">
               <h3 class="recipe-subtitle">Ingredients:</h3>
               <ul class="ingredients-list">
               ${recipe.extendedIngredients
                 .map((ingredient) => {
                   return `<li class="ingredient">${
                     ingredient.name.charAt(0).toUpperCase() +
                     ingredient.name.slice(1)
                   }</li>`;
                 })
                 .join("")}
               </ul>
             </div>
           </div>`;
    });
  } else {
    recipesContainer.innerHTML += `
    <div>There are no recipes to display.</div>
    `;
  }

  isLoading = false;
};
loadRecipeData(recipeData);

// RANDOM RECIPE
const randomRecipeBtn = document.querySelector(".recipe-btn");
const getRandomRecipe = () => {
  randomRecipeBtn.addEventListener("click", () => {
    const randomRecipe = [
      recipeData[Math.floor(Math.random() * recipeData.length)],
    ];
    loadRecipeData(randomRecipe);
  });
};
getRandomRecipe();

// DROPDOWN
// TODO make filter dropdowns dynamic by making the available options based on data found in recipeData (diet and cuisine) instead of hard-coded
let dropdowns = document.querySelectorAll(".dropdown");

function closeAllDropdowns() {
  dropdowns.forEach((dropdown) => {
    const dropdownItems = dropdown.querySelector(".dropdown-items");
    dropdownItems.classList.remove("dropdown-open");
  });
}

dropdowns.forEach((dropdown) => {
  const dropdownSelected = dropdown.querySelector(".dropdown-selected");
  const dropdownItems = dropdown.querySelector(".dropdown-items");
  const dropdownOptions = dropdown.querySelectorAll(".dropdown-option");

  dropdownSelected.addEventListener("click", () => {
    if (dropdownItems.classList.contains("dropdown-open")) {
      dropdownItems.classList.remove("dropdown-open");
    } else {
      closeAllDropdowns();
      dropdownItems.classList.add("dropdown-open");
    }
  });

  dropdownOptions.forEach((option) => {
    option.addEventListener("click", () => {
      dropdownSelected.textContent = option.textContent;
      dropdownItems.classList.remove("dropdown-open");
    });
  });

  window.addEventListener("click", (event) => {
    if (!event.target.matches(".dropdown-selected")) {
      if (dropdownItems.classList.contains("dropdown-open")) {
        dropdownItems.classList.remove("dropdown-open");
      }
    }
  });
});

// DROPDOWN FILTER AND SORT
const filterOptions = document.querySelectorAll(".dropdown-option[data-filter");
const sortByOptions = document.querySelectorAll(".dropdown-option[data-sort]");
const recipes = document.querySelectorAll(".recipe");
let dietFilterValue = "all";
let cuisineFilterValue = "all";
let sortByValue;

const filterRecipes = () => {
  let filteredRecipes = recipeData.filter((recipe) => {
    const category =
      recipe.cuisines.join(", ").toLowerCase() + ", " + recipe.diets.join(", ");
    const matchesDiet =
      dietFilterValue === "all" || category.includes(dietFilterValue);
    const matchesCuisine =
      cuisineFilterValue === "all" || category.includes(cuisineFilterValue);

    return matchesCuisine && matchesDiet;
  });

  if (sortByValue === "cook-time-asc") {
    filteredRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  } else if (sortByValue === "cook-time-desc") {
    filteredRecipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes);
  } else if (sortByValue === "ingredients-asc") {
    filteredRecipes.sort(
      (a, b) => a.extendedIngredients.length - b.extendedIngredients.length
    );
  } else if (sortByValue === "ingredients-desc") {
    filteredRecipes.sort(
      (a, b) => b.extendedIngredients.length - a.extendedIngredients.length
    );
  }

  loadRecipeData(filteredRecipes);
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const filter = option.getAttribute("data-filter");

    if (option.classList.contains("diet-option")) {
      dietFilterValue = filter;
    } else if (option.classList.contains("cuisine-option")) {
      cuisineFilterValue = filter;
    }

    filterRecipes();
  });
});

sortByOptions.forEach((option) => {
  option.addEventListener("click", () => {
    sortByValue = option.getAttribute("data-sort");

    filterRecipes();
  });
});

// ///////////////////////////////////////////
// OLD CODE: DELETE LATER
// //////////////////////////////////////////
// FILTER
// filterOptions.forEach((option) => {
//   option.addEventListener("click", () => {
//     const filter = option.getAttribute("data-filter");

//     if (option.classList.contains("diet-option")) {
//       dietFilterValue = filter;
//     } else if (option.classList.contains("cuisine-option")) {
//       cuisineFilterValue = filter;
//     }

//     const filteredRecipes = Array.from(recipes).filter((recipe) => {
//       const category = recipe.getAttribute("data-category");
//       const matchesDiet =
//         dietFilterValue === "all" || category.includes(dietFilterValue);
//       const matchesCuisine =
//         cuisineFilterValue === "all" || category.includes(cuisineFilterValue);

//       return matchesCuisine && matchesDiet;
//     });

//     console.log(filteredRecipes);

//     recipes.forEach((recipe) => {
//       recipe.classList.add("hide");
//     });

//     filteredRecipes.forEach((recipe) => {
//       recipe.classList.remove("hide");
//     });
//   });
// });

// SORT BY FILTER
// const sortByOptions = document.querySelectorAll(".dropdown-option[data-sort]");
// sortByOptions.forEach((option) => {
//   option.addEventListener("click", () => {
//     const sortBy = option.getAttribute("data-sort");

//     let sortedRecipes = [...recipeData];

//     if (sortBy === "cook-time-asc") {
//       sortedRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
//     } else if (sortBy === "cook-time-desc") {
//       sortedRecipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes);
//     } else if (sortBy === "ingredients-asc") {
//       sortedRecipes.sort((a, b) => a.ingredients.length - b.ingredients.length);
//     } else if (sortBy === "ingredients-desc") {
//       sortedRecipes.sort((a, b) => b.ingredients.length - a.ingredients.length);
//     }

//     console.log(sortedRecipes);

//     loadRecipeData(sortedRecipes);
//   });
// });

// OLD OLD VERSION OF THE FILTER LOGIC
// dropdownOptions.forEach((option) => {
//   option.addEventListener("click", () => {
//     const filter = option.getAttribute("data-filter");

//     if (option.classList.contains("diet-option")) {
//       dietFilterValue = filter;
//     } else if (option.classList.contains("cuisine-option")) {
//       cuisineFilterValue = filter;
//     }

//     recipes.forEach((recipe) => {
//       const category = recipe.getAttribute("data-category");
//       const matchesDiet =
//         dietFilterValue === "all" || category.includes(dietFilterValue);
//       const matchesCuisine =
//         cuisineFilterValue === "all" || category.includes(cuisineFilterValue);

//       if (matchesDiet && matchesCuisine) {
//         recipe.classList.remove("hide");
//       } else {
//         recipe.classList.add("hide");
//       }
//     });
//   });
// });
