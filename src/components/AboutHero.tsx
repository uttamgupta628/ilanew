import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import aboutHeroImage from "../assets/images/abouthero.png"; // image 1 (protest/rally photo)
import tornEdge from "../assets/images/torn-edge.webp"; // image 2 (trimmed mask)

const GOLD = "#C9A227"; // match your bg-gold progress bar; swap to your token if different
// const MAROON = "#7A1F2B"; // match your border-maroon / text-maroon token

type AboutHeroProps = {
  title?: string;
  subtitle?: string;
};

export default function AboutHero({
  title = "About Us",
  subtitle,
}: AboutHeroProps) {
  /* =======================================================
     TORN EDGE SEAM — same measured-mask technique as the
     mobile seam in Hero.tsx, just always-horizontal since
     this banner always stacks image over content.
  ======================================================= */

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
      className="
        relative
        w-full
        overflow-hidden
        bg-ink
        text-paper
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          relative
          h-[280px]
          w-full
          bg-cover
          bg-center
          sm:h-[340px]
          lg:h-[400px]
        "
        style={{ backgroundImage: `url(${aboutHeroImage})` }}
      >
        {/* Dark gradient overlay for text legibility, matching
            the reference screenshot's left-to-right fade */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/75
            via-black/45
            to-black/10
          "
        />

        {/* =================================================
            TITLE — sits above the torn seam, cleared of the
            fixed Navbar + ContactTicker height
        ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            h-full
            w-full
            flex-col
            justify-end
            px-6
            pb-10
            pt-[120px]
            sm:px-10
            sm:pb-12
            sm:pt-[140px]
            lg:px-16
            lg:pb-14
            lg:pt-[160px]
          "
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="
              font-serif
              text-[34px]
              font-extrabold
              leading-tight
              text-white
              sm:text-[44px]
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
            className="
              mt-3
              h-1
              w-16
              origin-left
              rounded-full
            "
          />

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="
                mt-4
                max-w-[520px]
                text-[15px]
                leading-relaxed
                text-white/85
                sm:text-[16px]
              "
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* =====================================================
          TORN EDGE — masked seam between the photo and the
          page's white/paper background below, same technique
          as Hero.tsx's mobileWrapRef seam.
      ====================================================== */}

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
          lg:h-12
        "
      >
        {seamWidth > 0 && (
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-8
              sm:h-10
              lg:h-12
            "
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