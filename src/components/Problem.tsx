import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Problem() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="problem" className="section-padding py-24 lg:py-40">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
        <div data-reveal>
          <p className="label-text mb-4">The Problem</p>
          <h2 className="heading-lg" style={{ color: 'var(--text-primary)' }}>
            A=440 Hz has been the world's default since 1953.{' '}
            <span className="text-primary italic">Your body was never asked.</span>
          </h2>
        </div>

        <div className="space-y-6" data-reveal>
          <p className="body-md">
            The international standard was set to A=440 Hz — a frequency many researchers
            link to subtle tension and elevated stress. Before the standard, orchestras
            tuned to frequencies closer to natural resonance.
          </p>
          <p className="body-md">
            432 Hz is mathematically aligned with patterns found throughout nature.
            Studies show it reduces heart rate, lowers anxiety, and creates a deeper
            sense of calm. Your body is 60% water — the frequency running through
            your speakers shapes how you feel.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="relative rounded-2xl p-5" style={{ border: '1px solid var(--border)', background: `radial-gradient(60% 80px at 50% 0%, var(--glow), transparent)` }}>
              <div className="absolute top-0 right-1/4 left-1/4 h-px rounded-full blur-sm bg-primary/20" />
              <div className="text-2xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>440 Hz</div>
              <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-dim)' }}>Current Standard</p>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
                Tension &amp; dissonance
              </div>
            </div>
            <div className="relative rounded-2xl p-5" style={{ border: '1px solid rgba(176, 122, 255, 0.2)', background: `radial-gradient(60% 80px at 50% 0%, rgba(176,122,255,0.08), transparent)` }}>
              <div className="absolute top-0 right-1/4 left-1/4 h-px rounded-full blur-sm bg-primary/30" />
              <div className="text-2xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>432 Hz</div>
              <p className="text-primary/60 text-xs uppercase tracking-wider mb-3">Nature's Frequency</p>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_rgba(168,85,247,0.4)]" />
                Harmony &amp; resonance
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
