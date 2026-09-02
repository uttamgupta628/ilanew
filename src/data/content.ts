import helpDonate from '../assets/images/help-donate.jpg';
import helpLegacy from '../assets/images/help-legacy.jpg';
import helpPartner from '../assets/images/help-partner.jpg';
import helpMemory from '../assets/images/help-memory.jpg';
import shopRug1 from '../assets/images/image.png';
import shopRug2 from '../assets/images/image.png';
import galleryProtest from '../assets/images/gallery-protest.jpg';
import galleryVigil from '../assets/images/gallery-vigil.jpg';
import galleryPanel from '../assets/images/gallery-panel.jpg';

export const founderLede =
  'ILA was started by people who lived through what we now campaign against — which is why our casework and our advocacy sit under one roof.';

export interface StatItem {
  n: string;
  l: string;
}

export interface MissionItem {
  title: string;
  body: string;
  icon: 'shield' | 'signal' | 'candle' | 'scale' | 'people';
}

export interface HelpCard {
  title: string;
  body: string;
  cta: string;
  href: string;
  img: string;
}

export interface ShopItem {
  title: string;
  desc: string;
  price: string;
  img: string;
  href: string;
}

export const stats: StatItem[] = [
  { n: '50+', l: 'Digital skills sessions a year' },
  { n: '40', l: 'Youth leadership participants weekly' },
  { n: '60+', l: 'Online community meetings a year' },
];

export const missionItems: MissionItem[] = [
  {
    title: 'Resilience, Citizenship, Prevention',
    body: 'Targeted youth programmes focusing on resilience-building, civic responsibility, and prevention of Islamic radicalisation.',
    icon: 'shield',
  },
  {
    title: 'Justice & Awareness',
    body: 'International advocacy campaigns to stop executions, lobby policymakers, and raise public awareness of Human Rights abuses.',
    icon: 'scale',
  },
  {
    title: 'Digital Empowerment & Integration',
    body: 'Weekly digital skills workshops and community support sessions that help over 50 participants gain confidence, access services, and navigate daily life with independence and dignity.',
    icon: 'signal',
  },
  {
    title: 'Equality & Rights Advocacy',
    body: 'Campaigning and educational outreach to promote the rights of women, children, and minority communities—challenging discrimination, raising awareness, and fostering a more just and inclusive society.',
    icon: 'people',
  },
  {
    title: 'Massacre Survivor Support',
    body: 'Support for survivors of the 1988 massacre, providing witness coordination, testimony facilitation, and case documentation.',
    icon: 'candle',
  },
];

export const helpCards: HelpCard[] = [
  {
    title: 'Donate',
    body: 'Fuel our programmes and help more people rebuild their lives.',
    cta: 'Donate',
    href: 'https://iliberty.org.uk/donate-2/',
    img: helpDonate,
  },
  {
    title: 'Leave a legacy gift',
    body: 'To sustain our work for future generations.',
    cta: 'Leave gift',
    href: 'https://iliberty.org.uk/leave-a-legacy/',
    img: helpLegacy,
  },
  {
    title: 'Partner with us',
    body: 'Fuel our programmes and help more people rebuild their lives.',
    cta: 'Be a partner',
    href: 'https://iliberty.org.uk/partnerships/',
    img: helpPartner,
  },
  {
    title: 'Give in memory',
    body: 'Fuel our programmes and help more people rebuild their lives.',
    cta: 'Donate',
    href: 'https://iliberty.org.uk/donate-2/',
    img: helpMemory,
  },
];

export interface GalleryItem {
  title: string;
  body: string;
  img: string;
}

export const galleryItems: GalleryItem[] = [
  {
    title: 'Mass demonstrations',
    body: 'Thousands join our public actions to demand justice and press for change.',
    img: galleryProtest,
  },
  {
    title: 'Vigils for the fallen',
    body: 'Candlelit tributes remember those killed for standing up for their rights.',
    img: galleryVigil,
  },
  {
    title: 'Voices from the community',
    body: 'Panel discussions bring survivors and advocates together to be heard.',
    img: galleryPanel,
  },
];

export const shopItems: ShopItem[] = [
  {
    title: 'Sarouki Persian Rug',
    desc: '152cm × 103cm — handmade in Markazi Province, Central Iran',
    price: '£250.00',
    img: shopRug1,
    href: 'https://international-liberty-association.myshopify.com/products/sarouki-persian-rug',
  },
  {
    title: 'Isfahan Persian Rug',
    desc: '165cm × 110cm — handmade in Isfahan Province, Iran',
    price: '£1,200.00',
    img: shopRug2,
    href: 'https://international-liberty-association.myshopify.com/products/isfahan-persian-rug',
  },
];
