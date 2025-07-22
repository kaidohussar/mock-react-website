import React from 'react'
import styles from './HeroSection.module.scss'

const HeroSection: React.FC = () => {
  return (
    <div className={styles.hero}>
      <h1>Where Great Work Happens, Together.</h1>
      <p>Stop juggling apps. ConnectSphere brings your team, tasks, and projects into one collaborative space. Simplify your workflow and deliver results faster.</p>
      <button>Get Started for Free</button>
      <div className={styles.socialProof}>
        <p>Trusted by over 10,000 teams at companies like Innovate Inc. & FutureTech</p>
      </div>
    </div>
  )
}

export default HeroSection
