// Selecting DOM elements
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Try to load saved todos from local storage
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function savetodos() {
  // Save current todo array in local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a dom node for a todo object and append it to the list
function createTodoNode(todo, index) {
  const li = document.createElement("li");

  // checkbox to toggle completion
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;

    // Visual feedback
    textSpan.style.textDecoration = todo.completed ? "line-through" : "";
    savetodos();
  });
  // Text of the todo
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.style.margin = "0 8px";
  if (todo.completed) {
    textSpan.style.textDecoration = todo.completed ? "line-through" : "";
  }
  // double -click event listner
  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit todo", todo.text);
    if (newText !== null) {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
      savetodos();
    }
  });

  //Delete todo button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    render();
    savetodos();
  });

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);
  return li;
}

// renders the whole old todo list from todos array
function render() {
  list.innerHTML = "";

  // Recreate each item
  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    list.appendChild(node);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) {
    return;
  }

  // Push a new todo object
  todos.push({ text, completed: false });
  input.value = "";
  render();
  savetodos();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addTodo();
  }
});
render();
