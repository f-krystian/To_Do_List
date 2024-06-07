import { displayTasks } from "./display_tasks.js";

const addNewTask = function () {
  const taskInput = document.querySelector('.task-input');
  const addBtn = document.querySelector('.add-task-btn');
  let newInput = '';
  let tasksDB = JSON.parse(localStorage.getItem('tasksDB')) || [];

  const generateUniqueId = () => {
    if (tasksDB.length === 0) {
      return 0;
    }

    const largestId = tasksDB.reduce((maxId, task) => Math.max(maxId, task.id), 0);
    return largestId + 1;
  }

  const saveInput = function () {
    newInput = taskInput.value.trim();
    console.log(newInput);

    if (newInput) {
      const newTask = {
        id : generateUniqueId(),
        state: 'all_tasks',
        value: newInput
      };
    tasksDB.push(newTask);
    console.log(tasksDB);

    //Local storage update
    localStorage.setItem('tasksDB', JSON.stringify(tasksDB));
    taskInput.value = '';    
    }
    displayTasks()    
  }

  if (taskInput && addBtn) {
    addBtn.addEventListener('click', saveInput);
  
    taskInput.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
        saveInput();
      }
    })
  }
  

}

export {addNewTask};