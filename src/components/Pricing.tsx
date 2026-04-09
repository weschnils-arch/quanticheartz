import { useScrollReveal } from '../hooks/useScrollReveal'

const plans = [
  {
    name: 'Monthly',
    desc: 'Cancel anytime',
    price: '6.99',
    period: '/month',
    features: ['Unlimited 432 Hz access', 'Ultra-low latency processing', 'Professional audio quality', 'Lifetime updates included'],
    cta: 'Start Monthly',
    highlight: false,
    badge: null,
  },
  {
    name: 'Yearly',
    desc: 'Billed annually',
    price: '59.99',
    period: '/year',
    features: ['Unlimited 432 Hz access', 'Ultra-low latency processing', 'Professional audio quality', 'Lifetime updates included'],
    cta: 'Get Yearly Plan',
    highlight: false,
    badge: 'SAVE 25%',
  },
  {
    name: 'Lifetime',
    desc: 'One-time payment, forever',
    price: '149.99',
    period: '/once',
    features: ['Unlimited 432 Hz access', 'Ultra-low latency processing', 'Professional audio quality', 'Lifetime updates included'],
    cta: 'Get Lifetime Access',
    highlight: true,
    badge: 'BEST CHOICE',
  },
]

export default function Pricing() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="pricing" className="section-padding py-24 lg:py-40">
      <div className="text-center max-w-2xl mx-auto mb-16" data-reveal>
        <p className="label-text mb-4">Pricing</p>
        <h2 className="heading-lg text-text mb-4">
          Choose your <span className="text-primary italic">frequency.</span>
        </h2>
        <p className="body-lg">Unlimited access to 432 Hz frequency.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-4xl mx-auto" data-reveal>
        {plans.map((p, i) => (
          <div
            key={i}
            className={`relative rounded-2xl border bg-[radial-gradient(60%_80px_at_50%_0%,rgba(176,122,255,0.06),transparent)] p-8 flex flex-col transition-all duration-300 hover:border-white/[0.08] hover:shadow-[0_0_40px_rgba(176,122,255,0.06)] ${
              p.highlight ? 'border-primary/20' : 'border-white/[0.04]'
            }`}
          >
            <div className={`absolute top-0 right-1/4 left-1/4 h-px rounded-full blur-sm ${p.highlight ? 'bg-primary/30' : 'bg-primary/20'}`} />
            {p.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-dark text-[0.6rem] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full">
                {p.badge}
              </span>
            )}
            <div className="mb-6">
              <h3 className="text-text font-medium text-lg">{p.name}</h3>
              <p className="text-text-dim text-xs">{p.desc}</p>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-text text-4xl font-bold tracking-tight">€{p.price}</span>
              <span className="text-text-dim text-sm">{p.period}</span>
            </div>
            <ul className="flex-1 space-y-3 mb-8">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-text-muted text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="https://api.quanticheartz.io/api/download/app"
              className={p.highlight ? 'btn-primary w-full justify-center' : 'btn-outline w-full justify-center'}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
