{
  let tasks = []; // let, bo zmieniamy unshift na tasks = [ ...tasks, nowezadanie]
  let hideDoneTasks = false; // kliknięcie przełącza

  const addNewTask = (newTaskContent) => {
    tasks.unshift({
      content: newTaskContent,
    });

    render();
  };

  const toggleDoneTask = (taskIndex) => {
    // tasks = tasks.map( ) immutability
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const bindToggleDoneEvents = () => {
    const doneButtonElements = document.querySelectorAll(".js-done");
    doneButtonElements.forEach((doneButtonElement, index) => {
      doneButtonElement.addEventListener("click", () => {
        toggleDoneTask(index);
      });
    });
  };

  const bindRemoveEvents = () => {
    const removeButtonElements = document.querySelectorAll(".js-remove");
    removeButtonElements.forEach((removeButtonElement, index) => {
      removeButtonElement.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="tasks__listItem">
        <button class="tasks__button js-done">
          ${task.done ? "✓" : ""}
        </button>
        <span class="tasks__listItemText
        ${task.done ? " tasks__listItemText--done" : ""}
        ">
          ${task.content}
        </span>
        <button class="tasks__button tasks__button--remove js-remove">X</button>
      </li>`;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    // 1: hide done: true
    // 2: toggle all tasks done
    // skleić HTML jak renderTasks
  };

  const bindButtonsEvents = () => {
    // IF, sprawdzić czy przycisk istnieje
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindToggleDoneEvents();
    bindRemoveEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();
    newTaskElement.value = "";
    newTaskElement.focus();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const formElement = document.querySelector(".js-form");

    formElement.addEventListener("submit", onFormSubmit);
  };

  init();
}
