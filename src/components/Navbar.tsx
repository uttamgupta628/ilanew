import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";

/* =========================================================
   TYPES
========================================================= */

type DropdownItem = {
  label: string;
  href: string;
  children?: DropdownItem[];
};

type NavLink = {
  label: string;
  href: string;
  active?: boolean;
  hasChevron?: boolean;
  dropdown?: DropdownItem[];
};

/* =========================================================
   NAVIGATION LINKS
========================================================= */

const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "#top",
    active: true,
  },

  /* =======================================================
     CAMPAIGNS
  ======================================================= */

  {
    label: "Campaigns",
    href: "#campaigns",
    hasChevron: true,

    dropdown: [
      {
        label: "Raising Awareness",
        href: "#raising-awareness",

        children: [
          {
            label: "Stopping Executions. Defending the Vulnerable",
            href: "/stopping-executions",
          },
          {
            label: "Children’s Rights",
            href: "/childrens-rights",
          },
        ],
      },

      {
        label: "Community Support",
        href: "#community-support",
      },
    ],
  },

  /* =======================================================
     WHO WE ARE
  ======================================================= */

  {
    label: "Who We Are",
    href: "#who-we-are",
    hasChevron: true,

    dropdown: [
      {
        label: "About Us",
        href: "/about",
      },
      {
        label: "Stories & Voices",
        href: "/stories",
      },
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Feedback form",
        href: "/feedback",
      },
      {
        label: "FAQ",
        href: "/faq",
      },
    ],
  },

  /* =======================================================
     HOW TO HELP
  ======================================================= */

  {
    label: "How To Help",
    href: "#how-to-help",
    hasChevron: true,

    dropdown: [
      {
        label: "Leave a Legacy",
        href: "#leave-a-legacy",
      },
      {
        label: "Donate",
        href: "https://iliberty.org.uk/donate-2/",
      },
      {
        label: "Partnerships",
        href: "#partnerships",
      },
      {
        label: "Volunteer Form",
        href: "#volunteer-form",
      },
    ],
  },

  /* =======================================================
     NEWS
  ======================================================= */

  {
    label: "News & Updates",
    href: "https://iliberty.org.uk/news/",
  },
];

/* =========================================================
   COLORS
========================================================= */

const RED = "#C8102E";
const BLUE = "#5B8DBE";

/* =========================================================
   CHEVRON DOWN
========================================================= */

function ChevronIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* =========================================================
   CHEVRON RIGHT
========================================================= */

function ChevronRightIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/* =========================================================
   ARROW
========================================================= */

function ArrowIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* =========================================================
   SMART LINK

   - http:// or https://
       -> normal anchor
       -> opens new tab

   - #section
       -> jumps to section on home
       -> goes to /#section from another page

   - /about, /stories, etc.
       -> React Router Link
========================================================= */

