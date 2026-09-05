import { useState , useEffect} from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Placeholder imports — swap these for your real filenames
import testimonial1 from '../assets/images/testimonial-1.png';
import testimonial2 from '../assets/images/testimonial-2.png';
import testimonial3 from '../assets/images/testimonial-3.png';
import testimonial4 from '../assets/images/testimonial-4.png';
import testimonial5 from '../assets/images/testimonial-5.png';
import testimonial6 from '../assets/images/testimonial-6.png';
import who from '../assets/images/who.png';

/* =========================================================
   DATA
========================================================= */

const testimonials = [
  {
    number: '01.',
    image: testimonial1,
    alt: 'Baroness Sandy Verma speaking at an ILA event',
    title: 'Baroness Sandy Verma',
    context: 'Conservative Peer',
    quote:
      'I think it\u2019s people like yourself sitting in this room today, the work you do, the way you raise issues, ' +
      'the way you support people, particularly people who are going through such challenging times themselves. ' +
      'I\u2019m always, always extremely grateful for organisations like the International Liberty Association, but ' +
      'particularly so I\u2019m grateful to every individual sitting here and beyond, because you are the people that ' +
      'actually enable us to do all of the work that we can do.',
  },
  {
    number: '02.',
    image: testimonial2,
    alt: 'Robert Torricelli speaking at ILA Noruz celebration 2018',
    title: 'Robert Torricelli',
    context: 'Former US Senator (Democrat) \u2014 Speaking at ILA Noruz celebration 2018',
    quote:
      'To all of you, no matter what you did, you wrote a cheque, said a prayer, went to a meeting, wrote a ' +
      'letter, let me just tell you the simple truth: you saved lives. There are thousands of people alive \u2014 ' +
      'let me be clear: it\u2019s not that they might have been dead, they would be dead. They would have died. ' +
      'No-one was coming to their rescue. And I know there\u2019ll be no plaques, I know the Press didn\u2019t stand ' +
      'outside and talk about your great work, none of you were honoured, because the Press isn\u2019t there it ' +
      'didn\u2019t happen, you just did the right thing.',
  },
  {
    number: '03.',
    image: testimonial3,
    alt: 'Baroness O\u2019Oloan speaking at ILA Christmas Event 2024',
    title: 'Baroness O\u2019Oloan',
    context: 'Speaking at ILA Christmas Event 2024',
    quote:
      'It\u2019s a privilege to stand here among you, remarkable individuals who make the work of International ' +
      'Liberty Association possible, the volunteers and the supporters. Your commitment, your compassion and ' +
      'your work, your relentless dedication to justice, have built a beacon of hope for those living under ' +
      'oppression. We must all stand together with the Iranian people and their fight for freedom. It is a ' +
      'fight for justice, democracy and peace. Thank you.',
  },
  {
    number: '04.',
    image: testimonial4,
    alt: 'Lord Steve McCabe speaking at an ILA event',
    title: 'Lord Steve McCabe',
    context: 'Labour Peer',
    quote:
      'I want to begin by thanking the International Liberty Association for putting on this wonderful event ' +
      'and for all of their hard work over the years to help the various people who have fallen foul of events ' +
      'in Iran, and the various people who\u2019ve suffered, or seen members of their family suffer at the hands ' +
      'of this regime.',
  },
  {
    number: '05.',
    image: testimonial5,
    alt: 'Dr Rowan Williams speaking at an ILA event',
    title: 'Dr Rowan Williams',
    context: 'April 2025 | 104th Archbishop of Canterbury',
    quote:
      'In the face of repression, injustice and cruelty, and very particularly the repression and cruelty that ' +
      'occurs in Iran today, the ILA continues to raise its voice on behalf of the voiceless. It makes sure ' +
      'that their sufferings are not forgotten or ignored in the wider world.',
  },
  {
    number: '06.',
    image: testimonial6,
    alt: 'Lord Tony Clarke speaking at an ILA event',
    title: 'Lord Tony Clarke',
    context: 'Former Chair of Labour Party',
    quote:
      'ILA enjoys a reputation for doing such wonderful work for human rights and opposing those tyrants who ' +
      'oppose basic human rights. I am sure that all of my colleagues would agree with me when I say: thank you ' +
      'so much, your work is so valuable, and well done.',
  },
];

/* =========================================================
   TYPEWRITER HEADING (continuous loop)

   Types out the given text character by character, pauses,
   deletes it back out, pauses again, then repeats forever.
   Used for each testimonial's name so it matches the hero
   headline's typing animation.
========================================================= */

