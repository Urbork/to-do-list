{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [{ content: newTaskContent }, ...tasks];

    render();
  };

  const toggleDoneTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { content: tasks[taskIndex].content, done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

    render();
  };

  const toggleHideDone = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };

  const setAllDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

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
      <li class="tasks__listItem
      ${hideDoneTasks && task.done ? "tasks__listItem--hidden" : ""}
      ">
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

  const bindButtonsEvents = () => {
    if (tasks.length === 0) {
      return;
    }
    const hideAllDoneElement = document.querySelector(".js-hideAllDone");
    hideAllDoneElement.addEventListener("click", () => {
      toggleHideDone();
    });
    const setAllDoneElement = document.querySelector(".js-setAllDone");
    setAllDoneElement.addEventListener("click", () => {
      setAllDone();
    });
  };

  const renderButtons = () => {
    let htmlButtons = "";

    if (tasks.length === 0) {
      htmlButtons;
    } else {
      htmlButtons = `
      <button class="tasks__headerButton js-hideAllDone">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
      </button>
      <button class="tasks__headerButton js-setAllDone"
      ${tasks.every(({ done }) => done) ? " disabled" : ""}>
        Ukończ wszystkie
      </button>`;
    }

    document.querySelector(".js-buttons").innerHTML = htmlButtons;
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
