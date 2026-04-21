import { saveToStorage, loadFromStorage } from "./storage.js";

export const state = loadFromStorage();

export function setState(updates) {
    Object.assign(state, updates);
    saveToStorage(state);
}