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
      htmlString += `<li 
          ${task.done ? ' style="text-decoration: line-through"' : ""}
        >
        <button class="js-done">Zrobione?</button>
        <button class="js-remove">Usuń</button>
          ${task.content}
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
