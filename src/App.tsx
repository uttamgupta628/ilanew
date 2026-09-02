import { motion, useScroll, useSpring } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhoWeAre from './components/WhoWeAre';
import Pillars from './components/Pillars';
import Gallery from './components/Gallery';
import Mission from './components/Mission';
import HowToHelp from './components/HowToHelp';
import Shop from './components/Shop';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
      aria-hidden="true"
    >
      <path d="M6.62 10.79a15.46 15.46 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.16 21 3 13.84 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
      aria-hidden="true"
    >
      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function ContactContent() {
  return (
    <div className="flex items-center gap-8 whitespace-nowrap sm:gap-12">
      <a
        href="tel:02084523481"
        className="inline-flex items-center gap-2 text-sm font-medium text-white transition-opacity hover:opacity-80 sm:text-base"
      >
        <PhoneIcon />
        <span>020 8452 3481</span>
      </a>

      <a
        href="mailto:info@iliberty.org.uk"
        className="inline-flex items-center gap-2 text-sm font-medium text-white transition-opacity hover:opacity-80 sm:text-base"
      >
        <EmailIcon />
        <span>info@iliberty.org.uk</span>
      </a>

      <span className="h-5 w-px bg-white/30" />

      <a
        href="tel:02084523481"
        className="inline-flex items-center gap-2 text-sm font-medium text-black transition-opacity hover:opacity-80 sm:text-base"
      >
        <PhoneIcon />
        <span>020 8452 3481</span>
      </a>

      <a
        href="mailto:info@iliberty.org.uk"
        className="inline-flex items-center gap-2 text-sm font-medium text-black transition-opacity hover:opacity-80 sm:text-base"
      >
        <EmailIcon />
        <span>info@iliberty.org.uk</span>
      </a>

      <span className="h-5 w-px bg-white/30" />
    </div>
  );
}

function ContactTicker() {
  return (
    <div
      className="
        relative
        z-[70]
        h-10
        w-full
        overflow-hidden
        border-b
        border-white/10
        bg-white
        sm:h-11
      "
    >
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-white to-transparent sm:w-16" />

      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-white to-transparent sm:w-16" />

      <div className="flex h-full w-max items-center">
        <div className="contact-marquee flex shrink-0 items-center">
          <ContactContent />
        </div>

        <div
          className="contact-marquee flex shrink-0 items-center"
          aria-hidden="true"
        >
          <ContactContent />
        </div>
      </div>
    </div>
  );
}

function App() {
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen">
      {/* TOP CONTACT STRIP */}
      <ContactTicker />

      {/* SCROLL PROGRESS */}
      <motion.div
        style={{ scaleX: progress }}
        className="
          fixed
          left-0
          right-0
          top-0
          z-[100]
          h-[3px]
          origin-left
          bg-gold
        "
        aria-hidden="true"
      />

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main>
        <Hero />
        <WhoWeAre />
        <Pillars />
        <Mission />
        <Gallery />
        <HowToHelp />
        <Shop />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}

export default App;