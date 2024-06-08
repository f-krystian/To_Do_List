const dragAndDrop = function () {
  const taskItems = [...document.querySelectorAll('.task-item')];

  taskItems.forEach((taskItem) => {
    taskItem.setAttribute('draggable', 'true'); // Make task items draggable
    taskItem.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', taskItem.dataset.id);
    });
  });

  const containers = [...document.querySelectorAll('.task-items')];

  containers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    container.addEventListener('drop', (e) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData('text/plain');
      const taskItem = document.querySelector(`[data-id="${taskId}"]`);

      if (taskItem) {
        // Update State
        switch (container.id) {
          case 'all-tasks__items':
            taskItem.dataset.state = 'all_tasks';
            break;
          case 'in-progress__items':
            taskItem.dataset.state = 'in_progress';
            break;
          case 'finished__items':
            taskItem.dataset.state = 'finished';
            break;
          default:
            break;
        }

        // Update Local Storage
        const tasksDB = JSON.parse(localStorage.getItem('tasksDB')) || [];
        const updatedTasksDB = tasksDB.map((task) => {
          if (task.id === parseInt(taskId, 10)) {
            task.state = taskItem.dataset.state;
          }
          return task;
        });
        localStorage.setItem('tasksDB', JSON.stringify(updatedTasksDB));

        // Move task item to new container
        container.appendChild(taskItem);
      } else {
        console.error(`Task item with ID ${taskId} not found.`);
      }
    });
  });
};

export { dragAndDrop };
