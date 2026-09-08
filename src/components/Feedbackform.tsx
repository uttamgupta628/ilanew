import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
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
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* =========================================================
   3D TILT WRAPPER — live mouse-tracked perspective tilt
========================================================= */

function Tilt3D({
  children,
  className = "",
  strength = 3,
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
    <div style={{ perspective: 1600 }} className={className}>
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
   FORM FIELD PRIMITIVES
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
    <motion.div variants={fadeUp} whileFocus={{ scale: 1.01 }} className="flex-1">
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
   CUSTOM ANIMATED RADIO — brand-red ring, dot pops in
========================================================= */

const ratingOptions = ["Excellent", "Good", "Moderate", "Poor"] as const;
type Rating = (typeof ratingOptions)[number];

function RadioRow({
  label,
  selected,
  onSelect,
  delay = 0,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  delay?: number;
}) {
  return (
    <motion.button
      type="button"
      variants={fadeUp}
      transition={{ delay }}
      onClick={onSelect}
      whileTap={{ scale: 0.97 }}
      className="
        group
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-2
        py-2.5
        text-left
        transition-colors
        duration-200
        hover:bg-[#C8102E]/[0.04]
      "
    >
      <span
        className="
          relative
          flex
          h-6
          w-6
          shrink-0
          items-center
          justify-center
          rounded-full
          border-2
          transition-transform
          duration-200
          group-hover:scale-110
        "
        style={{ borderColor: RED }}
      >
        <AnimatePresence>
          {selected && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: RED }}
            />
          )}
        </AnimatePresence>
      </span>

      <span
        className={`text-[15.5px] transition-colors duration-200 ${
          selected ? "font-semibold text-ink" : "text-ink/75"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}

/* =========================================================
   PLACEHOLDER "I'm not a robot" CHECKBOX
   NOTE: purely visual — wire up a real reCAPTCHA before
   production use, this does not verify anything.
========================================================= */

function RecaptchaPlaceholder() {
  const [checked, setChecked] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
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
    </motion.div>
  );
}

/* =========================================================
   FEEDBACK FORM SECTION
========================================================= */

export default function FeedbackForm() {
  const [rating, setRating] = useState<Rating | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire this up to your form backend / email service.
    setSubmitted(true);
  }

  return (
    <section className="relative overflow-hidden bg-paper pb-20 pt-36 sm:pb-24 sm:pt-40 lg:pt-44">
      {/* Ambient background glows */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-20
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#5B8DBE]/[0.07]
          blur-[110px]
        "
        aria-hidden="true"
      />
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-0
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#C8102E]/[0.06]
          blur-[110px]
        "
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
        {/* =================================================
            HEADING
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center sm:mb-14"
        >
          <h1 className="font-serif text-[32px] font-extrabold leading-tight text-ink sm:text-[42px] lg:text-[48px]">
            Your Feedback Is Important To Us
          </h1>
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <span className="h-[3px] w-10 rounded-full bg-ink/20" />
            <span className="h-[3px] w-6 rounded-full" style={{ backgroundColor: RED }} />
          </div>
        </motion.div>

        {/* =================================================
            FORM PANEL — 3D flip-in on scroll, subtle tilt
            follows the cursor
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1600 }}
        >
          <Tilt3D strength={2}>
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
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-16
                  -left-16
                  h-40
                  w-40
                  rounded-full
                  bg-gradient-to-tr
                  from-[#5B8DBE]/10
                  to-transparent
                "
                aria-hidden="true"
              />

              {submitted ? (
                <motion.p
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="relative rounded-xl bg-ink/[0.04] px-5 py-10 text-center text-[16px] text-ink/75"
                >
                  Thank you for sharing your feedback — it genuinely helps us
                  improve.
                </motion.p>
              ) : (
                <motion.form
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  onSubmit={handleSubmit}
                  className="relative flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <TextField id="name" label="Name" required />
                    <TextField id="email" label="Email" type="email" required />
                  </div>

                  {/* Rating question */}
                  <motion.div variants={fadeUp}>
                    <p className="mb-3 text-[15.5px] font-medium text-ink">
                      How did you find our volunteer&apos;s approach during
                      your interaction:{" "}
                      <span style={{ color: RED }}>*</span>
                    </p>

                    <motion.div
                      variants={staggerContainer}
                      className="flex flex-col gap-1"
                    >
                      {ratingOptions.map((option, i) => (
                        <RadioRow
                          key={option}
                          label={option}
                          selected={rating === option}
                          onSelect={() => setRating(option)}
                          delay={i * 0.04}
                        />
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Open comment */}
                  <motion.div variants={fadeUp}>
                    <label htmlFor="comment" className="sr-only">
                      Anything else you would like to share?
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      id="comment"
                      name="comment"
                      rows={6}
                      placeholder="Anything Else You Would Like To Share?"
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
                  </motion.div>

                  <div className="mt-2 flex flex-col items-center justify-between gap-5 sm:flex-row">
                    <RecaptchaPlaceholder />

                    <motion.button
                      variants={fadeUp}
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
                </motion.form>
              )}
            </div>
          </Tilt3D>
        </motion.div>
      </div>
    </section>
  );
}