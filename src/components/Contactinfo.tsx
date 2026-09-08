import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

const RED = "#C8102E";
const BLUE = "#5B8DBE";

/* =========================================================
   ICONS
========================================================= */

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"
        fill={RED}
      />
      <circle cx="12" cy="10" r="2.6" fill="white" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" fill={RED} />
      <path
        d="M4 6.5l8 6 8-6"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const iconPop: Variants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const },
  },
};

/* =========================================================
   3D TILT WRAPPER — live mouse-tracked perspective tilt,
   reused for both the info cards and the form panel
========================================================= */

function Tilt3D({
  children,
  className = "",
  strength = 10,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [strength, -strength]),
    { stiffness: 260, damping: 22 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-strength, strength]),
    { stiffness: 260, damping: 22 }
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* =========================================================
   INFO CARD — Address / Email rows, now with 3D tilt,
   accent bar, and a glow that blooms in on hover
========================================================= */

type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  delay?: number;
};

function InfoCard({ icon, label, children, delay = 0 }: InfoCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay }}
    >
      <Tilt3D strength={6}>
        <div
          className="
            group
            relative
            flex
            items-start
            gap-4
            overflow-hidden
            rounded-2xl
            bg-ink/[0.04]
            p-5
            shadow-[0_2px_10px_rgba(0,0,0,0.03)]
            ring-1
            ring-transparent
            transition-shadow
            duration-300
            hover:shadow-[0_16px_36px_rgba(200,16,46,0.12)]
            hover:ring-[#C8102E]/15
            sm:p-6
          "
        >
          {/* Accent bar */}
          <span
            className="absolute inset-y-0 left-0 w-1 bg-[#C8102E] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />

          {/* Corner glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-8
              -top-8
              h-24
              w-24
              rounded-full
              bg-[#C8102E]/0
              blur-2xl
              transition-colors
              duration-500
              group-hover:bg-[#C8102E]/10
            "
            aria-hidden="true"
          />

          <motion.span
            variants={iconPop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: delay + 0.15 }}
            style={{ transform: "translateZ(30px)" }}
            className="
              relative
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-white
              shadow-[0_2px_10px_rgba(0,0,0,0.06)]
              transition-transform
              duration-300
              group-hover:scale-110
            "
          >
            {icon}
          </motion.span>

          <div
            style={{ transform: "translateZ(20px)" }}
            className="relative pt-1"
          >
            <p className="text-[15px] font-bold text-ink sm:text-[16px]">
              {label}
            </p>
            <div className="mt-1 text-[14.5px] leading-relaxed text-ink/65 sm:text-[15px]">
              {children}
            </div>
          </div>
        </div>
      </Tilt3D>
    </motion.div>
  );
}

/* =========================================================
   FORM FIELD PRIMITIVES — subtle scale-up on focus
========================================================= */

function TextField({
  id,
  label,
  required,
  type = "text",
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <motion.div whileFocus={{ scale: 1.01 }} className="flex-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={`${label}${required ? "*" : ""}`}
        className="
          w-full
          rounded-xl
          bg-ink/[0.04]
          px-4
          py-3.5
          text-[15px]
          text-ink
          placeholder:text-ink/45
          outline-none
          transition-[box-shadow,background-color]
          duration-200
          focus:bg-white
          focus:ring-2
          focus:ring-maroon/30
        "
      />
    </motion.div>
  );
}

/* =========================================================
   PLACEHOLDER "I'm not a robot" CHECKBOX
   NOTE: purely visual, matches the reference screenshot.
   Wire this up to a real reCAPTCHA (e.g. react-google-recaptcha)
   before going to production — this does not verify anything.
========================================================= */

function RecaptchaPlaceholder() {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="
        flex
        w-full
        max-w-[300px]
        items-center
        justify-between
        gap-4
        rounded-lg
        border
        border-ink/15
        bg-white
        px-4
        py-3
        transition-shadow
        duration-300
        hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]
      "
    >
      <label className="flex cursor-pointer items-center gap-3">
        <motion.input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          whileTap={{ scale: 0.85 }}
          className="h-5 w-5 rounded border-ink/30 text-maroon focus:ring-maroon/30"
        />
        <span className="text-[14px] text-ink/80">I&apos;m not a robot</span>
      </label>

      <div className="flex flex-col items-center gap-0.5 opacity-70">
        <motion.svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          aria-hidden="true"
          animate={checked ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <path
            d="M12 4a8 8 0 100 16 8 8 0 000-16z"
            stroke="#9AA0AC"
            strokeWidth="1.4"
          />
          <path
            d="M16 9l-5 5-2.5-2.5"
            stroke={BLUE}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
        <span className="text-[9px] font-medium text-ink/40">reCAPTCHA</span>
      </div>
    </div>
  );
}

/* =========================================================
   CONTACT INFO SECTION
========================================================= */

export default function ContactInfo() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire this up to your form backend / email service.
    setSubmitted(true);
  }

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Ambient background glows for depth */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-10
          h-[340px]
          w-[340px]
          rounded-full
          bg-[#5B8DBE]/[0.06]
          blur-[100px]
        "
        aria-hidden="true"
      />
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-10
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#C8102E]/[0.05]
          blur-[110px]
        "
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-5 px-5 sm:px-8">
        {/* =================================================
            ADDRESS / EMAIL CARDS
        ================================================== */}
        <InfoCard icon={<PinIcon />} label="Address">
          Churchill House, 120 Bunns Lane, London,
          <br className="hidden sm:block" /> NW7 2AS, United Kingdom
        </InfoCard>

        <InfoCard icon={<EnvelopeIcon />} label="Email" delay={0.08}>
          <a
            href="mailto:info@iliberty.org.uk"
            className="text-[#5B8DBE] transition-opacity hover:opacity-75"
          >
            info@iliberty.org.uk
          </a>
        </InfoCard>

        {/* =================================================
            DIVIDER
        ================================================== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="my-6 flex items-center gap-4 sm:my-8"
        >
          <span className="h-px flex-1" style={{ backgroundColor: `${BLUE}55` }} />
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: RED }}
            aria-hidden="true"
          />
          <p className="whitespace-nowrap text-center text-[12px] font-semibold uppercase tracking-[0.08em] text-ink/60 sm:text-[13px]">
            We value your input and collaboration opportunities.
          </p>
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: RED }}
            aria-hidden="true"
          />
          <span className="h-px flex-1" style={{ backgroundColor: `${BLUE}55` }} />
        </motion.div>

        {/* =================================================
            GET IN TOUCH FORM — 3D flip-in on scroll, subtle
            tilt follows the cursor
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1600 }}
        >
          <Tilt3D strength={2.5}>
            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                bg-white
                p-6
                shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                ring-1
                ring-ink/5
                sm:p-10
              "
            >
              {/* Decorative gradient corner */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-gradient-to-br
                  from-[#C8102E]/10
                  to-transparent
                "
                aria-hidden="true"
              />

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6 }}
                className="relative text-center font-serif text-[30px] font-extrabold leading-tight text-ink sm:text-[38px]"
              >
                Get In Touch
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ backgroundColor: RED }}
                className="relative mx-auto mt-3 h-[3px] w-14 origin-center rounded-full"
              />

              {submitted ? (
                <motion.p
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="relative mt-8 rounded-xl bg-ink/[0.04] px-5 py-6 text-center text-[15px] text-ink/75"
                >
                  Thanks for reaching out &mdash; we&apos;ll get back to you
                  as soon as we can.
                </motion.p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative mt-8 flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <TextField id="name" label="Name" required />
                    <TextField id="email" label="Email" type="email" required />
                  </div>

                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Message"
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        bg-ink/[0.04]
                        px-4
                        py-3.5
                        text-[15px]
                        text-ink
                        placeholder:text-ink/45
                        outline-none
                        transition-[box-shadow,background-color]
                        duration-200
                        focus:bg-white
                        focus:ring-2
                        focus:ring-maroon/30
                      "
                    />
                  </div>

                  <div className="mt-2 flex flex-col items-center justify-between gap-5 sm:flex-row">
                    <RecaptchaPlaceholder />

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="
                        group
                        relative
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        overflow-hidden
                        rounded-full
                        border
                        border-maroon
                        bg-white
                        px-10
                        py-3
                        text-[16px]
                        font-semibold
                        text-maroon
                        transition-colors
                        duration-300
                        hover:text-white
                        sm:w-auto
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
                      <span className="relative z-10">Submit</span>
                      <ArrowIcon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </Tilt3D>
        </motion.div>
      </div>
    </section>
  );
}