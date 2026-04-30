import { tasks as mockTasks } from "./mockData";

const TASKS_KEY = "taskmanager_tasks";

export function getStoredTasks() {
  const stored = localStorage.getItem(TASKS_KEY);

  if (!stored) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(mockTasks));
    return mockTasks;
  }

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(TASKS_KEY, JSON.stringify(mockTasks));
    return mockTasks;
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function deleteTaskById(id) {
  const tasks = getStoredTasks();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  saveTasks(updatedTasks);
  return updatedTasks;
}

export function createTask(taskData) {
  const tasks = getStoredTasks();

  const newTask = {
    id: Date.now().toString(),
    title: taskData.title,
    description: taskData.description,
    category: taskData.category,
    priority: taskData.priority,
    status: taskData.status,
  };

  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);
  return newTask;
}

export function updateTask(id, taskData) {
  const tasks = getStoredTasks();

  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? {
          ...task,
          title: taskData.title,
          description: taskData.description,
          category: taskData.category,
          priority: taskData.priority,
          status: taskData.status,
        }
      : task
  );

  saveTasks(updatedTasks);
  return updatedTasks.find((task) => task.id === id);
}