import { showCurrentDate, showCurrentTime } from "./dateAndClock.js"
import { updateStorage } from "./local.js";
import { moveToTodo, moveToDone, moveToProgress } from "./buttons.js";
import { updateCounterDone, updateCounterInProgress, updateCounterToDo } from "./counters.js";
import { showModalEdit, showModalDeleteTask } from "./modals.js";

export let tasks = [];
export let usersData = [];

showCurrentDate();
showCurrentTime();

export let createNewTask = function (obj) {

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
  taskButtonEdit.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.71 7.04006C21.1 6.65006 21.1 6.00006 20.71 5.63006L18.37 3.29006C18 2.90006 17.35 2.90006 16.96 3.29006L15.12 5.12006L18.87 8.87006L20.71 7.04006ZM3 17.2501V21.0001H6.75L17.81 9.93006L14.06 6.18006L3 17.2501Z" fill="white"/>
    </svg>`;
  taskButtonEdit.addEventListener("click", showModalEdit);

  let taskButtonDelete = document.createElement("button");
  taskButtonDelete.classList.add("task__button", "button-delete");
  taskButtonDelete.innerHTML = `<svg class="svg-icon" style="width: 28; height: 28;vertical-align: center;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M896 196.923077H649.846154V118.153846c0-43.323077-35.446154-78.769231-78.769231-78.769231h-118.153846c-43.323077 0-78.769231 35.446154-78.769231 78.769231v78.769231H128c-15.753846 0-29.538462 13.784615-29.538462 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538462 29.538461h768c15.753846 0 29.538462-13.784615 29.538462-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538462-29.538461zM452.923077 137.846154c0-11.815385 7.876923-19.692308 19.692308-19.692308h78.76923c11.815385 0 19.692308 7.876923 19.692308 19.692308v59.076923h-118.153846V137.846154z m364.307692 256h-610.461538c-15.753846 0-29.538462 13.784615-29.538462 29.538461V886.153846c0 55.138462 43.323077 98.461538 98.461539 98.461539h472.615384c55.138462 0 98.461538-43.323077 98.461539-98.461539V423.384615c0-15.753846-13.784615-29.538462-29.538462-29.538461zM452.923077 827.076923c0 11.815385-7.876923 19.692308-19.692308 19.692308h-39.384615c-11.815385 0-19.692308-7.876923-19.692308-19.692308V551.384615c0-11.815385 7.876923-19.692308 19.692308-19.692307h39.384615c11.815385 0 19.692308 7.876923 19.692308 19.692307v275.692308z m196.923077 0c0 11.815385-7.876923 19.692308-19.692308 19.692308h-39.384615c-11.815385 0-19.692308-7.876923-19.692308-19.692308V551.384615c0-11.815385 7.876923-19.692308 19.692308-19.692307h39.384615c11.815385 0 19.692308 7.876923 19.692308 19.692307v275.692308z" fill="white"  />
    </svg>`;
  taskButtonDelete.addEventListener("click", function () {
    let parent = this.closest(".task");
    let taskId = +parent.getAttribute("data-key");
    showModalDeleteTask(parent, taskId);
  });

  let taskButtonBack = document.createElement("button");
  taskButtonBack.classList.add("task__button", "button-back");
  taskButtonBack.innerHTML = `<svg class="svg-icon" style="width: 28; height: 28;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M750.381737 221.002416 463.634967 511.525186l286.74677 290.511513c8.848529 8.875135 15.504112 19.020192 19.917632 30.41266 4.437056 11.366885 6.655584 22.933315 6.655584 34.649148 0 11.691273-2.218528 23.108301-6.655584 34.17638-4.41352 11.067057-11.06808 21.039175-19.917632 29.888727-17.749246 18.371416-38.937824 27.545356-63.641459 27.545356-24.653493 0-45.86663-9.17394-63.591317-27.545356L276.6012 581.77311c-8.875135-8.848529-15.829524-19.443841-20.889773-31.80845-5.060249-12.339026-7.927553-24.828478-8.525164-37.491892-0.648776-12.650111 0.921999-24.839735 4.735861-36.544311 3.789303-11.715833 10.121522-21.363564 18.995633-28.966729L623.148961 91.8755c17.699104-17.723663 38.937824-26.585495 63.591317-26.585495 24.704658 0 45.893236 8.861832 63.641459 26.585495 8.848529 8.861832 15.480576 18.98233 19.917632 30.374798s6.655584 22.946618 6.655584 34.662451c0 11.704576-2.218528 23.108301-6.655584 34.175357C765.885849 202.169489 759.230266 212.140585 750.381737 221.002416L750.381737 221.002416 750.381737 221.002416zM750.381737 221.002416" fill="white"  />
    </svg>`;
  taskButtonBack.addEventListener("click", moveToTodo);

  let taskButtonComplete = document.createElement("button");
  taskButtonComplete.classList.add("task__button", "button-complete");
  taskButtonComplete.innerHTML = `<svg class="svg-icon" style="width: 26;height: 26;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024zM397.824 713.045333a53.333333 53.333333 0 0 0 75.434667 0l323.328-323.328a53.333333 53.333333 0 0 0-75.434667-75.434666l-287.914667 283.306666-128.853333-128.853333a53.333333 53.333333 0 0 0-75.434667 75.434667l168.874667 168.874666z" fill="white"  />
    </svg>`;
  taskButtonComplete.addEventListener("click", moveToDone)

  let taskContent = document.createElement("div");
  taskContent.classList.add("task__content");

  let taskDescription = document.createElement("div");
  taskDescription.classList.add("task__description");
  taskDescription.innerHTML = obj.description;

  let taskButtonNext = document.createElement("button");
  taskButtonNext.classList.add("task__button", "button-next");
  taskButtonNext.innerHTML = `<svg class="svg-icon" style="width: 31; height: 31;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" >
    <path d="M658.997935 371.960547l-221.708498-221.709521c-32.652677-32.651654-85.591377-32.651654-118.244055 0-32.652677 32.652677-32.652677 85.591377 0 118.244055l210.686467 210.243375c15.095813 17.272385 17.229406 44.333718 0 61.45363L319.045383 751.324714c-32.652677 32.652677-32.652677 85.590354 0 118.242008 32.652677 32.652677 85.591377 32.652677 118.244055 0L658.992819 647.862317C753.919818 552.936341 758.562559 471.524147 658.997935 371.960547L658.997935 371.960547zM658.997935 371.960547" fill="white"  />
    </svg>`;
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

let buildPage = function () {
  for (let i = 0; i < tasks.length; i++) {
    createNewTask(tasks[i]);
  }
};

export let loadPage = function () {
  let localTasksData = localStorage.getItem("tasks");
  if (localTasksData) {
    tasks = JSON.parse(localTasksData);
  }
  buildPage();
};

export const getUSers = function () {
  return new Promise(function (resolve, reject) {
    fetch("https://jsonplaceholder.typicode.com/users").then(response => {
      if (response.status == 200) {
        resolve(response.json());
      } else {
        reject("Server error");
      }
    })
  })
};

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
};

export let checkTaskValue = function (value) {
  if (value === "" || value === " ") {
    return false
  } else {
    return true
  }
};

export let checkSelectValue = function (value) {
  if (value === "0") {
    return false
  } else {
    return true
  }
};

export let updateTask = function (obj) {
  let taskTitle = document.querySelector(".task__title");
  taskTitle.innerHTML = obj.title;

  let taskDescription = document.querySelector(".task__description");
  taskDescription.innerHTML = obj.description;

  let taskUser = document.querySelector(".task__user");
  taskUser.innerHTML = obj.user;
}

// отрисовка селекта в окне AddTodo

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

// отрисовка селекта в окне Edit

const setUserNameEdit = function () {
  let userSelect = document.querySelector(".user__select-edit");
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
  let selectAll = document.querySelector(".edit__select");
  userSelect.append(optionDefault);
  selectAll.append(userSelect);
}
setUserNameEdit()

// Delete

export let deleteTask = function (parent, taskId) {
  let taskFilter = tasks.filter((item) => item.id !== taskId);
  parent.remove();
  tasks = [...taskFilter];
  updateCounterToDo();
  updateCounterInProgress();
  updateCounterDone();
  updateStorage(tasks);
}

export let deleteAllTask = function () {
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