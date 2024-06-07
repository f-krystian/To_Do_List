import { addNewTask } from "./src/new_task.js";
import { displayTasks } from "./src/display_tasks.js";

document.addEventListener('DOMContentLoaded', () => {
  addNewTask();
  displayTasks();
})