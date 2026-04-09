import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  {
    title: 'Real-Time',
    desc: 'No converting files. Every sound shifts the moment it plays.',
  },
  {
    title: 'System-Wide',
    desc: 'Spotify, YouTube, Apple Music, podcasts, calls — everything.',
  },
  {
    title: 'Zero Quality Loss',
    desc: 'Professional pitch shifting. No artifacts, no distortion.',
  },
  {
    title: 'Silent & Light',
    desc: 'Runs in background. Minimal CPU. Sub-millisecond latency.',
  },
]

export default function Solution() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="solution" className="section-padding py-24 lg:py-40">
      <div className="max-w-3xl mb-16" data-reveal>
        <p className="label-text mb-4">The Solution</p>
        <h2 className="heading-lg text-text mb-6">
          One click. Every sound becomes{' '}
          <span className="text-primary italic">432 Hz.</span>
        </h2>
        <p className="body-lg max-w-xl">
          QuanticHeartz is a macOS audio middleware that intercepts all system audio
          and retunes it in real time. No file conversion. No quality loss.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-reveal>
        {features.map((f, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-white/[0.04] bg-[radial-gradient(60%_80px_at_50%_0%,rgba(176,122,255,0.06),transparent)] p-8 transition-all duration-500 group hover:border-white/[0.08] hover:shadow-[0_0_40px_rgba(176,122,255,0.06)]"
          >
            <div className="absolute top-0 right-1/4 left-1/4 h-px rounded-full blur-sm bg-primary/20" />
            <div className="text-primary/40 font-mono text-xs mb-4">0{i + 1}</div>
            <h3 className="heading-sm text-text mb-3 group-hover:text-primary transition-colors duration-300">
              {f.title}
            </h3>
            <p className="body-md">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
