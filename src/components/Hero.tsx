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
} from 'react';

import heroPanelLeft from '../assets/images/panel-left.png';
import heroPanelRight from '../assets/images/panel-right.png';
import heroLeftBg from '../assets/images/hero-left-bg.jpg';
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
   MOBILE TORN EDGE
========================================================= */

const tornEdgeMobile = {
  clipPath:
    'polygon(' +
    '0% 0%, ' +
    '100% 0%, ' +
    '100% 90%, ' +
    '97% 92%, ' +
    '94% 91%, ' +
    '91% 95%, ' +
    '88% 93%, ' +
    '85% 97%, ' +
    '82% 94%, ' +
    '79% 98%, ' +
    '76% 95%, ' +
    '73% 99%, ' +
    '70% 96%, ' +
    '67% 100%, ' +
    '64% 96%, ' +
    '61% 98%, ' +
    '58% 95%, ' +
    '55% 99%, ' +
    '52% 96%, ' +
    '49% 100%, ' +
    '46% 96%, ' +
    '43% 98%, ' +
    '40% 94%, ' +
    '37% 99%, ' +
    '34% 95%, ' +
    '31% 98%, ' +
    '28% 94%, ' +
    '25% 97%, ' +
    '22% 93%, ' +
    '19% 96%, ' +
    '16% 92%, ' +
    '13% 95%, ' +
    '10% 91%, ' +
    '7% 94%, ' +
    '4% 91%, ' +
    '0% 94%' +
    ')',
};

/* =========================================================
   DESKTOP HAND-TORN EDGE
========================================================= */

/*
  IMPORTANT:

  This is applied ONLY to the LEFT CONTENT PANEL.

  The right-side image is NOT clipped.
  It remains exactly rectangular and unchanged.

  The many uneven points create a more natural,
  hand-torn-paper appearance instead of a regular zig-zag.
*/

const tornEdgeDesktop = {
  clipPath:
    'polygon(' +
    '0% 0%, ' +
    '96.8% 0%, ' +

    /* upper tear */
    '97.5% 2%, ' +
    '96.4% 4%, ' +
    '98.4% 6%, ' +
    '96.9% 8%, ' +
    '98.8% 10%, ' +

    /* upper-middle */
    '97.2% 12%, ' +
    '99.1% 14%, ' +
    '96.7% 16%, ' +
    '98.5% 18%, ' +
    '96.3% 20%, ' +
    '99.2% 22%, ' +
    '97.0% 24%, ' +
    '98.7% 26%, ' +
    '96.1% 28%, ' +
    '99.0% 30%, ' +

    /* middle */
    '97.1% 32%, ' +
    '98.8% 34%, ' +
    '96.0% 36%, ' +
    '99.3% 38%, ' +
    '96.5% 40%, ' +
    '98.9% 42%, ' +
    '96.2% 44%, ' +
    '99.0% 46%, ' +
    '96.0% 48%, ' +
    '98.7% 50%, ' +
    '96.3% 52%, ' +
    '99.1% 54%, ' +
    '96.1% 56%, ' +
    '98.8% 58%, ' +

    /* lower-middle */
    '96.2% 60%, ' +
    '99.0% 62%, ' +
    '96.4% 64%, ' +
    '98.9% 66%, ' +
    '96.0% 68%, ' +
    '99.2% 70%, ' +
    '96.5% 72%, ' +
    '98.7% 74%, ' +
    '96.1% 76%, ' +
    '99.0% 78%, ' +
    '96.3% 80%, ' +
    '98.8% 82%, ' +
    '96.0% 84%, ' +
    '99.1% 86%, ' +
    '96.4% 88%, ' +

    /* bottom tear */
    '98.8% 90%, ' +
    '96.2% 92%, ' +
    '98.5% 94%, ' +
    '96.5% 96%, ' +
    '98% 98%, ' +
    '96% 100%, ' +

    '0% 100%' +
    ')',
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
            src={heroPanelLeft}
            alt="ILA volunteers and community members speaking at an event, part one"
          />

          <img
            src={heroPanelRight}
            alt="ILA volunteers and community members speaking at an event, part two"
          />

          <img
            src={heroPanelLeft}
            alt=""
            aria-hidden="true"
          />

          <img
            src={heroPanelRight}
            alt=""
            aria-hidden="true"
          />

        </div>

        <div className="hero-image-overlay" />

      </motion.div>


      {/* =====================================================
          DESKTOP RIGHT IMAGE

          IMPORTANT:
          This is completely unchanged.

          NO clip-path.
          NO irregular edge.
          NO mask.

          The image stays rectangular.
      ====================================================== */}

      <div
        className="
          absolute
          inset-y-0
          right-0
          hidden
          h-full
          w-[68%]
          overflow-hidden
          lg:block
        "
      >

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
              src={heroPanelLeft}
              alt="ILA volunteers and community members speaking at an event, part one"
            />

            <img
              src={heroPanelRight}
              alt="ILA volunteers and community members speaking at an event, part two"
            />

            <img
              src={heroPanelLeft}
              alt=""
              aria-hidden="true"
            />

            <img
              src={heroPanelRight}
              alt=""
              aria-hidden="true"
            />

          </div>

          <div className="hero-image-overlay" />

        </motion.div>

      </div>


      {/* =====================================================
          LEFT CONTENT AREA

          ONLY THIS ELEMENT GETS THE TORN EDGE.

          The right image underneath remains untouched.
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
          lg:w-[40%]
          lg:min-h-screen
          lg:px-10
          lg:pb-20
          lg:pt-32
          xl:px-14
          2xl:px-20
        "
        style={{
          backgroundImage: `url(${heroLeftBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',

          /*
            The torn edge exists ONLY on the
            right side of this panel.
          */
          ...tornEdgeDesktop,
        }}
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

          {/* AVATARS + STAT */}

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
                  text-black
                  sm:text-[13px]
                "
              >
                {primaryStat.l}
              </div>

            </div>

          </div>


          {/* DIVIDER */}

          <span
            className="
              hidden
              h-12
              w-px
              bg-white/30
              sm:block
            "
          />


          {/* SEE OUR WORK */}

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