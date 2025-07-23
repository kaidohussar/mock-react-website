import React from 'react'
import styles from './ProjectCard.module.scss'
import { Link } from 'react-router-dom'

interface ProjectCardProps {
  title: string;
  progress: number;
  teamAvatars: string[];
  lastUpdated: string;
  projectId: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, progress, teamAvatars, lastUpdated, projectId }) => {
  return (
    <Link to={`/project/${projectId}`} className={styles.projectCard}>
      <h3>{title}</h3>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.teamAvatars}>
        {teamAvatars.map((avatar, index) => (
          <span key={index} className={styles.avatar}>{avatar}</span>
        ))}
      </div>
      <div className={styles.lastUpdated}>Last updated: {lastUpdated}</div>
    </Link>
  )
}

export default ProjectCard
