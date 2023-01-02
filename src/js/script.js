import { showCurrentTime } from "./modules/clock.js";
import { updateStorage } from "./modules/local.js";
window.addEventListener("load", () => {
  let tasks = [],
      usersData = [];
// Вот в таком виде к нам должны прийти данные из Api:

showCurrentTime();

let loadPage = function () {
  let localTasksData = localStorage.getItem("tasks");
  if (localTasksData) {
    tasks = JSON.parse(localTasksData);
  }
  console.log(tasks);
}

const getUSers = function () {
  return new Promise(function (resolve, reject) {
    fetch("https://jsonplaceholder.typicode.com/users").then(response => {
      if (response.status == 200) {
        resolve(response.json());
      } else {
        reject("Server error");
      }
    })
  })
}

if (localStorage.getItem("UserDataApi")) {
  usersData = JSON.parse(localStorage.getItem("UserDataApi"));
  loadPage();
} else {
  getUSers()
    .then((data) => {
      localStorage.setItem("UserDataApi", JSON.stringify(data));
      usersData = [...data];
      loadPage();
    })
}

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
  updateStorage(tasks);
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
  updateStorage(tasks);
}

let modalInprogress = document.querySelector(".in-progress__warning.warning");

let showModalInprogress = function(){
  modalBg.classList.add("active");
  modalInprogress.classList.add("active");
}

let closeModalInprogress = function(){
  modalBg.classList.remove("active"); 
  modalInprogress.classList.remove("active");
}

let modalDone = document.querySelector(".done__warning.warning");

let showModalDone = function(){
  modalBg.classList.add("active"); 
  modalDone.classList.add("active");
}

let closeModalDone = function(){
  modalBg.classList.remove("active"); 
  modalDone.classList.remove("active");
}

// buttons Next, Back, Complete

let moveToProgress = function () {
  let elem = this.closest(".task");
  let taskId = +elem.getAttribute("data-key");
  let movedTask = tasks.find(item => item.id == taskId);
  movedTask.status = "inprogress";
  let inprogressFilter = tasks.filter((item) => item.status == "inprogress");
    if (inprogressFilter.length < 3) {
      elem.remove();
      createNewTask(movedTask);
      updateStorage(tasks);
    } else {
      showModalInprogress();
    }
    let inprogressAccept = document.querySelector(".warning__accept");
    inprogressAccept.addEventListener("click", closeModalInprogress);
  }

let moveToTodo = function(){
  let elem = this.closest(".task");
  let taskId = +elem.getAttribute("data-key");
  let movedTask = tasks.find(item => item.id == taskId);
  movedTask.status = "todo";
  elem.remove();
  createNewTask(movedTask);
  updateStorage(tasks);
}

let moveToDone = function(){
  let elem = this.closest(".task");
  let taskId = +elem.getAttribute("data-key");
  let movedTask = tasks.find(item => item.id == taskId);
  movedTask.status = "done";
  elem.remove();
  createNewTask(movedTask);
  updateStorage(tasks);
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
    buttonDeleteAll.addEventListener("click", showModalDone);
    let confirmDeleteAll = document.querySelector(".warning__confirm");
    confirmDeleteAll.addEventListener("click", () => {
      deleteAllTask();
      closeModalDone();
    });
    let cancelDeleteAll = document.querySelector(".warning__cancel");
    cancelDeleteAll.addEventListener("click", closeModalDone);
    //buttonDeleteAll.addEventListener("click", deleteAllTask);


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
  taskButtonBack.addEventListener("click", moveToTodo);

  let taskButtonComplete = document.createElement("button");
  taskButtonComplete.classList.add("task__button", "button-complete");
  taskButtonComplete.innerHTML = `COMPLETE`;
  taskButtonComplete.addEventListener("click", moveToDone)

  let taskContent = document.createElement("div");
  taskContent.classList.add("task__content");

  let taskDescription = document.createElement("div");
  taskDescription.classList.add("task__description");
  taskDescription.innerHTML = obj.description;

  let taskButtonNext = document.createElement("button");
  taskButtonNext.classList.add("task__button", "button-next");
  taskButtonNext.innerHTML = `>`;
  taskButtonNext.addEventListener("click", moveToProgress);

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
      columnToDo.prepend(task);
      taskHeaderControls.append(taskButtonEdit, taskButtonDelete);
      taskContent.append(taskDescription, taskButtonNext);
  }
  if (obj.status == "inprogress") {
      task.classList.add("inprogress");
      columnInProgress.prepend(task);
      taskHeaderControls.append(taskButtonBack, taskButtonComplete);
      taskContent.append(taskDescription);
  }
  if (obj.status == "done") {
      task.classList.add("done");
      columnDone.prepend(task);
      taskHeaderControls.append(taskButtonDelete);
      taskContent.append(taskDescription);
  }

  task.append(taskHeader, taskContent, taskFooter);
  taskHeader.append(taskTitle, taskHeaderControls);
  taskFooter.append(taskUser, taskTime);
  updateCounterToDo();
  updateCounterInProgress();
  updateCounterDone();
  updateStorage(tasks);
};

