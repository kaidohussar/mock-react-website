import React from 'react'
import styles from './ProjectsSection.module.scss'
import ProjectCard from './ProjectCard'

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      id: '1',
      title: 'Q3 Marketing Campaign',
      progress: 75,
      teamAvatars: ['JS', 'AS', 'LM'],
      lastUpdated: '2 days ago',
    },
    {
      id: '2',
      title: 'Website Redesign',
      progress: 50,
      teamAvatars: ['JD', 'SM'],
      lastUpdated: '1 week ago',
    },
    {
      id: '3',
      title: 'Mobile App Development',
      progress: 90,
      teamAvatars: ['AK', 'BP', 'CR'],
      lastUpdated: '3 hours ago',
    },
  ]

  return (
    <div className={styles.projectsSection}>
      <h2>My Projects</h2>
      <div className={styles.projectGrid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            progress={project.progress}
            teamAvatars={project.teamAvatars}
            lastUpdated={project.lastUpdated}
            projectId={project.id}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectsSection
