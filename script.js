// DROPDOWN
let dropdowns = document.querySelectorAll(".dropdown");
console.log("🚀 ~ dropdowns:", dropdowns);

dropdowns.forEach((dropdown) => {
  const dropdownSelected = dropdown.querySelector(".dropdown-selected");
  const dropdownItems = dropdown.querySelector(".dropdown-items");
  const dropdownOptions = dropdown.querySelectorAll(".dropdown-option");

  dropdownSelected.addEventListener("click", () => {
    dropdownItems.classList.toggle("dropdown-open");
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
