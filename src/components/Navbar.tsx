import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/80 backdrop-blur-2xl border-b border-white/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding flex items-center justify-between h-16 lg:h-20">
        <a href="#" className="label-text text-text tracking-[0.15em] text-xs">
          QUANTIC HEARTZ
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {['Problem', 'Solution', 'How it works', 'Science', 'Pricing', 'FAQ'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-text-muted text-[0.75rem] tracking-[0.05em] uppercase hover:text-primary transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <a href="https://api.quanticheartz.io/api/download/app" className="btn-primary">
            Download
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-5 h-px bg-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`w-5 h-px bg-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-dark/95 backdrop-blur-2xl border-t border-white/[0.04] px-6 pb-8 pt-4">
          <div className="flex flex-col gap-4">
            {['Problem', 'Solution', 'How it works', 'Science', 'Pricing', 'FAQ'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-text-muted text-sm tracking-wide uppercase hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a href="https://api.quanticheartz.io/api/download/app" className="btn-primary mt-2 w-fit">
              Download
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
