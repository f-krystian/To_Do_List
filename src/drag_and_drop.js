const dragAndDrop = function () {
  console.log('Drag and drop : true');

  const initializeDragAndDrop = () => {
    const taskItems = [...document.querySelectorAll('.task-item')];

    taskItems.forEach((taskItem) => {
      taskItem.draggable = true;
      taskItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', taskItem.dataset.id);
      });
    });

    const containers = [...document.querySelectorAll('.task-items')];

    containers.forEach((container) => {
      container.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      container.addEventListener('drop', async (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        const taskItem = document.querySelector(`[data-id="${taskId}"]`);

        if (taskItem) {
          // Update State
          let newState;
          switch (container.id) {
            case 'all-tasks__items':
              newState = 'all_tasks';
              break;
            case 'in-progress__items':
              newState = 'in_progress';
              break;
            case 'finished__items':
              newState = 'finished';
              break;
            default:
              break;
          }

          if (newState) {
            taskItem.dataset.state = newState;

            // Update Local Storage
            const tasksDB = JSON.parse(localStorage.getItem('tasksDB')) || [];
            const updatedTasksDB = tasksDB.map((task) => {
              if (task._id === taskId) {
                task.state = newState;
              }
              return task;
            });
            localStorage.setItem('tasksDB', JSON.stringify(updatedTasksDB));

            // Move task item to new container
            container.appendChild(taskItem);

            // Optionally reinitialize drag and drop to ensure it's still functioning correctly
            initializeDragAndDrop();
          }
        }
      });
    });
  };

  // Initial setup
  initializeDragAndDrop();
};

export { dragAndDrop };
