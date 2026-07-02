import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Container from './ui/Container'
import Logo from './ui/Logo'
import Button from './ui/Button'
import { SECTION_IDS } from '../lib/constants'

const navLinks = [
  { label: 'Features', href: `#${SECTION_IDS.features}` },
  { label: 'Shorts', href: `#${SECTION_IDS.shorts}` },
  { label: 'Video', href: `#${SECTION_IDS.video}` },
  { label: 'Gallery', href: `#${SECTION_IDS.gallery}` },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-soft' : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Container as="nav" className="flex h-20 items-center justify-between">
        <a href={`#${SECTION_IDS.hero}`} aria-label="PAPIS Enclosures home">
          <Logo size="sm" />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Button href={`#${SECTION_IDS.quote}`} size="sm">
            Contact Us
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="rounded-xl glass p-2 text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <motion.div
          className="glass border-t border-white/10 md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Container className="flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-white/80"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button href={`#${SECTION_IDS.quote}`} size="md" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Button>
          </Container>
        </motion.div>
      )}
    </motion.header>
  )
}
