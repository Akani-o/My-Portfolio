import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleSmoothScroll(e) {
      const href = e.currentTarget.getAttribute('href')
      if (!href || !href.startsWith('#')) return
      if (href === '#') return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        const navHeight = navRef.current ? navRef.current.offsetHeight : 72
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight
        window.scrollTo({ top: targetPos, behavior: 'smooth' })
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
        setMenuOpen(false)
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(link => link.addEventListener('click', handleSmoothScroll))
    return () => links.forEach(link => link.removeEventListener('click', handleSmoothScroll))
  }, [menuOpen])

  function toggleMenu() {
    setMenuOpen(prev => !prev)
  }

  return (
    <nav ref={navRef} className={scrolled ? 'scrolled' : ''} aria-label="Main navigation">
      <div className="container nav-inner">
        <a href="/" className="brand-mark" aria-label="Home">
          <span className="brand-ak">AK</span>
          <span className="brand-tree" aria-hidden="true">
            <svg viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="9" y1="24" x2="9" y2="8" stroke="url(#treeGrad)" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="9" y1="14" x2="4" y2="8" stroke="url(#treeGrad)" strokeWidth="1" strokeLinecap="round"/>
              <line x1="9" y1="14" x2="14" y2="8" stroke="url(#treeGrad)" strokeWidth="1" strokeLinecap="round"/>
              <line x1="9" y1="10" x2="5" y2="4" stroke="url(#treeGrad)" strokeWidth="0.8" strokeLinecap="round"/>
              <line x1="9" y1="10" x2="13" y2="4" stroke="url(#treeGrad)" strokeWidth="0.8" strokeLinecap="round"/>
              <circle cx="9" cy="3" r="2.5" fill="none" stroke="url(#treeGrad)" strokeWidth="0.8"/>
              <defs>
                <linearGradient id="treeGrad" x1="9" y1="0" x2="9" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D4AF37"/>
                  <stop offset="100%" stopColor="#8B7533"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="brand-dj">DJ</span>
        </a>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="navMenu"
        >
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} aria-hidden="true" />
        </button>

        <ul className={`nav-menu${menuOpen ? ' show' : ''}`} id="navMenu" role="list">
          <li><a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#skills" className="nav-link" onClick={() => setMenuOpen(false)}>Skills</a></li>
          <li><a href="#projects" className="nav-link" onClick={() => setMenuOpen(false)}>Work</a></li>
          <li><a href="#process" className="nav-link" onClick={() => setMenuOpen(false)}>Process</a></li>
          <li><a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}