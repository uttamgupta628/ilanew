import PageHero from "../components/PageHero";
import StoriesVoices from "../components/StoriesVoices";
import storiesHeroImage from "../assets/images/story.png";
import Newsletter from "../components/Newsletter";

export default function Stories() {
  return (
    <div>
      <PageHero
        title="Stories & Voices"
        image={storiesHeroImage}
        imageAlt="ILA volunteers and supporters at the London Interfaith Fun Run"
      />
      <StoriesVoices />
      <Newsletter />
    </div>
  );
}