import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================
   IMAGES — pulled directly from the live "Children's Rights"
   page (iliberty.org.uk/childrens-rights). Hotlinking to
   wp-content works for now; for production it's worth
   downloading these into your own /assets/images folder and
   swapping the URLs below for local imports.
========================================================= */

const img = {
  childMarriageMain:
    "https://iliberty.org.uk/wp-content/uploads/2026/08/child-marriage-1.jpg",
  childMarriageLaw: "https://iliberty.org.uk/wp-content/uploads/2025/08/image.png",
  maryamTestimony: "https://iliberty.org.uk/wp-content/uploads/2025/08/image-33.png",
  childLabourMain:
    "https://iliberty.org.uk/wp-content/uploads/2026/08/child-labourer-1.jpg",
  amirTestimony:
    "https://iliberty.org.uk/wp-content/uploads/2026/08/child-labourer-2.jpg",
  childSoldierMain:
    "https://iliberty.org.uk/wp-content/uploads/2025/08/chlid-soldier-1.png",
  childSoldierBadge:
    "https://iliberty.org.uk/wp-content/uploads/2025/08/child-soldier-2.jpg",
  // Decorative Elementor assets used throughout the live page
  sectionIcon: "https://iliberty.org.uk/wp-content/uploads/2025/08/Group-45.png",
  accentRectangle: "https://iliberty.org.uk/wp-content/uploads/2025/08/Rectangle-7-2.png",
};

const RED = "#C8102E";

/* =========================================================
   DATA — pulled from the live "Children's Rights" page
========================================================= */

type ContentBlock = {
  image: string;
  alt: string;
  paragraph: string;
};

type Testimony = {
  name: string;
  quote: string;
  context: string;
  image: string;
};

type Topic = {
  tag: string;
  heading: string;
  blocks: ContentBlock[];
  testimony?: Testimony;
};

const topics: Topic[] = [
  {
    tag: "Child Marriage",
    heading: "Child Marriage \u2013 A Legalised Injustice",
    blocks: [
      {
        image: img.childMarriageMain,
        alt: "Child marriage in Iran",
        paragraph:
          "In Iran, young girls are able to legally marry at the age of thirteen \u2014 and this can be overridden by judges and parents to allow girls to marry as young as nine. According to the latest figures, 31,379 of the registered marriages in Iran in 2020 were with girls between the ages of 10 and 14. Marrying young carries extreme psychological risks: a study published in the Journal of Pediatrics found that those who marry before the age of eighteen are more likely to experience depression, anxiety, and bipolar disorder, with the risk of mental health disorders rising by 41% when marrying under 18.",
      },
      {
        image: img.childMarriageLaw,
        alt: "Iranian laws governing child marriage and divorce",
        paragraph:
          "Iran has laws that condone the marriage of children at the age of thirteen and make it more difficult for wives to divorce their husbands. This combination of laws forces women to feel inferior to men and out of control in their personal lives; the laws remain in place because the regime uses them to suppress society. Many girls are unable to talk about their experiences because they are afraid of their husbands and what might happen to them.",
      },
    ],
    testimony: {
      name: "Maryam (12)",
      quote:
        "I wish I was dead and forgotten. My husband would either hit me or force me to do heavy work. I don\u2019t know anything about a married life. I am very lonely. My only dream is that no other girl is subjected to what I have been to.",
      context:
        "Married for three years, Maryam carries the pain of years of injustice and nightmares every night. An investigator who gently earned her trust recorded her story, hoping it might help end child marriage for good.",
      image: img.maryamTestimony,
    },
  },
  {
    tag: "Child Labour",
    heading: "Child Labour \u2013 Millions of Lost Childhoods",
    blocks: [
      {
        image: img.childLabourMain,
        alt: "Child labour in Iran",
        paragraph:
          "It is estimated that there are at least 4 million child labourers in Iran. In 2021 alone, two million children dropped out of school because of Covid-19, poverty, and a lack of educational facilities. Thousands more are trafficked by the Iran Revolutionary Guards into Arab countries, where they face exploitation, sexual abuse, and enslavement.",
      },
    ],
    testimony: {
      name: "Amir (14)",
      quote:
        "I was a top student at school. I liked studying and wanted to become an engineer. I was forced to work to help my mother earn the meagre money we needed for at least some bread to eat. Everything looks so dark for me \u2014 but I am proud of my father, who stood up against this injustice.",
      context:
        "Amir\u2019s father was killed during the 2019 fuel protests. With no way to pay for school and nothing to eat, Amir left the classroom for work \u2014 and now looks away when he passes his former classmates.",
      image: img.amirTestimony,
    },
  },
  {
    tag: "Child Soldier",
    heading: "Child Soldiers \u2013 Indoctrinated for War",
    blocks: [
      {
        image: img.childSoldierMain,
        alt: "Child soldiers in Iran",
        paragraph:
          "Thousands of children in Iran are coerced into military service. Many are maimed or killed, some are sexually abused, and many survivors go on to take their own lives. These children are brainwashed into believing they are sinners and that martyrdom in war will purge them of their sins \u2014 made to wear green headbands imprinted with the words \u201cKhamenei is the leader.\u201d",
      },
      {
        image: img.childSoldierBadge,
        alt: "Commemoration of child soldiers killed in the Iran\u2013Iraq war",
        paragraph:
          "The regime glorifies this treatment, allocating 30th October each year to commemorate the death of Hossein Fahmideh, a much-publicised child soldier killed in the Iran\u2013Iraq war. During the 1980s, at least half a million children were sent to that war\u2019s front line; official figures put the death toll at 36,000 children, though the true number is believed to be far higher.",
      },
    ],
  },
];

