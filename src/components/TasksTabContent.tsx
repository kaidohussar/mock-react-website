import React from 'react'
import styles from './TasksTabContent.module.scss'
import TaskCard from './TaskCard'

const TasksTabContent: React.FC = () => {
  return (
    <div className={styles.kanbanBoard}>
      <div className={styles.kanbanColumn}>
        <h3>To Do</h3>
        <TaskCard title="Draft blog post about new feature" assignedTo="John Doe" dueDate="2025-08-01" priority="High" />
        <TaskCard title="Research competitor strategies" assignedTo="Jane Smith" dueDate="2025-07-28" priority="Medium" />
        <button>+ Add Task</button>
      </div>
      <div className={styles.kanbanColumn}>
        <h3>In Progress</h3>
        <TaskCard title="Design new logo mockups" assignedTo="Sarah Lee" dueDate="2025-07-25" priority="High" />
        <TaskCard title="Develop user authentication" assignedTo="Mike Ross" dueDate="2025-08-10" priority="High" />
        <button>+ Add Task</button>
      </div>
      <div className={styles.kanbanColumn}>
        <h3>Done</h3>
        <TaskCard title="Set up project repository" assignedTo="You" dueDate="2025-07-20" priority="Low" />
        <TaskCard title="Initial project planning" assignedTo="Team" dueDate="2025-07-18" priority="Low" />
        <button>+ Add Task</button>
      </div>
    </div>
  )
}

export default TasksTabContent
