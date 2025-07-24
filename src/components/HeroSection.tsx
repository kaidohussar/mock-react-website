import React from 'react'
import styles from './HeroSection.module.scss'
import { Image, Text, useManageLanguage } from '@contentstorage/react'

const HeroSection: React.FC = () => {
  const { languageCodes, currentLanguageCode, setLanguage } =
    useManageLanguage()
  console.log('currentLanguageCode', currentLanguageCode)
  return (
    <div className={styles.hero}>
      <h1>
        <Text contentId="App.Heading" />
      </h1>
      <Image width="200" contentId="App.kanghuru" />

      {languageCodes.map((code) => {
        return <button onClick={() => setLanguage(code)}>{code}</button>
      })}
      <h1>Where Great Work Happens, Together.</h1>
      <p>
        Stop juggling apps. ConnectSphere brings your team, tasks, and projects
        into one collaborative space. Simplify your workflow and deliver results
        faster.
      </p>
      <button>Get Started for Free</button>
      <div className={styles.socialProof}>
        <p>
          Trusted by over 10,000 teams at companies like Innovate Inc. &
          FutureTech
        </p>
      </div>
    </div>
  )
}

export default HeroSection
