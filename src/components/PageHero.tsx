import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import tornEdge from "../assets/images/torn-edge.webp";

const GOLD = "#C9A227";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
};

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [seamWidth, setSeamWidth] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const updateWidth = () => setSeamWidth(el.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    window.addEventListener("resize", updateWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      className="relative w-full overflow-hidden bg-ink text-paper"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          relative
          h-[240px]
          w-full
          bg-cover
          bg-center
          xs:h-[260px]
          sm:h-[340px]
          lg:h-[400px]
        "
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

        <div
          className="
            relative z-10 flex h-full w-full min-w-0 flex-col justify-end
            px-4 pb-8 pt-[96px]
            xs:px-5 xs:pb-9 xs:pt-[104px]
            sm:px-10 sm:pb-12 sm:pt-[130px]
            lg:px-16 lg:pb-14 lg:pt-[160px]
          "
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="
              break-words
              font-Arial
              text-[26px]
              font-extrabold
              leading-tight
              text-white
              xs:text-[30px]
              sm:text-[40px]
              lg:text-[56px]
            "
          >
            {title}
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ backgroundColor: GOLD }}
            className="mt-3 h-1 w-12 origin-left rounded-full sm:w-16"
          />

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="
                mt-3
                max-w-full
                break-words
                text-[13.5px]
                leading-relaxed
                text-white/85
                xs:mt-4
                sm:max-w-[520px]
                sm:text-[16px]
              "
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* TORN EDGE SEAM */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-2 z-20 h-6 overflow-hidden xs:h-8 sm:h-10 lg:h-12">
        {seamWidth > 0 && (
          <div
            className="absolute left-1/2 top-1/2 h-6 xs:h-8 sm:h-10 lg:h-12"
            style={{
              width: `${seamWidth + 8}px`,
              transform: "translate(-50%, -50%) rotate(180deg)",
              backgroundColor: "var(--color-paper, #fff)",
              boxShadow: "0 -6px 20px rgba(0, 0, 0, 0.15)",
              WebkitMaskImage: `url(${tornEdge})`,
              maskImage: `url(${tornEdge})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
            }}
          />
        )}
      </div>
    </section>
  );
}