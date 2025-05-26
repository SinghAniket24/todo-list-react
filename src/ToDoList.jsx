import React, { useState } from "react";

export default function ToDoList() {
  // Sample initial tasks with dates (YYYY-MM-DD format)
  const initialTasks = [
    { text: "Finish React assignment", completed: false, date: "2025-05-20" },
    { text: "Buy groceries", completed: true, date: "2025-05-22" },
    { text: "Call mom", completed: false, date: "2025-05-23" },
    { text: "Plan weekend trip", completed: false, date: "2025-05-25" },
    { text: "Read a new book", completed: false, date: "2025-05-26" },
  ];

  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(initialTasks);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!task.trim()) return;

    if (editIndex !== null) {
      // Update existing task text (keep old date)
      const updatedList = [...taskList];
      updatedList[editIndex].text = task.trim();
      setTaskList(updatedList);
      setEditIndex(null);
    } else {
      // Add new task with today's date
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      setTaskList([...taskList, { text: task.trim(), completed: false, date: today }]);
    }
    setTask("");
  };

  const toggleCompleted = (index) => {
    const updatedList = [...taskList];
    updatedList[index].completed = !updatedList[index].completed;
    setTaskList(updatedList);
  };

  const editTask = (index) => {
    setTask(taskList[index].text);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedList);
    if (editIndex === index) {
      setEditIndex(null);
      setTask("");
    }
  };

  const clearAll = () => {
    setTaskList([]);
    setEditIndex(null);
    setTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddOrUpdate();
    }
  };

  return (
    <>
      <div className="to-do-list" role="main" aria-label="To Do List Application">
        <h1>My To-Do List</h1>

        <section className="input-section">
          <input
            type="text"
            aria-label="Task input"
            placeholder="Enter new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleAddOrUpdate}
            className="add-button"
            aria-label={editIndex !== null ? "Update task" : "Add task"}
            disabled={!task.trim()}
            title={editIndex !== null ? "Update task" : "Add task"}
            type="button"
          >
            {editIndex !== null ? "✏️ Update" : "➕ Add"}
          </button>

          <button
            onClick={clearAll}
            className="clear-button"
            aria-label="Clear all tasks"
            title="Clear all tasks"
            type="button"
            disabled={taskList.length === 0}
          >
            🗑 Clear All
          </button>
        </section>

        {taskList.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>
            Your to-do list is empty. Add a task above!
          </p>
        ) : (
          <ol aria-live="polite" aria-relevant="additions removals" tabIndex={0}>
            {taskList.map(({ text, completed, date }, index) => (
              <li
                key={index}
                className={completed ? "completed" : ""}
                aria-checked={completed}
                role="checkbox"
                tabIndex={0}
                onClick={() => toggleCompleted(index)}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    toggleCompleted(index);
                  }
                }}
                title={completed ? "Mark as incomplete" : "Mark as completed"}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span className="text" style={{ flex: 1 }}>
                  {text}
                </span>

                <span
                  className="date"
                  style={{ marginLeft: "1rem", fontSize: "0.9rem", color: "#555" }}
                  aria-label={`Due date: ${date}`}
                >
                  📅 {date}
                </span>

                <div
                  className="button-group"
                  style={{ display: "flex", gap: "0.3rem", marginLeft: "1rem" }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      editTask(index);
                    }}
                    className="edit-button"
                    aria-label={`Edit task: ${text}`}
                    title="Edit task"
                    type="button"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(index);
                    }}
                    className="delete-button"
                    aria-label={`Delete task: ${text}`}
                    title="Delete task"
                    type="button"
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <footer className="footer" style={{ textAlign: "center", marginTop: "2rem", padding: "1rem 0", borderTop: "1px solid #ccc" }}>
        <p>© 2025 Aniket Singh. All rights reserved.</p>
        <p>Made using React</p>
      </footer>
    </>
  );
}
