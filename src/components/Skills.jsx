import React, { useEffect } from 'react'

export default function Skills() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice || prefersReducedMotion) return

    const cards = document.querySelectorAll('.skill-card')

    function onMouseMove(e) {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const percentX = (e.clientX - centerX) / (rect.width / 2)
      const percentY = (e.clientY - centerY) / (rect.height / 2)
      const rotateX = percentY * -6
      const rotateY = percentX * 6
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) translateY(-8px)`
      const shadowX = percentX * -15
      const shadowY = percentY * -15
      card.style.boxShadow = `${shadowX}px ${shadowY + 25}px 50px rgba(0,0,0,0.45), 0 0 40px rgba(212,175,55,0.06)`
      const localX = ((e.clientX - rect.left) / rect.width * 100)
      const localY = ((e.clientY - rect.top) / rect.height * 100)
      card.style.setProperty('--mouse-x', localX + '%')
      card.style.setProperty('--mouse-y', localY + '%')
    }

    function onMouseLeave(e) {
      const card = e.currentTarget
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0) translateY(0)'
      card.style.boxShadow = ''
      card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.5s ease'
      setTimeout(() => { card.style.transition = '' }, 500)
    }

    function onMouseEnter(e) {
      e.currentTarget.style.transition = 'none'
    }

    cards.forEach(card => {
      card.addEventListener('mousemove', onMouseMove)
      card.addEventListener('mouseleave', onMouseLeave)
      card.addEventListener('mouseenter', onMouseEnter)
    })

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', onMouseMove)
        card.removeEventListener('mouseleave', onMouseLeave)
        card.removeEventListener('mouseenter', onMouseEnter)
      })
    }
  }, [])

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-title">
          <span className="section-label">Capabilities</span>
          <h2>What I <span className="gold-word">build</span> with</h2>
        </div>

        <div className="skills-grid">
          <div className="skill-card-wrapper">
            <div className="skill-card fade-in">
              <div className="skill-icon"><i className="fas fa-code" aria-hidden="true" /></div>
              <h3>Frontend Development</h3>
              <p>I write clean, semantic markup and build responsive interfaces that look sharp on every device — from phones to wide screens.</p>
              <div className="skill-tags">
                <span className="skill-tag">HTML</span>
                <span className="skill-tag">CSS</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">React</span>
              </div>
            </div>
          </div>

          <div className="skill-card-wrapper">
            <div className="skill-card fade-in fade-in-delay-1">
              <div className="skill-icon"><i className="fas fa-palette" aria-hidden="true" /></div>
              <h3>UI & Visual Design</h3>
              <p>I design with a focus on polish, readability, and brand consistency. Every color, spacing choice, and animation is intentional.</p>
              <div className="skill-tags">
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">Responsive Design</span>
                <span className="skill-tag">UI Polish</span>
              </div>
            </div>
          </div>

          <div className="skill-card-wrapper">
            <div className="skill-card fade-in fade-in-delay-2">
              <div className="skill-icon"><i className="fas fa-server" aria-hidden="true" /></div>
              <h3>Backend Fundamentals</h3>
              <p>I understand server-side basics — connecting databases, handling authentication, and building API routes. Growing into full-stack capability.</p>
              <div className="skill-tags">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">REST APIs</span>
                <span className="skill-tag">Auth</span>
              </div>
            </div>
          </div>

          <div className="skill-card-wrapper">
            <div className="skill-card fade-in">
              <div className="skill-icon"><i className="fas fa-rocket" aria-hidden="true" /></div>
              <h3>Deployment & Workflow</h3>
              <p>I ship fast. Projects go live on modern hosting, with Git version control and focus on performance and SEO basics.</p>
              <div className="skill-tags">
                <span className="skill-tag">Vercel</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">SEO</span>
              </div>
            </div>
          </div>

          <div className="skill-card-wrapper">
            <div className="skill-card fade-in fade-in-delay-1">
              <div className="skill-icon"><i className="fas fa-cogs" aria-hidden="true" /></div>
              <h3>Problem Solving</h3>
              <p>I enjoy thinking through challenges — understanding what a business needs, then shaping the right structure, layout, and flow to serve it.</p>
              <div className="skill-tags">
                <span className="skill-tag">Iterative Building</span>
                <span className="skill-tag">Research</span>
              </div>
            </div>
          </div>

          <div className="skill-card-wrapper">
            <div className="skill-card fade-in fade-in-delay-2">
              <div className="skill-icon"><i className="fas fa-seedling" aria-hidden="true" /></div>
              <h3>Currently Exploring</h3>
              <p>Expanding my toolkit into AI-powered automation workflows. Learning n8n to build smarter systems that go beyond the browser.</p>
              <div className="skill-tags">
                <span className="skill-tag">n8n</span>
                <span className="skill-tag">AI Automation</span>
                <span className="skill-tag">Growing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}