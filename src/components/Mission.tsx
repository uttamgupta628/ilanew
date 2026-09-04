
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
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes headingWordIn {
          from {
            opacity: 0;
            transform: translateY(14px);
            filter: blur(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
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

        .cta-tilt-wrap {
          perspective: 1000px;
        }

        .cta-tilt {
          transform: rotateX(0deg) rotateY(0deg) translateZ(0px);
          transition:
            transform 0.5s cubic-bezier(0.16,1,0.3,1),
            box-shadow 0.5s ease;
          transform-style: preserve-3d;
        }

        .cta-tilt-wrap:hover .cta-tilt {
          transform: rotateX(6deg) rotateY(-8deg) translateZ(20px);
          box-shadow: 0 35px 60px -15px rgba(200,16,46,0.45);
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">

        {/* =================================================
            CENTERED HEADING BLOCK
        ================================================== */}

        <div className="text-center mb-16">

          <Reveal>
            <h2
              className="
                font-extrabold
                text-[38px]
                sm:text-[48px]
                lg:text-[56px]
                leading-[1.1]
                tracking-tight
                text-ink
              "
            >
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

          {/* UNDERLINE */}

          <Reveal delay={0.1}>
            <div
              className="
                flex
                justify-center
                items-center
                gap-1
                my-5
              "
            >
              <span
                className="
                  w-10
                  h-[3px]
                  rounded-full
                "
                style={{
                  backgroundColor: "#1E4FD8",
                }}
              />

              <span
                className="
                  w-10
                  h-[3px]
                  rounded-full
                "
                style={{
                  backgroundColor: "#C8102E",
                }}
              />
            </div>
          </Reveal>

          {/* DESCRIPTION */}

          <Reveal delay={0.15}>
            <p
              className="
                text-[18px]
                sm:text-[19px]
                text-gray-600
                leading-relaxed
                max-w-[56ch]
                mx-auto
              "
            >
              ILA defends human rights and supports victims of Human Rights
              abuses to rebuild their lives
            </p>
          </Reveal>
        </div>

        {/* =================================================
            MISSION CARDS
        ================================================== */}

        <div
          ref={listRef}
          className="
            flex
            flex-wrap
            justify-center
            gap-8
            md:gap-10
          "
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
                <div
                  className="
                    flip-card-inner
                    relative
                    w-72
                    h-64
                    sm:w-80
                    sm:h-72
                    rounded-[32px]
                  "
                >

                  {/* =================================================
                      FRONT
                  ================================================== */}

                  <div
                    className="
                      flip-face
                      absolute
                      inset-0
                      bg-white
                      border
                      border-black/5
                      rounded-[32px]
                      shadow-xl
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-center
                      px-6
                    "
                  >

                    {/* ICON */}

                    <span
  className="
    mb-5
    w-16
    h-16
    sm:w-20
    sm:h-20
    flex
    items-center
    justify-center
    text-[#C8102E]
    [&>svg]:w-full
    [&>svg]:h-full
  "
>
  <Icon />
</span>

                    {/* TITLE */}

                    <p
                      className="
                        text-[17px]
                        sm:text-[18px]
                        font-semibold
                        text-ink
                        leading-snug
                      "
                    >
                      {m.title}
                    </p>
                  </div>

                  {/* =================================================
                      BACK
                  ================================================== */}

                  <div
                    className="
                      flip-face
                      flip-back
                      absolute
                      inset-0
                      rounded-[32px]
                      shadow-xl
                      flex
                      items-center
                      justify-center
                      text-center
                      px-6
                    "
                    style={{
                      backgroundColor: "#C8102E",
                    }}
                  >
                    <p
                      className="
                        text-[17px]
                        sm:text-[18px]
                        font-medium
                        text-white
                        leading-[1.7]
                      "
                    >
                      {m.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* =================================================
              HIGHLIGHT BOX
          ================================================== */}

          <div
            className="
              cta-tilt-wrap
              w-72
              sm:w-80
            "
          >
            <div
              className="
                cta-tilt
                w-72
                h-64
                sm:w-80
                sm:h-72
                rounded-[32px]
                shadow-xl
                flex
                flex-col
                items-start
                justify-center
                gap-6
                px-8
              "
              style={{
                backgroundColor: "#C8102E",
              }}
            >

              {/* CTA TITLE */}

              <p
                className="
                  text-[23px]
                  sm:text-[26px]
                  font-semibold
                  text-white
                  leading-snug
                "
              >
                Join us and make a difference.
              </p>

              {/* CTA BUTTONS */}

              <div className="flex flex-wrap gap-3">

                {/* DONATE */}

                <a
                  href="https://iliberty.org.uk/donate-2/"
                  className="
                    group
                    relative
                    overflow-hidden
                    inline-flex
                    items-center
                    gap-1.5
                    px-5
                    py-2.5
                    rounded-full
                    border-2
                    border-white
                    text-[15px]
                    font-semibold
                  "
                >
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
                      group-hover:scale-y-100
                    "
                    style={{
                      backgroundColor: "#ffffff",
                    }}
                  />

                  <span
                    className="
                      relative
                      z-10
                      text-white
                      transition-colors
                      duration-500
                      group-hover:text-[#C8102E]
                    "
                  >
                    Donate ▸
                  </span>
                </a>

                {/* STOP EXECUTIONS */}

                <a
                  href="https://iliberty.org.uk/campaign/stopping-executions-defending-the-vulnerable/"
                  className="
                    group
                    relative
                    overflow-hidden
                    inline-flex
                    items-center
                    gap-1.5
                    px-5
                    py-2.5
                    rounded-full
                    border-2
                    border-white
                    text-[15px]
                    font-semibold
                  "
                >
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
                      group-hover:scale-y-100
                    "
                    style={{
                      backgroundColor: "#ffffff",
                    }}
                  />

                  <span
                    className="
                      relative
                      z-10
                      text-white
                      transition-colors
                      duration-500
                      group-hover:text-[#4C7FAE]
                    "
                  >
                    Stop Executions in Iran ▸
                  </span>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}