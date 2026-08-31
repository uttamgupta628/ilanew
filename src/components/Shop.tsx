import Reveal from './Reveal';
import { shopItems } from '../data/content';

export default function Shop() {
  return (
    <section className="bg-paper-dim py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-11">
          <div>
            <h2 className="font-serif font-medium text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] tracking-tight max-w-[16ch] mb-4">
              Shop from ILA
            </h2>
            <p className="text-[17px] max-w-[52ch] text-muted-light">
              Support our campaigns by shopping handmade goods sourced through our network.
            </p>
          </div>
          <a
            href="https://international-liberty-association.myshopify.com/collections/all"
            className="text-[14.5px] font-medium border-b border-black/25 pb-0.5 hover:border-maroon hover:text-maroon transition-colors shrink-0"
          >
            View all products
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {shopItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="group">
              <a href={item.href} className="block overflow-hidden mb-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>
              <div className="flex justify-between items-start gap-3.5">
                <div>
                  <h4 className="font-serif text-[19px] font-medium mb-1.5">{item.title}</h4>
                  <p className="text-[13.5px] text-muted-light">{item.desc}</p>
                </div>
                <div className="text-[15px] text-maroon font-semibold whitespace-nowrap">{item.price}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
