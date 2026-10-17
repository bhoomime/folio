/* ------------------------------------------------------------------
   All site content lives here. Edit text, swap images, reorder projects.
   Images are self-hosted. Full-size originals sit in /media-src (not
   deployed); `python tools/prepare_media.py` writes 512/1024/2048-wide WebP
   copies to assets/media/. Refer to an image by name with its original
   size, im('kheyt-cover', 2859, 1482, alt), and `fx(name, size)` picks the
   smallest copy that covers `size`. A path or URL is used as-is.
------------------------------------------------------------------- */
const MEDIA = 'assets/media/';
const WIDTHS = [512, 1024, 2048];
const NATIVE = {}; // name -> original width, filled in by im()
const fx = (id, size) => {
  if (/[/.]/.test(id)) return id;
  const want = Math.min(size || Infinity, NATIVE[id] || Infinity);
  return `${MEDIA}${id}-${WIDTHS.find((s) => s >= want) || WIDTHS[WIDTHS.length - 1]}.webp`;
};
const im = (id, w, h, alt = '') => ((NATIVE[id] = w), { id, w, h, alt });

const SITE = {
  name: 'Bhoomie',
  fullName: 'Bhoomi Mahajan',
  role: 'Product designer',
  pillars: ['Research', 'Systems', 'Visual Craft'],
  email: 'bhoomimahajan659@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bhoomimahajan/',
  resume: 'https://drive.google.com/file/d/1g5Skpg5TXKtKcjUq0BcnrFDlEavzC_07/view?usp=sharing',
  tagline: ['Before I knew what design was,', 'I was already doing it :)'],
};

const ABOUT = {
  title: 'Meet the lady behind the pixels',
  hello: 'Hi, I’m Bhoomie!',
  intro: 'I’m currently in my final year of design school. My work sits at the intersection of visual craft and system thinking.',
  outside: 'Outside of design, I paint small things, photograph whatever stops me mid-walk, and make objects with my hands for no particular reason. I think this is related to the design. I’m not entirely sure how yet.',
  notes: [
    { title: 'What keeps me doing this', body: 'Design, for me, is spontaneity. A space for exploration and creativity, where ideas evolve instead of being forced.', doodle: 'sparkle' },
    { title: 'Where I’m at right now', body: 'Still early, still learning, but actively working on projects, my thinking, and getting more intentional with every iteration.', doodle: 'sprout' },
    { title: 'When I’m not designing', body: 'Usually exploring random ideas, redesigning things that annoy me, or going down inspiration rabbit holes that sometimes turn into projects.', doodle: 'spiral' },
  ],
  polaroids: [
    { img: im('polaroid-sketch', 1111, 1600, 'Pencil sketch of a person playing guitar'), cap: 'Sketching feels nice', date: '12 Jul 2024' },
    { img: im('polaroid-butterfly', 1280, 889, 'Digital illustration of a butterfly'), cap: 'My first digital illustration', date: '1 Jul 2024' },
    { img: im('polaroid-hello', 443, 579, 'Bhoomie smiling'), cap: 'Nice to meet you ♡', date: '16 Feb 2026' },
    { img: im('polaroid-tents', 1450, 846, 'Tents under a starry night sky'), cap: 'I like to capture things.', date: '3 Oct 2025' },
    { img: im('polaroid-cat', 953, 1280, 'A cat sitting by a wall'), cap: 'I like cats a lot :)', date: '12 Jul 2024' },
    { img: im('polaroid-selfie', 443, 575, 'Selfie of Bhoomie'), cap: 'It’s me, hi ♡', date: '12 Mar 2026' },
  ],
};

/* Section blocks:  { title, body: [paragraphs], images: [im(...)], layout: 'row' | 'phones' | 'wide' } */
const PROJECTS = [
  {
    slug: 'mthd', title: 'MTHD', year: '2026', doodle: 'lipstick',
    short: 'A phygital AI system that gives beauty users a memory of their own skin journey.',
    tags: ['Beauty', 'AI experience design'],
    cover: im('mthd-cover', 1920, 1044, 'MTHD wordmark over a soft blue texture'),
    lede: 'A phygital system that gives Indian beauty consumers a memory of their own skin journey, for the first time.',
    summary: 'An AI-powered phygital beauty retail system that builds a persistent skin profile, from in-store scan to mobile app, so the right shade is never forgotten again.',
    meta: { Contribution: 'Solo project', Duration: '2026 · 4 weeks', Industry: 'Beauty retail · AI experience design' },
    hero: im('mthd-hero', 1840, 694, 'MTHD brand collage'),
    sections: [
      { title: 'Where this started', body: [
        'This project began with a personal frustration. I’d find a shade that worked at a beauty store, go home and completely lose track of what it was or why it worked. Millions of Indian consumers hit this same wall daily. It’s not a personal quirk, it’s a systemic failure in how beauty retail is designed, costing confidence and money every time.',
        'Three things make this domain worth designing for: the problem is invisible to brands (they measure revenue, not regret), the fix needs both physical and digital (neither alone works), and India’s skin tone diversity and climate variation make the stakes higher here than almost anywhere else.'] },
      { title: 'Understanding the problem', body: [
        'You walk into a beauty store not knowing your shade. You try three matches, one works, you go home. Next visit, you start from zero: the shade, the finish, the reason it worked is gone. This isn’t an occasional accident; it’s the default experience for millions of Indian beauty consumers, and it’s a memory problem, not a product one.'],
        images: [im('mthd-problem', 711, 694, 'Problem framing')], layout: 'row', narrow: true },
      { title: 'Research & discovery', body: [
        'The research spanned 12 user interviews, 7 store observations (AEIOU structured), 1 influencer interview, 5 store staff interviews, and a visual photo quiz conducted in-store. Methods included one-to-one semi-structured interviews, pattern mapping, affinity clustering, and journey mapping.',
        'The real gap wasn’t product recommendation, it was expertise disappearing the moment a customer leaves the counter. The store doesn’t know what you were looking for the moment you walk back in.'],
        images: [im('mthd-research-1', 430, 695, 'Store visit in Chandigarh: a beauty advisor at a makeup counter shows a customer shade swatches'), im('mthd-research-2', 430, 695, 'Observing a shopper trying products in a busy Chandigarh beauty store'), im('mthd-research-3', 430, 695, 'A lipstick tester held up over trays of shades')], layout: 'row' },
      { title: 'Insights', images: [im('mthd-insights', 1920, 1502, 'Research insights board')], layout: 'wide' },
      { title: 'Design decisions', body: [
        'The MTHD identity is deliberately restrained: a muted rose-grey palette and clean typography (bold sans for the wordmark, neutral sans for all interface text). It feels closer to skincare packaging than a typical beauty retail app. This was intentional: an AI system making confident skin recommendations cannot afford to look excitable. The aesthetic has to match the claim. Precision demands restraint.'] },
      { title: 'Kiosk screens', images: [im('mthd-kiosk-1', 594, 785, 'MTHD kiosk on a tablet: a live face scan with suggested foundation shades'), im('mthd-kiosk-2', 587, 785, 'MTHD kiosk mapping points across a face during a skin scan'), im('mthd-kiosk-3', 587, 785, 'MTHD kiosk result: a matched foundation with a buy-now button')], layout: 'phones' },
      { title: 'Mobile screens', images: [im('mthd-mobile-1', 496, 527, 'MTHD app home, “Every skin tells a story”, with routine categories and recommendations'), im('mthd-mobile-2', 598, 785, 'MTHD app home screen on a sculpted stand'), im('mthd-mobile-3', 1792, 2356, 'MTHD app skin profile with saved good shades and recommended products'), im('mthd-mobile-4', 597, 785, 'MTHD app skin profile, second view')], layout: 'phones' },
      { title: 'The MTHD store', images: [im('mthd-store', 1840, 966, 'MTHD store render')], layout: 'wide' },
      { title: 'Outcome & reflection', body: [
        'The opportunity in “phygital” is that the word gets used loosely, but designing for the threshold where physical and digital experiences disappear into each other was the real challenge. The system now carries a persistent skin profile from kiosk to mobile, so expertise doesn’t reset every visit.',
        'This project started with a feeling and ended with an AI system. That journey, from an observed frustration to a designed solution, taught me more about design practice than any brief I have worked from before. I went in expecting to find a problem with AI product recommendation. I found that. But the more interesting finding, the one that became the solution, was about memory.'] },
    ],
    quote: 'I could have defined this problem as: Indian consumers find shade matching difficult. That is true but narrow, and already partially solved. Defining it instead as: the store experience has no memory, opened up a much larger design space.',
    learning: 'The most important thing I learned about research: you have to stay in the field long enough for the patterns to surprise you.',
  },
  {
    slug: 'kheyt', title: 'Kheyt', year: '2026', doodle: 'wheat',
    short: 'A supply chain redesigned from the field, not the screen.',
    tags: ['Service design', 'Rural India'],
    cover: im('kheyt-cover', 2859, 1482, 'Kheyt logo over a green farm field'),
    coverAlt: im('kheyt-cover-alt', 2859, 1482),
    lede: 'A contract farming platform rebuilding trust between farmers and buyers.',
    summary: 'Kheyt is a phygital supply system that connects farmers directly with local restaurants through pre-agreed crop contracts.',
    meta: { Contribution: 'Research, branding, UI/UX design', Duration: '2026 · 4 weeks', Industry: 'Farming' },
    hero: im('kheyt-cover-alt', 2859, 1482, 'Kheyt logo over a green farm field'),
    sections: [
      { title: 'Understanding the problem', body: [
        'Farmers sign supply agreements with restaurants and buyers, but once the contract is signed, communication collapses. There’s no delivery transparency, no harvest-readiness signal for buyers, and no shared record when the two sides disagree, just competing paper logs and phone calls.'] },
      { title: 'Research & discovery', body: [
        'Contextual interviews with farmers in rural areas surfaced the real risk window: the gap between harvest and buyer confirmation, when the work is done but there’s zero visibility into what happens next.',
        'Competitive analysis showed most agritech apps design for urban buyers first, leaving farmer-facing sides as an afterthought, despite low literacy and intermittent connectivity being the norm, not the edge case.'],
        images: [im('kheyt-research-1', 484, 466, 'Interviewing a farmer in his field with paper prototypes'), im('kheyt-research-2', 484, 466, 'Reviewing printed screens with a farmer in a wheat field'), im('kheyt-research-3', 564, 544, 'A farmer’s hands pulling spring onions from the soil')], layout: 'row' },
      { title: 'Design decisions', body: [
        'The visual language stays deliberately minimal: clean white surfaces, green as the sole action colour, chosen for its universal “confirmed / safe” meaning that reduces cognitive load during stressful harvesting conditions. A low-electricity village kiosk keeps the system usable where infrastructure can’t be assumed.'] },
      { title: 'Brand identity', images: [im('kheyt-brand', 2798, 1482, 'Kheyt brand identity')], layout: 'wide' },
      { title: 'Mobile screens', images: [im('kheyt-mobile-1', 474, 1026, 'Kheyt home: an upcoming beetroot delivery, past deliveries and a contract snapshot'), im('kheyt-mobile-2', 474, 1026, 'Kheyt welcome screen with log-in and sign-up buttons'), im('kheyt-mobile-3', 474, 1026, 'Kheyt “Request new contract” screen: a grid of crops with prices per kilo')], layout: 'phones' },
      { title: '3D models: low-electricity storage & village kiosk', images: [im('kheyt-models-1', 2304, 1336, '3D model of the low-electricity brick storage unit under a sloped roof'), im('kheyt-models-2', 929, 1336, '3D model of the village kiosk: a wooden stand holding a tilted touchscreen')], layout: 'row' },
      { title: 'Low-literacy kiosk', images: [im('kheyt-kiosk', 2203, 1239, 'Kiosk interface')], layout: 'wide' },
      { title: 'Outcome & reflection', body: [
        'By surfacing delivery data, contract progress, and payment signals in one app, both farmers and buyers gained the shared context needed to operate without middlemen absorbing the trust premium.'] },
    ],
    quote: 'In low-literacy contexts, hierarchy matters more than information density. Stripping back to one primary action per screen was the decision that changed everything.',
    learning: 'If I revisited this project, a voice-first mode, where farmers ask about delivery status by speaking, would be the next meaningful feature. The reading barrier is real; removing it entirely is the natural next step.',
  },
  {
    slug: 'intact', title: 'Intact', year: '2026', doodle: 'shield',
    short: 'Insurance, redesigned for the moment you actually need it.',
    tags: ['Fintech', 'Insurance UX', 'Vibe coding'],
    cover: im('intact-cover', 1860, 1000, 'A smiling family'),
    coverAlt: im('intact-cover-alt', 1860, 1000),
    lede: 'A health insurance companion app.',
    summary: 'Intact is an AI-powered health insurance platform designed to simplify the claim experience. It guides users through every step, reducing confusion during critical health moments.',
    meta: { Contribution: 'Research, branding, UI/UX design', Duration: '2026 · 2 weeks', Industry: 'InsurTech' },
    hero: im('intact-hero', 1860, 1000, 'Intact logo over a parent holding a baby'),
    sections: [
      { title: 'Understanding the problem', body: [
        'Most policyholders, even well-educated urban users, cannot confidently answer basic questions about their own coverage: what procedures are included, what the sub-limits are, or how to file a claim. The policy document is the only reference point, and almost nobody reads it.',
        'The consequence: the first meaningful interaction most people have with their insurer happens at the worst possible moment, in a hospital, stressed, needing urgent clarity on coverage.'] },
      { title: 'Research & discovery', body: [
        'Research combined diary studies with recent claimants and a broader survey of active policyholders. Diary studies tracked anxiety and confusion across the full claims journey, from diagnosis through settlement. Four peak anxiety moments emerged consistently: at diagnosis, at hospital admission, during treatment, and at partial claim settlement.',
        'The survey found that 68% of respondents had never read their policy document in full. Of those who had, fewer than a third could explain their own coverage to someone else. The most common question people wished they could get answered instantly: “Am I covered for [specific procedure]?”'], stat: { n: 68, label: 'of surveyed policyholders had never read their policy in full' } },
      { title: 'Design decisions', body: [
        'The home screen opens with a hello, a warm, direct greeting that signals this is a personal tool, not a corporate portal. Below it, “Your health cover, simplified” sets the product’s entire value proposition without jargon. Everything on this screen is designed to reduce anxiety rather than add to it.'] },
      { title: 'Brand identity', images: [im('intact-cover-alt', 1860, 1000, 'Intact brand identity')], layout: 'wide' },
      { title: 'Key screens', images: [im('intact-key-screens', 1156, 718, 'Intact app map: the home dashboard branching into policy, claims, AI assistant, hospitals, profile and documents')], layout: 'wide' },
      { title: 'Mobile screens', images: [im('intact-mobile-1', 543, 1060, 'Intact home: “Hi Sana”, a family floater plan with ₹5,00,000 cover and quick actions'), im('intact-mobile-2', 493, 1053, 'Intact home, lower half: quick actions, Ask Intact AI and an active claim’s progress'), im('intact-mobile-3', 602, 1102, 'Intact claim status: a ₹45,000 claim at Apollo Hospital, currently in review')], layout: 'phones' },
      { title: 'UI mockups', images: [im('intact-mockups-1', 865, 994, 'A hand holding a phone showing the Intact splash screen'), im('intact-mockups-2', 908, 857, 'A woman reading an Intact AI chat about her coverage on her phone')], layout: 'row' },
      { title: 'Outcome & reflection', body: [
        'By leading with coverage clarity, enabling immediate action, and offering on-demand AI-powered answers, Intact gives users agency at every stage of the insurance experience, not just at claim time.'] },
    ],
    quote: 'An app that a policyholder opens three times a year just to check their coverage is active is doing meaningful work: it’s preventing the shock of discovering at a hospital that they didn’t understand their policy.',
    learning: 'The next design challenge is the claims status screen. Surfacing the right level of transparency about claim processing, without creating anxiety through excessive procedural detail, is a delicate balance, and one that deserves as much research as the home screen received.',
  },
  {
    slug: 'morphea', title: 'Morphea', year: '2025', doodle: 'ticket',
    short: 'What happens when an event goes live and the plan doesn’t survive it.',
    tags: ['Omnichannel', 'B2B', 'Event platforms'],
    cover: im('morphea-cover', 1920, 1080, 'Morphea logo over an excited crowd'),
    coverAlt: im('morphea-cover-alt', 1920, 1080),
    lede: 'An omnichannel event management system.',
    summary: 'Morphea streamlines events into seamless, connected experiences, offering features that reduce chaos, improve coordination and deliver value for organisers, sponsors, vendors and attendees.',
    meta: { Contribution: 'Research, branding, UI/UX and AR/VR design', Duration: '2025 · 4 weeks', Industry: 'Event technology' },
    hero: im('morphea-cover', 1920, 1080, 'Morphea logo over an excited crowd'),
    sections: [
      { title: 'Understanding the problem', body: [
        'At cultural events, vendors know how many items they’ve sold but have no idea whether crowd density is building towards their section, whether a competing stall is drawing their traffic away, or whether peak hours have already passed.',
        'Event organisers face the inverse problem: they coordinate dozens of vendors but have no unified view of foot traffic. Communication happens through fragmented WhatsApp chains that create noise and miss urgent signals.'] },
      { title: 'Research & discovery', body: [
        'We observed vendors and organisers at two large melas and two urban cultural festivals. The most striking finding: every critical operational decision was made reactively. Vendors waiting for evidence of a problem before acting had already lost the window to respond.',
        'Interviews revealed a clear hierarchy of information needs: first, where are customers right now; second, how has attendance trended over the day; third, who do I contact if something goes wrong. These three needs became the three core modules of the Morphea app.'] },
      { title: 'Design decisions', body: [
        'The interface is built on a pure black canvas, a deliberate choice over dark grey. At full-brightness outdoor phone settings, pure black creates the crispest contrast for the event name card and data modules. The wordmark uses Futura for its geometric authority; Lato handles all data labels and interface text for legibility at small sizes outdoors.'] },
      { title: 'Brand identity', images: [im('morphea-brand', 1920, 787, 'Morphea brand identity')], layout: 'wide' },
      { title: 'Mobile screens', images: [im('morphea-mobile-1', 390, 845, 'Morphea vendor portal: a live crowd heatmap and attendance trends'), im('morphea-mobile-2', 390, 845, 'Morphea volunteer view: assigned incidents with in-progress, resolved and accept actions'), im('morphea-mobile-3', 390, 844, 'Morphea vendor stall screen: stall location, item requests and the organiser’s contact')], layout: 'phones' },
      { title: 'Mockups & AR/VR experience', images: [im('morphea-mockups-1', 485, 455, 'Black Morphea core-team box printed with blue dancer illustrations'), im('morphea-mockups-2', 274, 438, 'A staff member wearing a Morphea lanyard working at a vendor table during a cultural event'), im('morphea-mockups-3', 445, 453, 'AR view of a 3D monument model rising out of an event map')], layout: 'row' },
      { title: 'Outcome & reflection', body: [
        'With a crowd heatmap and attendance trend visible at a glance, vendors could make staffing and restocking calls before queues formed rather than after. The shared platform also reduced organiser-to-vendor communication overhead.'] },
    ],
    quote: 'Data density on mobile is a trap. Early wireframes tried to show too many metrics at once. Ruthless prioritisation (heatmap first, trend second, demographics third) made the app feel like a tool rather than a report.',
    learning: 'The natural next step: push notifications tied to heatmap thresholds (“Your section is reaching capacity, consider redirecting to Gate B”) would make the app proactive rather than passive.',
  },
  {
    slug: 'kalaghar', title: 'Kalaghar', year: '2025', doodle: 'pot',
    short: 'Designing a community space that serves the artisan, not the observer.',
    tags: ['Service design', 'Cultural preservation'],
    cover: im('kalaghar-cover', 1876, 1055, 'Artisans at work on looms'),
    coverAlt: im('kalaghar-cover-alt', 1876, 1055),
    lede: 'A roaming craft marketplace and workshop platform.',
    summary: 'Celebrating living heritage: exploring ways to discover underrated Indian artists and connect them with audiences, to strengthen culture and the creative economy.',
    meta: { Contribution: 'Research, branding, UI/UX design', Duration: '2025 · 4 weeks', Industry: 'Cultural commerce' },
    hero: im('kalaghar-cover', 1876, 1055, 'Artisans at work on looms'),
    sections: [
      { title: 'Understanding the problem', body: [
        'Artisans produce work of extraordinary quality but have no trusted digital channel.',
        'Buyers who discover craft online frequently describe wanting to watch the making process, not just own the product. This unmet desire pointed toward a hybrid model: an online platform paired with a physical presence that travels to where buyers already are.'],
        images: [im('kalaghar-banner', 1920, 454, 'Kalaghar banner')], layout: 'wide' },
      { title: 'Research & discovery', body: [
        'Buyer research centred on people who had previously purchased handmade goods at craft fairs. Online-only craft purchases felt riskier by comparison.',
        'Artisan interviews surfaced a different set of concerns. They didn’t want to manage a shop. They cared about two things: being represented with dignity, and a fair cut without platform middlemen taking the bulk of the margin.'],
        images: [im('kalaghar-research-1', 1280, 960, 'A potter’s workshop: stacked clay plates on a shelf above the wheel'), im('kalaghar-research-2', 960, 1280, 'An artisan’s hand with yellow tape wrapped around the fingertips'), im('kalaghar-research-3', 960, 1280, 'A craftsman stitching leather juttis on the floor of his workshop'), im('kalaghar-research-4', 1200, 1600, 'Hands holding a red embroidered phulkari textile')], layout: 'row' },
      { title: 'Service blueprint', images: [im('kalaghar-blueprint', 1920, 1080, 'Service blueprint')], layout: 'wide' },
      { title: 'Design decisions', body: [
        'The visual identity centres on warmth and texture. The hero image, a potter shaping clay on a wheel, does more work than any headline: it communicates materiality, skill, and time in a single frame. The palette pulls from earth tones that echo the materials artisans work with, creating continuity between the interface and the products displayed within it.'] },
      { title: 'Web screens', images: [im('kalaghar-web', 1920, 1080, 'Kalaghar website on three laptops: artisan stories, van locations and the product shop')], layout: 'wide' },
      { title: 'Low-literacy mobile screens', images: [im('kalaghar-mobile', 1920, 1080, 'Kalaghar low-literacy mobile screens with voice-note uploads, beside an artisan and her child')], layout: 'wide' },
      { title: 'The Kalaghar van & pamphlets', images: [im('kalaghar-van', 1362, 732, 'Kalaghar van'), im('kalaghar-pamphlets', 1920, 1124, 'Pamphlets')], layout: 'row' },
      { title: 'Outcome & reflection', body: [
        'Kalaghar built a coherent bridge between craft discovery online and craft experience in person. The van’s location schedule created an event-driven reason for repeat visits, while the shop and filter system made browsing purposeful rather than overwhelming.'] },
    ],
    quote: 'Kalaghar’s home page invests heavily in narrative before it offers a transaction, and that sequencing reflects how buyers actually build confidence in craft purchases.',
    learning: 'A future iteration would embed artisan video profiles directly into product listings, letting buyers see the maker at work before they buy, closing the gap between discovery and experience without requiring a van visit.',
  },
];

