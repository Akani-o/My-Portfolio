import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -80px 0px' }
    )
    revealElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}