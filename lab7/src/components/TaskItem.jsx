import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

// Деструктуризація пропсів ({ task }) та значення за замовчуванням
const TaskItem = ({ task = { id: 0, text: 'Порожнє завдання', completed: false } }) => {
  const { deleteTask, toggleComplete, editTask } = useContext(TaskContext);
  
  // Локальні стани для режиму редагування
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  // Функція для збереження відредагованого тексту
  const handleEditSubmit = () => {
    if (editText.trim()) {
      editTask(task.id, editText);
      setIsEditing(false); // Вимикаємо режим редагування після збереження
    }
  };

  return (
    // Динамічно додаємо клас 'completed', якщо завдання виконано
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => toggleComplete(task.id)} 
      />
      
      {/* Умовний рендеринг: показуємо інпут, якщо редагуємо, інакше - текст */}
      {isEditing ? (
        <>
          <input 
            value={editText} 
            onChange={(e) => setEditText(e.target.value)} 
            autoFocus // Автоматичний фокус при увімкненні режиму редагування
          />
          <button onClick={handleEditSubmit}>Зберегти</button>
        </>
      ) : (
        <>
          <span className="task-text">{task.text}</span>
          <button onClick={() => setIsEditing(true)}>Редагувати</button>
        </>
      )}
      
      <button onClick={() => deleteTask(task.id)}>Видалити</button>
    </li>
  );
};

export default TaskItem;