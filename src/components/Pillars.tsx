import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

import campaignExecutions from '../assets/images/camp.png';
import campaignSurvivors from '../assets/images/camp1.png';
import campaignSignImage from '../assets/images/campaign-sign.png';

/* =========================================================
   TYPES
========================================================= */

interface CampaignCardProps {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  cardAlign: 'left' | 'right';
  index: number;
}

/* =========================================================
   CAMPAIGN CARD
========================================================= */

function CampaignCard({
  href,
  eyebrow,
  title,
  description,
  cta,
  image,
  imageAlt,
  cardAlign,
  index,
}: CampaignCardProps) {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [spot, setSpot] = useState({
    x: 50,
    y: 50,
  });

  const [isOverflowing, setIsOverflowing] = useState(false);

  /* =======================================================
     MOUSE SPOTLIGHT
  ======================================================= */

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const el = imgWrapRef.current;

    if (!el) return;

    const rect = el.getBoundingClientRect();

    setSpot({
      x:
        ((e.clientX - rect.left) /
          rect.width) *
        100,

      y:
        ((e.clientY - rect.top) /
          rect.height) *
        100,
    });
  }

  /* =======================================================
     CONTENT OVERFLOW CHECK
     Card is capped at 80% of the image height on lg+.
     If the natural content is taller than that, clamp the
     description and swap the CTA label to "Read more".
  ======================================================= */

  useLayoutEffect(() => {
    const el = cardRef.current;

    if (!el) return;

    setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
  }, [description]);

  const displayCta = isOverflowing ? 'Read more' : cta;

  /* =======================================================
     CARD POSITION
  ======================================================= */

  const cardPositionClass =
    cardAlign === 'right'
      ? 'right-[-2%] lg:right-[-3%]'
      : 'left-[-2%] lg:left-[-3%]';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        relative
        block
      "
    >

      {/* =====================================================
          IMAGE + CARD WRAPPER
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1200px]

          lg:min-h-[620px]
          xl:min-h-[650px]
        "
      >

        {/* ===================================================
            BIG IMAGE
        =================================================== */}

        <div
          ref={imgWrapRef}
          onMouseMove={handleMouseMove}
          className="
            relative
            overflow-hidden
            rounded-[26px]

            h-[390px]
            sm:h-[480px]
            md:h-[560px]

            lg:h-[610px]
            xl:h-[640px]

            w-full

            lg:w-[63%]
          "
        >

          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="
              h-full
              w-full

              object-cover

              scale-[1.08]

              opacity-0
              blur-[6px]

              animate-[cardImgIn_1s_ease-out_forwards]

              transition-transform
              duration-[900ms]
              ease-out

              will-change-transform

              group-hover:scale-[1.04]
            "
          />

          {/* =================================================
              MOUSE SPOTLIGHT
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0

              opacity-0

              transition-opacity
              duration-1500

              group-hover:opacity-100
            "
            style={{
              background: `
                radial-gradient(
                  circle at ${spot.x}% ${spot.y}%,
                  rgba(255,255,255,0.18),
                  transparent 45%
                )
              `,
            }}
          />

          {/* =================================================
              IMAGE TINT
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0

              bg-ink/0

              transition-colors
              duration-500

              group-hover:bg-ink/10
            "
          />

        </div>


        {/* ===================================================
            OVERLAPPING TEXT CARD
            Capped to 80% of the image height on lg/xl so it
            never runs past the image bounds.
        =================================================== */}

        <motion.div
          ref={cardRef}
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: [0, -10, 0],
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            opacity: {
              duration: 0.8,
              delay: 0.25,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            },

            y: {
              duration: 3.8,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay:
                1 +
                index * 0.2,
            },
          }}
          className={`
            absolute

            z-20

            w-[88%]
            max-w-[500px]

            rounded-[24px]

            bg-paper

            p-6

            shadow-[0_25px_70px_rgba(0,0,0,0.16)]

            sm:p-8

            lg:w-[50%]
            lg:max-w-[540px]

            lg:top-1/2
            lg:-translate-y-1/2

            lg:h-[488px]
            lg:overflow-hidden
            lg:flex
            lg:flex-col
            lg:justify-center

            xl:h-[512px]

            ${cardPositionClass}

            /* MOBILE */
            top-auto
            -bottom-10

            lg:bottom-auto
          `}
        >

          {/* =================================================
              TITLE
          ================================================== */}

          <h3
            className="
              mb-1

              font-sans
              text-[19px]
              font-extrabold
              leading-tight

              text-ink

              sm:text-[21px]
              lg:text-[22px]
            "
          >
            {title}
          </h3>


          {/* =================================================
              EYEBROW
          ================================================== */}

          <p
            className="
              mb-5

              text-[13px]
              font-medium
              uppercase
              tracking-wide

              text-maroon

              sm:text-[13.5px]
            "
          >
            {eyebrow}
          </p>


          {/* =================================================
              DESCRIPTION
              Clamped once we know the card overflows its
              80%-of-image cap, so the CTA always stays visible.
          ================================================== */}

          <p
            className={`
              mb-6

              text-[14px]
              leading-[1.7]

              text-muted-light

              sm:text-[15px]
              lg:text-[15.5px]

              ${isOverflowing ? 'lg:line-clamp-5' : ''}
            `}
          >
            {description}
          </p>


          {/* =================================================
              CTA BUTTON
          ================================================= */}

          <span
            className="
              campaign-button

              relative
              inline-flex

              items-center
              gap-3

              overflow-hidden

              rounded-full

              border
              border-[#C8102E]

              bg-white

              py-3
              pl-5
              pr-2

              text-[14px]
              font-semibold

              text-ink

              transition-colors
              duration-500

              sm:text-[14.5px]
            "
          >

            {/* =================================================
                BOTTOM → TOP HOVER FILL
            ================================================= */}

            <span
              className="
                campaign-button-fill

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

            {/* =================================================
                BUTTON TEXT
            ================================================= */}

            <span
              className="
                relative
                z-10

                transition-colors
                duration-500

                group-hover:text-white
              "
            >
              {displayCta}
            </span>


            {/* =================================================
                ARROW
            ================================================= */}

            <span
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

                bg-[#C8102E]/10

                text-[#C8102E]

                transition-all
                duration-500

                group-hover:rotate-45
                group-hover:bg-white/20
                group-hover:text-white
              "
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

          </span>

        </motion.div>

      </div>

    </a>
  );
}


/* =========================================================
   PILLARS
========================================================= */

export default function Pillars() {
  return (
    <section
      id="campaigns"
      className="
        overflow-hidden
      "
    >

      {/* =====================================================
          CARD IMAGE ANIMATION
      ====================================================== */}

      <style>{`

        @keyframes cardImgIn {

          from {
            opacity: 0;
            filter: blur(6px);
            transform: scale(1.14);
          }

          to {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1.08);
          }

        }

      `}</style>


      {/* =====================================================
          INTRO
      ====================================================== */}

      <Reveal>

        <div
          className="
            mx-auto
            max-w-[1200px]

            px-5

            pb-8
            pt-16

            text-center

            sm:px-8
            sm:pb-12
            sm:pt-24

            lg:pb-14
            lg:pt-28
          "
        >

          {/* =================================================
              SIGN / BIRD ARTWORK
          ================================================== */}

          <img
            src={campaignSignImage}
            alt=""
            aria-hidden="true"
            className="
              mx-auto

              mb-6

              h-[220px]
              w-auto

              object-contain

              sm:h-[280px]

              lg:h-[320px]
            "
          />


          {/* =================================================
              INTRO TEXT
          ================================================== */}

          <p
            className="
              mx-auto

              max-w-[62ch]

              text-[15.5px]
              leading-relaxed

              text-muted-light

              sm:text-[17px]
            "
          >
            Every programme we run protects
            dignity, strengthens communities,
            and contributes to a more informed
            and compassionate UK society.
          </p>

        </div>

      </Reveal>


      {/* =====================================================
          CAMPAIGN CARDS
      ====================================================== */}

      <div
        className="
          mx-auto

          max-w-[1200px]

          px-5

          pb-32

          sm:px-8
          sm:pb-40

          lg:pb-48
        "
      >

        <div
          className="
            flex
            flex-col

            gap-24

            sm:gap-32
          "
        >

          {/* =================================================
              CAMPAIGN 1
          ================================================== */}

          <Reveal>

            <CampaignCard
              href="https://iliberty.org.uk/campaign/stopping-executions-defending-the-vulnerable/"
              eyebrow="Raising awareness"
              title="Stopping executions. Defending the vulnerable."
              description="We campaign to end executions in Iran and defend the rights of prisoners of conscience through powerful public action and relentless advocacy. From organising demonstrations, letter-writing drives, and mass petitions to gathering evidence from inside prisons, we bring global attention to their suffering.
Through publications, satellite broadcasts, and social media, we expose the regime’s crimes and echo the voices of the silenced—especially women, children, and religious minorities facing brutal oppression. Every name we say, every voice we amplify, brings us closer to justice."
              cta="Read about this campaign"
              image={campaignExecutions}
              imageAlt="Vigil supporting victims of executions in Iran"
              cardAlign="right"
              index={0}
            />

          </Reveal>


          {/* =================================================
              CAMPAIGN 2
          ================================================== */}

          <Reveal delay={0.08}>

            <CampaignCard
              href="https://iliberty.org.uk/campaign/helping-survivors-rebuild-in-the-uk-2/"
              eyebrow="Community support"
              title="Helping survivors rebuild in the UK"
              description="We support refugees, survivors of human rights abuses, migrants, and vulnerable families across the UK to rebuild their lives, strengthen their independence, and feel more connected to the communities around them.

Our programmes address some of the everyday barriers that can make rebuilding life in a new country difficult. Through regular digital skills workshops, we help older migrants gain the confidence to use smartphones, access online services, communicate with family and friends, and navigate an increasingly digital society. For many older people who may face language barriers or social isolation, these sessions also provide a welcoming space to build friendships, stay connected, and become more involved in their local community.

We also work closely with young people and families. Our youth programmes engage hundreds of participants each year through weekly workshops, educational activities, community events, and opportunities to develop confidence, skills, and meaningful social connections. Where families are experiencing financial hardship, we also provide practical assistance, including grants to schools to help cover essential items such as school uniforms, helping ensure that children can participate fully in school life without additional financial pressure on their families.

Alongside this, we provide one-to-one integration support, community meetings, online sessions, and practical guidance for people adjusting to life in the UK. Across more than 50 digital skills sessions each year, weekly youth activities, one-to-one support, and over 60 online community meetings, our aim is not simply to provide short-term help, but to reduce isolation, strengthen resilience, build confidence, and enable people to participate fully and independently in British society."
              cta="See how we help"
              image={campaignSurvivors}
              imageAlt="One-to-one integration support session"
              cardAlign="right"
              index={1}
            />

          </Reveal>

        </div>

      </div>

    </section>
  );
}