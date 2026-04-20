import { loadTodos, saveTodos } from "./storage.js";
import { renderTodos, updateCounts } from "./ui.js";

let todos = loadTodos();

function addTask(text) {
    if (!text.trim()) return;

    const newTodo = {
        id: Date.now(),
        text,
        completed: false
    };

    todos.push(newTodo);
    saveTodos(todos);
    renderTodos(todos);
    updateCounts(todos);
}

function toggleTask(id) {
    todos = todos.map(todo =>
        todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
    );

    saveTodos(todos);
    renderTodos(todos);
    updateCounts(todos);
}

function deleteTask(id) {
    todos = todos.filter(todo => todo.id !== id);

    saveTodos(todos);
    renderTodos(todos);
    updateCounts(todos);
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);

    saveTodos(todos);
    renderTodos(todos);
    updateCounts(todos);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const list = document.getElementById("todo-list");
    const clearBtn = document.getElementById("clear-completed");

    renderTodos(todos);
    updateCounts(todos);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
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
});