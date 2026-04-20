import { state, setState } from "./state.js";
import { renderTodos } from "./ui.js";

function addTodo(text) {
    const newTodo = {
        id: Date.now(),
        text,
        completed: false
    };

    setState({
        todos: [...state.todos, newTodo]
    });

    renderTodos();
}

function toggleTodo(id) {
    const updated = state.todos.map(todo =>
        todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
    );

    setState({ todos: updated });
    renderTodos();
}

function deleteTodo(id) {
    const updated = state.todos.filter(todo => todo.id !== id);
    setState({ todos: updated });
    renderTodos();
}

function setFilter(filter) {
    setState({ filter });
    renderTodos();
}

document.addEventListener("DOMContentLoaded", () => {
    renderTodos();

    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (input.value.trim()) {
            addTodo(input.value);
            input.value = "";
        }
    });

    document.getElementById("todo-list").addEventListener("click", (e) => {
        const id = Number(e.target.dataset.id);

        if (e.target.classList.contains("toggle")) {
            toggleTodo(id);
        }

        if (e.target.classList.contains("delete")) {
            deleteTodo(id);
        }
    });

    document.getElementById("filter-all").onclick = () => setFilter("all");
    document.getElementById("filter-active").onclick = () => setFilter("active");
    document.getElementById("filter-completed").onclick = () => setFilter("completed");
});