import React, { useState, useRef } from 'react'

export default function Contact() {
  const [formStatus, setFormStatus] = useState({ text: '', type: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    setFormStatus({ text: '', type: '' })

    const name = formRef.current.querySelector('#name').value.trim()
    const email = formRef.current.querySelector('#email').value.trim()
    const message = formRef.current.querySelector('#message').value.trim()

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
          setFormStatus({ text: "✓ Message sent! I'll get back to you soon.", type: 'success' })
          formRef.current.reset()
        } else {
          throw new Error('Submission failed')
        }
      })
      .catch(() => {
        setFormStatus({
          text: 'Something went wrong. Please message me on WhatsApp instead.',
          type: 'error'
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-title">
          <span className="section-label">Contact</span>
          <h2>Let's <span className="gold-word">connect</span></h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info fade-in-left">
            <h3>Start a conversation</h3>
            <p>Have a project in mind? Need a website for your business? I'd love to hear about it.</p>

            <div className="contact-item">
              <div className="contact-icon"><i className="fab fa-whatsapp" aria-hidden="true" /></div>
              <div className="contact-text">
                <h4>WhatsApp</h4>
                <p>+234 705 989 5477</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-envelope" aria-hidden="true" /></div>
              <div className="contact-text">
                <h4>Email</h4>
                <p>d.agwukalu@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-map-marker-alt" aria-hidden="true" /></div>
              <div className="contact-text">
                <h4>Location</h4>
                <p>Nigeria (GMT+1)</p>
              </div>
            </div>

            <div className="contact-cta-buttons">
              <a
                href="https://wa.me/2347059895477"
                className="btn btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp" aria-hidden="true" /> Message on WhatsApp
              </a>
              <a href="mailto:d.agwukalu@gmail.com" className="btn btn-outline">
                <i className="fas fa-envelope" aria-hidden="true" /> Email
              </a>
            </div>
          </div>

          <div className="contact-form-col fade-in-right">
            <h3>Send a message</h3>
            <form
              className="contact-form"
              id="contactForm"
              ref={formRef}
              onSubmit={handleSubmit}
              action="https://formspree.io/f/xlgoolzb"
              method="POST"
              noValidate
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or idea…"
                  rows="5"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn"
                style={{ alignSelf: 'flex-start' }}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? <><i className="fas fa-spinner fa-spin" aria-hidden="true" /> Sending…</>
                  : <><i className="fas fa-paper-plane" aria-hidden="true" /> Send Message</>
                }
              </button>
              <div
                className={`form-status${formStatus.type ? ' ' + formStatus.type : ''}`}
                aria-live="polite"
              >
                {formStatus.text}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}