
const input = document.querySelector('#task')
const button = document.querySelector("#button_create")
const ul = document.querySelector(".task-list")

const DB_KEY = "@test";

const STORAGE_SERVICE = {
    listTasks: () => {
        const storage = localStorage.getItem(DB_KEY);
        return storage ? JSON.parse(storage) : [];
    },
    createTask: (taskDescription) => {
        const storage = localStorage.getItem(DB_KEY);
        const newTask = { description: taskDescription, isCompleted: false };
        if (storage) {
            const storageParsed = JSON.parse(storage);
            const tasks = [...storageParsed, newTask];
            localStorage.setItem(DB_KEY, JSON.stringify(tasks));
        } else {
            localStorage.setItem(DB_KEY, JSON.stringify([newTask]));
        }
    },
    deleteTask: (taskDescription) => {
        const storage = localStorage.getItem(DB_KEY);
        if (storage) {
            const storageParsed = JSON.parse(storage);
            const filteredTasks = storageParsed.filter(
                (item) => item.description !== taskDescription
            );
            localStorage.setItem(DB_KEY, JSON.stringify(filteredTasks));
        } else {
            alert("Task not found");
        }
    },
    updateTaskState: (taskDescription) => {
        const storage = localStorage.getItem(DB_KEY);
        if (storage) {
            const storageParsed = JSON.parse(storage);
            const updatedTask = storageParsed.map((item) => {
                if (item.description === taskDescription) {
                    return { ...item, isCompleted: !item.isCompleted };
                }
                return item;
            });
            localStorage.setItem(DB_KEY, JSON.stringify(updatedTask));
        } else {
            alert("Task not found");
        }
    },
};

document.addEventListener("DOMContentLoaded", () => updateActivityList());

const addTaskInput = document.getElementById("addTask");
const addTaskButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (!addTaskInput.value) {
        return alert("A tarefa precisa ser preenchida");
    }
    STORAGE_SERVICE.createTask(addTaskInput.value);
    updateActivityList();
    addTaskInput.value = "";
});

const updateStateTask = (event) => {
    const input = event.target;
    const description = input.value;
    STORAGE_SERVICE.updateTaskState(description);
};

const createTaskItem = (task) => {
    let checkbox = `<input type="checkbox" value="${task.description}" `;
    if (task.isCompleted) {
        checkbox += "checked";
    }
    checkbox += `>`;
    const li = `<li class="task-item">
      ${checkbox}
      <p>${task.description}</p>
    </li>`;
    return li;
};

// Adicione o evento de clique ao checkbox
taskList.addEventListener("click", (event) => {
    if (event.target.type === "checkbox") {
        const description = event.target.value;
        STORAGE_SERVICE.updateTaskState(description);
        updateActivityList();
    }
});

const updateActivityList = () => {
    const taskList = document.getElementById("task-list");
    const tasks = STORAGE_SERVICE.listTasks();
    const countTasks = tasks.length;
    const countTasksCompleted = tasks.filter((item) => item.isCompleted).length;
    document.querySelector(".count-tasks").textContent = countTasks;
    document.querySelector(".count-finished").textContent = countTasksCompleted;
    taskList.innerHTML = "";
    if (tasks.length === 0) {
        const emptyState = document.querySelector(".empty-space");
        emptyState.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
    } else {
        for (let task of tasks) {
            taskList.innerHTML += createTaskItem(task);
        }
    }
};