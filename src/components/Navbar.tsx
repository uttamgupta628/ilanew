import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/images/logo.png';

const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Campaigns', href: '#campaigns' },
  { label: 'Who We Are', href: '#who-we-are' },
  { label: 'How To Help', href: '#how-to-help' },
  { label: 'News', href: 'https://iliberty.org.uk/news/' },
];

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17L17 7M17 7H9M17 7V15" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-paper">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-6 px-5 sm:px-8 py-5 sm:py-6">
        <a href="#top" className="flex items-center gap-3 font-serif text-lg font-medium tracking-tight shrink-0">
          <img src={logo} alt="ILA logo" className="w-8 h-8 shrink-0 object-contain" />
          <span className="hidden lg:inline">International Liberty Association</span>
          <span className="lg:hidden">ILA</span>
        </a>

        <ul className="hidden md:flex gap-7 text-[14.5px] font-medium text-paper/85">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:text-paper transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="https://iliberty.org.uk/donate-2/"
            className="hidden md:inline-flex group items-center gap-3 pl-5 pr-1.5 py-1.5 bg-gold text-ink rounded-full text-sm font-semibold hover:bg-gold-bright transition-colors"
          >
            Donate
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-ink text-gold group-hover:rotate-45 transition-transform duration-300">
              <ArrowIcon className="w-3.5 h-3.5" />
            </span>
          </a>
          <button aria-label="Menu" onClick={() => setOpen((v) => !v)} className="md:hidden p-1.5 text-paper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden flex flex-col gap-4 px-5 sm:px-8 pb-6 bg-ink/95 backdrop-blur-sm"
          >
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)} className="block text-[15px] font-medium text-paper">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://iliberty.org.uk/donate-2/"
                className="inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 bg-gold text-ink rounded-full text-sm font-semibold"
              >
                Donate
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-ink text-gold">
                  <ArrowIcon className="w-3.5 h-3.5" />
                </span>
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}