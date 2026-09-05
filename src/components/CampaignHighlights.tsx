import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";

import tornEdge from "../assets/images/torn-edge.webp"; // same mask used in AboutHero

/* =========================================================
   DATA
========================================================= */

type CampaignItem = {
  title: string;
  description: string;
};

type CampaignGroup = {
  heading: string;
  items: CampaignItem[];
};

const leftColumn: CampaignGroup[] = [
  {
    heading: "Victims & Diaspora Support:",
    items: [
      {
        title: "English Classes & Digital Literacy",
        description:
          "Over 50 weekly sessions that equip participants with critical communication and technology skills.",
      },
      {
        title: "Integration Clinics",
        description: "One-on-one advice delivered in community centres.",
      },
      {
        title: "Cultural Exchange Programmes",
        description:
          "Events that connect diaspora communities with locals fostering mutual understanding and inclusion.",
      },
      {
        title: "Workshops for Victims of Human Rights abuses",
        description:
          "To speak about their stories and ordeals to help with their healing.",
      },
    ],
  },
  {
    heading: "Bridging the generational gap between the young and elderly:",
    items: [
      {
        title: "Creating an environment",
        description:
          "Where people from different generations work together in harmony for the greater good of the community.",
      },
    ],
  },
];

const rightColumn: CampaignGroup[] = [
  {
    heading: "Education & Youth Empowerment:",
    items: [
      {
        title: "Youth Leadership Workshops",
        description:
          "Weekly series for an average of 40 participants teaching civic engagement and conflict resolution.",
      },
      {
        title: "Extremism Prevention",
        description:
          "Interactive seminars in youth clubs on critical thinking and recognizing radical narratives.",
      },
    ],
  },
  {
    heading: "Mental Health & Emotional Support",
    items: [
      {
        title: "Support calls for victims of Human Rights abuses",
        description:
          "Weekly check-ins offering emotional first aid and referrals to counselling services.",
      },
      {
        title: "Community Healing seminars and roundtables",
        description:
          "Sessions where victims of Human Rights abuses speak about their pains, creating a sense of community and helping them overcome their struggles.",
      },
      {
        title: "Emergency Response",
        description:
          "Rapid deployment of relief packages and wellbeing resources during crises, like the COVID-19 lockdown.",
      },
    ],
  },
];

/* =========================================================
   CHECK ICON
========================================================= */

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/90 ${className}`}
    >
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 8.5L6 12.5L14 3.5"
          stroke="#7A1F2B"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* =========================================================
   ANIMATION VARIANTS — 3D flip-in on scroll
========================================================= */

function makeCardVariants(fromLeft: boolean, index: number): Variants {
  return {
    hidden: {
      opacity: 0,
      x: fromLeft ? -70 : 70,
      rotateY: fromLeft ? -28 : 28,
      rotateX: 10,
      scale: 0.94,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };
}

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* =========================================================
   3D TILT CARD — live mouse-tracked perspective tilt
========================================================= */

function TiltCard({
  item,
  fromLeft,
  index,
}: {
  item: CampaignItem;
  fromLeft: boolean;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    { stiffness: 300, damping: 25 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    { stiffness: 300, damping: 25 }
  );
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
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
    <motion.div
      variants={makeCardVariants(fromLeft, index)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{ transformPerspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.03 }}
        transition={{ scale: { duration: 0.3, ease: "easeOut" } }}
        className="
          group
          relative
          overflow-hidden
          rounded-2xl
          bg-white/15
          p-5
          shadow-[0_8px_24px_rgba(0,0,0,0.15)]
          ring-1
          ring-white/20
          backdrop-blur-[2px]
        "
      >
        {/* Cursor-following glow — adds the "attractive" 3D sheen */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(220px circle at ${glowX} ${glowY}, rgba(255,255,255,0.25), transparent 70%)`,
          }}
        />

        <div style={{ transform: "translateZ(30px)" }} className="relative flex gap-3">
          <CheckIcon className="mt-0.5" />
          <div>
            <h3 className="text-[16px] font-bold leading-snug text-white sm:text-[17px]">
              {item.title}
            </h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
              {item.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   COLUMN
========================================================= */

function CampaignColumn({
  groups,
  fromLeft,
}: {
  groups: CampaignGroup[];
  fromLeft: boolean;
}) {
  let runningIndex = 0;

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <div key={group.heading}>
          <motion.h3
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mb-4 text-[17px] font-extrabold text-white sm:text-[19px]"
          >
            {group.heading}
          </motion.h3>

          <div className="flex flex-col gap-4">
            {group.items.map((item) => {
              const idx = runningIndex++;
              return (
                <TiltCard
                  key={item.title}
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

export default function CampaignHighlights() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [seamWidth, setSeamWidth] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const updateWidth = () => setSeamWidth(el.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    window.addEventListener("resize", updateWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      className="relative w-full overflow-hidden bg-[#6E9FC1] py-16 sm:py-20 lg:py-24"
    >
      {/* =====================================================
          TORN EDGE SEAM — matches AboutHero, transitioning
          from the paper background above into this section
      ====================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          -top-2
          z-20
          h-8
          overflow-hidden
          sm:h-10
          lg:h-12
        "
      >
        {seamWidth > 0 && (
          <div
            className="absolute left-1/2 top-1/2 h-8 sm:h-10 lg:h-12"
            style={{
              width: `${seamWidth + 8}px`,
              transform: "translate(-50%, -50%)",
              backgroundColor: "var(--color-paper, #fff)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
              WebkitMaskImage: `url(${tornEdge})`,
              maskImage: `url(${tornEdge})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
            }}
          />
        )}
      </div>

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
        <h2 className="text-[30px] font-extrabold leading-tight text-white sm:text-[38px] lg:text-[44px]">
          What We Do &ndash; UK-Based Support Campaign
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-2">
          <span className="h-[3px] w-10 rounded-full bg-white/60" />
          <span className="h-[3px] w-6 rounded-full bg-[#C8102E]" />
        </div>
      </motion.div>

      {/* =====================================================
          TWO-COLUMN GRID
      ====================================================== */}
      <div
        style={{ perspective: 1600 }}
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-6xl
          grid-cols-1
          gap-10
          px-5
          sm:px-8
          lg:grid-cols-2
          lg:gap-14
        "
      >
        <CampaignColumn groups={leftColumn} fromLeft={true} />
        <CampaignColumn groups={rightColumn} fromLeft={false} />
      </div>
    </section>
  );
}