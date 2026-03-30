import React from 'react';

// Приймаємо поточний фільтр та функцію для його оновлення через props
const TaskFilter = ({ currentFilter, setFilter }) => {
  // Масив з конфігурацією кнопок для зручного рендерингу
  const buttons = [
    { value: 'all', label: 'Всі' },
    { value: 'active', label: 'Активні' },
    { value: 'completed', label: 'Виконані' }
  ];

  return (
    <div className="task-filter">
      {buttons.map((btn) => (
        <button
          // Унікальний ключ для списку
          key={btn.value}
          onClick={() => setFilter(btn.value)}
          // Якщо значення кнопки збігається з поточним фільтром, додаємо клас 'active'
          className={`filter-btn ${currentFilter === btn.value ? 'active' : ''}`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;