{
  const tasks = [
    {
      content: "obejrzeć lekcję",
      done: false,
    },
    {
      content: "zjeść pierogi",
      done: true,
    },
  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const toggleDoneTask = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `<li class="tasks__item${
        task.done ? " tasks__item--done" : ""
      }"
        >
        <button class="tasks__button js-done">✓</button>
        ${task.content}
        <button class="tasks__button tasks__button--remove js-remove">X</button>
        </li>`;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    const doneButtonElements = document.querySelectorAll(".js-done");
    doneButtonElements.forEach((doneButtonElement, index) => {
      doneButtonElement.addEventListener("click", () => {
        toggleDoneTask(index);
      });
    });

    const removeButtonElements = document.querySelectorAll(".js-remove");
    removeButtonElements.forEach((removeButtonElement, index) => {
      removeButtonElement.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

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
