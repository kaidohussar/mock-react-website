import React from 'react'
import styles from './TaskCard.module.scss'

interface TaskCardProps {
  title: string;
  assignedTo: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
}

const TaskCard: React.FC<TaskCardProps> = ({ title, assignedTo, dueDate, priority }) => {
  return (
    <div className={styles.taskCard}>
      <h4>{title}</h4>
      <div className={styles.details}>
        <span className={styles.assignedTo}>{assignedTo}</span>
        <span className={styles.dueDate}>{dueDate}</span>
        <span className={`${styles.priority} ${styles[priority.toLowerCase()]}`}>{priority}</span>
      </div>
    </div>
  )
}

export default TaskCard
