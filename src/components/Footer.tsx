import logo from "../assets/images/logo.png";
import tornEdge from "../assets/images/torn-edge.webp";

// const RED = "#C8102E";

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
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

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0z" />
    </svg>
  );
}

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v2" />
    </svg>
  );
}

const menuLinks = [
  {
    label: "Stories & Voices",
    href: "https://iliberty.org.uk/stories-voices/",
  },
  {
    label: "Partnerships",
    href: "https://iliberty.org.uk/partnerships/",
  },
  {
    label: "Legacy",
    href: "https://iliberty.org.uk/leave-a-legacy/",
  },
  {
    label: "Privacy Policy",
    href: "https://iliberty.org.uk/privacy-policy/",
  },
  {
    label: "Contact Us",
    href: "https://iliberty.org.uk/contact-us/",
  },
  {
    label: "Feedback",
    href: "https://iliberty.org.uk/feedback-form/",
  },
];

const usefulLinks = [
  {
    label: "Stories & Voices",
    href: "https://iliberty.org.uk/stories-voices/",
  },
  {
    label: "Partnerships",
    href: "https://iliberty.org.uk/partnerships/",
  },
  {
    label: "Legacy",
    href: "https://iliberty.org.uk/leave-a-legacy/",
  },
  {
    label: "Privacy Policy",
    href: "https://iliberty.org.uk/privacy-policy/",
  },
  {
    label: "Contact Us",
    href: "https://iliberty.org.uk/contact-us/",
  },
  {
    label: "Feedback",
    href: "https://iliberty.org.uk/feedback-form/",
  },
];

