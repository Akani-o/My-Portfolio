import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Background from '../components/Background'

const PROJECTS = [
  {
    name: 'Kanloper Enterprises',
    category: 'business',
    categoryLabel: 'Business',
    description: 'Professional website for an import company specializing in materials from India, China, Turkey, Pakistan, Bangladesh, and Australia.',
    tech: ['React', 'Tailwind', 'Vite'],
    url: 'https://kanloperenterprises.com.ng/',
    image: '/vault/kanloperenterprises.vercel.app.jpeg',
    badge: 'Import Company'
  },
  {
    name: 'Big Touch Services',
    category: 'business',
    categoryLabel: 'Business',
    description: 'A creative brand that handles Graphic Design, Motion Design, Branding, Brand Photography, Web Design and UI/UX Design.',
    tech: ['React', 'Node.js'],
    url: 'https://bigtouch.vercel.app/',
    image: '/vault/bigtouch.png',
    badge: 'Creative Brand'
  },
  {
    name: 'Bamiras Healthcare Services',
    category: 'healthcare',
    categoryLabel: 'Healthcare',
    description: 'Expert genetic laboratory logistics — from sample collection to accurate results — connecting patients, hospitals, and diagnostic labs across Port Harcourt and Nigeria.',
    tech: ['React', 'Node.js'],
    url: 'https://bamiras.vercel.app/',
    image: '/vault/bamiras.png',
    badge: 'Healthcare'
  },
  {
    name: 'Classic Cuts',
    category: 'business',
    categoryLabel: 'Business',
    description: 'Community barbershop website with barber profiles, service listings, gallery, and appointment booking.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Tailwind'],
    url: 'https://classiccutss.vercel.app/',
    image: '/vault/classiccutss.vercel.app.jpeg',
    badge: 'Brand Website'
  },
  {
    name: 'Bistro Italiano',
    category: 'food',
    categoryLabel: 'Food & Bakery',
    description: 'Modern restaurant website with menu, reservation flow, photo gallery, and a warm, appetizing design.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Tailwind'],
    url: 'https://bistroitaliano.vercel.app/',
    image: '/vault/bistroitaliano.vercel.app.jpeg',
    badge: 'Restaurant'
  },
  {
    name: 'Law Visuals',
    category: 'business',
    categoryLabel: 'Business',
    description: 'Law Visuals is a video production crew that makes things look professional and cinematic.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://lawvisuals.vercel.app/',
    image: '/vault/lawvisuals.vercel.app.jpeg',
    badge: 'Creative Studio'
  },
  {
    name: 'STITCH ELEGANTO',
    category: 'fashion',
    categoryLabel: 'Fashion',
    description: 'Elegant tailoring and bespoke fashion portfolio — showcasing services, process, portfolio work, and client testimonials.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://stitcheleganto.vercel.app/',
    image: '/vault/stitcheleganto.vercel.app.jpeg',
    badge: 'Fashion'
  },
  {
    name: 'Sweebtzy',
    category: 'food',
    categoryLabel: 'Food & Bakery',
    description: 'Bakery website featuring services, signature creations, customer reviews, FAQ, and ordering.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://sweebtzy.vercel.app/',
    image: '/vault/sweebtzy.vercel.app.jpeg',
    badge: 'Bakery'
  },
  {
    name: 'Daily Mart',
    category: 'retail',
    categoryLabel: 'Retail',
    description: 'Local grocery store website with shop listings, weekly specials, about page, and contact.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://dailymart-kappa.vercel.app/',
    image: '/vault/dailymart-kappa.vercel.app.jpeg',
    badge: 'Retail'
  },
  {
    name: 'Peak Fitness',
    category: 'fitness',
    categoryLabel: 'Fitness',
    description: 'Gym website with class schedules, trainer profiles, membership tiers, amenities showcase, and gallery.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://peakfitnesss.vercel.app/',
    image: '/vault/peakfitnesss.vercel.app.jpeg',
    badge: 'Fitness'
  },
  {
    name: 'Shally Wardrobe',
    category: 'fashion',
    categoryLabel: 'Fashion',
    description: 'Fashion designer portfolio showcasing collections, services, and brand story with smooth transitions.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://shally-mu.vercel.app/',
    image: '/vault/shally-mu.vercel.app.jpeg',
    badge: 'Fashion'
  },
  {
    name: 'Elara Fashion',
    category: 'fashion',
    categoryLabel: 'Fashion',
    description: "Women's fashion website with modern collections, about section, and clean visual storytelling.",
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://elaraa.name.ng/',
    image: '/vault/elara-mocha.vercel.app.jpeg',
    badge: 'Fashion'
  }
]

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'business', label: 'Business' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'food', label: 'Food & Bakery' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'retail', label: 'Retail' }
]

