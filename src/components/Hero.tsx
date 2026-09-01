import { motion, useMotionValue, animate, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import heroMain from '../assets/images/hero-main.jpg';
import { stats } from '../data/content';

const headlineLines = ['Standing Against Executions And', 'Oppression, Building Stronger', 'Communities In The UK'];

// jagged "torn edge" mask for the desktop image panel (left edge)
const tornEdgeDesktop: CSSProperties = {
  clipPath:
    'polygon(9% 0%, 100% 0%, 100% 100%, 7% 100%, 11% 93%, 4% 87%, 10% 80%, 3% 74%, 9% 67%, 2% 61%, 8% 54%, 1% 48%, 7% 41%, 0% 35%, 6% 28%, 2% 22%, 8% 15%, 3% 9%)',
};

// jagged "torn edge" mask for the mobile image band (bottom edge)
const tornEdgeMobile: CSSProperties = {
  clipPath:
    'polygon(0% 0%, 100% 0%, 100% 91%, 93% 96%, 87% 90%, 80% 97%, 74% 91%, 67% 98%, 61% 92%, 54% 99%, 48% 93%, 41% 100%, 35% 94%, 28% 98%, 22% 92%, 15% 97%, 9% 91%, 0% 96%)',
};

const avatarUrls = [
  'https://i.pravatar.cc/72?img=12',
  'https://i.pravatar.cc/72?img=33',
  'https://i.pravatar.cc/72?img=47',
  'https://i.pravatar.cc/72?img=5',
];

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17L17 7M17 7H9M17 7V15" />
    </svg>
  );
}

function SmileIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function StatValue({ value }: { value: string }) {
  const numeric = parseInt(value.replace(/[^\d]/g, ''), 10) || 0;
  const suffix = value.includes('+') ? '+' : '';
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    let cancelled = false;
    let replayTimeout: ReturnType<typeof setTimeout>;

    const runCount = () => {
      motionVal.set(0);
      animate(motionVal, numeric, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplay(Math.floor(v).toString()),
        onComplete: () => {
          if (!cancelled) {
            // pause on the final number for a few seconds, then replay the count-up
            replayTimeout = setTimeout(runCount, 4000);
          }
        },
      });
    };

    const startTimeout = setTimeout(runCount, 1200);

    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
      clearTimeout(replayTimeout);
    };
  }, [numeric]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  const primaryStat = stats[0];

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative bg-[#0e2a1f] text-paper overflow-hidden min-h-screen flex flex-col"
    >
      {/* mobile / tablet image band — full width, torn bottom edge */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={tornEdgeMobile}
        className="lg:hidden relative w-full h-[46vh] sm:h-[52vh] mt-[88px] shrink-0"
      >
        <img
          src={heroMain}
          alt="ILA volunteers and community members speaking at an event"
          className="animate-ken-burns w-full h-full object-cover object-[center_25%]"
        />
      </motion.div>

      {/* desktop image panel — 2/3 width, full viewport height, torn left edge */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-2/3">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: imageY, ...tornEdgeDesktop }}
          className="relative w-full h-[110%]"
        >
          <img
            src={heroMain}
            alt="ILA volunteers and community members speaking at an event"
            className="animate-ken-burns w-full h-full object-cover object-[center_25%]"
          />
        </motion.div>
      </div>

      <div className="relative flex-1 max-w-[1280px] w-full mx-auto px-5 sm:px-8 pt-10 lg:pt-40 pb-16 flex flex-col justify-center">
        <div className="max-w-full sm:max-w-[80%] lg:max-w-[58%]">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex w-fit items-center text-[12px] sm:text-[13px] tracking-wide uppercase text-paper border border-paper/30 rounded-full px-4 py-2 mb-8"
          >
            UK-registered charity, No. 1160607
          </motion.span>

          <h1 className="font-sans font-extrabold leading-[1.04] tracking-tight text-[32px] sm:text-[44px] lg:text-[52px] mb-6">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.22 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-[15.5px] sm:text-[17px] text-muted-dark mb-9"
          >
            We are a UK-based, volunteer-led charity. Our work is built around two connected areas, both supporting
            our wider mission to protect dignity, strengthen communities, and contribute to a more informed and
            compassionate UK society.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="https://iliberty.org.uk/donate-2/"
              className="group inline-flex items-center gap-4 pl-6 pr-2 py-2 bg-gold text-ink rounded-full text-[14.5px] font-semibold hover:bg-gold-bright transition-colors"
            >
              Donate now
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-ink text-gold group-hover:rotate-45 transition-transform duration-300">
                <ArrowIcon className="w-4 h-4" />
              </span>
            </a>

            <a
              href="#who-we-are"
              className="group inline-flex items-center gap-4 pl-6 pr-2 py-2 bg-transparent border border-paper/40 text-paper rounded-full text-[14.5px] font-semibold hover:bg-paper/10 transition-colors"
            >
              Our Work
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-paper/15 text-paper group-hover:rotate-45 transition-transform duration-300">
                <ArrowIcon className="w-4 h-4" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* bottom band: avatar+stat cluster, divider, floating "See our work" card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-24 w-max max-w-full"
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3 shrink-0">
              {avatarUrls.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover border-2 border-gold"
                  style={{ zIndex: avatarUrls.length - i }}
                />
              ))}
            </div>
            <div>
              <div className="font-serif text-[24px] sm:text-[28px] leading-none">
                <StatValue value={primaryStat.n} />
              </div>
              <div className="text-[12px] sm:text-[13px] text-muted-dark mt-1 max-w-[16ch]">{primaryStat.l}</div>
            </div>
          </div>

          <span className="hidden sm:block w-px h-12 bg-paper/15" />

          <a
            href="https://iliberty.org.uk/campaign/helping-survivors-rebuild-in-the-uk-2/"
            className="inline-flex items-center gap-3 bg-paper text-ink rounded-2xl pl-4 pr-5 py-3.5 shadow-xl hover:-translate-y-0.5 transition-transform"
          >
            <SmileIcon className="w-8 h-8 shrink-0" />
            <span className="font-serif font-semibold text-[15px] leading-tight uppercase">
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