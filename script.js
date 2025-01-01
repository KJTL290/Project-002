document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `list-group-item todo-item ${todo.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <div class="todo-actions">
                    <button class="btn btn-sm btn-success" onclick="toggleTodo(${index})">
                        ${todo.completed ? '↩️' : '✓'}
                    </button>
                    <button class="btn btn-sm btn-danger delete-btn" onclick="deleteTodo(${index})">
                        ✕
                    </button>
                </div>
            `;
            
            todoList.appendChild(li);
        });
        
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        
        if (todoText) {
            todos.push({
                text: todoText,
                completed: false
            });
            todoInput.value = '';
            renderTodos();
        }
    });

    window.toggleTodo = (index) => {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    };

    window.deleteTodo = (index) => {
        todos.splice(index, 1);
        renderTodos();
    };

    renderTodos();
});