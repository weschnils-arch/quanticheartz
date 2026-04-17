import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const faqs = [
  { q: 'What exactly does Quantic Heartz do?', a: 'Quantic Heartz is a macOS audio middleware that intercepts all system audio in real time and retunes it from A=440 Hz to A=432 Hz. It works with every app — Spotify, YouTube, Apple Music, podcasts and more. Note: FaceTime, Zoom and WhatsApp calls are routed directly to hardware by macOS and bypass the pipeline.' },
  { q: 'Does it slow down my Mac?', a: 'No. QuanticHeartz uses less than 1% CPU with sub-millisecond latency. It runs silently — you won\'t notice it\'s there, except in how your music sounds.' },
  { q: 'Is there any audio quality loss?', a: 'Zero. Professional-grade pitch shifting algorithms. No artifacts, no speed changes, no distortion.' },
  { q: 'What\'s the difference between 440 Hz and 432 Hz?', a: '440 Hz is the international standard pitch adopted in 1953. 432 Hz is an alternative tuning that many find warmer and more natural. Research shows it can reduce heart rate and anxiety.' },
  { q: 'Does it work with Spotify, Apple Music, YouTube?', a: 'Yes — everything. QuanticHeartz operates at the system audio level. Any sound from your Mac gets retuned. No app-specific setup needed.' },
  { q: 'What macOS versions are supported?', a: 'macOS 13 (Ventura) and later, including Sonoma and Sequoia. Both Intel and Apple Silicon Macs are supported.' },
  { q: 'How does the 3-day trial work?', a: 'Download QuanticHeartz and get full access to all features for 3 days. After the trial, choose Monthly (€6.99), Yearly (€59.99), or Lifetime (€149.99).' },
  { q: 'Can I switch it on and off?', a: 'Yes. One click toggles QuanticHeartz on or off instantly. When off, audio plays at standard 440 Hz.' },
]

export default function FAQ() {
  const ref = useScrollReveal<HTMLElement>()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section ref={ref} id="faq" className="section-padding py-24 lg:py-40">
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
        <div data-reveal>
          <p className="label-text mb-4">FAQ</p>
          <h2 className="heading-lg" style={{ color: 'var(--text-primary)' }}>
            Questions &amp;<br />
            <span className="text-primary italic">answers.</span>
          </h2>
        </div>

        <div data-reveal>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="cursor-pointer group"
              style={{ borderTop: '1px solid var(--border)' }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between gap-4 py-5">
                <span className="text-[0.95rem] font-medium transition-colors" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>
                  {faq.q}
                </span>
                <span className="font-mono text-lg group-hover:text-primary transition-colors flex-shrink-0" style={{ color: 'var(--text-dim)' }}>
                  {open === i ? '−' : '+'}
                </span>
              </div>
              <div
                className="overflow-hidden transition-all duration-350"
                style={{ maxHeight: open === i ? '200px' : '0px' }}
              >
                <p className="body-md text-sm pb-5">{faq.a}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>
      </div>
    </section>
  )
}
