import {
    tasks, usersData, checkTaskValue, checkSelectValue, updateTask, createNewTask,
  } from "./render.js";
  import { updateStorage } from "./local.js";
  import { updateCounterToDo } from "./counters.js";
  import { deleteTask, deleteAllTask } from "./render.js"
  
  export let modalBg = document.querySelector(".modal__bg");
  
  let modalAddTodo = document.querySelector(".modal.modal__add-todo");
  let addTodo = document.querySelector(".todo__footer");
  let closeModal = document.querySelector(".add-todo__cancel");
  let confirmTodo = document.querySelector(".add-todo__confirm");
  let modalEditTodo = document.querySelector(".modal.modal__edit");
  let editConfirm = document.querySelector(".edit__confirm");
  let closeEditTodo = document.querySelector(".edit__cancel");
  let modalInprogress = document.querySelector(".in-progress__warning.warning");
  let modalDone = document.querySelector(".done__warning.warning");
  
  // Add todo
  
  export let showModalAddTodo = function () {
    modalBg.classList.add("active");
    modalAddTodo.classList.add("active");
  };
  
  addTodo.addEventListener("click", showModalAddTodo);
  
  export let addNewTodo = function () {
    let todoTitle = document.querySelector(".add-todo__title");
    let todoDescription = document.querySelector(".add-todo__description");
    let time = document.querySelector(".header__clock");
    let select = document.querySelector('.user__select');
  
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
    }
  };
  
  let clearModalState = function () {
    let todoTitle = document.querySelector(".add-todo__title");
    let todoDescription = document.querySelector(".add-todo__description");
    let select = document.querySelector('.user__select');
    todoTitle.value = "";
    todoDescription.value = "";
    select.value = "0";
  }
  
  export let closeModalTodo = function () {
    modalBg.classList.remove("active");
    modalAddTodo.classList.remove("active");
    clearModalState();
  }
  
  closeModal.addEventListener("click", closeModalTodo);
  confirmTodo.addEventListener("click", addNewTodo);
  
  // Edit
  
  export let showModalEdit = function () {
    modalBg.classList.add("active");
    modalEditTodo.classList.add("active");
  
    let elem = this.closest(".task");
    let taskId = +elem.getAttribute("data-key");
    let editedTask = tasks.find(item => item.id == taskId);
    let editedUser = editedTask.user;
    setSelectedAttribute(editedUser);
  
    let editTitle = document.querySelector(".edit__title");
    let editDescription = document.querySelector(".edit__description");
    let userEdit = document.querySelector(".user__select-edit");
  
    editTitle.value = editedTask.title;
    editDescription.value = editedTask.description;
  
    let confirmEditTodo = function () {
      let userEditText = userEdit.options[userEdit.selectedIndex].text;
      editedTask.title = editTitle.value;
      editedTask.description = editDescription.value;
      editedTask.user = userEditText;
  
      if (checkTaskValue(editTitle.value) &&
        checkTaskValue(editDescription.value) &&
        checkSelectValue(userEditText)) {
        let task = {
          ...editedTask,
          title: editTitle.value,
          description: editDescription.value,
          user: userEditText,
        }
        updateStorage(tasks);
        updateTask(task);
        closeModalEdit();
      }
      else {
        alert("Заполните все поля")
      }
    }
    editConfirm.addEventListener("click", confirmEditTodo);
  };
  
  export let closeModalEdit = function () {
    modalBg.classList.remove("active");
    modalEditTodo.classList.remove("active");
  }
  
  closeEditTodo.addEventListener("click", closeModalEdit);
  
  let setSelectedAttribute = function (userName) {
    let userSelect = document.querySelector(".user__select-edit");
    let allOptions = userSelect.querySelectorAll("option");
    allOptions.forEach((item) => {
      if (item.getAttribute("selected")) {
        item.removeAttribute("selected", "selected");
      };
      if (item.value == userName) {
        item.setAttribute("selected", "selected");
      }
    })
  }
  
  // Warnings 
  
  export let showModalInprogress = function () {
    modalBg.classList.add("active");
    modalInprogress.classList.add("active");
  };
  
  export let closeModalInprogress = function () {
    modalBg.classList.remove("active");
    modalInprogress.classList.remove("active");
  };
  
  export let showModalDone = function () {
    modalBg.classList.add("active");
    modalDone.classList.add("active");
  };
  
  export let closeModalDone = function () {
    modalBg.classList.remove("active");
    modalDone.classList.remove("active");
  }
  
  let modalDeleteTask = document.querySelector(".delete-task__warning");
  
  export let showModalDeleteTask = function (parent, taskId) {
    modalBg.classList.add("active");
    modalDeleteTask.classList.add("active");
    let confirmDeleteTask = document.querySelector(".warning-delete__confirm");
    confirmDeleteTask.addEventListener("click", () => {
      closeModalDeleteTask();
      deleteTask(parent, taskId);
    });
  
    let cancelDeleteTask = document.querySelector(".warning-delete__cancel");
    cancelDeleteTask.addEventListener("click", () => {
      closeModalDeleteTask();
    });
  }
  
  export let closeModalDeleteTask = function () {
    modalBg.classList.remove("active");
    modalDeleteTask.classList.remove("active");
  }
  
  let confirmDeleteAll = document.querySelector(".warning__confirm");
  confirmDeleteAll.addEventListener("click", () => {
    deleteAllTask();
    closeModalDone();
  });