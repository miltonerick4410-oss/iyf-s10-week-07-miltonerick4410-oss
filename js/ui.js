export function renderTodos(todos, filter) {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    let filteredTodos = todos;

    if (filter === "active") {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${todo.completed ? "line-through" : "none"}">
                ${todo.text}
            </span>
            <button data-id="${todo.id}" class="toggle">✔</button>
            <button data-id="${todo.id}" class="delete">✖</button>
        `;

        list.appendChild(li);
    });

    updateActiveFilterUI(filter);
}

export function updateCounts(todos) {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;

    document.getElementById("total").textContent = total;
    document.getElementById("active").textContent = active;
    document.getElementById("completed").textContent = completed;
}

// Highlight active filter
function updateActiveFilterUI(filter) {
    document.querySelectorAll(".filters button").forEach(btn => {
        btn.classList.remove("active");
    });

    document.getElementById(`filter-${filter}`).classList.add("active");
}