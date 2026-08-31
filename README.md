# International Liberty Association — Homepage Redesign

Vite + React + TypeScript + Tailwind CSS, with Framer Motion animations.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Images

Your photos are now wired in directly from `src/assets/images/`. Here's how
they were used:

| Filename                    | Used in         | Where it appears                                  |
|------------------------------|------------------|-----------------------------------------------------|
| `hero-main.jpg`               | `Hero.tsx`       | Large framed photo, top right of hero (Justice/Dignity/Freedom banner) |
| `hero-accent.jpg`             | `Hero.tsx`       | Smaller overlapping photo (community volunteers)   |
| `campaign-executions.jpg`     | `Pillars.tsx`    | "Stopping Executions" panel (vigil poster)          |
| `campaign-survivors.jpg`      | `Pillars.tsx`    | "Helping Survivors Rebuild" panel (support session) |
| `gallery-protest.jpg`         | `Gallery.tsx`    | "Mass demonstrations" — new "In Action" section     |
| `gallery-vigil.jpg`           | `Gallery.tsx`    | "Vigils for the fallen"                             |
| `gallery-panel.jpg`           | `Gallery.tsx`    | "Voices from the community"                         |
| `help-donate.jpg`             | `content.ts`     | "Donate" card in How To Help                        |
| `help-legacy.jpg`             | `content.ts`     | "Leave a legacy gift" card                          |
| `help-partner.jpg`            | `content.ts`     | "Partner with us" card                              |
| `help-memory.jpg`             | `content.ts`     | "Give in memory" card                               |
| `shop-rug-1.jpg`, `shop-rug-2.jpg` | `content.ts` | Shop products — still placeholders, no rug photo was supplied |

A new **"In Action" gallery section** (`Gallery.tsx`) was added between the
Campaigns panels and the Mission section to make room for the protest, vigil,
and panel-discussion photos you provided — there wasn't an existing slot for
them, and they were too strong to leave out.

## Swapping images later

Drop a new file into `src/assets/images/` with the **same filename** and it
updates automatically — no code changes needed. If you get real product
photos for the two Persian rugs, save them as `shop-rug-1.jpg` and
`shop-rug-2.jpg` to replace the placeholders.
