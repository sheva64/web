import React, { useContext, useState, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';

const TaskList = () => {
  const { tasks } = useContext(TaskContext);
  
  // Локальний стан для поточного обраного фільтра
  const [filter, setFilter] = useState('all');

  // Використовуємо useMemo для обчислення відфільтрованого списку.
  // Цей код виконається знову тільки якщо зміняться масив tasks або значення filter.
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // useMemo для підрахунку завдань, що залишилися.
  const activeCount = useMemo(() => {
    return tasks.filter(task => !task.completed).length;
  }, [tasks]);

  return (
    <div>
      {/* Передаємо стан фільтра та функцію його зміни у дочірній компонент */}
      <TaskFilter currentFilter={filter} setFilter={setFilter} />
      
      <p className="tasks-remaining">
        Залишилось виконати: {activeCount}
      </p>

      {/* Якщо після фільтрації завдань немає, показуємо повідомлення */}
      {filteredTasks.length === 0 ? (
        <p>Завдань у цій категорії немає.</p>
      ) : (
        <ul className="task-list">
          {/* Використання унікального key при методі map */}
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;