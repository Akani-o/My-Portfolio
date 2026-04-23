import React from 'react'
import Background from '../components/Background'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Process from '../components/Process'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link" style={{ position: 'absolute', top: '-100%' }}>Skip to main content</a>
      <Background variant="home" />
      <Navbar />
      <Hero />
      <main id="main-content">
        <About />
        <Skills />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  )
}