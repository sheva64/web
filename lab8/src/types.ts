// Обидва типи мають спільні поля: id, title, та status 
export type Status = 'todo' | 'in-progress' | 'done';

export type Bug = {
  type: 'bug'; // Поле для дискримінованого об'єднання
  id: string | number;
  title: string;
  status: Status;
  severity: 'low' | 'high' | 'critical'; // Специфічне поле для Bug
};

export type Feature = {
  type: 'feature'; // Поле для дискримінованого об'єднання
  id: string | number;
  title: string;
  status: Status;
  expectedRelease?: string; // Опціональне поле
  priority: number;         // Специфічне поле для Feature
};

// Discriminated Union
export type Task = Bug | Feature;