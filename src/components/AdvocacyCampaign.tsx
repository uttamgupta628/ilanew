import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

/* =========================================================
   DATA
========================================================= */

type ListItem = {
  title?: string; // bold heading line, omit for a plain paragraph-style bullet
  description: string;
};

type Group = {
  heading?: string; // sub-heading above a set of items (e.g. "Reports")
  items: ListItem[];
};

const leftColumn: Group[] = [
  {
    items: [
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
        title: "Nationwide exhibitions.",
        description: "",
      },
      {
        description: "Engagement with MPs and Peers to table parliamentary questions.",
      },
    ],
  },
];

const rightColumn: Group[] = [
  {
    items: [
      {
        description:
          "Impact Overview \u2013 over the years we have managed to touch the lives of many people in the UK and globally.",
      },
    ],
  },
  {
    items: [
      {
        description:
          "Since 2017, more than 3,000 victims of Human Rights abuses resettled from conflict zones with support for housing and medical needs.",
      },
      {
        description:
          "Annually supporting 800+ individuals through education and community programmes in the UK.",
      },
      {
        description:
          "Over 4,300 people reached with emergency relief during COVID-19, including food and mental health sessions.",
      },
      {
        description:
          "600+ participants each year improving language and digital competence across London.",
      },
      {
        description:
          "Hundreds of youth engaged in leadership and civic workshops yearly.",
      },
      {
        description:
          "Coordinated over 120 exhibitions and 35 public events in 2024 alone, raising awareness nationwide.",
      },
      {
        description:
          "Weekly online Cultural sessions with over 120+ weekly participants to bridge the cultural gap.",
      },
    ],
  },
  {
    heading: "Reports",
    items: [
      {
        description:
          "Download our Annual Reports for detailed financials and programme analysis (Annual report will be given).",
      },
    ],
  },
];

/* =========================================================
   CHECK ICON — with its own 3D pop-in
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
        ease: [0.34, 1.56, 0.64, 1], // slight overshoot for a "pop"
      }}
      style={{ transformPerspective: 400 }}
      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C8102E]"
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

function makeItemVariants(fromLeft: boolean, index: number): Variants {
  return {
    hidden: {
      opacity: 0,
      x: fromLeft ? -60 : 60,
      rotateY: fromLeft ? -22 : 22,
      rotateX: 8,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      rotateX: 0,
      transition: {
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };
}

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* =========================================================
   SINGLE ITEM
========================================================= */

function ListRow({
  item,
  fromLeft,
  index,
}: {
  item: ListItem;
  fromLeft: boolean;
  index: number;
}) {
  return (
    <motion.div
      variants={makeItemVariants(fromLeft, index)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      style={{ transformPerspective: 1000 }}
      className="flex gap-3"
    >
      <CheckIcon delay={index * 0.06 + 0.15} />
      <div>
        {item.title && (
          <h3 className="text-[17px] font-bold leading-snug text-ink sm:text-[18px]">
            {item.title}
          </h3>
        )}
        {item.description && (
          <p className="mt-1 text-[15px] leading-relaxed text-ink/70">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* =========================================================
   COLUMN
========================================================= */

function AdvocacyColumn({
  groups,
  fromLeft,
}: {
  groups: Group[];
  fromLeft: boolean;
}) {
  let runningIndex = 0;

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group, gIdx) => (
        <div key={gIdx}>
          {group.heading && (
            <motion.h3
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="mb-4 text-[20px] font-extrabold text-ink"
            >
              {group.heading}
            </motion.h3>
          )}

          <div className="flex flex-col gap-6">
            {group.items.map((item, i) => {
              const idx = runningIndex++;
              return (
                <ListRow
                  key={`${gIdx}-${i}`}
                  item={item}
                  fromLeft={fromLeft}
                  index={idx}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

export default function AdvocacyCampaign() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Subtle whole-section parallax tilt as the user scrolls through —
  // reinforces the 3D feel beyond just the per-item flip-ins.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -6]);
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-40, 0, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-paper py-16 sm:py-20 lg:py-24"
    >
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
          <span className="h-[3px] w-6 rounded-full bg-maroon" />
        </div>
      </motion.div>

      {/* =====================================================
          TWO-COLUMN GRID — with a gentle scroll-driven 3D tilt
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
          gap-12
          px-5
          sm:px-8
          lg:grid-cols-2
          lg:gap-16
        "
      >
        <AdvocacyColumn groups={leftColumn} fromLeft={true} />
        <AdvocacyColumn groups={rightColumn} fromLeft={false} />
      </motion.div>
    </section>
  );
}