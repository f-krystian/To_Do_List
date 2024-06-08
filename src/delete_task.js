const deleteTask = function () {
  console.log(`Delete`);
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const taskItem = e.target.closest('.task-item');
      const taskId = parseInt(taskItem.dataset.id, 10);
      let tasksDB = JSON.parse(localStorage.getItem('tasksDB')) || [];

      //UpdateDB
      tasksDB = tasksDB.filter((task) => task.id !== taskId)

      //Update LocalStorage
      localStorage.setItem('tasksDB', JSON.stringify(tasksDB));

      //Remove task from DOM
      taskItem.remove();
    }
  })
}

export { deleteTask }

