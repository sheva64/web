import React from 'react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  // Визначення кольору рамки залежно від типу завдання
  const borderColor = task.type === 'bug' ? 'red' : 'green';

  return (
    <div style={{ border: `2px solid ${borderColor}`, padding: '10px', borderRadius: '8px' }}>
      <h3>{task.title}</h3>
      <p>Статус: {task.status}</p>
      
      {/* TypeScript автоматично звужує тип. Ми не можемо викликати severity у Feature*/}
      {task.type === 'bug' ? (
        <p>Критичність: {task.severity}</p>
      ) : (
        <>
          <p>Пріоритет: {task.priority}</p>
          {task.expectedRelease && <p>Очікуваний реліз: {task.expectedRelease}</p>}
        </>
      )}
    </div>
  );
};

export default TaskCard;