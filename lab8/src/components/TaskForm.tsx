import React, { useState, useRef, useEffect } from 'react';
import type { Task, Status } from '../types';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskMode, setTaskMode] = useState<'bug' | 'feature'>('bug');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<Status>('todo');
  
  const [severity, setSeverity] = useState<'low' | 'high' | 'critical'>('low');
  const [priority, setPriority] = useState<number>(1);
  const [expectedRelease, setExpectedRelease] = useState('');
  
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, [taskMode]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    const baseTask = {
      id: Date.now(),
      title,
      status,
    };

    let newTask: Task;
    if (taskMode === 'bug') {
      newTask = { ...baseTask, type: 'bug', severity };
    } else {
      newTask = { 
        ...baseTask, 
        type: 'feature', 
        priority, 
        expectedRelease: expectedRelease || undefined 
      };
    }

    onAddTask(newTask);
    
    // Очищення
    setTitle('');
    setStatus('todo'); 
    setSeverity('low');
    setPriority(1);
    setExpectedRelease('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <div>
        <label>Тип завдання: </label>
        <select value={taskMode} onChange={(e) => setTaskMode(e.target.value as 'bug' | 'feature')}>
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
        </select>
      </div>

      <div>
        <label>Статус: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      
      <div>
        <label>Назва: </label>
        <input 
          ref={titleInputRef}
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {taskMode === 'bug' ? (
        <div>
          <label>Критичність: </label>
          <select value={severity} onChange={(e) => setSeverity(e.target.value as any)}>
            <option value="low">Low</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      ) : (
        <>
          <div>
            <label>Пріоритет: </label>
            <input type="number" value={priority} onChange={(e) => setPriority(Number(e.target.value))} min="1" />
          </div>
          <div>
            <label>Реліз: </label>
            <input type="text" value={expectedRelease} onChange={(e) => setExpectedRelease(e.target.value)} placeholder="напр. v1.0" />
          </div>
        </>
      )}

      <button type="submit" style={{ alignSelf: 'flex-start', padding: '5px 15px' }}>Додати завдання</button>
    </form>
  );
};

export default TaskForm;