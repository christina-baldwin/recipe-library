// Get all custom select elements
let dropdowns = document.querySelectorAll(".dropdown");
console.log("🚀 ~ dropdowns:", dropdowns);

dropdowns.forEach((dropdown) => {
  const dropdownSelected = document.querySelector(".dropdown-selected");
  const dropdownItems = document.querySelector(".dropdown-items");
  const dropdownOptions = document.querySelectorAll(".dropdown-option");

  dropdownSelected.addEventListener("click", (element) => {
    console.log("🚀 ~ dropdownSelected.addEventListener ~ element:", element);
    // console.log("🚀 ~ dropdownSelected.addEventListener ~ click:", click);
    dropdownItems.style.display = "block";
  });
});

// // Attach click event listeners to each custom select
// customSelects.forEach((select) => {
//   console.log("🚀 ~ customSelects.forEach ~ select:", select);
//   let selectSelected = select.querySelectorAll(".select-selected");
//   let selectItems = select.querySelectorAll(".select-items");
//   let options = select.querySelector(".option");

//   // Toggle the dropdown visibility when the select box is clicked
//   selectSelected.addEventListener("click", () => {
//     if (selectItems.style.display === "none") {
//       selectItems.style.display = "block";
//     } else {
//       selectItems.style.display = "none";
//     }
//   });

//   // Set the selected option and hide the dropdown when an option is clicked
//   options.forEach((option) => {
//     option.addEventListener("click", () => {
//       selectSelected.textContent = option.textContent + " ????";
//       selectItems.style.display = "none";
//     });
//   });

//   // Close the dropdown if the user clicks outside of it
//   window.addEventListener("click", (e) => {
//     if (!select.contains(e.target)) {
//       selectItems.style.display = "none";
//     }
//   });
// });
