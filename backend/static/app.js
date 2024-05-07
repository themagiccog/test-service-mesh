document.getElementById('todo-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const title = document.getElementById('todo-title').value;
  const description = document.getElementById('todo-description').value;
  const completed = document.getElementById('todo-completed').checked;

  const response = await fetch('/todos/', {
      method: 'POST',
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
      alert('Todo added successfully!');
      window.location.reload();
  } else {
      alert('Failed to add todo.');
  }
});

async function fetchTodos() {
  const response = await fetch('/todos/');
  const todos = await response.json();
  const listElement = document.getElementById('todo-list');
  todos.forEach(todo => {
      let item = document.createElement('li');
      let link = document.createElement('a');
      link.href = `detail.html?id=${todo.id}`;
      link.textContent = todo.title;
      item.appendChild(link);
      listElement.appendChild(item);
  });
}
fetchTodos();
