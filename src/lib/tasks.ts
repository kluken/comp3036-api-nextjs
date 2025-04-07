export interface Task {
  id: number;
  description: string;
  completed: boolean;
}

let tasks: Task[] = [
  { id: 1, description: "Complete the project report", completed: false },
  { id: 2, description: "Clean the house", completed: true },
];

export function getTasks(): Task[] {
  return tasks;
}

export function getTask(id: number): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function createTask(
  description: string,
  completed: boolean = false
): Task {
  const newTask: Task = {
    id: tasks.length + 1,
    description,
    completed,
  };
  tasks.push(newTask);
  return newTask;
}

export function updateTask(
  id: number,
  description: string,
  completed: boolean
): Task | undefined {
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex !== -1) {
    const updatedTask: Task = { id, description, completed };
    tasks[taskIndex] = updatedTask;
    return updatedTask;
  }
  return undefined;
}

export function deleteTask(id: number): boolean {
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
}
