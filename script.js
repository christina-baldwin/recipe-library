// Get all custom select elements
let dropdowns = document.querySelectorAll(".dropdown");
console.log("🚀 ~ dropdowns:", dropdowns);

dropdowns.forEach((dropdown) => {
  const dropdownSelected = document.querySelector(".dropdown-selected");
  const dropdownItems = document.querySelector(".dropdown-items");
  const dropdownOptions = document.querySelectorAll(".dropdown-option");

  dropdownSelected.addEventListener("click", () => {
    dropdownItems.classList.toggle("dropdown-open");
  });

  dropdownOptions.forEach((option) => {
    option.addEventListener("click", () => {
      dropdownSelected.textContent = option.textContent;
      dropdownItems.classList.remove("dropdown-open");
    });
  });
});
