import Hero from "../components/Hero";
import WhoWeAre from "../components/WhoWeAre";
import Pillars from "../components/Pillars";
import Gallery from "../components/Gallery";
import Mission from "../components/Mission";
import Shop from "../components/Shop";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Pillars />
      <Mission />
      <Gallery />
      <Shop />
      <Newsletter />
    </>
  );
}