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
import heroTornEdge from '../assets/images/torn-edge.webp';
import { stats } from '../data/content';

/* =========================================================
   HEADLINE
========================================================= */

const headlineLines = [
  'Standing Against Executions And',
  'Oppression, Building Stronger',
  'Communities In The UK',
];

const fullHeadlineText = headlineLines.join('\n');

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

  /* =======================================================
     TYPEWRITER HEADLINE (continuous loop)

     Types out the full headline character by character,
     pauses, deletes it back out, pauses again, then repeats
     forever. whiteSpace: 'pre-line' preserves the manual
     line breaks from headlineLines while typing.
  ======================================================= */

  const [typedText, setTypedText] =
    useState('');

  const [isDeleting, setIsDeleting] =
    useState(false);

  useEffect(() => {
    const TYPE_SPEED = 45;
    const DELETE_SPEED = 25;
    const PAUSE_FULL = 2200;
    const PAUSE_EMPTY = 600;

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText === fullHeadlineText) {
      timeout = setTimeout(
        () => setIsDeleting(true),
        PAUSE_FULL
      );
    } else if (isDeleting && typedText === '') {
      timeout = setTimeout(
        () => setIsDeleting(false),
        PAUSE_EMPTY
      );
    } else {
      timeout = setTimeout(
        () => {
          setTypedText((prev) =>
            isDeleting
              ? fullHeadlineText.slice(
                  0,
                  prev.length - 1
                )
              : fullHeadlineText.slice(
                  0,
                  prev.length + 1
                )
          );
        },
        isDeleting ? DELETE_SPEED : TYPE_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting]);

  /* =======================================================
     DESKTOP TORN EDGE SEAM (vertical, rotated -90deg)
  ======================================================= */

  const seamRef =
    useRef<HTMLDivElement>(null);

  const [seamHeight, setSeamHeight] =
    useState(0);

  useEffect(() => {
    const el = seamRef.current;

    if (!el) return;

    const updateHeight = () => {
      setSeamHeight(
        el.parentElement?.clientHeight ||
          el.clientHeight
      );
    };

    updateHeight();

    const observer =
      new ResizeObserver(
        updateHeight
      );

    observer.observe(el);

    if (el.parentElement) {
      observer.observe(
        el.parentElement
      );
    }

    window.addEventListener(
      'resize',
      updateHeight
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        'resize',
        updateHeight
      );
    };
  }, []);

  /* =======================================================
     MOBILE / TABLET TORN EDGE SEAM (horizontal, no rotation)

     Same mask technique as desktop, but since the mobile
     layout stacks the image ON TOP of the content instead
     of side-by-side, the tear runs horizontally along the
     bottom of the image instead of vertically down a seam.
     torn-edge.webp is already horizontal natively, so no
     rotation is needed here — we just stretch it across
     the panel's measured WIDTH instead of its height.
  ======================================================= */

  const mobileWrapRef =
    useRef<HTMLDivElement>(null);

  const [mobileSeamWidth, setMobileSeamWidth] =
    useState(0);

  useEffect(() => {
    const el = mobileWrapRef.current;

    if (!el) return;

    const updateWidth = () =>
      setMobileSeamWidth(el.clientWidth);

    updateWidth();

    const observer =
      new ResizeObserver(
        updateWidth
      );

    observer.observe(el);

    window.addEventListener(
      'resize',
      updateWidth
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        'resize',
        updateWidth
      );
    };
  }, []);

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

          Wrapped in a relative container so the torn-edge
          seam below can sit OUTSIDE the image's own
          overflow-hidden clipping and overlap the boundary
          cleanly, the same way the desktop version does.
      ====================================================== */}

      <div
        ref={mobileWrapRef}
        className="
          relative
          lg:hidden
        "
      >

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
          className="
            relative
            mt-[88px]
            h-[42vh]
            w-full
            shrink-0
            overflow-hidden
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

        {/* =================================================
            MOBILE TORN EDGE — horizontal, sits right on
            the boundary between the image and the blue
            content below it.
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            -bottom-2
            z-20
            h-8
            overflow-hidden
            sm:h-10
          "
        >

          {mobileSeamWidth > 0 && (
            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-8
                sm:h-10
              "
              style={{
                width: `${mobileSeamWidth + 8}px`,
                transform:
                  'translate(-50%, -50%) rotate(180deg)',
                backgroundColor: '#78ADD0',
                boxShadow:
                  '0 -6px 20px rgba(0, 0, 0, 0.15)',
                WebkitMaskImage: `url(${heroTornEdge})`,
                maskImage: `url(${heroTornEdge})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: '100% 100%',
                maskSize: '100% 100%',
              }}
            />
          )}

        </div>

      </div>


      {/* =====================================================
          DESKTOP RIGHT IMAGE
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
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          right-[16px]
          w-full
          flex-col
          justify-center
          pl-[calc(5vw+10px)]
          pr-5
          pb-16
          pt-28
          sm:pl-[calc(5vw+16px)]
          sm:pr-8
          lg:w-[40%]
          lg:min-h-screen
          lg:pl-[calc(5vw+20px)]
          lg:pr-10
          lg:pb-20
          lg:pt-32
          xl:pl-[calc(5vw+34px)]
          xl:pr-14
          2xl:pl-[calc(5vw+34px)]
          2xl:pr-20
        "
        style={{
          backgroundImage:
            `url(${heroLeftBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >

        {/* =================================================
            DESKTOP TORN EDGE

            -top-2 / -bottom-2 (not -top-15, which is an
            invalid Tailwind class and generated no CSS —
            that's what let the top gap survive).
        ================================================== */}

        <div
          ref={seamRef}
          className="
            pointer-events-none
            absolute
            -top-15
            -bottom-2
            -right-[65px]
            z-20
            hidden
            w-8
            overflow-hidden
            lg:block
            lg:w-10
            lg:-right-[38px]
            xl:w-14
            xl:-right-[53px]
            2xl:w-20
            2xl:-right-[75px]
          "
        >

          {seamHeight > 0 && (
            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-8
                lg:h-10
                xl:h-14
                2xl:h-20
              "
              style={{
                width: `${seamHeight + 8}px`,
                transform:
                  'translate(-50%, -50%) rotate(-90deg)',
                backgroundImage: `url(${heroLeftBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0 0 28px rgba(0, 0, 0, 0.18)',
                WebkitMaskImage: `url(${heroTornEdge})`,
                maskImage: `url(${heroTornEdge})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: '100% 100%',
                maskSize: '100% 100%',
              }}
            />
          )}

        </div>

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
              HEADLINE (continuous typewriter animation)
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

            <span
              style={{
                whiteSpace: 'pre-line',
              }}
            >
              {typedText}
            </span>

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
              style={{
                height: '0.85em',
              }}
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
    relative
    inline-flex
    items-center
    gap-3
    overflow-hidden
    rounded-full
    border
    border-maroon
    bg-white
    py-2.5
    pl-6
    pr-2.5
    text-[14.5px]
    font-semibold
    text-maroon
    transition-all
    duration-300
    hover:text-white
  "
>
  <span className="absolute inset-x-0 bottom-0 h-0 bg-[#C8102E] transition-all duration-500 ease-out group-hover:h-full" />
  <span className="relative z-10">Donate now</span>
  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-maroon/10 transition-all duration-300 group-hover:rotate-45 group-hover:bg-white/20">
    <ArrowIcon className="h-4 w-4" />
  </span>
</a>

{/* OUR WORK */}
<a
  href="#who-we-are"
  className="
    group
    relative
    inline-flex
    items-center
    gap-3
    overflow-hidden
    rounded-full
    border
    border-maroon
    bg-white
    py-2.5
    pl-6
    pr-2.5
    text-[14.5px]
    font-semibold
    text-maroon
    transition-all
    duration-300
    hover:text-white
  "
>
  <span className="absolute inset-x-0 bottom-0 h-0 bg-[#C8102E] transition-all duration-500 ease-out group-hover:h-full" />
  <span className="relative z-10">Our Work</span>
  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-maroon/10 transition-all duration-300 group-hover:rotate-45 group-hover:bg-white/20">
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
                  font-bold
                  leading-none
                  text-black
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
                  sm:text-[16px]
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