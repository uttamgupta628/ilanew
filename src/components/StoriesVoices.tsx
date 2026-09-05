import { motion } from "framer-motion";

// Placeholder imports — swap for your real filenames
import amineh from "../assets/images/story-amineh.png";
import davina from "../assets/images/story-davina.png";
import sepideh from "../assets/images/story-sepideh.png";
import roya from "../assets/images/story-roya.png";
import peter from "../assets/images/story-peter.png";

const BLUE = "#5B8DBE";

/* =========================================================
   DATA
========================================================= */

const stories = [
  {
    name: "Amineh",
    image: amineh,
    alt: "Amineh speaking at an ILA event",
    quote:
      "My name is Amineh. I came from a family that both my mother and my father were teachers and after the revolution of Iran when I was one year old, my father got arrested and later executed by the regime and after some months my mother and I also got arrested and they sent us to prison. Many families have suffered. We just want freedom. We just want to live normal, like so many others in the world, right at this century. We just want to be free. We don't know why they do this to us, but we don't give up and I'm really thankful of you that you are here, I just ask you please, please, please be our voice, please stand with us, because we cannot do it alone.",
  },
  {
    name: "Davina",
    image: davina,
    alt: "Davina and a young woman at an ILA event",
    quote:
      "I have always given to charity and have never known where the money has gone. I feel privileged that the ILA enabled me to save at least 3 people's lives and that I have been able to meet these people. If you can give a donation to the ILA you will be playing a part in history and helping to establish a safer world for our children and grandchildren. I have found no other charity that can give its supporters so much involvement in all aspects of its work and where you can have direct contact with the recipients of your generosity.",
  },
  {
    name: "Sepideh",
    image: sepideh,
    alt: "Sepideh speaking at ILA IWD 2023",
    quote:
      "My name is Sepiedeh. I'm 27 years old and currently working as a policy advisor on foreign affairs in the Dutch parliament. I'd like to firstly thank the International Liberty Association for allowing me to represent the voice of the millions of Iranians who are standing up for their freedom.",
  },
  {
    name: "Roya",
    image: roya,
    alt: "Roya speaking at ILA IWD 2023",
    quote:
      "My name is Roya and I was born and raised in Sweden. My father fled and escaped Iran because he was politically active in his youth and when he was 16 years old he was arrested and was in prison for seven years. He saw his friends get executed and today, hearing the news of other young girls and boys getting executed by this regime reignites many emotions. All they want is to live freely as students, to walk the streets together without fear, to gain education and be able to do what they love, just as I am. On a final note, I mentioned to you where my name came from, but I didn't tell you what it means. It means 'Dream'. We and all Iranian people dream of a free, democratic and wonderful Iran and it is a dream which I am sure will soon be realised.",
  },
  {
    name: "Peter",
    image: peter,
    alt: "Peter, an ILA supporter",
    quote:
      "The injustices we witness across the world are heartbreaking and our governments' apathy is infuriating, but what has the biggest impact on me is the inspirational attitude of members of ILA especially those who have firsthand experience of the dictatorship. Their optimism and perseverance is staggering.",
  },
];

/* =========================================================
   QUOTE MARK ICON
========================================================= */

function QuoteMarkIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M0 32V19.2C0 8.533 6.4 1.6 17.067 0l2.4 4.8C11.733 6.933 8 11.2 8 17.6h9.067V32H0zm22.933 0V19.2c0-10.667 6.4-17.6 17.067-19.2l2.4 4.8c-7.734 2.133-11.467 6.4-11.467 12.8h9.067V32H22.933z" />
    </svg>
  );
}

/* =========================================================
   SCALLOPED PHOTO FRAME — the torn/dotted edge on the images
========================================================= */

function ScallopFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{ backgroundColor: BLUE }}
      className="relative w-full overflow-hidden rounded-lg p-2"
    >
      <img src={src} alt={alt} className="h-[260px] w-full object-cover sm:h-[300px]" />

      <div
        aria-hidden="true"
        className="h-4 w-full"
        style={{
          backgroundColor: BLUE,
          maskImage:
            "radial-gradient(circle at 10px 0, transparent 9px, black 10px)",
          WebkitMaskImage:
            "radial-gradient(circle at 10px 0, transparent 9px, black 10px)",
          maskSize: "20px 16px",
          WebkitMaskSize: "20px 16px",
          maskRepeat: "repeat-x",
          WebkitMaskRepeat: "repeat-x",
        }}
      />
    </div>
  );
}

/* =========================================================
   SINGLE STORY ROW (content only — stacking wrapper lives
   in the section below, matching Testimonials.tsx)
========================================================= */

function StoryRow({
  story,
  imageFromRight,
}: {
  story: (typeof stories)[number];
  imageFromRight: boolean;
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
      {/* IMAGE — entrance-then-float, direction matches its side */}
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
        className={imageOrderClass}
      >
        <ScallopFrame src={story.image} alt={story.alt} />
      </motion.div>

      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, x: imageFromRight ? -80 : 80 }}
        whileInView={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          opacity: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
          y: {
            duration: 3.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 0.9,
          },
        }}
        className={`flex flex-col justify-center ${textOrderClass}`}
      >
        <div className="mb-1 flex items-start justify-between">
          <h3 className="font-serif text-[22px] font-extrabold text-ink sm:text-[24px]">
            {story.name}:
          </h3>
          <QuoteMarkIcon className="h-7 w-9 shrink-0 text-maroon/15" />
        </div>

        <div className="mb-4 border-t border-dotted border-ink/25" />

        <p className="text-[16px] italic leading-[1.7] text-ink/75">
          &ldquo;{story.quote}&rdquo;
        </p>
      </motion.div>
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

export default function StoriesVoices() {
  return (
    <section className="relative bg-paper">
      {/* =================================================
          HEADER — same entrance animation as the
          "Who We Are" image block in Testimonials.tsx.
          Sits above the stack, same as Testimonials.tsx
          (-mb-36, z-[100], its own bg-paper) so it visually
          detaches before the sticky cards begin.
      ================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="
          relative
          z-[100]
          mx-auto
          -mb-36
          w-full
          max-w-3xl
          bg-paper
          px-5
          pt-16
          pb-12
          text-center
          sm:pt-20
          sm:pb-16
          lg:pt-24
          lg:pb-20
        "
      >
        <h1 className="font-serif text-[34px] font-extrabold leading-tight text-ink sm:text-[44px] lg:text-[52px]">
          Real People. Real Struggles. Real Change
        </h1>

        <div className="mx-auto mt-4 flex items-center justify-center gap-2">
          <span className="h-[3px] w-10 rounded-full bg-ink/20" />
          <span className="h-[3px] w-6 rounded-full bg-maroon" />
        </div>

        <p className="mt-6 text-[16px] leading-relaxed text-ink/70 sm:text-[17px]">
          At the heart of ILA are the stories of those who&rsquo;ve suffered in
          silence &mdash; and those who refuse to let that silence continue.
          These voices reflect not only the pain of oppression, but also the
          strength of community, dignity, and hope.
        </p>
      </motion.div>

      {/* =================================================
          STORY STACK — each row pinned via sticky + rising
          z-index, exactly like the testimonial stack: the
          next card scrolls up and covers the previous one.
      ================================================= */}
      <div className="relative">
        {stories.map((story, index) => (
          <div
            key={story.name}
            className="
              sticky
              top-0
              z-10
              flex
              min-h-screen
              items-center
              bg-paper
              py-20
              sm:py-28
            "
            style={{ zIndex: index + 1 }}
          >
            <StoryRow story={story} imageFromRight={index % 2 === 1} />
          </div>
        ))}
      </div>
    </section>
  );
}