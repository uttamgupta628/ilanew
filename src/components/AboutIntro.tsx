import { motion, type Variants } from "framer-motion";

const RED = "#C8102E";

/* =========================================================
   DECORATIVE WATERMARK

   Placeholder dove silhouette in pale pink, matching the
   faint top-left shape in your screenshot. If you already
   have that exact asset (looks like it might be reused from
   elsewhere on the site), swap this <svg> for an <img> import
   instead — same absolute positioning will work.
========================================================= */

function DoveWatermark() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        -left-16
        -top-10
        h-[280px]
        w-[280px]
        text-[#F6D9DE]
        sm:h-[340px]
        sm:w-[340px]
        lg:-left-10
        lg:-top-16
        lg:h-[400px]
        lg:w-[400px]
      "
    >
      <path
        fill="currentColor"
        d="M60 220c40-60 110-90 170-70-20-40-10-90 30-120 10 50 40 80 80 90-30 10-50 35-55 65 45-5 90 15 110 55-55-10-105 5-135 40 30 15 50 45 55 80-45-20-90-15-125 10-10-45-45-80-90-95-15 45-55 75-100 80 15-45 45-85 60-135z"
      />
    </svg>
  );
}

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const underlineVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.6, delay: 0.25, ease: "easeOut" },
  },
};

/* =========================================================
   ABOUT INTRO
========================================================= */

type AboutIntroProps = {
  heading?: string;
  paragraphs?: string[];
};

const defaultParagraphs = [
  "The International Liberty Association (ILA) is a UK-registered, volunteer-led charity (Charity No. 1160607) dedicated to helping victims of Human Rights abuses and diaspora communities build stable, independent lives in the United Kingdom.",
  "Founded by individuals with lived experience of repression, our organisation combines grassroots support with international advocacy. In the UK, we address immediate needs—providing language education, digital training and emotional support. Simultaneously, we campaign globally to end executions, defend women's rights, and expose human rights violations in countries in the Middle East.",
  "By fostering integration and civic participation among victim of Human Rights abusess, and by holding perpetrators of abuse accountable on the world stage, ILA contributes to stronger, more inclusive British communities and advances the cause of justice worldwide.",
];

export default function AboutIntro({
  heading = "UK Dignitaries Who Have Backed ILA",
  paragraphs = defaultParagraphs,
}: AboutIntroProps) {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <DoveWatermark />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="
          relative
          z-10
          mx-auto
          max-w-4xl
          px-6
          text-center
        "
      >
        {/* =================================================
            HEADING
        ================================================== */}

        <motion.h2
          variants={itemVariants}
          className="
            font-sans
            text-[28px]
            font-extrabold
            leading-tight
            text-ink
            sm:text-[36px]
            lg:text-[42px]
          "
        >
          {heading}
        </motion.h2>

        {/* =================================================
            UNDERLINE — grows from center on scroll-in
        ================================================== */}

        <motion.div
          variants={underlineVariants}
          className="mx-auto mt-4 flex h-[3px] w-24 origin-center overflow-hidden rounded-full"
        >
          <span className="h-full w-1/2" style={{ backgroundColor: RED }} />
          <span className="h-full w-1/2 bg-ink/15" />
        </motion.div>

        {/* =================================================
            PARAGRAPHS — each fades/slides in with the
            container's stagger
        ================================================== */}

        <div className="mt-10 flex flex-col gap-6">
          {paragraphs.map((text, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
              className="
                text-[15px]
                leading-[1.75]
                text-ink/75
                sm:text-[16px]
                lg:text-[17px]
              "
            >
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}