import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'w-5 h-5 stroke-gold-bright shrink-0',
};

export const ShieldIcon = () => (
  <svg {...base}>
    <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
  </svg>
);

export const SignalIcon = () => (
  <svg {...base}>
    <path d="M4 10a12 12 0 0116 0M7 13.5a8 8 0 0110 0M10 17a4 4 0 014 0" />
    <circle cx="12" cy="20" r="1" />
  </svg>
);

export const CandleIcon = () => (
  <svg {...base}>
    <path d="M12 3v18M6 7h4M14 7h4M4 18h16" />
    <circle cx="8" cy="7" r="4.2" strokeDasharray="2 3" />
  </svg>
);

export const ScaleIcon = () => (
  <svg {...base}>
    <path d="M12 3v3M4 8l4-2 4 2 4-2 4 2M8 8v6a4 4 0 01-4 0M20 8v6a4 4 0 01-4 0M12 6v15" />
  </svg>
);

export const PeopleIcon = () => (
  <svg {...base}>
    <circle cx="8" cy="9" r="3" />
    <circle cx="16" cy="9" r="3" />
    <path d="M2 20c0-3 2.7-5 6-5s6 2 6 5M10 20c0-3 2.7-5 6-5s6 2 6 5" />
  </svg>
);

export const iconMap = {
  shield: ShieldIcon,
  signal: SignalIcon,
  candle: CandleIcon,
  scale: ScaleIcon,
  people: PeopleIcon,
};
