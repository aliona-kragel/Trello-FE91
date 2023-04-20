export let updateStorage = function (tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};