import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { founderLede } from '../data/content';

export default function WhoWeAre() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="who-we-are" ref={sectionRef} className="py-20 sm:py-28 overflow-hidden">
      <style>{`
        @keyframes quoteMarkIn {
          from { opacity: 0; transform: translate(-10px, -10px) scale(0.7) rotate(-8deg); }
          to { opacity: 0.14; transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        @keyframes lineGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes underlineDraw {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16">
        <Reveal>
          <div className="relative">
            {/* decorative oversized quote mark */}
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute -top-6 -left-2 sm:-left-3 font-serif text-[90px] sm:text-[110px] leading-none text-maroon"
              style={{
                opacity: 0,
                animation: inView ? 'quoteMarkIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s forwards' : 'none',
              }}
            >
              &ldquo;
            </span>

            <p className="relative font-serif font-medium text-[26px] sm:text-[32px] leading-[1.25] tracking-tight text-maroon max-w-[18ch]">
              {founderLede}
            </p>
          </div>

          <div className="relative mt-8 pt-5 max-w-[26ch]">
            {/* animated top border that draws in */}
            <span
              className="absolute top-0 left-0 h-px w-full bg-black/10 origin-left"
              style={{
                transform: 'scaleX(0)',
                animation: inView ? 'underlineDraw 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s forwards' : 'none',
              }}
            />
            <div className="text-[13px] text-muted-light">
              Registered charity, England &amp; Wales — No. 1,160,607
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative pl-6 sm:pl-8">
            {/* animated vertical line growing down beside the copy */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 bottom-0 w-px bg-gradient-to-b from-maroon/70 via-maroon/25 to-transparent origin-top"
              style={{
                transform: 'scaleY(0)',
                animation: inView ? 'lineGrow 1.4s cubic-bezier(0.16,1,0.3,1) 0.15s forwards' : 'none',
              }}
            />

            <h2
              className="font-serif font-medium text-[24px] sm:text-[28px] leading-[1.2] tracking-tight mb-5"
              style={{
                opacity: 0,
                animation: inView ? 'fadeUp 0.7s ease-out 0.15s forwards' : 'none',
              }}
            >
              Founded by survivors, working for the vulnerable
            </h2>

            <p
              className="text-[16.5px] text-[#33322B] max-w-[60ch] mb-4.5"
              style={{
                opacity: 0,
                animation: inView ? 'fadeUp 0.7s ease-out 0.3s forwards' : 'none',
              }}
            >
              The International Liberty Association (ILA) is a UK-registered charity founded by survivors of human
              rights abuses. We deliver practical support to refugees, survivors, and vulnerable diaspora
              communities rebuilding their lives in the UK, while contributing to global human rights advocacy.
            </p>

            <p
              className="text-[16.5px] text-[#33322B] max-w-[60ch] mb-4.5"
              style={{
                opacity: 0,
                animation: inView ? 'fadeUp 0.7s ease-out 0.42s forwards' : 'none',
              }}
            >
              In the UK, we provide digital literacy training through more than 50 annual sessions, one-to-one
              integration advice clinics, youth leadership workshops engaging around 40 participants weekly, and
              community wellbeing seminars.
            </p>

            <p
              className="text-[16.5px] text-[#33322B] max-w-[60ch] mb-7"
              style={{
                opacity: 0,
                animation: inView ? 'fadeUp 0.7s ease-out 0.54s forwards' : 'none',
              }}
            >
              Alongside our direct services, we raise awareness of injustice and defend the rights of individuals
              facing persecution worldwide — promoting dignity, opportunity, and lasting community empowerment.
            </p>

            <a
              href="https://iliberty.org.uk/about-us/"
              className="group relative inline-flex items-center gap-2 text-[14.5px] font-medium text-maroon w-fit"
              style={{
                opacity: 0,
                animation: inView ? 'fadeUp 0.7s ease-out 0.66s forwards' : 'none',
              }}
            >
              <span className="relative pb-0.5">
                Learn more about us
                <span className="absolute left-0 -bottom-0 h-[1.5px] w-full bg-maroon/40 origin-left transition-transform duration-300 ease-out group-hover:scale-x-0" />
                <span className="absolute left-0 -bottom-0 h-[1.5px] w-full bg-maroon origin-left scale-x-0 transition-transform duration-300 ease-out delay-75 group-hover:scale-x-100" />
              </span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}