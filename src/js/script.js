import { showCurrentTime } from "./modules/clock.js";

let tasks = [{
  id: 1,
  status: "todo",
  title: "Some Title",
  description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis neque ipsum quasi soluta nisi?",
  user: "Ivan",
  time: "21:32",
},
{
  id: 2,
  status: "inprogress",
  title: "Some Title",
  description: "Lorem ipsuhghghghghhghghm dolor sit amet consectetur, adipisicing elit. Blanditiis neque ipsum quasi soluta nisi?",
  user: "John",
  time: "08:56",
},
{
  id: 3,
  status: "done",
  title: "Some Title",
  description: "Lorem adipisicing elit. Blanditiis neque ipsum quasi soluta nisi?",
  user: "Liza",
  time: "10:01",
},
{
  id: 4,
  status: "done",
  title: "Some Title",
  description: "Lorem adipisicing elit. Blanditiis neque ipsum quasi soluta nisi?",
  user: "Liza",
  time: "10:01",
},
{
  id: 5,
  status: "inprogress",
  title: "Some Title",
  description: "Blanditiis neque ipsum quasi soluta nisi?",
  user: "Vladislav",
  time: "00:00",
},
{
  id: 6,
  status: "done",
  title: "Some Title",
  description: "Blanditiis neque ipsum quasi soluta dfkdlfkdfk dsfldzkn nisi?",
  user: "Vladislav",
  time: "00:00",
}
];

showCurrentTime();

// Delete Task

let deleteTask = function () {
  let parent = this.closest(".task");
  let taskId = +parent.getAttribute("data-key");
  let taskFilter = tasks.filter((item) => item.id !== taskId);

  parent.remove();
  tasks = [...taskFilter];
  updateCounterToDo();
  updateCounterInProgress();
  updateCounterDone();
  // updateStorage()
}

// Delete All

let deleteAllTask = function () {
  let donePannel = document.querySelector("#done");
  donePannel.innerHTML = "";
  let taskStatus = "done";
  let taskFilter = tasks.filter((item) => item.status !== taskStatus);

  tasks = [...taskFilter];
  updateCounterToDo();
  updateCounterInProgress();
  updateCounterDone();
  // updateStorage()
}

// Counters

let updateCounterToDo = function () {
  let doneToDoArr = tasks.filter(item => item.status == "todo");
  let counter = doneToDoArr.length;
  let counterValue = document.querySelector(".todo__header .counter");
  counterValue.innerHTML = counter;
}

let updateCounterInProgress = function () {
  let inProgressToDoArr = tasks.filter(item => item.status == "inprogress");
  let counter = inProgressToDoArr.length;
  let counterValue = document.querySelector(".in-progress__header .counter");
  counterValue.innerHTML = counter;
}

let updateCounterDone = function () {
  let doneToDoArr = tasks.filter(item => item.status == "done");
  let counter = doneToDoArr.length;
  let counterValue = document.querySelector(".done__header .counter");
  counterValue.innerHTML = counter;
}
 
let buttonDeleteAll = document.querySelector(".done__footer");
    buttonDeleteAll.addEventListener("click", deleteAllTask);

let createNewTask = function (obj) {

  let columnToDo = document.getElementById("todo");
  let columnInProgress = document.getElementById("inprogress");
  let columnDone = document.getElementById("done");

  let task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("data-key", obj.id);

  let taskHeader = document.createElement("div");
  taskHeader.classList.add("task__header");

  let taskTitle = document.createElement("div");
  taskTitle.classList.add("task__title");
  taskTitle.innerHTML = obj.title;

  let taskHeaderControls = document.createElement("div");
  taskHeaderControls.classList.add("task__header-controls");

  let taskButtonEdit = document.createElement("button");
  taskButtonEdit.classList.add("task__button", "button-edit");
  taskButtonEdit.innerHTML = `EDIT`;

  let taskButtonDelete = document.createElement("button");
  taskButtonDelete.classList.add("task__button", "button-delete");
  taskButtonDelete.innerHTML = `DELETE`;
  taskButtonDelete.addEventListener("click", deleteTask);


  let taskButtonBack = document.createElement("button");
  taskButtonBack.classList.add("task__button", "button-back");
  taskButtonBack.innerHTML = `BACK`;

  let taskButtonComplete = document.createElement("button");
  taskButtonComplete.classList.add("task__button", "button-complete");
  taskButtonComplete.innerHTML = `COMPLETE`;

  let taskContent = document.createElement("div");
  taskContent.classList.add("task__content");

  let taskDescription = document.createElement("div");
  taskDescription.classList.add("task__description");
  taskDescription.innerHTML = obj.description;

  let taskButtonNext = document.createElement("button");
  taskButtonNext.classList.add("task__button", "button-next");
  taskButtonNext.innerHTML = `>`;

  let taskFooter = document.createElement("div");
  taskFooter.classList.add("task__footer");

  let taskUser = document.createElement("div");
  taskUser.classList.add("task__user");
  taskUser.innerHTML = obj.user;

  let taskTime = document.createElement("div");
  taskTime.classList.add("task__time");
  taskTime.innerHTML = obj.time;

  if (obj.status == "todo") {
      task.classList.add("todo");
      columnToDo.append(task);
      taskHeaderControls.append(taskButtonEdit, taskButtonDelete);
      taskContent.append(taskDescription, taskButtonNext);
  }
  if (obj.status == "inprogress") {
      task.classList.add("inprogress");
      columnInProgress.append(task);
      taskHeaderControls.append(taskButtonBack, taskButtonComplete);
      taskContent.append(taskDescription);
  }
  if (obj.status == "done") {
      task.classList.add("done");
      columnDone.append(task);
      taskHeaderControls.append(taskButtonDelete);
      taskContent.append(taskDescription);
  }

  task.append(taskHeader, taskContent, taskFooter);
  taskHeader.append(taskTitle, taskHeaderControls);
  taskFooter.append(taskUser, taskTime);
  updateCounterToDo();
  updateCounterInProgress();
  updateCounterDone();
};

for (let i = 0; i < tasks.length; i++) {
  createNewTask(tasks[i]);
};