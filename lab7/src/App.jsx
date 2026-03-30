import React, { useContext } from 'react';
import { TaskProvider, TaskContext } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css'; // Імпорт глобальних стилів

// Внутрішній компонент, який має доступ до TaskContext
const AppContainer = () => {
  const { theme, toggleTheme } = useContext(TaskContext);

  return (
    // Динамічно підставляємо клас для теми (theme-light або theme-dark)
    <div className={`app-container theme-${theme}`}>
      <header className="app-header">
        <h1>Менеджер завдань</h1>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? 'Темна тема' : 'Світла тема'}
        </button>
      </header>
      
      <main className="main-content">
        {/* Підключаємо форму та список завдань */}
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
};

// Головний компонент App, який обгортає додаток у TaskProvider
function App() {
  return (
    <TaskProvider>
      <AppContainer />
    </TaskProvider>
  );
}

export default App;