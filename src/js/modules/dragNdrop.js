import { tasks, createNewTask } from "./render.js";
import { updateStorage } from "./local.js";
import { showModalInprogress, closeModalInprogress } from "./modals.js";

let dragTask = null;

export let startDragTask = function () {
  dragTask = this;
  setTimeout(() => {
    this.classList.add('hide');
  }, 0);
};

export let endDragTask = function () {
  dragTask = null;
  this.classList.remove('hide');
};

export let dragOver = function (e) {
  e.preventDefault();
};

export let dragEnter = function (e) {
  if (e.target.classList.contains("work__area")) {
    e.target.classList.add("drop");
  }
};

export let dragLeave = function (e) {
  if (e.target.classList.contains("drop")) {
    e.target.classList.remove("drop");
  }
};

export let dragDrop = function (e) {

  if (e.target.id == "todo") {

    let elem = dragTask.closest(".task");
    let taskId = +elem.getAttribute("data-key");
    let movedTask = tasks.find(item => item.id == taskId);
    if (movedTask.status != "done") {
      movedTask.status = "todo";
      elem.remove();
      createNewTask(movedTask);
      updateStorage(tasks);
    }

  } else if (e.target.id == "inprogress") {

    let elem = dragTask.closest(".task");
    let taskId = +elem.getAttribute("data-key");
    let movedTask = tasks.find(item => item.id == taskId);
    let inprogressFilter = tasks.filter((item) => item.status == "inprogress");
    if (inprogressFilter.length >= 6) {
      showModalInprogress();
    } else if (movedTask.status != "done") {
      elem.remove();
      movedTask.status = "inprogress";
      createNewTask(movedTask);
      updateStorage(tasks);
    }
    let inprogressAccept = document.querySelector(".warning__accept");
    inprogressAccept.addEventListener("click", closeModalInprogress);

  } else if (e.target.id == "done") {
    let elem = dragTask.closest(".task");
    let taskId = +elem.getAttribute("data-key");
    let movedTask = tasks.find(item => item.id == taskId);
    if (movedTask.status != "todo") {
      movedTask.status = "done";
      elem.remove();
      createNewTask(movedTask);
      updateStorage(tasks);
    }
  }

  if (e.target.classList.contains("drop")) {
    e.target.classList.remove("drop");
  }
};

let workArea = document.querySelectorAll(".work__area")
workArea.forEach(area => {
  area.addEventListener('dragover', dragOver);
  area.addEventListener('dragenter', dragEnter);
  area.addEventListener('dragleave', dragLeave);
  area.addEventListener('drop', dragDrop);
});