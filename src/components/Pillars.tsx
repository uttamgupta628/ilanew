import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

import campaignExecutions from '../assets/images/camp.png';
import campaignSurvivors from '../assets/images/camp1.png';
import campaignSignImage from '../assets/images/campaign-sign.png';

/* =========================================================
   TYPEWRITER HEADING (continuous loop)

   Types out the given text character by character, pauses,
   deletes it back out, pauses again, then repeats forever.
   whiteSpace: 'pre-line' preserves manual '\n' line breaks
   while typing. Matches the hero headline's animation.
========================================================= */

function TypewriterHeading({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const TYPE_SPEED = 45;
    const DELETE_SPEED = 25;
    const PAUSE_FULL = 2200;
    const PAUSE_EMPTY = 600;

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText === text) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_FULL);
    } else if (isDeleting && typedText === '') {
      timeout = setTimeout(() => setIsDeleting(false), PAUSE_EMPTY);
    } else {
      timeout = setTimeout(
        () => {
          setTypedText((prev) =>
            isDeleting
              ? text.slice(0, prev.length - 1)
              : text.slice(0, prev.length + 1)
          );
        },
        isDeleting ? DELETE_SPEED : TYPE_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, text]);

  return (
    <span className={className} style={{ whiteSpace: 'pre-line' }}>
      {typedText}

      <motion.span
        aria-hidden="true"
        className="
          ml-1
          inline-block
          w-[3px]
          translate-y-[2px]
          bg-current
          align-middle
        "
        style={{ height: '0.85em' }}
        animate={{
          opacity: [1, 1, 0, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
          times: [0, 0.5, 0.5, 1],
        }}
      />
    </span>
  );
}

/* =========================================================
   SCROLL PROGRESS
========================================================= */

