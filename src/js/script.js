import { showCurrentTime } from "./modules/clock.js";
// import { updateStorage } from "./modules/local.js";

window.addEventListener("load", () => {
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
    let loadPage = function() {
        let localTasksData = localStorage.getItem("tasks");
        if (localTasksData) {
            tasks = JSON.parse(localTasksData);
        } 
        console.log(tasks);
    }

    loadPage();

    let updateStorage = function() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

  // showCurrentTime();

  // Delete Task, All

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

  // buttons Next, Back, Complete

  let moveToProgress = function () {
    let elem = this.closest(".task");
    let taskId = +elem.getAttribute("data-key");
    let movedTask = tasks.find(item => item.id == taskId);
    movedTask.status = "inprogress";
    elem.remove();
    createNewTask(movedTask);
    updateStorage(tasks);
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
    // Это если надо будет тестить, существующие таски не добавляются
    // в Local Storage
    // updateStorage(tasks);
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
    todoTitle.value = "";
    todoDescription.value = "";
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

  let addNewTodo = function() {

    let todoTitle = document.querySelector(".add-todo__title");
    let todoDescription = document.querySelector(".add-todo__description");
    let userName = document.querySelector(".user__select");
    let selectedUser = userName.options[userName.selectedIndex].text;
    let time = document.querySelector(".header__clock");
    
    let allId = tasks.map((item) => item.id);
    allId.sort((a,b) => a - b);
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

    if (checkTaskValue(todoTitle.value) &&
      checkTaskValue(todoDescription.value) &&
      checkTaskValue(selectedUser)) {
      createNewTask(task);
      tasks.push(task);
      clearModalState();
      closeModalTodo();
    } else {
      confirm("Заполните все поля");
    }
    
    updateStorage(tasks);
    // createNewTask(task);
    // tasks.push(task)
    // todoTitle.value = "";
    // todoDescription.value = "";
    // closeModalTodo()
  };

  let modalBg = document.querySelector(".modal__bg");

  let modalAddTodo = document.querySelector(".modal.modal__add-todo");

  let addTodo = document.querySelector(".todo__footer");
  addTodo.addEventListener("click", showModalAddTodo);

  let closeModal = document.querySelector(".add-todo__cancel");
  closeModal.addEventListener("click", closeModalTodo);

  let confirmTodo = document.querySelector(".add-todo__confirm");
  confirmTodo.addEventListener("click", addNewTodo);
});