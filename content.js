/* =========================================================
   ALL SITE TEXT LIVES HERE. Edit this file, not the HTML.
   - Anything written as [[like this]] shows up highlighted
     on the site as a TO-DO. Replace it with real info.
   - Reorder projects by moving whole { ... } blocks.
   - Media: files live in assets/work/<id>/. The FIRST image
     is the cover (used in the hover preview).
     Video: { type: "video", src: "...mp4", caption: "..." }
     YouTube: { type: "youtube", src: "https://youtu.be/...", caption: "..." }
     Missing files show a framed placeholder with the path.
   ========================================================= */

const SITE = {
  first: "Samantha",
  last: "Angela J",
  roles: ["Creative technologist", "Interaction designer"],
  statement:
    "I turn art into something you can step inside — AR at Mexico's national art museum, paintings that come alive, and live events for 2,000 guests.",
  intro:
    "Designer, artist & engineer working where art, code and physical space meet.",
  now: "Painting, experimenting with AR and building experiences between digital and physical space.",
  email: "samantha.angela.j.business@gmail.com",
  studioInstagram: "animavena.studio",
  linkedin: "https://www.linkedin.com/in/samantha-johansson-015b07236",
  cv: "assets/cv.pdf",
  portrait: "assets/portrait.jpg",
  based: "Stockholm, Sweden and Kołobrzeg, Poland",
};

/* The big featured block on the home page, right after the intro quote.
   If the video file is missing, the poster image is shown instead. */
/* How pictures inside a project are laid out:
   "stack"   = one big picture per row (editorial)
   "masonry" = packed 3-column wall */
const GALLERY_STYLE = "stack";

const FEATURED = {
  id: "munal",
  label: "Featured project · MUNAL, Mexico City",
  line: "Visitors paint in 3D around Dr. Atl's landscapes — the museum canvas spills out into the room.",
  video: "assets/work/munal/walkthrough-web.mp4",
  poster: "assets/work/munal/walkthrough-poster.jpg",
};

