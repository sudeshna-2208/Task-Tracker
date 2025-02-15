# Task Tracker with Priorities  

A simple and intuitive web application for managing tasks with priority levels. The Task Tracker allows users to create, view, edit, and filter tasks based on their priorities.  

## Features  
- **Task Management**: Add, edit, and delete tasks with ease.  
- **Priority Filtering**: View tasks by priority (e.g., High, Medium, Low).  
- **Task Details**: View detailed information for each task.  
- **Dynamic State Management**: Leverages Context API for efficient task state handling across the application.  
- **Backend Integration**: Uses MongoDB for storing tasks.  
- **API Integration**: Interacts with an API for task creation, fetching, and updates using Axios.  

---

## Pages  

1. **Home**  
   - Displays a list of tasks.  
   - Filter tasks by priority.  

2. **Task Details**  
   - View and edit detailed information for each task.  

3. **Add Task**  
   - Form to add new tasks, including fields for task name, description, and priority.  

---

## Technologies Used  

- **Frontend**:  
  - HTML  
  - CSS  
  - JavaScript  

- **State Management**:  
  - Context API  

- **Backend**:  
  - MongoDB  

- **API Requests**:  
  - Axios  

---

## Setup Instructions  

1. **Clone the Repository**  
   ```bash  
   git clone <repository-url>  
   cd task-tracker  

2. **Install Dependencies**
    npm install  
3.**Start the Application**
    npm start  

4.**Setup MongoDB**

    Ensure MongoDB is installed and running.
    Configure the MongoDB connection string in your backend file (e.g., db.js or config.js).

5.**Run the Backend Server**

    node server.js  

Usage
    Open the application in your browser (default: http://localhost:3000).
    Use the Home page to view and filter tasks.
    Add new tasks via the Add Task page.
    Click on a task to view or edit details.



**Project Structure**

    📦Task Tracker  
    ┣ 📂public  
    ┣ 📂src  
    ┃ ┣ 📂components  
    ┃ ┣ 📂pages  
    ┃ ┣ 📂context  
    ┃ ┣ 📂utils  
    ┣ 📂backend  
    ┃ ┣ 📜server.js  
    ┃ ┣ 📜db.js  
    ┣ 📜package.json  
    ┣ 📜README.md  


License
This project is licensed under the MIT License.

Acknowledgments
MongoDB
Axios
MDN Web Docs





Let me know if you'd like to tweak this further!


