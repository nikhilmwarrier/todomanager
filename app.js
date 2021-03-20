// ServiceWorker Scripts
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(function () {
    console.log("Service Worker Registered");
  });
}

// End
if (!localStorage.getItem("savedTodos")) {
  var todos = [];
} else {
  var todos = localStorage.getItem("savedTodos").split(",");
}
let form = document.querySelector(".new-todo-form");

createTodoItems(todos);

form.addEventListener("submit", e => {
  e.preventDefault();
  //   console.log(e);
  let newItem = document.querySelector(".new-todo-form-input").value;
  if (newItem !== "") {
    console.log(newItem);
    todos.unshift(newItem);
    localStorage.setItem("savedTodos", todos);
    createTodoItems(todos);

    document.querySelector(".new-todo-form-input").value = "";
  }
});

function createTodoItems(todoItemsArray) {
  let todoContainer = document.querySelector(".todo-container");
  todoContainer.innerHTML = "";
  todoItemsArray.forEach(todo => {
    if (todo != "") {
      let todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");
      todoItem.innerHTML = `
        <p class="todo">${todo}</p>
        <button class="delete-todo">&times;</button>
    `;
      todoContainer.appendChild(todoItem);
    }
  });

  //  <input type="checkbox" id="chkbox" class="todo-checkbox" />

  // let checkboxes = document.querySelectorAll(".todo-checkbox");
  // checkboxes.forEach(checkbox => {
  //   checkbox.addEventListener("click", () => {
  //     setTimeout(() => {
  //       checkbox.nextElementSibling.nextElementSibling.click();
  //     }, 1000);
  //   });
  // });

  let deleteBtns = document.querySelectorAll(".delete-todo");

  deleteBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      let item = btn.previousElementSibling.innerHTML;
      btn.parentElement.style.transform = "rotate(40deg)";
      btn.parentElement.style.opacity = 0;
      setTimeout(() => {
        deleteTodo(item);
      }, 500);
    });
  });
}

// function arrayRemove(arr, value) {
//   return arr.filter(function (ele) {
//     return ele != value;
//   });
// }

function arrayRemove(arr, value) {
  let newArray = [...arr];
  const index = newArray.findIndex(elem => elem === value);
  if (index !== -1) {
    newArray.splice(index, 1);
    return newArray;
  }
}

function deleteTodo(item) {
  todos = arrayRemove(todos, item);
  console.log(todos);
  createTodoItems(todos);
  localStorage.setItem("savedTodos", todos);
}

function clearAllTodos() {
  todos = [];
  createTodoItems(todos);
  localStorage.setItem("savedTodos", todos);
}
