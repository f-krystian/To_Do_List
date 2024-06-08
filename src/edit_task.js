import { dragAndDrop } from './drag_and_drop.js';

const editTask = function () {
  console.log(`Edit`);
  const tasksDB = JSON.parse(localStorage.getItem('tasksDB')) || [];

  document.addEventListener('click', (e) => {
    if(e.target.classList.contains('edit-btn')) {
      const taskItem = e.target.closest('.task-item');
      const taskId = parseInt(taskItem.dataset.id, 10);
      const taskTextElement = taskItem.querySelector('.task-text');

      if(e.target.textContent === 'Edit') {
        //Edit mode
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskTextElement.textContent.trim();
        input.classList.add('task-edit-input');
        taskItem.insertBefore(input, taskTextElement);
        taskTextElement.style.display = 'none';
        e.target.textContent = 'Done';
      } else if (e.target.textContent === 'Done') {
        const input = taskItem.querySelector('.task-edit-input');
        const newValue = input.value.trim();
        taskTextElement.textContent = newValue;
        taskTextElement.style.display = '';
        taskItem.removeChild(input);
        e.target.textContent = 'Edit';

      // Update DB Local Storage
      const updatedTasksDB = tasksDB.map((task) => {
        if(task.id === taskId) {
          task.value = newValue;
        }

        return task;
      })

      localStorage.setItem('tasksDB', JSON.stringify(updatedTasksDB));        
      }



    }
  })
}

export { editTask}