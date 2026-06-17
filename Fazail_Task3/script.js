// =========================
// Selecting Elements
// =========================

// Input field
const inputText = document.getElementById("input-text");

// Add button
const addBtn = document.getElementById("addBtn");

// Div where tasks will display
const taskList = document.getElementById("taskList");


// =========================
// Arrays & Variables
// =========================

// Array to store all tasks
let tasks = [];

// Current filter type
// Default = all tasks
let currentFilter = "all";

// Unique ID for each task
let id = 0;
 

// =========================
// Add Task
// =========================

// Runs when Add button is clicked
addBtn.addEventListener("click", () => {

    // Check if input is empty
    if(inputText.value.trim() === ""){

        alert("Please enter a task");

        return;
    }

    // Creating task object
    const task = {

        // Unique task ID
        id: id,

        // Task name from input
        name: inputText.value,

        // Default task status
        completed: false
    };

    // Add task into array
    tasks.push(task);

    // Increase ID for next task
    id++;

    // Clear input field
    inputText.value = "";

    // Re-render tasks
    displayTasks();
});


// =========================
// Display Tasks
// =========================

function displayTasks(){

    // By default show all tasks
    let filteredTasks = tasks;
   
   if(tasks.length === 0 && currentFilter==="all"){
         taskList.innerHTML = `
            <p class="empty-msg">
              No Tasks
            </p>
        `;

        return;
    }

    // Completed Filter
if(currentFilter === "completed"){

    filteredTasks = tasks.filter(task => task.completed);

    // If no completed tasks
    if(filteredTasks.length === 0){

        taskList.innerHTML = `
            <p class="empty-msg">
                No completed tasks yet!
            </p>
        `;

        return;
    }
}


// Pending Filter
else if(currentFilter === "pending"){

    filteredTasks = tasks.filter(task => !task.completed);

    // If no pending tasks
    if(filteredTasks.length === 0 ){

        taskList.innerHTML = `
            <p class="empty-msg">
                No pending tasks!
            </p>
        `;

        return;
    }
}


    // =========================
    // Render Tasks using map()
    // =========================

    taskList.innerHTML = filteredTasks.map(task => `

        <div class="task">

            <!-- Task Name -->
            <p class="${task.completed ? "done" : ""}">
                ${task.name}
            </p>

            <div>

                <!-- Show Done button only if task is pending -->
                ${!task.completed ? `
                
                    <button onclick="toggleTask(${task.id})">
                        Done
                    </button>

                ` : ""}

                
                <!-- Delete Button -->
                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>

        </div>

    `).join("");

}


// =========================
// Mark Task as Done
// =========================

function toggleTask(id){

    // Loop through tasks array
    tasks = tasks.map(task => {

        // Check matching task ID
        if(task.id === id){

            // Return updated task
            return {

                // Copy old data
                ...task,

                // Change completed status
                completed: true
            };
        }

        // Return unchanged tasks
        return task;

    });

    // Re-render tasks
    displayTasks();
}


// =========================
// Delete Task
// =========================

function deleteTask(id){

    // Remove task with matching ID
    tasks = tasks.filter(task => task.id !== id);

    // Re-render tasks
    displayTasks();
}


// =========================
// Filter Tasks
// =========================

function filterTasks(filter){

    // Update current filter
    currentFilter = filter;

    // Re-render tasks
    displayTasks();
}

displayTasks();