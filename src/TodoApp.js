import React, { useState } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    status: 'Incomplete',
  });
  const [statusFilter, setStatusFilter] = useState('All');
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const addTask = () => {
    if (editIndex !== null) {
      // If editing, update the task at the editIndex
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[editIndex] = newTask;
        return updatedTasks;
      });
      setEditIndex(null);
    } else {
      // If not editing, add a new task
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    // Reset the newTask state
    setNewTask({
      name: '',
      description: '',
      status: 'Incomplete',
    });
  };

  const updateTaskStatus = (index, newStatus) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].status = newStatus;
      return updatedTasks;
    });
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  const editTask = (index) => {
    setEditIndex(index);
    setNewTask(tasks[index]);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setNewTask({
      name: '',
      description: '',
      status: 'Incomplete',
    });
  };

  const filterTasks = () => {
    if (statusFilter === 'All') {
      return tasks;
    } else {
      return tasks.filter((task) => task.status === statusFilter);
    }
  };

  return (
    <div className="todo-container">
      <h1>Todo App</h1>

      {/* Form to create a new task */}
      <div className="todo-form">
        <label>Task Name:</label>
        <input
          type="text"
          name="name"
          value={newTask.name}
          onChange={handleInputChange}
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>
          {editIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
        {editIndex !== null && <button onClick={cancelEdit}>Cancel</button>}
      </div>

      {/* Display the list of tasks */}
      <div style={{ display: 'flex' }}>
        <ul className="todo-list">
          {filterTasks().map((task, index) => (
            <li key={index} className="todo-list-item">
              <div>
                <strong>{task.name}</strong> - {task.description} -{' '}
                <span>Status: {task.status}</span>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(index, e.target.value)}
                >
                  <option value="Incomplete">Incomplete</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
              <div>
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

        {/* Status filter dropdown */}
        <div className="status-filter">
          <label>Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Incomplete">Incomplete</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