const PLAYGROUND = {
  title: 'The Archive',
  intro: 'Experimental designs and side projects crafted to push boundaries for emerging ventures.',
  items: [
    { img: im('archive-spotify-poster', 1190, 1684, 'Spotify poster') },
    { video: 'assets/media/archive-motion-1.mp4', w: 16, h: 9 },
    { img: im('archive-hobbit-door', 1280, 904, 'Round hobbit door in a hill') },
    { img: im('archive-moon', 1280, 889, 'Illustration of a crescent moon in clouds') },
    { video: 'assets/media/archive-motion-2.mp4', w: 9, h: 16 },
    { img: im('archive-forest-hut', 889, 1280, 'Painting of a hut in a forest') },
    { img: im('archive-swimwear-banner', 1443, 692, 'Swimwear campaign banner') },
    { img: im('archive-serum', 2048, 2080, 'Serum bottle product shot') },
    { video: 'assets/media/archive-motion-3.mp4', w: 1, h: 1 },
    { img: im('archive-poster-mockup', 1920, 1167, 'Poster mockup on a slatted wall') },
    { img: im('archive-black-box', 505, 488, 'Black packaging box') },
    { img: im('polaroid-butterfly', 1280, 889, 'Butterfly illustration') },
    { img: im('archive-morphea-poster', 961, 1161, 'Morphea poster') },
    { img: im('archive-sweater', 2752, 1536, 'Embroidered green sweater') },
    { img: im('polaroid-cat', 953, 1280, 'Cat photograph') },
    { video: 'assets/media/archive-motion-4.mp4', w: 1, h: 1 },
  ],
};
