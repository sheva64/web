import React, { useState, useRef, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskForm = () => {
  // useState для управління локальним станом інпуту
  const [inputValue, setInputValue] = useState('');
  
  // useRef для зберігання посилання на DOM-елемент інпуту
  const inputRef = useRef(null);
  
  // Отримуємо функцію додавання завдання з глобального контексту
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault(); // Запобігаємо перезавантаженню сторінки при сабміті форми
    
    if (inputValue.trim()) {
      addTask(inputValue);
      setInputValue(''); // Очищаємо поле вводу
      
      // Фокусуємось на інпуті після додавання нового завдання
      inputRef.current.focus(); 
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="task-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef} // Прив'язуємо ref до елемента
        placeholder="Що потрібно зробити?"
      />
      <button className="task-submit-btn" type="submit">Додати</button>
    </form>
  );
};

export default TaskForm;