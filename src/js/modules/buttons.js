import { tasks, createNewTask, deleteAllTask } from "./render.js";
import { updateStorage } from "./local.js";
import { showModalInprogress, closeModalInprogress, showModalDone, closeModalDone } from "./modals.js";

export let moveToTodo = function () {
  let elem = this.closest(".task");
  let taskId = +elem.getAttribute("data-key");
  let movedTask = tasks.find(item => item.id == taskId);
  movedTask.status = "todo";
  elem.remove();
  createNewTask(movedTask);
  updateStorage(tasks);
}

export let moveToDone = function () {
  let elem = this.closest(".task");
  let taskId = +elem.getAttribute("data-key");
  let movedTask = tasks.find(item => item.id == taskId);
  movedTask.status = "done";
  elem.remove();
  createNewTask(movedTask);
  updateStorage(tasks);
}

export let moveToProgress = function () {
  let elem = this.closest(".task");
  let taskId = +elem.getAttribute("data-key");
  let movedTask = tasks.find(item => item.id == taskId);
  let inprogressFilter = tasks.filter((item) => item.status == "inprogress");
  if (inprogressFilter.length >= 6) {
    showModalInprogress();
  } else {
    elem.remove();
    movedTask.status = "inprogress";
    createNewTask(movedTask);
    updateStorage(tasks);
  }
  let inprogressAccept = document.querySelector(".warning__accept");
  inprogressAccept.addEventListener("click", closeModalInprogress);
}

let buttonDeleteAll = document.querySelector(".done__footer");
buttonDeleteAll.addEventListener("click", function () {
  let emptyToDo = tasks.filter(item => item.status == "done")
  if (emptyToDo.length !== 0) {
    showModalDone();
  }
}
);

let confirmDeleteAll = document.querySelector(".warning__confirm");
confirmDeleteAll.addEventListener("click", () => {
  deleteAllTask();
  closeModalDone();
});

let cancelDeleteAll = document.querySelector(".warning__cancel");
cancelDeleteAll.addEventListener("click", closeModalDone);