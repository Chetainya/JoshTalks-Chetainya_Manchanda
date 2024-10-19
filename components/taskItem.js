import React, { useState } from "react";
import NewTask from "./newTask";
import Modal from "./modal";

function TaskItem({
  id,
  title,
  description,
  priority,
  deleteTask,
  updateTask,
  completed,
}) {
  const [editTask, setEditTask] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function startEdit() {
    setEditTask(true);
  }
  function FinishEdit() {
    setEditTask(false);
  }

  if (editTask) {
    return (
      <>
        {editTask && (
          <NewTask
            id={id}
            onDone={FinishEdit}
            updateTask={updateTask}
            title={title}
            description={description}
            priority={priority}
          />
        )}
      </>
    );
  }

  function deleteHandeler(){
    deleteTask(id);
    setIsDeleting(false);
  }
  return (
    <li>
      {isDeleting && <Modal onClose={() => setIsDeleting(false)}>
        <h3 className="red deleteModalText">Delte this Task? This Action Cannot be Undone</h3>
        <button className='button' onClick={deleteHandeler}>Delete</button>
        <button  className="button" onClick={() => setIsDeleting(false)}>Cancel</button>
        </Modal>}
      <article className="task-item">
        <header>
          <div>
            <h1>{title}</h1>
            <p className={`${getClassByPriority[priority]}`}>
              Priority : {priority.toUpperCase()}
            </p>
          </div>
          <p>{description}</p>
        </header>
        <div className="buttonContainer">
          <button className="negative" onClick={() => setIsDeleting(true)}>
            Delete
          </button>
          <button onClick={startEdit}>Edit</button>
          {!completed && (
            <button onClick={() => updateTask(id, { completed: true })}>
              Mark As Completed
            </button>
          )}
          {completed && <p className="green">Completed</p>}
        </div>
      </article>
    </li>
  );
}

export default TaskItem;

const getClassByPriority = {
  high: "red",
  medium: "yellow",
  low: "green",
};
