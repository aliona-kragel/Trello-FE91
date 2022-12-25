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

let showCurrentTime = function () {
  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
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

let createNewTask = function (obj) {

  let columnToDo = document.getElementById("todo");
  let columnInProgress = document.getElementById("inProgress");
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
};

for (let i = 0; i < tasks.length; i++) {
  createNewTask(tasks[i])
};