function ArchiveCard({ project, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice || prefersReducedMotion || !cardRef.current) return

    const card = cardRef.current

    function onMouseMove(e) {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const px = (e.clientX - cx) / (rect.width / 2)
      const py = (e.clientY - cy) / (rect.height / 2)
      const rx = py * -5
      const ry = px * 5
      const sx = px * -12
      const sy = py * -12
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px) translateY(-8px)`
      card.style.boxShadow = `${sx}px ${sy + 25}px 50px rgba(0,0,0,0.4), 0 0 35px rgba(212,175,55,0.05)`
      card.style.transition = 'none'
    }

    function onMouseLeave() {
      card.style.transform = ''
      card.style.boxShadow = ''
      card.style.transition = 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)'
    }

    card.addEventListener('mousemove', onMouseMove)
    card.addEventListener('mouseleave', onMouseLeave)

    return () => {
      card.removeEventListener('mousemove', onMouseMove)
      card.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  function handleImgError(e) {
    e.target.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#111;color:#D4AF37;font-size:0.85rem;text-align:center;padding:1.5rem"><span>${project.name}<br><small style="color:#666">Screenshot coming soon</small></span></div>`
  }

  return (
    <div className="archive-card-wrapper">
      <div
        className="archive-card fade-in"
        ref={cardRef}
        role="listitem"
        style={{ transitionDelay: `${index * 0.07}s` }}
      >
        <div className="archive-image">
          <img
            src={project.image}
            alt={project.name}
            className="archive-img"
            loading="lazy"
            onError={handleImgError}
          />
          <span className="archive-category-badge">{project.badge}</span>
        </div>
        <div className="archive-content">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="archive-tech">
            {project.tech.map(t => (
              <span className="archive-tag" key={t}>{t}</span>
            ))}
          </div>
          <a
            href={project.url}
            className="archive-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-external-link-alt" aria-hidden="true" /> View Live
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Vault() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    )
    elements.forEach(el => {
      el.classList.remove('appear')
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [activeFilter])

  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter)

  return (
    <>
      <Background variant="vault" />

      <nav className={scrolled ? 'scrolled' : ''} aria-label="Archive navigation">
        <div className="container nav-inner">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" className="brand-mark" aria-label="Home">
              <span className="brand-ak">AK</span>
              <span className="brand-tree" aria-hidden="true">
                <svg viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="9" y1="24" x2="9" y2="8" stroke="url(#tg2)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="9" y1="14" x2="4" y2="8" stroke="url(#tg2)" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="9" y1="14" x2="14" y2="8" stroke="url(#tg2)" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="9" y1="10" x2="5" y2="4" stroke="url(#tg2)" strokeWidth="0.8" strokeLinecap="round"/>
                  <line x1="9" y1="10" x2="13" y2="4" stroke="url(#tg2)" strokeWidth="0.8" strokeLinecap="round"/>
                  <circle cx="9" cy="3" r="2.5" fill="none" stroke="url(#tg2)" strokeWidth="0.8"/>
                  <defs>
                    <linearGradient id="tg2" x1="9" y1="0" x2="9" y2="24" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#D4AF37"/>
                      <stop offset="100%" stopColor="#8B7533"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="brand-dj">DJ</span>
            </Link>
            <span className="brand-sep">|</span>
            <span className="brand-page-label">Archive</span>
          </div>
          <Link to="/" className="home-btn">
            <i className="fas fa-arrow-left" aria-hidden="true" /> Home
          </Link>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="vault-header fade-in">
            <h1>Project <span className="gold-word">Archive</span></h1>
            <p>Every website I've built — real projects for real businesses and brands, all live and hosted.</p>
            <div className="project-count" aria-live="polite">
              Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="filter-bar">
          <div
            className="container filter-container"
            role="group"
            aria-label="Filter projects by category"
          >
            {FILTERS.map(filter => (
              <button
                key={filter.value}
                className={`filter-btn${activeFilter === filter.value ? ' active' : ''}`}
                data-filter={filter.value}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="container">
          <div
            className="projects-archive"
            id="archiveGrid"
            role="list"
            aria-label="Project archive"
          >
            {filtered.length === 0 ? (
              <div className="no-results">No projects found in this category.</div>
            ) : (
              filtered.map((project, index) => (
                <ArchiveCard key={project.name} project={project} index={index} />
              ))
            )}
          </div>
        </div>

        <div className="container">
          <div className="vault-cta-section fade-in">
            <h3>Like what you see?</h3>
            <p>I'd love to build something for your business too.</p>
            <a
              href="https://wa.me/2347059895477"
              className="btn-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp" aria-hidden="true" /> Message Me on WhatsApp
            </a>
          </div>
        </div>
      </main>

      <footer className="vault-footer container">
        <p>
          &copy; {new Date().getFullYear()}{' '}
          <span className="footer-brand">Agwu Kalu</span> · Software Engineer
        </p>
      </footer>
    </>
  )
}