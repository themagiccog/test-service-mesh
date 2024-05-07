const urlParams = new URLSearchParams(window.location.search);
const todoId = urlParams.get('id');

async function fetchTodoDetails() {
    const response = await fetch(`/todos/${todoId}`);
    const todo = await response.json();
    document.getElementById('todo-title').value = todo.title;
    document.getElementById('todo-description').value = todo.description;
    document.getElementById('todo-completed').checked = todo.completed;
}
fetchTodoDetails();

async function updateTodo() {
    const title = document.getElementById('todo-title').value;
    const description = document.getElementById('todo-description').value;
    const completed = document.getElementById('todo-completed').checked;

    const response = await fetch(`/todos/${todoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            completed: completed
        })
    });

    if (response.ok) {
        alert('Todo updated successfully!');
        window.location.href = 'index.html'; // Redirect to the main list
    } else {
        alert('Failed to update todo.');
    }
}

document.getElementById('delete-btn').addEventListener('click', async function() {
    const response = await fetch(`/todos/${todoId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        window.location.href = 'index.html';
    } else {
        alert('Failed to delete the task.');
    }
});
