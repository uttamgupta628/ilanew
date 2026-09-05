import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

// Placeholder imports — swap these for your real filenames
import testimonial1 from '../assets/images/testimonial-1.png';
import testimonial2 from '../assets/images/testimonial-2.png';
import testimonial3 from '../assets/images/testimonial-3.png';
import testimonial4 from '../assets/images/testimonial-4.png';
import testimonial5 from '../assets/images/testimonial-5.png';
import testimonial6 from '../assets/images/testimonial-6.png';
import who from '../assets/images/who.png';

/* =========================================================
   DATA
========================================================= */

const testimonials = [
  {
    image: testimonial1,
    alt: 'Baroness Sandy Verma speaking at an ILA event',
    title: 'Baroness Sandy Verma',
    context: 'Conservative Peer',
    quote:
      'I think it\u2019s people like yourself sitting in this room today, the work you do, the way you raise issues, ' +
      'the way you support people, particularly people who are going through such challenging times themselves. ' +
      'I\u2019m always, always extremely grateful for organisations like the International Liberty Association, but ' +
      'particularly so I\u2019m grateful to every individual sitting here and beyond, because you are the people that ' +
      'actually enable us to do all of the work that we can do.',
  },
  {
    image: testimonial2,
    alt: 'Robert Torricelli speaking at ILA Noruz celebration 2018',
    title: 'Robert Torricelli',
    context: 'Former US Senator (Democrat) \u2014 Speaking at ILA Noruz celebration 2018',
    quote:
      'To all of you, no matter what you did, you wrote a cheque, said a prayer, went to a meeting, wrote a ' +
      'letter, let me just tell you the simple truth: you saved lives. There are thousands of people alive \u2014 ' +
      'let me be clear: it\u2019s not that they might have been dead, they would be dead. They would have died. ' +
      'No-one was coming to their rescue. And I know there\u2019ll be no plaques, I know the Press didn\u2019t stand ' +
      'outside and talk about your great work, none of you were honoured, because the Press isn\u2019t there it ' +
      'didn\u2019t happen, you just did the right thing.',
  },
  {
    image: testimonial3,
    alt: 'Baroness O\u2019Oloan speaking at ILA Christmas Event 2024',
    title: 'Baroness O\u2019Oloan',
    context: 'Speaking at ILA Christmas Event 2024',
    quote:
      'It\u2019s a privilege to stand here among you, remarkable individuals who make the work of International ' +
      'Liberty Association possible, the volunteers and the supporters. Your commitment, your compassion and ' +
      'your work, your relentless dedication to justice, have built a beacon of hope for those living under ' +
      'oppression. We must all stand together with the Iranian people and their fight for freedom. It is a ' +
      'fight for justice, democracy and peace. Thank you.',
  },
  {
    image: testimonial4,
    alt: 'Lord Steve McCabe speaking at an ILA event',
    title: 'Lord Steve McCabe',
    context: 'Labour Peer',
    quote:
      'I want to begin by thanking the International Liberty Association for putting on this wonderful event ' +
      'and for all of their hard work over the years to help the various people who have fallen foul of events ' +
      'in Iran, and the various people who\u2019ve suffered, or seen members of their family suffer at the hands ' +
      'of this regime.',
  },
  {
    image: testimonial5,
    alt: 'Dr Rowan Williams speaking at an ILA event',
    title: 'Dr Rowan Williams',
    context: 'April 2025 | 104th Archbishop of Canterbury',
    quote:
      'In the face of repression, injustice and cruelty, and very particularly the repression and cruelty that ' +
      'occurs in Iran today, the ILA continues to raise its voice on behalf of the voiceless. It makes sure ' +
      'that their sufferings are not forgotten or ignored in the wider world.',
  },
  {
    image: testimonial6,
    alt: 'Lord Tony Clarke speaking at an ILA event',
    title: 'Lord Tony Clarke',
    context: 'Former Chair of Labour Party',
    quote:
      'ILA enjoys a reputation for doing such wonderful work for human rights and opposing those tyrants who ' +
      'oppose basic human rights. I am sure that all of my colleagues would agree with me when I say: thank you ' +
      'so much, your work is so valuable, and well done.',
  },
];

