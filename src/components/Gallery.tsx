import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { helpCards } from '../data/content';

interface HelpTileProps {
  title: string;
  body: string;
  cta: string;
  href: string;
  img: string;
  innerRef: (el: HTMLAnchorElement | null) => void;
}

function HelpTile({
  title,
  body,
  cta,
  href,
  img,
  innerRef,
}: HelpTileProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={innerRef}
      className="
        absolute
        top-1/2
        left-1/2
        w-[400px]
        sm:w-[430px]
        lg:w-[460px]
        bg-white
        rounded-[28px]
        overflow-hidden
        shadow-[0_20px_55px_rgba(0,0,0,0.20)]
        border
        border-black/[0.04]
      "
      style={{
        willChange: 'transform, opacity',
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={img}
          alt={title}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            ease-out
          "
        />

        {/* Very subtle image overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/10
            via-transparent
            to-transparent
            pointer-events-none
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          px-8
          py-8
          sm:px-9
          sm:py-9
          flex
          flex-col
        "
      >
        {/* TITLE */}

        <h4
          className="
            text-[25px]
            sm:text-[27px]
            font-bold
            text-ink
            mb-4
            leading-snug
          "
        >
          {title}
        </h4>

        {/* BODY */}

        <p
          className="
            text-[17px]
            sm:text-[18px]
            text-gray-600
            leading-[1.75]
            mb-7
          "
        >
          {body}
        </p>

        {/* CTA */}

        <span
          className="
            inline-flex
            items-center
            gap-2.5
            text-[17px]
            sm:text-[18px]
            font-bold
            mt-auto
          "
          style={{
            color: '#C8102E',
          }}
        >
          {cta}

          <span
            className="
              inline-flex
              items-center
              justify-center
              text-[19px]
              transition-transform
              duration-300
            "
          >
            ▸
          </span>
        </span>
      </div>
    </a>
  );
}

/* =========================================================
   CAROUSEL SETTINGS
========================================================= */

const SPACING = 470;

// How far cards move backward in 3D space
const Z_DEPTH = 210;

// Scale of side cards
const SIDE_SCALE = 0.78;

// Automatic rotation speed
const AUTO_SPEED = 0.0035;

// How quickly the carousel catches up with its target
const SMOOTHING = 0.075;

export default function Gallery() {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Current visual position
  const positionRef = useRef(0);

  // Desired position
  const targetPositionRef = useRef(0);

  const [isPaused, setIsPaused] = useState(false);

  const frameRef = useRef<number | null>(null);

  const numCards = helpCards.length;

  /* =========================================================
     HELPER
  ========================================================= */

  function shortestDistance(
    cardIndex: number,
    centerPosition: number
  ) {
    let delta = cardIndex - centerPosition;

    while (delta > numCards / 2) {
      delta -= numCards;
    }

    while (delta < -numCards / 2) {
      delta += numCards;
    }

    return delta;
  }

  /* =========================================================
     APPLY CARD TRANSFORMS
  ========================================================= */

  function applyTransforms(position: number) {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;

      const delta = shortestDistance(i, position);

      const absDelta = Math.min(
        Math.abs(delta),
        1.6
      );

      /*
       * Horizontal movement
       */
      const x = delta * SPACING;

      /*
       * 3D depth
       */
      const z = -absDelta * Z_DEPTH;

      /*
       * Scale
       */
      const scale =
        1 -
        absDelta *
          (1 - SIDE_SCALE);

      /*
       * Rotate cards slightly toward the center
       */
      const rotateY = delta * -10;

      /*
       * Slight vertical movement
       */
      const y = absDelta * 7;

      /*
       * Smooth opacity
       */
      let opacity = 1;

      if (absDelta > 0.85) {
        opacity =
          1 -
          (absDelta - 0.85) /
            0.65;

        opacity = Math.max(
          0,
          opacity
        );
      }

      /*
       * Center card gets highest z-index
       */
      const zIndex = Math.round(
        2000 -
          absDelta * 700
      );

      /*
       * Hide cards far outside visible area
       */
      const pointerEvents =
        opacity < 0.12
          ? 'none'
          : 'auto';

      /*
       * Slight shadow variation
       */
      const shadowStrength =
        Math.max(
          0.08,
          0.22 -
            absDelta * 0.07
        );

      el.style.transform = `
        translate(-50%, -50%)
        translate3d(${x}px, ${y}px, ${z}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;

      el.style.opacity =
        String(opacity);

      el.style.zIndex =
        String(zIndex);

      el.style.pointerEvents =
        pointerEvents;

      el.style.boxShadow = `
        0 ${12 + absDelta * 8}px
        ${35 + absDelta * 20}px
        rgba(0, 0, 0, ${shadowStrength})
      `;
    });
  }

  /* =========================================================
     ANIMATION LOOP
  ========================================================= */

  useEffect(() => {
    const animate = () => {
      /*
       * Automatic movement
       */
      if (!isPaused) {
        targetPositionRef.current =
          (
            targetPositionRef.current +
            AUTO_SPEED
          ) % numCards;
      }

      /*
       * Smooth interpolation
       */
      let current =
        positionRef.current;

      let target =
        targetPositionRef.current;

      /*
       * Find shortest circular path
       */
      let difference =
        target - current;

      if (
        difference >
        numCards / 2
      ) {
        difference -= numCards;
      }

      if (
        difference <
        -numCards / 2
      ) {
        difference += numCards;
      }

      current +=
        difference *
        SMOOTHING;

      /*
       * Normalize
       */
      current =
        (current + numCards) %
        numCards;

      positionRef.current =
        current;

      applyTransforms(
        current
      );

      frameRef.current =
        requestAnimationFrame(
          animate
        );
    };

    frameRef.current =
      requestAnimationFrame(
        animate
      );

    return () => {
      if (
        frameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          frameRef.current
        );
      }
    };
  }, [isPaused, numCards]);

  /* =========================================================
     INITIAL PAINT
  ========================================================= */

  useEffect(() => {
    applyTransforms(
      positionRef.current
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================================================
     MANUAL CONTROL
  ========================================================= */

  function step(
    direction: 'left' | 'right'
  ) {
    const amount =
      direction === 'left'
        ? -1
        : 1;

    targetPositionRef.current =
      (
        targetPositionRef.current +
        amount +
        numCards
      ) % numCards;
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      className="
        py-20
        sm:py-28
        bg-paper-dim
        overflow-hidden
      "
    >
      <div
        className="
          max-w-[90%]
          mx-auto
          px-5
          sm:px-8
        "
      >
        {/* =================================================
            SECTION HEADER
        ================================================== */}

        <Reveal>
          <div
            className="
              text-center
              mb-14
            "
          >
            <h2
              className="
                font-serif
                font-bold
                text-[32px]
                sm:text-[40px]
                lg:text-[46px]
                leading-[1.15]
                tracking-tight
                text-ink
              "
            >
              Join Us In Making A Tangible Difference
            </h2>

            <div
              className="
                flex
                justify-center
                items-center
                gap-1
                mt-5
              "
            >
              <span
                className="
                  w-10
                  h-[2px]
                  bg-gray-300
                "
              />

              <span
                className="
                  w-10
                  h-[2px]
                "
                style={{
                  backgroundColor:
                    '#C8102E',
                }}
              />
            </div>
          </div>
        </Reveal>

        {/* =================================================
            CAROUSEL
        ================================================== */}

        <div
          className="relative"
          onMouseEnter={() =>
            setIsPaused(true)
          }
          onMouseLeave={() =>
            setIsPaused(false)
          }
        >
          <div
            className="
              relative
              h-[600px]
              sm:h-[650px]
              lg:h-[700px]
              flex
              items-center
              justify-center
            "
            style={{
              perspective:
                '1800px',
              perspectiveOrigin:
                'center center',
            }}
          >
            <div
              className="
                relative
                w-full
                h-full
              "
              style={{
                transformStyle:
                  'preserve-3d',
              }}
            >
              {helpCards.map(
                (h, i) => (
                  <HelpTile
                    key={h.title}
                    title={h.title}
                    body={h.body}
                    cta={h.cta}
                    href={h.href}
                    img={h.img}
                    innerRef={(el) => {
                      cardRefs.current[i] =
                        el;
                    }}
                  />
                )
              )}
            </div>
          </div>

          {/* =================================================
              LEFT ARROW
          ================================================== */}

          <button
            type="button"
            aria-label="Rotate left"
            onClick={() =>
              step('left')
            }
            className="
              absolute
              left-0
              sm:-left-4
              top-1/2
              -translate-y-1/2
              w-12
              h-12
              rounded-full
              bg-white
              shadow-[0_10px_28px_rgba(0,0,0,0.16)]
              flex
              items-center
              justify-center
              transition-all
              duration-300
              hover:scale-110
              hover:shadow-[0_14px_32px_rgba(0,0,0,0.20)]
              active:scale-95
              z-[3000]
            "
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10 3L5 8l5 5"
                stroke="#C8102E"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* =================================================
              RIGHT ARROW
          ================================================== */}

          <button
            type="button"
            aria-label="Rotate right"
            onClick={() =>
              step('right')
            }
            className="
              absolute
              right-0
              sm:-right-4
              top-1/2
              -translate-y-1/2
              w-12
              h-12
              rounded-full
              bg-white
              shadow-[0_10px_28px_rgba(0,0,0,0.16)]
              flex
              items-center
              justify-center
              transition-all
              duration-300
              hover:scale-110
              hover:shadow-[0_14px_32px_rgba(0,0,0,0.20)]
              active:scale-95
              z-[3000]
            "
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="#C8102E"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}