function SmartLink({
  href,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => void;
  onMouseLeave?: (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => void;
  children: React.ReactNode;
}) {
  const location = useLocation();

  /* =======================================================
     EXTERNAL LINK
  ======================================================= */

  if (
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </a>
    );
  }

  /* =======================================================
     HASH LINK
  ======================================================= */

  if (href.startsWith("#")) {
    const target =
      location.pathname === "/"
        ? href
        : `/${href}`;

    return (
      <a
        href={target}
        className={className}
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </a>
    );
  }

  /* =======================================================
     REACT ROUTER LINK
  ======================================================= */

  return (
    <Link
      to={href}
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [desktopDropdown, setDesktopDropdown] =
    useState<string | null>(null);

  const [desktopSubDropdown, setDesktopSubDropdown] =
    useState<string | null>(null);

  const [mobileDropdown, setMobileDropdown] =
    useState<string | null>(null);

  const [mobileSubDropdown, setMobileSubDropdown] =
    useState<string | null>(null);

  return (
    <header
      className="
        fixed
        inset-x-0
        top-12
        z-50
        w-full
        px-2
        pt-2
        sm:px-4
        sm:pt-3
        lg:px-5
      "
    >
      {/* =====================================================
          NAVBAR CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[90%]
          min-w-0
          overflow-visible
          rounded-[24px]
          bg-paper
          px-2
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

        <div
          className="
            flex
            min-h-[54px]
            min-w-0
            items-center
            justify-between
            gap-1
          "
        >
          {/* =================================================
              LOGO
          ================================================== */}

          <SmartLink
            href="#top"
            className="
              relative
              z-10
              flex
              min-w-0
              shrink
              items-center
              gap-2
              sm:gap-2.5
            "
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
                sm:-mx-5.5
                sm:-my-3
                lg:h-28
                lg:w-28
                lg:-my-4
              "
            />

            <span
              className="
                hidden
                flex-col
                font-serif
                leading-[1.02]
                sm:flex
              "
            >
              <span
                style={{ color: BLUE }}
                className="
                  text-[12px]
                  font-semibold
                  sm:text-[13px]
                  lg:text-[14px]
                "
              >
                International
              </span>

              <span
                className="
                  text-[12px]
                  font-extrabold
                  text-ink
                  sm:text-[13px]
                  lg:text-[14px]
                "
              >
                Liberty
              </span>

              <span
                style={{ color: BLUE }}
                className="
                  text-[12px]
                  font-semibold
                  sm:text-[13px]
                  lg:text-[14px]
                "
              >
                Association
              </span>
            </span>
          </SmartLink>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <nav className="hidden xl:block">
            <ul className="flex items-center gap-4 2xl:gap-6">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (link.dropdown) {
                      setDesktopDropdown(link.label);
                      setDesktopSubDropdown(null);
                    }
                  }}
                  onMouseLeave={() => {
                    if (link.dropdown) {
                      setDesktopDropdown(null);
                      setDesktopSubDropdown(null);
                    }
                  }}
                >
                  {/* =========================================
                      MAIN NAV LINK
                  ========================================== */}

                  <SmartLink
                    href={link.href}
                    style={
                      link.active
                        ? { color: RED }
                        : undefined
                    }
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
                          ? ""
                          : "text-ink/80 hover:text-ink"
                      }
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
                            desktopDropdown ===
                            link.label
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />
                    )}
                  </SmartLink>

                 {/* =========================================
    FIRST LEVEL DROPDOWN
========================================== */}

