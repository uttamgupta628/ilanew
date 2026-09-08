import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

/* =========================================================
   DATA — LEFT COLUMN: advocacy activities (accent-card list)
========================================================= */

type ActivityItem = {
  title?: string;
  description: string;
};

const activities: ActivityItem[] = [
  {
    title: "Stop Executions Campaign",
    description:
      "UK exhibitions, and a 40,000-strong petition for stopping executions.",
  },
  {
    description:
      "Global advocacy for Women and Children's rights especially in the Middle East.",
  },
  {
    title: "Rights Awareness Workshops",
    description:
      "Sessions in faith centres, schools, and public forums highlighting the plight of women and minorities.",
  },
  {
    title: "Nationwide Exhibitions",
    description: "Touring displays that bring lived testimony directly to UK communities.",
  },
  {
    description: "Engagement with MPs and Peers to table parliamentary questions.",
  },
];

/* =========================================================
   DATA — RIGHT COLUMN: impact stats (pulled out of paragraph
   copy into scannable numbers, which reads far stronger)
========================================================= */

type StatItem = {
  value: string;
  label: string;
};

const stats: StatItem[] = [
  {
    value: "3,000+",
    label: "Victims of Human Rights abuses resettled from conflict zones since 2017",
  },
  {
    value: "800+",
    label: "Individuals supported annually through education & community programmes",
  },
  {
    value: "4,300+",
    label: "People reached with emergency relief during COVID-19",
  },
  {
    value: "600+",
    label: "Participants improving language & digital competence across London",
  },
  {
    value: "120+",
    label: "Exhibitions and 35 public events coordinated in 2024 alone",
  },
  {
    value: "120+",
    label: "Weekly participants in online cultural exchange sessions",
  },
];

/* =========================================================
   CHECK ICON — 3D pop-in, used on the activities list
========================================================= */

function CheckIcon({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      style={{ transformPerspective: 400 }}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C8102E] text-white"
    >
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 8.5L6 12.5L14 3.5"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
}

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -50, rotateY: -14 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.08,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const statVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: index * 0.07,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* =========================================================
   LEFT COLUMN — activity cards with a maroon accent bar,
   subtle lift + border glow on hover
========================================================= */

function ActivityCard({ item, index }: { item: ActivityItem; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -4 }}
      style={{ transformPerspective: 1000 }}
      className="
        group
        relative
        flex
        items-start
        gap-4
        overflow-hidden
        rounded-xl
        border
        border-ink/10
        bg-white
        p-5
        shadow-[0_2px_10px_rgba(0,0,0,0.04)]
        transition-shadow
        duration-300
        hover:shadow-[0_12px_28px_rgba(200,16,46,0.12)]
      "
    >
      {/* Accent bar */}
      <span
        className="absolute inset-y-0 left-0 w-1 bg-[#C8102E] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      <CheckIcon delay={index * 0.06 + 0.1} />

      <div>
        {item.title && (
          <h3 className="text-[16px] font-bold leading-snug text-ink sm:text-[17px]">
            {item.title}
          </h3>
        )}
        <p
          className={`text-[14.5px] leading-relaxed text-ink/65 sm:text-[15px] ${
            item.title ? "mt-1" : ""
          }`}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* =========================================================
   RIGHT COLUMN — big number stat cards on a soft tinted grid
========================================================= */

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={statVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -3 }}
      className="
        rounded-xl
        border
        border-ink/10
        bg-gradient-to-b
        from-[#FBF4F5]
        to-white
        p-5
        text-center
        shadow-[0_2px_10px_rgba(0,0,0,0.04)]
        transition-shadow
        duration-300
        hover:shadow-[0_12px_28px_rgba(200,16,46,0.14)]
        sm:text-left
      "
    >
      <p className="font-serif text-[30px] font-extrabold leading-none text-[#C8102E] sm:text-[34px]">
        {stat.value}
      </p>
      <p className="mt-2 text-[13.5px] leading-snug text-ink/65 sm:text-[14px]">
        {stat.label}
      </p>
    </motion.div>
  );
}

