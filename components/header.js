"use client";

import React, { useState } from 'react'
import NewTask from './newTask';

function Header({addTask }) {
    const [isCreatingNewTask, setIsCreatingNewTask] = useState(false);


    function handleStartAddNewChallenge() {
        setIsCreatingNewTask(true);
      }
    
      function handleDone() {
        setIsCreatingNewTask(false);
      }

  return (
    <>
     {isCreatingNewTask && <NewTask addTask={addTask}  onDone={handleDone} />}
      <header id="main-header">
        <h1>Your Tasks</h1>
        <button className="button"  onClick={handleStartAddNewChallenge} >
          Add Task
        </button>
      </header>
    </>
  )
}

export default Header
