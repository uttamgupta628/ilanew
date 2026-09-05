import AboutHero from "../components/AboutHero";
import AboutIntro from "../components/AboutIntro";
import Testimonials from "../components/Testimonials";
import GroupPhotoBanner from "../components/GroupPhotoBanner";
import Pillars from "../components/AboutPillars";
import CampaignHighlights from "../components/CampaignHighlights";
import AdvocacyCampaign from "../components/AdvocacyCampaign";
import Newsletter from "../components/Newsletter";

export default function About() {
  return (
    <>
      <AboutHero
        title="About Us"
        subtitle="A UK-based, volunteer-led charity working to protect dignity, strengthen communities, and build a more informed, compassionate society."
      />

      <AboutIntro />

      <Testimonials />

      <GroupPhotoBanner />
      <Pillars/>
      <CampaignHighlights />
      <AdvocacyCampaign />
      <Newsletter />

      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        {/* rest of the about page content */}
      </section>
    </>
  );
}