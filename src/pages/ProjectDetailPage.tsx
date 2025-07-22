import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProjectHeader from '../components/ProjectHeader'
import TabbedNavigation from '../components/TabbedNavigation'
import TasksTabContent from '../components/TasksTabContent'
import Container from '../components/Container'

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState('tasks')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div>
      <ProjectHeader projectName={`Project ${id}`} />
      <Container>
        <TabbedNavigation onTabChange={handleTabChange} />
        {activeTab === 'tasks' && <TasksTabContent />}
        {activeTab === 'files' && <div>Files Content</div>}
        {activeTab === 'discussion' && <div>Discussion Content</div>}
      </Container>
    </div>
  )
}

export default ProjectDetailPage