{link.dropdown && (
  <AnimatePresence>
    {desktopDropdown === link.label && (
      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 8,
        }}
        transition={{
          duration: 0.18,
          ease: "easeOut",
        }}
        /*
          IMPORTANT:
          Do NOT use mt-3 here.

          Instead we use pt-3 on the wrapper.
          This keeps the dropdown visually 12px below
          the navbar while maintaining a hover bridge.
        */
        className="
          absolute
          left-1/2
          top-full
          z-50
          -translate-x-1/2
          pt-3
        "
      >
        {/* Actual dropdown box */}
        <div
          className="
            w-64
            rounded-2xl
            bg-white
            p-3
            shadow-[0_18px_45px_rgba(0,0,0,0.18)]
          "
        >
          <ul>
            {link.dropdown.map((item, index) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  if (item.children) {
                    setDesktopSubDropdown(item.label);
                  } else {
                    setDesktopSubDropdown(null);
                  }
                }}
              >
                {/* =====================================
                    FIRST LEVEL ITEM
                ====================================== */}

                <SmartLink
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
                    duration-200
                    ${
                      index !==
                      link.dropdown!.length - 1
                        ? "border-b border-ink/10"
                        : ""
                    }
                  `}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = RED;

                    if (item.children) {
                      setDesktopSubDropdown(item.label);
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                  }}
                >
                  <span>{item.label}</span>

                  {/* Right arrow */}
                  {item.children && (
                    <ChevronRightIcon
                      className="
                        h-4
                        w-4
                        shrink-0
                        opacity-60
                      "
                    />
                  )}
                </SmartLink>

                {/* =====================================
                    SECOND LEVEL DROPDOWN
                ====================================== */}

                {item.children && (
                  <AnimatePresence>
                    {desktopSubDropdown === item.label && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -10,
                        }}
                        transition={{
                          duration: 0.18,
                          ease: "easeOut",
                        }}
                        /*
                          IMPORTANT:
                          The submenu is attached directly
                          to the parent item.

                          No gap means mouse can move from
                          Raising Awareness -> submenu.
                        */
                        className="
                          absolute
                          left-full
                          top-0
                          z-[60]
                          ml-1
                          w-[34rem]
                          rounded-2xl
                          bg-white
                          p-3
                          shadow-[0_18px_45px_rgba(0,0,0,0.18)]
                        "
                        onMouseEnter={() => {
                          setDesktopSubDropdown(item.label);
                        }}
                        onMouseLeave={() => {
                          setDesktopSubDropdown(null);
                        }}
                      >
                        <ul>
                          {item.children.map(
                            (child, childIndex) => (
                              <li
                                key={child.label}
                              >
                                <SmartLink
                                  href={child.href}
                                  className={`
                                    flex
                                    items-center
                                    justify-between
                                    gap-2
                                    px-2
                                    py-2.5
                                    text-[15px]
                                    font-semibold
                                    transition-colors
                                    duration-200
                                    ${
                                      childIndex === 0
                                        ? "text-[#C8102E]"
                                        : "text-ink"
                                    }
                                    ${
                                      childIndex !==
                                      item.children!.length - 1
                                        ? "border-b border-ink/10"
                                        : ""
                                    }
                                  `}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.color =
                                      RED;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.color =
                                      childIndex === 0
                                        ? RED
                                        : "";
                                  }}
                                >
                                  <span>
                                    {child.label}
                                  </span>

                                  <ChevronRightIcon
                                    className="
                                      h-4
                                      w-4
                                      shrink-0
                                      opacity-60
                                    "
                                  />
                                </SmartLink>
                              </li>
                            )
                          )}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>
        </div>
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

          <div
            className="
              hidden
              shrink-0
              items-center
              gap-2.5
              xl:flex
            "
          >
            {/* ===============================================
                DONATE
            ================================================ */}

            <SmartLink
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

              <span className="relative z-10">
                Donate
              </span>

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
            </SmartLink>

            {/* ===============================================
                SHOP
            ================================================ */}

            <SmartLink
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

              <span className="relative z-10">
                Shop
              </span>
            </SmartLink>
          </div>

          {/* =================================================
              TABLET + MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            aria-label={
              open ? "Close menu" : "Open menu"
            }
            aria-expanded={open}
            onClick={() => {
              setOpen((value) => !value);

              if (open) {
                setMobileDropdown(null);
                setMobileSubDropdown(null);
              }
            }}
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
            <AnimatePresence
              mode="wait"
              initial={false}
            >
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
                  {navLinks.map(
                    (link, index) => (
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
                        {/* ===================================
                            LINK WITH DROPDOWN
                        ==================================== */}

                        {link.dropdown ? (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                setMobileDropdown(
                                  (current) =>
                                    current ===
                                    link.label
                                      ? null
                                      : link.label
                                )
                              }
                              style={
                                link.active
                                  ? {
                                      color: RED,
                                    }
                                  : undefined
                              }
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
                              <span>
                                {link.label}
                              </span>

                              <ChevronIcon
                                className={`
                                  h-4
                                  w-4
                                  opacity-60
                                  transition-transform
                                  duration-200
                                  ${
                                    mobileDropdown ===
                                    link.label
                                      ? "rotate-180"
                                      : ""
                                  }
                                `}
                              />
                            </button>

                            {/* =================================
                                FIRST MOBILE DROPDOWN
                            ================================== */}

                            <AnimatePresence
                              initial={false}
                            >
                              {mobileDropdown ===
                                link.label && (
                                <motion.ul
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
                                    duration: 0.25,
                                    ease: [
                                      0.22,
                                      1,
                                      0.36,
                                      1,
                                    ],
                                  }}
                                  className="
                                    overflow-hidden
                                    pl-4
                                  "
                                >
                                  {link.dropdown.map(
                                    (item) => (
                                      <li
                                        key={
                                          item.label
                                        }
                                      >
                                        {/* =========================
                                            ITEM HAS CHILDREN
                                        ========================== */}

                                        {item.children ? (
                                          <>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setMobileSubDropdown(
                                                  (
                                                    current
                                                  ) =>
                                                    current ===
                                                    item.label
                                                      ? null
                                                      : item.label
                                                )
                                              }
                                              className="
                                                flex
                                                w-full
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
                                              <span>
                                                {
                                                  item.label
                                                }
                                              </span>

                                              <ChevronIcon
                                                className={`
                                                  h-3.5
                                                  w-3.5
                                                  opacity-50
                                                  transition-transform
                                                  ${
                                                    mobileSubDropdown ===
                                                    item.label
                                                      ? "rotate-180"
                                                      : ""
                                                  }
                                                `}
                                              />
                                            </button>

                                            {/* =====================
                                                SECOND MOBILE LEVEL
                                            ====================== */}

                                            <AnimatePresence
                                              initial={
                                                false
                                              }
                                            >
                                              {mobileSubDropdown ===
                                                item.label && (
                                                <motion.ul
                                                  initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                  }}
                                                  animate={{
                                                    height:
                                                      "auto",
                                                    opacity: 1,
                                                  }}
                                                  exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                  }}
                                                  transition={{
                                                    duration:
                                                      0.25,
                                                  }}
                                                  className="
                                                    overflow-hidden
                                                    pl-4
                                                  "
                                                >
                                                  {item.children.map(
                                                    (
                                                      child
                                                    ) => (
                                                      <li
                                                        key={
                                                          child.label
                                                        }
                                                      >
                                                        <SmartLink
                                                          href={
                                                            child.href
                                                          }
                                                          onClick={() => {
                                                            setOpen(
                                                              false
                                                            );
                                                            setMobileDropdown(
                                                              null
                                                            );
                                                            setMobileSubDropdown(
                                                              null
                                                            );
                                                          }}
                                                          className="
                                                            flex
                                                            items-center
                                                            justify-between
                                                            gap-2
                                                            rounded-xl
                                                            px-3
                                                            py-2.5
                                                            text-[14px]
                                                            font-semibold
                                                            text-ink/75
                                                            transition-colors
                                                            hover:bg-black/[0.04]
                                                            hover:text-[#C8102E]
                                                          "
                                                        >
                                                          <span>
                                                            {
                                                              child.label
                                                            }
                                                          </span>

                                                          <ChevronRightIcon
                                                            className="
                                                              h-3.5
                                                              w-3.5
                                                              opacity-50
                                                            "
                                                          />
                                                        </SmartLink>
                                                      </li>
                                                    )
                                                  )}
                                                </motion.ul>
                                              )}
                                            </AnimatePresence>
                                          </>
                                        ) : (
                                          /* =========================
                                             NORMAL MOBILE ITEM
                                          ========================== */

                                          <SmartLink
                                            href={
                                              item.href
                                            }
                                            onClick={() => {
                                              setOpen(
                                                false
                                              );
                                              setMobileDropdown(
                                                null
                                              );
                                              setMobileSubDropdown(
                                                null
                                              );
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
                                            <span>
                                              {
                                                item.label
                                              }
                                            </span>

                                            <ChevronRightIcon
                                              className="
                                                h-3.5
                                                w-3.5
                                                opacity-50
                                              "
                                            />
                                          </SmartLink>
                                        )}
                                      </li>
                                    )
                                  )}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          /* ===================================
                              NORMAL MOBILE NAV LINK
                          ==================================== */

                          <SmartLink
                            href={link.href}
                            onClick={() =>
                              setOpen(false)
                            }
                            style={
                              link.active
                                ? {
                                    color: RED,
                                  }
                                : undefined
                            }
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
                            <span>
                              {link.label}
                            </span>
                          </SmartLink>
                        )}
                      </motion.li>
                    )
                  )}
                </motion.ul>

                {/* =================================================
                    MOBILE ACTION BUTTONS
                ================================================== */}

                <div
                  className="
                    mt-2
                    flex
                    gap-2
                    border-t
                    border-ink/10
                    pt-3
                  "
                >
                  {/* =============================================
                      MOBILE DONATE
                  ============================================== */}

                  <SmartLink
                    href="https://iliberty.org.uk/donate-2/"
                    className="
                      group
                      relative
                      flex
                      min-w-0
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

                    <span className="relative z-10">
                      Donate
                    </span>

                    <ArrowIcon
                      className="
                        relative
                        z-10
                        h-3.5
                        w-3.5
                      "
                    />
                  </SmartLink>

                  {/* =============================================
                      MOBILE SHOP
                  ============================================== */}

                  <SmartLink
                    href="/shop"
                    className="
                      group
                      relative
                      flex
                      min-w-0
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

                    <span className="relative z-10">
                      Shop
                    </span>
                  </SmartLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}