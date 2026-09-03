import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dove from '../assets/images/dove.png';

/* =========================================================
   ICONS
========================================================= */

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function RefreshIcon({ className = '' }: { className?: string }) {
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
      <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function MailIcon({ className = '' }: { className?: string }) {
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
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 7l9 6 9-6" />
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
      <path d="M7 17L17 7" />
      <path d="M17 7H9" />
      <path d="M17 7V15" />
    </svg>
  );
}

/* =========================================================
   REALISTIC ROPE
========================================================= */

function HangingRopes() {
  return (
    <svg
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        left-0
        top-0
        z-20
        h-[205px]
        w-full
        overflow-visible
      "
      viewBox="0 0 1000 205"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Rope texture */}
        <filter id="ropeTexture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.08"
            numOctaves="2"
            seed="8"
            result="noise"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Soft rope shadow */}
        <filter
          id="ropeShadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2"
            floodColor="#000000"
            floodOpacity="0.28"
          />
        </filter>

        {/* Clip for rope texture */}
        <linearGradient id="ropeBase" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6E4A2F" />
          <stop offset="18%" stopColor="#B17B4D" />
          <stop offset="38%" stopColor="#8A5C38" />
          <stop offset="58%" stopColor="#C18A56" />
          <stop offset="78%" stopColor="#805333" />
          <stop offset="100%" stopColor="#B47A4A" />
        </linearGradient>

        <linearGradient id="ropeHighlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E0B27B" stopOpacity="0.15" />
          <stop offset="30%" stopColor="#F2D0A1" stopOpacity="0.75" />
          <stop offset="55%" stopColor="#D9A66F" stopOpacity="0.2" />
          <stop offset="80%" stopColor="#F1C895" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D29A61" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* =====================================================
          ROPE FROM BIRD MOUTH DOWN TO CENTRAL KNOT
      ===================================================== */}

      {/* Shadow */}
      <path
        d="
          M 507 46
          C 507 66, 506 86, 505 106
          C 504 119, 503 127, 500 137
        "
        fill="none"
        stroke="#3F2A1B"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.35"
        filter="url(#ropeShadow)"
      />

      {/* Main vertical rope */}
      <path
        d="
          M 507 44
          C 507 65, 506 85, 505 104
          C 504 118, 503 128, 500 138
        "
        fill="none"
        stroke="url(#ropeBase)"
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#ropeTexture)"
      />

      {/* Twisted dark strand */}
      <path
        d="
          M 505 45
          C 511 53, 500 61, 507 69
          C 514 77, 500 85, 506 93
          C 512 101, 499 110, 504 118
          C 509 126, 498 132, 500 139
        "
        fill="none"
        stroke="#5D3D27"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Twisted light strand */}
      <path
        d="
          M 509 46
          C 503 54, 513 62, 506 70
          C 500 78, 512 86, 505 94
          C 499 102, 510 110, 504 119
          C 499 127, 507 133, 501 139
        "
        fill="none"
        stroke="#E2B77F"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* =====================================================
          CENTRAL KNOT
      ===================================================== */}

      <ellipse
        cx="500"
        cy="141"
        rx="14"
        ry="11"
        fill="#6B472C"
        opacity="0.3"
      />

      <path
        d="
          M 486 137
          C 488 130, 497 128, 504 133
          C 512 128, 520 133, 518 140
          C 520 147, 512 152, 505 148
          C 498 154, 488 149, 486 143
          C 483 141, 484 138, 486 137
        "
        fill="#8D603B"
        stroke="#563720"
        strokeWidth="1.5"
      />

      {/* Knot highlights */}
      <path
        d="M489 138 C494 134 498 135 502 140"
        fill="none"
        stroke="#D2A06B"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M507 134 C512 137 514 140 512 144"
        fill="none"
        stroke="#D2A06B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* =====================================================
          LEFT ROPE
      ===================================================== */}

      {/* Shadow */}
      <path
        d="
          M 493 143
          C 435 154, 365 164, 295 174
          C 235 183, 175 187, 82 193
        "
        fill="none"
        stroke="#3F2A1B"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.28"
      />

      {/* Main rope */}
      <path
        d="
          M 493 141
          C 432 153, 363 163, 294 174
          C 233 182, 172 187, 82 193
        "
        fill="none"
        stroke="url(#ropeBase)"
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#ropeTexture)"
      />

      {/* Rope twist - dark */}
      <path
        d="
          M 489 141
          C 476 148, 465 144, 453 152
          C 441 160, 428 153, 416 160
          C 404 167, 391 161, 378 166
          C 364 172, 351 166, 337 172
          C 323 178, 309 171, 294 177
          C 278 183, 264 177, 249 181
          C 233 185, 218 180, 202 184
          C 183 189, 164 184, 145 188
          C 124 193, 103 188, 83 194
        "
        fill="none"
        stroke="#573921"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Rope twist - light */}
      <path
        d="
          M 491 144
          C 477 138, 465 150, 452 146
          C 439 142, 427 157, 414 153
          C 401 149, 389 166, 376 161
          C 363 156, 350 173, 337 168
          C 323 163, 310 179, 296 173
          C 281 167, 267 184, 252 178
          C 237 172, 222 187, 207 181
          C 190 175, 173 191, 157 184
          C 137 176, 117 195, 98 187
          C 92 185, 87 190, 82 192
        "
        fill="none"
        stroke="#E0B47B"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.95"
      />

      {/* =====================================================
          RIGHT ROPE
      ===================================================== */}

      {/* Shadow */}
      <path
        d="
          M 507 143
          C 566 154, 637 164, 706 174
          C 767 182, 828 187, 918 193
        "
        fill="none"
        stroke="#3F2A1B"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.28"
      />

      {/* Main rope */}
      <path
        d="
          M 507 141
          C 568 153, 637 163, 706 174
          C 767 182, 828 187, 918 193
        "
        fill="none"
        stroke="url(#ropeBase)"
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#ropeTexture)"
      />

      {/* Rope twist - dark */}
      <path
        d="
          M 511 141
          C 524 148, 535 144, 547 152
          C 559 160, 572 153, 584 160
          C 596 167, 609 161, 622 166
          C 636 172, 649 166, 663 172
          C 677 178, 691 171, 706 177
          C 722 183, 736 177, 751 181
          C 767 185, 782 180, 798 184
          C 817 189, 836 184, 855 188
          C 876 193, 897 188, 918 194
        "
        fill="none"
        stroke="#573921"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Rope twist - light */}
      <path
        d="
          M 509 144
          C 523 138, 535 150, 548 146
          C 561 142, 573 157, 586 153
          C 599 149, 611 166, 624 161
          C 637 156, 650 173, 663 168
          C 677 163, 690 179, 704 173
          C 719 167, 733 184, 748 178
          C 763 172, 778 187, 793 181
          C 810 175, 827 191, 843 184
          C 863 176, 883 195, 902 187
          C 908 185, 913 190, 918 192
        "
        fill="none"
        stroke="#E0B47B"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.95"
      />

      {/* =====================================================
          SMALL LOOPS AT CARD CONNECTIONS
      ===================================================== */}

      {/* Left attachment loop */}
      <ellipse
        cx="82"
        cy="193"
        rx="8"
        ry="5"
        fill="none"
        stroke="#5A3A24"
        strokeWidth="3"
      />

      <ellipse
        cx="82"
        cy="193"
        rx="5"
        ry="3"
        fill="none"
        stroke="#C18A56"
        strokeWidth="1.2"
      />

      {/* Right attachment loop */}
      <ellipse
        cx="918"
        cy="193"
        rx="8"
        ry="5"
        fill="none"
        stroke="#5A3A24"
        strokeWidth="3"
      />

      <ellipse
        cx="918"
        cy="193"
        rx="5"
        ry="3"
        fill="none"
        stroke="#C18A56"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/* =========================================================
   NEWSLETTER SECTION
========================================================= */

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = email.trim().length > 0 && captchaChecked;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">

      {/* =====================================================
          DECORATIVE BACKGROUND BLOBS
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-24
          top-10
          h-72
          w-72
          rounded-full
          opacity-40
          blur-3xl
        "
        style={{ backgroundColor: '#78ADD0' }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          bottom-0
          h-80
          w-80
          rounded-full
          opacity-30
          blur-3xl
        "
        style={{ backgroundColor: '#C8102E' }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">

        {/* =====================================================
            BIRD + REALISTIC TWO-ROPE SYSTEM
        ====================================================== */}

        <div
          className="
            relative
            h-[235px]
            sm:h-[255px]
          "
        >

          {/* =================================================
              ROPE
              Must stay BEHIND the dove.
          ================================================= */}
          <HangingRopes />

          {/* =================================================
              DOVE
          ================================================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.82,
            }}
            whileInView={{
              opacity: 1,
              y: [0, -5, 0],
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              opacity: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              },

              scale: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              },

              y: {
                duration: 3.8,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
                delay: 0.8,
              },
            }}
            className="
              absolute
              left-[49%]
              -top-10
              z-40
              -translate-x-1/2
            "
          >
            <img
              src={dove}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="
                h-[88px]
                w-[88px]
                select-none
                object-contain
                drop-shadow-[0_9px_18px_rgba(0,0,0,0.16)]
                sm:h-[104px]
                sm:w-[104px]
              "
            />
          </motion.div>

        </div>

        {/* =====================================================
            NEWSLETTER CARD
        ====================================================== */}

        <div className="relative -mt-[28px] pb-10 sm:-mt-[78px] sm:pb-14">

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              overflow-hidden
              rounded-[26px]
              border-2
              border-white/70
              px-6
              py-10
              shadow-[0_30px_70px_rgba(24,60,90,0.28)]
              sm:px-10
              sm:py-12
              lg:px-14
            "
            style={{
              backgroundColor: '#78ADD0',
            }}
          >

            {/* =================================================
                CARD DECORATION
            ================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-16
                -top-16
                h-56
                w-56
                rounded-full
                bg-white/10
                blur-2xl
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-20
                -left-10
                h-48
                w-48
                rounded-full
                bg-white/10
                blur-2xl
              "
            />

            {/* =================================================
                CONTENT
            ================================================= */}

            <div
              className="
                relative
                z-10
                flex
                flex-wrap
                items-center
                justify-between
                gap-10
              "
            >

              {/* =================================================
                  HEADING
              ================================================= */}

              <div className="max-w-[22ch]">

                <span
                  className="
                    mb-4
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-white/40
                    bg-white/10
                    px-4
                    py-1.5
                    text-[11.5px]
                    font-bold
                    tracking-wide
                    text-white
                  "
                >
                  STAY IN THE LOOP
                </span>

                <h3
                  className="
                    max-w-[14ch]
                    font-sans
                    text-[32px]
                    font-extrabold
                    leading-[1.08]
                    tracking-tight
                    text-white
                    sm:text-[40px]
                    lg:text-[42px]
                  "
                >
                  Sign Up To Our Newsletter And Stay Updated
                </h3>

              </div>

              {/* =================================================
                  FORM
              ================================================= */}

              <div className="w-full max-w-[420px] flex-1">

                <AnimatePresence mode="wait">

                  {submitted ? (

                    <motion.p
                      key="success"
                      initial={{
                        opacity: 0,
                        y: 6,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="
                        rounded-xl
                        bg-white/15
                        px-5
                        py-6
                        text-[15px]
                        font-medium
                        text-white
                      "
                    >
                      Thanks — you're on the list.
                    </motion.p>

                  ) : (

                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="flex flex-col gap-4"
                    >

                      {/* =================================================
                          EMAIL
                      ================================================= */}

                      <div className="relative">

                        <MailIcon
                          className="
                            pointer-events-none
                            absolute
                            left-4
                            top-1/2
                            h-4.5
                            w-4.5
                            -translate-y-1/2
                            text-ink/40
                          "
                        />

                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          placeholder="Email:"
                          aria-label="Email address"
                          className="
                            w-full
                            rounded-xl
                            bg-white
                            py-4
                            pl-11
                            pr-5
                            text-[15px]
                            text-ink
                            placeholder:text-ink/60
                            transition-shadow
                            duration-200
                            focus:outline-none
                            focus:ring-2
                            focus:ring-white/80
                          "
                        />

                      </div>

                      {/* =================================================
                          CAPTCHA
                      ================================================= */}

                      <div>

                        <p
                          className="
                            mb-2
                            text-[12.5px]
                            font-bold
                            tracking-wide
                            text-white
                          "
                        >
                          CAPTCHA
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            setCaptchaChecked(
                              (v) => !v
                            )
                          }
                          aria-pressed={captchaChecked}
                          className="
                            flex
                            w-full
                            items-center
                            justify-between
                            gap-6
                            rounded-md
                            border
                            border-black/10
                            bg-white
                            px-4
                            py-3.5
                            transition-shadow
                            duration-200
                            hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)]
                          "
                        >

                          <span className="flex items-center gap-3">

                            <span
                              className={`
                                flex
                                h-5
                                w-5
                                shrink-0
                                items-center
                                justify-center
                                rounded
                                border-2
                                transition-colors
                                duration-200
                                ${
                                  captchaChecked
                                    ? 'border-green-600 bg-green-600'
                                    : 'border-black/30 bg-white'
                                }
                              `}
                            >
                              {captchaChecked && (
                                <CheckIcon
                                  className="
                                    h-3
                                    w-3
                                    text-white
                                  "
                                />
                              )}
                            </span>

                            <span
                              className="
                                text-[14px]
                                text-ink
                              "
                            >
                              I'm not a robot
                            </span>

                          </span>

                          <span
                            className="
                              flex
                              flex-col
                              items-center
                              gap-0.5
                            "
                          >
                            <RefreshIcon
                              className="
                                h-6
                                w-6
                                text-[#4285F4]
                              "
                            />

                            <span
                              className="
                                text-[9px]
                                tracking-wide
                                text-ink/45
                              "
                            >
                              reCAPTCHA
                            </span>
                          </span>

                        </button>

                      </div>

                      {/* =================================================
                          SUBMIT
                      ================================================= */}

                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="
                          group
                          relative
                          w-full
                          overflow-hidden
                          rounded-xl
                          border
                          border-white
                          bg-white
                          py-3.5
                          text-[15px]
                          font-semibold
                          text-maroon
                          transition-colors
                          duration-300
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                          enabled:hover:text-white
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
                            group-enabled:group-hover:h-full
                          "
                        />

                        <span
                          className="
                            relative
                            z-10
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                          "
                        >
                          Submit

                          <ArrowIcon
                            className="
                              h-4
                              w-4
                              transition-transform
                              duration-300
                              group-enabled:group-hover:translate-x-0.5
                            "
                          />
                        </span>

                      </button>

                    </motion.form>

                  )}

                </AnimatePresence>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}