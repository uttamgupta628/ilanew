import PageHero from "../components/PageHero";
import ContactInfo from "../components/Contactinfo";
import contactHeroImage from "../assets/images/contact_hero.png";
import Newsletter from "../components/Newsletter";

export default function Contact() {
  return (
    <div>
      <PageHero
        title="Contact Us"
        image={contactHeroImage}
        imageAlt="Wooden blocks with phone, email, and message icons"
      />
      <ContactInfo />
      <Newsletter />
    </div>
  );
}