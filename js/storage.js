const STORAGE_KEY = "todo_app";

export function saveTodos(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadTodos() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { todos: [], filter: "all" };
}