/* =========================================================
   SECTION
========================================================= */

export default function AdvocacyCampaign() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-paper py-16 sm:py-20 lg:py-24"
    >
      {/* Ambient tint for depth */}
      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-[420px]
          w-[420px]
          -translate-y-1/3
          translate-x-1/3
          rounded-full
          bg-[#C8102E]/5
          blur-[100px]
        "
        aria-hidden="true"
      />

      {/* =====================================================
          HEADING
      ====================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto mb-14 max-w-4xl px-5 text-center sm:mb-16"
      >
        <h2 className="font-serif text-[30px] font-extrabold leading-tight text-ink sm:text-[38px] lg:text-[44px]">
          What We Do &ndash; International Advocacy Campaign
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-2">
          <span className="h-[3px] w-10 rounded-full bg-ink/20" />
          <span className="h-[3px] w-6 rounded-full bg-[#C8102E]" />
        </div>
      </motion.div>

      {/* =====================================================
          TWO-COLUMN LAYOUT — left: activities, right: impact
      ====================================================== */}
      <motion.div
        style={{
          perspective: 1800,
          rotateX,
          translateZ,
          transformStyle: "preserve-3d",
        }}
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-6xl
          grid-cols-1
          gap-14
          px-5
          sm:px-8
          lg:grid-cols-[1fr_1.15fr]
          lg:gap-12
        "
      >
        {/* LEFT — Advocacy activities */}
        <div className="flex flex-col gap-4">
          <motion.h3
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="mb-1 text-[13px] font-bold uppercase tracking-[0.12em] text-[#C8102E]"
          >
            International Advocacy
          </motion.h3>

          {activities.map((item, i) => (
            <ActivityCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Vertical divider on desktop */}
        <div className="relative hidden lg:block">
          <span className="absolute inset-y-0 left-[-1.5rem] w-px bg-ink/10" />

          <div className="flex flex-col gap-8">
            <div>
              <motion.h3
                variants={headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                className="mb-1 text-[13px] font-bold uppercase tracking-[0.12em] text-[#C8102E]"
              >
                Impact Overview
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[15px] leading-relaxed text-ink/70"
              >
                Over the years we have touched the lives of many people in the
                UK and globally.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} index={i} />
              ))}
            </div>

            {/* Reports CTA */}
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -3 }}
              className="
                group
                flex
                items-center
                justify-between
                gap-4
                rounded-xl
                bg-ink
                p-5
                shadow-[0_8px_24px_rgba(0,0,0,0.15)]
                transition-shadow
                duration-300
                hover:shadow-[0_14px_32px_rgba(0,0,0,0.25)]
              "
            >
              <div>
                <p className="text-[15px] font-bold text-white">
                  Annual Reports
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white/65">
                  Detailed financials and programme analysis, published yearly.
                </p>
              </div>
              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#C8102E]
                  text-white
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.a>
          </div>
        </div>

        {/* MOBILE / TABLET — same right-column content, stacked
            (the desktop divider block above is hidden below lg) */}
        <div className="flex flex-col gap-8 lg:hidden">
          <div>
            <motion.h3
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="mb-1 text-[13px] font-bold uppercase tracking-[0.12em] text-[#C8102E]"
            >
              Impact Overview
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[15px] leading-relaxed text-ink/70"
            >
              Over the years we have touched the lives of many people in the
              UK and globally.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>

          <motion.a
            href="#"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -3 }}
            className="
              group
              flex
              items-center
              justify-between
              gap-4
              rounded-xl
              bg-ink
              p-5
              shadow-[0_8px_24px_rgba(0,0,0,0.15)]
              transition-shadow
              duration-300
              hover:shadow-[0_14px_32px_rgba(0,0,0,0.25)]
            "
          >
            <div>
              <p className="text-[15px] font-bold text-white">
                Annual Reports
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-white/65">
                Detailed financials and programme analysis, published yearly.
              </p>
            </div>
            <span
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#C8102E]
                text-white
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10m0 0L9 4m4 4L9 12"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}