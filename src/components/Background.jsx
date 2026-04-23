import React, { useEffect, useRef } from 'react'

export default function Background({ variant = 'home' }) {
  const canvasRef = useRef(null)
  const mouseLightRef = useRef(null)
  const rafCanvasRef = useRef(null)
  const rafMouseRef = useRef(null)
  const rafParallaxRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isMobile = window.innerWidth < 768

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const mouseLight = mouseLightRef.current

    let particles = []
    let dustParticles = []
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let targetMouseX = mouseX
    let targetMouseY = mouseY
    const particleCount = variant === 'vault'
      ? (isMobile ? 25 : 45)
      : (isMobile ? 40 : 70)
    const dustCount = variant === 'vault'
      ? (isMobile ? 10 : 20)
      : (isMobile ? 15 : 35)
    const connectionDistance = variant === 'vault' ? 110 : (isMobile ? 100 : 140)
    const zMax = variant === 'vault' ? 800 : 1000
    let time = 0

    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    let resizeTimeout
    function handleResize() {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 150)
    }
    window.addEventListener('resize', handleResize)

    function Particle() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.z = Math.random() * zMax
      this.vx = (Math.random() - 0.5) * 0.25
      this.vy = (Math.random() - 0.5) * 0.25
      this.vz = (Math.random() - 0.5) * 0.4
      this.baseSize = Math.random() * 1.5 + 0.4
      this.pulseOffset = Math.random() * Math.PI * 2
      this.pulseSpeed = 0.01 + Math.random() * 0.02
    }
    Particle.prototype.update = function() {
      this.x += this.vx
      this.y += this.vy
      this.z += this.vz
      if (this.x < 0) this.x = canvas.width
      if (this.x > canvas.width) this.x = 0
      if (this.y < 0) this.y = canvas.height
      if (this.y > canvas.height) this.y = 0
      if (this.z < 0) this.z = zMax
      if (this.z > zMax) this.z = 0
      if (!isTouchDevice) {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          this.x -= dx * 0.003
          this.y -= dy * 0.003
        }
      }
    }
    Particle.prototype.draw = function(t) {
      const scale = (zMax - this.z) / zMax
      const pulse = Math.sin(t * this.pulseSpeed + this.pulseOffset) * 0.3 + 0.7
      const size = this.baseSize * scale * pulse
      const opacity = scale * 0.5 * pulse
      ctx.beginPath()
      ctx.arc(this.x, this.y, size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(212,175,55,${opacity})`
      ctx.fill()
    }

    function DustParticle() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 0.12
      this.vy = -0.05 - Math.random() * 0.1
      this.size = Math.random() * 0.8 + 0.2
      this.opacity = Math.random() * 0.3 + 0.05
      this.life = Math.random() * 600 + 200
      this.age = Math.random() * this.life
    }
    DustParticle.prototype.update = function() {
      this.x += this.vx
      this.y += this.vy
      this.age++
      if (this.age > this.life || this.y < -10) {
        this.y = canvas.height + 10
        this.x = Math.random() * canvas.width
        this.age = 0
      }
    }
    DustParticle.prototype.draw = function() {
      const lifeFactor = 1 - Math.abs((this.age / this.life) * 2 - 1)
      const a = this.opacity * lifeFactor
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(212,175,55,${a})`
      ctx.fill()
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle())
    for (let j = 0; j < dustCount; j++) dustParticles.push(new DustParticle())

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let k = i + 1; k < particles.length; k++) {
          const dx = particles[i].x - particles[k].x
          const dy = particles[i].y - particles[k].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDistance) {
            const depthFactor = ((zMax - particles[i].z) / zMax + (zMax - particles[k].z) / zMax) / 2
            const opacity = (1 - dist / connectionDistance) * 0.07 * depthFactor
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[k].x, particles[k].y)
            ctx.strokeStyle = `rgba(212,175,55,${opacity})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      }
    }

    function animateCanvas() {
      if (prefersReducedMotion) return
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      mouseX += (targetMouseX - mouseX) * 0.08
      mouseY += (targetMouseY - mouseY) * 0.08
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw(time)
      }
      drawConnections()
      for (let d = 0; d < dustParticles.length; d++) {
        dustParticles[d].update()
        dustParticles[d].draw()
      }
      rafCanvasRef.current = requestAnimationFrame(animateCanvas)
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafCanvasRef.current)
      } else if (!prefersReducedMotion) {
        animateCanvas()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    if (!prefersReducedMotion) animateCanvas()

    // Mouse tracking
    let mlX = 0, mlY = 0, mlTargetX = 0, mlTargetY = 0

    function handleMouseMove(e) {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
      mlTargetX = e.clientX
      mlTargetY = e.clientY
    }

    if (!isTouchDevice) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true })
      function animateMouseLight() {
        mlX += (mlTargetX - mlX) * 0.06
        mlY += (mlTargetY - mlY) * 0.06
        if (mouseLight) {
          mouseLight.style.transform = `translate(${mlX - 350}px,${mlY - 350}px)`
        }
        rafMouseRef.current = requestAnimationFrame(animateMouseLight)
      }
      if (!prefersReducedMotion) animateMouseLight()
    } else {
      if (mouseLight) mouseLight.style.display = 'none'
    }

    // Parallax for floating shapes
    let scrollY = 0
    let targetScrollY = 0
    const parallaxShapes = document.querySelectorAll('[data-parallax-speed]')

    function handleScroll() {
      targetScrollY = window.pageYOffset
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    function updateParallax() {
      scrollY += (targetScrollY - scrollY) * 0.1
      parallaxShapes.forEach(shape => {
        const speed = parseFloat(shape.getAttribute('data-parallax-speed'))
        shape.style.transform = `translateY(${scrollY * speed * -1}px)`
      })
      rafParallaxRef.current = requestAnimationFrame(updateParallax)
    }
    if (!prefersReducedMotion) updateParallax()

    return () => {
      cancelAnimationFrame(rafCanvasRef.current)
      cancelAnimationFrame(rafMouseRef.current)
      cancelAnimationFrame(rafParallaxRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [variant])

  if (variant === 'vault') {
    return (
      <>
        <canvas ref={canvasRef} id="bgCanvas" aria-hidden="true" />
        <div className="aurora-layer" aria-hidden="true">
          <div className="aurora-blob aurora-blob-v1" />
          <div className="aurora-blob aurora-blob-v2" />
        </div>
        <div className="noise-layer" aria-hidden="true" />
        <div className="mouse-light" ref={mouseLightRef} aria-hidden="true" />
        <div className="floating-shapes" aria-hidden="true">
          <div className="geo-shape ring-v" data-parallax-speed="0.025" />
          <div className="geo-shape diamond-v" data-parallax-speed="0.04" />
          <div className="geo-shape line-v" data-parallax-speed="0.02" />
        </div>
      </>
    )
  }

  return (
    <>
      <canvas ref={canvasRef} id="bgCanvas" aria-hidden="true" />
      <div className="aurora-layer" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>
      <div className="noise-layer" aria-hidden="true" />
      <div className="mouse-light" ref={mouseLightRef} aria-hidden="true" />
      <div className="floating-shapes" id="floatingShapes" aria-hidden="true">
        <div className="geo-shape ring-1" data-parallax-speed="0.03" />
        <div className="geo-shape ring-2" data-parallax-speed="0.02" />
        <div className="geo-shape diamond-1" data-parallax-speed="0.05" />
        <div className="geo-shape line-1" data-parallax-speed="0.015" />
        <div className="geo-shape line-2" data-parallax-speed="0.025" />
        <div className="geo-shape hex-1" data-parallax-speed="0.035" />
        <div className="geo-shape dot-cluster" data-parallax-speed="0.04" />
      </div>
    </>
  )
}