import {
  motion,
  useMotionValue,
  animate,
  useScroll,
  useTransform,
} from 'framer-motion';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

import heroMain from '../assets/images/hero-main.jpg';
import { stats } from '../data/content';

/* =========================================================
   HEADLINE
========================================================= */

const headlineLines = [
  'Standing Against Executions And',
  'Oppression, Building Stronger',
  'Communities In The UK',
];

/* =========================================================
   DESKTOP TORN EDGE
========================================================= */

const tornEdgeDesktop: CSSProperties = {
  clipPath:
    'polygon(9% 0%, 100% 0%, 100% 100%, 7% 100%, 11% 93%, 4% 87%, 10% 80%, 3% 74%, 9% 67%, 2% 61%, 8% 54%, 1% 48%, 7% 41%, 0% 35%, 6% 28%, 2% 22%, 8% 15%, 3% 9%)',
};

/* =========================================================
   MOBILE TORN EDGE
========================================================= */

const tornEdgeMobile: CSSProperties = {
  clipPath:
    'polygon(0% 0%, 100% 0%, 100% 91%, 93% 96%, 87% 90%, 80% 97%, 74% 91%, 67% 98%, 61% 92%, 54% 99%, 48% 93%, 41% 100%, 35% 94%, 28% 98%, 22% 92%, 15% 97%, 9% 91%, 0% 96%)',
};

/* =========================================================
   AVATARS
========================================================= */

const avatarUrls = [
  'https://i.pravatar.cc/72?img=12',
  'https://i.pravatar.cc/72?img=33',
  'https://i.pravatar.cc/72?img=47',
  'https://i.pravatar.cc/72?img=5',
];

/* =========================================================
   ARROW ICON
========================================================= */

function ArrowIcon({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17L17 7" />
      <path d="M17 7H9" />
      <path d="M17 7V15" />
    </svg>
  );
}

/* =========================================================
   SMILE ICON
========================================================= */

function SmileIcon({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />

      <circle
        cx="9"
        cy="9"
        r="1"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="15"
        cy="9"
        r="1"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="12"
        cy="12"
        r="9"
      />
    </svg>
  );
}

/* =========================================================
   ANIMATED STAT
========================================================= */

