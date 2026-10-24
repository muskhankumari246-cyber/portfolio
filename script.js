const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task
function addTask() {
    if (inputBox.value === '') {
        alert("Please write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        
        // Creating delete icon element
        let span = document.createElement("span");
        span.innerHTML = '<i class="fas fa-trash-alt"></i>';
        li.appendChild(span);
        
        listContainer.appendChild(li);
        inputBox.value = "";
        saveData(); // Save changes to localStorage
    }
}

// Allow adding task by pressing 'Enter' key on keyboard
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Event listener for checking tasks or deleting items
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN" || e.target.parentElement.tagName === "SPAN") {
        let item = e.target.closest("li");
        item.remove();
        saveData();
    }
}, false);

// Function to save tasks data in browser's local storage
function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

// Function to display saved tasks when the page loads
function showTask() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
}

// Load saved tasks on startup
showTask();