function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("-translate-x-full");
}

function showTaskModal() {
  document.getElementById("taskModal").classList.remove("hidden");
}

function hideTaskModal() {
  document.getElementById("taskModal").classList.add("hidden");
}

function handleAddTaskClick() {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth < 768) {
    sidebar.classList.add("-translate-x-full");
  }
  showTaskModal();
}

// Show Date Picker
function showDatePicker() {
  const datePicker = document.getElementById("datePicker");
  datePicker.classList.toggle("hidden");
}

// Show Priority Options
function showPriorityOptions() {
  const priorityOptions = document.getElementById("priorityOptions");
  priorityOptions.classList.toggle("hidden");
}

// Show Reminder Options
function showReminderOptions() {
  const reminderOptions = document.getElementById("reminderOptions");
  reminderOptions.classList.toggle("hidden");
}

// Close when clicking outside the modal
window.onclick = function (event) {
  const modal = document.getElementById("taskModal");
  if (event.target === modal) {
    hideTaskModal();
  }
};

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
