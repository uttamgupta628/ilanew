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

function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <div id="top">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gold origin-left z-[60]"
        aria-hidden="true"
      />
      <Navbar />
      <main>
        <Hero />
        <WhoWeAre />
        <Pillars />
        <Gallery />
        <Mission />
        <HowToHelp />
        <Shop />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