for (let i = 0; i < tasks.length; i++) {
  createNewTask(tasks[i]);
};

// Modals

//All about Add TODO

let showModalAddTodo = function(){
  modalBg.classList.add("active"); 
  modalAddTodo.classList.add("active");
}

let clearModalState = function () {
  let todoTitle = document.querySelector(".add-todo__title");
  let todoDescription = document.querySelector(".add-todo__description");
  let select = document.querySelector('.user__select');
  todoTitle.value = "";
  todoDescription.value = "";
  select.value = "0";
}

let closeModalTodo = function(){
  modalBg.classList.remove("active"); 
  modalAddTodo.classList.remove("active");
  clearModalState();
}

let checkTaskValue = function (value) {
  if (value === "" || value === " ") {
    return false
  } else {
    return true
  }
}

let checkSelectValue = function (value) {
  if (value === "0") {
    return false
  } else {
    return true
  }
}

// select

// отрисовка селекта в зависимости от того, сколько данных к нам прилетело из api
// но пока он обрабатывает массив fetchArr, дынные которого скопированы из Api:

const setUserName = function () {
  let userSelect = document.querySelector(".user__select");
  let optionDefault = document.createElement("option");
  optionDefault.value = "0";
  optionDefault.innerHTML = "Select user";
  optionDefault.setAttribute("disabled", "disabled");
  optionDefault.setAttribute("selected", "selected");
  usersData.forEach(item => {
    let option = document.createElement("option");
    option.value = item.name;
    option.innerHTML = item.name;
    userSelect.append(option);
  })
  let selectAll = document.querySelector(".add-todo__select");
  userSelect.append(optionDefault);
  selectAll.append(userSelect);
}
setUserName();


let addNewTodo = function () {
  let todoTitle = document.querySelector(".add-todo__title");
  let todoDescription = document.querySelector(".add-todo__description");
  let time = document.querySelector(".header__clock");
  let select = document.querySelector('.user__select');

  // тут мы сначала сделаем проверку на наличие данных и уже потом будем создавать task

  if (checkTaskValue(todoTitle.value) &&
    checkTaskValue(todoDescription.value) &&
    checkSelectValue(select.value)) {

    let selectedUserObj = usersData.find(({ name }) => name == select.value);
    let selectedUser = selectedUserObj.name;

    let allId = tasks.map((item) => item.id);
    allId.sort((a, b) => a - b);
    let maxId;
    (tasks.length === 0) ? maxId = 1 : maxId = allId.at(-1) + 1;

    let task = {
      id: maxId,
      status: "todo",
      title: todoTitle.value,
      description: todoDescription.value,
      user: selectedUser,
      time: time.innerText,
    }
    createNewTask(task);
    tasks.push(task);
    updateCounterToDo();
    closeModalTodo();
    updateStorage(tasks);
  } else {
    confirm("Заполните все поля");
  }
};

let modalBg = document.querySelector(".modal__bg");

let modalAddTodo = document.querySelector(".modal.modal__add-todo");

let addTodo = document.querySelector(".todo__footer");
addTodo.addEventListener("click", showModalAddTodo);

let closeModal = document.querySelector(".add-todo__cancel");
closeModal.addEventListener("click", closeModalTodo);

let confirmTodo = document.querySelector(".add-todo__confirm");
confirmTodo.addEventListener("click", addNewTodo);

//All about Edit modal

let showModalEdit = function(){
  modalBg.classList.add("active"); 
  modalEditTodo.classList.add("active");

  let editTitle = document.querySelector(".edit__title");
  let editDescription = document.querySelector(".edit__description");

  let elem = this.closest(".task");
  let taskId = +elem.getAttribute("data-key");
  let editedTask = tasks.find(item => item.id == taskId);

  editTitle.value = editedTask.title;
  editDescription.value = editedTask.description;
  let confirmEditTodo = function(){

  }
}

let closeModalEdit = function(){
  modalBg.classList.remove("active"); 
  modalEditTodo.classList.remove("active");
}

let editTodo = document.querySelector(".button-edit");
editTodo.addEventListener("click", showModalEdit);

let modalEditTodo = document.querySelector(".modal.modal__edit");

let closeEditTodo = document.querySelector(".edit__cancel");
closeEditTodo.addEventListener("click", closeModalEdit);
});