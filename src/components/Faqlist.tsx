import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

const RED = "#C8102E";

/* =========================================================
   DATA
========================================================= */

type FAQCategory = {
  label: string;
  href: string;
};

const categories: FAQCategory[] = [
  { label: "About Us", href: "#about-us" },
  { label: "'Stop Executions in Iran' Campaign", href: "#stop-executions-iran" },
  { label: "'No to Executions' Campaign", href: "#no-to-executions" },
  { label: "Defending Women's Rights", href: "#defending-womens-rights" },
  { label: "Campaign for Children's Rights", href: "#childrens-rights" },
  { label: "Religious Minorities", href: "#religious-minorities" },
  { label: "The 1988 Massacre \u2013 Seeking Justice", href: "#1988-massacre" },
  { label: "Save Prisoners of 2022-2023 Protests", href: "#save-prisoners" },
  { label: "Donations", href: "#donations" },
  { label: "International Liberty Website", href: "#international-liberty-website" },
];

/* =========================================================
   ICON
========================================================= */

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
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

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* =========================================================
   3D TILT CARD — cursor-tracked perspective tilt + red
   fill-sweep hover, matching the site's established pattern
========================================================= */

function CategoryCard({ label, href }: FAQCategory) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    { stiffness: 260, damping: 22 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    { stiffness: 260, damping: 22 }
  );

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div variants={cardVariants} style={{ perspective: 1000 }}>
      <motion.a
        ref={cardRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ scale: { duration: 0.25, ease: "easeOut" } }}
        className="
          group
          relative
          flex
          h-full
          min-h-[76px]
          items-center
          justify-between
          gap-3
          overflow-hidden
          rounded-2xl
          bg-ink/[0.04]
          px-5
          py-4
          shadow-[0_2px_10px_rgba(0,0,0,0.03)]
          ring-1
          ring-transparent
          transition-shadow
          duration-300
          hover:shadow-[0_14px_32px_rgba(200,16,46,0.15)]
          hover:ring-[#C8102E]/15
        "
      >
        {/* Bottom-up fill sweep — same effect as Donate/Submit buttons */}
        <span
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-0
            h-0
            bg-[#C8102E]
            transition-all
            duration-500
            ease-out
            group-hover:h-full
          "
          aria-hidden="true"
        />

        <span
          style={{ transform: "translateZ(20px)" }}
          className="relative z-10 text-[15.5px] font-semibold leading-snug text-ink transition-colors duration-500 group-hover:text-white sm:text-[16px]"
        >
          {label}
        </span>

        <span
          style={{ transform: "translateZ(20px)" }}
          className="
            relative
            z-10
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white
            text-[#C8102E]
            shadow-[0_2px_8px_rgba(0,0,0,0.06)]
            transition-transform
            duration-300
            group-hover:translate-x-0.5
          "
        >
          <ArrowIcon className="h-4 w-4" />
        </span>
      </motion.a>
    </motion.div>
  );
}

/* =========================================================
   SECTION
========================================================= */

export default function FAQList() {
  return (
    <section className="relative overflow-hidden bg-paper py-16 sm:py-20 lg:py-24">
      {/* Ambient background glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/3
          rounded-full
          bg-[#5B8DBE]/[0.06]
          blur-[120px]
        "
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
        {/* =================================================
            HEADING
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12"
        >
          <h1 className="font-serif text-[30px] font-extrabold leading-tight text-ink sm:text-[40px] lg:text-[46px]">
            Frequently Asked Questions
          </h1>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-[3px] w-10 rounded-full bg-ink/20" />
            <span className="h-[3px] w-6 rounded-full" style={{ backgroundColor: RED }} />
          </div>
        </motion.div>

        {/* =================================================
            CATEGORY GRID — 1 col on mobile, 2 on sm+, with a
            3D flip-in stagger as it scrolls into view
        ================================================== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ perspective: 1600 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {categories.map((category) => (
            <CategoryCard key={category.label} {...category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}