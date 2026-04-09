import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ParticleBackground from './components/ParticleBackground'
import Stats from './components/Stats'
import Problem from './components/Problem'
import Solution from './components/Solution'
import HowItWorks from './components/HowItWorks'
import Science from './components/Science'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  const [isActive, setIsActive] = useState(false)

  return (
    <>
      <ParticleBackground />
      <Navbar />
      <Hero isActive={isActive} onToggle={() => setIsActive(prev => !prev)} />
      <Stats />
      <div className="divider" />
      <Problem />
      <div className="divider" />
      <Solution />
      <div className="divider" />
      <HowItWorks />
      <div className="divider" />
      <Science />
      <div className="divider" />
      <Pricing />
      <div className="divider" />
      <FAQ />
      <div className="divider" />
      <Footer />
    </>
  )
}
