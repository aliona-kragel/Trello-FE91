import { tasks } from "./render.js";

export let updateStorage = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};