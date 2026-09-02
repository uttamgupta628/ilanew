import { useState } from 'react';
import { motion } from 'framer-motion';

import campaignExecutions from '../assets/images/campaign-executions.jpg';
import campaignSurvivors from '../assets/images/campaign-survivors.jpg';

/* =========================================================
   DATA
========================================================= */

const campaigns = [
  {
    number: '01.',
    image: campaignExecutions,
    alt: 'ILA campaign against executions and oppression',
    title: 'Standing Against Executions And Oppression',
    body:
      'We campaign internationally against the death penalty and the oppression that drives people from their homes. ' +
      'Our advocacy work raises awareness of injustice worldwide and puts direct pressure on the systems that put ' +
      'vulnerable people in harm\u2019s way, giving a voice to individuals facing persecution who would otherwise go unheard.',
    highlight:
      'Every case we take up is a step toward a world where dignity isn\u2019t conditional.',
    ctaLabel: 'Browse this campaign',
    ctaHref: '#',
  },
  {
    number: '02.',
    image: campaignSurvivors,
    alt: 'ILA volunteers supporting survivors rebuilding their lives in the UK',
    title: 'Helping Survivors Rebuild In The UK',
    body:
      'We deliver practical support to refugees, survivors, and vulnerable diaspora communities rebuilding their ' +
      'lives in the UK. That means more than 50 annual digital literacy sessions, one-to-one integration advice ' +
      'clinics, youth leadership workshops engaging around 40 participants weekly, and community wellbeing seminars ' +
      'that bring people back into connection with one another.',
    highlight:
      'ILA will direct your support to the area of greatest need and impact.',
    ctaLabel: 'Browse all programmes',
    ctaHref: 'https://iliberty.org.uk/campaign/helping-survivors-rebuild-in-the-uk-2/',
  },
];

/* =========================================================
   TRUNCATED TEXT WITH "READ MORE" TOGGLE
========================================================= */

function ExpandableCopy({
  body,
  highlight,
}: {
  body: string;
  highlight: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p
        className={`
          text-[16px]
          leading-[1.7]
          text-[#33322B]
          transition-all
          duration-300
          ${expanded ? '' : 'line-clamp-4'}
        `}
      >
        {body}
      </p>

      {expanded && (
        <p className="mt-3 text-[16px] font-semibold leading-[1.6] text-maroon">
          {highlight}
        </p>
      )}

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="
          mt-3
          text-[14px]
          font-semibold
          text-maroon
          underline
          underline-offset-4
          decoration-maroon/40
          transition-colors
          hover:decoration-maroon
        "
      >
        {expanded ? 'Show less' : 'Read more'}
      </button>
    </div>
  );
}

/* =========================================================
   SINGLE CAMPAIGN ROW
========================================================= */

function CampaignRow({
  campaign,
  imageFromRight,
}: {
  campaign: (typeof campaigns)[number];
  imageFromRight: boolean;
}) {
  const imageOrderClass = imageFromRight ? 'lg:order-2' : 'lg:order-1';
  const textOrderClass = imageFromRight ? 'lg:order-1' : 'lg:order-2';

  return (
    <div
      className="
        grid
        grid-cols-1
        items-center
        gap-10
        lg:grid-cols-2
        lg:gap-16
      "
    >
      {/* IMAGE — fixed height so it doesn't stretch to the row,
          cropped via object-cover, then floats once settled */}
      <motion.div
        initial={{
          opacity: 0,
          x: imageFromRight ? 80 : -80,
          y: 0,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: [0, -12, 0],
        }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          y: {
            duration: 3.2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 0.8,
          },
        }}
        className={`
          h-[280px]
          overflow-hidden
          rounded-2xl
          sm:h-[340px]
          lg:h-[400px]
          ${imageOrderClass}
        `}
      >
        <img
          src={campaign.image}
          alt={campaign.alt}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* TEXT — same entrance-then-float treatment, opposite direction */}
      <motion.div
        initial={{
          opacity: 0,
          x: imageFromRight ? -80 : 80,
          y: 0,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: [0, -12, 0],
        }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          opacity: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
          y: {
            duration: 3.2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 0.9,
          },
        }}
        className={`
          flex
          flex-col
          justify-center
          ${textOrderClass}
        `}
      >
        <h3 className="mb-5 flex items-baseline gap-2 font-sans text-[28px] font-extrabold leading-tight text-ink sm:text-[34px]">
          <span className="text-maroon">{campaign.number}</span>
          {campaign.title}
        </h3>

        <ExpandableCopy body={campaign.body} highlight={campaign.highlight} />

        <a
          href={campaign.ctaHref}
          className="
            mt-7
            inline-block
            w-fit
            rounded-md
            border
            border-maroon/30
            bg-[#FBF4EC]
            px-6
            py-3
            text-[14.5px]
            font-semibold
            text-maroon
            transition-colors
            duration-300
            hover:bg-maroon
            hover:text-white
          "
        >
          {campaign.ctaLabel}
        </a>
      </motion.div>
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

export default function CampaignHighlights() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-20 px-5 sm:px-8 sm:gap-28">
        {/* HEADING — centered */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="
            text-center
            font-serif
            text-[32px]
            font-semibold
            tracking-tight
            text-ink
            sm:text-[40px]
          "
        >
          Who We Are
        </motion.h2>

        <CampaignRow campaign={campaigns[0]} imageFromRight={false} />
        <CampaignRow campaign={campaigns[1]} imageFromRight={true} />
      </div>
    </section>
  );
}