import { loadTodos, saveTodos } from "./storage.js";

export const state = {
    todos: loadTodos(),
    filter: "all"
};

export function setState(updates) {
    Object.assign(state, updates);
    saveTodos(state.todos);
}