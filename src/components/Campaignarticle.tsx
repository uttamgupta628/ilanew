import { motion, type Variants } from "framer-motion";

// Placeholder imports — replace with the actual campaign photos.
// Filenames are suggestions only; point these at your real assets.
import imgDeathPenalty from "../assets/images/campaign-death-penalty.png";
import imgAtRiskVoices from "../assets/images/campaign-at-risk-voices.png";
import imgWhatYouCanDo from "../assets/images/campaign-what-you-can-do.jpg";
import imgWomenOppression from "../assets/images/campaign-women-oppression.png";
import imgMaryam from "../assets/images/campaign-maryam-akbari.png";
import imgWidespread from "../assets/images/campaign-widespread.png";
import imgChildrenRights from "../assets/images/campaign-childrens-rights.png";

const RED = "#C8102E";

/* =========================================================
   DATA — pulled from the live campaign page
========================================================= */

type ArticleRow = {
  heading: string;
  paragraph: string;
  image: string;
  alt: string;
};

const rows: ArticleRow[] = [
  {
    heading: "The Death Penalty in Iran \u2013 A Tool of Fear, Not Justice",
    paragraph:
      "In Iran, the death penalty is wielded not as a form of justice but as a calculated tool of political repression. Rather than uphold the rule of law, the regime uses executions to silence dissent, intimidate ethnic and religious minorities, and instil fear in the population. Trials are often held in secret, with defendants denied legal representation and convicted based on forced confessions. Charges like \u201cenmity against God\u201d and \u201ccorruption on Earth\u201d are intentionally vague, allowing the state to eliminate critics at will. Children, protesters, and ordinary citizens can all become targets. This is not justice \u2014 it is state violence in its most final form.",
    image: imgDeathPenalty,
    alt: "The death penalty in Iran",
  },
  {
    heading: "At-Risk Voices \u2013 Brave Lives in the Shadow of Execution",
    paragraph:
      "Those facing execution in Iran are often peaceful individuals whose only crime is demanding freedom. Political prisoners like Sharifeh Mohammadi were arrested on vague charges and denied fair trials, condemned for their activism or associations. Many others \u2014 writers, ethnic minorities, environmentalists, and even teenagers \u2014 await execution in silence. Yet within these prisons, a quiet resistance continues. Movements like No to Execution Tuesdays, often led by the prisoners themselves, challenge the regime\u2019s brutality from within. These are not faceless cases; they are voices of defiance that call on us to act.",
    image: imgAtRiskVoices,
    alt: "At-risk voices facing execution",
  },
  {
    heading: "What You Can Do \u2013 How ILA Defends Life and How You Can Help",
    paragraph:
      "The International Liberty Association works tirelessly to defend those at risk of execution in Iran. We respond rapidly to urgent cases, launching advocacy campaigns, media alerts, and petitions to mobilise international pressure. We also support the families of prisoners, many of whom are targeted themselves, offering both moral and practical help. Through ongoing engagement with parliamentarians, NGOs, and the public, we expose injustices and push for accountability. Our rallies, conferences, and outreach efforts ensure that these prisoners are not forgotten. You can be part of this effort \u2014 to save lives and uphold the value of every human voice.",
    image: imgWhatYouCanDo,
    alt: "How ILA defends life and how you can help",
  },
  {
    heading:
      "Women in Iran face deeply rooted, institutionalised oppression that governs nearly every part of their lives",
    paragraph:
      "A vast enforcement network of 27 agencies\u2014including the notorious morality police\u2014police strict dress codes like the compulsory hijab. Women are regularly harassed, arrested, or violently punished for perceived non-compliance. Beyond appearance, legal inequalities persist in marriage, divorce, and inheritance laws, where women\u2019s voices carry less legal weight than men\u2019s. This systemic misogyny not only restricts freedoms but exposes women to daily violence and humiliation.",
    image: imgWomenOppression,
    alt: "Institutionalised oppression of women in Iran",
  },
  {
    heading: "Maryam Akbari Monfared \u2013 Free After 17 Years of Unjust Imprisonment",
    paragraph:
      "Maryam Akbari Monfared, imprisoned since 2009 for seeking justice for her executed siblings, was finally freed on April 8, 2026, after 17 years behind bars \u2014 without a single day of leave. Despite enduring solitary confinement, denial of medical care, and being separated from her children, she never stopped demanding justice. Her courage and persistence made her a symbol of resistance \u2014 and a target of a regime that fears truth-tellers. Her release is a victory for all those who refused to stay silent.",
    image: imgMaryam,
    alt: "Maryam Akbari Monfared",
  },
  {
    heading:
      "This brutality is not limited to a few high-profile cases\u2014it is widespread and deliberate",
    paragraph:
      "After the killing of Mahsa Amini in 2022, Iranian women led protests demanding freedom and dignity. The regime responded with a wave of arrests, torture, and even executions. Girls as young as school age were monitored through facial recognition, tracked via surveillance, and punished for defying dress codes. Through both violence and technology, Iran\u2019s leadership wages a war against women\u2019s autonomy\u2014and yet, the fightback continues, led by the women themselves.",
    image: imgWidespread,
    alt: "Widespread and deliberate repression",
  },
];

