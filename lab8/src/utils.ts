import type { Task, Bug } from './types';

// Утиліта для пошуку за назвою
export function filterTasks(tasks: Task[], query: string): Task[] {
  return tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
}

// Type Guard для визначення чи є баг критичним
export function isHighPriorityBug(task: Task): task is Bug {
  return task.type === 'bug' && task.severity === 'critical';
}