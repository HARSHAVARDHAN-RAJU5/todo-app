import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const addTask = async () => {
    if (input.trim() === "") return;
  
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: input }),
    });

    const data = await res.json();
    setTasks(data.tasks);
    setInput("");
  };


  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
        setTasks(data.tasks);
        setInput("");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
  };


  return (
    <div className="app">
      <h1>My To-Do List</h1>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
