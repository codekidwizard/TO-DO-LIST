document.addEventListener('DOMContentLoaded', function() {
    const openPopupBtn = document.getElementById('openPopupBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const popup = document.getElementById('popup');
    const addButton = document.getElementById('add-button');
    const saveTasksButton = document.getElementById('saveTasksButton');
    const taskInput = document.getElementById('new-item-input');
    const taskList = document.getElementById('checkbook-list');

    // Load tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });

    openPopupBtn.addEventListener('click', function() {
        popup.style.display = 'flex';
    });

    closePopupBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            addTaskToDOM(taskText, false);
            taskInput.value = '';
            popup.style.display = 'none';
        }
    });

    saveTasksButton.addEventListener('click', function() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('.item-text').textContent;
            const isCompleted = li.querySelector('.checkbox').checked;
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        alert('Tasks saved!');
    });

    function addTaskToDOM(taskText, isCompleted) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${isCompleted ? 'checked' : ''}>
            <span class="item-text">${taskText}</span>
            <svg class="delete-button" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48"><title>trash can</title><g stroke-width="1" fill="#000000" stroke="#000000" class="nc-icon-wrapper"><path d="M39,16,37.249,42.266A4,4,0,0,1,33.258,46H14.742a4,4,0,0,1-3.991-3.734L9,16" fill="none" stroke="#000000" stroke-linecap="square" stroke-miterlimit="10"></path><line data-color="color-2" x1="4" y1="10" x2="44" y2="10" fill="none" stroke-linecap="square" stroke-miterlimit="10"></line><path data-cap="butt" data-color="color-2" d="M17,10V2H31v8" fill="none" stroke-miterlimit="10"></path></g></svg>
        `;

        const checkbox = li.querySelector('.checkbox');
        const deleteButton = li.querySelector('.delete-button');

        if (isCompleted) {
            li.classList.add('completed');
        }

        checkbox.addEventListener('click', function() {
            li.classList.toggle('completed');
        });

        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
        });

        taskList.appendChild(li);
    }
});
