// index.js

// Function to toggle the sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("-translate-x-full");
}

// Function to show the task modal
function showTaskModal() {
  document.getElementById("taskModal").classList.remove("hidden");
}

// Function to hide the task modal
function hideTaskModal() {
  document.getElementById("taskModal").classList.add("hidden");
}

// Function to handle the "Add Task" button click
function handleAddTaskClick() {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth < 768) {
    sidebar.classList.add("-translate-x-full");
  }
  showTaskModal();
}

// Function to show the date picker
function showDatePicker() {
  const datePicker = document.getElementById("datePicker");
  datePicker.classList.toggle("hidden");
}

// Function to show the priority options
function showPriorityOptions() {
  const priorityOptions = document.getElementById("priorityOptions");
  priorityOptions.classList.toggle("hidden");
}

// Function to show the reminder options
function showReminderOptions() {
  const reminderOptions = document.getElementById("reminderOptions");
  reminderOptions.classList.toggle("hidden");
}

// Function to add a new task
function addTask() {
  const taskTitle = document.getElementById("taskTitle").value.trim();
  const taskDescription = document
    .getElementById("taskDescription")
    .value.trim();
  const taskDate = document.getElementById("taskDate").value; // YYYY-MM-DD
  const taskReminder = document.getElementById("taskReminder").value; // HH:MM
  const taskPriority = document.getElementById("taskPriority").value;

  if (taskTitle === "") {
    alert("Please enter a task title.");
    return;
  }

  // Validate date and time
  if (taskDate && isNaN(new Date(taskDate).getTime())) {
    alert("Please enter a valid date.");
    return;
  }

  if (taskReminder && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(taskReminder)) {
    alert("Please enter a valid time in HH:MM format.");
    return;
  }

  // Create a new task object
  const task = {
    id: Date.now() + Math.floor(Math.random() * 1000), // Unique ID
    title: taskTitle,
    description: taskDescription,
    date: taskDate, // Date in YYYY-MM-DD format
    reminder: taskReminder, // Time in HH:MM format
    priority: taskPriority,
    completed: false,
  };

  // Save the task to local storage
  saveTask(task);

  // Clear the form
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskPriority").value = "low";
  document.getElementById("taskReminder").value = "";

  // Hide the modal
  hideTaskModal();

  // Redirect to the "All Tasks" page if not already there
  if (!window.location.pathname.includes("index.html")) {
    window.location.href = "index.html";
  }
}

// Alarm sound
const alarmSound = new Audio("./alarm.mp3"); // Path to your alarm sound file
alarmSound.onerror = () => {
  console.error("Failed to load alarm sound.");
};

// Function to check for alarms
function checkAlarms() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    if (!task.completed && task.date && task.reminder) {
      const taskDateTime = new Date(`${task.date}T${task.reminder}`);
      const currentDateTime = new Date();

      // Check if the task's date and time match the current date and time
      if (taskDateTime <= currentDateTime && !task.alarmTriggered) {
        playAlarm();
        task.alarmTriggered = true; // Mark the alarm as triggered
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
      }
    }
  });
}

// Function to play the alarm sound
function playAlarm() {
  alarmSound.play();
  alert("Alarm! A task's time is up!"); // Optional: Show an alert
}

// Check for alarms every second
setInterval(checkAlarms, 1000);

// Function to save a task to local storage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to display tasks
function displayTasks() {
  const taskList = document.getElementById("taskList");
  const completedTaskList = document.getElementById("completedTaskList");

  if (taskList) taskList.innerHTML = "";
  if (completedTaskList) completedTaskList.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Filter tasks based on the page (completed.html or index.html)
  const isCompletedPage = window.location.pathname.includes("completed.html");
  if (isCompletedPage) {
    tasks = tasks.filter((task) => task.completed);
  }

  if (tasks.length === 0) {
    const noTasksMessage = document.createElement("p");
    noTasksMessage.className = "text-gray-500 text-center";
    noTasksMessage.textContent = isCompletedPage
      ? "No completed tasks found."
      : "No tasks found.";
    if (taskList) taskList.appendChild(noTasksMessage);
    if (completedTaskList) completedTaskList.appendChild(noTasksMessage);
    return;
  }

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className =
      "flex justify-between items-center p-3 border-b border-gray-200";

    taskItem.innerHTML = `
      <div class="flex items-center space-x-3 flex-1">
        <!-- Custom Checkbox -->
        <input
          type="checkbox"
          ${task.completed ? "checked" : ""}
          onchange="toggleTaskCompletion(${task.id})"
          class="custom-checkbox"
        />
        <!-- Task Title and Description -->
        <div class="flex-1">
          <h3 class="font-semibold ${
            task.completed ? "line-through text-gray-500" : ""
          }">${task.title}</h3>
          <p class="text-sm text-gray-600 ${
            task.completed ? "line-through" : ""
          }">${task.description}</p>
          <div class="text-xs text-gray-500 mt-1">
            <span>${task.date}</span> | <span>${task.priority}</span> | <span>${
      task.reminder
    }</span>
          </div>
        </div>
      </div>
      <!-- Edit and Delete Buttons -->
      <div class="flex items-center space-x-3">
        <button onclick="editTask(${
          task.id
        })" class="text-gray-500 cursor-pointer">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button onclick="deleteTask(${
          task.id
        })" class="text-gray-500 cursor-pointer">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    if (completedTaskList && task.completed) {
      completedTaskList.appendChild(taskItem);
    } else if (taskList && !task.completed) {
      taskList.appendChild(taskItem);
    }
  });
}

// Function to edit a task
function editTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    // Populate the modal with task details
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskDate").value = task.date;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskReminder").value = task.reminder;

    // Show the modal
    showTaskModal();

    // Remove the existing onclick handler
    const saveButton = document.querySelector("#taskModal button.bg-red-500");
    saveButton.onclick = null;

    // Update the task on save
    saveButton.onclick = function () {
      task.title = document.getElementById("taskTitle").value.trim();
      task.description = document
        .getElementById("taskDescription")
        .value.trim();
      task.date = document.getElementById("taskDate").value;
      task.priority = document.getElementById("taskPriority").value;
      task.reminder = document.getElementById("taskReminder").value;

      // Save the updated task list to local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Hide the modal and refresh the task list
      hideTaskModal();
      displayTasks();
    };
  }
}



// Function to navigate to a different page
function navigateTo(page) {
  window.location.href = page;
}

// Function to delete a task
function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.id !== taskId); // Remove the task
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
  displayTasks(); // Refresh the task list
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.completed = !task.completed; // Toggle completion status
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks(); // Refresh the task list
  }
}

// Display tasks on page load
document.addEventListener("DOMContentLoaded", displayTasks);
