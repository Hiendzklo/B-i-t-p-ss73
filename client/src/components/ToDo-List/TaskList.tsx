import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdate }) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} tasks={tasks} onTaskUpdate={onTaskUpdate} />
      ))}
    </div>
  );
};

export default TaskList;
