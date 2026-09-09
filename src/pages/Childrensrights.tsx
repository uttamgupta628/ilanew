import PageHero from "../components/PageHero";
import ChildrensRightsArticle from "../components/Childrensrightsarticle";
import Newsletter from "../components/Newsletter";

// The live page doesn't use a distinct hero photo behind the title (it's a
// plain header followed straight by the topic tags + first image), so this
// reuses the child-marriage photo as the hero background. Swap for a
// dedicated banner image if/when the client supplies one.
const childrensRightsHeroImage =
  "https://iliberty.org.uk/wp-content/uploads/2026/08/child-marriage-1.jpg";

export default function ChildrensRights() {
  return (
    <div>
      <PageHero
        title="Children's Rights"
        image={childrensRightsHeroImage}
        imageAlt="Campaign imagery for the Children's Rights campaign"
      />
      <ChildrensRightsArticle />
      <Newsletter />
    </div>
  );
}