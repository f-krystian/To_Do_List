import { dragAndDrop } from './drag_and_drop.js';

const displayTasks = function () {
  const tasksDB = JSON.parse(localStorage.getItem('tasksDB')) || [];
  console.log(tasksDB);
  const allTasksContainer = document.querySelector('#all-tasks__items');
  const inProgressContainer = document.querySelector('#in-progress__items');
  const finishedContainer = document.querySelector('#finished__items');

  // Clear existing tasks
  allTasksContainer.innerHTML = '';
  inProgressContainer.innerHTML = '';
  finishedContainer.innerHTML = '';

  // Sort and display tasks
  tasksDB.forEach((task) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.setAttribute('data-id', task.id);
    taskItem.setAttribute('data-state', task.state);
    taskItem.setAttribute('draggable', 'true'); // Make task items draggable
    taskItem.innerHTML = `
      <span class="task-text">${task.value}</span>
      <div class="task-item_buttons">
        <button class="item-btn edit-btn">Edit</button>
        <button class="item-btn delete-btn">Delete</button>
      </div>  
    `;

    switch (task.state) {
      case 'all_tasks':
        allTasksContainer.insertAdjacentElement('afterbegin', taskItem);
        break;
      case 'in_progress':
        inProgressContainer.insertAdjacentElement('afterbegin', taskItem);
        break;
      case 'finished':
        finishedContainer.insertAdjacentElement('afterbegin', taskItem);
        break;
      default:
        break;
    }
  });

  dragAndDrop();
};

export { displayTasks };
