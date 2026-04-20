import { state } from "./state.js";

export function renderTodos() {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    let filtered = state.todos;

    if (state.filter === "completed") {
        filtered = filtered.filter(t => t.completed);
    } else if (state.filter === "active") {
        filtered = filtered.filter(t => !t.completed);
    }

    filtered.forEach(todo => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${todo.completed ? "line-through" : "none"}">
                ${todo.text}
            </span>
            <button data-id="${todo.id}" class="toggle">✔</button>
            <button data-id="${todo.id}" class="delete">❌</button>
        `;

        list.appendChild(li);
    });
}