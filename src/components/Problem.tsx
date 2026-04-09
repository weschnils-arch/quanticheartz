import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Problem() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="problem" className="section-padding py-24 lg:py-40">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
        <div data-reveal>
          <p className="label-text mb-4">The Problem</p>
          <h2 className="heading-lg text-text">
            In 1953, they changed the frequency of{' '}
            <span className="text-primary italic">all music.</span>
          </h2>
        </div>

        <div className="space-y-6" data-reveal>
          <p className="body-md">
            The international standard was set to A=440 Hz — a frequency many researchers
            believe creates subtle tension and dissonance in the listener. Before 1953,
            orchestras tuned differently. Something was lost.
          </p>
          <p className="body-md">
            432 Hz is mathematically aligned with patterns found throughout nature.
            Studies show it reduces heart rate, lowers anxiety, and creates a deeper
            sense of calm. Your body is 60% water — the frequency running through
            your speakers shapes how you feel.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="relative rounded-2xl border border-white/[0.04] bg-[radial-gradient(60%_80px_at_50%_0%,rgba(176,122,255,0.06),transparent)] p-5">
              <div className="absolute top-0 right-1/4 left-1/4 h-px rounded-full blur-sm bg-primary/20" />
              <div className="text-2xl font-semibold text-text mb-1">440 Hz</div>
              <p className="text-text-dim text-xs uppercase tracking-wider mb-3">Current Standard</p>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
                Tension &amp; dissonance
              </div>
            </div>
            <div className="relative rounded-2xl border border-primary/20 bg-[radial-gradient(60%_80px_at_50%_0%,rgba(176,122,255,0.08),transparent)] p-5">
              <div className="absolute top-0 right-1/4 left-1/4 h-px rounded-full blur-sm bg-primary/30" />
              <div className="text-2xl font-semibold text-text mb-1">432 Hz</div>
              <p className="text-primary/60 text-xs uppercase tracking-wider mb-3">Nature's Frequency</p>
              <div className="flex items-center gap-2 text-sm text-text-muted">
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
