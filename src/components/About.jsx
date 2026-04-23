import React, { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const cards = document.querySelectorAll('.currently-card')
    function handleMove(e) {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--cx', ((e.clientX - rect.left) / rect.width * 100) + '%')
      card.style.setProperty('--cy', ((e.clientY - rect.top) / rect.height * 100) + '%')
    }
    cards.forEach(card => card.addEventListener('mousemove', handleMove))
    return () => cards.forEach(card => card.removeEventListener('mousemove', handleMove))
  }, [])

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-title">
          <span className="section-label">About</span>
          <h2>Building with <span className="gold-word">purpose</span></h2>
        </div>

        <div className="about-layout">
          <div className="about-intro fade-in">
            <p>I'm <span className="gold-em">Agwu</span> — a software engineer based in Nigeria. I design and build modern, responsive websites for businesses, brands, and ventures that want to present themselves well online.</p>
            <p>I care deeply about <span className="gold-em">clean interfaces</span>, thoughtful structure, and creating digital experiences that feel polished and intentional — not rushed or generic.</p>
          </div>

          <div className="about-why fade-in">
            <h3>Why I build</h3>
            <p>I got into technology because I believe it can genuinely transform how communities learn, communicate, and grow. I want to build tools and platforms that serve real people — especially in education, culture, and everyday commerce.</p>
            <p>I know I can't do it alone, but I want to be part of the solution. So I started building — and I found that I genuinely enjoy the craft of turning an idea into a working, beautiful interface.</p>
            <p>Every project I take on sharpens my skills and moves me closer to the larger vision: using technology to create meaningful, lasting impact.</p>
          </div>

          <div className="about-currently fade-in">
            <div className="currently-card">
              <h4>Currently Focused On</h4>
              <p>Building responsive, polished websites for businesses and brands. Deepening my frontend craft and expanding into broader product development.</p>
            </div>
            <div className="currently-card">
              <h4>Beyond the Code</h4>
              <p>When I'm not building, you'll find me watching or playing football, listening to music, reading, or gaming. I believe balance fuels better creative work.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}