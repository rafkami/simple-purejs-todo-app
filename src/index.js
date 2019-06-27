import "./sass/main.scss";
import img from "./img/todo-favicon.png";

let todos = [];

// Fetch existing todos from localStorage

const loadTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    todos = todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    todos = [];
  }
};

// Save todos to localStorage

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => todos;

// Create a new todo

const createTodo = text => {
  todos.push({
    id: todos.length + 1,
    text
  });
  saveTodos();
};

// Delete a todo from the list

const deleteTodo = () => {
  todos.pop();
  saveTodos();
};

const deleteAll = () => {
  todos = [];
  saveTodos();
};

loadTodos();

// Get the DOM elements for an individual todo

const generateDOM = todo => {
  const todoEl = document.createElement("div");
  const containerEl = document.createElement("div");
  const taskId = document.createElement("span");
  const todoText = document.createElement("span");

  // Setup taskId span text

  taskId.textContent = `Task no. ${todo.id}:`;
  taskId.classList.add("list-item__number")
  containerEl.appendChild(taskId);

  // Setup todo span text
  todoText.textContent = todo.text;
  todoText.classList.add("list-item__content")
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  return todoEl;
};

const renderTodos = () => {
  const todosEl = document.querySelector("#todos");
  const introText = document.createElement("h2");
  const listedTodos = getTodos();
  todosEl.innerHTML = "";
  if (listedTodos.length > 0) {
    introText.classList.add("list-title");
    introText.textContent = `You have ${
      listedTodos.length === 1
        ? listedTodos.length + " todo"
        : listedTodos.length + " todos"
    } left:`;
    todosEl.appendChild(introText);
    listedTodos.forEach(todo => {
      const todoEl = generateDOM(todo);
      todosEl.appendChild(todoEl);
    });
  } else {
    const emptyMessage = document.createElement("h2");
    emptyMessage.textContent = "No to-dos to show";
    emptyMessage.classList.add("empty-message");
    todosEl.appendChild(emptyMessage);
  }
};

renderTodos();

document.querySelector("#new-todo").addEventListener("submit", e => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();

  if (text != 0) {
    createTodo(text);
    renderTodos();
    e.target.elements.text.value = "";
  }
});

document.querySelector("#remove-last").addEventListener("click", e => {
  e.preventDefault();
  deleteTodo();
  renderTodos();
});

document.querySelector("#clear-all").addEventListener("click", e => {
  e.preventDefault();
  deleteAll();
  renderTodos();
});

window.addEventListener("storage", e => {
  if (e.key === "todos") {
    loadTodos();
    renderTodos();
  }
});
