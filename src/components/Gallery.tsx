import { useRef, useState } from 'react';
import Reveal from './Reveal';
import { galleryItems } from '../data/content';

interface GalleryTileProps {
  title: string;
  body: string;
  img: string;
  delay?: number;
  className?: string;
  titleSize?: string;
  bodySize?: string;
  padding?: string;
}

function GalleryTile({
  title,
  body,
  img,
  delay = 0,
  className = '',
  titleSize = 'text-[18px]',
  bodySize = 'text-[13px]',
  padding = 'p-5',
}: GalleryTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 14; // rotateY
    const rx = (0.5 - py) * 14; // rotateX
    setTilt({ rx, ry, mx: px * 100, my: py * 100 });
  }

  function handleMouseLeave() {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  }

  return (
    <Reveal delay={delay} className={`[perspective:1000px] ${className}`}>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1,1,1)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
        }}
        className="group relative w-full h-full overflow-hidden rounded-sm"
      >
        {/* image: starts blurred/oversized, sharpens on entrance; extra zoom + brighten on hover */}
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover scale-110 blur-[6px] opacity-0 animate-[tileImgIn_1s_ease-out_forwards] transition-[filter,transform] duration-700 ease-out group-hover:scale-125 group-hover:blur-0 group-hover:brightness-110"
          style={{ animationDelay: `${delay}s` }}
        />

        {/* cursor-tracked spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.25), transparent 45%)`,
          }}
        />

        {/* diagonal light sweep */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -inset-y-full -left-1/2 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[200%] group-hover:translate-x-[500%] transition-transform duration-[1100ms] ease-out" />
        </div>

        {/* base + hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />

        {/* pulsing glow border on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-gold-bright/0 group-hover:ring-gold-bright/60 group-hover:animate-[glowPulse_1.6s_ease-in-out_infinite] transition-[box-shadow] duration-300" />

        {/* content */}
        <div
          className={`absolute bottom-0 left-0 right-0 ${padding} translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out`}
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="flex items-end justify-between gap-3">
            <h4 className={`font-serif font-medium ${titleSize} text-paper mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]`}>
              {title}
            </h4>
            <span className="mb-2 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 translate-x-3 group-hover:translate-x-0 transition-all duration-500 ease-out shrink-0">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <p
            className={`${bodySize} text-paper/80 max-w-[36ch] max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-out`}
          >
            {body}
          </p>
        </div>

        {/* accent underline sweep */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gold-bright/80 transition-all duration-700 ease-out" />
      </div>
    </Reveal>
  );
}

export default function Gallery() {
  const [first, ...rest] = galleryItems;

  return (
    <section className="py-20 sm:py-28 bg-paper-dim overflow-hidden">
      <style>{`
        @keyframes tileImgIn {
          from { opacity: 0; filter: blur(6px); transform: scale(1.15); }
          to { opacity: 1; filter: blur(0px); transform: scale(1.1); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0px 0px rgba(212,175,55,0.35); }
          50% { box-shadow: 0 0 24px 2px rgba(212,175,55,0.45); }
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="font-serif font-medium text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] tracking-tight max-w-[18ch] mb-12">
            What standing up for the vulnerable looks like
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {first && (
            <GalleryTile
              title={first.title}
              body={first.body}
              img={first.img}
              className="md:row-span-2 h-[320px] md:h-full"
              titleSize="text-[21px]"
              bodySize="text-[14px]"
              padding="p-6"
            />
          )}

          <div className="grid grid-cols-1 gap-4">
            {rest.map((g, i) => (
              <GalleryTile
                key={g.title}
                title={g.title}
                body={g.body}
                img={g.img}
                delay={i * 0.08}
                className="h-[210px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}