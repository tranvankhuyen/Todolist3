const tasksAPI = 'http://localhost:3000/works'

function start() {
    getApi(renderTasks)
    createTasks()
}

start()

function getApi(callback) {
    fetch(tasksAPI)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}

function renderTasks(tasks) {
    let HTML = tasks.map((task) => {
        return `<li class="task-item-${task.id}">
            <h2>${task.name}</h2>
            <button onclick="handleDelete(${task.id})">Delete</button>
        </li>`
    })
    let listTasks = document.querySelector('.list-tasks')
    listTasks.innerHTML = HTML.join('')
}

function createTasks() {
    let createBtn = document.querySelector('.create')
    createBtn.onclick = () => {
        let name = document.querySelector('input[name="name"]').value
        console.log(name)
        let task = {
            name: name,
        }
        sentTasks(task, () => {
            getApi(renderTasks)
        })
    }
}

function sentTasks(data, callback) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    fetch(tasksAPI, options)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}

function handleDelete(id) {
    let taskItems = document.querySelector('.task-item-' + id)
    taskItems.remove()
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    fetch(tasksAPI + '/' + id, options)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}
