document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const priorityFilter = document.getElementById('priority-filter');
    const addTaskForm = document.getElementById('add-task-form');
    const taskForm = document.getElementById('task-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const editTaskForm = document.getElementById('edit-task-form');
    const editTaskFormFields = document.getElementById('edit-task-form-fields');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');

    let currentTaskId = null; // To track the task being edited

    const baseURL = "https://task-tracker-6j2e.onrender.com"; // Deployed backend URL

    // Fetch tasks based on priority filter
    const fetchTasks = async (priority = 'all') => {
        try {
            const response = await axios.get(`${baseURL}/api/tasks?priority=${priority}`);
            const tasks = response.data;
            renderTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            taskList.innerHTML = '<p class="empty-message">Unable to load tasks. Please try again later.</p>';
        }
    };

    // Render tasks in the task list
    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        if (tasks.length === 0) {
            taskList.innerHTML = '<p class="empty-message">No tasks available.</p>';
            return;
        }

        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <h3>${task.name} (${task.priority})</h3>
                <p>${task.description}</p>
                <p>Due: ${new Date(task.dueDate).toLocaleDateString()}</p>
                <button onclick="editTask('${task._id}')">Edit</button>
                <button onclick="deleteTask('${task._id}')">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    };

    // Show add task form when the "Add Task" button is clicked
    addTaskBtn.addEventListener('click', () => {
        currentTaskId = null;
        addTaskForm.style.display = 'block';
        editTaskForm.style.display = 'none'; // Hide edit form
        taskForm.reset();  // Reset the form for adding a new task
    });

    // Hide add task form when the "Cancel" button is clicked
    cancelBtn.addEventListener('click', () => {
        addTaskForm.style.display = 'none';
    });

    // Hide edit task form when the "Cancel" button is clicked
    cancelEditBtn.addEventListener('click', () => {
        editTaskForm.style.display = 'none';
    });

    // Handle task form submission (Add or Edit)
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('task-name').value;
        const description = document.getElementById('task-description').value;
        const priority = document.getElementById('task-priority').value;
        const dueDate = document.getElementById('task-due-date').value;

        if (!name || !description || !dueDate) {
            alert('Please fill all required fields.');
            return;
        }

        try {
            // Add new task
            const response = await axios.post(`${baseURL}/api/tasks/`, {
                name,
                description,
                priority,
                dueDate
            });

            if (response.status === 201) {
                addTaskForm.style.display = 'none';
                fetchTasks();  // Refresh task list after adding a new task
            } else {
                alert('Error saving task!');
            }
        } catch (error) {
            console.error('Error saving task:', error);
            alert('Error saving task!');
        }
    });

    // Handle edit task form submission
    editTaskFormFields.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('edit-task-name').value;
        const description = document.getElementById('edit-task-description').value;
        const priority = document.getElementById('edit-task-priority').value;
        const dueDate = document.getElementById('edit-task-due-date').value;

        if (!name || !description || !dueDate) {
            alert('Please fill all required fields.');
            return;
        }

        try {
            // Update the task
            const response = await axios.put(`${baseURL}/api/tasks/${currentTaskId}`, {
                name,
                description,
                priority,
                dueDate
            });

            if (response.status === 200) {
                editTaskForm.style.display = 'none';
                fetchTasks();  // Refresh task list after editing a task
            } else {
                alert('Error updating task!');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Error updating task!');
        }
    });

    // Listen for priority filter change
    priorityFilter.addEventListener('change', (e) => {
        fetchTasks(e.target.value);
    });

    // Edit task
    window.editTask = (id) => {
        currentTaskId = id;  // Set the current task ID to edit
        axios.get(`${baseURL}/api/tasks/${id}`)
            .then(response => {
                const task = response.data;
                document.getElementById('edit-task-name').value = task.name;
                document.getElementById('edit-task-description').value = task.description;
                document.getElementById('edit-task-priority').value = task.priority;
                document.getElementById('edit-task-due-date').value = new Date(task.dueDate).toISOString().slice(0, 10);
                addTaskForm.style.display = 'none'; // Hide the add form
                editTaskForm.style.display = 'block'; // Show the edit form
            })
            .catch(error => {
                console.error('Error fetching task for edit:', error);
            });
    };

    // Delete task
    window.deleteTask = (id) => {
        if (confirm('Are you sure you want to delete this task?')) {
            axios.delete(`${baseURL}/api/tasks/${id}`)
                .then(response => {
                    alert('Task deleted successfully');
                    fetchTasks();  // Refresh task list after deletion
                })
                .catch(error => {
                    console.error('Error deleting task:', error);
                    alert('Error deleting task!');
                });
        }
    };

    // Initial fetch of tasks
    fetchTasks();
});

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

var animateButton = function(e) {
    e.preventDefault();
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(() => {
        e.target.classList.remove('animate');
    }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");
for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}
