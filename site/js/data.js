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

/* ------------------------------------------------------------------
   Case studies. Each one reads top to bottom:
     lede, meta, summary          the facts and the one-line story
     glance { problem, solution } the overview, side by side
     features [{ title, body, img, fit? }]  "what it does", three cards
     chapters [{ nav, title, lede?, blocks }]
   nav is the short name in the contents list; title is the takeaway.
   Blocks (t:)  p · list · stats · findings · quotes · persona · question
                steps · images · columns · palette · tree · changes · more · link
   Text may use <b> and one <mark> (the highlighter) for the phrase that matters.
   Writing rules: plain words, short sentences, explain any term the first time.
------------------------------------------------------------------- */
const PROJECTS = [
  {
    slug: 'mthd', title: 'MTHD', year: '2026', doodle: 'lipstick',
    short: 'A beauty store that remembers your skin, from the mirror to your phone.',
    tags: ['Beauty', 'AI experience design'],
    cover: im('mthd-cover', 1920, 1044, 'MTHD wordmark over a soft blue texture'),
    hero: im('mthd-hero', 1840, 694, 'MTHD brand collage'),
    lede: 'A smart mirror in the store and an app at home that share one skin profile, so the shade that matched you is never lost.',
    summary: 'Most beauty shoppers find their shade in a store and lose it by the time they get home. MTHD gives them a skin profile that follows them from the store mirror to their phone, so the right shade is never forgotten again.',
    meta: [['Role', 'Solo project: research, service design and UI'], ['Timeline', '2026 · 4 weeks'], ['Field', 'Beauty retail and AI']],
    glance: {
      problem: 'Shoppers try foundations in a store, find one that works, and leave without it. At home they can’t remember the name or the shade, buy a lookalike online, and it’s wrong. <mark>The store forgets everything the moment they walk out.</mark>',
      solution: '<b>Skin Story</b>: a full-height smart mirror that scans your skin and records what you try, linked to an app that picks up exactly where the store visit ended, with the right shade already selected.',
    },
    featuresTitle: 'Three ways the store remembers you',
    features: [
      { title: 'It reads your skin, not your guess', body: 'An AI skin scan in the mirror finds your undertone and shade, so you don’t have to describe your own skin.', img: im('mthd-kiosk-photo', 1122, 1402, 'A shopper using the Skin Story mirror kiosk in an MTHD store'), fit: 'cover' },
      { title: 'It keeps track of what you try', body: 'Tap each product on the scanner and it’s saved to your visit, side by side with the others you tested.', img: im('mthd-kiosk-1', 594, 785, 'MTHD kiosk on a tablet: a live face scan with suggested foundation shades') },
      { title: 'It carries on at home', body: 'Scan a QR code and the whole visit moves to the app, with the advisor’s note and your shade already picked.', img: im('mthd-mobile-3', 1792, 2356, 'MTHD app skin profile with saved good shades and recommended products') },
    ],
    chapters: [
      { nav: 'Where it started', title: 'It started with a shade I couldn’t remember', blocks: [
        { t: 'p', lead: true, text: [
          'This project began with a frustration I kept seeing around me: finding something that works in a beauty store, going home, and completely losing track of what it was, what shade it was, and why it was right.',
          'I pulled on that thread and found something much bigger. It isn’t a personal quirk. It’s a <mark>failure in how beauty retail is designed</mark>, and it costs Indian shoppers confidence and money every day.'] },
        { t: 'steps', title: 'A shopping trip that goes wrong', items: [
          { title: 'In the store', body: 'You walk in not knowing what you want. A staff member helps you try three foundations. One feels right: the shade matches, the finish suits your skin, the texture works. It took twenty minutes to get there.' },
          { title: 'You leave without it', body: 'Maybe it’s cheaper online. Maybe you want to think about it. Maybe you just need a moment.' },
          { title: 'At home', body: 'You open Nykaa. You can’t remember the name, so you search and pick something that looks similar. The reviews are good. You buy it.' },
          { title: 'It arrives', body: 'It’s wrong. The shade is off and the finish is different. It joins the other wrong products on the shelf.' }] },
        { t: 'p', text: ['This isn’t an occasional accident. It’s the default experience for millions of Indian beauty shoppers, and it’s a <mark>memory problem, not a product problem</mark>.'] },
      ] },
      { nav: 'The market', title: 'A booming market that keeps selling people the wrong thing', blocks: [
        { t: 'stats', items: [{ pre: '$', n: 28, unit: 'B', label: 'projected size of India’s beauty and personal care market by 2030, one of the fastest growing in the world' }] },
        { t: 'p', text: [
          'The growth comes from young, digitally connected shoppers who experiment with products, follow influencers and spend a lot on skincare and makeup.',
          'But underneath the growth, the system is broken. Shoppers are <mark>overwhelmed by choice, unsupported in their decisions, and keep buying the wrong products</mark>. The market is booming while the buying experience fails the very people driving it.'] },
        { t: 'list', title: 'Why this is worth designing for', items: [
          '<b>Brands can’t see it.</b> They measure revenue, not regret.',
          '<b>It needs both the store and the screen.</b> Neither can fix it alone.',
          '<b>Indian skin raises the stakes.</b> A wide range of skin tones, a varied climate and social pressure around shade make it harder here than almost anywhere else.'] },
      ] },
      { nav: 'Research', title: 'I went where the decisions happen: the store floor', blocks: [
        { t: 'stats', items: [
          { n: 12, label: 'shoppers interviewed' }, { n: 7, label: 'stores observed' }, { n: 5, label: 'store staff interviewed' },
          { n: 1, label: 'beauty influencer interviewed' }, { n: 1, label: 'photo quiz run in a store' }] },
        { t: 'p', text: [
          'In seven stores I watched how people shop, noting what they did, the space, who they spoke to, what they picked up and who they were. I interviewed shoppers one to one, ran a photo quiz on the shop floor, then grouped everything I heard into patterns and mapped the journey from start to finish.',
          'The real gap wasn’t product recommendation. It was <mark>expertise disappearing the moment a shopper leaves the counter</mark>. When you walk back in, the store has no idea what you were looking for.'] },
        { t: 'images', layout: 'row', images: [im('mthd-research-1', 430, 695, 'Store visit in Chandigarh: a beauty advisor at a makeup counter shows a customer shade swatches'), im('mthd-research-2', 430, 695, 'Observing a shopper trying products in a busy Chandigarh beauty store'), im('mthd-research-3', 430, 695, 'A lipstick tester held up over trays of shades')],
          cap: 'Store visits in Chandigarh: an advisor showing shades, a shopper testing products, the tester trays.' },
      ] },
      { nav: 'Insights', title: 'The store has no memory', lede: 'Five things the research kept showing me.', blocks: [
        { t: 'findings', items: [
          { title: 'The store forgets you', body: 'Everything a shopper discovers in store (the right shade, the product they tested, the advisor’s advice) disappears the moment they walk out. The store and the screen are completely disconnected.' },
          { title: 'People can’t judge their own skin', body: 'Every quiz, app and recommendation tool starts by asking shoppers to describe their skin. But how people see their skin and how it actually behaves are two different things.' },
          { title: 'Shade is social, not just technical', body: 'Mismatched shades aren’t only caused by bad tools. Social pressure plays a part: shoppers consistently choose shades lighter than their actual skin tone.' },
          { title: 'Shoppers already do their homework', body: 'They aren’t passive or uninformed. One shopper checked ChatGPT, Google, YouTube, Nykaa, friends and in-store testers before a single purchase. Nothing connects those sources.' },
          { title: 'The experts’ knowledge vanishes', body: 'Every store had knowledgeable staff, but their advice was never recorded or passed on. The moment the shopper left, it became invisible.' }] },
        { t: 'more', summary: 'See the patterns behind these insights', blocks: [
          { t: 'list', numbered: true, items: [
            'Physical stores pay for the whole decision (staff, space, testers) without getting the sale.',
            'Personalisation in Indian beauty usually means dry, oily or combination skin, a split so broad it’s almost useless.',
            'Shade matching is the most technically complex, emotionally loaded and commercially important unsolved problem in Indian beauty retail.',
            'No single source of beauty advice is fully trusted, so shoppers piece decisions together from several unreliable ones and still feel unsure after buying.'] },
          { t: 'images', layout: 'wide', images: [im('mthd-insights', 1920, 1502, 'Research insights board')], cap: 'My research board.' }] },
      ] },
      { nav: 'The problem', title: 'Nothing carries over from the store', blocks: [
        { t: 'question', label: 'the problem, in one line', text: 'Shoppers have no way to carry what they discover in a store into their online shopping.', note: 'Not the products they tested, the shade that matched, the advisor’s advice or how products compared. So they buy the wrong thing, waste money and lose confidence, in a cycle the industry treats as normal. It’s a design problem, and it can be solved.' },
        { t: 'stats', title: 'Why this is the right problem', items: [
          { pre: '₹', n: '50,000+', label: 'wasted per shopper over a lifetime on products that don’t suit them' },
          { n: 90, unit: '%', label: 'of people who browse in a store leave without buying' }],
          note: 'It also explains why returns are higher when shoppers skip advice, and why staff expertise keeps disappearing. And it’s a gap technology can bridge.' },
        { t: 'question', label: 'the question I set out to answer', text: 'How might we design a seamless handoff between discovering in the store and buying online?' },
      ] },
      { nav: 'The idea', title: 'Skin Story: one skin profile, in the store and at home', blocks: [
        { t: 'p', lead: true, text: ['Skin Story is a smart mirror system for beauty stores. It remembers everything a shopper discovers during a visit (what they tested, how products compared, which shade matched and what the advisor recommended) and hands it to an app that continues the journey at home.'] },
        { t: 'columns', items: [
          { title: 'In the store', body: 'A full-height smart mirror with an AI skin scanner, a product scanner, a side-by-side comparison screen and a handover to staff.' },
          { title: 'At home', body: 'An app that receives the whole visit, explains its recommendation, keeps the advisor’s note and lets you buy in one tap, with the shade already chosen.' },
          { title: 'The bridge', tone: 'key', body: 'The real idea isn’t the mirror or the app. It’s the <b>Skin Story profile</b> that lives in both, grows smarter with every visit, and gives shoppers something beauty retail never has: <mark>a memory of their own skin</mark> they can take anywhere.' }] },
        { t: 'persona', role: 'who I designed for', name: 'Ananya Sharma', img: im('mthd-persona', 494, 659, 'Portrait of Ananya, smiling with her hands on her face'), facts: ['23 years old', 'Design student', 'Chandigarh'],
          bio: 'Ananya is deeply interested in beauty and skincare but struggles to find products that truly suit her skin. She has a medium-depth complexion with a neutral-warm undertone, an oily T-zone and slightly sensitive eyes, so following trends or popular picks rarely works for her.' },
      ] },
      { nav: 'The journey', title: 'One shopper, from a reel to the right foundation', blocks: [
        { t: 'steps', layout: 'zig', items: [
          { title: 'Discovery', img: im('mthd-stage-1', 1024, 559, 'Storyboard: Ananya sees a Skin Story reel on her phone at home'), body: 'Ananya is scrolling Instagram when she sees a creator using the MTHD Skin Story kiosk at Nykaa. It identifies undertones and matches products instantly. She’s bought the wrong foundation before, so she taps through. The message is simple: “Stop guessing your shade. Create your Skin Story in-store.” She heads to the nearest store for a free skin scan.' },
          { title: 'In the store', img: im('mthd-stage-2', 1024, 559, 'Storyboard: an advisor welcomes Ananya at the Skin Story kiosk'), body: 'Near the entrance she finds the Skin Story kiosk. An advisor welcomes her and offers to create her profile. She enters her phone number, scans a QR code, and the kiosk asks about her skin concerns, makeup preferences and skin sensitivity.' },
          { title: 'Trying products', img: im('mthd-stage-3', 1024, 559, 'Storyboard: Ananya taps foundations on the kiosk scanner'), body: 'She picks up three foundations she’s been researching online and taps each one on the kiosk’s scanner. Instead of generic product information, she sees how each one works for her skin.' },
          { title: 'Taking it home', img: im('mthd-stage-4', 1024, 559, 'Storyboard: Ananya scans a QR code to move her visit to the app'), body: 'Her whole visit moves to the MTHD app: her new Skin Story profile, the products she tested and her recommended shade matches. Nothing is lost. The store visit carries on digitally.' },
          { title: 'Buying', img: im('mthd-stage-5', 1024, 559, 'Storyboard: that evening, Ananya buys the recommended shade in the app'), body: 'That evening she opens the app. One recommendation sits at the top: Rare Beauty foundation, shade 235W, because it matches her undertone, suits an oily T-zone and has a low risk of oxidising (darkening on the skin). The shade is already selected.' }] },
      ] },
      { nav: 'Design', title: 'Designed to feel like skincare, not a sale', blocks: [
        { t: 'p', text: [
          'The MTHD identity is deliberately restrained: a muted rose-grey palette, a bold sans-serif wordmark and a neutral sans-serif for all interface text. It feels closer to skincare packaging than a typical beauty app.',
          'That was intentional. <mark>An AI that makes confident claims about your skin can’t afford to look excitable.</mark> The look has to match the claim, and precision calls for restraint.'] },
        { t: 'images', layout: 'phones', title: 'The kiosk', images: [im('mthd-kiosk-1', 594, 785, 'MTHD kiosk on a tablet: a live face scan with suggested foundation shades'), im('mthd-kiosk-2', 587, 785, 'MTHD kiosk mapping points across a face during a skin scan'), im('mthd-kiosk-3', 587, 785, 'MTHD kiosk result: a matched foundation with a buy-now button')],
          cap: 'The kiosk: a live skin scan with suggested shades, the face mapping, and the matched foundation.' },
        { t: 'p', title: 'The kiosk in the store', text: ['A floor-standing unit with a curved matte-white body and a thin rose-coloured strip. The top two-thirds is a face-height mirror with an adjustable LED ring that can recreate daylight, office lighting, camera flash and outdoor light. The bottom third is a flush touchscreen, with a tap-to-scan product reader on the right, frosted privacy panels on either side, and a small curved desk where the advisor sits with a tablet.'] },
        { t: 'images', layout: 'wide', images: [im('mthd-store', 1840, 966, 'MTHD store render')], cap: 'The MTHD store, with the Skin Story kiosk at the counter.' },
        { t: 'images', layout: 'phones', title: 'The app', images: [im('mthd-mobile-1', 496, 527, 'MTHD app home, “Every skin tells a story”, with routine categories and recommendations'), im('mthd-mobile-2', 598, 785, 'MTHD app home screen on a sculpted stand'), im('mthd-mobile-3', 1792, 2356, 'MTHD app skin profile with saved good shades and recommended products'), im('mthd-mobile-4', 597, 785, 'MTHD app skin profile, second view')],
          cap: '“Every skin tells a story. We just help it glow.” The home screen and the skin profile.' },
      ] },
      { nav: 'Does it hold up?', title: 'People want it, stores gain from it, and it can be built today', blocks: [
        { t: 'columns', items: [
          { title: 'People want it', body: 'Shoppers in every interview described the exact problem Skin Story solves, in their own words, without prompting. Sophiya described testing and forgetting; Daisy, standing in a store unsure what to pick; Guneet, wanting a tool that truly understood her skin. Browsing in store and buying online wasn’t a conscious choice in any of the seven stores. The system gave people no alternative.' },
          { title: 'Stores gain from it', body: 'Today stores pay for the whole decision (staff, space, testers, fixtures) without getting the sale. Skin Story makes them part of a guided journey, with three direct benefits: more sales in store, fewer returns because purchases match the shopper’s real profile, and loyalty built over many visits. Brands finally see not just what sold but whether it worked, and advisors’ expertise becomes something the business can see and reward.' },
          { title: 'It can be built today', body: 'Every part already exists. AI skin analysis is mature (Perfect Corp’s YouCam engine reads skin tone in real time), tap-to-scan product tags are standard in retail, QR handovers are everywhere, and foundation brands already keep shade databases. The new part is putting them together around a person, which is a design problem, not an engineering one.' }] },
      ] },
      { nav: 'What’s next', title: 'From one store to a profile that works everywhere', blocks: [
        { t: 'steps', items: [
          { n: 'Now', title: 'Test it', body: 'Test the kiosk with five to eight shoppers to see whether they trust the undertone reading and feel comfortable with the camera. Try two versions of the app’s recommendation screen to learn how much explanation people need before they buy. Check the shade comparison with testers across Indian skin tones.' },
          { n: 'Soon', title: 'Pilot in one store', body: 'Run a four-week pilot with one retailer, ideally Nykaa or a Sephora franchise, and measure in-store sales before and after the kiosk, returns on Skin Story picks versus unassisted ones, and how many visits turn into purchases in the app.' },
          { n: 'Later', title: 'Grow the ecosystem', body: 'Bring Indian indie brands’ shade data into the recommendations, build a training and certification programme for advisors, and add skin-condition flags to the profile, so people with medical skin needs are no longer invisible.' },
          { n: 'Long term', title: 'One profile, every store', body: 'Turn Skin Story into a platform shared across retailers, so one profile works wherever you shop and gets smarter at every visit. The beauty journey becomes continuous instead of starting over.' }] },
        { t: 'p', title: 'Looking back', text: [
          'This project started with a feeling and ended with a system. Going from a frustration I noticed to a designed solution taught me more about design practice than any brief I’ve worked from.',
          '“Phygital” gets used loosely. Here it meant one specific moment: when a shopper crosses from the store to the screen and everything they discovered disappears. <mark>Designing for that threshold</mark>, rather than for the store or the app on their own, was the core challenge and the core opportunity.'] },
      ] },
    ],
    quote: 'I could have defined the problem as “Indian shoppers find shade matching difficult.” That’s true, but narrow, and already partly solved. Defining it as “the store has no memory” opened up a much larger design space.',
    learning: 'The most important thing I learned about research: you have to stay in the field long enough for the patterns to surprise you.',
  },

  {
    slug: 'kheyt', title: 'Kheyt', year: '2026', doodle: 'wheat',
    short: 'A supply chain redesigned from the field, not the screen.',
    tags: ['Service design', 'Rural India'],
    cover: im('kheyt-cover', 2859, 1482, 'Kheyt logo over a green farm field'),
    coverAlt: im('kheyt-cover-alt', 2859, 1482),
    hero: im('kheyt-cover-alt', 2859, 1482, 'Kheyt logo over a green farm field'),
    lede: 'Connecting farmers directly with the restaurants that buy their crops, through contracts agreed before the season.',
    summary: 'Kheyt connects farmers directly with local restaurants. They agree on crops, quantities and prices up front, so farmers grow to real demand and restaurants get a steady supply of fresh produce.',
    meta: [['Team', 'Bhoomi Mahajan, Manav Arora'], ['My role', 'Research, branding, UI/UX design'], ['Timeline', '2026 · 4 weeks'], ['Field', 'Agriculture and rural livelihoods']],
    glance: {
      problem: 'Farmers have nowhere to store a harvest and can’t see what buyers need, so <mark>they sell straight away, at whatever price they’re offered</mark>. Even with a deal in place, communication falls apart after signing: no delivery updates, no signal that crops are ready, and no shared record when the two sides disagree.',
      solution: 'A system in three parts: a <b>village kiosk</b> that shows live demand from restaurants, a <b>cool store that needs no electricity</b> to keep the harvest fresh, and an <b>app for restaurants</b> to agree contracts and track every delivery.',
    },
    featuresTitle: 'Three parts, one supply chain',
    features: [
      { title: 'Grow what’s already sold', body: 'A kiosk at a common point in the village shows what restaurants want and at what price, so farmers decide what to grow and how much.', img: im('kheyt-models-2', 929, 1336, '3D model of the village kiosk: a wooden stand holding a tilted touchscreen') },
      { title: 'Keep the harvest without power', body: 'A brick store with water running through pipes in its walls keeps produce cool, so farmers don’t have to sell the day they harvest.', img: im('kheyt-models-1', 2304, 1336, '3D model of the low-electricity brick storage unit under a sloped roof'), fit: 'cover' },
      { title: 'Track every crate', body: 'Restaurants request contracts, follow each delivery from harvested to packed, shipped and delivered, and raise an issue in one tap.', img: im('kheyt-app-hand', 1024, 1536, 'A hand holding a phone with the Kheyt app in a restaurant kitchen'), fit: 'cover' },
    ],
    chapters: [
      { nav: 'The problem', title: 'Farming is full of risks a farmer can’t control', blocks: [
        { t: 'p', lead: true, text: ['Farmers sign supply agreements with restaurants and buyers, but once the contract is signed, communication collapses. There’s no way to see a delivery, no signal to buyers that a crop is ready, and no shared record when the two sides disagree, just competing paper logs and phone calls.'] },
        { t: 'findings', title: 'Six problems behind every harvest', items: [
          { title: 'Produce lost after harvest', img: im('kheyt-challenge-1', 1024, 899, 'Illustration: a mud hut with sacks of potatoes spoiling outside') }, { title: 'Unpredictable weather', img: im('kheyt-challenge-2', 1024, 880, 'Illustration: cracked dry fields under a storm beside a flooded stream') }, { title: 'Too little storage', img: im('kheyt-challenge-3', 1024, 899, 'Illustration: a crumbling storage hut with produce sacks and a worried farmer') },
          { title: 'Dependence on the market', img: im('kheyt-challenge-4', 1024, 800, 'Illustration: a farmer stuck between distant markets, brokers and low prices') }, { title: 'Unequal access to technology', img: im('kheyt-challenge-5', 1024, 1024, 'Illustration: one farmer with a bullock and plough, another with a tablet and drones') }, { title: 'Income that swings', img: im('kheyt-challenge-6', 1024, 962, 'Illustration: farmers outside a hut with a sign about failed deliveries') }] },
        { t: 'steps', title: 'How we spent the four weeks', items: [
          { n: 'Week 1', title: 'Brainstorming and research' }, { n: 'Week 2', title: 'Testing our research toolkit with farmers' },
          { n: 'Week 3', title: 'Ideas' }, { n: 'Week 4', title: 'Building the system' }] },
      ] },
      { nav: 'In the field', title: 'What we saw on the farms', blocks: [
        { t: 'p', text: [
          'We spoke to farmers in their fields. Those conversations surfaced the riskiest window: <mark>the gap between harvest and a buyer’s confirmation</mark>, when the work is done but there’s no way to see what happens next.',
          'Looking at existing farming apps, we found most are designed for city buyers first. The farmer’s side is an afterthought, even though low literacy and patchy connectivity are the norm, not the exception.'] },
        { t: 'findings', title: 'What we noticed', plain: true, items: [
          { title: 'Part of every harvest is left to spoil', img: im('kheyt-field-1', 1221, 1177, 'An elderly farmer kneeling in his field over harvested vegetables') }, { title: 'Farmers share machines', img: im('kheyt-field-2', 432, 768, 'A shared harvesting machine parked under a shed') }, { title: 'Broken water pipes', img: im('kheyt-field-3', 432, 768, 'A broken irrigation pipe at the edge of a field') },
          { title: 'Snakes and bees are an everyday risk', img: im('kheyt-field-4', 432, 768, 'A farmer working bent over in a thick green field') }, { title: 'Crops are sold straight after harvest', img: im('kheyt-field-5', 432, 768, 'Hands pulling a crop from the soil') }, { title: 'Farming can be lonely', img: im('kheyt-field-6', 900, 1600, 'An elderly farmer crouching alone in his field') }] },
        { t: 'images', layout: 'row', images: [im('kheyt-research-1', 484, 466, 'Interviewing a farmer in his field with paper prototypes'), im('kheyt-research-2', 484, 466, 'Reviewing printed screens with a farmer in a wheat field'), im('kheyt-research-3', 564, 544, 'A farmer’s hands pulling spring onions from the soil')],
          cap: 'In the fields, with printed screens and paper prototypes.' },
      ] },
      { nav: 'The sorting game', title: 'We asked farmers to sort vegetables, not fill in surveys', blocks: [
        { t: 'p', text: [
          'To understand how farmers judge and handle food waste, we built a simple sorting toolkit: a box with three labelled sections, <b>for people</b>, <b>for cattle</b> and <b>for the bin</b>.',
          'Farmers were given pictures of vegetables at five stages of freshness, from fully fresh to completely rotten, and placed each one where they thought it would most likely end up.'] },
        { t: 'images', layout: 'row', images: [im('kheyt-toolkit', 1195, 896, 'The sorting toolkit: a three-section box with picture cards of a person, a cow and a bin, and vegetable cards'), im('kheyt-toolkit-mat', 904, 768, 'Vegetable cards sorted into the toolkit on a woven mat')], cap: 'The sorting toolkit, before and during a session.' },
        { t: 'images', layout: 'row', images: [im('kheyt-session-1', 432, 768, 'A farmer and a researcher going through the toolkit outside a house'), im('kheyt-session-2', 432, 768, 'A researcher showing picture cards to a farmer in a field'), im('kheyt-session-3', 432, 768, 'Two farmers sorting cards with a researcher in a field')], cap: 'Sorting sessions with farmers in Ambala, Haryana.' },
        { t: 'columns', title: 'Where the vegetables went', items: [
          { title: 'Cabbage', items: ['Fresh: for people', 'Bruised: for cattle', 'Rotten: the bin'] },
          { title: 'Tomato', items: ['Fresh: for people', 'Bruised: for cattle', 'Rotten: the bin'] },
          { title: 'Beetroot', items: ['Fresh: for people', 'Damaged: the bin'] }] },
      ] },
      { nav: 'Key problems', title: 'Three problems we chose to solve', blocks: [
        { t: 'findings', items: [
          { title: 'No cold storage', img: im('kheyt-problem-1', 1024, 1024, 'Illustration: a farmer beside spoiling tomatoes, with a storage shed far away'), body: 'Without a cool place to keep it, produce spoils.' },
          { title: 'No view of demand', img: im('kheyt-problem-2', 1024, 1024, 'Illustration: a farmer surrounded by question marks over which crop to grow'), body: 'Farmers can’t see which crops are wanted right now, or how much.' },
          { title: 'No steady income', img: im('kheyt-problem-3', 1024, 1024, 'Illustration: a worried farmer beside a market-price board full of question marks'), body: 'Earnings are unstable and hard to predict.' }] },
        { t: 'question', label: 'the question we set out to answer', text: 'How might we reduce farmers’ dependence on selling straight after harvest?' },
      ] },
      { nav: 'The idea', title: 'One story, from a city kitchen to a village field', blocks: [
        { t: 'p', text: ['We designed for two people at once: the farmer who grows the crop and the chef who cooks it. Our final sketches explored a brick storage unit, a raised structure with a water tank, and a village kiosk.'] },
        { t: 'images', layout: 'row', images: [im('kheyt-sketch-1', 1436, 1436, 'Pencil sketch of a low brick storage unit'), im('kheyt-sketch-2', 1402, 1402, 'Pencil sketch of a raised brick structure with a water tank on top'), im('kheyt-sketch-3', 1510, 1456, 'Pencil sketch of two farmers at a village kiosk')], cap: 'Final sketches: the brick store, the water-cooled structure and the kiosk.' },
        { t: 'steps', ar: '4 / 3', title: 'The journey across the system', items: [
          { title: 'The chef’s problem', img: im('kheyt-scene-1', 911, 840, 'Storyboard: Chef Raju looks at empty crates and changing prices on his phone'), body: 'Chef Raju finds his vegetable supply empty or poor quality, while market prices keep changing.' },
          { title: 'Planning ahead', img: im('kheyt-scene-2', 911, 791, 'Storyboard: Raju plans his order on an app showing weekly demand for beetroot, tomatoes and spinach'), body: 'He plans what to buy using an app that shows weekly demand for each crop.' },
          { title: 'A fair deal with farmers', img: im('kheyt-scene-3', 938, 827, 'Storyboard: Raju agrees a contract with farmers beside a cart of vegetables'), body: 'Through the platform, he agrees a contract with rural farmers for fresh produce at a fair price.' },
          { title: 'Demand on the village kiosk', img: im('kheyt-scene-4', 2931, 1432, 'Storyboard: farmers read restaurant demand on a kiosk under a village shelter'), body: 'At a common point in the village, farmers read live demand from restaurants and decide together which crop to grow.' },
          { title: 'Signing with confidence', img: im('kheyt-scene-5', 963, 845, 'Storyboard: a farmer signs a supply contract at a table'), body: 'A farmer signs a supply contract, sure there’s a city buyer for his beetroot.' },
          { title: 'Growing the crop', img: im('kheyt-scene-6', 939, 894, 'Storyboard: a farmer in a thriving beetroot field with a sign for city restaurants'), body: 'He tends a thriving beetroot field, grown for a buyer who’s already waiting.' },
          { title: 'Storing the harvest', img: im('kheyt-scene-7', 937, 909, 'Storyboard: farmers sort produce in a cool storage room'), body: 'Farmers sort and store the beetroot and tomatoes in a traditional cool room that needs no electricity.' },
          { title: 'Sharing the transport', img: im('kheyt-scene-8', 2930, 1374, 'Storyboard: farmers load crates onto a small cooperative vehicle'), body: 'At a shared collection point, farmers load fresh produce onto one small vehicle.' },
          { title: 'Fresh delivery', img: im('kheyt-scene-9', 938, 770, 'Storyboard: a driver hands a crate of tomatoes to a smiling chef'), body: 'A driver from the farmers’ cooperative hands a crate of fresh produce to a happy chef.' },
          { title: 'Confirmed and paid', img: im('kheyt-scene-10', 1024, 737, 'Storyboard: the driver and chef confirm the delivery and payment on a phone'), body: 'Both confirm the delivery and the payment on their phones, closing a contract both sides can trust.' },
          { title: 'Both sides do well', img: im('kheyt-scene-11', 940, 870, 'Storyboard: a thriving farm and a busy restaurant kitchen linked by fair, prompt payment'), body: 'A stable supply network: a thriving farm and a busy city restaurant, in balance.' }] },
      ] },
      { nav: 'The system', title: 'Built for the village first', blocks: [
        { t: 'p', title: 'The village kiosk', text: ['A physical kiosk shows live demand from buyers, so farmers can decide what to grow and how much. Each offer shows the crop, the quantity, the price per kilo and how far away the buyer is, with two big buttons: <b>take the offer</b> or <b>turn it down</b>. It’s written in the farmers’ language, with large type and a photo of each crop.'] },
        { t: 'images', layout: 'wide', images: [im('kheyt-kiosk', 2203, 1239, 'Kheyt kiosk screen in Punjabi listing onion, tomato, cucumber and capsicum offers, with buttons to take or turn down an offer')], cap: 'The kiosk screen, in Punjabi: this month’s offers from nearby restaurants.' },
        { t: 'p', title: 'The cool store', text: ['A storage room built from brick and clay that keeps produce cool without electricity, so farmers can wait for the right buyer instead of selling on the day.'] },
        { t: 'list', items: ['A wooden roof protects it from rain.', 'Wooden and concrete pillars keep it stable.', 'PVC pipes between the bricks circulate water.', 'A brick and clay base gives it strength and keeps it cool.'] },
        { t: 'images', layout: 'row', images: [im('kheyt-models-1', 2304, 1336, '3D model of the low-electricity brick storage unit under a sloped roof'), im('kheyt-models-2', 929, 1336, '3D model of the village kiosk: a wooden stand holding a tilted touchscreen')], cap: '3D models of the cool store and the village kiosk.' },
        { t: 'p', title: 'The restaurant app', text: ['Restaurant owners open the app, land on a dashboard, choose what to do and dig into the details: upcoming deliveries, past orders, a snapshot of their contracts, and a tracker that follows each crop from harvested to packed, shipped and delivered. They can download an invoice or raise an issue from the same screen.'] },
        { t: 'images', layout: 'phones', images: [im('kheyt-mobile-1', 474, 1026, 'Kheyt home: an upcoming beetroot delivery, past deliveries and a contract snapshot'), im('kheyt-mobile-2', 474, 1026, 'Kheyt welcome screen with log-in and sign-up buttons'), im('kheyt-mobile-3', 474, 1026, 'Kheyt “Request new contract” screen: a grid of crops with prices per kilo')],
          cap: 'Home, sign in, and requesting a new contract.' },
        { t: 'p', title: 'The look', text: ['The visual language stays deliberately minimal: clean white surfaces, DM Sans throughout, and green as the only action colour, chosen because green reads everywhere as <mark>“confirmed” or “safe”</mark>, which makes each decision easier in the stressful days of harvest.'] },
        { t: 'images', layout: 'wide', images: [im('kheyt-brand', 2798, 1482, 'Kheyt brand identity')], cap: 'The Kheyt identity.' },
        { t: 'images', layout: 'row', images: [im('kheyt-crate-1', 2048, 2048, 'A Kheyt crate of beetroot and radishes in a ploughed field'), im('kheyt-crate-2', 2048, 2048, 'A Kheyt crate of peppers in a ploughed field'), im('kheyt-crate-3', 2048, 2048, 'A Kheyt crate of cucumbers in a ploughed field')], cap: 'Kheyt crates, straight from the field.' },
      ] },
      { nav: 'Testing', title: 'What farmers told us when they tried it', blocks: [
        { t: 'findings', title: 'What we heard', plain: true, items: [
          { title: 'Hesitation about contracts', img: im('kheyt-feedback-1', 1024, 1024, 'Illustration: a man shows a farming contract on a tablet to doubtful farmers') }, { title: 'Doubts about relying on a card', img: im('kheyt-feedback-2', 1024, 1024, 'Illustration: farmers by a crate of beetroot, unsure about the card login on a kiosk') }, { title: 'The language was a barrier', img: im('kheyt-feedback-3', 1024, 1024, 'Illustration: farmers scratch their heads at a crop-demand kiosk') },
          { title: 'Strong interest in storage', img: im('kheyt-feedback-4', 1024, 1024, 'Illustration: a farmer explains a cold storage unit to interested villagers') }, { title: 'Open to the idea, if income is stable', img: im('kheyt-feedback-5', 1024, 1024, 'Illustration: farmers look at a contract in front of the storage unit') }, { title: 'Willing to pay for storage', img: im('kheyt-feedback-6', 1024, 1024, 'Illustration: an elderly farmer pays at a counter') }] },
        { t: 'changes', title: 'What we changed', items: [
          { heard: 'The kiosk’s language was a barrier for some farmers.', changed: 'We added regional languages, starting with Punjabi, so it’s easier for every farmer to read the offers.' },
          { heard: 'Farmers weren’t sure they could rely on a Kheyt card to log in.', changed: 'We replaced the card with a fingerprint login at the village’s digital service centre, to remove the uncertainty.', img: im('kheyt-biometric', 2048, 1144, 'Illustration: a farmer logs in with his fingerprint at a Digital Gramin Seva Kendra kiosk') }] },
        { t: 'images', layout: 'row', images: [im('kheyt-test-1', 1170, 1543, 'Testing the idea with a farmer outside his house'), im('kheyt-test-2', 1170, 1520, 'Talking a farmer through the idea on a village path'), im('kheyt-test-3', 1170, 1523, 'Testing with a farmer and his family indoors')], cap: 'Testing with farmers in Mirzapur, Punjab.' },
      ] },
      { nav: 'Business model', title: 'Who pays, who gains, and how it grows', blocks: [
        { t: 'columns', title: 'What each side gets', items: [
          { title: 'Restaurants', items: ['Stable, predictable vegetable supply', 'Produce sourced straight from farmers', 'Consistent quality', 'Fewer price swings', 'Every delivery tracked in the app'] },
          { title: 'Farmers', items: ['A buyer before the harvest', 'Less dependence on mandi middlemen', 'Predictable income and crop planning', 'Demand they can see on the village kiosk'] }] },
        { t: 'more', summary: 'See the full business model', blocks: [
          { t: 'columns', items: [
            { title: 'Who it’s for', items: ['Restaurants, cloud kitchens, cafés and small food businesses', 'Small and medium-scale farmers, farmer cooperatives and village farming communities'] },
            { title: 'How it earns', items: ['A commission on each produce sale', 'A subscription for restaurants', 'Instalments from farmers for building storage', 'Logistics and service fees', 'A fee for managing contracts', 'Premium demand insights for restaurants', 'Partnerships with food businesses and brands'] },
            { title: 'Key partners', items: ['Farmer cooperatives and local farmer groups', 'Restaurant associations and local restaurants', 'Logistics and transport providers', 'Village panchayats, for placing kiosks', 'Agricultural advisors and crop planners', 'Storage partners', 'Local field coordinators'] },
            { title: 'Main costs', items: ['Building and running the platform', 'Logistics and transport', 'Setting up and maintaining kiosks', 'Field staff and support teams', 'Storage infrastructure', 'Onboarding farmers', 'Marketing and partnerships'] }] }] },
        { t: 'steps', title: 'How it could grow', items: [
          { title: 'Start with pilots in a few villages' }, { title: 'Grow through farmer cooperatives' }, { title: 'Bring in more restaurants' },
          { title: 'Build regional collection hubs' }, { title: 'Strengthen the digital infrastructure' }, { title: 'Partner with logistics providers' }] },
      ] },
      { nav: 'Outcome', title: 'One shared record instead of competing paper logs', blocks: [
        { t: 'p', text: ['By bringing delivery updates, contract progress and payments into one app, farmers and buyers gained the shared picture they need to work together directly, <mark>without a middleman taking a cut for being the trusted go-between</mark>.'] },
      ] },
    ],
    quote: 'When reading is hard, a clear order matters more than more information. Cutting every screen down to one main action was the decision that changed everything.',
    learning: 'If I revisited this project, the next feature would be a voice-first mode, where farmers ask about a delivery by speaking. The reading barrier is real; removing it entirely is the natural next step.',
  },

  {
    slug: 'intact', title: 'Intact', year: '2026', doodle: 'shield',
    short: 'Insurance, redesigned for the moment you actually need it.',
    tags: ['Fintech', 'Insurance UX', 'Vibe coding'],
    cover: im('intact-cover', 1860, 1000, 'A smiling family'),
    coverAlt: im('intact-cover-alt', 1860, 1000),
    hero: im('intact-hero', 1860, 1000, 'Intact logo over a parent holding a baby'),
    lede: 'A health insurance app that explains your cover in plain words and walks you through every claim.',
    summary: 'Intact is an AI-powered health insurance app that makes claims simple. It guides people through every step, so there’s less confusion at the moments that matter most.',
    meta: [['Role', 'Research, branding and UI/UX design, built with AI coding tools'], ['Timeline', '2026 · 2 weeks'], ['Field', 'Health insurance']],
    glance: {
      problem: 'Most people can’t say what their health insurance covers, and almost nobody reads the policy. So their first real conversation with the insurer happens at the worst moment: <mark>in a hospital, stressed, needing answers fast</mark>.',
      solution: 'An app that explains the policy in plain language, answers “Am I covered?” instantly, fills in claim details for you, and shows where a claim is at every stage.',
    },
    featuresTitle: 'Help at the moments that matter',
    features: [
      { title: 'Ask before you worry', body: 'Ask “Am I covered for knee surgery?” and the assistant answers with your limit for the procedure, your room-rent limit and what you might pay yourself.', img: im('intact-mockups-2', 908, 857, 'A woman reading an Intact AI chat about her coverage on her phone'), fit: 'cover' },
      { title: 'Your cover, at a glance', body: 'The home screen opens with a hello and your plan in plain numbers: the plan, the cover amount and the quick actions you’ll need.', img: im('intact-mobile-1', 543, 1060, 'Intact home: “Hi Sana”, a family floater plan with ₹5,00,000 cover and quick actions') },
      { title: 'Know where your claim is', body: 'See each claim’s amount, hospital and current stage, without chasing updates by phone.', img: im('intact-mobile-3', 602, 1102, 'Intact claim status: a ₹45,000 claim at Apollo Hospital, currently in review') },
    ],
    chapters: [
      { nav: 'The problem', title: 'People meet their insurance at the worst possible moment', blocks: [
        { t: 'p', lead: true, text: [
          'Most policyholders, even well-educated city dwellers, can’t confidently answer basic questions about their own cover: which procedures are included, what the limits are, or how to file a claim. The policy document is the only reference, and almost nobody reads it.',
          'So the first meaningful contact most people have with their insurer happens in a hospital, stressed, needing urgent answers.'] },
        { t: 'stats', title: 'Why claims feel chaotic', items: [
          { n: 69, unit: '%', label: 'of claims (224 lakh in total) are handled by a third-party administrator, not the insurer (31%), so people don’t know who to call first' },
          { n: 14, label: 'calls, on average, to chase one claim, with only 1–2 updates by SMS or email' },
          { n: 50, unit: '%', label: 'of people wait 6–48 hours to leave hospital on a cashless claim, because it wasn’t routed clearly at the start' }] },
      ] },
      { nav: 'Research', title: 'Following people through a claim, start to finish', blocks: [
        { t: 'p', text: [
          'The goal was to find the main problems in the claims process: poor communication, the burden of paperwork, delays, missing transparency, and confusion about claim status and cover.',
          'The research combined diary studies with people who had recently claimed and a wider survey of active policyholders. The diaries tracked anxiety and confusion across the whole journey, from diagnosis to settlement. <mark>Four moments of peak anxiety</mark> came up again and again: at diagnosis, at hospital admission, during treatment, and when a claim was only partly paid.'] },
        { t: 'stats', items: [{ n: 68, unit: '%', label: 'of policyholders surveyed had never read their policy in full' }],
          note: 'Of those who had, fewer than a third could explain their cover to someone else. The question people most wished they could ask instantly: “Am I covered for [this procedure]?”' },
        { t: 'findings', title: 'What we learned', items: [
          { title: 'There’s no single, trustworthy place to get answers about your own policy.' },
          { title: 'Money decisions arrive without clarity or reasons.' },
          { title: 'Not seeing a claim’s progress builds distrust.' },
          { title: 'Claims happen when people are vulnerable, emotionally fragile and overloaded.' },
          { title: 'Insurance apps don’t reduce the complexity, so people keep relying on agents.' }] },
      ] },
      { nav: 'Who it’s for', title: 'A policyholder who thought she was covered', blocks: [
        { t: 'persona', role: 'persona', name: 'Sana', img: im('intact-persona', 409, 559, 'Illustration of Sana walking down a city street with a coffee'), facts: ['29 years old', 'Insured through work', 'Comfortable online'],
          quote: 'I thought everything would be covered. No one told me about these limits.',
          lists: [
            ['Background', ['Got her insurance through her employer', 'Relies on HR or an agent to understand her cover', 'Comfortable with apps, but avoids complicated systems']],
            ['What she wants', ['A quick, stress-free claim', 'To clearly understand what’s covered', 'As little paperwork and effort as possible']],
            ['What goes wrong', ['She doesn’t know which documents she needs, or what steps to follow', 'She finds out about exclusions (co-pay, room-rent limits) only during a claim', 'She gets vague updates like “under review”', 'She has to keep following up']]] },
      ] },
      { nav: 'Two journeys', title: 'Two ways a claim can go, and where each one breaks', blocks: [
        { t: 'steps', ar: '4 / 3', title: 'A cashless claim', intro: 'The hospital is in the insurer’s network, and the insurer pays the hospital directly.', items: [
          { title: 'Arriving at a network hospital', img: im('intact-cashless-1', 983, 758, 'Illustration: she arrives at City Hospital, a network hospital') }, { title: 'Asking for approval before treatment', img: im('intact-cashless-2', 501, 574, 'Illustration: at the insurance desk, she hands over her details for approval') }, { title: 'The insurer checks cover, waiting periods and conditions', img: im('intact-cashless-3', 1024, 655, 'Illustration: the administrator checks her cover, waiting periods and conditions on screen') },
          { title: 'Care begins after the first approval', img: im('intact-cashless-4', 1024, 696, 'Illustration: doctors begin treatment while the administrator follows updates') }, { title: 'Medical records and bills are prepared', img: im('intact-cashless-5', 1024, 696, 'Illustration: the final bill and medical files are prepared for submission') }, { title: 'The insurer and hospital settle the claim', img: im('intact-cashless-6', 1024, 559, 'Illustration: she receives the settlement summary at the discharge desk') }] },
        { t: 'steps', ar: '4 / 3', title: 'A reimbursement claim', intro: 'The hospital isn’t in the network, or the cashless claim fails: you pay first and claim the money back.', items: [
          { title: 'Treated at a hospital outside the network', img: im('intact-reimb-1', 1024, 559, 'Illustration: at a hospital outside the network, she is told the full bill must be paid') }, { title: 'Paying the full hospital bill', img: im('intact-reimb-2', 1024, 559, 'Illustration: she and her father go through a long checklist of documents') }, { title: 'Gathering every document the claim needs', img: im('intact-reimb-3', 481, 390, 'Illustration: at the claim submission office, stacks of papers are ready') },
          { title: 'Submitting them to the claims office or administrator', img: im('intact-reimb-4', 481, 390, 'Illustration: the administrator checks the documents against the policy') }, { title: 'The documents and the cover are checked', img: im('intact-reimb-5', 481, 390, 'Illustration: the administrator asks for more prescriptions and statements') }, { title: 'More documents and clarification are asked for', img: im('intact-reimb-6', 481, 390, 'Illustration: the claim waits on a query for more information') }] },
      ] },
      { nav: 'The gaps', title: 'Nobody can say how much is covered, or how much they’ll pay', blocks: [
        { t: 'findings', cols: 4, items: [
          { title: 'No step-by-step guidance' },
          { title: 'Scattered communication, and nobody owns it' },
          { title: 'Cover and costs aren’t understood' },
          { title: 'No clear way to track status' },
          { title: 'High stress and mental load' },
          { title: 'Money is unclear', body: 'People can’t answer “Kitna cover hua?” (how much is covered?) or “Kitna mujhe dena padega?” (how much do I have to pay?)' },
          { title: 'Bills aren’t explained', body: 'People never see which items were approved, which were rejected, and why.' },
          { title: 'Hidden deductions', body: 'Room-rent limits, non-medical items like gloves and PPE, and co-pay.' }] },
      ] },
      { nav: 'The question', title: 'Guide people step by step, so they don’t have to figure it out', blocks: [
        { t: 'question', label: 'the question I set out to answer', text: 'How might we guide people step by step through a claim, so they don’t have to figure things out at a stressful moment?' },
        { t: 'findings', title: 'Where AI could help', items: [
          { title: 'An assistant that instantly answers questions about the policy, documents and claim steps.' },
          { title: 'Approvals, rejections and deductions explained in simple language.' },
          { title: 'Step-by-step help while submitting a claim, including uploading the right documents.' },
          { title: 'Claim status visible at every stage.' },
          { title: 'An app simple enough that people don’t need an agent.' }] },
      ] },
      { nav: 'Structure', title: 'Everything one tap from home', blocks: [
        { t: 'tree', root: 'Home', branches: [
          ['Notifications', ['Claim updates', 'Reminders', 'Escalations']],
          ['Policy', ['Summary', 'Coverage', 'Exclusions', 'AI explainer']],
          ['Claims', ['Active claims', 'Start a new claim', 'Claim history', 'Claim details']],
          ['AI assistant', ['Chat', 'Am I covered?', 'Claim help', 'Simulator']],
          ['Hospitals', ['Network', 'Nearby', 'Details', 'Eligibility']],
          ['Profile', ['Personal', 'Policy', 'Family', 'Settings', 'Support']],
          ['Documents', ['Upload', 'AI scan', 'Checklist', 'History']]] },
        { t: 'images', layout: 'wide', images: [im('intact-key-screens', 1156, 718, 'Intact app map: the home dashboard branching into policy, claims, AI assistant, hospitals, profile and documents')], cap: 'The key screens, mapped from the home dashboard.' },
      ] },
      { nav: 'Design', title: 'Warm where it can be, clear where it must be', blocks: [
        { t: 'p', text: ['The home screen opens with a hello, a warm, direct greeting that says this is a personal tool, not a corporate portal. Below it, “Your health cover, simplified” sums up the whole product without jargon. Everything on the screen is designed to <mark>reduce anxiety rather than add to it</mark>.'] },
        { t: 'images', layout: 'phones', images: [im('intact-mobile-1', 543, 1060, 'Intact home: “Hi Sana”, a family floater plan with ₹5,00,000 cover and quick actions'), im('intact-mobile-2', 493, 1053, 'Intact home, lower half: quick actions, Ask Intact AI and an active claim’s progress'), im('intact-mobile-3', 602, 1102, 'Intact claim status: a ₹45,000 claim at Apollo Hospital, currently in review')],
          cap: 'Home, the assistant and an active claim, and the claim status screen.' },
        { t: 'p', title: 'The brand', text: ['The name is the promise: <b>Health, kept intact.</b> One confident blue does the heavy lifting, softened by pale blue and greys, with a single typeface, Satoshi, in three weights.'] },
        { t: 'palette', fonts: [{ name: 'Satoshi', note: 'Regular, Medium and Bold', css: 'var(--f-body)' }], colors: ['#014CF0', '#E6EEFE', '#F3F3F3', '#939393', '#1B1B1B'] },
        { t: 'images', layout: 'wide', images: [im('intact-cover-alt', 1860, 1000, 'Intact brand identity')], cap: 'The Intact identity.' },
        { t: 'images', layout: 'row', images: [im('intact-mockups-1', 865, 994, 'A hand holding a phone showing the Intact splash screen'), im('intact-claim-hand', 1024, 996, 'A hand holding a phone on the first step of filing a claim, listing network hospitals nearby'), im('intact-mockups-2', 908, 857, 'A woman reading an Intact AI chat about her coverage on her phone')], cap: 'The splash screen, filing a claim (the app finds network hospitals near you), and the assistant answering a coverage question.' },
      ] },
      { nav: 'Outcome', title: 'Clarity before the hospital, not during it', blocks: [
        { t: 'p', text: ['By leading with what the cover includes, letting people act straight away and answering questions on demand, Intact gives people control at every stage of their insurance, not just at claim time.'] },
      ] },
    ],
    quote: 'An app that a policyholder opens three times a year just to check their cover is active is doing meaningful work: it prevents the shock of discovering, in a hospital, that they didn’t understand their policy.',
    learning: 'The next design challenge is the claim status screen. Showing the right amount of detail about how a claim is processed, without creating anxiety through too many steps, is a delicate balance, and one that deserves as much research as the home screen received.',
  },

  {
    slug: 'morphea', title: 'Morphea', year: '2025', doodle: 'ticket',
    short: 'What happens when an event goes live and the plan doesn’t survive it.',
    tags: ['Event platforms', 'Service design', 'Branding'],
    cover: im('morphea-cover', 1920, 1080, 'Morphea logo over an excited crowd'),
    coverAlt: im('morphea-cover-alt', 1920, 1080),
    hero: im('morphea-cover', 1920, 1080, 'Morphea logo over an excited crowd'),
    lede: 'A system that keeps organisers, vendors, volunteers and sponsors in sync, from the first plan to the last stall.',
    summary: 'Morphea turns the chaos of running a cultural festival into one connected system, with tools for organisers, vendors, volunteers and sponsors that work on screen and on the ground.',
    meta: [['Role', 'Research, branding, UI/UX and AR/VR design'], ['Timeline', '2025 · 4 weeks'], ['Field', 'Event technology']],
    glance: {
      problem: 'At cultural festivals, teams coordinate through scattered WhatsApp chats, emails and spreadsheets. Roles are unclear, last-minute changes get lost, and <mark>problems are spotted only after they’ve happened</mark>. Vendors can’t even tell whether the crowd is heading their way.',
      solution: 'A dashboard for each role (organisers, volunteers, the core team and exhibitors), plus things you can hold that link the event floor to the app: ID cards with maps, an onboarding kit with walkie-talkies, QR tickets and posters.',
    },
    featuresTitle: 'One event, everyone on the same page',
    features: [
      { title: 'See the crowd as it moves', body: 'Vendors get a live heatmap of where people are and how attendance is changing, so they can staff up or restock before queues form.', img: im('morphea-mobile-1', 390, 845, 'Morphea vendor portal: a live crowd heatmap and attendance trends') },
      { title: 'Every problem has an owner', body: 'Volunteers see the incidents assigned to them and mark each one in progress or resolved, so organisers always know who’s handling what.', img: im('morphea-mobile-2', 390, 845, 'Morphea volunteer view: assigned incidents with in-progress, resolved and accept actions') },
      { title: 'Ready on day one', body: 'An onboarding kit with ID cards, a venue map and walkie-talkies gets volunteers, exhibitors and the core team aligned before the gates open.', img: im('morphea-mockups-2', 274, 438, 'A staff member wearing a Morphea lanyard working at a vendor table during a cultural event'), fit: 'cover' },
    ],
    chapters: [
      { nav: 'Research', title: 'Every important decision was made too late', blocks: [
        { t: 'p', lead: true, text: [
          'At cultural events, vendors know how many items they’ve sold, but not whether the crowd is building towards their section, whether a nearby stall is drawing their customers away, or whether peak hours have already passed.',
          'Organisers face the opposite problem. They coordinate dozens of vendors with no shared view of foot traffic, over WhatsApp chains that create noise and miss urgent signals.'] },
        { t: 'stats', items: [
          { n: 15, label: 'people interviewed: event organisers, staff, exhibitors and artists' },
          { n: 4, label: 'event spaces observed, including melas at Kala Gram, exhibitions, cafés and workshops' }] },
        { t: 'p', text: ['Watching vendors and organisers at work, the most striking finding was that <mark>every important decision was made after the fact</mark>. By the time a vendor had evidence of a problem, the chance to respond had already passed.'] },
        { t: 'stats', title: 'What people struggled with', items: [
          { n: 83, unit: '%', label: 'had trouble coordinating during the event' },
          { n: 58, unit: '%', label: 'struggled to get their brand seen' },
          { n: 47, unit: '%', label: 'found it hard to keep track of everyone working on the event' }] },
        { t: 'list', title: 'What people need, in order', numbered: true, items: [
          'Where are customers right now?', 'How has attendance changed through the day?', 'Who do I contact if something goes wrong?'] },
        { t: 'p', text: ['These three needs, in that order, became the three core parts of the Morphea app.'] },
        { t: 'more', summary: 'See the background research', blocks: [
          { t: 'p', text: ['Studying arts and entertainment festivals, we found that early-bird and limited-seat offers bring in up to 40% of bookings internationally, and 35% in India.'] },
          { t: 'columns', title: 'Where planning breaks before the event', items: [
            { title: 'Planning', items: ['Information spread across too many tools, with nothing in sync', 'Several versions of schedules and budgets', 'Meetings in person that add time, cost and emissions'] },
            { title: 'Sponsors', items: ['Hard to find sponsors who fit both the creative vision and green values', 'Approvals slowed by email loops', 'Sponsors who ignore sustainability'] },
            { title: 'Awareness', items: ['Mixed messages offline and online', 'Few people scan QR codes', 'A gap between tech-savvy and offline-first audiences'] },
            { title: 'Tickets', items: ['Offline and online systems that don’t match', 'Digital gaps and privacy risks', 'Paper tickets still common'] },
            { title: 'Marketing', items: ['So many ads it’s hard to stand out', 'Influencer timing is hard to coordinate', 'Budgets split between offline and online'] }] },
          { t: 'p', title: 'A case study: the Kochi-Muziris Biennale', text: ['India’s largest contemporary art festival spans heritage buildings, public spaces, galleries and outdoor sites in Kochi, with exhibitions, performances, talks and workshops. What it does well: a reusable structure, sustainability treated as art, and a living ecosystem. Where it struggles: sustainability, coordination, high costs, the weather, vendors and staff, and conflicts.'] }] },
      ] },
      { nav: 'What people said', title: 'In their words', blocks: [
        { t: 'quotes', items: [
          { q: 'Our stall was set up, but barely anyone knew we were here. It felt like we were hidden.' },
          { q: 'Last-minute changes weren’t communicated properly, which confused both staff and exhibitors.' },
          { q: 'We were constantly running around to clarify small things that should have been sorted beforehand.' },
          { q: 'Whenever I needed to check in with another team, it took too long to figure out who was responsible.' },
          { q: 'Sponsors told us they didn’t see the kind of audience engagement they were promised.' }] },
      ] },
      { nav: 'Who it’s for', title: 'Three people, three very different event days', blocks: [
        { t: 'steps', title: 'An event, as organisers live it', items: [
          { title: 'Planning', img: im('morphea-story-1', 1536, 1024, 'Storyboard: an organiser at her laptop juggling proposals, approvals and payments'), body: '“Proposals here, approvals there, payments pending… I need five hands to manage this!”' },
          { title: 'Promotion', img: im('morphea-story-2', 1536, 1024, 'Storyboard: the team planning reels, posters and offline promotion'), body: '“Online, offline, reels, posters: leave no corner untouched!”' },
          { title: 'Registration', img: im('morphea-story-3', 1536, 1024, 'Storyboard: attendees stuck at a slow verification kiosk'), body: '“Wait, I booked online, but the kiosk still asks me for verification!” “Please keep your QR ready, the system is slow!”' },
          { title: 'Setting up', img: im('morphea-story-4', 1536, 1024, 'Storyboard: stalls, workshops and logistics coming together'), body: '“Okay, stalls are ready, workshops in place, logistics flowing. We’ve got this.”' },
          { title: 'The day itself', img: im('morphea-story-5', 1536, 1024, 'Storyboard: organisers handle a delayed transport while the crowd enjoys the show'), body: '“Every event is a storm, but the audience only sees the rainbow.”' }] },
        { t: 'persona', items: [
          { role: 'organiser', name: 'Riya Singh', facts: ['30 years old'], bio: 'Experienced in cultural fests, exhibitions and workshops. Coordinates artists, vendors, sponsors and volunteers.',
            lists: [['Goals', ['Attract diverse audiences', 'Run eco-friendly events', 'Keep coordination smooth', 'Strengthen marketing and sponsorship']], ['Pain points', ['Budget and venue limits', 'Unreliable vendors and staff', 'Miscommunication', 'Ticketing problems and crises on site']], ['Reach her on', ['Email, WhatsApp, Instagram, phone and shared docs']]] },
          { role: 'vendor', name: 'Rishabh', facts: ['28 years old'], bio: 'Runs a small creative brand and takes part in exhibitions and festivals for sales, exposure and networking.',
            lists: [['Goals', ['Show off his products', 'Grow brand recognition', 'Win repeat customers', 'Network and get noticed']], ['Pain points', ['High stall costs', 'Logistics problems', 'Miscommunication with organisers', 'Weak branding', 'Bargaining and heavy competition']], ['Reach him on', ['Email, WhatsApp, Instagram and QR codes']]] },
          { role: 'sponsor', name: 'Aisha', facts: ['34 years old'], bio: 'An independent sponsor and small business owner who takes part in fests, exhibitions and workshops.',
            lists: [['Goals', ['Gain visibility', 'Network', 'Promote products', 'Learn from audience trends']], ['Pain points', ['Low audience engagement', 'Poor stall or space setup', 'Last-minute changes', 'Hard to measure impact']], ['Reach her on', ['Phone, WhatsApp and Instagram']]] }] },
      ] },
      { nav: 'The problem', title: 'The plan falls apart between teams', blocks: [
        { t: 'question', label: 'the problem, in one line', text: 'Event teams struggle with scattered communication, unclear roles and too many tools.', note: 'That causes delays, mismanagement and last-minute crises. Poor coordination lowers efficiency, frustrates vendors and sponsors, and leaves attendees with a stressful, inconsistent experience.' },
        { t: 'columns', title: 'How it works today', items: [
          { title: 'Awareness', body: 'Spread across Instagram, WhatsApp and word of mouth.' },
          { title: 'Registration', body: 'Third-party or manual, confusing and inconsistent.' },
          { title: 'Communication', body: 'Scattered updates and missed messages.' },
          { title: 'Onboarding', body: 'Manual calls and emails, with little visibility.' },
          { title: 'Expectations', body: 'Unclear, because details arrive late or not at all.' }] },
        { t: 'p', text: ['We mapped every person and touchpoint around the organisers across four stages: <b>planning</b> (sponsors, vendors, volunteers), <b>marketing</b> (influencers, exhibitors, audiences), <b>ticketing</b> (online, QR passes, on the ground) and <b>the event itself</b> (venue, logistics, check-ins, workshops).'] },
        { t: 'question', label: 'the question we set out to answer', text: 'How might we simplify communication between everyone involved, so they stay aligned from planning to the event floor?' },
      ] },
      { nav: 'Ideas', title: 'Deciding what to build first', blocks: [
        { t: 'columns', intro: 'We sorted every idea into what the event must have, should have, could have, and won’t have yet.', items: [
          { title: 'Must have', tone: 'key', items: ['One web app for every stakeholder, with updates, a progress tracker and interactive maps', 'Walkie-talkies, staff IDs and a venue map marking every stall', 'Interactive visiting cards with AR', 'A mock-up book showing sponsors where their brand will appear'] },
          { title: 'Should have', items: ['Physical IDs and signboards for easy navigation', 'QR-coded wristbands made from sustainable material', '“Ask me” badges, so attendees can find a volunteer', 'Digital tickets with QR codes'] },
          { title: 'Could have', items: ['A kanban board for visual planning', 'A guide for vendors on dealing with visitors', 'Games for the audience at stalls', 'Colour-coded badges for each role', 'Interactive QR phrases on vendor T-shirts', 'Colour-coded task cards with QR codes'] },
          { title: 'Won’t have, for now', items: ['Heatmaps and footstep signs to guide attendees around', 'Staff allocation at crowded corners'] }] },
        { t: 'images', layout: 'row', images: [im('morphea-sketch-1', 2064, 2752, 'Pencil sketch of the app screens and dashboards'), im('morphea-sketch-2', 2064, 2752, 'Pencil sketch of the sponsor booklet'), im('morphea-sketch-3', 2064, 2752, 'Pencil sketch of the physical ID kit with a walkie-talkie and map'), im('morphea-sketch-4', 2064, 2752, 'Pencil sketch of the interactive visiting card')], cap: 'Final sketches: the app, the sponsor booklet, the ID kit and the visiting card.' },
      ] },
      { nav: 'Brand', title: 'A mark that moves like a festival', blocks: [
        { t: 'p', text: [
          'The logo is made of three gestures. <b>The yellow curve</b> adds a spark of innovation and optimism. <b>The curved blue line</b> stands for smooth flow, flexibility and adaptability. <b>The pink accent</b> at the base brings warmth, human connection and celebration.',
          'The app sits on a pure black canvas, a deliberate choice over dark grey: on a phone at full brightness outdoors, pure black gives the crispest contrast for the event card and live data. Futura gives the wordmark geometric authority; Lato keeps data labels and interface text legible at small sizes outdoors.'] },
        { t: 'palette', fonts: [{ name: 'Futura', note: 'Wordmark and headlines', css: 'Futura, "Century Gothic", var(--f-body)' }, { name: 'Lato', note: 'Data and interface text', css: 'Lato, var(--f-body)' }, { name: 'Mongolian Baiti', note: 'Taglines', css: '"Mongolian Baiti", Georgia, serif' }], colors: ['#D989BB', '#E6B827', '#BA295C', '#29A3D1', '#72A466'] },
        { t: 'columns', items: [
          { title: 'Mission', body: 'To create an inclusive, engaging festival of music, literature, dance and crafts, with smooth collaboration between teams, vendors, sponsors and audiences, closing the gaps in planning, communication and execution for a seamless, memorable event.' },
          { title: 'Vision', body: 'To show how cultural festivals can inspire joy, creativity and togetherness while setting new standards for efficiency and trust, proving that good planning and clear communication turn challenges into flawless events.' },
          { title: 'In a line', body: '“Where every detail counts.” “Turning ideas into experiences.” “Chaos managed, magic delivered.”' }] },
        { t: 'images', layout: 'wide', images: [im('morphea-brand', 1920, 787, 'Morphea brand identity')], cap: 'The Morphea identity.' },
      ] },
      { nav: 'Dashboards', title: 'A dashboard for every role', blocks: [
        { t: 'findings', plain: true, cols: 2, items: [
          { title: 'Organisers', img: im('morphea-dash-org', 1500, 1125, 'Organiser dashboard: a live venue map, incidents and available staff'), body: 'Monitor people and operations, manage incidents and talk to every stakeholder in real time.' },
          { title: 'Volunteers', img: im('morphea-dash-vol', 1500, 1125, 'Volunteer dashboard: assigned incidents, recent updates and today’s tasks'), body: 'See tasks, handle incidents, stay in touch with organisers and open quick guides on the spot.' },
          { title: 'Core team', img: im('morphea-dash-core', 1500, 1125, 'Core team dashboard: incidents by severity, response times and attendance'), body: 'A control centre for live numbers, incident trends and how engaged attendees are.' },
          { title: 'Exhibitors', img: im('morphea-dash-exh', 1500, 1125, 'Exhibitor dashboard: registration and a stall map with resource requests'), body: 'Register, book a stall and request power, Wi-Fi or supplies with little effort, while organisers stay updated.' }] },
        { t: 'images', layout: 'phones', images: [im('morphea-mobile-1', 390, 845, 'Morphea vendor portal: a live crowd heatmap and attendance trends'), im('morphea-mobile-2', 390, 845, 'Morphea volunteer view: assigned incidents with in-progress, resolved and accept actions'), im('morphea-mobile-3', 390, 844, 'Morphea vendor stall screen: stall location, item requests and the organiser’s contact')],
          cap: 'The vendor portal with the live crowd heatmap, the volunteer’s incidents, and a vendor’s stall screen.' },
      ] },
      { nav: 'On the ground', title: 'Where the app meets the event floor', blocks: [
        { t: 'findings', plain: true, items: [
          { title: 'Visiting cards', body: 'A QR code that opens an AR experience and social links, for easy networking.' },
          { title: 'An onboarding kit', body: 'ID cards, maps and walkie-talkies that align volunteers, exhibitors and the core team before the event.' },
          { title: 'ID card and map', body: 'A handy ID with the venue map and simple rules on the back, starting with “Atithi Devo Bhava”: greet and guide every guest.' },
          { title: 'Tickets', body: 'On-brand tickets with unique barcodes, so entry is secure, fakes are stopped, and moving from online booking to the gate is easy.' },
          { title: 'Posters', body: 'Clear branding and a QR code that turn offline reach into online registrations.' }] },
        { t: 'images', layout: 'row', images: [im('morphea-mockups-1', 485, 455, 'Black Morphea core-team box printed with blue dancer illustrations'), im('morphea-staff', 800, 1280, 'A staff member wearing a Morphea lanyard working at a vendor table during a cultural event'), im('morphea-mockups-3', 445, 453, 'AR view of a 3D monument model rising out of an event map')],
          cap: 'The core-team kit, a staff lanyard at work, and the AR view of a monument rising out of the event map.' },
        { t: 'images', layout: 'row', images: [im('morphea-badges', 1200, 1888, 'Round “Ask me” volunteer badges with friendly phrases'), im('morphea-band', 408, 612, 'A Morphea wristband on a wrist'), im('morphea-sufi', 736, 1041, 'Jashn-e-Sufi poster artwork: a whirling dervish')], cap: '“Ask me” badges, a QR wristband, and the artwork for the Jashn-e-Sufi poster.' },
        { t: 'images', layout: 'row', images: [im('morphea-stage', 1170, 692, 'The Morphea logo on a stage screen between coloured light pillars'), im('morphea-van', 612, 408, 'A black van wrapped with the Morphea logo'), im('morphea-bottles', 612, 408, 'Morphea water bottles in black, yellow, blue and pink')], cap: 'The brand on stage and on the move.' },
      ] },
      { nav: 'Outcome', title: 'Decisions made before the queue, not after', blocks: [
        { t: 'p', text: ['With a crowd heatmap and attendance trend visible at a glance, vendors could decide on staffing and restocking before queues formed rather than after. The shared platform also cut the back-and-forth between organisers and vendors.'] },
      ] },
    ],
    quote: 'Showing lots of data on a phone is a trap. Early wireframes tried to show too many numbers at once. Being ruthless about priority (heatmap first, trend second, people third) made the app feel like a tool rather than a report.',
    learning: 'The natural next step: notifications tied to crowd levels (“Your section is reaching capacity, consider redirecting people to Gate B”) would make the app warn you before a problem instead of showing it after.',
  },

  {
    slug: 'kalaghar', title: 'Kalaghar', year: '2025', doodle: 'pot',
    short: 'Designing a community space that serves the artisan, not the observer.',
    tags: ['Service design', 'Cultural preservation'],
    cover: im('kalaghar-cover', 1876, 1055, 'Artisans at work on looms'),
    coverAlt: im('kalaghar-cover-alt', 1876, 1055),
    hero: im('kalaghar-cover', 1876, 1055, 'Artisans at work on looms'),
    lede: 'Heritage on wheels: a travelling craft hub that brings artisans face to face with the people who value their work.',
    summary: 'Kalaghar celebrates living heritage. It helps people discover underrated Indian artisans and connects them directly with buyers, to strengthen both the culture and the livelihoods behind it.',
    meta: [['Role', 'Research, branding, UI/UX design'], ['Timeline', '2025 · 4 weeks'], ['Field', 'Crafts and cultural commerce']],
    glance: {
      problem: 'Artisans make work of extraordinary quality but have no trusted way to sell it. <mark>Middlemen set the price and keep most of the margin</mark>, and buyers who discover craft online want to see it being made, not just own it.',
      solution: 'A travelling heritage hub, the Kalaghar van, with live workshops and stalls run by artisans themselves, plus a website for buyers and a WhatsApp assistant that lets artisans share their work in their own language.',
    },
    featuresTitle: 'Craft, brought to your doorstep',
    features: [
      { title: 'The van comes to you', body: 'A moving hub that stops in cities, villages and tourist spots with exhibitions, live craft demonstrations and learning sessions.', img: im('kalaghar-van', 1362, 732, 'The Kalaghar van'), fit: 'cover' },
      { title: 'Learn from the maker', body: 'Hands-on workshops in block printing, pottery and weaving, led by the artisans who keep those crafts alive.', img: im('kalaghar-research-3', 960, 1280, 'A craftsman stitching leather juttis on the floor of his workshop'), fit: 'cover' },
      { title: 'Sell in your own language', body: 'Artisans share photos and voice notes through a WhatsApp assistant that speaks Hindi, Punjabi, Tamil, Bengali, Marathi and more.', img: im('kalaghar-mobile', 1920, 1080, 'Kalaghar low-literacy mobile screens with voice-note uploads, beside an artisan and her child'), fit: 'cover' },
    ],
    chapters: [
      { nav: 'Goals', title: 'What we set out to do', blocks: [
        { t: 'findings', items: [
          { title: 'Give artisans dignity', body: 'Put artisans first, and honour their craft and identity.' },
          { title: 'Keep traditions alive', body: 'Restore endangered art forms and preserve cultural heritage.' },
          { title: 'Create real connections', body: 'Through immersive, hands-on workshops led by artisans.' },
          { title: 'Put artisans in the spotlight', body: 'Celebrate their stories, skills and lived experience.' }] },
      ] },
      { nav: 'In the field', title: 'Three days in Patiala', blocks: [
        { t: 'p', lead: true, text: ['To understand the true spirit of craftsmanship, we travelled to Patiala and the villages around it, where the sound of handlooms and stories of heritage still echo.'] },
        { t: 'steps', items: [
          { n: 'Day 1', title: 'Jutti makers', body: 'We watched artisans make juttis (hand-stitched Punjabi shoes), talked to the families who work alongside them, and learned about their tools and techniques. We also asked middlemen about sales and sourcing.' },
          { n: 'Day 2', title: 'Phulkari', body: 'We watched women hand-stitch phulkari embroidery, interviewed them and their families, tried stitching ourselves, and looked at how the work is sold locally.' },
          { n: 'Day 3', title: 'The middlemen', body: 'We spoke to middlemen who handle juttis, phulkari and parandi (braided hair tassels), and learned how they buy from artisans, set prices and share the profit.' }] },
        { t: 'images', layout: 'row', images: [im('kalaghar-field-1', 4032, 2268, 'A jutti-making family at their workshop in Patiala'), im('kalaghar-field-2', 698, 927, 'A woman stitching a white phulkari with peacocks'), im('kalaghar-field-3', 960, 1280, 'A shop hung with colourful parandi tassels')], cap: 'Jutti makers, phulkari and parandi in Patiala.' },
        { t: 'images', layout: 'row', images: [im('kalaghar-research-1', 1280, 960, 'A potter’s workshop: stacked clay plates on a shelf above the wheel'), im('kalaghar-research-2', 960, 1280, 'An artisan’s hand with yellow tape wrapped around the fingertips'), im('kalaghar-research-3', 960, 1280, 'A craftsman stitching leather juttis on the floor of his workshop'), im('kalaghar-research-4', 1200, 1600, 'Hands holding a red embroidered phulkari textile')],
          cap: 'In the workshops: a potter’s shelf, fingers taped for stitching, a jutti maker at work, and a phulkari.' },
        { t: 'p', text: [
          'Our buyer research focused on people who had bought handmade goods at craft fairs before. To them, buying craft online felt riskier.',
          'Artisans had a different set of concerns. They didn’t want to manage a shop. They cared about two things: <mark>being represented with dignity, and a fair share</mark> without platform middlemen taking most of the margin.'] },
      ] },
      { nav: 'What we found', title: 'The skill is passed down. The money isn’t.', blocks: [
        { t: 'findings', title: 'In the workshops', items: [
          { title: 'A family legacy', img: im('kalaghar-find-1', 960, 1280, 'A young artisan cutting jutti soles on the floor'), body: 'Jutti-making is passed down through families, generation after generation.' },
          { title: 'Made at home', img: im('kalaghar-find-2', 960, 1280, 'A woman working on juttis at home while a man works behind her'), body: 'Artisans work from home, often with several family members involved.' },
          { title: 'Quality is slipping', img: im('kalaghar-find-3', 1200, 1600, 'A woman gluing jutti parts beside a bucket of adhesive'), body: 'Hand stitching is being replaced by glue to cut costs, at the expense of craftsmanship.' },
          { title: 'Different styles for women and men', img: im('kalaghar-find-4', 1280, 960, 'Hands holding a patterned women’s jutti'), body: 'Women’s juttis come in many patterns, while men’s styles vary far less.' },
          { title: 'Very little profit', img: im('kalaghar-find-5', 960, 1280, 'An artisan sitting among wooden shoe lasts'), body: 'Despite their skill, artisans earn very little, because of middlemen and undervaluation.' }] },
        { t: 'findings', title: 'Across the wider market', items: [
          { title: 'Heritage is fading', img: im('kalaghar-market-1', 800, 800, 'Illustration: an elderly weaver at her loom while two young people look at their phones'), body: 'These traditions are emotionally rich, but they’re slowly disappearing from younger generations’ lives.' },
          { title: 'Real craft is hard to find', img: im('kalaghar-market-2', 1024, 1024, 'Illustration: an embroidered jutti among boxes of mass-produced copies'), body: 'Genuine handmade products get lost among cheap, mass-produced copies.' },
          { title: 'Middlemen take the profit', img: im('kalaghar-market-3', 800, 800, 'Illustration: a funnel turning cheap prices for artisans into high prices for customers'), body: 'Intermediaries often take a large share, cutting artisans off from fair pay and from customer feedback.' },
          { title: 'Valued more abroad', img: im('kalaghar-market-4', 800, 800, 'Illustration: tourists admiring an artisan’s textiles at a market'), body: 'Handmade crafts are more respected overseas, where buyers value authenticity.' },
          { title: 'Not made for the rain', img: im('kalaghar-market-5', 800, 800, 'Illustration: embroidered juttis soaked in mud and rain'), body: 'Traditional crafts are easily damaged by rain, which limits when they can be used.' }] },
      ] },
      { nav: 'The question', title: 'Making the system fair to the people who make the work', blocks: [
        { t: 'question', label: 'the question we set out to answer', text: 'How might we create a fair, shared system that connects artisans and buyers, so artisans are respected, visible and fairly paid, and our cultural heritage is preserved?' },
        { t: 'steps', title: 'How a handmade product reaches a buyer today', items: [
          { title: 'Sourcing materials', body: 'Artisans collect natural or locally available materials.' },
          { title: 'Making it', body: 'Each piece is handmade with traditional skills, often with help from family and community.' },
          { title: 'Packing', body: 'Products are packed without branding, usually by the artisans or local sellers.' },
          { title: 'Selling nearby', body: 'Crafts are sold at local markets, festivals or government emporiums.' },
          { title: 'The middleman steps in', body: 'Intermediaries help with distribution, but often take a large share of the profit.' },
          { title: 'Shops and export', body: 'Some crafts reach city stores, online shops or global markets through export bodies.' }] },
      ] },
      { nav: 'Who it’s for', title: 'The maker and the buyer', blocks: [
        { t: 'persona', items: [
          { role: 'artisan', name: 'Baldev Singh', img: im('kalaghar-persona-baldev', 960, 1280, 'Baldev Singh, an elderly artisan in a turban, stitching a jutti'), facts: ['48 years old', 'Patiala, Punjab', 'Jutti artisan', 'Earns ₹8,000–12,000'],
            bio: 'A skilled jutti artisan carrying on a family tradition of handmade footwear. Trained by his father, he has practised the craft for over 30 years. Despite money troubles and little recognition, he remains passionate about jutti-making, and dreams of a better income, passing the art to his children and getting credit for his designs.',
            lists: [['Goals', ['Support his family through jutti-making', 'Pass the craft to the next generation', 'Be recognised for his work']], ['Pain points', ['No credit for his designs', 'Low, unstable earnings', 'Dependence on the middleman']], ['What drives him', ['Pride in his ancestral craft and identity', 'The dream of being featured on YouTube', 'A better life through steadier income']]] },
          { role: 'buyer', name: 'Simran Kaur', img: im('kalaghar-persona-simran', 720, 821, 'Simran Kaur standing on a hillside'), facts: ['29 years old', 'Chandigarh', 'HR manager', 'Earns ₹45,000'],
            bio: 'Blends tradition with modern life. She wears juttis to work and to celebrations, looking for pairs that are stylish and comfortable, and loves handmade goods. She prefers supporting local artisans but often wishes she knew more about who made what she buys.',
            lists: [['Goals', ['Support local craftsmanship', 'Live more sustainably', 'Find stylish, comfortable juttis for festivals']], ['Pain points', ['Limited choice in art and craft', 'Products vary from store to store', 'Dependence on middlemen']], ['What drives her', ['Owning unique products and accessories', 'Things that reflect Indian culture']]] }] },
      ] },
      { nav: 'The idea', title: 'A heritage hub on wheels', blocks: [
        { t: 'p', lead: true, text: ['A moving heritage hub, a “travelling truck”, that journeys across India bringing crafts, cultures and stories directly to people. It stops in cities, villages and tourist spots with exhibitions, live craft demonstrations and learning sessions.'] },
        { t: 'images', layout: 'row', images: [im('kalaghar-truck', 1376, 768, 'Illustration: a painted heritage truck on a village road, with a banner reading “Preserving our roots”'), im('kalaghar-stall', 1376, 768, 'Illustration: the heritage truck opened up as a craft stall with visitors')], cap: 'The heritage hub on the road, and opened up for visitors.' },
        { t: 'columns', items: [
          { title: 'Why it exists', body: 'To preserve and promote India’s artisanal heritage by connecting skilled craftspeople with modern audiences through workshops, cultural experiences and handmade products. It empowers rural artisans, revives dying crafts and builds real connections between people and art.' },
          { title: 'What it offers', items: ['Craft workshops (block printing, pottery, weaving) led by real artisans', 'Artisan-made kits for hands-on making', 'Handmade products from rural artisans', 'Stories of the journey behind each craft'] },
          { title: 'How it works', items: ['Interactive workshops in cities and towns', 'Partnering directly with artisans for fair wages and representation', 'The Kalaghar van as a mobile creative space', 'Craft kits and products sold online and at events', 'Social media and storytelling to raise awareness of India’s living heritage'] },
          { title: 'Where it runs', items: ['Offline: workshops, schools, cultural festivals and community centres across India', 'Online: a website and social media', 'On the move: the van, reaching places that are underserved or curious about craft'] }] },
      ] },
      { nav: 'Service design', title: 'Every step, in front of the visitor and behind the scenes', blocks: [
        { t: 'images', layout: 'wide', images: [im('kalaghar-blueprint', 1920, 1080, 'Service blueprint')], cap: 'The service blueprint: what a visitor sees and does at each step, what artisans and staff do in front of them and behind the scenes, and the systems that support it.' },
        { t: 'columns', title: 'The four Ps of the service', items: [
          { title: 'Product', items: ['Hands-on learning sessions', 'Live craft demonstrations', 'Stories told by the artisans themselves', 'Authentic handmade products, on site and online', 'Voice translation by the driver or a translator', 'Collaborations with design schools', 'An online store that keeps artisans visible after the van leaves'] },
          { title: 'People', items: ['Artisans', 'Visitors, tourists and local communities', 'A communicator, a designer and a driver', 'Schools, colleges and NGOs', 'Maintenance staff and customer support'] },
          { title: 'Place', items: ['The van, stopping in cities like Delhi, Mumbai and Bangalore, smaller towns, craft villages and tourist spots', 'Online: craft shopping, storytelling videos, artisan profiles and workshop bookings', 'Pop-ups at design colleges, and temporary hubs in community centres'] },
          { title: 'Process', items: ['Sees an ad', 'Books a live session', 'Gets a reminder', 'Visits the van', 'Learns the craft', 'Makes it their own', 'Takes it home as a souvenir'] }] },
        { t: 'more', summary: 'See the business model', blocks: [
          { t: 'columns', items: [
            { title: 'What it offers', items: ['Direct access to authentic, artisan-made products', 'Support for traditional artisans', 'Customisation', 'Hands-on learning', 'Bulk and personalised gifting', 'Storytelling and shopping, with artisans visible'] },
            { title: 'Who it’s for', items: ['Craft-conscious and ethical shoppers', 'Young city buyers', 'Tourists looking for authentic experiences', 'Students and learners interested in traditional crafts', 'Gift buyers who want something meaningful and handmade', 'Art collectors and home décor buyers', 'Institutions'] },
            { title: 'How it earns', items: ['Workshop bookings', 'Event participation', 'Product sales', 'A premium on customised products'] },
            { title: 'Main costs', items: ['Raw materials', 'Van upkeep, travel and logistics', 'Artisan payments', 'Running the website and platform', 'Marketing and branding', 'Staff salaries', 'Training and onboarding', 'Event and stall fees', 'Packing and shipping online orders'] }] }] },
      ] },
      { nav: 'Brand', title: 'More than a brand, a movement', blocks: [
        { t: 'p', text: [
          'In a country as rich and diverse as India, every region holds a story, crafted by hands that carve, weave, stitch and mould. Every artisan carries a piece of our culture, passed down through generations. Yet too often these artisans, the true keepers of our traditions, remain unseen, under-appreciated and unfairly paid.',
          'That’s why we started Kalaghar, a heritage on wheels: a moving hub where artisans don’t just sell, they show their skills, run live workshops and share their stories. Because in the end, <mark>it’s not just about preserving art; it’s about honouring the lives behind it</mark>.'] },
        { t: 'columns', items: [
          { title: 'Mission', body: 'To empower artisans, preserve our cultural roots and create a space where craftspeople, designers and buyers meet, through a moving hub that brings handmade traditions to every doorstep.' },
          { title: 'Vision', body: 'A world where artisans are seen, celebrated and supported, where every craft tells its story and every generation gets to experience the magic of Indian heritage.' }] },
        { t: 'p', title: 'Design decisions', text: ['The identity centres on warmth and texture. The hero image, a potter shaping clay on a wheel, does more work than any headline: it shows material, skill and time in a single frame. The palette draws on earth tones that echo the artisans’ materials, so the interface and the products inside it feel like one piece.'] },
        { t: 'images', layout: 'wide', images: [im('kalaghar-banner', 1920, 454, 'Kalaghar banner')] },
        { t: 'images', layout: 'row', images: [im('kalaghar-brand-artisan', 2752, 1536, 'An artisan carving wood in a Kalaghar apron'), im('kalaghar-brand-weaver', 2752, 1536, 'A weaver at a loom in a Kalaghar jacket')], cap: 'The identity, worn by the makers.' },
        { t: 'images', layout: 'row', images: [im('kalaghar-brand-stationery', 2048, 2048, 'Black Kalaghar stationery and gift box'), im('kalaghar-brand-tote', 1024, 1024, 'A canvas tote bag with the Kalaghar mark'), im('kalaghar-brand-mug', 1024, 1024, 'A white mug with the Kalaghar mark')] },
        { t: 'images', layout: 'row', images: [im('kalaghar-poster-1', 1024, 1536, 'Poster: “Rooted in tradition”, a weaver at his loom'), im('kalaghar-poster-2', 1024, 1536, 'Poster: “Kalaghar, heritage on wheels”, the painted van'), im('kalaghar-poster-3', 1024, 1536, 'Poster: “Empowering artisans”, a potter teaching a woman')], cap: 'Posters for the van’s visits.' },
      ] },
      { nav: 'Interfaces', title: 'One for buyers, one for artisans', blocks: [
        { t: 'images', layout: 'wide', title: 'For buyers: the website', images: [im('kalaghar-web', 1920, 1080, 'Kalaghar website on three laptops: artisan stories, van locations and the product shop')], cap: 'Artisan stories, where the van is going next, and the shop.' },
        { t: 'images', layout: 'wide', title: 'For artisans: a WhatsApp assistant', images: [im('kalaghar-mobile', 1920, 1080, 'Kalaghar low-literacy mobile screens with voice-note uploads, beside an artisan and her child')], cap: 'Artisans choose their language and upload photos and voice notes, in a chat app they already use.' },
        { t: 'images', layout: 'row', title: 'The van and the pamphlets', images: [im('kalaghar-van', 1362, 732, 'Kalaghar van'), im('kalaghar-pamphlets', 1920, 1124, 'Pamphlets')] },
      ] },
      { nav: 'Outcome', title: 'A reason to come back, every time the van does', blocks: [
        { t: 'p', text: ['Kalaghar built a bridge between discovering craft online and experiencing it in person. The van’s schedule gives people an event to look forward to and a reason to return, while the shop and its filters make browsing purposeful rather than overwhelming.'] },
      ] },
    ],
    quote: 'Kalaghar’s home page tells the story before it asks for a sale, and that order reflects how buyers actually build confidence in buying craft.',
    learning: 'A future version would put short artisan videos right into each product listing, so buyers can watch the maker at work before they buy, closing the gap between discovery and experience without waiting for the van.',
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
