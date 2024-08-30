

const input = document.querySelector("#addTask");

const button = document.querySelector("#add-button")

const ul = document.querySelector(".task-list")

const dbKey = "@task-list"

const array = [{ description: "sexo2", taskCompleted: false }]

const STORAGE_SERVICE = {
    listTasks: () => {
        localStorage.setItem(dbKey, JSON.stringify(array))
        const storage = localStorage.getItem(dbKey)

        if (storage) {
            return console.log(JSON.parse(storage))
        }

        return []
    },

    // O que é task? .. Será o nosso objeto desde formato {description: string. taskCompleted: boolean}
    createTask: (taskDescription) => {

        const storage = localStorage.getItem(dbKey)

        const newTask = {
            description: taskDescription,
            taskCompleted: false,
        }

        if (storage) {
            const storageParsed = JSON.parse(storage)

            const tasks = {
                ...storageParsed, newTask
            }

            return localStorage.setItem(dbKey, JSON.stringify({ tasks }))
        }
        return localStorage.setItem(dbKey, JSON.stringify({ tasks: [newTask] }))
    }
}



document.addEventListener("DOMContentLoaded", () => { });

button.addEventListener("click", (event) => {

    event.preventDefault();
    if (!input.value) {
        return alert("A tarefa precisa ser preenchida")
    }
    const checkbox = `<input type="checkbox"/>`
    const li = `<li class="task-item"> ${checkbox} <p> ${input.value} </p> </li>`

    ul.innerHTML += li
});