function StatValue({
  value,
}: {
  value: string;
}) {
  const numeric =
    parseInt(
      value.replace(/[^\d]/g, ''),
      10
    ) || 0;

  const suffix = value.includes('+')
    ? '+'
    : '';

  const motionVal = useMotionValue(0);

  const [display, setDisplay] =
    useState('0');

  useEffect(() => {
    let cancelled = false;

    let replayTimeout:
      | ReturnType<typeof setTimeout>
      | undefined;

    let animationControls:
      | ReturnType<typeof animate>
      | undefined;

    const runCount = () => {
      if (cancelled) return;

      motionVal.set(0);

      animationControls = animate(
        motionVal,
        numeric,
        {
          duration: 1.6,

          ease: [
            0.16,
            1,
            0.3,
            1,
          ],

          onUpdate: (v) => {
            if (!cancelled) {
              setDisplay(
                Math.floor(v).toString()
              );
            }
          },

          onComplete: () => {
            if (!cancelled) {
              replayTimeout =
                setTimeout(
                  runCount,
                  4000
                );
            }
          },
        }
      );
    };

    const startTimeout =
      setTimeout(
        runCount,
        1200
      );

    return () => {
      cancelled = true;

      clearTimeout(startTimeout);

      if (replayTimeout) {
        clearTimeout(
          replayTimeout
        );
      }

      animationControls?.stop();
    };
  }, [numeric, motionVal]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const sectionRef =
    useRef<HTMLElement>(null);

  /* =======================================================
     SCROLL PARALLAX
  ======================================================= */

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,

    offset: [
      'start start',
      'end start',
    ],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '5%']
  );

  const primaryStat = stats[0];

  return (
    <section
      ref={sectionRef}
      id="top"
      className="
        relative
        flex
        min-h-screen
        flex-col
        overflow-hidden
        bg-[#78ADD0]
        text-paper
      "
    >

      {/* =====================================================
          MOBILE / TABLET IMAGE
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: 'easeOut',
        }}
        style={tornEdgeMobile}
        className="
          relative
          mt-[88px]
          h-[42vh]
          w-full
          shrink-0
          overflow-hidden
          lg:hidden
          sm:h-[48vh]
        "
      >
        <div className="hero-image-track">
          <img
            src={heroMain}
            alt="ILA volunteers and community members speaking at an event"
          />

          <img
            src={heroMain}
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="hero-image-overlay" />
      </motion.div>


      {/* =====================================================
          DESKTOP IMAGE
          RIGHT SIDE / FULL HEIGHT
      ====================================================== */}

      <div
        className="
          absolute
          inset-y-0
          right-0
          hidden
          h-full
          w-[58%]
          overflow-hidden
          lg:block
        "
      >
        {/* =================================================
            WHITE TORN-PAPER EDGE
            Sits behind the image, offset slightly left/up/down
            so a sliver of white peeks out along the jagged line
        ================================================== */}

        <div
          style={tornEdgeDesktop}
          className="
            absolute
            -inset-y-2
            -left-3
            right-0
            bg-paper
          "
        />

        <motion.div
          initial={{
            opacity: 0,
            x: 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
          style={{
            y: imageY,
            ...tornEdgeDesktop,
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            overflow-hidden
          "
        >
          <div className="hero-image-track">
            <img
              src={heroMain}
              alt="ILA volunteers and community members speaking at an event"
            />

            <img
              src={heroMain}
              alt=""
              aria-hidden="true"
            />
          </div>

          <div className="hero-image-overlay" />
        </motion.div>
      </div>


      {/* =====================================================
          LEFT CONTENT AREA
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          w-full
          flex-col
          justify-center
          px-5
          pb-16
          pt-28
          sm:px-8
          lg:w-[48%]
          lg:min-h-screen
          lg:px-10
          lg:pb-20
          lg:pt-32
          xl:w-[46%]
          xl:px-14
          2xl:px-20
        "
      >

        {/* =================================================
            CONTENT
        ================================================== */}

        <div
          className="
            w-full
            max-w-[620px]
          "
        >

          {/* =================================================
              CHARITY LABEL
          ================================================== */}

          {/* <motion.span
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="
              mb-8
              inline-flex
              w-fit
              items-center
              rounded-full
              border
              border-paper/30
              px-4
              py-2
              text-[12px]
              uppercase
              tracking-wide
              text-paper
              sm:text-[13px]
            "
          >
            UK-registered charity,
            No. 1160607
          </motion.span> */}


          {/* =================================================
              HEADLINE
          ================================================== */}

          <h1
            className="
              mb-6
              font-sans
              text-[32px]
              font-extrabold
              leading-[1.04]
              tracking-tight
              sm:text-[42px]
              lg:text-[43px]
              xl:text-[48px]
              2xl:text-[52px]
            "
          >
            {headlineLines.map(
              (line, index) => (
                <span
                  key={line}
                  className="
                    block
                    overflow-hidden
                  "
                >
                  <motion.span
                    className="block"
                    initial={{
                      y: '110%',
                    }}
                    animate={{
                      y: 0,
                    }}
                    transition={{
                      duration: 0.85,
                      delay:
                        0.22 +
                        index * 0.12,
                      ease: [
                        0.2,
                        0.8,
                        0.2,
                        1,
                      ],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              )
            )}
          </h1>


          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.6,
            }}
            className="
              mb-9
              max-w-[570px]
              text-[15px]
              leading-[1.65]
              text-black
              sm:text-[16px]
              lg:text-[16px]
              xl:text-[17px]
            "
          >
            We are a UK-based,
            volunteer-led charity.
            Our work is built around
            two connected areas, both
            supporting our wider mission
            to protect dignity, strengthen
            communities, and contribute
            to a more informed and
            compassionate UK society.
          </motion.p>


          {/* =================================================
              CTA BUTTONS
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.72,
            }}
            className="
              flex
              flex-wrap
              items-center
              gap-4
            "
          >

            {/* DONATE */}

            <a
              href="https://iliberty.org.uk/donate-2/"
              className="
                group
                inline-flex
                items-center
                gap-4
                rounded-full
                bg-[#C8102E]
                py-2
                pl-6
                pr-2
                text-[14.5px]
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#a80d25]
                hover:-translate-y-0.5
              "
            >
              Donate now

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-ink
                  text-gold
                  transition-transform
                  duration-300
                  group-hover:rotate-45
                "
              >
                <ArrowIcon className="h-4 w-4" />
              </span>
            </a>


            {/* OUR WORK */}

            <a
              href="#who-we-are"
              className="
                group
                inline-flex
                items-center
                gap-4
                rounded-full
                border
                border-white/40
                bg-[#C8102E]
                py-2
                pl-6
                pr-2
                text-[14.5px]
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#a80d25]
                hover:-translate-y-0.5
              "
            >
              Our Work

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  text-white
                  transition-transform
                  duration-300
                  group-hover:rotate-45
                "
              >
                <ArrowIcon className="h-4 w-4" />
              </span>
            </a>

          </motion.div>

        </div>


        {/* =====================================================
            BOTTOM STAT / WORK CARD
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 1,
          }}
          className="
            mt-12
            flex
            w-max
            max-w-full
            flex-wrap
            items-center
            gap-6
            sm:mt-16
            sm:flex-nowrap
            sm:gap-8
            lg:mt-16
            xl:mt-20
          "
        >

          {/* =================================================
              AVATARS + STAT
          ================================================== */}

          <div className="flex items-center gap-4">

            <div className="flex -space-x-3">
              {avatarUrls.map(
                (src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="
                      h-9
                      w-9
                      rounded-full
                      border-2
                      border-[#C8102E]
                      object-cover
                    "
                    style={{
                      zIndex:
                        avatarUrls.length -
                        index,
                    }}
                  />
                )
              )}
            </div>

            <div>

              {/* =================================================
                  HIGHLIGHTED 50K+
              ================================================== */}

              <div
                className="
                  font-serif
                  text-[26px]
                  font-semibold
                  leading-none
                  text-[#C8102E]
                  sm:text-[30px]
                "
              >
                <StatValue
                  value={
                    primaryStat.n
                  }
                />
              </div>

              <div
                className="
                  mt-1
                  max-w-[16ch]
                  text-[12px]
                  text-black/70
                  sm:text-[13px]
                "
              >
                {primaryStat.l}
              </div>

            </div>
          </div>


          {/* =================================================
              DIVIDER
          ================================================== */}

          <span
            className="
              hidden
              h-12
              w-px
              bg-white/30
              sm:block
            "
          />


          {/* =================================================
              SEE OUR WORK
          ================================================== */}

          <a
            href="https://iliberty.org.uk/campaign/helping-survivors-rebuild-in-the-uk-2/"
            className="
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-paper
              py-3.5
              pl-4
              pr-5
              text-ink
              shadow-xl
              transition-transform
              duration-300
              hover:-translate-y-1
            "
          >
            <SmileIcon
              className="
                h-8
                w-8
                shrink-0
              "
            />

            <span
              className="
                font-serif
                text-[15px]
                font-semibold
                uppercase
                leading-tight
              "
            >
              See our
              <br />
              work
            </span>
          </a>

        </motion.div>

      </div>
    </section>
  );
}