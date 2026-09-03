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
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: '#78ADD0' }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: '#C8102E' }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* =================================================
            HANGING STRING + DOVE

            The dashed line draws itself in from the center,
            the dove settles onto it, and a short thread runs
            from directly beneath the dove down to the top of
            the card — reading as the bird holding the board up
            by a string in its beak. A gentle idle float keeps
            it feeling alive rather than static.
        ================================================== */}

        <div className="relative">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="border-t-2 border-dashed border-ink/25"
          />

          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.85 }}
            whileInView={{
              opacity: 1,
              y: [0, -6, 0],
              scale: 1,
            }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              y: {
                duration: 3.4,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
                delay: 0.7,
              },
            }}
            className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <img
              src={dove}
              alt=""
              aria-hidden="true"
              className="h-16 w-16 select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] sm:h-20 sm:w-20"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* =================================================
            CARD
        ================================================== */}

        <div className="relative pb-10 pt-8 sm:pb-14 sm:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
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
            style={{ backgroundColor: '#78ADD0' }}
          >
            {/* subtle texture — soft glow in the corner */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl"
            />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-10">
              {/* HEADING */}
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

              {/* FORM */}
              <div className="w-full max-w-[420px] flex-1">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="rounded-xl bg-white/15 px-5 py-6 text-[15px] font-medium text-white"
                    >
                      Thanks — you're on the list.
                    </motion.p>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4"
                    >
                      {/* EMAIL */}
                      <div className="relative">
                        <MailIcon className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/40" />

                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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

                      {/* CAPTCHA */}
                      <div>
                        <p className="mb-2 text-[12.5px] font-bold tracking-wide text-white">
                          CAPTCHA
                        </p>

                        <button
                          type="button"
                          onClick={() => setCaptchaChecked((v) => !v)}
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
                                <CheckIcon className="h-3 w-3 text-white" />
                              )}
                            </span>

                            <span className="text-[14px] text-ink">
                              I'm not a robot
                            </span>
                          </span>

                          <span className="flex flex-col items-center gap-0.5">
                            <RefreshIcon className="h-6 w-6 text-[#4285F4]" />
                            <span className="text-[9px] tracking-wide text-ink/45">
                              reCAPTCHA
                            </span>
                          </span>
                        </button>
                      </div>

                      {/* SUBMIT */}
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

                        <span className="relative z-10 inline-flex items-center justify-center gap-2">
                          Submit
                          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-enabled:group-hover:translate-x-0.5" />
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