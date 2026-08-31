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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-[#76aece] text-white/90 text-[13px]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-4 py-2">
          <div className="flex gap-6">
            <a href="tel:02084523481" className="hover:text-white transition-colors">
              020 8452 3481
            </a>
            <a href="mailto:info@iliberty.org.uk" className="hover:text-white transition-colors">
              info@iliberty.org.uk
            </a>
          </div>
          <div className="flex gap-6">
            <a href="https://x.com/ilibertyassoc" className="hover:text-white transition-colors">X</a>
            <a href="https://www.instagram.com/iliberty.a/" className="hover:text-white transition-colors">Instagram</a>
            <a
              href="https://www.facebook.com/people/International-Liberty-Association/61582798858498/"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/10 text-ink shadow-sm">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-6 py-4">
          <a href="#top" className="flex items-center gap-3 font-serif text-lg sm:text-xl font-medium tracking-tight">
            <img src={logo} alt="ILA logo" className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 object-contain" />
            <span className="hidden sm:inline">International Liberty Association</span>
            <span className="sm:hidden">ILA</span>
          </a>

          <ul className="hidden md:flex gap-8 text-[15px]">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="relative py-1.5 group">
                  {l.label}
                  <span className="absolute left-0 right-full bottom-0 h-px bg-maroon transition-all duration-300 group-hover:right-0" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3.5">
            <a
              href="https://international-liberty-association.myshopify.com/collections/all"
              className="hidden md:inline-flex items-center px-5 py-2.5 border border-black/15 rounded-sm text-sm font-medium hover:border-maroon hover:text-maroon transition-colors"
            >
              Shop
            </a>
            <a
              href="https://iliberty.org.uk/donate-2/"
              className="inline-flex items-center px-5 py-2.5 bg-maroon text-paper rounded-sm text-sm font-medium hover:bg-[#8a352b] hover:-translate-y-0.5 transition-all"
            >
              Donate
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-1.5"
            >
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
              className="md:hidden overflow-hidden flex flex-col gap-4 px-5 pb-6 border-b border-black/10"
            >
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block text-[15px]">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://international-liberty-association.myshopify.com/collections/all"
                  className="inline-flex items-center px-4 py-2 border border-black/15 rounded-sm text-sm"
                >
                  Shop
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}