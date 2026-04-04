import React, { useState } from 'react';
import type { Task } from '../types';
import List from './List';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { filterTasks, isHighPriorityBug } from '../utils';

const TaskBoard: React.FC = () => {
  // Ініціалізація стану масивом об'єднаного типу Task
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // Стан для пошуку

  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  // Використовуємо утиліту для фільтрації
  const filteredTasks = filterTasks(tasks, searchQuery);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Менеджер Завдань</h2>
      
      <TaskForm onAddTask={handleAddTask} />
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Пошук завдань" 
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
      </div>

      <List 
        items={filteredTasks} 
        renderItem={(task) => {
          // Використання Type Guard для підсвічування завдань
          const isHot = isHighPriorityBug(task);
          return (
            <div style={{ backgroundColor: isHot ? '#ffcccc' : 'transparent', marginBottom: '10px' }}>
              <TaskCard task={task} />
            </div>
          );
        }} 
      />
    </div>
  );
};

export default TaskBoard;