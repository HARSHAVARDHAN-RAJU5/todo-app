import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ message: "Task required" });
  tasks.push(task);
  res.json({ message: "Task added", tasks });
});

app.delete("/tasks/:index", (req, res) => {
  const index = parseInt(req.params.index);
  tasks.splice(index, 1);
  res.json({ message: "Task deleted", tasks });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
