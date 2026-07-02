import { Instagram, Facebook, Youtube, Phone, Mail } from 'lucide-react'
import Container from './ui/Container'
import Logo from './ui/Logo'
import { SECTION_IDS, CONTACT } from '../lib/constants'

const footerLinks = [
  { label: 'Features', href: `#${SECTION_IDS.features}` },
  { label: 'Shorts', href: `#${SECTION_IDS.shorts}` },
  { label: 'Video', href: `#${SECTION_IDS.video}` },
  { label: 'Gallery', href: `#${SECTION_IDS.gallery}` },
  { label: 'Contact', href: `#${SECTION_IDS.quote}` },
]

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-matte py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo size="md" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Premium custom tow truck enclosures engineered for professionals who demand the best.
            </p>
          </div>

          {/* Quick nav */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-cyan"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-cyan"
                >
                  <Mail className="h-4 w-4" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl glass text-white/60 transition-colors hover:text-cyan"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/30">
          &copy; {year} PAPIS Enclosures. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