export default function Footer() {
  return (
    <footer
      className="
        relative
        bg-ink
        text-white
        pt-24
        pb-7
      "
    >
      {/* =====================================================
          TORN EDGE
          Same torn-edge image used in Hero.
          The torn/rough edge faces UP.
      ====================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          -top-8
          z-20
          h-10
          overflow-hidden
          sm:-top-10
          sm:h-12
          lg:-top-12
          lg:h-14
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-full
            bg-ink
          "
          style={{
            width: "calc(100% + 20px)",
            transform:
              "translate(-50%, -50%) rotate(180deg)",

            WebkitMaskImage: `url(${tornEdge})`,
            maskImage: `url(${tornEdge})`,

            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",

            WebkitMaskPosition: "center",
            maskPosition: "center",

            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",

            filter:
              "drop-shadow(0 -5px 12px rgba(0,0,0,0.12))",
          }}
        />
      </div>

      {/* =====================================================
          FOOTER CONTENT
      ====================================================== */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">

        {/* =================================================
            MAIN FOOTER GRID
        ================================================= */}
        <div
          className="
            grid
            grid-cols-1
            gap-10
            pb-11
            border-b
            border-paper/10
            sm:grid-cols-2
            lg:grid-cols-[1.1fr_0.8fr_0.9fr_1.1fr]
            lg:gap-8
          "
        >
          {/* =================================================
              LOGO + CONTACT
          ================================================= */}
          <div>
            <img
              src={logo}
              alt="International Liberty Association"
              className="
                mb-0
                h-36
                w-36
                object-contain
              "
            />

            <div className="mb-6">
              <a
                href="tel:02084523481"
                className="
                  mb-2
                  flex
                  items-center
                  gap-2.5
                  text-[14.5px]
                  transition-colors
                  hover:text-gold-bright
                "
              >
                <PhoneIcon className="h-4 w-4 shrink-0" />
                020 8452 3481
              </a>

              <a
                href="mailto:info@iliberty.org.uk"
                className="
                  flex
                  items-center
                  gap-2.5
                  text-[14.5px]
                  transition-colors
                  hover:text-gold-bright
                "
              >
                <MailIcon className="h-4 w-4 shrink-0" />
                info@iliberty.org.uk
              </a>
            </div>

            {/* =================================================
                SECURITY / REGULATOR BADGES
            ================================================= */}
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-14
                  w-14
                  flex-col
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-paper/25
                  text-center
                  leading-none
                "
              >
                <ShieldIcon className="mb-1 h-4 w-4" />

                <span className="text-[7px] font-bold tracking-tight">
                  FR
                </span>

                <span className="text-[5.5px] font-semibold tracking-tight">
                  REGULATOR
                </span>
              </div>

              <div
                className="
                  flex
                  h-14
                  w-14
                  flex-col
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-paper/25
                  text-center
                  leading-none
                "
              >
                <LockIcon className="mb-1 h-4 w-4" />

                <span className="text-[7px] font-bold tracking-tight">
                  secure
                </span>

                <span className="text-[5.5px] font-semibold tracking-tight">
                  GlobalSign
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              MENU
          ================================================= */}
          <div>
            <h5 className="mb-4 text-[13px] font-semibold text-white">
              Menu
            </h5>

            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="
                      inline-block
                      text-[14.5px]
                      transition-colors
                      hover:text-gold-bright
                    "
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              USEFUL LINKS
          ================================================= */}
          <div>
            <h5 className="mb-4 text-[13px] font-semibold text-white">
              Useful Links
            </h5>

            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="
                      text-[14.5px]
                      transition-colors
                      hover:text-gold-bright
                    "
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              CTA
          ================================================= */}
          <div>
            <h5 className="mb-4 text-[13px] font-semibold text-white">
              You can help today
            </h5>

            <p className="mb-5 text-[14.5px] leading-relaxed">
              Donate to our Campaigns and Projects
            </p>

            {/* =================================================
                DONATE BUTTON
            ================================================= */}
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
    mb-4
    text-[16px]
    font-semibold
    text-maroon
    transition-all
    duration-300
    hover:text-white
    2xl:py-3
    2xl:pl-15
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
</a>
            {/* =================================================
                PAYPAL
            ================================================= */}
            <div
              className="
                inline-flex
                w-fit
                flex-col
                items-start
                gap-1
                rounded-md
                bg-white
                px-3
                py-2
              "
            >
              <span
                className="
                  text-[9px]
                  font-semibold
                  text-ink/60
                "
              >
                Secure Payments By:
              </span>

              <div className="flex items-center gap-1.5">
                <span
                  className="
                    text-[15px]
                    font-bold
                    italic
                    text-[#003087]
                  "
                >
                  Pay
                  <span className="text-[#009cde]">
                    Pal
                  </span>
                </span>

                <span
                  className="
                    text-[9px]
                    font-semibold
                    text-ink/50
                  "
                >
                  VISA &nbsp;MC&nbsp; AMEX
                </span>
              </div>

              <span
                className="
                  text-[8px]
                  font-semibold
                  text-ink/60
                "
              >
                NO PAYPAL ACCOUNT NEEDED!
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM FOOTER
        ================================================= */}
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
            pt-6
            text-[13px]
          "
        >
          <span>
            Copyright © 2026 International Liberty
            Association – All Rights Reserved.
          </span>

          {/* =================================================
              SOCIAL ICONS
          ================================================= */}
          <div className="flex gap-2">
            <a
              href="https://x.com/ilibertyassoc"
              aria-label="X"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-md
                bg-[#5B8DBE]/25
                text-white
                transition-colors
                hover:bg-[#5B8DBE]/45
              "
            >
              <XIcon className="h-3.5 w-3.5" />
            </a>

            <a
              href="https://www.youtube.com/channel/UCNkLGpFt1-Rgq7m6GHUyI3A?reload=9"
              aria-label="YouTube"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-md
                bg-[#5B8DBE]/25
                text-white
                transition-colors
                hover:bg-[#5B8DBE]/45
              "
            >
              <YoutubeIcon className="h-3.5 w-3.5" />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-md
                bg-[#5B8DBE]/25
                text-white
                transition-colors
                hover:bg-[#5B8DBE]/45
              "
            >
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-md
                bg-[#5B8DBE]/25
                text-white
                transition-colors
                hover:bg-[#5B8DBE]/45
              "
            >
              <FacebookIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}