const childrensRights = [
  {
    title: "Child Marriage:",
    description:
      "The law allows girls to be wed at the age of 13. If she\u2019s 9, it\u2019s still allowed if a judge or the father approves.",
  },
  {
    title: "Sending Children to War:",
    description:
      "Thousands of children are sent to conflict zones. Death and paralysis are the inevitable consequences.",
  },
  {
    title: "Child Labour:",
    description: "Children suffer physical and psychological damage.",
  },
];

/* =========================================================
   DECORATIVE ICON — small bullet mark used before each
   section heading, popping in on scroll
========================================================= */

function BulletIcon() {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="mb-3 flex h-9 w-9 items-center justify-center rounded-full"
      style={{ backgroundColor: `${RED}15` }}
      aria-hidden="true"
    >
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: RED }} />
    </motion.span>
  );
}

/* =========================================================
   DIVIDER — thin accent rule between sections
========================================================= */

function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto my-14 h-px w-full max-w-xs origin-center bg-ink/10 sm:my-16"
    />
  );
}

/* =========================================================
   ARTICLE ROW — alternating image/text, entrance + gentle
   float loop, matching the site's established pattern
========================================================= */

function ArticleRowBlock({
  row,
  imageFromRight,
}: {
  row: ArticleRow;
  imageFromRight: boolean;
}) {
  const imageOrderClass = imageFromRight ? "lg:order-2" : "lg:order-1";
  const textOrderClass = imageFromRight ? "lg:order-1" : "lg:order-2";

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
      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: imageFromRight ? 80 : -80 }}
        whileInView={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          y: {
            duration: 3.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: 0.8,
          },
        }}
        className={imageOrderClass}
      >
        <div className="overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
          <img
            src={row.image}
            alt={row.alt}
            className="h-[280px] w-full object-cover sm:h-[340px]"
          />
        </div>
      </motion.div>

      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, x: imageFromRight ? -80 : 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`flex flex-col justify-center ${textOrderClass}`}
      >
        <BulletIcon />
        <h2 className="font-serif text-[24px] font-extrabold leading-snug text-ink sm:text-[28px] lg:text-[30px]">
          {row.heading}
        </h2>
        <p className="mt-4 text-[15.5px] leading-[1.75] text-ink/70 sm:text-[16px]">
          {row.paragraph}
        </p>
      </motion.div>
    </div>
  );
}

/* =========================================================
   CHILDREN'S RIGHTS CARD
========================================================= */

function ChildRightsCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      style={{ transformPerspective: 1000 }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-ink/10
        bg-white
        p-6
        shadow-[0_2px_10px_rgba(0,0,0,0.04)]
        transition-shadow
        duration-300
        hover:shadow-[0_16px_36px_rgba(200,16,46,0.14)]
      "
    >
      <span
        className="absolute inset-y-0 left-0 w-1 bg-[#C8102E] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <h3 className="text-[17px] font-extrabold text-ink">{title}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink/65">
        {description}
      </p>
    </motion.div>
  );
}

/* =========================================================
   ARTICLE
========================================================= */

export default function CampaignArticle() {
  return (
    <article className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {rows.map((row, index) => (
        <div key={row.heading}>
          <ArticleRowBlock row={row} imageFromRight={index % 2 === 1} />
          <SectionDivider />
        </div>
      ))}

      {/* =================================================
          CAMPAIGN FOR CHILDREN'S RIGHTS
      ================================================== */}
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2 className="font-serif text-[28px] font-extrabold leading-tight text-ink sm:text-[36px] lg:text-[40px]">
            Campaign for Children&rsquo;s Rights
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <span className="h-[3px] w-10 rounded-full bg-ink/20" />
            <span className="h-[3px] w-6 rounded-full" style={{ backgroundColor: RED }} />
          </div>
        </motion.div>

        <div
          style={{ perspective: 1200 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {childrensRights.map((item, index) => (
            <ChildRightsCard
              key={item.title}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:mt-12"
        >
          <img
            src={imgChildrenRights}
            alt="Campaign for Children's Rights"
            className="h-[260px] w-full object-cover sm:h-[340px]"
          />
        </motion.div>
      </div>
    </article>
  );
}