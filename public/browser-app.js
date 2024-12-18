const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const taskPriorityDOM = document.querySelectorAll("input[name='priority']");
const submitBtnDOM = document.querySelector("#submit-btn");
const formAlertDOM = document.querySelector(".form-alert");

// default submit btn disable
const disableSubmitBtn = () => {
  submitBtnDOM.disabled = true;
  return;
};

disableSubmitBtn();

// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { tasks },
    } = await axios.get("/api/v1/tasks");
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, title, isProtected, priority } = task;
        const priorityClass = priority ? `priority-${priority}` : "";

        return `<div class="single-task ${
          completed && "task-completed"
        } ${priorityClass}">
                  <h5><span><i class="far fa-check-circle"></i></span>${title}</h5>
                  <div class="task-links">
                    <!-- edit link -->
                    <a href="task.html?id=${taskID}"  class="edit-link">
                    <i class="fas fa-edit"></i>
                    </a>
                    <!-- delete btn -->
                    ${
                      !isProtected
                        ? `<button type="button" class="delete-btn" data-id="${taskID}">
                          <i class="fas fa-trash"></i>
                        </button>`
                        : ""
                    }
                  </div>
                </div>`;
      })
      .join("");
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

showTasks();

// delete task /api/tasks/:id

tasksDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

// submit btn disable
taskInputDOM.addEventListener("input", (e) => {
  const el = e.target.value;
  if (el == "") {
    submitBtnDOM.disabled = true;
    // submitBtnDOM.style.visibility = "hidden";
  }
  if (el !== "") {
    submitBtnDOM.disabled = false;
    // submitBtnDOM.style.visibility = "block";
  }
  // console.log(
  //   "e1",
  //   el,
  //   "submitBtnDOM.disable",
  //   submitBtnDOM.disabled,
  //   submitBtnDOM
  // );
  // loadingDOM.style.visibility = "hidden";
});

// form
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskInputDOM.value;
  const priority = Array.from(taskPriorityDOM).find((p) => p.checked).value; // Get the value of the selected priority

  try {
    await axios.post("/api/v1/tasks", { title, priority });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again ${JSON.stringify(
      error.response.data.message
    )}`;
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
