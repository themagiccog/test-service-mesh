# ToDo Application

This is a simple ToDo application built using FastAPI, SQLite, and Bootstrap. The application allows users to add, view, edit, and delete todo items. Each todo item can be marked as completed. The frontend is developed using HTML, JavaScript, and CSS with Bootstrap for styling.

## Features

- Create todo items
- View a list of todo items
- View detailed information about a specific todo item
- Edit and update todo items
- Delete todo items
- Responsive design using Bootstrap

## Technologies Used

- **FastAPI**: As the web framework for building APIs.
- **SQLite**: For the database to store todo items.
- **Bootstrap**: For responsive frontend design.
- **JavaScript**: For dynamic interaction in the frontend.
- **HTML/CSS**: For structuring and styling the frontend.

## Project Structure

```bash
fastapi-html-todo
├── backend
│   ├── main.py
│   ├── models.py
│   ├── database.py
├── static
│   ├── index.html
│   ├── detail.html
│   ├── app.js
│   ├── detail.js
│   ├── style.css
├── README.md
├── requirements.txt
├── steps
└── .gitignore
```

## Setup and Installation

### Requirements

- Python 3.8+
- pip

### Steps to Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. **Install dependencies:**
   
  ```bash
  pip install fastapi uvicorn sqlalchemy
  # or
  pip install -r requirements.txt
  ```

3. **Start the FastAPI server:**

  ```bash
  uvicorn backend.main:app --port 8008  --reload
  ```
This command starts the server with hot reloading enabled.

4. **Open your browser:**
Access the application via `http://127.0.0.1:8000/static/index.html`.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request to add more features or improve the existing ones.


