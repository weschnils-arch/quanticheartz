import React from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CameraIcon, MailIcon, DownloadIcon, HeadphonesIcon } from 'lucide-react'

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    label: 'Product',
    links: [
      { title: 'How it works', href: '#how-it-works' },
      { title: 'Pricing', href: '#pricing' },
      { title: 'Science', href: '#science' },
      { title: 'FAQ', href: '#faq' },
    ],
  },
  {
    label: 'Company',
    links: [
      { title: 'About', href: '#' },
      { title: 'Privacy Policy', href: '#' },
      { title: 'Terms of Service', href: '#' },
    ],
  },
  {
    label: 'Connect',
    links: [
      { title: 'Instagram', href: 'https://instagram.com/quanticheartz', icon: CameraIcon },
      { title: 'Contact', href: 'mailto:support@quanticheartz.io', icon: MailIcon },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative w-full flex flex-col items-center justify-center border-t border-white/[0.04] bg-[radial-gradient(35%_128px_at_50%_0%,rgba(176,122,255,0.06),transparent)] px-6 py-12 lg:px-16 lg:py-16">
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur bg-primary/20" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <HeadphonesIcon className="size-8 text-primary" />
          <h3 className="text-text text-sm font-medium tracking-[0.1em]">QUANTIC HEARTZ</h3>
          <p className="text-text-muted text-sm italic">Retune your reality.</p>
          <p className="text-text-dim mt-8 text-xs md:mt-0">
            © {new Date().getFullYear()} QuanticHeartz. All rights reserved.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs text-text-muted font-medium tracking-[0.15em] uppercase">{section.label}</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-text-dim hover:text-primary inline-flex items-center transition-all duration-300"
                      >
                        {link.icon && <link.icon className="me-1.5 size-3.5" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}

          {/* Download CTA column */}
          <AnimatedContainer delay={0.4}>
            <div className="mb-10 md:mb-0">
              <h3 className="text-xs text-text-muted font-medium tracking-[0.15em] uppercase">Get Started</h3>
              <div className="mt-4 space-y-3">
                <a
                  href="https://api.quanticheartz.io/api/download/app"
                  className="btn-primary text-xs inline-flex"
                >
                  <DownloadIcon className="size-3.5" />
                  Download for macOS
                </a>
                <p className="text-text-dim text-xs">3-day free trial. Cancel anytime.</p>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </footer>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>['className']
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
