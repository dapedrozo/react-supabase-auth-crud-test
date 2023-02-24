import React from "react";
import { useTasks } from '../context/TaskContext'

function TaskCard({ task }) {
    const { deleteTask, updateTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task.id)
  };
  const handleDone = () => {
    updateTask(task.id, {done:!task.done})
  };

  return (
    <div className="card card-body mb-2">
      <h1 className="h5">{task.name}</h1>
      <p>{task.done ? "Realizada ✅" : "No realizada ❌"}</p>
      <div className="ms-auto">
        <button className="btn btn-danger btn-sm me-1" onClick={() => handleDelete()}>delete</button>
        <button className="btn btn-secondary btn-sm " onClick={() => handleDone()}>done</button>
      </div>
    </div>
  );
}

export default TaskCard;
