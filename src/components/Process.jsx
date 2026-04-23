import React from 'react'

export default function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="section-title">
          <span className="section-label">Process</span>
          <h2>How I <span className="gold-word">work</span></h2>
        </div>

        <div className="process-grid">
          <div className="process-step fade-in">
            <div className="process-number">01</div>
            <h3>Understand</h3>
            <p>I learn about your business, audience, and goals. What are you trying to communicate? Who should your website speak to?</p>
          </div>
          <div className="process-step fade-in fade-in-delay-1">
            <div className="process-number">02</div>
            <h3>Shape</h3>
            <p>I structure the layout, pages, and flow — making sure the site serves your brand and makes it easy for visitors to take action.</p>
          </div>
          <div className="process-step fade-in fade-in-delay-2">
            <div className="process-number">03</div>
            <h3>Build</h3>
            <p>I write clean, responsive code and polish every detail — typography, spacing, animations, mobile views. Nothing leaves rough.</p>
          </div>
          <div className="process-step fade-in fade-in-delay-3">
            <div className="process-number">04</div>
            <h3>Deliver</h3>
            <p>The finished site goes live, optimized and ready. I walk you through everything and remain available for refinements.</p>
          </div>
        </div>

        <div style={{ marginTop: '5rem' }}>
          <div className="exploring-section fade-in">
            <h3>Currently Exploring</h3>
            <p>I'm expanding beyond websites into <strong style={{ color: 'var(--gold-light)' }}>AI-powered automation</strong> — learning tools like n8n to build smarter workflows and systems. Always growing, always building.</p>
            <div className="exploring-tag">
              <i className="fas fa-bolt" aria-hidden="true" /> n8n · AI Automation
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}