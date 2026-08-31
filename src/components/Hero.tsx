import { motion, useMotionValue, animate, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import heroMain from '../assets/images/hero-main.jpg';
import { stats } from '../data/content';

const headlineLines = ['Standing against', 'executions and', 'oppression.'];

const embers = [
  { left: '8%', size: 3, duration: 9, delay: 0, driftX: 14 },
  { left: '18%', size: 2, duration: 12, delay: 2.4, driftX: -10 },
  { left: '27%', size: 4, duration: 10.5, delay: 1 },
  { left: '41%', size: 2.5, duration: 14, delay: 4, driftX: 18 },
  { left: '58%', size: 3, duration: 11, delay: 3.2, driftX: -16 },
  { left: '69%', size: 2, duration: 13, delay: 0.6, driftX: 8 },
  { left: '80%', size: 3.5, duration: 9.5, delay: 5, driftX: -12 },
  { left: '90%', size: 2, duration: 12.5, delay: 2 },
];

function StatValue({ value }: { value: string }) {
  const numeric = parseInt(value.replace(/[^\d]/g, ''), 10) || 0;
  const suffix = value.includes('+') ? '+' : '';
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const controls = animate(motionVal, numeric, {
      duration: 1.4,
      delay: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.floor(v).toString()),
    });
    return () => controls.stop();
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
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="relative bg-ink text-paper overflow-hidden">
      <div className="relative h-[92vh] min-h-[560px] max-h-[820px] flex flex-col">
        <motion.div style={{ y: imageY }} className="absolute inset-0 h-[118%]">
          <img
            src={heroMain}
            alt="ILA volunteers and community members speaking at an event"
            className="animate-ken-burns w-full h-full object-cover object-[center_25%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />

        {/* ambient gold glow, the one non-user-triggered flourish in the hero */}
        <div
          className="glow-orb absolute -left-24 top-1/3 w-[420px] h-[420px] rounded-full bg-gold/25 blur-[110px] pointer-events-none"
          aria-hidden="true"
        />

        {/* drifting embers — echoes the vigil candles carried through the site */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {embers.map((e, i) => (
            <span
              key={i}
              className="ember"
              style={
                {
                  left: e.left,
                  width: e.size,
                  height: e.size,
                  animationDuration: `${e.duration}s`,
                  animationDelay: `${e.delay}s`,
                  '--drift-x': `${e.driftX ?? 0}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex-1 min-h-0 max-w-[1200px] w-full mx-auto px-5 sm:px-8 flex flex-col justify-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-flex w-fit items-center gap-2.5 text-[13px] text-muted-dark border border-paper/20 rounded-full px-3.5 py-1.5 mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            UK-registered charity, No. 1160607
          </motion.span>

          <h1 className="font-serif font-medium leading-[1.08] tracking-tight text-[36px] sm:text-[52px] lg:text-[64px] max-w-[15ch] mb-6">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.28 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68 }}
            className="text-[17.5px] text-muted-dark max-w-[42ch] mb-9"
          >
            A volunteer-led charity building stronger, more resilient communities across the UK, while defending the
            rights of the vulnerable worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://iliberty.org.uk/donate-2/"
              className="inline-flex items-center px-6 py-3 bg-gold text-ink rounded-sm text-[14.5px] font-medium hover:bg-gold-bright transition-colors"
            >
              Donate now
            </a>
            <a
              href="https://iliberty.org.uk/campaign/helping-survivors-rebuild-in-the-uk-2/"
              className="inline-flex items-center px-6 py-3 border border-paper/25 rounded-sm text-[14.5px] font-medium hover:border-gold hover:text-gold-bright transition-colors"
            >
              See our work
            </a>
          </motion.div>
        </motion.div>

        {/* ledger strip — the one carried-over signature moment, doubles as the hero/next-section seam */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="relative z-10 shrink-0 bg-ink/70 backdrop-blur-sm border-t border-paper/15"
        >
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 grid grid-cols-3 divide-x divide-paper/15">
            {stats.map((s) => (
              <div key={s.l} className="py-5 sm:py-6 px-4 sm:px-6 first:pl-0 last:pr-0">
                <div className="font-serif text-[26px] sm:text-[32px] leading-none">
                  <StatValue value={s.n} />
                </div>
                <div className="text-[12px] sm:text-[13px] text-muted-dark mt-1.5 max-w-[16ch]">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}