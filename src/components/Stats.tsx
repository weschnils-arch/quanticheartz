import { useScrollReveal } from '../hooks/useScrollReveal'

const stats = [
  { value: '432', unit: 'Hz', label: 'Natural frequency' },
  { value: '<1', unit: 'ms', label: 'Latency' },
  { value: '0%', unit: '', label: 'Quality loss' },
  { value: '∞', unit: '', label: 'Apps supported' },
]

export default function Stats() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="section-padding py-16 bg-dark-900/50">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {stats.map((s, i) => (
          <div key={i} data-reveal className="text-center">
            <div className="font-display text-3xl lg:text-5xl text-text tracking-tight mb-1">
              {s.value}
              <span className="text-primary text-lg lg:text-2xl ml-1">{s.unit}</span>
            </div>
            <p className="text-text-dim text-xs tracking-[0.1em] uppercase">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
