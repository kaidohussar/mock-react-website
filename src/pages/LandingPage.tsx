import React from 'react'
import NavigationBar from '../components/NavigationBar'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import FinalCTASection from '../components/FinalCTASection'
import Container from '../components/Container'

const LandingPage: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <Container>
        <HeroSection />
        <FeaturesSection />
        <FinalCTASection />
      </Container>
    </div>
  )
}

export default LandingPage