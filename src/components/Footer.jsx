import React from 'react'

export default function Footer() {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} <span className="footer-brand">Agwu Kalu</span> · Software Engineer
      </p>
      <p className="footer-sub">Designed &amp; built with care</p>
    </footer>
  )
}