const PROJECTS = [
  {
    id: "munal",
    title: "Painting beyond the frame",
    short: "MUNAL — AR",
    tag: "Creative technology · Mixed reality",
    year: "2025-26",
    meta: {
      Role: "Creative Technologist · Interaction Designer · Researcher",
      Where: "MUNAL — Museo Nacional de Arte, Mexico City",
      When: "Jan 2025 – Jan 2026",
      Team: "Independent thesis · MUNAL + CENART collaborators",
      Tools: "Unity · Meta Quest 3 · OpenBrush/TiltBrush",
    },
    brief:
      "How can a visitor step inside a painting? I designed and evaluated a mixed-reality experience where visitors paint in 3D around Dr. Atl’s landscapes, extending the museum canvas into the physical gallery.",
    did: [
      "Led the end to end design, development and evaluation of an AR painting experience, from research and prototyping to on-site workshops and user testing.",
      "Built a custom 3D painting experience in Unity and Open Brush, translating Dr. Atl’s expressive landscapes into spatial brushes and interactions",
      "Conducted on site testing at MUNAL with 12 participants, combining the Flow State Scale, UEQ, interviews and observation to evaluate immersion, usability and creative engagement.",
      "Designed the experience around active creation rather than passive augmentation, allowing visitors to reinterpret artworks through painting in the surrounding space",
    ],
    outcome: "Testing showed strong immersion, enjoyment and creative stimulation, with participants especially valuing the expressive brushes and freedom to reinterpret the artworks. Less experienced users also revealed usability challenges, highlighting the need for clearer guidance and more intuitive interactions.",
    media: [
      { src: "assets/work/munal/walkthrough-web.mp4", type: "video", caption: "Painting in 3D around Eruption of the Paricutín, seen through the headset" },
      { src: "assets/work/munal/testing.jpg", caption: "Testing the prototype in front of Clouds over the Valley of Mexico" },
      { src: "assets/work/munal/overlays.jpg", caption: "Guiding lines in the form of steps for each of the two artworks.", wide: true },
      { src: "assets/work/munal/participants.jpg", caption: "12 participants, 12 reinterpretations — what visitors painted around the artworks" },
      { src: "assets/portrait.jpg", caption: "On site at MUNAL with the headset" },
    ],
  },
  {
    id: "art",
    title: "Paintings that open their eyes",
    short: "Studio practice",
    tag: "Art · Augmented reality",
    year: "2026–now",
    meta: {
      Role: "Artist · Creative Technologist",
      Where: "Kołobrzeg, Poland",
      When: "2026 – now",
      Medium: "Acrylic on canvas · AR",
      Studio: "@animavena.studio",
    },
    brief:
      "A contemporary surrealist practice exploring cosmic and elemental themes through eyes, flames, wings, moons and reaching hands. I’m extending the paintings into AR, allowing them to move and transform when viewed through a phone.",
    did: [
      "Developed an acrylic series around cosmic and elemental themes mixed with anatomical elements such as fire, storms, volcanoes mixed with eyes, hand and hearts.",
      "Current work: an AR overlay for the flaming heart painting, where the eye opens and the fire moves (in progress).",
      "Built the animated overlay in Blender, exploring how physical paintings can become interactive without losing their material character.",
    ],
    outcome: "All Seeing Heart is scheduled to be presented at the Barcelona Contemporary Art Fair in November 2026, while the wider collection is being developed for exhibition.",
    media: [
      { src: "assets/work/art/heart-eye.jpg", caption: "All Seeing Heart — acrylic on canvas" },
      { src: "assets/work/art/ar-overlay-wip.jpg", caption: "Work in progress — the AR overlay for All Seeing Heart" },
      { src: "assets/work/art/winged-star.jpg", caption: "Cosmically Accurate Angel" },
      { src: "assets/work/art/phoenix-eyes.jpg", caption: "Inner Cosmic Transformation" },
      { src: "assets/work/art/rose-fire.jpg", caption: "Portal of Passion" },
      { src: "assets/work/art/burning-rose.jpg", caption: "Ignited Bloom" },
      { src: "assets/work/art/volcano.jpg", caption: "Earthly Emotions" },
      { src: "assets/work/art/lightning.jpg", caption: "Conscious Spark" },
      { src: "assets/work/art/hands.jpg", caption: "Heavenly Bliss" },
      { src: "assets/work/art/moons.jpg", caption: "Soul Cycles" },
      { src: "assets/work/art/tree.jpg", caption: "The Winged Tree" },
    ],
  },
  {
    id: "gumbo",
    title: "A gentle mental-health companion",
    short: "Gumbo",
    tag: "UX/UI · Digital health",
    year: "2024",
    meta: {
      Role: "UX/UI Designer & Researcher",
      Where: "Stockholm, course project at KTH",
      When: "Autumn 2024",
      Team: "Interdisciplinary Team with 4 students, where two where from Industrial Engineering and two from Media And Communications Engineering",
      Tools: "Figma · Swift · Miro · Spline",
    },
    brief: " Gumbo helps users track behavioral patterns and complete therapeutic exercises, particularly those from cognitive-behavioral therapy (CBT), as many patients struggle with structuring and staying motivated with their therapy assignments. While the mental health app market is crowded, a competitor analysis revealed several unmet needs that Gumbo is uniquely positioned to address.",
    did: [
      "Designed mood tracking, weekly progress, thought recording and mindfulness around a friendly companion character.",
      "Conducted user research through interviews, surveys and competitor analysis, translating insights into user needs and design decisions.",
      "Designed Gumbo as a friendly companion and integrated it throughout the experience to make therapeutic tasks feel more approachable and engaging.",
      "Introduced gentle gamification through progress tracking and streaks to encourage consistency without making therapy feel demanding.",
    ],
    outcome: "Testing revealed that the interface contrast felt too harsh and the mood-tracking flow was too restrictive. We softened the visual contrast and redesigned mood tracking to better reflect the complexity of users’ emotions.",
    media: [
      { src: "assets/work/gumbo/home.jpg", caption: "Home screen — the week at a glance after testing" },
      { src: "assets/work/gumbo/02.png", caption: "Gumbo character sheet and colour palette" },
      { src: "assets/work/gumbo/03.png", caption: "First set of frames — the full app flow" },
    ],
  },
  {
    id: "production",
    title: "Nights for two thousand people",
    short: "Live experiences",
    tag: "Experience production · Spatial design",
    year: "2021–23",
    meta: {
      Role: "Project Manager · Event Producer",
      Where: "Stockholm · incl. Münchenbryggeriet",
      When: "2020 – 2023",
      Team: "Cross functional production teams variying from 4 to 10 in its core group",
      Scale: "2,000+ guests · 10 venues · 3 lounges",
    },
    brief:
      "Three large-scale productions for KTH’s student community: Stockholm’s largest student festival Kravallen, a 120 year Student Union jubilee across 10+ venues, and the largest white tie three course dinner in the Nordics for a 30 year Jubilee of the Industrial Engineering and Management School.",
    did: [
      "Festival Kravallen (2023): led the design and operation of three lounge areas for 2,000+ guests, coordinating atmosphere, functionality, food and bar operations with a dedicated lounge team.",
      "Jubilee (2022): project managed logistics, strategic planning, stakeholder coordination and implementation for a 1,000+ person celebration spanning 10+ venues.",
      "White Tie Jubilee (2021): shaped the visual experience of a 1,000+ guest formal dinner at Münchenbryggeriet through décor, floral design, stage setup and overall ambience.",
    ],
    outcome: "Three large scale events delivered across complex teams, venues and audiences, from intimate spatial details to operations for 2,000+ guests.",
    media: [
      { src: "assets/work/production/kravallen-lights.jpg", caption: "Kravallen — light show inside the venue" },
      { src: "assets/work/production/white-tie.jpg", caption: "White Tie — the dinner hall set for 1,000+ guests at Münchenbryggeriet", wide: true },
      { src: "https://youtu.be/tGLEgdk1otQ?si=8bh8b5Cqn-0UT4xT", type: "youtube", caption: "Kravallen festival — the night in motion", wide: true },
      { src: "assets/work/production/white-tie-crowd.jpg", caption: "White Tie — the full hall during dinner" },
      { src: "assets/work/production/kravallen-stage.jpg", caption: "Kravallen — the main stage and crowd" },
      { src: "assets/work/production/white-tie-band.jpg", caption: "White Tie — live band on stage" },
      { src: "assets/work/production/jubilee-hall.jpg", caption: "THS 120 Jubilee — the main celebration hall" },
      { src: "assets/work/production/white-tie-party.jpg", caption: "White Tie — confetti and fireworks after dinner" },
    ],
  },
  {
    id: "breteau",
    title: "Learning, drawn from the field",
    short: "Breteau Foundation",
    tag: "Interaction design · Field research",
    year: "2023",
    meta: {
      Role: "Interaction Designer · UX Researcher",
      Where: "León, Guanajuato, Mexico",
      When: "Jan – May 2023",
      Team: "3 person research team",
      Method: "Field study · User research",
    },
    brief:
      "How should digital learning tools be designed for children in rural primary schools? Through field research in Guanajuato, we developed an interaction design framework grounded in the needs of students, teachers and schools, rather than assumptions.",
    did: [
      "Conducted field research in two rural primary schools near León, observing how children interacted with existing educational apps.",
      "Ran and analysed 24 usability tests with students aged 6–12, followed by semi structured interviews with students, teachers and principals.",
      "Translated the findings into an interaction design framework for educational tools, focused on clear feedback, intuitive graphics, appropriate difficulty and adaptability.",
    ],
    outcome: "The research resulted in a practical design framework for EdTech tools in rural primary schools. Findings highlighted clear feedback, intuitive graphics, adaptable difficulty and user flexibility as key design principles, while Wi-Fi, power supply and staffing emerged as major barriers to implementation.",
    media: [
      { src: "assets/work/breteau/classroom.jpg", caption: "Introducing the study in a rural primary school near León" },
      { src: "assets/work/breteau/app-testing.jpg", caption: "A student testing an educational app during a usability session" },
      { src: "assets/work/breteau/games.png", caption: "Two of the educational apps tested with students — Pet Bingo and King of Math Jr." },
    ],
  },

];

