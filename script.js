// RECIPE DATA
const recipeData = [
  {
    id: 1,
    title: "Vegan Lentil Soup",
    image: "https://images.pexels.com/photos/6120511/pexels-photo-6120511.jpeg",
    readyInMinutes: 30,
    servings: 4,
    sourceUrl: "https://example.com/vegan-lentil-soup",
    diets: ["vegan"],
    cuisine: "Mediterranean",
    ingredients: [
      "red lentils",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "cumin",
      "paprika",
      "vegetable broth",
      "olive oil",
      "salt",
    ],
    pricePerServing: 2.5,
    popularity: 85,
  },
  {
    id: 2,
    title: "Vegetarian Pesto Pasta",
    image:
      "https://images.pexels.com/photos/8105120/pexels-photo-8105120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    readyInMinutes: 25,
    servings: 2,
    sourceUrl: "https://example.com/vegetarian-pesto-pasta",
    diets: ["vegetarian"],
    cuisine: "Italian",
    ingredients: [
      "pasta",
      "basil",
      "parmesan cheese",
      "garlic",
      "pine nuts",
      "olive oil",
      "salt",
      "black pepper",
    ],
    pricePerServing: 3.0,
    popularity: 92,
  },
  {
    id: 3,
    title: "Gluten-Free Chicken Stir-Fry",
    image: "https://images.pexels.com/photos/262897/pexels-photo-262897.jpeg",
    readyInMinutes: 20,
    servings: 3,
    sourceUrl: "https://example.com/gluten-free-chicken-stir-fry",
    diets: ["gluten-free"],
    cuisine: "Asian",
    ingredients: [
      "chicken breast",
      "broccoli",
      "bell pepper",
      "carrot",
      "soy sauce (gluten-free)",
      "ginger",
      "garlic",
      "sesame oil",
      "cornstarch",
      "green onion",
      "sesame seeds",
      "rice",
    ],
    pricePerServing: 4.0,
    popularity: 78,
  },
  {
    id: 4,
    title: "Dairy-Free Tacos",
    image: "https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg",
    readyInMinutes: 15,
    servings: 2,
    sourceUrl: "https://example.com/dairy-free-tacos",
    diets: ["dairy-free"],
    cuisine: "Mexican",
    ingredients: [
      "corn tortillas",
      "ground beef",
      "taco seasoning",
      "lettuce",
      "tomato",
      "avocado",
    ],
    pricePerServing: 2.8,
    popularity: 88,
  },
  {
    id: 5,
    title: "Middle Eastern Hummus",
    image:
      "https://images.pexels.com/photos/1618898/pexels-photo-1618898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    readyInMinutes: 10,
    servings: 4,
    sourceUrl: "https://example.com/middle-eastern-hummus",
    diets: ["vegan", "gluten-free"],
    cuisine: "Middle Eastern",
    ingredients: ["chickpeas", "tahini", "garlic", "lemon juice", "olive oil"],
    pricePerServing: 1.5,
    popularity: 95,
  },
  {
    id: 6,
    title: "Quick Avocado Toast",
    image:
      "https://images.pexels.com/photos/1656685/pexels-photo-1656685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    readyInMinutes: 5,
    servings: 1,
    sourceUrl: "https://example.com/quick-avocado-toast",
    diets: ["vegan"],
    cuisine: "Mediterranean",
    ingredients: ["bread", "avocado", "lemon juice", "salt"],
    pricePerServing: 2.0,
    popularity: 90,
  },
  {
    id: 7,
    title: "Beef Stew",
    image:
      "https://images.pexels.com/photos/1618952/pexels-photo-1618952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    readyInMinutes: 90,
    servings: 5,
    sourceUrl: "https://example.com/beef-stew",
    diets: [],
    cuisine: "European",
    ingredients: [
      "beef chunks",
      "potatoes",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "beef broth",
      "red wine",
      "bay leaves",
      "thyme",
      "salt",
      "black pepper",
      "butter",
      "flour",
      "celery",
      "mushrooms",
    ],
    pricePerServing: 5.5,
    popularity: 80,
  },
];

// DISPLAY RECIPE DATA
const recipesContainer = document.querySelector(".recipes");
const loadRecipeData = () => {
  recipeData.forEach((recipe) => {
    const numberOfIngredients = recipe.ingredients.length;
    recipesContainer.innerHTML += `
    <div
          class="recipe"
          data-category="${recipe.cuisine} ${recipe.diets.join(", ")} ${
      recipe.readyInMinutes
    } ${numberOfIngredients}"
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
            <p class="recipe-text">${recipe.cuisine}</p>
          </div>

          <div class="recipe-text-container">
            <h3 class="recipe-subtitle">Diet:</h3>
            <p class="recipe-text">${recipe.diets.join(", ")}</p>
          </div>

          <div class="recipe-text-container">
            <h3 class="recipe-subtitle">Time:</h3>
            <p class="recipe-text">${recipe.readyInMinutes}min</p>
          </div>
          <hr />

          <div class="recipe-text-container ingredients-container">
            <h3 class="recipe-subtitle">Ingredients:</h3>
            <ul class="ingredients-list">
            ${recipe.ingredients
              .map((ingredient) => {
                return `<li class="ingredient">${ingredient}</li>`;
              })
              .join("")}
            </ul>
          </div>
        </div>`;
  });
};
loadRecipeData();

// DROPDOWN
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

// DROPDOWN FILTER BY RECIPE TYPE
const dropdownOptions = document.querySelectorAll(".dropdown-option");
let dietFilterValue = "all";
let cuisineFilterValue = "all";
const recipes = document.querySelectorAll(".recipe");

dropdownOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const filter = option.getAttribute("data-filter");

    if (option.classList.contains("diet-option")) {
      dietFilterValue = filter;
    } else if (option.classList.contains("cuisine-option")) {
      cuisineFilterValue = filter;
    }

    recipes.forEach((recipe) => {
      const category = recipe.getAttribute("data-category");
      const matchesDiet =
        dietFilterValue === "all" || category.includes(dietFilterValue);
      const matchesCuisine =
        cuisineFilterValue === "all" || category.includes(cuisineFilterValue);

      if (matchesDiet && matchesCuisine) {
        recipe.classList.remove("hide");
      } else {
        recipe.classList.add("hide");
      }
    });
  });
});

// UPDATED MESSAGE
dropdowns.forEach((dropdown) => {
  const dropdownOptions = dropdown.querySelectorAll(".dropdown-option");

  const userMessage = document.querySelector(".user-message");

  dropdownOptions.forEach((option) => {
    option.addEventListener("click", () => {
      if (option.textContent.includes("All")) {
        userMessage.textContent = "You can see all our amazing recipes!";
        console.log(option.textcontent);
      } else if (option.textContent.includes("Vegan")) {
        userMessage.textContent = "We have some great vegan options!";
      } else if (option.textContent.includes("Gluten")) {
        userMessage.textContent = "You can have great recipes without gluten!";
      } else if (option.textContent.includes("Dairy")) {
        userMessage.textContent = "Dairy isnt needed for a tasty meal!";
      } else {
        userMessage.textContent = "Oops that's not a diet option, try again!";
      }
    });
  });
});
