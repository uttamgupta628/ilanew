import Reveal from './Reveal';
import { helpCards } from '../data/content';

export default function HowToHelp() {
  const [featured, ...rest] = helpCards;

  return (
    <section id="how-to-help" className="py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <h2 className="font-serif font-medium text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] tracking-tight max-w-[16ch] mb-12">
          Join us in making a tangible difference
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6">
          {featured && (
            <Reveal className="relative overflow-hidden h-[320px] md:h-auto group">
              <img
                src={featured.img}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent flex flex-col justify-end p-7">
                <h4 className="font-serif font-medium text-[24px] text-paper mb-2">{featured.title}</h4>
                <p className="text-[14.5px] text-paper/80 max-w-[38ch] mb-4">{featured.body}</p>
                <a
                  href={featured.href}
                  className="text-[14px] font-semibold text-gold-bright border-b border-gold-bright w-fit pb-0.5"
                >
                  {featured.cta}
                </a>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1} className="border-t border-black/10">
            {rest.map((c) => (
              <a
                key={c.title}
                href={c.href}
                className="group flex items-center justify-between gap-6 py-6 border-b border-black/10"
              >
                <div>
                  <h4 className="font-serif font-medium text-[19px] mb-1.5">{c.title}</h4>
                  <p className="text-[14px] text-muted-light max-w-[36ch]">{c.body}</p>
                </div>
                <span className="text-[13.5px] font-semibold text-maroon whitespace-nowrap border-b border-transparent group-hover:border-maroon transition-colors shrink-0">
                  {c.cta}
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
