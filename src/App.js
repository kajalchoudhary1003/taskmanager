import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

// const API_URL = "http://localhost:5001/tasks";
const API_URL = process.env.REACT_APP_BACKEND_URL + "tasks";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Task Manager
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            placeholder="Enter Task"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center p-3 border rounded-md bg-gray-50"
              >
                <span
                  className={`flex-1 ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                >
                  {task.title}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => completeTask(task._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No tasks available. Add a new task to get started!</p>
        )}
      </div>
    </div>
  );
}

export default App;
