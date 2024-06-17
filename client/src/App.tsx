import React, { useState, useEffect } from 'react';
import TaskList from './components/ToDo-List/TaskList';
import FilterTasks from './components/ToDo-List/FilterTasks';
import TaskActions from './components/ToDo-List/TaskActions';
import AddTaskModal from './components/ToDo-List/AddTaskModal';
import './App.css';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://localhost:8080/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  const handleTaskUpdate = () => {
    axios.get('http://localhost:8080/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Quản lý công việc</h1>
      <button className="add-task-button" onClick={() => setIsAddTaskModalOpen(true)}>Thêm công việc</button>
      <FilterTasks onFilterChange={handleFilterChange} />
      <TaskList tasks={filteredTasks} onTaskUpdate={handleTaskUpdate} />
      <TaskActions onClearCompleted={handleClearCompleted} onClearAll={handleClearAll} />
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onRequestClose={() => setIsAddTaskModalOpen(false)}
        tasks={tasks}
        onTaskAdded={handleAddTask}
      />
    </div>
  );
};

export default App;
