import { useScrollReveal } from '../hooks/useScrollReveal'

const studies = [
  {
    year: '2019',
    journal: 'Journal of Evidence-Based Integrative Medicine',
    title: 'Significant heart rate reduction',
    desc: 'Participants listening to 432 Hz music showed measurably lower heart rates. Subjects reported feeling "more satisfied and relaxed."',
    authors: 'Calamassi & Pomponi',
  },
  {
    year: '2023',
    journal: 'Frontiers in Psychology',
    title: 'Reduced clinical anxiety',
    desc: '432 Hz music reduced anxiety more effectively than 440 Hz in a controlled clinical setting with dental patients.',
    authors: 'Aravena et al.',
  },
  {
    year: '2022',
    journal: 'EEG Brain Activity Study',
    title: 'Distinct brain wave patterns',
    desc: 'EEG measurements revealed different brain wave responses between 432 Hz and 440 Hz, suggesting distinct neurological processing.',
    authors: 'Di Noto et al.',
  },
]

export default function Science() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="science" className="section-padding py-24 lg:py-40">
      <div className="text-center max-w-2xl mx-auto mb-16" data-reveal>
        <p className="label-text mb-4">The Science</p>
        <h2 className="heading-lg text-text mb-4">
          The research is emerging.
        </h2>
        <p className="body-lg">
          <span className="text-text-dim italic">The experience is undeniable.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" data-reveal>
        {studies.map((s, i) => (
          <div key={i} className="relative rounded-2xl border border-white/[0.04] bg-[radial-gradient(60%_80px_at_50%_0%,rgba(176,122,255,0.06),transparent)] p-8 transition-all duration-500 hover:border-white/[0.08] hover:shadow-[0_0_40px_rgba(176,122,255,0.06)]">
            <div className="absolute top-0 right-1/4 left-1/4 h-px rounded-full blur-sm bg-primary/20" />
            <div className="flex flex-col gap-1 mb-5">
              <span className="font-mono text-xs font-semibold text-primary">{s.year}</span>
              <span className="text-[0.65rem] text-text-dim italic">{s.journal}</span>
            </div>
            <h3 className="text-text font-medium text-[1.05rem] mb-3">{s.title}</h3>
            <p className="body-md text-sm mb-4">{s.desc}</p>
            <span className="font-mono text-[0.65rem] text-text-dim">{s.authors}</span>
          </div>
        ))}
      </div>

      <p className="text-center text-text-dim text-sm italic mt-8" data-reveal>
        We don't make medical claims. We make software that lets you hear the difference yourself.
      </p>
    </section>
  )
}
