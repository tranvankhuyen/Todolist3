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
    tasks.map((task) => {
        const li = document.createElement('li')
        const h2 = document.createElement('h2')
        const button = document.createElement('button')
        let listTasks = document.querySelector('ul')

        li.className = `task-item-${task.id}`
        h2.appendChild(document.createTextNode(task.name))
        li.appendChild(h2)
        
        // button.onclick = handleDelete(task.id)
        button.appendChild(document.createTextNode('Delete'))
        addEvent(button, 'click', handleDelete(task.id))
        li.appendChild(button)
        console.log(button)
        
        listTasks.appendChild(li)
    })
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
            // getApi(renderTasks)
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
function handleDelete(id, callback) {
    let taskItems = document.querySelector('.task-item-' + id)
    console.log(taskItems)
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
function addEvent(el, type, handler) {
    el.attachEvent ?
      el.attachEvent('on' + type, handler) :
      el.addEventListener(type, handler);
  }