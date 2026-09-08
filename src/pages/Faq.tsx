import PageHero from "../components/PageHero";
import FAQList from "../components/Faqlist";
import faqHeroImage from "../assets/images/F&Q.png";

export default function FAQ() {
  return (
    <div>
      <PageHero
        title="FAQ"
        image={faqHeroImage}
        imageAlt="A large question mark and coin-like shapes on a dark blue background"
      />
      <FAQList />
    </div>
  );
}