/* =========================================================
   QUOTE MARK ICON
========================================================= */

function QuoteMarkIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 32V19.2C0 8.533 6.4 1.6 17.067 0l2.4 4.8C11.733 6.933 8 11.2 8 17.6h9.067V32H0zm22.933 0V19.2c0-10.667 6.4-17.6 17.067-19.2l2.4 4.8c-7.734 2.133-11.467 6.4-11.467 12.8h9.067V32H22.933z" />
    </svg>
  );
}

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

function makeCardVariants(fromLeft: boolean): Variants {
  return {
    hidden: {
      opacity: 0,
      x: fromLeft ? -120 : 120,
      rotateY: fromLeft ? -35 : 35,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* =========================================================
   SINGLE TESTIMONIAL CARD
========================================================= */

type TestimonialData = (typeof testimonials)[number];

function TestimonialCard({
  testimonial,
  fromLeft,
}: {
  testimonial: TestimonialData;
  fromLeft: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={makeCardVariants(fromLeft)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      style={{ transformPerspective: 1200 }}
      className="
        flex
        flex-col
        overflow-hidden
        rounded-2xl
        bg-[#F4F4F2]
        shadow-[0_10px_30px_rgba(0,0,0,0.06)]
      "
    >
      {/* IMAGE */}
      <div className="h-[220px] w-full overflow-hidden sm:h-[260px] lg:h-[280px]">
        <img
          src={testimonial.image}
          alt={testimonial.alt}
          className="h-full w-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-[19px] font-extrabold leading-tight text-ink sm:text-[21px]">
          {testimonial.title}
        </h3>

        <p className="mt-1 text-[14px] leading-snug text-ink/60">
          {testimonial.context}
        </p>

        <div
          className="
            mt-4
            border-t
            border-dashed
            border-ink/25
          "
        />

        <div className="relative mt-5 flex-1">
          <QuoteMarkIcon className="absolute -top-1 right-0 h-6 w-8 text-maroon/10" />

          {/* Clamped via inline style (not the Tailwind line-clamp
              utility) so toggling is guaranteed to work regardless
              of Tailwind version/plugin config. */}
          <p
            className="text-[15px] italic leading-[1.7] text-ink/75"
            style={
              expanded
                ? undefined
                : {
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }
            }
          >
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </div>

        {/* READ MORE — toggles full quote in place */}
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="
            group
            relative
            mt-5
            inline-flex
            w-fit
            items-center
            gap-3
            overflow-hidden
            rounded-full
            border
            border-maroon
            bg-white
            py-2.5
            pl-5
            pr-2.5
            text-[14px]
            font-semibold
            text-maroon
            transition-all
            duration-300
            hover:text-white
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

          <span className="relative z-10">
            {expanded ? 'Show less' : 'Read more'}
          </span>

          <span
            className="
              relative
              z-10
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-maroon/10
              transition-all
              duration-300
              group-hover:rotate-45
              group-hover:bg-white/20
            "
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </motion.div>
  );
}

/* =========================================================
   SECTION
========================================================= */

export default function Testimonials() {
  return (
    <section className="relative bg-paper py-16 sm:py-20 lg:py-24">
      {/* =================================================
          WHO WE ARE IMAGE
      ================================================= */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          justify-center
          px-5
          pb-12
          sm:pb-16
          lg:pb-20
        "
      >
        <img
          src={who}
          alt="Who We Are"
          className="
            block
            h-auto
            w-auto
            max-w-[260px]
            object-contain
            sm:max-w-[320px]
            lg:max-w-[380px]
          "
        />
      </motion.div>

      {/* =================================================
          TESTIMONIAL GRID
      ================================================= */}
      <div
        style={{ perspective: 1600 }}
        className="
          mx-auto
          grid
          w-full
          max-w-6xl
          grid-cols-1
          gap-8
          px-5
          sm:px-8
          lg:grid-cols-2
          lg:gap-10
        "
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.title}
            testimonial={testimonial}
            fromLeft={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}