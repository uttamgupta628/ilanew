
import { motion, type Variants } from 'framer-motion';

// Placeholder imports — swap for your real filenames
import whatDrivesUsImg from '../assets/images/what-drives-us.png';
import coreActivitiesImg from '../assets/images/core-activities.png';

/* =========================================================
   DATA
========================================================= */

type PillarItem = {
  title: string;
  description: string;
};

type PillarData = {
  heading: string;
  image: string;
  imageAlt: string;
  items: PillarItem[];
  imageSide: 'left' | 'right';
};

const pillars: PillarData[] = [
  {
    heading: 'What Drives Us',
    image: whatDrivesUsImg,
    imageAlt: 'ILA supporters holding solidarity signs',
    imageSide: 'left',
    items: [
      {
        title: 'Inclusion',
        description:
          'We believe in a society where differences are celebrated and shared values unite us.',
      },
      {
        title: 'Justice',
        description: 'We fight for legal redress and policy change.',
      },
      {
        title: 'Dignity',
        description: 'We treat every individual with respect and compassion.',
      },
    ],
  },
  {
    heading: 'Core Activities',
    image: coreActivitiesImg,
    imageAlt: 'ILA event attendees holding star placards',
    imageSide: 'right',
    items: [
      {
        title: 'Integration Education & Training',
        description: 'Language, digital skills, and cultural orientation workshops.',
      },
      {
        title: 'Youth Engagement',
        description: 'Anti-radicalisation programmes and classes on social responsibility.',
      },
      {
        title: 'Advocacy',
        description:
          'Public campaigns, petitions and policy briefs targeting Human Rights abuses.',
      },
      {
        title: 'Survivor Justice',
        description:
          'Coordinating testimonies, legal casework, and international cooperation.',
      },
    ],
  },
];

/* =========================================================
   CHECK ICON
========================================================= */

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maroon ${className}`}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 8.5L6 12.5L14 3.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* =========================================================
   ANIMATION VARIANTS
   fromLeft = true  -> element enters travelling from the left
   fromLeft = false -> element enters travelling from the right
========================================================= */

function makeSlideVariants(fromLeft: boolean): Variants {
  return {
    hidden: {
      opacity: 0,
      x: fromLeft ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };
}

/* =========================================================
   SINGLE PILLAR ROW
========================================================= */

function PillarRow({ pillar }: { pillar: PillarData }) {
  const imageFromLeft = pillar.imageSide === 'left';
  // text always enters from the opposite side of the image
  const textFromLeft = !imageFromLeft;

  return (
    <div
      className={`
        grid
        grid-cols-1
        items-center
        gap-10
        lg:grid-cols-2
        lg:gap-16
      `}
    >
      {/* IMAGE */}
      <motion.div
        variants={makeSlideVariants(imageFromLeft)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={`
          overflow-hidden
          rounded-2xl
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
          ${pillar.imageSide === 'right' ? 'lg:order-2' : 'lg:order-1'}
        `}
      >
        <img
          src={pillar.image}
          alt={pillar.imageAlt}
          className="h-[280px] w-full object-cover sm:h-[340px] lg:h-[400px]"
        />
      </motion.div>

      {/* TEXT */}
      <motion.div
        variants={makeSlideVariants(textFromLeft)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={`
          ${pillar.imageSide === 'right' ? 'lg:order-1' : 'lg:order-2'}
        `}
      >
        <h2 className="text-[32px] font-extrabold leading-tight text-ink sm:text-[40px]">
          {pillar.heading}
        </h2>

        <div className="mt-3 mb-8 h-[3px] w-16 bg-maroon" />

        <ul className="space-y-6">
          {pillar.items.map((item) => (
            <li key={item.title} className="flex gap-3">
              <CheckIcon className="mt-0.5" />
              <div>
                <h3 className="text-[17px] font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink/70">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

export default function Pillars() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-5 sm:px-8 lg:gap-28">
        {pillars.map((pillar) => (
          <PillarRow key={pillar.heading} pillar={pillar} />
        ))}
      </div>
    </section>
  );
}