function TypewriterHeading({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const TYPE_SPEED = 45;
    const DELETE_SPEED = 25;
    const PAUSE_FULL = 2200;
    const PAUSE_EMPTY = 600;

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText === text) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_FULL);
    } else if (isDeleting && typedText === '') {
      timeout = setTimeout(() => setIsDeleting(false), PAUSE_EMPTY);
    } else {
      timeout = setTimeout(
        () => {
          setTypedText((prev) =>
            isDeleting
              ? text.slice(0, prev.length - 1)
              : text.slice(0, prev.length + 1)
          );
        },
        isDeleting ? DELETE_SPEED : TYPE_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, text]);

  return (
    <span className={className} style={{ whiteSpace: 'pre-line' }}>
      {typedText}

      <motion.span
        aria-hidden="true"
        className="
          ml-1
          inline-block
          w-[3px]
          translate-y-[2px]
          bg-current
          align-middle
        "
        style={{ height: '0.85em' }}
        animate={{
          opacity: [1, 1, 0, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
          times: [0, 0.5, 0.5, 1],
        }}
      />
    </span>
  );
}

/* =========================================================
   QUOTE WITH "READ MORE" LINK TO ABOUT PAGE
========================================================= */

function ExpandableQuote({ quote }: { quote: string }) {
  return (
    <div>
      {/* QUOTE */}
      <p
        className="
          text-[16px]
          lato
          leading-[1.7]
          text-[#33322B]
          line-clamp-4
        "
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* READ MORE BUTTON — navigates to About page testimonials section */}
      <Link
        to="/about#testimonials"
        className="
          group
          relative
          mt-4
          inline-flex
          items-center
          gap-3
          overflow-hidden
          rounded-full
          border
          border-maroon
          bg-white
          py-2.5
          pl-5
          pr-2.5
          text-[14px]
          font-semibold
          text-maroon
          transition-all
          duration-300
          hover:text-white
        "
      >
        {/* Background animation starts from bottom */}
        <span
          className="
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

        {/* Button text */}
        <span className="relative z-10">Read more</span>

        {/* Arrow */}
        <span
          className="
            relative
            z-10
            flex
            h-7
            w-7
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
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
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
      </Link>
    </div>
  );
}

/* =========================================================
   SINGLE TESTIMONIAL ROW
========================================================= */

function TestimonialRow({
  testimonial,
  imageFromRight,
}: {
  testimonial: (typeof testimonials)[number];
  imageFromRight: boolean;
}) {
  const imageOrderClass = imageFromRight ? 'lg:order-2' : 'lg:order-1';
  const textOrderClass = imageFromRight ? 'lg:order-1' : 'lg:order-2';

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
      {/* IMAGE — fixed height so it doesn't stretch to the row,
          cropped via object-cover, then floats once settled */}
      <motion.div
        initial={{
          opacity: 0,
          x: imageFromRight ? 80 : -80,
          y: 0,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: [0, -12, 0],
        }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          y: {
            duration: 3.2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 0.8,
          },
        }}
        className={`
          h-[280px]
          overflow-hidden
          rounded-2xl
          sm:h-[340px]
          lg:h-[400px]
          ${imageOrderClass}
        `}
      >
        <img
          src={testimonial.image}
          alt={testimonial.alt}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* TEXT — same entrance-then-float treatment, opposite direction */}
      <motion.div
        initial={{
          opacity: 0,
          x: imageFromRight ? -80 : 80,
          y: 0,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: [0, -12, 0],
        }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          opacity: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
          y: {
            duration: 3.2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 0.9,
          },
        }}
        className={`
          flex
          flex-col
          justify-center
          ${textOrderClass}
        `}
      >
        <h3 className="mb-1 flex items-baseline gap-2 font-Lato text-[28px] font-extrabold leading-tight text-ink sm:text-[34px]">
          <span className="text-maroon">{testimonial.number}</span>
          <TypewriterHeading text={testimonial.title} />
        </h3>

        <p className="mb-4 text-[14.5px] text-muted-light">
          {testimonial.context}
        </p>

        <ExpandableQuote quote={testimonial.quote} />
      </motion.div>
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-paper">

      {/* =================================================
          WHO WE ARE IMAGE
      ================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          relative
          z-[100]
          mx-auto
          flex
          w-full
          -mb-36
          justify-center
          bg-paper
          px-5
          pt-16
          pb-12
          sm:pt-20
          sm:pb-16
          lg:pt-24
          lg:pb-20
        "
      >
        <img
          src={who}
          alt="Who We Are"
          className="
            block
            h-auto
            w-auto
            max-w-[260px]
            sm:max-w-[320px]
            lg:max-w-[380px]
            object-contain
            opacity-100
            visible
          "
        />
      </motion.div>

      {/* =================================================
          TESTIMONIAL STACK
      ================================================= */}
      <div className="relative">

        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.number}
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
            style={{
              zIndex: index + 1,
            }}
          >
            <TestimonialRow
              testimonial={testimonial}
              imageFromRight={index % 2 === 1}
            />
          </div>
        ))}

      </div>
    </section>
  );
}