/* Pinned on the studio wall (About section). Drag them around. */
const WALL = [
  { img: "assets/portrait.jpg", caption: "me, at MUNAL", x: 0.03, y: 0.0, r: -4, w: 0.3, pos: "50% 88%" },
  { img: "assets/work/munal/testing.jpg", caption: "AR testing at MUNAL", x: 0.97, y: 0.0, r: 3, w: 0.3, pos: "50% 45%" },
  { note: "now", x: 0.5, y: 0.42, mx: 0.02, my: 0.5, r: 2 },
  { img: "assets/work/production/kravallen-lights.jpg", caption: "Kravallen festival", x: 0.02, y: 0.98, r: 3, w: 0.3 },
  { img: "assets/work/art/heart-eye.jpg", caption: "All Seeing Heart", x: 0.97, y: 0.98, r: -3, w: 0.28, pos: "50% 40%" },
  { note: "places", x: 0.52, y: 1, mx: 0.98, my: 0.5, r: -2 },
];

const SKILLS = {
  "Creative tech": ["Unity", "Blender", "AR / MR", "Creative coding", "Prototyping"],
  Design: ["Interaction design", "UX/UI", "User Research", "Spatial design"],
  Production: ["Experience production", "Project management", "Stakeholder coordination", "Live events"],
  Art: ["Painting", "Mixed media", "Interactive art", "Visual storytelling"],
};

const LANGUAGES = "Swedish · English · Spanish · Polish";
