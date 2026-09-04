import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { shopItems } from '../data/content';

/* =========================================================
   ARROW ICON
========================================================= */

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
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
   SINGLE SHOP TILE — 3D tilt on hover + 3D entrance
========================================================= */

function ShopTile({
  item,
  index,
}: {
  item: (typeof shopItems)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovering, setHovering] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Tilt toward the cursor — subtle, not gimmicky
    const ry = (px - 0.5) * 12;
    const rx = (0.5 - py) * 12;

    setTilt({ rx, ry });
  }

  function handleMouseLeave() {
    setHovering(false);
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
        rotateX: -12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        perspective: 1200,
      }}
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setHovering(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${
            hovering ? 1.015 : 1
          })`,
          transition:
            'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* =====================================================
            IMAGE
        ====================================================== */}

        <a
          href={item.href}
          className="
            relative
            block
            overflow-hidden
            rounded-2xl
            mb-5
            shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.18)]
            transition-shadow
            duration-500
          "
          style={{
            transform: 'translateZ(24px)',
          }}
        >
          <img
            src={item.img}
            alt={item.title}
            className="
              h-[280px]
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-110
            "
          />
        </a>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
          style={{
            transform: 'translateZ(36px)',
          }}
        >
          <div>
            <h4
              className="
                mb-1.5
                font-Arial
                text-[19px]
                font-bold
                leading-snug
                text-ink
              "
            >
              {item.title}
            </h4>

            <p
              className="
                text-[13.5px]
                leading-relaxed
                text-muted-light
              "
            >
              {item.desc}
            </p>

            <div
              className="
                mt-2.5
                text-[14.5px]
                font-semibold
                text-maroon
              "
            >
              {item.price}
            </div>
          </div>

          {/* PRODUCT ARROW */}

          <a
            href={item.href}
            aria-label={`View ${item.title}`}
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#C8102E]
              text-white
              transition-transform
              duration-300
              group-hover:rotate-45
              group-hover:scale-110
            "
          >
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   SECTION
========================================================= */

export default function Shop() {
  return (
    <section className="bg-paper-dim py-20 sm:py-28">
      <div
        className="
          mx-auto
          max-w-[1200px]
          px-5
          sm:px-8
        "
      >
        {/* =================================================
            HEADER — pill badge + centered heading
        ================================================== */}

        <Reveal>
          <div
            className="
              mb-16
              flex
              flex-col
              items-center
              text-center
            "
          >
            {/* BADGE */}

            <span
              className="
                mb-6
                inline-flex
                items-center
                rounded-full
                border
                border-black/15
                px-5
                py-0
                -mt-40
                text-[12.5px]
                font-bold
                tracking-wide
                text-ink
              "
            >
              SHOP FROM ILA
            </span>

            {/* HEADING */}

            <h2
              className="
                mb-4
                max-w-[18ch]
                font-Lato
                text-[36px]
                font-bold
                leading-[1.1]
                tracking-tight
                text-ink
                sm:text-[42px]
                lg:text-[46px]
              "
            >
              Support Our Work, One Purchase At A Time
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                max-w-[52ch]
                text-[16px]
                text-muted-light
                sm:text-[17px]
              "
            >
              Handmade goods sourced through our network — every purchase
              helps fund our campaigns.
            </p>
          </div>
        </Reveal>

        {/* =================================================
            GRID — 3 columns
        ================================================== */}

        <div
          className="
            mb-14
            grid
            grid-cols-1
            gap-x-8
            gap-y-14
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {shopItems.map((item, i) => (
            <ShopTile
              key={item.title}
              item={item}
              index={i}
            />
          ))}
        </div>

        {/* =================================================
            VIEW ALL PRODUCTS — BOTTOM RIGHT
        ================================================== */}

        <div className="flex justify-end">
          <a
            href="https://international-liberty-association.myshopify.com/collections/all"
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
              text-[16px]
              font-semibold
              text-maroon
              transition-all
              duration-300
              hover:text-white
              sm:py-3
              sm:pl-8
              sm:pr-3
              sm:text-[17px]
            "
          >
            {/* =================================================
                RED FILL — BOTTOM TO TOP
            ================================================== */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-x-0
                bottom-0
                h-0
                bg-[#C8102E]
                transition-all
                duration-500
                ease-out
                group-hover:h-full
              "
            />

            {/* =================================================
                BUTTON TEXT
            ================================================== */}

            <span className="relative z-10">
              View all products
            </span>

            {/* =================================================
                CIRCULAR ARROW
            ================================================== */}

            <span
              className="
                relative
                z-10
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-maroon/10
                transition-all
                duration-300
                group-hover:rotate-45
                group-hover:bg-white/20
              "
            >
              <ArrowIcon className="h-[18px] w-[18px]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}