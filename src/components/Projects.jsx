import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Projects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice || prefersReducedMotion) return

    const cards = document.querySelectorAll('.tilt-card')

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
    }
    function onMouseLeave(e) {
      const card = e.currentTarget
      card.style.transform = ''
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

  const projectData = [
    {
      image: '/vault/kanloperenterprises.vercel.app.jpeg',
      alt: 'Kanloper Enterprises — import company website',
      badge: 'Import Company',
      name: 'Kanloper Enterprises',
      description: 'Professional website for an import company specializing in materials from India, China, Turkey, and more. Complete with logistics info, inventory showcase, and contact.',
      tech: ['React', 'Tailwind', 'Vite'],
      url: 'https://kanloperenterprises.com.ng'
    },
    {
      image: '/vault/bigtouch.png',
      alt: 'Big Touch Services — creative design agency website',
      badge: 'Creative Brand',
      name: 'Big Touch Services',
      description: 'A creative brand that handles Graphic Design, Motion Design, Branding, Brand Photography, Web Design and UI/UX Design.',
      tech: ['React', 'Node.js'],
      url: 'https://bigtouch.vercel.app/'
    },
    {
      image: '/vault/bamiras.png',
      alt: 'Bamiras Healthcare Services — genetic laboratory logistics',
      badge: 'Healthcare',
      name: 'Bamiras Healthcare Services',
      description: 'Expert genetic laboratory logistics — from sample collection to accurate results — connecting patients, hospitals, and diagnostic labs across Port Harcourt and Nigeria.',
      tech: ['React', 'Node.js'],
      url: 'https://bamiras.vercel.app/'
    }
  ]

  function handleImgError(e, name) {
    e.target.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#111;color:#D4AF37;font-size:0.9rem;text-align:center;padding:2rem"><span>${name}<br><small style="color:#666">Screenshot coming soon</small></span></div>`
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-title">
          <span className="section-label">Portfolio</span>
          <h2>Featured <span className="gold-word">work</span></h2>
        </div>

        <div className="projects-grid">
          {projectData.map((project, index) => (
            <div className="project-card-wrapper" key={project.name}>
              <div className={`project-card tilt-card fade-in${index === 1 ? ' fade-in-delay-1' : index === 2 ? ' fade-in-delay-2' : ''}`}>
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="project-img"
                    loading="lazy"
                    onError={(e) => handleImgError(e, project.name)}
                  />
                  <span className="project-badge">{project.badge}</span>
                </div>
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map(t => (
                      <span className="tech-tag" key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a
                      href={project.url}
                      className="btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt" aria-hidden="true" /> View Live
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="vault-cta fade-in">
          <Link to="/vault" className="btn-vault">
            <i className="fas fa-th-large" aria-hidden="true" /> View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}