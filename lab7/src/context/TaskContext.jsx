import React, { createContext, useState, useEffect, useCallback } from 'react';

// Створюємо контекст для передачі даних без використання props на кожному рівні
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Ініціалізуємо стан завдань з localStorage. 
  // Передаємо функцію в useState, щоб читання з localStorage відбувалося лише під час першого рендеру.
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  // Стан для теми додатку (світла/темна)
  const [theme, setTheme] = useState('light');

  // useEffect для синхронізації стану із локальним сховищем.
  // Цей код виконується щоразу, коли змінюється масив `tasks`.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Використовуємо useCallback для меморизації обробників подій.
  // Це запобігає перестворенню цих функцій при кожному рендері компонента TaskProvider.
  const addTask = useCallback((text) => {
    // Додаємо нове завдання з унікальним ID (Date.now())
    setTasks((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  }, []);

  const deleteTask = useCallback((id) => {
    // Відфільтровуємо масив, залишаючи всі завдання, крім того, що має переданий ID
    setTasks((prev) => prev.filter(task => task.id !== id));
  }, []);

  const toggleComplete = useCallback((id) => {
    // Змінюємо статус completed на протилежний для конкретного завдання
    setTasks((prev) => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const editTask = useCallback((id, newText) => {
    // Оновлюємо текст конкретного завдання
    setTasks((prev) => prev.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
  }, []);

  // Передаємо всі стани та функції у Provider, щоб дочірні компоненти мали до них доступ
  return (
    <TaskContext.Provider value={{ 
      tasks, theme, toggleTheme, addTask, deleteTask, toggleComplete, editTask 
    }}>
      {children}
    </TaskContext.Provider>
  );
};