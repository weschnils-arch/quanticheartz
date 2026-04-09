import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  {
    num: '01',
    title: 'Install',
    desc: 'Download the DMG, drag to Applications. The app sets up its virtual audio driver automatically on first launch.',
    code: 'QuanticHeartz.dmg → /Applications → done',
  },
  {
    num: '02',
    title: 'Toggle',
    desc: 'Hit the power button. QuanticHeartz routes all system audio through its pitch engine — shifting everything down by 31.77 cents from 440 Hz to 432 Hz.',
    code: 'routing: active · shift: -31.77 cents · 440→432 Hz',
  },
  {
    num: '03',
    title: 'Listen',
    desc: 'Every app on your Mac now outputs 432 Hz. All audio passes through the converter and out to your speakers or headphones.',
    code: '♪ all apps → pitch engine → your speakers · A=432 Hz',
  },
]

export default function HowItWorks() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="how-it-works" className="section-padding py-24 lg:py-40">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
        <div data-reveal>
          <p className="label-text mb-4">How It Works</p>
          <h2 className="heading-lg text-text">
            Three steps.
            <br />
            <span className="text-primary italic">Zero effort.</span>
          </h2>
        </div>

        <div className="space-y-0" data-reveal>
          {steps.map((s, i) => (
            <div key={i} className="flex gap-6 relative pb-10 last:pb-0">
              <div className="flex flex-col items-center">
                <span className="font-mono text-xs text-primary/50 mb-2">{s.num}</span>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-white/[0.06]" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="heading-sm text-text mb-2">{s.title}</h3>
                <p className="body-md mb-3">{s.desc}</p>
                <code className="inline-block font-mono text-xs text-primary/50 bg-[radial-gradient(60%_40px_at_50%_0%,rgba(176,122,255,0.04),transparent)] border border-white/[0.04] px-3 py-1.5 rounded-lg">
                  {s.code}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
