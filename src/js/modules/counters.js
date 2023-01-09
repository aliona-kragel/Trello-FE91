import { tasks } from "./render.js";

export let updateCounterToDo = function () {
  let doneToDoArr = tasks.filter(item => item.status == "todo");
  let counter = doneToDoArr.length;
  let counterValue = document.querySelector(".todo__header .counter");
  counterValue.innerHTML = counter;
}

export let updateCounterInProgress = function () {
  let inProgressToDoArr = tasks.filter(item => item.status == "inprogress");
  let counter = inProgressToDoArr.length;
  let counterValue = document.querySelector(".in-progress__header .counter");
  counterValue.innerHTML = counter;
}

export let updateCounterDone = function () {
  let doneToDoArr = tasks.filter(item => item.status == "done");
  let counter = doneToDoArr.length;
  let counterValue = document.querySelector(".done__header .counter");
  counterValue.innerHTML = counter;
}