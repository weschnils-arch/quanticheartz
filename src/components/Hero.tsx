import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import FrequencySphere from './FrequencySphere'

interface HeroProps {
  isActive: boolean
  onToggle: () => void
}

export default function Hero({ isActive, onToggle }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const offVideoRef = useRef<HTMLVideoElement>(null)
  const onVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo('.hero-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
      .fromTo('.hero-title span', { opacity: 0, y: 40, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 1.2, stagger: 0.08 }, '-=0.4')
      .fromTo('.hero-sphere', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, '-=0.6')
      .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.4')
      .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video backgrounds — crossfade between OFF and ON */}
      <video
        ref={offVideoRef}
        src="/warp_stream_OFF.webm"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        style={{ opacity: isActive ? 0 : 1 }}
      />
      <video
        ref={onVideoRef}
        src="/warp_stream_ON.webm"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        style={{ opacity: isActive ? 1 : 0 }}
      />

      {/* Overlay — deep purple-black */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(180deg, rgba(6,3,13,0.92) 0%, rgba(16,12,26,0.7) 50%, rgba(6,3,13,0.92) 100%)',
      }} />
      {/* Ambient glow behind sphere */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full z-[1] pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{
        background: 'radial-gradient(circle, rgba(176,122,255,0.08) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)',
      }} />

      {/* Content — centered vertical stack */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full section-padding">
        {/* Top text */}
        <p className="hero-label label-text mb-6 opacity-0">Frequency Redefined</p>

        <h1 className="hero-title text-text mb-10" style={{ fontSize: 'clamp(1.1rem, 3.5vw, 3rem)', fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '0.15em', lineHeight: 1.2 }}>
          <span>RETUNE YOUR </span>
          <span className="text-primary">ENTIRE MAC </span>
          <span>TO 432 HZ.</span>
        </h1>

        {/* 3D Sphere — center, clickable */}
        <div className="hero-sphere mb-10 opacity-0 cursor-pointer" onClick={onToggle}>
          <FrequencySphere isActive={isActive} />
        </div>

        {/* Bottom text */}
        <p className="hero-sub body-lg max-w-lg mb-10 opacity-0">
          The world's first system-wide audio converter. Every sound — Spotify, YouTube,
          Apple Music, calls — shifted to 432 Hz in real time.
        </p>

        <div className="hero-cta flex flex-wrap gap-4 justify-center opacity-0">
          <a href="https://api.quanticheartz.io/api/download/app" className="btn-primary">
            Download for macOS
          </a>
          <a href="#how-it-works" className="btn-outline">
            How it works
          </a>
        </div>
      </div>
    </section>
  )
}
