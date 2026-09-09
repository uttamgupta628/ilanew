import PageHero from "../components/PageHero";
import CampaignArticle from "../components/Campaignarticle";
import Newsletter from "../components/Newsletter";
import campaignHeroImage from "../assets/images/stopping-executions-hero.png";

export default function StoppingExecutions() {
  return (
    <div>
      <PageHero
        title="Stopping Executions. Defending the Vulnerable"
        image={campaignHeroImage}
        imageAlt="Campaign imagery for the Stopping Executions campaign"
      />
      <CampaignArticle />
      <Newsletter />
    </div>
  );
}