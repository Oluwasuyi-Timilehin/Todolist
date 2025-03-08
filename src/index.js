// document.addEventListener("DOMContentLoaded", () => {
//   const input = document.getElementById("input");
//   const button = document.getElementById("button");
//   const ul = document.getElementById("ul");

//   button.addEventListener("click", (e) => {
//     e.preventDefault(); // Prevent form submission

//     const taskText = input.value.trim();
//     if (taskText === "") return;

//     // Create list item
//     const li = document.createElement("li");
//     li.className =
//       "flex justify-between items-center text-white p-3 rounded-md mb-2 shadow-md";

//     // Task text (Editable)
//     const span = document.createElement("span");
//     span.textContent = taskText;
//     span.className = "flex-1 cursor-pointer";

//     // Edit button
//     const editButton = document.createElement("button");
//     editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
//     editButton.className =
//       "text-white bg-yellow-500 p-2 rounded-md hover:bg-yellow-700 transition duration-200 mx-2";

//     // Delete button
//     const deleteButton = document.createElement("button");
//     deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
//     deleteButton.className =
//       "text-white bg-red-500 p-2 rounded-md hover:bg-red-700 transition duration-200";

//     // Edit functionality
//     editButton.addEventListener("click", () => {
//       const newText = prompt("Edit your task:", span.textContent);
//       if (newText !== null && newText.trim() !== "") {
//         span.textContent = newText.trim();
//       }
//     });

//     // Delete functionality
//     deleteButton.addEventListener("click", () => {
//       li.remove();
//     });

//     // Append elements
//     li.appendChild(span);
//     li.appendChild(editButton);
//     li.appendChild(deleteButton);
//     ul.appendChild(li);

//     // Clear input
//     input.value = "";
//   });
// });
