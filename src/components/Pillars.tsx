import { useRef, useState } from 'react';
import Reveal from './Reveal';
import campaignExecutions from '../assets/images/campaign-executions.jpg';
import campaignSurvivors from '../assets/images/campaign-survivors.jpg';

interface CampaignCardProps {
  href: string;
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  description: string;
  cta: string;
  ctaColor: string;
  image: string;
  imageAlt: string;
  imageOrder: 'first' | 'last';
  descColor: string;
  glowColor: string;
}

function CampaignCard({
  href,
  eyebrow,
  eyebrowColor,
  title,
  description,
  cta,
  ctaColor,
  image,
  imageAlt,
  imageOrder,
  descColor,
  glowColor,
}: CampaignCardProps) {
  const isImageFirst = imageOrder === 'first';
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = imgWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid grid-cols-1 md:grid-cols-2 items-stretch"
    >
      <div
        ref={imgWrapRef}
        onMouseMove={handleMouseMove}
        className={[
          'relative overflow-hidden',
          'h-[220px] xs:h-[260px] sm:h-[320px] md:h-[420px] lg:h-[480px]',
          isImageFirst ? 'order-1' : 'order-1 md:order-2',
        ].join(' ')}
      >
        {/* image: blurred/oversized entrance, sharpens; extra zoom + brighten on hover */}
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="w-full h-full object-cover scale-110 blur-[8px] opacity-0 animate-[cardImgIn_1.1s_ease-out_forwards] transition-[filter,transform] duration-[900ms] ease-out will-change-transform group-hover:scale-[1.12] group-hover:blur-0 group-hover:brightness-110"
        />

        {/* cursor-tracked spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.22), transparent 45%)`,
          }}
        />

        {/* diagonal light sweep */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -inset-y-full -left-1/2 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[200%] group-hover:translate-x-[500%] transition-transform duration-[1200ms] ease-out" />
        </div>

        {/* base tint, deepens on hover */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />

        {/* pulsing glow border */}
        <div
          className={`pointer-events-none absolute inset-0 ring-1 ring-inset ring-transparent group-hover:animate-[cardGlowPulse_1.8s_ease-in-out_infinite] transition-shadow duration-300 ${glowColor}`}
        />
      </div>

      <div
        className={[
          'flex flex-col justify-center',
          'px-5 sm:px-8 py-10 sm:py-14 md:py-0',
          'max-w-[1200px] md:max-w-none',
          isImageFirst
            ? 'order-2 md:pr-8 md:pl-10 lg:pl-14 md:mr-[max(0px,calc((100vw-1200px)/2))]'
            : 'order-2 md:order-1 md:pl-8 md:pr-10 lg:pr-14 md:ml-[max(0px,calc((100vw-1200px)/2))]',
        ].join(' ')}
      >
        <span
          className={`text-[12px] sm:text-[13px] tracking-wide uppercase mb-2.5 sm:mb-3 opacity-0 -translate-x-3 animate-[cardTextIn_0.7s_ease-out_0.15s_forwards] ${eyebrowColor}`}
        >
          {eyebrow}
        </span>

        <h3 className="font-serif font-medium text-[22px] xs:text-[25px] sm:text-[28px] lg:text-[32px] leading-[1.2] max-w-[20ch] mb-3 sm:mb-4 opacity-0 translate-y-4 animate-[cardTextIn_0.7s_ease-out_0.28s_forwards]">
          {title}
        </h3>

        <p
          className={`text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-[48ch] mb-5 sm:mb-6 opacity-0 translate-y-4 animate-[cardTextIn_0.7s_ease-out_0.4s_forwards] ${descColor}`}
        >
          {description}
        </p>

        <span
          className={`inline-flex items-center gap-2 text-[14px] sm:text-[14.5px] font-medium border-b border-transparent group-hover:border-current transition-colors duration-300 w-fit opacity-0 translate-y-4 animate-[cardTextIn_0.7s_ease-out_0.52s_forwards] ${ctaColor}`}
        >
          {cta}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

export default function Pillars() {
  return (
    <section id="campaigns">
      <style>{`
        @keyframes cardImgIn {
          from { opacity: 0; filter: blur(8px); transform: scale(1.18); }
          to { opacity: 1; filter: blur(0px); transform: scale(1.1); }
        }
        @keyframes cardTextIn {
          from { opacity: 0; transform: translate(-12px, 0); }
          to { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes cardGlowPulse {
          0%, 100% { box-shadow: inset 0 0 0px 0px currentColor; }
          50% { box-shadow: inset 0 0 40px 4px currentColor; }
        }
      `}</style>

      <Reveal>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-16 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-14">
          <h2 className="font-serif font-medium text-[26px] xs:text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.15] tracking-tight max-w-[20ch] mb-4 sm:mb-5">
            Two connected areas, one shared mission
          </h2>
          <p className="text-[15.5px] sm:text-[17px] leading-relaxed max-w-[62ch] text-muted-light">
            Every programme we run protects dignity, strengthens communities, and contributes to a more informed and
            compassionate UK society.
          </p>
        </div>
      </Reveal>

      <Reveal className="bg-paper">
        <CampaignCard
          href="https://iliberty.org.uk/campaign/stopping-executions-defending-the-vulnerable/"
          eyebrow="Raising awareness"
          eyebrowColor="text-maroon"
          title="Stopping executions. Defending the vulnerable."
          description="We campaign to end executions in Iran and defend the rights of prisoners of conscience — organising demonstrations, letter-writing drives, and mass petitions, and gathering evidence from inside prisons."
          cta="Read about this campaign"
          ctaColor="text-maroon"
          descColor="text-muted-light"
          glowColor="text-maroon/60"
          image={campaignExecutions}
          imageAlt="Vigil supporting victims of executions in Iran"
          imageOrder="last"
        />
      </Reveal>

      <Reveal delay={0.08} className="bg-ink text-paper">
        <CampaignCard
          href="https://iliberty.org.uk/campaign/helping-survivors-rebuild-in-the-uk-2/"
          eyebrow="Community support"
          eyebrowColor="text-gold"
          title="Helping survivors rebuild in the UK"
          description="We support refugees, survivors, migrants, and vulnerable families across the UK to rebuild their lives, strengthen their independence, and feel connected to the communities around them."
          cta="See how we help"
          ctaColor="text-gold-bright"
          descColor="text-muted-dark"
          glowColor="text-gold-bright/60"
          image={campaignSurvivors}
          imageAlt="One-to-one integration support session"
          imageOrder="first"
        />
      </Reveal>
    </section>
  );
}