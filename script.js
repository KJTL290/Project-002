document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Render todos
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
        
        // Save to localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Add todo
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

    // Toggle todo completion status
    window.toggleTodo = (index) => {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    };

    // Delete todo
    window.deleteTodo = (index) => {
        todos.splice(index, 1);
        renderTodos();
    };

    // Initial render
    renderTodos();
});