import React, { useEffect, useRef } from 'react'

export default function Hero() {
  const typedRef = useRef(null)
  const heroParallaxRef = useRef(null)
  const heroRef = useRef(null)
  const heroContentRef = useRef(null)
  const rafScrollRef = useRef(null)
  const rafMouseRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Typed text
    const roles = [
      'Websites that look sharp and work smoothly',
      'Polished interfaces for brands and businesses',
      'Frontend-focused software engineering',
      'Modern web experiences, built with care'
    ]
    let roleIndex = 0, charIndex = 0, isDeleting = false
    let typedTimeout

    function typeEffect() {
      if (!typedRef.current) return
      const current = roles[roleIndex]
      if (isDeleting) charIndex--
      else charIndex++
      typedRef.current.textContent = current.substring(0, charIndex)
      if (!isDeleting && charIndex === current.length) {
        isDeleting = true
        typedTimeout = setTimeout(typeEffect, 2400)
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        roleIndex = (roleIndex + 1) % roles.length
        typedTimeout = setTimeout(typeEffect, 500)
      } else {
        typedTimeout = setTimeout(typeEffect, isDeleting ? 35 : 65)
      }
    }
    typedTimeout = setTimeout(typeEffect, 1800)

    // Scroll parallax for hero
    let scrollY = 0
    let targetScrollY = 0

    function handleScroll() {
      targetScrollY = window.pageYOffset
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    function updateHeroParallax() {
      scrollY += (targetScrollY - scrollY) * 0.1
      if (heroParallaxRef.current) {
        const heroOffset = scrollY * 0.15
        const heroOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.6))
        heroParallaxRef.current.style.transform = `translateY(${heroOffset}px)`
        heroParallaxRef.current.style.opacity = heroOpacity
      }
      if (!prefersReducedMotion) {
        rafScrollRef.current = requestAnimationFrame(updateHeroParallax)
      }
    }
    if (!prefersReducedMotion) updateHeroParallax()

    // Hero mouse parallax
    function handleHeroMouseMove(e) {
      if (!heroRef.current || !heroContentRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      heroContentRef.current.style.transform = `translate(${x * 8}px, ${y * 6}px)`
    }
    function handleHeroMouseLeave() {
      if (!heroContentRef.current) return
      heroContentRef.current.style.transform = 'translate(0,0)'
      heroContentRef.current.style.transition = 'transform 0.6s ease'
      setTimeout(() => {
        if (heroContentRef.current) heroContentRef.current.style.transition = ''
      }, 600)
    }

    if (!isTouchDevice && !prefersReducedMotion && heroRef.current) {
      heroRef.current.addEventListener('mousemove', handleHeroMouseMove)
      heroRef.current.addEventListener('mouseleave', handleHeroMouseLeave)
    }

    // Magnetic buttons
    if (!isTouchDevice && !prefersReducedMotion) {
      const btns = document.querySelectorAll('.hero-buttons .btn, .hero-buttons .btn-vault')
      btns.forEach(btn => {
        function onMouseMove(e) {
          const rect = btn.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-4px) scale(1.02)`
        }
        function onMouseLeave() {
          btn.style.transform = ''
        }
        btn.addEventListener('mousemove', onMouseMove)
        btn.addEventListener('mouseleave', onMouseLeave)
      })
    }

    return () => {
      clearTimeout(typedTimeout)
      cancelAnimationFrame(rafScrollRef.current)
      cancelAnimationFrame(rafMouseRef.current)
      window.removeEventListener('scroll', handleScroll)
      if (heroRef.current) {
        heroRef.current.removeEventListener('mousemove', handleHeroMouseMove)
        heroRef.current.removeEventListener('mouseleave', handleHeroMouseLeave)
      }
    }
  }, [])

  return (
    <header className="hero" id="hero" ref={heroRef}>
      <div className="hero-depth-1" aria-hidden="true" />
      <div className="hero-depth-2" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-beam hero-beam-1" aria-hidden="true" />
      <div className="hero-beam hero-beam-2" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      <div className="hero-content-parallax" id="heroParallax" ref={heroParallaxRef}>
        <div className="hero-content" ref={heroContentRef}>
          <h1 className="hero-name-primary">Agwu Kalu</h1>

          <div className="hero-tree-divider" aria-hidden="true">
            <div className="tree-line" />
            <div className="tree-icon">
              <svg viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="14" y1="36" x2="14" y2="10" stroke="url(#heroTreeG)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="14" y1="22" x2="6" y2="12" stroke="url(#heroTreeG)" strokeWidth="1" strokeLinecap="round"/>
                <line x1="14" y1="22" x2="22" y2="12" stroke="url(#heroTreeG)" strokeWidth="1" strokeLinecap="round"/>
                <line x1="14" y1="16" x2="8" y2="6" stroke="url(#heroTreeG)" strokeWidth="0.8" strokeLinecap="round"/>
                <line x1="14" y1="16" x2="20" y2="6" stroke="url(#heroTreeG)" strokeWidth="0.8" strokeLinecap="round"/>
                <line x1="14" y1="12" x2="10" y2="2" stroke="url(#heroTreeG)" strokeWidth="0.6" strokeLinecap="round"/>
                <line x1="14" y1="12" x2="18" y2="2" stroke="url(#heroTreeG)" strokeWidth="0.6" strokeLinecap="round"/>
                <circle cx="14" cy="4" r="3" fill="none" stroke="url(#heroTreeG)" strokeWidth="0.7" opacity="0.6"/>
                <defs>
                  <linearGradient id="heroTreeG" x1="14" y1="0" x2="14" y2="36" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F4E4A6"/>
                    <stop offset="100%" stopColor="#8B7533"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="tree-line" />
          </div>

          <p className="hero-name-secondary">David Jnr</p>
          <p className="hero-tagline">Software Engineer · Building Modern Websites & Digital Experiences</p>

          <div className="hero-typed-wrap">
            <span ref={typedRef} id="typed-text" />
            <span className="typed-cursor" aria-hidden="true">&nbsp;</span>
          </div>

          <div className="hero-buttons">
            <a
              href="https://wa.me/2347059895477"
              className="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp" aria-hidden="true" /> Let's Talk
            </a>
            <a href="#projects" className="btn btn-outline">
              <i className="fas fa-eye" aria-hidden="true" /> View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </header>
  )
}