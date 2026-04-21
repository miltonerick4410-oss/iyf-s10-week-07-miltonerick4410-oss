import { loadTodos, saveTodos } from "./storage.js";
import { renderTodos, updateCounts } from "./ui.js";

// Load state
let { todos, filter } = loadTodos();

// Add Task
function addTask(text) {
    if (!text.trim()) return;

    const newTodo = {
        id: Date.now(),
        text,
        completed: false
    };

    todos.push(newTodo);
    updateUI();
}

// Toggle Task
function toggleTask(id) {
    todos = todos.map(todo =>
        todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
    );

    updateUI();
}

// Delete Task
function deleteTask(id) {
    todos = todos.filter(todo => todo.id !== id);
    updateUI();
}

// Clear Completed
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    updateUI();
}

// Set Filter
function setFilter(newFilter) {
    filter = newFilter;
    updateUI();
}

// Update everything
function updateUI() {
    saveTodos({ todos, filter });
    renderTodos(todos, filter);
    updateCounts(todos);
}

// EVENTS
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const list = document.getElementById("todo-list");
    const clearBtn = document.getElementById("clear-completed");

    updateUI();

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!input.value.trim()) return;

        addTask(input.value);
        input.value = "";
    });

    list.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.id);

        if (e.target.classList.contains("toggle")) {
            toggleTask(id);
        }

        if (e.target.classList.contains("delete")) {
            deleteTask(id);
        }
    });

    clearBtn.addEventListener("click", clearCompleted);

    document.getElementById("filter-all")
        .addEventListener("click", () => setFilter("all"));

    document.getElementById("filter-active")
        .addEventListener("click", () => setFilter("active"));

    document.getElementById("filter-completed")
        .addEventListener("click", () => setFilter("completed"));
});