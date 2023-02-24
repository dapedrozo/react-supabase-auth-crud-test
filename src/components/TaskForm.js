import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm() {
  const [name, setName] = useState("");

  const { createTask, adding } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <input
        type="text"
        name="taskName"
        placeholder="escribe un nombre de tarea"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="form-control mb-2"
      />
      <div className="ms-auto">
        <button disabled={adding} className="btn btn-primary btn-sm">
          {adding ? "Añadiendo..." : "Añadir"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
