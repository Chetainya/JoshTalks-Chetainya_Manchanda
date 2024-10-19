import React from 'react'
import TaskItem from './taskItem'

function TaskList({sortedTasks , deleteTask , updateTask}) {
  return (
    <ul>
      {sortedTasks.map(task => <TaskItem key={task.id} updateTask={updateTask} {...task} deleteTask={deleteTask} />)}
    </ul>
  )
}

export default TaskList
