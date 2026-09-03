import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { missionItems } from "../data/content";
import { iconMap } from "./Icons";

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
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-20 sm:py-28 overflow-hidden"
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes headingWordIn {
          from { opacity: 0; transform: translateY(14px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .flip-card {
          perspective: 1200px;
        }
        .flip-card-inner {
          transform-style: preserve-3d;
          transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .flip-card:hover .flip-card-inner {
          transform: rotate3d(1, 1, 0, 180deg);
        }
        .flip-face {
          backface-visibility: hidden;
        }
        .flip-back {
          transform: rotate3d(1, 1, 0, 180deg);
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Centered heading block */}
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="font-extrabold text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.1] tracking-tight text-ink">
              {"Our Mission".split(" ").map((word, i) => (
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

          <Reveal delay={0.1}>
            <div className="flex justify-center items-center gap-1 my-5">
              <span
                className="w-10 h-[3px] rounded-full"
                style={{ backgroundColor: "#1E4FD8" }}
              />
              <span
                className="w-10 h-[3px] rounded-full"
                style={{ backgroundColor: "#C8102E" }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-[16px] sm:text-[17px] text-gray-600 max-w-[56ch] mx-auto">
              ILA defends human rights and supports victims of Human Rights
              abuses to rebuild their lives
            </p>
          </Reveal>
        </div>

        <div
          ref={listRef}
          className="flex flex-wrap justify-center gap-8 md:gap-10"
        >
          {missionItems.map((m, i) => {
            const Icon = iconMap[m.icon];
            return (
              <div
                key={m.title}
                className="flip-card opacity-0"
                style={{
                  animation: inView
                    ? `cardIn 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.09}s forwards`
                    : "none",
                }}
              >
                <div className="flip-card-inner relative w-72 h-64 sm:w-80 sm:h-72 rounded-[32px]">
                  {/* Front */}
                  <div
                    className="
                      flip-face
                      absolute inset-0
                      bg-white
                      border border-black/5
                      rounded-[32px]
                      shadow-xl
                      flex flex-col items-center justify-center
                      text-center px-6
                    "
                  >
                    <span
                      className="mb-4 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                      style={{ color: "#C8102E" }}
                    >
                      <Icon />
                    </span>
                    <p className="text-sm font-medium text-ink leading-snug">
                      {m.title}
                    </p>
                  </div>

                  {/* Back */}
                  <div
                    className="
                      flip-face flip-back
                      absolute inset-0
                      rounded-[32px]
                      shadow-xl
                      flex items-center justify-center
                      text-center px-6
                    "
                    style={{ backgroundColor: "#C8102E" }}
                  >
                    <p className="text-sm font-medium text-white leading-relaxed">
                      {m.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Highlight box: Join us and make a difference */}
          <div
            className="
              w-72 h-64 sm:w-80 sm:h-72
              rounded-[32px]
              shadow-xl
              flex flex-col items-start justify-center
              gap-6
              px-8
            "
            style={{ backgroundColor: "#C8102E" }}
          >
            <p className="text-xl sm:text-2xl font-semibold text-white leading-snug">
              Join us and make a difference.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://iliberty.org.uk/donate-2/"
                className="
                  group
                  relative
                  overflow-hidden

                  inline-flex items-center gap-1.5

                  px-5 py-2.5

                  rounded-full
                  border border-white

                  text-[13.5px] font-semibold
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute inset-0
                    origin-bottom scale-y-0
                    transition-transform duration-500 ease-out
                    group-hover:scale-y-100
                  "
                  style={{ backgroundColor: "#ffffff" }}
                />
                <span className="relative z-10 text-white transition-colors duration-500 group-hover:text-[#C8102E]">
                  Donate ▸
                </span>
              </a>

              <a
                href="https://iliberty.org.uk/campaign/stopping-executions-defending-the-vulnerable/"
                className="
                  group
                  relative
                  overflow-hidden

                  inline-flex items-center gap-1.5

                  px-5 py-2.5

                  rounded-full
                  border border-white

                  text-[13.5px] font-semibold
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute inset-0
                    origin-bottom scale-y-0
                    transition-transform duration-500 ease-out
                    group-hover:scale-y-100
                  "
                  style={{ backgroundColor: "#ffffff" }}
                />
                <span className="relative z-10 text-white transition-colors duration-500 group-hover:text-[#4C7FAE]">
                  Stop Executions in Iran ▸
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}