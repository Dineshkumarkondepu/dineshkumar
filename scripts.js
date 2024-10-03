function addTask() {
    const nameInput = document.getElementById('nameInput');
    const taskInput = document.getElementById('taskInput');
    const nameText = nameInput.value.trim();
    const taskText = taskInput.value.trim();

    if (nameText === "" || taskText === "") {
        alert("Please enter both name and task.");
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = 
        `<div>
            <input type="checkbox" onchange="toggleCompletion(this)">
            <span class="status">Pending</span>
        </div>
        <input type="text" class="task-input" value="${nameText}" readonly>
        <input type="text" class="task-input" value="${taskText}" readonly>
        <div>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="save-btn" onclick="saveTask(this)" style="display: none;">Save</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>`;
    taskList.appendChild(li);

    updateProgress();

    nameInput.value = "";
    taskInput.value = "";
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
    updateProgress();
}

function editTask(button) {
    const li = button.parentElement.parentElement;
    const nameInput = li.children[1];
    const taskInput = li.children[2];
    const saveButton = li.children[3].children[1];

    nameInput.removeAttribute('readonly');
    taskInput.removeAttribute('readonly');

    button.style.display = 'none';
    saveButton.style.display = 'inline';
}

function saveTask(button) {
    const li = button.parentElement.parentElement;
    const nameInput = li.children[1];
    const taskInput = li.children[2];
    const editButton = li.children[3].children[0];

    nameInput.setAttribute('readonly', true);
    taskInput.setAttribute('readonly', true);

    button.style.display = 'none';
    editButton.style.display = 'inline';
}

function toggleCompletion(checkbox) {
    const li = checkbox.parentElement.parentElement;
    const nameInput = li.children[1];
    const taskInput = li.children[2];
    const statusText = li.querySelector('.status');

    if (checkbox.checked) {
        nameInput.classList.add('completed');
        taskInput.classList.add('completed');
        statusText.textContent = 'Complete';
    } else {
        nameInput.classList.remove('completed');
        taskInput.classList.remove('completed');
        statusText.textContent = 'Pending';
    }

    updateProgress();
}

function updateProgress() {
    const tasks = document.querySelectorAll('#taskList li');
    const completedTasks = document.querySelectorAll('#taskList li input[type="checkbox"]:checked');
    const progressBar = document.getElementById('progress-bar');

    const progress = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
    progressBar.style.width = progress + "%";
}

function DarkMode() {
    const body = document.body;
    const container = document.querySelector('.container');
    const taskListItems = document.querySelectorAll('ul li');

    body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');

    taskListItems.forEach(item => {
        item.classList.toggle('dark-mode');
    });

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.toggle('dark-mode');
    });
}