function useScrollProgress(
  ref: React.RefObject<HTMLDivElement | null>
) {
  const [progress, setProgress] = useState(0);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateTarget = () => {
      const el = ref.current;

      if (!el) return;

      const rect = el.getBoundingClientRect();

      /*
       * Find the center of the component
       */
      const componentCenter = rect.top + rect.height / 2;

      /*
       * Find the center of the viewport
       */
      const viewportCenter = window.innerHeight / 2;

      /*
       * Distance between component center
       * and viewport center
       */
      const distanceFromCenter = Math.abs(
        componentCenter - viewportCenter
      );

      /*
       * Controls how far the animation works
       * from the viewport center.
       */
      const maxDistance = window.innerHeight * 0.75;

      /*
       * 0 = far from center
       * 1 = exactly at center
       */
      const nextProgress = Math.max(
        0,
        Math.min(
          1,
          1 - distanceFromCenter / maxDistance
        )
      );

      targetRef.current = nextProgress;
    };

    const animate = () => {
      const diff =
        targetRef.current - currentRef.current;

      /*
       * Smooth movement
       */
      currentRef.current += diff * 0.08;

      if (Math.abs(diff) < 0.001) {
        currentRef.current = targetRef.current;
      }

      setProgress(currentRef.current);

      frameRef.current =
        requestAnimationFrame(animate);
    };

    updateTarget();

    window.addEventListener(
      'scroll',
      updateTarget,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      updateTarget
    );

    frameRef.current =
      requestAnimationFrame(animate);

    return () => {
      window.removeEventListener(
        'scroll',
        updateTarget
      );

      window.removeEventListener(
        'resize',
        updateTarget
      );

      if (frameRef.current !== null) {
        cancelAnimationFrame(
          frameRef.current
        );
      }
    };
  }, [ref]);

  return progress;
}

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
  index,
}: CampaignCardProps) {
  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const imgWrapRef =
    useRef<HTMLDivElement>(null);

  const descriptionRef =
    useRef<HTMLParagraphElement>(null);

  const [spot, setSpot] = useState({
    x: 50,
    y: 50,
  });

  const [isOverflowing, setIsOverflowing] =
    useState(false);

  const progress =
    useScrollProgress(wrapperRef);

  /*
   * Odd cards have image on the right.
   */
  const imageOnRight = index % 2 === 1;

  /* =======================================================
     DESCRIPTION OVERFLOW
  ======================================================= */

  useLayoutEffect(() => {
    const checkOverflow = () => {
      const el = descriptionRef.current;

      if (!el) return;

      setIsOverflowing(
        el.scrollHeight > el.clientHeight + 1
      );
    };

    checkOverflow();

    window.addEventListener(
      'resize',
      checkOverflow
    );

    return () => {
      window.removeEventListener(
        'resize',
        checkOverflow
      );
    };
  }, [description]);

  const displayCta = isOverflowing
    ? 'Read more'
    : cta;

  /* =======================================================
     CENTER-BASED ANIMATION
  ======================================================= */

  /*
   * At the center:
   *
   * progress = 1
   * translate = 0
   *
   * Away from center:
   *
   * progress = 0
   * translate = 150px
   *
   * Therefore:
   *
   * FAR → CLOSE → FAR
   */

  const maxTranslate = 150;

  const translateAmount =
    (1 - progress) * maxTranslate;

  /*
   * Image and content move toward each other.
   */

  const imageTranslateX = imageOnRight
    ? translateAmount
    : -translateAmount;

  const cardTranslateX = imageOnRight
    ? -translateAmount
    : translateAmount;

  /* =======================================================
     MOUSE FOLLOW
  ======================================================= */

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;

    const y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;

    setSpot({
      x,
      y,
    });
  };

  const handleMouseLeave = () => {
    setSpot({
      x: 50,
      y: 50,
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="
        relative
        mx-auto
        w-full
        max-w-[1200px]

        lg:min-h-[620px]
        xl:min-h-[650px]
      "
    >
      {/* =================================================
          IMAGE
      ================================================= */}

      <div
        ref={imgWrapRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          group
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

          ${imageOnRight ? 'lg:ml-auto' : ''}
        `}
        style={{
          transform: `translateX(${imageTranslateX}px)`,
          transition: 'none',
          willChange: 'transform',
        }}
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

        {/* Mouse-follow highlight */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0

            opacity-0
            transition-opacity
            duration-500

            group-hover:opacity-100
          "
          style={{
            background: `radial-gradient(
              circle at ${spot.x}% ${spot.y}%,
              rgba(255,255,255,0.20),
              transparent 35%
            )`,
          }}
        />

        {/* Hover overlay */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0

            bg-black/0

            transition-colors
            duration-500

            group-hover:bg-black/10
          "
        />
      </div>

      {/* =================================================
          CONTENT CARD
      ================================================= */}

      <div
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

          /*
           * IMPORTANT:
           * These keep the card vertically centered
           * against the image.
           */
          lg:top-1/2
          lg:-translate-y-1/2

          lg:h-[488px]
          lg:overflow-hidden

          lg:flex
          lg:flex-col
          lg:justify-center

          xl:h-[512px]

          ${
            imageOnRight
              ? 'left-[-2%] lg:left-[-3%]'
              : 'right-[-2%] lg:right-[-3%]'
          }

          top-auto
          -bottom-10

          lg:bottom-auto
        `}
        style={{
          /*
           * ONLY horizontal movement here.
           *
           * Vertical centering is handled by:
           *
           * lg:top-1/2
           * lg:-translate-y-1/2
           */
          transform: `translateX(${cardTranslateX}px)`,
          transition: 'none',
          willChange: 'transform',
        }}
      >
        {/* =================================================
            INNER CONTENT
        ================================================= */}

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 1 + index * 0.2,
          }}
          className="
            flex
            min-h-0
            w-full
            flex-col
          "
        >
          {/* Eyebrow */}

          <p
            className="
              mb-5
              shrink-0

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

          {/* Heading */}

          <h3
            className="
              mb-1
              shrink-0

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

          {/* Description */}

          <p
            ref={descriptionRef}
            className="
              mb-6

              text-[14px]
              leading-[1.7]
              text-muted-light

              sm:text-[15px]

              lg:text-[15.5px]

              lg:line-clamp-5
              lg:overflow-hidden
            "
          >
            {description}
          </p>

          {/* CTA */}

          <a
           href={href}
  target="_blank"
  rel="noopener noreferrer"
  className="
    group/cta

    relative
    overflow-hidden

    mt-auto
    shrink-0

    inline-flex
    w-fit

    items-center
    gap-2

    rounded-full

    border
    border-maroon

    px-5
    py-2.5

    text-[13px]
    font-semibold
    text-maroon

    transition-colors
    duration-1500

    hover:text-white
  "
>
  {/* Bottom-up fill background */}
  <span
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      inset-0

      origin-bottom
      scale-y-0

      transition-transform
      duration-500
      ease-out

      group-hover/cta:scale-y-100
    "
    style={{ backgroundColor: '#C8102E' }}
  />

  <span className="relative z-10">
    {displayCta}
  </span>

  <span
    className="
      relative
      z-10

      inline-block

      transition-transform
      duration-300

      group-hover/cta:translate-x-1
    "
  >
    →
  </span>
</a>
        </motion.div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PILLARS
========================================================= */

export default function Pillars() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-paper

        px-4
        py-20

        sm:px-6
        sm:py-24

        lg:px-8
        lg:py-28
      "
    >
      <div
        className="
          mx-auto
          max-w-[1400px]
        "
      >
        {/* =================================================
            INTRO
        ================================================= */}

        <Reveal>
          <div
            className="
              relative

              mx-auto
              mb-20

              max-w-[850px]

              text-center

              lg:mb-28
            "
          >
            {/* Campaign sign */}

            <img
              src={campaignSignImage}
              alt=""
              aria-hidden="true"
              className="
                pointer-events-none

                absolute

                left-1/2
                top-0

                w-[95px]

                -translate-x-1/2
                -translate-y-[55%]

                opacity-90

                sm:w-[115px]

                lg:w-[135px]
              "
            />

            {/* Eyebrow */}

            <p
              className="
                relative

                mb-4
                pt-12

                text-[13px]
                font-semibold
                uppercase
                tracking-[0.18em]

                text-maroon

                sm:text-[14px]
              "
            >
              Our Campaigns
            </p>

            {/* Heading (continuous typewriter animation) */}

            <h2
              className="
                font-sans

                text-[32px]
                font-extrabold

                leading-[1.1]
                tracking-[-0.03em]

                text-ink

                sm:text-[40px]

                md:text-[48px]

                lg:text-[56px]
              "
            >
              <TypewriterHeading text={'Turning conviction\ninto action.'} />
            </h2>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-6

                max-w-[700px]

                text-[15px]
                leading-[1.8]

                text-muted-light

                sm:text-[16px]
              "
            >
              We work to protect human dignity,
              defend vulnerable people, and create
              meaningful change through campaigns
              that turn awareness into action.
            </p>
          </div>
        </Reveal>

        {/* =================================================
            CAMPAIGNS
        ================================================= */}

        <div
          className="
            flex
            flex-col

            gap-24

            sm:gap-32

            lg:gap-36
          "
        >
          {/* =================================================
              CAMPAIGN 1
          ================================================= */}

          <CampaignCard
            href="https://iliberty.org.uk/campaign/stopping-executions-defending-the-vulnerable/"
            eyebrow="Human Rights Campaign"
            title="Stopping executions. Defending the vulnerable."
            description="We campaign to oppose the death penalty and defend the dignity and rights of people facing execution. Through advocacy, public awareness, and direct action, we work toward a world where justice does not depend on taking a life."
            cta="Read about this campaign"
            image={campaignExecutions}
            imageAlt="Campaign against executions"
            index={0}
          />

          {/* =================================================
              CAMPAIGN 2
          ================================================= */}

          <CampaignCard
            href="https://iliberty.org.uk/campaign/helping-survivors-rebuild-in-the-uk-2/"
            eyebrow="Survivor Support"
            title="Helping survivors rebuild in the UK"
            description="Survivors of violence and persecution often face enormous challenges after reaching safety. Our work supports survivors as they rebuild their lives in the UK, helping them access practical support, regain confidence, and move toward a safer and more independent future."
            cta="See how we help"
            image={campaignSurvivors}
            imageAlt="Helping survivors rebuild their lives"
            index={1}
          />
        </div>
      </div>

      {/* =====================================================
          IMAGE ANIMATION
      ===================================================== */}

      <style>
        {`
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
        `}
      </style>
    </section>
  );
}