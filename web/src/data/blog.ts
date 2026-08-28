// Blog content. Cover images are placeholders (Unsplash) for topics we don't yet have
// real project photography for — swap for real photos the same way the Portfolio images
// were swapped in. The Rudrani Silks post already uses a real project photo.

import rudraniLounge from '../assets/portfolio/rudrani-lounge.jpg'

export type BlogSection = {
  heading: string
  paragraphs: string[]
}

export type BlogPost = {
  slug: string
  title: string
  category: string
  excerpt: string
  date: string
  readTime: string
  author: string
  cover: string
  sections: BlogSection[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'modular-kitchen-trends-2026',
    title: 'Top Modular Kitchen Trends to Watch in 2026',
    category: 'Kitchens',
    excerpt:
      'A look at the finishes, layouts and smart storage solutions defining modern Indian kitchens this year.',
    date: '2026-07-14',
    readTime: '5 min read',
    author: 'VELQORASPACES Studio',
    cover:
      'https://images.unsplash.com/photo-1714860534425-7ce04e013dec?q=80&w=1600&auto=format&fit=crop',
    sections: [
      {
        heading: 'Handleless, Not Featureless',
        paragraphs: [
          'Push-to-open shutters and integrated finger-pull channels have quietly become the default rather than the upgrade. The appeal isn’t just visual — a handleless kitchen is easier to wipe down, catches less dust, and reads as calmer in smaller footprints where every extra line adds visual noise.',
        ],
      },
      {
        heading: 'Two-Tone Palettes',
        paragraphs: [
          'Full white or full wood kitchens are giving way to considered pairings — a matte olive or charcoal base with warm wood-textured wall units, or vice versa. Two-tone schemes let a kitchen feel bespoke without the cost of custom colour-matching every surface.',
        ],
      },
      {
        heading: 'Smart Storage First',
        paragraphs: [
          'Corner carousels, pull-out larders, and dedicated appliance garages aren’t novelties anymore — they’re the first thing we plan for, before finishes are even discussed. A kitchen that hides its clutter well will always look more expensive than one that just looks good on day one.',
        ],
      },
      {
        heading: 'Quiet Luxury Materials',
        paragraphs: [
          'Engineered quartz continues to win over granite for countertops — consistent veining, better stain resistance, and a wider colour range. Combined with soft-close hardware throughout, the goal is a kitchen that feels considered in ways you notice only after living with it for a month.',
          'The common thread across all of this: none of it is about following a trend for its own sake. It’s about a kitchen that still works, and still looks right, five years from now.',
        ],
      },
    ],
  },
  {
    slug: 'plan-the-perfect-home-theater',
    title: 'How to Plan the Perfect Home Theater',
    category: 'Home Theaters',
    excerpt: 'Acoustics, seating and lighting — the three decisions that make or break a home cinema room.',
    date: '2026-06-22',
    readTime: '6 min read',
    author: 'VELQORASPACES Studio',
    cover:
      'https://images.unsplash.com/photo-1724061409979-420a38c25bcc?q=80&w=1600&auto=format&fit=crop',
    sections: [
      {
        heading: 'Start With the Room, Not the Screen',
        paragraphs: [
          'The most common mistake is choosing a screen size before the room is planned. Seating distance, viewing angle and room proportions should decide the screen — not the other way around. A room that’s too narrow for its screen will always feel off, no matter how good the projector is.',
        ],
      },
      {
        heading: 'Acoustics Before Aesthetics',
        paragraphs: [
          'Fabric wall panels, thick carpeting, and properly sealed doors do more for a home theater’s experience than any amount of decor. We treat acoustic planning as a structural decision, made before finishes are chosen — because retrofitting sound treatment into a finished room is expensive and rarely as effective.',
        ],
      },
      {
        heading: 'Layered, Dimmable Lighting',
        paragraphs: [
          'Bias lighting behind the screen reduces eye strain during long sessions, while low cove lighting along the floor keeps the room usable without breaking the mood. Everything should be on a dimmer, and nothing should point directly at the screen.',
        ],
      },
      {
        heading: 'Comfort Is the Point',
        paragraphs: [
          'Recliner seating with proper sightlines to every seat, cupholders within reach, and enough space to get up without disturbing the row — these details matter more than a marginally better sound system. A home theater succeeds when people actually want to spend two hours in it.',
        ],
      },
    ],
  },
  {
    slug: 'custom-carpentry-vs-ready-made-furniture',
    title: 'Custom Carpentry vs Ready-Made Furniture: What’s Right for You?',
    category: 'Carpentry',
    excerpt: 'When built-in joinery earns its cost — and when it doesn’t.',
    date: '2026-05-30',
    readTime: '4 min read',
    author: 'VELQORASPACES Studio',
    cover:
      'https://images.unsplash.com/photo-1672137233327-37b0c1049e77?q=80&w=1600&auto=format&fit=crop',
    sections: [
      {
        heading: 'The Case for Custom',
        paragraphs: [
          'Awkward alcoves, sloped ceilings, and non-standard room dimensions are where custom carpentry earns its cost — a built-in wardrobe can use every inch of an irregular space in a way no factory unit ever will. It also means a consistent finish across your entire home, since everything is built to the same specification.',
        ],
      },
      {
        heading: 'The Case for Ready-Made',
        paragraphs: [
          'If you’re working with a standard room, a tighter timeline, or you know you’ll move again in a few years, ready-made furniture is honestly the more sensible choice. It’s faster, often more budget-friendly upfront, and travels with you.',
        ],
      },
      {
        heading: 'Where We Land',
        paragraphs: [
          'Most of the homes we work on end up somewhere in between — custom carpentry for the pieces that define a room’s function (wardrobes, kitchen cabinetry, TV units built into a wall), and considered ready-made or semi-custom pieces for furniture that’s meant to be lived with and moved around, like sofas and dining chairs.',
          'The honest answer to “custom or ready-made” is rarely one or the other — it’s knowing which pieces in your home actually need to be custom.',
        ],
      },
    ],
  },
  {
    slug: 'lessons-from-rudrani-silks-showroom',
    title: 'Designing Retail Interiors That Convert: Lessons from the Rudrani Silks Showroom',
    category: 'Commercial',
    excerpt:
      'What a saree showroom fit-out taught us about pace, sightlines and brand storytelling in retail design.',
    date: '2026-08-10',
    readTime: '7 min read',
    author: 'VELQORASPACES Studio',
    cover: rudraniLounge,
    sections: [
      {
        heading: 'Slow the Customer Down',
        paragraphs: [
          'Retail design has one job before anything else: make people want to stay. At Rudrani Silks, we built arched display niches and dedicated seating clusters around the floor instead of one long counter — it breaks the space into moments, and gives customers a reason to linger at each one rather than move straight through.',
        ],
      },
      {
        heading: 'Let the Product Be the Hero',
        paragraphs: [
          'A deep green-and-gold palette runs through the cabinetry and seating, but it’s deliberately restrained — the walls and lighting are designed to make the sarees the brightest thing in the room, not compete with them. Warm, even lighting was prioritised over dramatic spotlighting, since colour accuracy matters more than drama when the product itself is the display.',
        ],
      },
      {
        heading: 'Brand at Every Touchpoint',
        paragraphs: [
          'The lotus motif from the Rudrani Silks identity appears on the display cabinetry, the wall panels and the signage wall — small, repeated, never loud. Consistency like this is what makes a space feel designed rather than decorated, and it’s something we build into a project from the very first concept sketch, not layered on at the end.',
        ],
      },
      {
        heading: 'The Practical Payoff',
        paragraphs: [
          'None of this is decoration for its own sake. A showroom that gives customers somewhere to sit, product that’s well lit, and a layout that doesn’t funnel everyone past the same three racks — that’s a floor plan that supports the sales staff instead of working against them. Good commercial design should be judged on how a business actually runs inside it, not just how it photographs.',
        ],
      },
    ],
  },
  {
    slug: 'small-apartment-design-mistakes',
    title: '5 Mistakes to Avoid When Designing a Small Apartment',
    category: 'Residential',
    excerpt: 'Small doesn’t have to mean cramped — if you avoid these common planning mistakes.',
    date: '2026-04-18',
    readTime: '5 min read',
    author: 'VELQORASPACES Studio',
    cover:
      'https://images.unsplash.com/photo-1745429523617-0d837856ca35?q=80&w=1600&auto=format&fit=crop',
    sections: [
      {
        heading: '1. Buying Furniture Before the Layout',
        paragraphs: [
          'The single most common mistake we see: furniture bought first, floor plan figured out after. In a small apartment, every piece needs to earn its footprint — that decision should come from a scaled layout, not a showroom visit.',
        ],
      },
      {
        heading: '2. Ignoring Vertical Storage',
        paragraphs: [
          'Floor space is precious in a small apartment; wall space usually isn’t. Tall, narrow storage — full-height wardrobes, wall-mounted shelving above eye level — holds as much as bulky floor units without eating into the room you actually walk through.',
        ],
      },
      {
        heading: '3. Too Many Accent Colours',
        paragraphs: [
          'A small room can carry one bold colour well. Two or three competing accents fragment the space visually and make it read as smaller and busier than it is. Pick one moment to be bold, and let everything else support it.',
        ],
      },
      {
        heading: '4. Blocking Natural Light With Heavy Drapes',
        paragraphs: [
          'Heavy curtains in a small room shrink it further, even when they’re open. Sheer or light-filtering fabrics, or well-fitted blinds, keep the sense of space intact while still giving you privacy and light control.',
        ],
      },
      {
        heading: '5. Skipping a Lighting Plan',
        paragraphs: [
          'One central ceiling light does a small room no favours. Layered lighting — ambient, task, and a little accent — makes a compact space feel considered rather than cramped, and it’s one of the cheapest upgrades relative to the difference it makes.',
        ],
      },
    ],
  },
  {
    slug: 'commercial-fit-out-guide-for-business-owners',
    title: 'A Business Owner’s Guide to Commercial Interior Fit-Outs',
    category: 'Commercial',
    excerpt:
      'Budgeting, timelines and the questions to ask before you sign a design contract for your office or showroom.',
    date: '2026-03-05',
    readTime: '6 min read',
    author: 'VELQORASPACES Studio',
    cover:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop',
    sections: [
      {
        heading: 'Set the Budget Range First',
        paragraphs: [
          'Before any design conversation, decide a realistic budget band and share it with your studio honestly. Vague budgets lead to design concepts that get reworked from scratch once real costs come in — an honest number upfront saves everyone time, including yours.',
        ],
      },
      {
        heading: 'Understand the Timeline Realistically',
        paragraphs: [
          'A commercial fit-out — design, approvals, civil work, furniture, and snagging — is rarely a four-week job, even for a modest showroom. Ask for a phase-by-phase timeline in writing, and build in buffer for approvals and material lead times that are outside your studio’s direct control.',
        ],
      },
      {
        heading: 'Ask About Single-Point Accountability',
        paragraphs: [
          'One of the most useful questions you can ask a prospective studio: “if something goes wrong on-site, who do I call?” If the answer involves three different vendors and no clear owner, expect delays and finger-pointing. A single accountable project lead is worth more than a marginally lower quote.',
        ],
      },
      {
        heading: 'Plan for Downtime',
        paragraphs: [
          'If the space is currently operating — an existing office or store — factor in how much of the fit-out can happen without shutting down, and how much genuinely can’t. A studio that plans phasing around your business staying open is doing you a real favour, even if it adds a little time to the schedule.',
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
