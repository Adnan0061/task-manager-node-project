const taskIDDOM = document.querySelector(".task-edit-id");
const taskTitleDOM = document.querySelector("[data-task-edit-title]");
const taskDescriptionDOM = document.querySelector(
  "[data-task-edit-description]"
);
const priorityDOM = document.querySelectorAll("input[name='priority']");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName;

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`);
    console.log(taskTitleDOM);
    const { _id: taskID, completed, title, description, priority } = task;
    console.log(taskID, completed, title, description, priority);

    taskIDDOM.textContent = taskID;
    taskTitleDOM.value = title;
    taskDescriptionDOM.value = description;
    tempName = title;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
    priorityDOM.forEach((p) => {
      if (p.value === priority) {
        p.checked = true;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

showTask();

editFormDOM.addEventListener("submit", async (e) => {
  editBtnDOM.textContent = "Loading...";
  e.preventDefault();
  try {
    const taskTitle = taskTitleDOM.value;
    const taskDescription = taskDescriptionDOM.value;
    const taskCompleted = taskCompletedDOM.checked;
    let priority;
    priorityDOM.forEach((p) => {
      if (p.checked) {
        priority = p.value;
      }
    });

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      title: taskTitle,
      description: taskDescription,
      priority: priority,
      completed: taskCompleted,
    });

    const { _id: taskID, completed, title, description } = task;
    console.log(taskID, completed, title, description);

    taskIDDOM.textContent = taskID;
    taskTitleDOM.value = title;
    taskDescriptionDOM.value = description;
    tempName = title;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, edited task`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.error(error);
    taskTitleDOM.value = tempName;
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  editBtnDOM.textContent = "Edit";
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