/* =========================================================
   SECTION ICON — the site's own decorative icon graphic,
   popping in on scroll ahead of each topic's first heading
========================================================= */

function SectionIcon() {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="mb-3 flex h-9 w-9 items-center justify-center rounded-full"
      style={{ backgroundColor: `${RED}15` }}
      aria-hidden="true"
    >
      <img src={img.sectionIcon} alt="" className="h-4 w-4 object-contain" />
    </motion.span>
  );
}

/* =========================================================
   ACCENT RECTANGLE — the site's decorative corner mark,
   peeking out from behind each image
========================================================= */

function AccentRectangle({ flip }: { flip: boolean }) {
  return (
    <img
      src={img.accentRectangle}
      alt=""
      aria-hidden="true"
      className={`
        pointer-events-none absolute -bottom-4 z-[-1] h-16 w-24 object-contain opacity-90
        ${flip ? "-left-4 -scale-x-100" : "-right-4"}
      `}
    />
  );
}

/* =========================================================
   DIVIDER — thin accent rule between sections
========================================================= */

// function SectionDivider() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scaleX: 0 }}
//       whileInView={{ opacity: 1, scaleX: 1 }}
//       viewport={{ once: true, amount: 0.8 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="mx-auto my-14 h-px w-full max-w-xs origin-center bg-ink/10 sm:my-16"
//     />
//   );
// }

/* =========================================================
   TOPIC TABS — the "Child Marriage / Child labour / Child
   soldier" strip from the live page, now functioning as real
   tabs: clicking one shows only that topic's content below.
========================================================= */

