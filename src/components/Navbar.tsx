import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/images/logo.png';

const navLinks = [
  { label: 'Home', href: '#top', active: true },
  { label: 'Campaigns', href: '#campaigns', hasChevron: true },
  { label: 'Who We Are', href: '#who-we-are', hasChevron: true },
  { label: 'How To Help', href: '#how-to-help', hasChevron: true },
  { label: 'News & Updates', href: 'https://iliberty.org.uk/news/' },
];

const RED = '#C8102E';
const BLUE = '#5B8DBE';

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-4 sm:pt-6 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto bg-paper rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between gap-6">
          {/* brand — stacked, color-matched */}
          <a href="#top" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="ILA logo" className="w-14 h-14 shrink-0 object-contain" />
            <span className="hidden sm:flex flex-col leading-[1.15] font-serif">
              <span style={{ color: BLUE }} className="text-[13px] font-semibold">
                International
              </span>
              <span className="text-ink text-[13px] font-extrabold">Liberty</span>
              <span style={{ color: BLUE }} className="text-[13px] font-semibold">
                Association
              </span>
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-7 text-[15px] font-semibold">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  style={l.active ? { color: RED } : undefined}
                  className={`inline-flex items-center gap-1 transition-colors ${
                    l.active ? '' : 'text-ink/80 hover:text-ink'
                  }`}
                >
                  {l.label}
                  {l.hasChevron && <ChevronIcon className="w-4 h-4" />}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://iliberty.org.uk/donate-2/"
              style={{ backgroundColor: RED }}
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 text-white rounded-full text-[15px] font-semibold hover:opacity-90 transition-opacity"
            >
              Donate
              <ArrowIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="/shop"
              style={{ color: RED, borderColor: RED }}
              className="hidden md:inline-flex items-center px-5 py-2.5 border rounded-full text-[15px] font-semibold hover:bg-black/[0.03] transition-colors"
            >
              Shop
            </a>
            <button aria-label="Menu" onClick={() => setOpen((v) => !v)} className="md:hidden p-2 text-ink">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
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
              className="md:hidden overflow-hidden flex flex-col gap-4 pt-4 pb-2"
            >
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={l.active ? { color: RED } : undefined}
                    className={`inline-flex items-center gap-1 text-[15px] font-semibold ${l.active ? '' : 'text-ink'}`}
                  >
                    {l.label}
                    {l.hasChevron && <ChevronIcon className="w-4 h-4" />}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3 pt-2">
                <a
                  href="https://iliberty.org.uk/donate-2/"
                  style={{ backgroundColor: RED }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-white rounded-full text-[15px] font-semibold"
                >
                  Donate
                  <ArrowIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="/shop"
                  style={{ color: RED, borderColor: RED }}
                  className="inline-flex items-center px-5 py-2.5 border rounded-full text-[15px] font-semibold"
                >
                  Shop
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}