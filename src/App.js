import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    const response = await axios.post(API_URL, { title: newTask });
    setTasks([...tasks, response.data]);
    setNewTask("");
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const completeTask = async (id) => {
    const response = await axios.patch(`${API_URL}/${id}/complete`);
    setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
  };
  return (
    <div>
      <h2 className="text-4xl font-sans font-medium">Task Manager</h2>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        type="text"
        placeholder="Enter Task"
        className="border-2 border-gray-300 p-2 rounded-lg font-sans outline-none"
      />

      <button onClick={addTask}>Add</button>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
              <button onClick={() => completeTask(task._id)}>Complete</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available. Add a new task to get started!</p>
      )}
    </div>
  );
}

export default App;
