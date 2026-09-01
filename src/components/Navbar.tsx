import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/images/logo.png';

const navLinks = [
  { label: 'Home', href: '#top', active: true },
  { label: 'Campaigns', href: '#campaigns', hasChevron: true },
  { label: 'Who We Are', href: '#who-we-are', hasChevron: true },
  { label: 'How To Help', href: '#how-to-help', hasChevron: true },
  {
    label: 'News & Updates',
    href: 'https://iliberty.org.uk/news/',
  },
];

const RED = '#C8102E';
const BLUE = '#5B8DBE';

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-10 z-50 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6">
      {/* =====================================================
          NAVBAR CONTAINER
      ====================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[90%]
          rounded-[28px]
          bg-paper
          px-4
          py-3
          shadow-[0_8px_35px_rgba(0,0,0,0.12)]
          sm:rounded-full
          sm:px-5
          sm:py-3
          lg:px-6
        "
      >
        {/* ===================================================
            MAIN NAV
        ==================================================== */}

        <div className="flex min-h-[58px] items-center justify-between gap-3">
          {/* =================================================
              LOGO
          ================================================== */}

          <a
            href="#top"
            className="flex shrink-0 items-center gap-2.5 sm:gap-3"
          >
            <img
              src={logo}
              alt="International Liberty Association"
              className="
                h-11
                w-11
                shrink-0
                object-contain
                sm:h-12
                sm:w-12
                lg:h-14
                lg:w-14
              "
            />

            <span className="hidden flex-col font-serif leading-[1.08] sm:flex">
              <span
                style={{ color: BLUE }}
                className="text-[13px] font-semibold sm:text-[14px] lg:text-[15px]"
              >
                International
              </span>

              <span className="text-[13px] font-extrabold text-ink sm:text-[14px] lg:text-[15px]">
                Liberty
              </span>

              <span
                style={{ color: BLUE }}
                className="text-[13px] font-semibold sm:text-[14px] lg:text-[15px]"
              >
                Association
              </span>
            </span>
          </a>

          {/* =================================================
              DESKTOP NAVIGATION
              xl = 1280px
          ================================================== */}

          <nav className="hidden xl:block">
            <ul className="flex items-center gap-5 2xl:gap-7">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={link.active ? { color: RED } : undefined}
                    className={`
                      inline-flex
                      items-center
                      gap-1
                      whitespace-nowrap
                      text-[15px]
                      font-semibold
                      transition-colors
                      duration-200
                      2xl:text-[16px]
                      ${
                        link.active
                          ? ''
                          : 'text-ink/80 hover:text-ink'
                      }
                    `}
                  >
                    {link.label}

                    {link.hasChevron && (
                      <ChevronIcon className="h-3.5 w-3.5" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* =================================================
              DESKTOP ACTION BUTTONS
          ================================================== */}

          <div className="hidden shrink-0 items-center gap-2.5 xl:flex">
            {/* Donate */}
            <motion.a
              href="https://iliberty.org.uk/donate-2/"
              style={{ backgroundColor: RED }}
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                px-4
                py-3
                text-[15px]
                font-semibold
                text-white
                transition-opacity
                hover:opacity-90
                2xl:px-5
              "
            >
              Donate

              <ArrowIcon className="h-3.5 w-3.5" />
            </motion.a>

            {/* Shop */}
            <motion.a
              href="/shop"
              style={{
                color: RED,
                borderColor: RED,
              }}
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                inline-flex
                items-center
                rounded-full
                border
                px-5
                py-3
                text-[15px]
                font-semibold
                transition-colors
                hover:bg-black/[0.03]
                2xl:px-6
              "
            >
              Shop
            </motion.a>
          </div>

          {/* =================================================
              TABLET + MOBILE MENU BUTTON
              
              Important:
              xl:hidden means hamburger remains visible
              until 1280px.
          ================================================== */}

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              text-ink
              transition-colors
              hover:bg-black/[0.05]
              xl:hidden
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.svg
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* =====================================================
            MOBILE / TABLET MENU
        ====================================================== */}

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden xl:hidden"
            >
              <div className="border-t border-ink/10 pt-4">
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-1"
                >
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.label}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        style={
                          link.active
                            ? { color: RED }
                            : undefined
                        }
                        className={`
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          px-3
                          py-3
                          text-[16px]
                          font-semibold
                          transition-colors
                          ${
                            link.active
                              ? 'bg-red-50'
                              : 'text-ink hover:bg-black/[0.04]'
                          }
                        `}
                      >
                        <span>{link.label}</span>

                        {link.hasChevron && (
                          <ChevronIcon className="h-4 w-4 opacity-60" />
                        )}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* =================================================
                    MOBILE ACTION BUTTONS
                ================================================== */}

                <div className="mt-3 flex gap-2 border-t border-ink/10 pt-4">
                  <motion.a
                    href="https://iliberty.org.uk/donate-2/"
                    style={{
                      backgroundColor: RED,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      px-4
                      py-3
                      text-[15px]
                      font-semibold
                      text-white
                    "
                  >
                    Donate
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </motion.a>

                  <motion.a
                    href="/shop"
                    style={{
                      color: RED,
                      borderColor: RED,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      rounded-full
                      border
                      px-4
                      py-3
                      text-[15px]
                      font-semibold
                    "
                  >
                    Shop
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}