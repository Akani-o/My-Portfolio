import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Background from '../components/Background'

export default function Partnerships() {
  const [scrolled, setScrolled] = useState(false)
  const [formStatus, setFormStatus] = useState({ text: '', type: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setFormStatus({ text: '', type: '' })

    const name = formRef.current.querySelector('#p-name').value.trim()
    const email = formRef.current.querySelector('#p-email').value.trim()
    const message = formRef.current.querySelector('#p-message').value.trim()

    if (!name || !email || !message) {
      setFormStatus({ text: 'Please fill in all fields.', type: 'error' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus({ text: 'Please enter a valid email address.', type: 'error' })
      return
    }

    setIsSubmitting(true)
    const formData = new FormData(formRef.current)

    fetch('https://formspree.io/f/xlgoolzb', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          setFormStatus({ text: "✓ Message received. I'll be in touch shortly.", type: 'success' })
          formRef.current.reset()
        } else {
          throw new Error('Failed')
        }
      })
      .catch(() => {
        setFormStatus({ text: 'Something went wrong. Please reach out via email instead.', type: 'error' })
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <>
      <Background variant="vault" />

      {/* NAV */}
      <nav className={scrolled ? 'scrolled' : ''} aria-label="Partnerships navigation">
        <div className="container nav-inner">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" className="brand-mark" aria-label="Home">
              <span className="brand-ak">AK</span>
              <span className="brand-tree" aria-hidden="true">
                <svg viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="9" y1="24" x2="9" y2="8" stroke="url(#tgP)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="9" y1="14" x2="4" y2="8" stroke="url(#tgP)" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="9" y1="14" x2="14" y2="8" stroke="url(#tgP)" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="9" y1="10" x2="5" y2="4" stroke="url(#tgP)" strokeWidth="0.8" strokeLinecap="round"/>
                  <line x1="9" y1="10" x2="13" y2="4" stroke="url(#tgP)" strokeWidth="0.8" strokeLinecap="round"/>
                  <circle cx="9" cy="3" r="2.5" fill="none" stroke="url(#tgP)" strokeWidth="0.8"/>
                  <defs>
                    <linearGradient id="tgP" x1="9" y1="0" x2="9" y2="24" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#D4AF37"/>
                      <stop offset="100%" stopColor="#8B7533"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="brand-dj">DJ</span>
            </Link>
            <span className="brand-sep">|</span>
            <span className="brand-page-label">Partnerships</span>
          </div>
          <Link to="/" className="home-btn">
            <i className="fas fa-arrow-left" aria-hidden="true" /> Home
          </Link>
        </div>
      </nav>

      <div className="partnerships-page">
        {/* HERO */}
        <section className="partnerships-hero">
          <div className="partnerships-hero-depth" aria-hidden="true" />
          <div className="partnerships-hero-content">
            <span className="partnerships-hero-label">Creative Partnerships</span>
            <h1>
              Modern Web Execution for <span className="gold-word">Creatives</span> & <span className="gold-word">Agencies</span>
            </h1>
            <p className="partnerships-hero-sub">
              You shape the vision. I bring it to life on the web. A quiet, reliable collaboration
              for professionals who need polished digital execution — without building an in-house team.
            </p>
            <div className="partnerships-hero-buttons">
              <a href="#p-contact" className="btn">
                <i className="fas fa-comments" aria-hidden="true" /> Start A Conversation
              </a>
              <Link to="/vault" className="btn btn-outline">
                <i className="fas fa-eye" aria-hidden="true" /> View Selected Work
              </Link>
            </div>
          </div>
        </section>

        <main>
          {/* WHO I COLLABORATE WITH */}
          <section className="p-section">
            <div className="container">
              <div className="p-section-title">
                <span className="p-section-label">Collaboration</span>
                <h2>Who I <span className="gold-word">work</span> with</h2>
              </div>
              <p className="p-section-subtitle">
                I partner with professionals who already serve businesses and brands — and need reliable web execution to complement their expertise.
              </p>

              <div className="collab-grid">
                {[
                  { icon: 'fa-bullhorn', title: 'Social Media Managers' },
                  { icon: 'fa-layer-group', title: 'Creative Agencies' },
                  { icon: 'fa-pen-ruler', title: 'Brand Designers' },
                  { icon: 'fa-chart-line', title: 'Marketing Consultants' },
                  { icon: 'fa-video', title: 'Content Creators' },
                  { icon: 'fa-store', title: 'Boutique Studios' },
                  { icon: 'fa-compass', title: 'Digital Strategists' },
                  { icon: 'fa-handshake', title: 'Business Consultants' }
                ].map((item, i) => (
                  <div className={`collab-card fade-in`} key={item.title} style={{ transitionDelay: `${i * 0.06}s` }}>
                    <div className="collab-icon">
                      <i className={`fas ${item.icon}`} aria-hidden="true" />
                    </div>
                    <h4>{item.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHY THESE PARTNERSHIPS EXIST */}
          <section className="p-section p-section-alt">
            <div className="container">
              <div className="p-section-title">
                <span className="p-section-label">Context</span>
                <h2>Why this <span className="gold-word">works</span></h2>
              </div>

              <div className="why-content fade-in">
                <div className="why-card">
                  <p>
                    Many talented professionals — marketers, designers, strategists — work closely with businesses every day. They shape brands, run campaigns, and drive growth. But when a client needs a website, it often falls outside their core workflow.
                  </p>
                  <p>
                    That's where this collaboration becomes natural. Rather than turning clients away or outsourcing to unpredictable freelancers, you work with someone who treats your client's project with the same <span className="gold-em">care and precision</span> you would.
                  </p>
                  <p>
                    I handle the web execution — <span className="gold-em">design, development, and delivery</span> — while you maintain the client relationship and creative direction. The result is a seamless experience where everyone benefits.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* WHAT I BUILD */}
          <section className="p-section">
            <div className="container">
              <div className="p-section-title">
                <span className="p-section-label">Execution</span>
                <h2>What I <span className="gold-word">build</span></h2>
              </div>

              <div className="build-grid">
                {[
                  { icon: 'fa-building', title: 'Business Websites', desc: 'Complete multi-page websites for established businesses' },
                  { icon: 'fa-file-alt', title: 'Landing Pages', desc: 'Focused, conversion-oriented single-page experiences' },
                  { icon: 'fa-briefcase', title: 'Portfolio Websites', desc: 'Elegant showcases for professionals and creators' },
                  { icon: 'fa-palette', title: 'Brand Websites', desc: 'Visually rich sites that capture brand identity' },
                  { icon: 'fa-rocket', title: 'Campaign Websites', desc: 'Event, launch, or promotional microsites' },
                  { icon: 'fa-concierge-bell', title: 'Service Websites', desc: 'Structured sites for service-based businesses' },
                  { icon: 'fa-calendar-check', title: 'Booking Websites', desc: 'Appointment and reservation-focused platforms' }
                ].map((item, i) => (
                  <div className="build-item fade-in" key={item.title} style={{ transitionDelay: `${i * 0.07}s` }}>
                    <div className="build-item-icon">
                      <i className={`fas ${item.icon}`} aria-hidden="true" />
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW THE COLLABORATION WORKS */}
          <section className="p-section p-section-alt">
            <div className="container">
              <div className="p-section-title">
                <span className="p-section-label">Workflow</span>
                <h2>How it <span className="gold-word">works</span></h2>
              </div>

              <div className="p-process-grid">
                {[
                  { num: '01', title: 'Conversation', desc: 'We discuss the project scope, client needs, and your creative direction.' },
                  { num: '02', title: 'Direction', desc: 'I shape the site structure, visual approach, and timeline.' },
                  { num: '03', title: 'Execution', desc: 'I design and develop the site with ongoing collaboration and refinement.' },
                  { num: '04', title: 'Delivery', desc: 'The finished site goes live — polished, responsive, and ready.' }
                ].map((step, i) => (
                  <div className="p-step fade-in" key={step.num} style={{ transitionDelay: `${i * 0.1}s` }}>
                    <div className="p-step-num">{step.num}</div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LOW-RISK APPROACH */}
          <section className="p-section">
            <div className="container">
              <div className="p-section-title">
                <span className="p-section-label">Approach</span>
                <h2>Thoughtful <span className="gold-word">first steps</span></h2>
              </div>

              <div className="approach-card fade-in">
                <div className="approach-icon">
                  <i className="fas fa-shield-alt" aria-hidden="true" />
                </div>
                <h3>Concept Before Commitment</h3>
                <p>
                  Every project begins with an early concept direction — giving you and your client
                  a clear sense of the visual approach and structure before moving into full development.
                  This ensures alignment from the start and builds confidence in the direction we take together.
                </p>
              </div>
            </div>
          </section>

          {/* SELECTED WORK */}
          <section className="p-section p-section-alt">
            <div className="container">
              <div className="p-section-title">
                <span className="p-section-label">Portfolio</span>
                <h2>Selected <span className="gold-word">work</span></h2>
              </div>

              <div className="work-preview fade-in">
                <p>
                  Browse a curated collection of websites I've built for businesses and brands across
                  industries — from fashion and food to healthcare and commerce. Each project reflects
                  the same standard of quality and attention you can expect from a collaboration.
                </p>
                <Link to="/vault" className="btn btn-outline">
                  <i className="fas fa-th-large" aria-hidden="true" /> Explore The Archive
                </Link>
              </div>
            </div>
          </section>

          {/* PROFESSIONAL VALUES */}
          <section className="p-section">
            <div className="container">
              <div className="p-section-title">
                <span className="p-section-label">Standards</span>
                <h2>What to <span className="gold-word">expect</span></h2>
              </div>

              <div className="values-grid">
                {[
                  { icon: 'fa-comments', title: 'Clear Communication', desc: 'Responsive, transparent updates at every stage of the project.' },
                  { icon: 'fa-clock', title: 'Reliable Delivery', desc: 'Timelines that are realistic, respected, and consistently met.' },
                  { icon: 'fa-gem', title: 'Thoughtful Execution', desc: 'Every detail — typography, spacing, interactions — is considered.' },
                  { icon: 'fa-mobile-alt', title: 'Modern Standards', desc: 'Responsive, fast, SEO-aware websites built with current technology.' },
                  { icon: 'fa-eye', title: 'Attention to Detail', desc: 'Nothing ships rough. Every pixel, every interaction is polished.' },
                  { icon: 'fa-infinity', title: 'Long-Term Mindset', desc: 'Built for ongoing collaboration, not just one-off transactions.' }
                ].map((val, i) => (
                  <div className="value-card fade-in" key={val.title} style={{ transitionDelay: `${i * 0.07}s` }}>
                    <div className="value-icon">
                      <i className={`fas ${val.icon}`} aria-hidden="true" />
                    </div>
                    <h4>{val.title}</h4>
                    <p>{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className="p-section p-section-alt" id="p-contact">
            <div className="container">
              <div className="p-section-title">
                <span className="p-section-label">Connect</span>
                <h2>Start a <span className="gold-word">conversation</span></h2>
              </div>

              <div className="p-contact-grid">
                <div className="p-contact-info fade-in-left">
                  <h3>Let's discuss a project</h3>
                  <p>
                    Whether you have a client project in mind or want to explore how we might work together,
                    I'd welcome the conversation. No pressure, no hard sell — just a professional discussion.
                  </p>

                  <div className="p-contact-item">
                    <div className="p-contact-icon">
                      <i className="fas fa-envelope" aria-hidden="true" />
                    </div>
                    <div className="p-contact-text">
                      <h4>Email</h4>
                      <p>d.agwukalu@gmail.com</p>
                    </div>
                  </div>
                  <div className="p-contact-item">
                    <div className="p-contact-icon">
                      <i className="fas fa-map-marker-alt" aria-hidden="true" />
                    </div>
                    <div className="p-contact-text">
                      <h4>Location</h4>
                      <p>Nigeria (GMT+1) · Working globally</p>
                    </div>
                  </div>
                </div>

                <div className="p-form-col fade-in-right">
                  <h3>Send a message</h3>
                  <form
                    className="contact-form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    action="https://formspree.io/f/xlgoolzb"
                    method="POST"
                    noValidate
                  >
                    <div className="form-group">
                      <label htmlFor="p-name">Name</label>
                      <input type="text" id="p-name" name="name" placeholder="Your name" required autoComplete="name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="p-email">Email</label>
                      <input type="email" id="p-email" name="email" placeholder="you@example.com" required autoComplete="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="p-message">Message</label>
                      <textarea id="p-message" name="message" placeholder="Tell me about the project or collaboration you have in mind…" rows="5" required />
                    </div>
                    <input type="hidden" name="_subject" value="Partnership Inquiry — agwukalu.com" />
                    <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }} disabled={isSubmitting}>
                      {isSubmitting
                        ? <><i className="fas fa-spinner fa-spin" aria-hidden="true" /> Sending…</>
                        : <><i className="fas fa-paper-plane" aria-hidden="true" /> Send Message</>
                      }
                    </button>
                    <div className={`form-status${formStatus.type ? ' ' + formStatus.type : ''}`} aria-live="polite">
                      {formStatus.text}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="partnerships-footer container">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <span className="footer-brand">Agwu Kalu</span> · Software Engineer
          </p>
          <p className="footer-sub">Designed & built with care</p>
        </footer>
      </div>
    </>
  )
}