"use strict"

const todoForm = document.getElementById('todo-form');        
const todoInput = document.getElementById('todo-input');      
const dueDateInput = document.getElementById('due-date-input'); 
const priorityInput = document.getElementById('priority-input');
const todoList = document.getElementById('todo-list');        
const prevPageBtn = document.getElementById('prev-page');     
const nextPageBtn = document.getElementById('next-page');     
const filterOption = document.getElementById('filter-option');
const sortOption = document.getElementById('sort-option');    
const searchBar = document.getElementById('search-bar');      
const statsDisplay = document.getElementById('stats');   
const userNameDisplay = document.getElementById('user-name-display'); 
const pageViewsDisplay = document.getElementById('page-views-display'); 
const clearAllBtn = document.getElementById('clear-all-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || []; 
let currentPage = 1;                                         
const todosPerPage = 5;                                      

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Show tasks on the screen
function renderTodos() {
    let filteredTodos = todos;  
    if (filterOption.value === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filterOption.value === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    const searchTerm = searchBar.value.toLowerCase(); 
    filteredTodos = filteredTodos.filter(todo => 
        todo.text.toLowerCase().includes(searchTerm) 
    );

    filteredTodos.sort((a, b) => {
        if (sortOption.value === 'due-date') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortOption.value === 'priority') {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return a.id - b.id;
    });

    const startIndex = (currentPage - 1) * todosPerPage;  
    const endIndex = startIndex + todosPerPage;           
    const currentTodos = filteredTodos.slice(startIndex, endIndex);
    todoList.innerHTML = '';  
    currentTodos.forEach((todo) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`;
        const priorityBadge = `<span class="priority-badge ${todo.priority}">${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}</span>`;

        li.innerHTML = `
            <div class="task-info">
                <span class="task-text">${priorityBadge}${todo.text}</span>
                <span class="due-date">Due: ${todo.dueDate}</span>
            </div>
            <div class="todo-actions">
                <button class="complete-btn" onclick="toggleComplete(${todo.id})">
                    <i class="fas ${todo.completed ? 'fa-undo' : 'fa-check'}"></i>
                    <span class="button-text">${todo.completed ? 'Сancel' : ' Complete'}</span>
                </button>
                <button class="edit-btn" onclick="editTodo(${todo.id})">
                    <i class="fas fa-edit"></i>
                    <span class="button-text"> Edit</span>
                </button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                    <i class="fas fa-trash"></i>
                    <span class="button-text"> Delete</span>
                </button>
            </div>
        `;
        todoList.appendChild(li);
    });
    updatePaginationButtons(filteredTodos.length);  
    updateStats(); 
}

// Turn on/off Previous and Next buttons depending on which page you're on
function updatePaginationButtons(totalTodos) {
    const totalPages = Math.ceil(totalTodos / todosPerPage);  
    prevPageBtn.disabled = currentPage === 1;  
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;  
}

// Add a new task to the list
function addTodo(e) {
    e.preventDefault();  
    const todoText = todoInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    if (todoText) {
        const newTodo = {
            id: Date.now(),  
            text: todoText,  
            completed: false,
            dueDate: dueDate ? new Date(dueDate).toLocaleDateString() : 'No due date',
            priority: priority,  
            dateAdded: new Date().toISOString()  
        };
        todos.push(newTodo);
        saveTodos();
        todoInput.value = '';  
        dueDateInput.value = '';  
        priorityInput.value = 'low';
        currentPage = Math.ceil(todos.length / todosPerPage);
        renderTodos();
    }
}

// Mark a task as done or not done
function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;  
        saveTodos();  
        renderTodos();
    }
}

// Change the text or details of a task
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        const newText = prompt('Edit task:', todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            const newDueDate = prompt('Edit due date (YYYY-MM-DD):', todo.dueDate);
    
            if (newDueDate !== null) {
                todo.dueDate = newDueDate || 'No due date';
            }
            const newPriority = prompt('Edit priority (low/medium/high):', todo.priority);
    
            if (newPriority !== null && ['low', 'medium', 'high'].includes(newPriority)) {
                todo.priority = newPriority;
            }
            saveTodos();  
            renderTodos();
        }
    }
}

// Remove a task from the list
function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        if (todos.length % todosPerPage === 0 && currentPage > 1) {
            currentPage--;
        }
  
        renderTodos();
    }
}

// Move between pages of tasks
function changePage(direction) {
    currentPage += direction; 

    renderTodos();
}

//Username storage and retrieval
function loadUserName() {
    let userName = localStorage.getItem('userName');
    if (!userName) {
        userName = prompt('Enter your name:');
        if (userName) {
            localStorage.setItem('userName', userName.trim());
        }
    }
    userNameDisplay.textContent = userName || 'Guest';
}

//Session view counter
function updatePageViews() {
    let views = parseInt(sessionStorage.getItem('pageViews') || 0) + 1;
    sessionStorage.setItem('pageViews', views);
    pageViewsDisplay.textContent = views;
}

//Clear all data
function clearAll() {
    if (confirm('Are you sure you want to clear ALL data (tasks, username, and view count)? This cannot be undone.')) {
        localStorage.removeItem('todos');
        localStorage.removeItem('userName');
        sessionStorage.removeItem('pageViews');
        
        todos = []; 
        currentPage = 1;
        
        alert('All data cleared!');
        loadUserName(); 
        updatePageViews(); 
        renderTodos();
    }
}


// Show how many tasks are total, active, and done
function updateStats() {
    const totalTasks = todos.length;
    const completedTasks = todos.filter(t => t.completed).length;
    const activeTasks = totalTasks - completedTasks;
    statsDisplay.innerHTML = `
        <strong>${totalTasks}</strong> Total Tasks | 
        <strong>${activeTasks}</strong> Active | 
        <strong>${completedTasks}</strong> Completed
    `;
}

// Set up what happens when buttons are clicked (event listeners)
todoForm.addEventListener('submit', addTodo);  
prevPageBtn.addEventListener('click', () => changePage(-1));  
nextPageBtn.addEventListener('click', () => changePage(1));   
filterOption.addEventListener('change', renderTodos);  
sortOption.addEventListener('change', renderTodos);      
searchBar.addEventListener('input', function() {
    currentPage = 1;  
    renderTodos();
});

clearAllBtn.addEventListener('click', clearAll); 

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        console.log('Todos updated in another tab. Syncing...');
        todos = JSON.parse(e.newValue || '[]');
        if (todos.length % todosPerPage === 0 && currentPage > 1) {
            currentPage--;
        }
        renderTodos();
    } else if (e.key === 'userName') {
        loadUserName(); 
    }
});


loadUserName();
updatePageViews();
renderTodos();  