import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/images/logo.png";

type DropdownItem = {
  label: string;
  href: string;
};

type NavLink = {
  label: string;
  href: string;
  active?: boolean;
  hasChevron?: boolean;
  dropdown?: DropdownItem[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "#top", active: true },
  {
    label: "Campaigns",
    href: "#campaigns",
    hasChevron: true,
    dropdown: [
      { label: "Raising Awareness", href: "#raising-awareness" },
      { label: "Community Support", href: "#community-support" },
    ],
  },
  {
    label: "Who We Are",
    href: "#who-we-are",
    hasChevron: true,
    dropdown: [
      { label: "About Us", href: "#about-us" },
      { label: "Stories & Voices", href: "#stories-voices" },
      { label: "Contact Us", href: "#contact-us" },
      { label: "Feedback form", href: "#feedback-form" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    label: "How To Help",
    href: "#how-to-help",
    hasChevron: true,
    dropdown: [
      { label: "Leave a Legacy", href: "#leave-a-legacy" },
      { label: "Donate", href: "https://iliberty.org.uk/donate-2/" },
      { label: "Partnerships", href: "#partnerships" },
      { label: "Volunteer Form", href: "#volunteer-form" },
    ],
  },
  {
    label: "News & Updates",
    href: "https://iliberty.org.uk/news/",
  },
];

const RED = "#C8102E";
const BLUE = "#5B8DBE";

function ChevronIcon({ className = "" }: { className?: string }) {
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

function ChevronRightIcon({ className = "" }: { className?: string }) {
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
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
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
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  return (
    <header className="fixed inset-x-0 top-12 z-50 px-2 pt-2 sm:px-4 sm:pt-3 lg:px-5">
      {/* =====================================================
          NAVBAR CONTAINER
          overflow-visible so the oversized logo can spill out
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[90%]
          overflow-visible
          rounded-[24px]
          bg-paper
          px-3
          py-1
          shadow-[0_8px_35px_rgba(0,0,0,0.12)]
          sm:rounded-full
          sm:px-3.5
          sm:py-1
          lg:px-4
        "
      >
        {/* ===================================================
            MAIN NAV
        ==================================================== */}

        <div className="flex min-h-[54px] items-center justify-between gap-2">
          {/* =================================================
              LOGO
              Sized larger than the pill and allowed to overflow
              top/bottom via negative margins + z-index
          ================================================== */}

          <a
            href="#top"
            className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-2.5"
          >
            <img
              src={logo}
              alt="International Liberty Association"
              className="
    h-14
    w-14
    shrink-0
    object-contain
    -my-1.5
    sm:h-20
    sm:w-20
    -mx-5.5
    sm:-my-3
    lg:h-28
    lg:w-28
    lg:-my-4
  "
            />

            <span className="hidden flex-col font-serif leading-[1.02] sm:flex">
              <span
                style={{ color: BLUE }}
                className="text-[12px] font-semibold sm:text-[13px] lg:text-[14px]"
              >
                International
              </span>

              <span className="text-[12px] font-extrabold text-ink sm:text-[13px] lg:text-[14px]">
                Liberty
              </span>

              <span
                style={{ color: BLUE }}
                className="text-[12px] font-semibold sm:text-[13px] lg:text-[14px]"
              >
                Association
              </span>
            </span>
          </a>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <nav className="hidden xl:block">
            <ul className="flex items-center gap-4 2xl:gap-6">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.dropdown && setDesktopDropdown(link.label)
                  }
                  onMouseLeave={() =>
                    link.dropdown && setDesktopDropdown(null)
                  }
                >
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
                      ${link.active ? "" : "text-ink/80 hover:text-ink"}
                    `}
                  >
                    {link.label}

                    {link.hasChevron && (
                      <ChevronIcon
                        className={`
                          h-3.5
                          w-3.5
                          transition-transform
                          duration-200
                          ${
                            desktopDropdown === link.label
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />
                    )}
                  </a>

                  {/* ===========================================
                      DESKTOP DROPDOWN PANEL
                  ============================================ */}

                  {link.dropdown && (
                    <AnimatePresence>
                      {desktopDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="
                            absolute
                            left-1/2
                            top-full
                            z-20
                            mt-3
                            w-64
                            -translate-x-1/2
                            rounded-2xl
                            bg-white
                            p-3
                            shadow-[0_18px_45px_rgba(0,0,0,0.18)]
                          "
                        >
                          <ul>
                            {link.dropdown.map((item, index) => (
                              <li key={item.label}>
                                <a
                                  href={item.href}
                                  className={`
                                    flex
                                    items-center
                                    justify-between
                                    gap-2
                                    px-2
                                    py-2.5
                                    text-[15px]
                                    font-semibold
                                    text-ink
                                    transition-colors
                                    ${
                                      index !== link.dropdown!.length - 1
                                        ? "border-b border-ink/10"
                                        : ""
                                    }
                                  `}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = RED)
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "")
                                  }
                                >
                                  <span>{item.label}</span>
                                  <ChevronRightIcon className="h-4 w-4 shrink-0 opacity-60" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* =================================================
              DESKTOP ACTION BUTTONS
          ================================================== */}

          <div className="hidden shrink-0 items-center gap-2.5 xl:flex">
            {/* Donate */}

            <a
              href="https://iliberty.org.uk/donate-2/"
              className="
                group
                relative
                inline-flex
                items-center
                gap-3
                overflow-hidden
                rounded-full
                border
                border-maroon
                bg-white
                py-2.5
                pl-6
                pr-2.5
                text-[16px]
                font-semibold
                text-maroon
                transition-all
                duration-300
                hover:text-white
                2xl:py-3
                2xl:pl-7
                2xl:text-[17px]
              "
            >
              {/* Background animation starts from bottom */}
              <span
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-0
                  bg-[#C8102E]
                  transition-all
                  duration-500
                  ease-out
                  group-hover:h-full
                "
              />

              <span className="relative z-10">Donate</span>

              <span
                className="
                  relative
                  z-10
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-maroon/10
                  transition-all
                  duration-300
                  group-hover:rotate-45
                  group-hover:bg-white/20
                "
              >
                <ArrowIcon className="h-[18px] w-[18px]" />
              </span>
            </a>

            {/* Shop */}

            <a
              href="/shop"
              className="
                group
                relative
                inline-flex
                items-center
                overflow-hidden
                rounded-full
                border
                border-maroon
                bg-white
                px-7
                py-2.5
                text-[16px]
                font-semibold
                text-maroon
                transition-all
                duration-300
                hover:text-white
                2xl:px-8
                2xl:py-3
                2xl:text-[17px]
              "
            >
              {/* Background animation starts from bottom */}
              <span
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-0
                  bg-[#C8102E]
                  transition-all
                  duration-500
                  ease-out
                  group-hover:h-full
                "
              />

              <span className="relative z-10">Shop</span>
            </a>
          </div>

          {/* =================================================
              TABLET + MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="
              relative
              z-10
              flex
              h-10
              w-10
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
                height: "auto",
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
              <div className="border-t border-ink/10 pt-3">
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
                      {link.dropdown ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setMobileDropdown((current) =>
                                current === link.label ? null : link.label
                              )
                            }
                            style={link.active ? { color: RED } : undefined}
                            className={`
                              flex
                              w-full
                              items-center
                              justify-between
                              rounded-xl
                              px-3
                              py-2.5
                              text-[17px]
                              font-semibold
                              transition-colors
                              ${
                                link.active
                                  ? "bg-red-50"
                                  : "text-ink hover:bg-black/[0.04]"
                              }
                            `}
                          >
                            <span>{link.label}</span>

                            <ChevronIcon
                              className={`
                                h-4
                                w-4
                                opacity-60
                                transition-transform
                                duration-200
                                ${
                                  mobileDropdown === link.label
                                    ? "rotate-180"
                                    : ""
                                }
                              `}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {mobileDropdown === link.label && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.25,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="overflow-hidden pl-4"
                              >
                                {link.dropdown.map((item) => (
                                  <li key={item.label}>
                                    <a
                                      href={item.href}
                                      onClick={() => {
                                        setOpen(false);
                                        setMobileDropdown(null);
                                      }}
                                      className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-2
                                        rounded-xl
                                        px-3
                                        py-2.5
                                        text-[15px]
                                        font-semibold
                                        text-ink/85
                                        transition-colors
                                        hover:bg-black/[0.04]
                                      "
                                    >
                                      <span>{item.label}</span>
                                      <ChevronRightIcon className="h-3.5 w-3.5 opacity-50" />
                                    </a>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          style={link.active ? { color: RED } : undefined}
                          className={`
                            flex
                            items-center
                            justify-between
                            rounded-xl
                            px-3
                            py-2.5
                            text-[17px]
                            font-semibold
                            transition-colors
                            ${
                              link.active
                                ? "bg-red-50"
                                : "text-ink hover:bg-black/[0.04]"
                            }
                          `}
                        >
                          <span>{link.label}</span>
                        </a>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>

                {/* =================================================
                    MOBILE ACTION BUTTONS
                ================================================== */}

                <div className="mt-2 flex gap-2 border-t border-ink/10 pt-3">
                  <a
                    href="https://iliberty.org.uk/donate-2/"
                    className="
                      group
                      relative
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      overflow-hidden
                      rounded-full
                      border
                      border-maroon
                      bg-white
                      px-4
                      py-2.5
                      text-[15px]
                      font-semibold
                      text-maroon
                      transition-all
                      duration-300
                      hover:text-white
                    "
                  >
                    {/* Background animation starts from bottom */}
                    <span
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-0
                        bg-[#C8102E]
                        transition-all
                        duration-500
                        ease-out
                        group-hover:h-full
                      "
                    />

                    <span className="relative z-10">Donate</span>
                    <ArrowIcon className="relative z-10 h-3.5 w-3.5" />
                  </a>

                  <a
                    href="/shop"
                    className="
                      group
                      relative
                      flex
                      flex-1
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      border
                      border-maroon
                      bg-white
                      px-4
                      py-2.5
                      text-[15px]
                      font-semibold
                      text-maroon
                      transition-all
                      duration-300
                      hover:text-white
                    "
                  >
                    {/* Background animation starts from bottom */}
                    <span
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-0
                        bg-[#C8102E]
                        transition-all
                        duration-500
                        ease-out
                        group-hover:h-full
                      "
                    />

                    <span className="relative z-10">Shop</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}