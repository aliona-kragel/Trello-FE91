// data arrays

let taskToDo = [{
    id: 1,
    status: "todo",
    title: "Some Title",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis neque ipsum quasi soluta nisi?",
    user: "Ivan",
    time: "21:32",
}],
    taskInProgress = [],
    taskDone = [];

// time

let showCurrentTime = function () {
  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  let time = document.querySelector(".header__clock");
  time.innerText = `${hour}:${min}`;
  let timeout = setTimeout(function () { showCurrentTime() }, 1000);
}

let updateTime = function (t) {
  if (t < 10) {
    return "0" + t;
  }
  else {
    return t;
  }
}
  
showCurrentTime();

let columnToDo = document.getElementById("tasks");

let task = document.createElement("div");
    task.classList.add("task");
    task.setAttribute("data-key", taskToDo[0].id);

let taskHeader = document.createElement("div");
    taskHeader.classList.add("task__header");

let taskTitle = document.createElement("div");
    taskTitle.classList.add("task__title");
    taskTitle.innerHTML = taskToDo[0].title;

let taskHeaderControls = document.createElement("div");
    taskHeaderControls.classList.add("task__header-controls");

let taskButtonEdit = document.createElement("button");
    taskButtonEdit.classList.add("task__button", "button-edit");
    taskButtonEdit.innerHTML = `EDIT`;

let taskButtonDelete = document.createElement("button");
    taskButtonDelete.classList.add("task__button", "button-delete");
    taskButtonDelete.innerHTML = `DELETE`;

let taskContent = document.createElement("div");
    taskContent.classList.add("task__content");

let taskDescription = document.createElement("div");
    taskDescription.classList.add("task__description");
    taskDescription.innerHTML = taskToDo[0].description;

let taskButtonNext = document.createElement("button");
    taskButtonNext.classList.add("task__button", "button-next");
    taskButtonNext.innerHTML = `>`;

let taskFooter = document.createElement("div");
    taskFooter.classList.add("task__footer");

let taskUser = document.createElement("div");
    taskUser.classList.add("task__user");
    taskUser.innerHTML = taskToDo[0].user; 

let taskTime = document.createElement("div");
    taskTime.classList.add("task__time");
    taskTime.innerHTML = taskToDo[0].time; 
// append

columnToDo.append(task);
task.append(taskHeader, taskContent, taskFooter);
taskHeader.append(taskTitle, taskHeaderControls);
taskHeaderControls.append(taskButtonEdit, taskButtonDelete);
taskContent.append(taskDescription, taskButtonNext);
taskFooter.append(taskUser, taskTime);