function TopicTabs({
  activeTag,
  onSelect,
}: {
  activeTag: string;
  onSelect: (tag: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto mb-14 flex max-w-[1200px] flex-wrap items-center justify-center gap-3 px-5 sm:px-8"
    >
      {topics.map((topic) => {
        const isActive = topic.tag === activeTag;
        return (
          <button
            key={topic.tag}
            type="button"
            onClick={() => onSelect(topic.tag)}
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-1.5 text-[13.5px] font-semibold transition-colors duration-200 ${
              isActive
                ? "border-transparent text-white"
                : "border-ink/10 bg-[#C8102E0D] text-ink/80 hover:bg-[#C8102E1A]"
            }`}
            style={isActive ? { backgroundColor: RED } : undefined}
          >
            {topic.tag}
          </button>
        );
      })}
    </motion.div>
  );
}

/* =========================================================
   ARTICLE ROW — alternating image/text, entrance + gentle
   float loop. Only the first block in a topic shows the
   heading + tag; later blocks continue the story.
========================================================= */

function ArticleRowBlock({
  block,
  tag,
  heading,
  imageFromRight,
  isFirstInTopic,
}: {
  block: ContentBlock;
  tag: string;
  heading: string;
  imageFromRight: boolean;
  isFirstInTopic: boolean;
}) {
  const imageOrderClass = imageFromRight ? "lg:order-2" : "lg:order-1";
  const textOrderClass = imageFromRight ? "lg:order-1" : "lg:order-2";

  return (
    <div
      className="
        mx-auto
        grid
        w-full
        max-w-[1200px]
        grid-cols-1
        items-center
        gap-10
        px-5
        sm:px-8
        lg:grid-cols-2
        lg:gap-16
      "
    >
      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: imageFromRight ? 80 : -80 }}
        whileInView={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          y: {
            duration: 3.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 0.8,
          },
        }}
        className={`relative ${imageOrderClass}`}
      >
        <AccentRectangle flip={imageFromRight} />
        <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
          <img
            src={block.image}
            alt={block.alt}
            className="h-[280px] w-full object-cover sm:h-[340px]"
          />
        </div>
      </motion.div>

      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, x: imageFromRight ? -80 : 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`flex flex-col justify-center ${textOrderClass}`}
      >
        {isFirstInTopic && (
          <>
            <SectionIcon />
            <span
              className="mb-2 text-[13px] font-bold uppercase tracking-wide"
              style={{ color: RED }}
            >
              {tag}
            </span>
            <h2 className="font-serif text-[24px] font-extrabold leading-snug text-ink sm:text-[28px] lg:text-[30px]">
              {heading}
            </h2>
          </>
        )}
        <p className="mt-4 text-[15.5px] leading-[1.75] text-ink/70 sm:text-[16px]">
          {block.paragraph}
        </p>
      </motion.div>
    </div>
  );
}

/* =========================================================
   TESTIMONY BLOCK — first-hand account, image + quote card,
   styled as a distinct "pause" between article rows
========================================================= */

function TestimonyBlock({ testimony }: { testimony: Testimony }) {
  return (
    <div className="mx-auto mb-2 mt-10 w-full max-w-[1200px] px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="
          grid
          grid-cols-1
          gap-8
          overflow-hidden
          rounded-2xl
          bg-[#FAFAFA]
          p-6
          shadow-[0_2px_10px_rgba(0,0,0,0.04)]
          sm:p-8
          md:grid-cols-[220px_1fr]
          md:items-stretch
        "
      >
        <div className="overflow-hidden rounded-xl">
          <img
            src={testimony.image}
            alt={`Portrait accompanying ${testimony.name}'s testimony`}
            className="h-[180px] w-full object-cover md:h-full"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span
            className="mb-3 h-[3px] w-10 rounded-full"
            style={{ backgroundColor: RED }}
            aria-hidden="true"
          />
          <p className="font-serif text-[17px] italic leading-relaxed text-ink sm:text-[18px]">
            &ldquo;{testimony.quote}&rdquo;
          </p>
          <p className="mt-4 text-[14px] font-bold text-ink">{testimony.name}</p>
          <p className="mt-1 text-[14px] leading-relaxed text-ink/60">
            {testimony.context}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   ARTICLE
========================================================= */

export default function ChildrensRightsArticle() {
  const [activeTag, setActiveTag] = useState(topics[0].tag);
  const activeTopic = topics.find((topic) => topic.tag === activeTag) ?? topics[0];

  return (
    <article className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <TopicTabs activeTag={activeTag} onSelect={setActiveTag} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTopic.tag}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTopic.blocks.map((block, blockIndex) => (
            <div key={`${activeTopic.tag}-${blockIndex}`} className="mb-10 last:mb-0">
              <ArticleRowBlock
                block={block}
                tag={activeTopic.tag}
                heading={activeTopic.heading}
                imageFromRight={blockIndex % 2 === 1}
                isFirstInTopic={blockIndex === 0}
              />
            </div>
          ))}
          {activeTopic.testimony && (
            <TestimonyBlock testimony={activeTopic.testimony} />
          )}
        </motion.div>
      </AnimatePresence>
    </article>
  );
}