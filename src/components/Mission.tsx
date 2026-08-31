import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { missionItems } from '../data/content';
import { iconMap } from './Icons';

export default function Mission() {
  const [inView, setInView] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-ink text-paper py-20 sm:py-28 overflow-hidden">
      <style>{`
        @keyframes rowIn {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes headingWordIn {
          from { opacity: 0; transform: translateY(14px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes numberIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 0.4; transform: translateX(0); }
        }
        @keyframes sheenSweep {
          from { transform: translateX(-130%) skewX(-15deg); }
          to { transform: translateX(230%) skewX(-15deg); }
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-16 mb-12">
          <Reveal>
            <h2 className="font-serif font-medium text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] tracking-tight max-w-[16ch]">
              {'ILA defends human rights and supports survivors to rebuild their lives'
                .split(' ')
                .map((word, i) => (
                  <span
                    key={i}
                    className="inline-block opacity-0 mr-[0.28em]"
                    style={{
                      animation: `headingWordIn 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s forwards`,
                    }}
                  >
                    {word}
                  </span>
                ))}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[16px] text-muted-dark max-w-[54ch] self-end">
              Five areas of work, run in parallel by staff and volunteers across the UK and internationally.
            </p>
          </Reveal>
        </div>

        <div ref={listRef} className="border-t border-paper/15">
          {missionItems.map((m, i) => {
            const Icon = iconMap[m.icon];
            return (
              <div
                key={m.title}
                className="group relative grid grid-cols-1 sm:grid-cols-[1.6fr_2.4fr] gap-2 sm:gap-10 py-6 border-b border-paper/15 overflow-hidden opacity-0"
                style={{
                  animation: inView
                    ? `rowIn 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.09}s forwards`
                    : 'none',
                }}
              >
                {/* sliding highlight background on hover */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-paper/[0.04] transition-[width] duration-500 ease-out group-hover:w-full" />

                {/* left accent bar that grows on hover */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-[2px] bg-gold-bright scale-y-0 origin-top transition-transform duration-500 ease-out group-hover:scale-y-100" />

                {/* faint row index number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[64px] leading-none text-paper/0 group-hover:text-paper/[0.05] transition-colors duration-500 hidden sm:block"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative flex items-center gap-3 pl-4 group-hover:pl-6 transition-[padding] duration-500 ease-out">
                  <span className="transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[-6deg] text-gold-bright">
                    <Icon />
                  </span>
                  <h4 className="font-serif font-medium text-[18px]">{m.title}</h4>
                </div>

                <div className="relative flex items-start justify-between gap-4 pl-4 sm:pl-0">
                  <p className="text-[14.5px] text-muted-dark max-w-[52ch] transition-colors duration-500 group-hover:text-paper/90">
                    {m.body}
                  </p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="shrink-0 mt-0.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out text-gold-bright"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-between gap-6 mt-12">
            <p className="font-serif text-xl">Join us and make a difference.</p>
            <div className="flex flex-wrap gap-3.5">
              <a
                href="https://iliberty.org.uk/donate-2/"
                className="group relative inline-flex items-center overflow-hidden px-6 py-3 bg-gold text-ink rounded-sm text-[14.5px] font-medium transition-colors duration-300 hover:bg-gold-bright"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/40 opacity-0 group-hover:opacity-100"
                  style={{ animation: 'none' }}
                />
                <span className="relative z-10">Donate</span>
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
                  <span
                    className="absolute inset-y-0 left-0 w-1/4 bg-white/35"
                    style={{ animation: 'sheenSweep 0.9s ease-out' }}
                  />
                </span>
              </a>
              <a
                href="https://iliberty.org.uk/campaign/stopping-executions-defending-the-vulnerable/"
                className="group relative inline-flex items-center overflow-hidden px-6 py-3 border border-paper/15 rounded-sm text-[14.5px] font-medium transition-colors duration-300 hover:border-gold hover:text-gold-bright"
              >
                <span className="relative z-10">Stop executions in Iran</span>
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
                  <span
                    className="absolute inset-y-0 left-0 w-1/4 bg-gold-bright/20"
                    style={{ animation: 'sheenSweep 0.9s ease-out' }}
                  />
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}