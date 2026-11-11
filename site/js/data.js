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
    slug: 'span', title: 'Span', year: '2026', doodle: 'spark',
    short: 'Health data that finally means something, to members and to the doctors who read it.',
    tags: ['Health tech', 'Research', 'Brand identity'],
    cover: im('span-cover', 1920, 1080, 'The Span Health logo, four corner brackets, over warm amber light'),
    coverAlt: im('span-flower', 1000, 1250),
    hero: im('span-cover', 1920, 1080, 'The Span Health logo, four corner brackets, over warm amber light'),
    lede: 'A preventive-health clinic, and the tool its care team uses, redesigned to show what matters first.',
    summary: 'Span Health helps healthy people stay healthy for longer, with regular blood tests, body scans and fitness trackers. That creates a lot of data. I designed the brand members see, and the tool the care team uses, so both start with what matters.',
    meta: [['Role', 'Design intern: research, brand identity and UI, built with AI coding tools'], ['Timeline', '2026 · internship'], ['Field', 'Preventive health'], ['Note', 'From my internship. The brand, names and screens are changed.']],
    glance: {
      problem: 'Everyone had data. No one had meaning. <mark>Members got numbers they didn’t understand.</mark> Doctors got a screen full of information, and only a few minutes to read it before the client walked in.',
      solution: 'Two parts that share one idea. A <b>brand for members</b> that talks about life, not test scores. And a <b>care tool for the staff</b> that turns one crowded screen into a guided day, from the hub to the nutritionist handoff, built over five versions with doctors and tested against the current tool.',
    },
    featuresTitle: 'What the redesign does',
    features: [
      { title: 'The most important thing first', body: 'The overview opens on the clinical priorities, each linked to its results and symptoms, and prep shows what changed since last time.', img: im('span-ui-overview', 2880, 1800, 'The overview: three clinical priorities, each with its linked results and symptoms, beside what the client reported') },
      { title: 'One plan, everything else built from it', body: 'Doctors write one plan. The prescription, the client’s day and the safety checks all build themselves from it.', img: im('span-ui-plan-check', 2880, 1800, 'The care plan with five supplements, one flagged by the safety check because ashwagandha is usually avoided in a possible pregnancy') },
      { title: 'Record once, write once', body: 'The recording lives on the client’s page and goes straight into one note, written for the record, the nutritionist and the client.', img: im('span-ui-note', 2880, 1800, 'The doctor’s note, written for the client, beside a live phone preview of what the client will see') },
    ],
    ov: {
      impactTitle: 'What changed for the doctor',
      impact: [
        { n: 43, unit: '%', label: 'less time writing the care plan, in the first test against the tool doctors use today' },
        { n: 7, unit: ' → 0', label: 'clicks to see every body system that needs attention' },
        { n: 5, label: 'versions, each one taken back to doctors' }],
      outcome: 'In the first test, the doctor wrote the care plan in 10 minutes instead of almost 18, and only closed the consult on the redesign. She said she would use it for real consults. Three more doctors are next.',
      part: 'A design internship. I sat in on consults, designed the brand members see, and designed and built the care tool with AI coding tools.',
      walk: [
        { img: im('span-ui-old', 2880, 1800, 'The original consult screen, white-labelled, with four problems marked: nine panels of equal size, two empty drop zones, made-up numbers and hard-to-read capitals'), line: 'I sat in on five consults. The old screen gave <mark>nine panels the same weight</mark>.' },
        { img: im('span-billboard', 1024, 828, 'A yellow Span Health sign reading “make more of your years” against a blue sky'), line: 'For members, a brand about <mark>life, not test scores</mark>.' },
        { img: im('span-ui-consult', 2880, 1800, 'The redesigned consult screen: an alert strip, results grouped with change tags such as worse and better, and the care plan beside them'), line: 'For doctors, the consult now leads with <mark>what needs attention</mark>.' },
        { video: { src: 'assets/media/span-vid-assist.mp4', poster: im('span-vid-assist-poster', 1440, 900), w: 1440, h: 900, alt: 'Screen recording: Assist suggests templates, the doctor accepts its advice, a safety check flags one supplement, then the plan shows as the client’s day and as a prescription' }, line: 'Write <mark>one plan</mark>, and the client’s day, the prescription and a safety check build themselves.' },
        { img: im('span-ui-twin-full', 2880, 1800, 'The digital twin in full screen, zoomed in on the thyroid, with a floating card showing TSH and free T3 out of range'), line: 'The digital twin shows <mark>where the results point</mark>, with one colour meaning.' },
        { video: { src: 'assets/media/span-vid-record.mp4', poster: im('span-vid-record-poster', 1440, 900), w: 1440, h: 900, alt: 'Screen recording: the doctor records the consult, confirms the client, stops, opens the summary, then writes the doctor’s note with a phone preview' }, line: 'Record once, and the note is written for <mark>the record, the nutritionist and the client</mark>.' }],
    },
    chapters: [
      { nav: 'Where it started', title: 'How do you make advanced healthcare feel human?', blocks: [
        { t: 'p', lead: true, text: ['The clinic offers serious medicine: blood panels, body scans and data from wearables, read by doctors, nutritionists and coaches. But serious medicine can feel cold, and a screen full of numbers can hide the one thing that matters.'] },
        { t: 'columns', items: [
          { title: 'For members', body: 'I wanted them to <b>understand their body</b>, not just read numbers about it.' },
          { title: 'For the care team', body: 'I wanted them to <b>see what matters</b> in the few minutes they get.' }] },
        { t: 'images', layout: 'row', images: [im('span-hula', 735, 980, 'An older woman laughing as she spins a hula hoop on a lawn'), im('span-flower', 1000, 1250, 'An older woman holding up a red flower in a greenhouse')] },
      ] },
      { nav: 'The problem', title: 'Everyone had data. No one had meaning.', blocks: [
        { t: 'columns', items: [
          { title: 'Members', body: 'Longevity brands talk in biological age and optimisation. But people don’t want more years for a number. <mark>They want energy, movement and time for what they love.</mark>' },
          { title: 'The care team', body: 'Blood panels, scans, wearables and questionnaires all land on one record. The tool showed everything at the same size, in nine equal panels, so nothing stood out.' }] },
        { t: 'images', layout: 'row', images: [im('span-runner', 896, 1207, 'A runner in mid-stride over still water, mirrored below'), im('span-hrv', 1200, 1500, 'A heart-rate chart over a warm, blurred photo: wishing you an HRV that keeps going up')] },
      ] },
      { nav: 'Who it’s for', fold: true, title: 'I was designing for four people, not one', blocks: [
        { t: 'quotes', items: [
          { q: 'I’m not waiting to feel unwell to start taking care of myself.', who: 'Members' },
          { q: 'What’s the one thing I must sort out today?', who: 'Doctors' },
          { q: 'Who do I call, and what do I say?', who: 'Relationship managers' },
          { q: 'What does this person need from food?', who: 'Nutritionists' }] },
        { t: 'p', text: ['Each of them opens the same record looking for something different. That became one of the most important ideas in the redesign.'] },
      ] },
      { nav: 'Research', title: 'Before designing anything, I watched', lede: 'I wanted to see how people really work, not how the software expects them to.', blocks: [
        { t: 'findings', plain: true, cols: 4, items: [
          { title: 'Sat with doctors as they prepared for check-ups' },
          { title: 'Watched doctors use the current tool in real consults' },
          { title: 'Talked to each type of staff' },
          { title: 'Studied other health brands' }] },
        { t: 'stats', items: [
          { n: 5, label: 'real consults shadowed, with consent' },
          { n: 4, label: 'doctors: three experienced and one newer' },
          { n: 3, label: 'doctors answered a short survey' },
          { n: 2, label: 'days in clinic' }] },
        { t: 'p', text: [
          'Shadowing was the main method: I sat beside each doctor from the moment they opened a client’s record until the prescription was done, and noted where they got stuck, what they looked at first, and what they did outside the tool. A five-minute survey added numbers, and short questions after each consult added the “why”.',
          'I kept my own redesign out of every session. <mark>I noted what I saw, not what I thought it meant</mark>, so the patterns that came out were the doctors’, not mine.'] },
        { t: 'list', title: 'How I made sense of it', items: [
          'Every moment became a sticky note, coloured by type: stuck, workaround, what they looked at first, a quote, or a surprise.',
          'I sorted them into before, during and after the consult, and saw where they piled up.',
          'I scored each finding by how many doctors it affected and how bad it was, from “annoying” to “risks a missed clinical decision”, and fixed the highest scores first.'] },
        { t: 'stickies', fold: 'See my research board, re-set as sticky notes', title: 'One session, as I mapped it', intro: 'An experienced doctor, 6+ months on the tool, in an online follow-up. Built from 7 audio recordings, my notes and her survey.', cols: [
          { title: 'Pain points', tone: 'pain', c: 2, items: [
            'She skips the prep page. For repeat clients it’s empty, so there’s nothing useful there.',
            'It says “0 of 200 flagged”, but some markers are still orange. New problems aren’t picked up.',
            'The client filled in the questionnaire, but it doesn’t show on prep or in the AI notes. She has to click around to find it.',
            'She can’t easily see when the programme started or when the last consult was. A date shows in one place but not another.',
            'The visit record was wrong: wrong date, and marked “walk-in” although it was online. There’s no online option.',
            'Her notes don’t reach the client’s app, so she can’t answer the client’s questions later.',
            'The AI notes only look at the latest test, and the advice is too general.',
            'Finding the right thing at the right time slows her down the most. Seeing what changed since last visit is often hard.',
            'The built-in voice note misses too much, so she stopped using it.',
            'Writing the prescription takes too long, and the AI plan tool makes it slower. A 30-minute slot becomes about 45.'] },
          { title: 'How she gets around it', tone: 'way', items: [
            'She checks her calendar to see who’s next.',
            'She records the consult in a separate app instead of the built-in voice note.',
            'She finds the AI notes in her email, cleans them up with her own prompt, and pastes them in.',
            'She writes the prescription with the results open side by side.',
            'When there’s no questionnaire, she skips the AI plan tool and picks supplements herself.'] },
          { title: 'Insights', tone: 'insight', c: 2, items: [
            'For repeat clients she starts from the last prescription, not prep. Prep should show what we advised, whether they followed it, and if not, why.',
            'All the data is there, but it doesn’t connect, so she pieces it together herself.',
            'Small mistakes (wrong dates, wrong visit type, “0 flagged”) make her stop trusting it, so she double-checks everything.',
            'AI only helps when it has context. Without the questionnaire or a good recording, the answers are general.',
            '<b>Her main job is comparing visits:</b> what got better, what didn’t, and why. The results comparison is her favourite screen.',
            'She never uses the sections built for other teams. A doctor’s view should hide them.',
            'The consult slot is too short for the work. The prescription alone takes her past 30 minutes.',
            'Her idea: make the questionnaire required before every consult, so prep and the AI have what they need.'] }],
          note: 'Re-set from my research board, with product names removed and nobody named.' },
      ] },
      { nav: 'What I saw', fold: true, title: 'The information was all there. Doctors still put the story together by hand.', blocks: [
        { t: 'stats', items: [
          { n: 45, unit: ' min', label: 'a typical consult, in a 30-minute slot. Some ran to an hour.' },
          { n: 15, unit: ' min', label: 'spent typing supplements by hand in one consult' },
          { n: 4, unit: ' of 4', label: 'doctors recorded the consult in a separate app instead' },
          { n: 0, unit: ' of 5', label: 'consults opened seven of the tool’s sections' }] },
        { t: 'findings', items: [
          { title: 'Three screens do all the work', body: 'Every consult ran on the same three screens: the results, the original reports and the consult notes. The rest of the tool served other teams.' },
          { title: 'Writing the plan takes the longest', body: 'Medicines, supplements, doses, tests and advice were all typed by hand, and doctors kept their own spreadsheets of product links.' },
          { title: 'Doctors jump between screens', body: 'They switched between the results and the reports three or four times a consult to check numbers, and wanted them side by side.' },
          { title: 'Seeing what changed is the hardest part', body: 'Every survey answer said it was hard to see how a client had changed since last time. New abnormal results could be missed.' },
          { title: 'The built-in AI isn’t trusted', body: 'Its suggestions were too general, so doctors checked the reports and redid the work. They wanted to see where each point came from.' },
          { title: 'Prep doesn’t help repeat clients', body: 'Three of four doctors skipped the prep page. For a returning client it was empty or just pointed to other pages.' }] },
        { t: 'quotes', items: [
          { q: 'The problem is not lack of data. It is that these pieces are not sufficiently connected.', who: 'A doctor' },
          { q: 'All I need to do is write the medicine, choose the frequency.', who: 'A doctor, on typing the plan' },
          { q: 'Ideally I want to have a conversation here saying what improved, what worsened.', who: 'A doctor, on repeat clients' },
          { q: '[It] doesn’t have to be so much; pointers would be better.', who: 'A doctor, on the prep page' },
          { q: 'If I have already documented something once, I should not have to enter it again.', who: 'A doctor, on notes' },
          { q: 'I never opened Journey till now.', who: 'A doctor, on a section built for another team' }] },
        { t: 'p', text: ['Quotes are lightly edited for reading, and the doctors aren’t named.'] },
      ] },
      { nav: 'The old screen', title: 'Scoring the old screen against ten design rules', blocks: [
        { t: 'p', text: [
          'I checked the care tool against <b>Nielsen’s ten usability heuristics</b>, a standard list of common design problems, and scored each issue from 0 (fine) to 4 (very bad). <mark>Six scored 3 or 4.</mark>'] },
        { t: 'findings', title: 'The three biggest problems', items: [
          { title: 'Red meant two different things', body: 'On the body map, red meant “the lab results and the answers both flag this”. On every card, red meant critical. A doctor reading red as critical would be misled.' },
          { title: 'There was no starting point', body: 'Three equal columns competed for attention, so nothing told the doctor where to look first.' },
          { title: 'Problems were hidden until clicked', body: 'Each flagged area of the body appeared only after clicking its dot, one at a time. One client needed seven clicks to see seven problems.' }] },
        { t: 'stats', title: 'What changed in my first redesign of the results page', items: [
          { n: 0, label: 'clicks to see every flagged area, down from seven' },
          { n: 47, unit: '%', label: 'shorter results page' },
          { n: 52, unit: '%', label: 'fewer words on screen' },
          { n: 1, label: 'meaning for each colour, instead of two legends that clashed' }],
          note: 'Measured on the prototype, before testing with doctors.' },
        { t: 'images', ui: true, layout: 'wide', images: [im('span-ui-old', 2880, 1800, 'The original consult screen, white-labelled, with four problems marked: nine panels of equal size, two empty drop zones, made-up numbers and hard-to-read capitals')], cap: 'Before: the original consult screen, with its biggest problems marked.' },
        { t: 'images', ui: true, layout: 'wide', images: [im('span-ui-consult', 2880, 1800, 'The redesigned consult screen: an alert strip, results grouped with change tags such as worse and better, and the care plan beside them')], cap: 'After: alerts first, results tagged with what changed since last time, and the plan right beside them.' },
      ] },
      { nav: 'Insights', title: 'Five insights that shaped the design', blocks: [
        { t: 'changes', items: [
          { heard: 'Members want meaning, not numbers.', changed: 'The brand talks about life, not test scores.' },
          { heard: 'The most important issue was always at the bottom.', changed: 'The tool shows it first.' },
          { heard: 'Doctors had to remember which symptom matched which test result.', changed: 'The tool shows the link for them.' },
          { heard: 'Planning and reviewing were crammed onto one screen.', changed: 'Planning gets its own space.' },
          { heard: 'Each staff member starts with different information.', changed: 'Each person gets their own starting view.' }] },
        { t: 'question', label: 'the question I set out to answer', text: 'How might we help each person on the care team see what matters first, in the few minutes they have?' },
      ] },
      { nav: 'The brand', title: 'Science that feels human', lede: 'A brand that balances science and everyday life.', blocks: [
        { t: 'p', text: [
          'Science is the foundation. Life is the reason. The brand is built on six words: <b>energetic, human, curious, intelligent, optimistic and timeless</b>.',
          'It uses warm colours, bright highlights, real people and small touches of data. <mark>Not about fighting age. Not about fear. Not about extreme self-tracking.</mark> Anti-ageing becomes well ageing.'] },
        { t: 'images', layout: 'row', images: [im('span-wellaging', 1200, 1200, 'A man with his eyes closed, face turned to the sun, over the words “anti aging” crossed out and “well aging”'), im('span-eye', 843, 540, 'The four-cornered Span mark over a close-up of an eye')] },
        { t: 'p', title: 'The mark', text: ['Four corners frame a space, like a camera finding focus: seeing your health clearly. The corners also stand for the four parts of a long, healthy life: body, mind, habits and time.'] },
        { t: 'palette', fonts: [{ name: 'Manrope', note: 'Headlines, interface and numbers', css: 'Manrope, var(--f-body)', gf: 'Manrope:wght@500' }, { name: 'DM Serif Display', note: 'Emotional moments', css: '"DM Serif Display", Georgia, serif', gf: 'DM+Serif+Display' }], colors: ['#2A170F', '#326675', '#F3E5CE', '#F5B52F', '#D96B25', '#571416'] },
        { t: 'images', layout: 'row', images: [im('span-flowers', 400, 540, 'An older woman holding two orange flowers over her eyes'), im('span-note', 1278, 1596, 'A phone note against a sunset sky: we’re not here to prevent aging, we’re here to protect your energy, your curiosity and your momentum'), im('span-billboard', 1024, 828, 'A yellow Span Health sign reading “make more of your years” against a blue sky')],
          cap: '“We’re not here to prevent ageing. We’re here to protect your energy, your curiosity and your momentum.”' },
        { t: 'images', layout: 'row', images: [im('span-uniform', 2769, 776, 'A staff member in a brown Span Health polo shirt'), im('span-redglasses', 700, 825, 'An older woman in red sunglasses and a red jacket blowing a kiss')] },
      ] },
      { nav: 'The care tool', design: true, title: 'From one crowded screen to a guided day', lede: 'The redesign turns one crowded consult screen into a guided day, from the hub to the nutritionist handoff. I built it over five versions, and each one went back to doctors.', blocks: [
        { t: 'list', title: 'Where it started', items: [
          '<b>Nine panels of equal weight</b> and seven separate scroll areas on one screen.',
          'The priorities sat in the bottom-right corner, <mark>the last place the eye lands</mark>.',
          'Two empty drop zones took up the middle of the screen.',
          'How markers, symptoms and priorities connected only showed when you hovered.',
          'Made-up numbers, like a library match %, “+X years of healthspan” and trend lines that always went up.',
          'Mixed status labels, and capitals in a typewriter-style font that were hard to read.'] },
        { t: 'stats', items: [
          { n: 5, label: 'versions, each built from what doctors said about the last' },
          { n: 7, label: 'steps in a doctor’s day, instead of one screen' },
          { n: 3, label: 'versions of every note: the record, the nutritionist and the client' },
          { n: 0, label: 'made-up numbers left on screen' }] },
        { t: 'steps', ar: '16 / 10', cols: 4, title: 'A doctor’s day, step by step', intro: 'Finished steps get a check mark, so the doctor always knows where they are.', items: [
          { title: 'Hub', img: im('span-ui-hub', 2880, 1800, 'The hub: a greeting, today’s six consults as cards, and the doctor’s queue below'), body: 'It greets the doctor and shows today’s consults, their queue, what needs attention and their tasks. Urgent items are pinned to the top.' },
          { title: 'Prep', img: im('span-ui-prep', 2880, 1800, 'Consult prep: since the last consult, whether the last plan was followed, what changed, and the client’s allergies and medicines'), body: 'The whole client before they walk in: what changed since last time, whether the last plan was followed, and what to focus on.' },
          { title: 'Consult', img: im('span-ui-consult', 2880, 1800, 'The consult screen: alerts, results with change tags, and the care plan beside them'), body: 'The most important findings first, results beside the plan, and the recording running on the same page.' },
          { title: 'Care plan', img: im('span-ui-suggestions', 2880, 1800, 'The care plan with Assist’s suggestion tray open: each suggestion shows why it was made and the result behind it'), body: 'One plan, in its own tab. The prescription, the client’s day and the safety checks are all built from it.' },
          { title: 'Recording', img: im('span-ui-recording', 2880, 1800, 'Recording the consult, with a banner asking whether this is the right client for the booked time'), body: 'The recording runs on the client’s page, and a banner checks it’s the right client before anything is saved.' },
          { title: 'Doctor’s note', img: im('span-ui-note', 2880, 1800, 'The doctor’s note with sections, drafted text and a live phone preview of what the client will see'), body: 'Written once, in three versions: for the record, for the nutritionist and for the client’s app.' },
          { title: 'Finish and hand off', img: im('span-ui-finish', 2880, 1800, 'The finish checklist: plan saved, note drafted, final check passed and recording saved, before marking the consult complete'), body: 'The doctor closes the consult with a short checklist, and the nutritionist picks it up from a task with the context they need.' }] },
        { t: 'video', title: 'Watch: from the hub to the consult', src: 'assets/media/span-vid-day.mp4', poster: im('span-vid-day-poster', 1440, 900), w: 1440, h: 900, alt: 'Screen recording: the doctor opens a client from the hub, scrolls through prep, starts the consult and opens the overview', cap: 'Opening a client from the hub, reading prep, then starting the consult.' },
        { t: 'findings', title: 'Finding the right client', items: [
          { title: 'A client switcher with search', body: 'Today’s clients come first, then the ones opened recently, then A to Z. Every row shows the client’s ID and care team.' },
          { title: 'Prep and the client record stay separate', body: 'Prep is for the next half hour. The record is the whole history, grouped by consultation: what was found, what was recommended and what happened.' }] },
      ] },
      { nav: 'Reading results', title: 'The most important finding first, and every number real', blocks: [
        { t: 'p', text: ['The overview now reads top to bottom in one scroll: the clinical priorities, then the reasons, then the evidence, then everything else. <mark>Every number on screen comes from the client’s own data.</mark>'] },
        { t: 'feature', n: 1, title: 'The most important thing first',
          pain: 'The old screen gave <mark>nine panels the same weight</mark>, and the priorities sat in the bottom-right corner, the last place the eye lands.',
          solve: 'The overview reads top to bottom in one scroll: the clinical priorities, then the reasons, then the evidence.',
          img: im('span-ui-overview', 2880, 1800, 'The overview: three clinical priorities, each with its linked results and symptoms, beside what the client reported'), notes: [{ x: 8.6, y: 18.3, text: 'Alerts sit under the client’s name, on every tab' }, { x: 8.2, y: 41.3, text: 'The clinical priorities, ranked' }, { x: 41.5, y: 47, text: 'Each priority shows the results behind it' }, { x: 49.8, y: 41.3, text: 'What the client reported, beside the priorities' }],
          decisions: [{ d: 'Priorities first, evidence after', why: 'Doctors had only a few minutes before the client walked in, so the most important thing has to be the first thing they see.' }, { d: 'One status language: an icon and a word, never colour alone', why: 'Red used to mean two different things, so a borderline result could be read as critical.' }, { d: 'Every number comes from the client’s own data', why: 'The old screen had made-up numbers, like a library match score and trend lines that always went up.' }] },
        { t: 'more', summary: 'All the details of the results screen', blocks: [
          { t: 'findings', items: [
          { title: 'Priorities first', body: 'Each priority shows the markers and symptoms linked to it, then the body systems in order of concern, markers out of range, what the client reported and their vitals.' },
          { title: 'One status language', body: 'Every status has an icon and a word, never colour alone. A borderline result shows in muted amber with the exact gap to the healthy range.' },
          { title: 'Cards that match the lab', body: 'Each result shows its status, value and healthy range, sample date, trend and source, and can be pinned, re-run or edited. Reports use the same card.' },
          { title: 'Alerts on every tab', body: 'A strip under the client’s name, with buttons to acknowledge an alert or raise a ticket.' },
          { title: 'Results beside the plan', body: 'Three columns on wider screens, the scroll position remembered for each client, and a strip of pinned results with the doctor’s notes.' },
          { title: 'A view for each role', body: 'Doctors and nutritionists each get their own view, and nutritionists can’t prescribe. A second switch shows plain names the client can understand.' }] },
          { t: 'images', ui: true, layout: 'wide', images: [im('span-ui-split', 2880, 1800, 'Results side by side with the care plan and a library of areas of concern')], cap: 'Side by side: the plan and the library stay open next to the results.' }] },
      ] },
      { nav: 'Digital twin', title: 'A body map that points to the problem, not a puzzle to solve', lede: 'The digital twin places the client’s results on a 3D body: a dot for each body system, coloured by how much attention it needs. Clients respond to it, so it stayed. What changed is how it’s read.', blocks: [
        { t: 'stats', items: [
          { n: 7, unit: ' → 0', label: 'clicks to see every flagged body system' },
          { n: 2, unit: ' → 1', label: 'meanings for red: it now means critical everywhere' }] },
        { t: 'findings', title: 'What was wrong with it', items: [
          { title: 'Red meant two things', body: 'On the body, red meant “the lab results and the client’s answers both flag it”. On every card, red meant critical. So a dot could be red while its result was only worth a look.' },
          { title: 'Findings hid behind the dots', body: 'To learn what was flagged, the doctor clicked the dots one at a time, and each click changed two panels. For one client that was seven clicks for seven systems.' },
          { title: 'It took the best spot', body: 'Three columns of equal weight, with the body in the middle, and no clear place to start.' }] },
        { t: 'images', ui: true, layout: 'wide', images: [im('span-ui-twin', 2880, 1800, 'The digital twin card: a warm gold body on espresso with coloured dots for each body system, the heart rate, biological age and pace of ageing at the top, and the cardiovascular results beside it')], cap: 'Pick a dot, or a system below the body, and its score and results open right beside it.' },
        { t: 'findings', title: 'What changed', items: [
          { title: 'One colour meaning', body: 'Dots use the same words as everywhere else: critical, out of range, optimal, from a wearable, or not tested. Whether the lab and the answers agree is written in words.' },
          { title: 'The list comes first', body: 'The ranked list of what needs attention leads. The twin is its own section the doctor can open or fold away, so it supports the list instead of hiding it.' },
          { title: 'Results beside the body', body: 'Choosing a system shows its score and the result cards for it, the same cards used across the tool.' },
          { title: 'Full screen for the client', body: 'One click fills the screen, zooms in on the system and floats its readings beside the body. It’s made for turning the screen towards the client.' }] },
        { t: 'images', ui: true, layout: 'wide', images: [im('span-ui-twin-full', 2880, 1800, 'The digital twin in full screen, zoomed in on the thyroid, with a floating card showing TSH and free T3 out of range')], cap: 'Full screen, zoomed in on the thyroid, with its two results floating beside the body.' },
        { t: 'video', title: 'Watch: the digital twin', src: 'assets/media/span-vid-twin.mp4', poster: im('span-vid-twin-poster', 1440, 900), w: 1440, h: 900, alt: 'Screen recording: the doctor opens the digital twin, picks the thyroid and metabolic systems, rescans the body, then opens it full screen and picks two more systems', cap: 'Picking systems, a rescan, then full screen with the readings beside the body.' },
      ] },
      { nav: 'Prep', fold: true, title: 'The whole client, before they walk in', blocks: [
        { t: 'p', text: ['Prep shows the whole client, good and bad, so doctors don’t jump between pages. It answers the question repeat clients raised most: <mark>what changed since last time?</mark>'] },
        { t: 'findings', items: [
          { title: 'Since the last consult', body: 'Alerts, what changed, and whether the last plan was followed, in one short brief. “What to focus on” is open by default.' },
          { title: 'About the client', body: 'Allergies, medicines and conditions first, then their job, work pattern, smoking, alcohol and family history. A blank says “Not answered”, so nothing looks missing by mistake.' },
          { title: 'The questionnaire at a glance', body: 'All 13 sections, concerns first and “Going well” last. Each card opens in place, and “May explain” opens the related result beside the plan.' },
          { title: 'Updating an answer', body: 'A doctor can update a questionnaire answer with a reason. The original is kept, and the scores update. Anything new the client mentions in the room can be added too.' },
          { title: 'Journal charts that explain themselves', body: 'Each chart shows which way is better and the days to look at, with a one-line summary like “High on 9 of 30 days, mostly work days”.' }] },
        { t: 'images', ui: true, layout: 'wide', images: [im('span-ui-prep-check', 2880, 1800, 'The questionnaire at a glance: concerns first, each with what may explain it, then what to focus on')], cap: 'The questionnaire at a glance, concerns first, and the four things to focus on.' },
      ] },
      { nav: 'Care plan', title: 'Write one plan. The rest builds itself.', blocks: [
        { t: 'p', text: ['Writing the plan was the slowest part of every consult. Now doctors write one plan, and <mark>the prescription, the client’s day and the safety checks all come from it</mark>. It saves automatically, and every change can be undone.'] },
        { t: 'feature', n: 2, title: 'One plan, everything else built from it',
          pain: 'Writing the plan was the slowest part of every consult. <mark>A 30-minute slot became about 45.</mark>',
          solve: 'Doctors write one plan. The client’s day, the prescription and the safety checks all build themselves from it.',
          img: im('span-ui-plan-check', 2880, 1800, 'The care plan with five supplements, one flagged by the safety check because ashwagandha is usually avoided in a possible pregnancy'), notes: [{ x: 8.2, y: 15.6, text: 'The results stay beside the plan' }, { x: 80.3, y: 9.6, text: 'Assist’s suggestions, each with its reason' }, { x: 73.6, y: 34.3, text: 'Items Assist added are marked AI' }, { x: 54.5, y: 46.2, text: 'The safety check flags a clash before anything is sent' }],
          decisions: [{ d: 'A first draft, with reasons', why: 'AI only helped doctors when it showed its context. Without it, the advice was too general to use.' }, { d: 'A safety check before sending', why: 'Small mistakes made doctors stop trusting the tool and double-check everything.' }, { d: 'If nothing matches, add it as new', why: 'In testing, the doctor looked for a supplement the library didn’t have and hit a dead end.' }] },
        { t: 'video', title: 'Watch: Assist drafts the plan', src: 'assets/media/span-vid-assist.mp4', poster: im('span-vid-assist-poster', 1440, 900), w: 1440, h: 900, alt: 'Screen recording: Assist suggests templates, the doctor adds them, accepts the advice, sees a safety check, then opens My day and the prescription', cap: 'Templates, then suggestions with reasons, a safety check, and the same plan as the client’s day and as a prescription.' },
        { t: 'more', summary: 'All the details of the care plan', blocks: [
          { t: 'findings', items: [
          { title: 'One box that finds everything', body: 'Type to add a medicine, supplement, test or advice. Keyboard shortcuts switch section, and if nothing matches, it offers to add it as something new.' },
          { title: 'A first draft, with reasons', body: 'The AI assistant drafts the plan from the results, symptoms, alerts, questionnaire and past visits. Each suggestion says why it was added and where that came from.' },
          { title: 'Tests with a date', body: 'Every test has a timing and a due date, and the front desk sees its list grouped by date, so nothing is booked too early.' },
          { title: 'No dose, no send', body: 'A supplement without a dose asks for one, or for the health coach to add it, and the plan can’t be sent until it’s done.' },
          { title: 'The right product, in stock', body: 'The right brand and link for the client’s country fill in, a brand swap keeps the dose, and each item shows whether the clinic has it in stock.' },
          { title: 'A safety check before sending', body: 'Dose limits, medicines that clash with supplements, things to avoid with a condition, and pairs to take apart. Sending stays locked until each one is fixed, or kept with a reason.' }] },
          { t: 'images', ui: true, layout: 'row', images: [im('span-ui-templates', 2880, 1800, 'Assist’s template picker: two chosen templates and the five supplements they add'), im('span-ui-myday', 2880, 1800, 'My day: the plan laid out from waking up to evening, each item movable')], cap: 'Assist’s templates, and the same plan as the client’s day.' },
          { t: 'images', ui: true, layout: 'row', images: [im('span-ui-rx', 2880, 1800, 'The prescription built from the plan: each supplement with dose, timing and duration'), im('span-ui-stock', 2880, 1800, 'The clinic stock panel beside the plan')], cap: 'The prescription builds itself from the plan, with the clinic’s stock one click away.' }] },
      ] },
      { nav: 'Recording and notes', title: 'Record once, write once, reach everyone', blocks: [
        { t: 'p', text: ['Every doctor was recording in another app and pasting notes back in. The recording now lives on the client’s page and <mark>goes straight into the note</mark>, with checks so it never lands on the wrong client.'] },
        { t: 'feature', n: 3, title: 'Record once, write once',
          pain: 'The built-in voice note missed too much, so doctors <mark>recorded in another app</mark> and pasted notes back in.',
          solve: 'The recording lives on the client’s page and goes straight into one note, written for the record, the nutritionist and the client.',
          img: im('span-ui-note', 2880, 1800, 'The doctor’s note, written for the client, beside a live phone preview of what the client will see'), notes: [{ x: 8, y: 38.2, text: 'The note’s sections, and which are done' }, { x: 23.3, y: 37.8, text: 'One note, three versions: client, record, nutritionist' }, { x: 57.6, y: 37.8, text: 'Drafted from the findings the doctor confirmed' }, { x: 73.3, y: 44.5, text: 'A live preview of what the client will see' }],
          decisions: [{ d: 'A check that it’s the right client', why: 'Small mistakes, like a visit logged with the wrong date, made doctors stop trusting the tool.' }, { d: 'One note, three versions', why: 'Her notes never reached the client’s app, so she couldn’t answer the client’s questions later.' }, { d: 'The summary goes into the note with one button', why: 'Doctors were finding AI notes in their email, cleaning them up with their own prompt and pasting them in.' }] },
        { t: 'video', title: 'Watch: from recording to the doctor’s note', src: 'assets/media/span-vid-record.mp4', poster: im('span-vid-record-poster', 1440, 900), w: 1440, h: 900, alt: 'Screen recording: the doctor records the consult, confirms the client, stops, opens the summary, then writes the doctor’s note with a phone preview', cap: 'Record, confirm it’s the right client, stop, then write the note with the client’s phone preview beside it.' },
        { t: 'more', summary: 'All the details of recording and notes', blocks: [
          { t: 'findings', items: [
          { title: 'Recording with a live transcript', body: 'Right on the consult page. It works with consults in mixed languages, like Telugu and English, and can bring in a recording from the app doctors already use.' },
          { title: 'Playback and summary', body: 'Play it back at normal, 1.5× or 2× speed, edit the summary lines, and send them to the doctor’s note with one button, with no copying and pasting.' },
          { title: 'Never the wrong client', body: 'It checks the booked time, shows a red strip while recording on other screens, warns when you switch clients, and lets you move a recording with undo.' },
          { title: 'Symptoms with detail', body: 'Each symptom now has when it started and how severe it is, the two things doctors always asked about.' },
          { title: 'One note, three readers', body: 'The note is written once, in versions for the record, the nutritionist and the client’s app, with a live phone preview of what the client will see.' },
          { title: 'A careful note for urgent alerts', body: 'Words that shouldn’t be used are highlighted as you type, with one clear next step for the client, and the note can be sent for review.' }] },
          { t: 'images', ui: true, layout: 'row', images: [im('span-ui-summary', 2880, 1800, 'After recording: playback at 1×, 1.5× or 2× and the summary'), im('span-ui-note-flag', 2880, 1800, 'A red flag note for an urgent alert: one clear call to action and words to avoid highlighted')], cap: 'Playback and summary, and the careful note for an urgent alert.' }] },
      ] },
      { nav: 'Finish and look', fold: true, title: 'Calm to look at, and finished where you are', blocks: [
        { t: 'columns', items: [
          { title: 'Finishing the consult', items: ['“Finish consult” with a short checklist, right on the consult page', '“No-show” with a reason, and a button to ask the front desk to rebook', 'The hub updates straight away'] },
          { title: 'The nutritionist handoff', items: ['A task with the context the nutritionist needs', 'Their nutrition plan, then the doctor unlocks the client’s app', 'Today’s visit shows in the record: answer updates, safety alerts kept with a reason, and the handoff’s progress'] },
          { title: 'Look and feel', items: ['The brand’s colours and type, with sentence-case labels instead of hard-to-read capitals', 'Less text, one-line banners, and nothing repeated on screen', 'Dark mode, keyboard shortcuts with a help button, and “/” to search', 'Clear hover and focus states on every control', 'Works from phone to desktop without sideways scrolling'] }] },
      ] },
      { nav: 'Around the consult', fold: true, title: 'The record, tickets and a dark mode', blocks: [
        { t: 'images', ui: true, layout: 'row', images: [im('span-ui-record', 2880, 1800, 'The client record: every visit grouped by consultation, with what was found and recommended'), im('span-ui-tickets', 2880, 1800, 'Tickets: open issues by status, waiting for the relationship manager’s call, or past their deadline')], cap: 'The client record, grouped by consultation, and the tickets the care team works through.' },
        { t: 'images', ui: true, layout: 'wide', images: [im('span-ui-dark', 2880, 1800, 'The consult screen in dark mode, in Span’s warm espresso tones')], cap: 'Dark mode, in the brand’s espresso and gold.' },
      ] },
      { nav: 'How it evolved', fold: true, title: 'Five versions, each one built from what doctors said', blocks: [
        { t: 'steps', items: [
          { n: 'September', title: 'Version 1: from the review of the old screen', body: 'The step-by-step day, the hub, the priority-first overview, result cards that match the lab, the care plan tab, the AI draft, review and send, and the client record.' },
          { n: 'Sep 30', title: 'Version 2: the simpler results page', body: 'Priorities first, one meaning for each colour, and tabs that look like tabs. This is where the results page got 47% shorter.' },
          { n: 'Oct 16', title: 'Version 3: from shadowing doctors', body: 'The prep brief, AI suggestions as cards, recording, the three-version note, the brand, shortcuts, and the first passes to calm the screen down.' },
          { n: 'Oct 17 to 22', title: 'Version 4: from a ten-point product brief', body: 'The alerts strip, better side by side, borderline results, dose handover, test due dates, symptom detail, the client switcher, and the doctor’s note as its own step.' },
          { n: 'Oct 23 to 24', title: 'Version 5: from a doctor feedback session', body: 'Recording playback and summary, wrong-client checks, the whole client on prep, answer updates, plan to prescription, products by country, stock, the safety check, consult status and the nutritionist handoff.' }] },
        { t: 'p', text: ['Every version is kept as its own file, so doctors can compare it with the one before. Before each one went back to them, <mark>I clicked through every doctor task and fixed what broke.</mark>'] },
      ] },
      { nav: 'Testing it', title: 'Testing the redesign against the tool doctors use today', lede: 'An A/B test: the same doctor runs a consult on the current tool (A), then on my redesign (B), thinking out loud while I record the screen.', blocks: [
        { t: 'stats', items: [
          { n: 43, unit: '%', label: 'less time writing the plan with AI help: 10:09 on the redesign, 17:48 on the current tool' },
          { n: 1, unit: ' of 1', label: 'doctors so far would use the redesign for real consults' },
          { n: 1, unit: ' of 2', label: 'consults she could close, and it was the redesign’s' }] },
        { t: 'table', title: 'Task by task, for the first doctor', head: ['Task', 'Current tool (A)', 'Redesign (B)', 'Screen switches'], rows: [
          ['Prep: name the top 3 focus areas', 'Done in 2:44, after 1:51 spent finding the client', 'Done in 2:39. Prep opened first', '5 → 2'],
          ['What changed since last visit', 'Not done: “I’m not sure how to check her last visit”', 'Skipped: a first consult', '2 → none'],
          ['Write the plan, with AI help', 'Done in 17:48', 'Done in 10:09, with the final check passed', '18 → 14'],
          ['Recording to note, close the consult', 'Not done: the voice note “doesn’t transcribe much”', 'Done, with one hint to “mark complete”', '7 → 4']],
          note: 'Screen switches count page and tab changes, read from the recording one frame every 10 seconds. The two versions used different clients, so treat the gaps as direction, not size.' },
        { t: 'quotes', items: [
          { q: 'When I opened I got like a prep directly, so I didn’t have to rush into anything.', who: 'D1, on prep opening first' },
          { q: 'It’s taking me exactly like how my mind works, like how the doctor thinks.', who: 'D1' },
          { q: 'Perfect, yeah, this is what I want… this is all I need.', who: 'D1, on side by side' },
          { q: 'It’s lighter on the head… the number of clicks were very few… and also typing, I didn’t really type much.', who: 'D1, at the end' }] },
        { t: 'columns', items: [
          { title: 'What the redesign does better', tone: 'key', items: ['Prep is the first screen, so she had her focus areas in under three minutes', 'Prep and consult share one page, so there’s no hunting for screens', 'Reports sit right after the results they explain', 'She judged 22 AI suggestions one by one, turning down three', 'Stock in view while prescribing', 'My day and side by side, which she called “all I need”'] },
          { title: 'What the current tool still does better', items: ['Templates the doctor steers, adding ones the AI missed', 'Combination products, with their ingredients', 'A check for clashing food protocols', 'Adding a product the library doesn’t stock', 'Editing dose and timing on every line, wherever the plan appears', 'The original report itself, and the full list of results'] }] },
        { t: 'changes', title: 'What I changed the next day', items: [
          { heard: '“I asked you to add D, but it didn’t pick up D.” Accepting a concern looked like accepting the treatment.', changed: 'Every Accept now says what it adds, and a concern shows the treatment drafted for it.' },
          { heard: '“I want a supplement called [it]. It’s not there.” The library stopped at “Nothing matches”.', changed: '“Nothing matches” now offers to add it as a new supplement, medicine or test.' },
          { heard: '“For me, where were we left off?” She lost her place after the note.', changed: 'The note has a clear way back to the consult.' },
          { heard: '“I don’t have a cortisol level, so I don’t know if I can add it.” The result was on file but not on the card.', changed: 'Each suggestion shows the results behind it, or says when there’s none on file.' },
          { heard: '“It is just picking up the abnormal ones.”', changed: 'Prep can show all results, not only the ones out of range.' }] },
        { t: 'p', text: [
          'Her biggest request is still open: changing a dose wherever she sees the plan. My day can now do it, the prescription can’t yet.',
          'This is one doctor, on two different clients, and one test doesn’t make a verdict. <mark>Three more doctors are next</mark>, on matched clients with an earlier visit each, so “what changed” can be tested in both versions.'] },
      ] },
      { nav: 'What’s next', fold: true, title: 'What I still want to find out', blocks: [
        { t: 'list', items: [
          'The next three A/B sessions, with ease scored after every task and the same plan handed to each doctor.',
          'The time between visits: results clients send in and calls with their health coach never reach the doctor before a review. Neither version covers it yet.',
          'After the changes, do prep and finishing times drop compared with what I measured before?',
          'Do other newer doctors use prep the way the one I shadowed did?',
          'How many minutes does writing the plan take now, across more consults?'] },
      ] },
    ],
    quote: 'Doctors weren’t missing information. They were rebuilding each client’s story by hand, across three screens and two other apps, in a thirty-minute slot.',
    learning: 'Keep the redesign out of the room. When I only wrote down what I saw, not what I thought it meant, the patterns that came out were the doctors’, not mine.',
  },

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
    ov: {
      impactTitle: 'Research on the shop floor',
      impact: [
        { n: 12, label: 'shoppers interviewed' },
        { n: 7, label: 'stores observed' },
        { n: 90, unit: '%', label: 'of people who browse in a store leave without buying' }],
      outcomeTitle: 'What it changes',
      outcome: 'A shopper’s shade, the products they tried and what suited them now follow them from the store mirror to their phone, so buying online starts from what already worked.',
      part: 'A solo project: research on the shop floor, the service across the store and home, and the screens for the mirror and the app.',
      walk: [
        { img: im('mthd-research-1', 430, 695, 'Store visit in Chandigarh: a beauty advisor at a makeup counter shows a customer shade swatches'), line: 'In <mark>seven stores</mark>, shoppers found their shade, then lost it on the way home.' },
        { img: im('mthd-insights', 1920, 1502, 'Research insights board'), line: 'The pattern: <mark>the store has no memory</mark>, and people can’t judge their own skin.' },
        { img: im('mthd-kiosk-photo', 1122, 1402, 'A shopper using the Skin Story mirror kiosk in an MTHD store'), line: 'A smart mirror <mark>scans your skin</mark> instead of asking you to describe it.' },
        { img: im('mthd-kiosk-1', 594, 785, 'MTHD kiosk on a tablet: a live face scan with suggested foundation shades'), line: 'Tap each product on the reader and it’s <mark>saved to your visit</mark>.' },
        { img: im('mthd-mobile-3', 1792, 2356, 'MTHD app skin profile with saved good shades and recommended products'), line: 'Scan a code and the visit <mark>carries on at home</mark>, with your shade picked.' },
        { img: im('mthd-store', 1840, 966, 'MTHD store render'), line: 'The mirror at the counter, <mark>calm like skincare</mark>, not loud like a sale.' }],
    },
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
      { nav: 'The market', fold: true, title: 'A booming market that keeps selling people the wrong thing', blocks: [
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
        { t: 'papers', items: [{ label: 'Store visit', img: im('mthd-research-1', 430, 695, 'Store visit in Chandigarh: a beauty advisor at a makeup counter shows a customer shade swatches') }, { label: 'A shopper testing', img: im('mthd-research-2', 430, 695, 'Observing a shopper trying products in a busy Chandigarh beauty store') }, { label: 'Tester trays', img: im('mthd-research-3', 430, 695, 'A lipstick tester held up over trays of shades') }, { label: 'My research board', img: im('mthd-insights', 1920, 1502, 'Research insights board') }], note: 'Store visits in Chandigarh, and my research board. Open any of them to see it full size.' },
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
            'No single source of beauty advice is fully trusted, so shoppers piece decisions together from several unreliable ones and still feel unsure after buying.'] }] },
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
      { nav: 'The journey', fold: true, title: 'One shopper, from a reel to the right foundation', blocks: [
        { t: 'steps', layout: 'zig', items: [
          { title: 'Discovery', img: im('mthd-stage-1', 1024, 559, 'Storyboard: Ananya sees a Skin Story reel on her phone at home'), body: 'Ananya is scrolling Instagram when she sees a creator using the MTHD Skin Story kiosk at Nykaa. It identifies undertones and matches products instantly. She’s bought the wrong foundation before, so she taps through. The message is simple: “Stop guessing your shade. Create your Skin Story in-store.” She heads to the nearest store for a free skin scan.' },
          { title: 'In the store', img: im('mthd-stage-2', 1024, 559, 'Storyboard: an advisor welcomes Ananya at the Skin Story kiosk'), body: 'Near the entrance she finds the Skin Story kiosk. An advisor welcomes her and offers to create her profile. She enters her phone number, scans a QR code, and the kiosk asks about her skin concerns, makeup preferences and skin sensitivity.' },
          { title: 'Trying products', img: im('mthd-stage-3', 1024, 559, 'Storyboard: Ananya taps foundations on the kiosk scanner'), body: 'She picks up three foundations she’s been researching online and taps each one on the kiosk’s scanner. Instead of generic product information, she sees how each one works for her skin.' },
          { title: 'Taking it home', img: im('mthd-stage-4', 1024, 559, 'Storyboard: Ananya scans a QR code to move her visit to the app'), body: 'Her whole visit moves to the MTHD app: her new Skin Story profile, the products she tested and her recommended shade matches. Nothing is lost. The store visit carries on digitally.' },
          { title: 'Buying', img: im('mthd-stage-5', 1024, 559, 'Storyboard: that evening, Ananya buys the recommended shade in the app'), body: 'That evening she opens the app. One recommendation sits at the top: Rare Beauty foundation, shade 235W, because it matches her undertone, suits an oily T-zone and has a low risk of oxidising (darkening on the skin). The shade is already selected.' }] },
      ] },
      { nav: 'Design', design: true, title: 'Designed to feel like skincare, not a sale', blocks: [
        { t: 'feature', n: 1, title: 'It reads your skin, not your guess',
          pain: 'Every quiz and app asks shoppers to describe their skin, but <mark>how people see their skin</mark> and how it behaves are two different things.',
          solve: 'A skin scan in the mirror finds your undertone and shade.',
          img: im('mthd-kiosk-photo', 1122, 1402, 'A shopper using the Skin Story mirror kiosk in an MTHD store'),
          decisions: [{ d: 'A scan, not a quiz', why: 'People can’t judge their own skin, so a quiz starts every match on a guess.' }, { d: 'An advisor beside the mirror', why: 'Every store had knowledgeable staff, but their advice was never recorded or passed on.' }] },
        { t: 'feature', n: 2, title: 'It keeps track of what you try',
          pain: 'Shoppers test product after product, and <mark>the store forgets</mark> which one worked the moment they walk out.',
          solve: 'Tap each product on the reader and it’s saved to your visit, side by side with the others you tested.',
          img: im('mthd-kiosk-1', 594, 785, 'MTHD kiosk on a tablet: a live face scan with suggested foundation shades'),
          decisions: [{ d: 'Tap to save, nothing to type', why: 'Shoppers already gather advice from many places, and nothing connects them.' }, { d: 'The advisor’s note saved with the visit', why: 'The experts’ knowledge vanished when the shopper left the counter.' }] },
        { t: 'feature', n: 3, title: 'It carries on at home',
          pain: '<mark>90% of people</mark> who browse in a store leave without buying, and at home they can’t remember the shade.',
          solve: 'Scan a QR code and the whole visit moves to the app, with the advisor’s note and your shade already picked.',
          img: im('mthd-mobile-3', 1792, 2356, 'MTHD app skin profile with saved good shades and recommended products'),
          decisions: [{ d: 'One skin profile, in the store and at home', why: 'The store has no memory. The profile becomes it.' }, { d: 'Good shades saved to your profile', why: 'Shoppers who couldn’t remember the shade bought a lookalike online, and it was wrong.' }] },
        { t: 'p', text: [
          'The MTHD identity is deliberately restrained: a muted rose-grey palette, a bold sans-serif wordmark and a neutral sans-serif for all interface text. It feels closer to skincare packaging than a typical beauty app.',
          'That was intentional. <mark>An AI that makes confident claims about your skin can’t afford to look excitable.</mark> The look has to match the claim, and precision calls for restraint.'] },
        { t: 'images', layout: 'wide', images: [im('mthd-store', 1840, 966, 'MTHD store render')], cap: 'The MTHD store, with the Skin Story kiosk at the counter.' },
        { t: 'more', summary: 'See every screen', blocks: [
          { t: 'images', layout: 'phones', title: 'The kiosk', images: [im('mthd-kiosk-1', 594, 785, 'MTHD kiosk on a tablet: a live face scan with suggested foundation shades'), im('mthd-kiosk-2', 587, 785, 'MTHD kiosk mapping points across a face during a skin scan'), im('mthd-kiosk-3', 587, 785, 'MTHD kiosk result: a matched foundation with a buy-now button')],
          cap: 'The kiosk: a live skin scan with suggested shades, the face mapping, and the matched foundation.' },
          { t: 'p', title: 'The kiosk in the store', text: ['A floor-standing unit with a curved matte-white body and a thin rose-coloured strip. The top two-thirds is a face-height mirror with an adjustable LED ring that can recreate daylight, office lighting, camera flash and outdoor light. The bottom third is a flush touchscreen, with a tap-to-scan product reader on the right, frosted privacy panels on either side, and a small curved desk where the advisor sits with a tablet.'] },
          { t: 'images', layout: 'phones', title: 'The app', images: [im('mthd-mobile-1', 496, 527, 'MTHD app home, “Every skin tells a story”, with routine categories and recommendations'), im('mthd-mobile-2', 598, 785, 'MTHD app home screen on a sculpted stand'), im('mthd-mobile-3', 1792, 2356, 'MTHD app skin profile with saved good shades and recommended products'), im('mthd-mobile-4', 597, 785, 'MTHD app skin profile, second view')],
          cap: '“Every skin tells a story. We just help it glow.” The home screen and the skin profile.' }] },
      ] },
      { nav: 'Does it hold up?', fold: true, title: 'People want it, stores gain from it, and it can be built today', blocks: [
        { t: 'columns', items: [
          { title: 'People want it', body: 'Shoppers in every interview described the exact problem Skin Story solves, in their own words, without prompting. Sophiya described testing and forgetting; Daisy, standing in a store unsure what to pick; Guneet, wanting a tool that truly understood her skin. Browsing in store and buying online wasn’t a conscious choice in any of the seven stores. The system gave people no alternative.' },
          { title: 'Stores gain from it', body: 'Today stores pay for the whole decision (staff, space, testers, fixtures) without getting the sale. Skin Story makes them part of a guided journey, with three direct benefits: more sales in store, fewer returns because purchases match the shopper’s real profile, and loyalty built over many visits. Brands finally see not just what sold but whether it worked, and advisors’ expertise becomes something the business can see and reward.' },
          { title: 'It can be built today', body: 'Every part already exists. AI skin analysis is mature (Perfect Corp’s YouCam engine reads skin tone in real time), tap-to-scan product tags are standard in retail, QR handovers are everywhere, and foundation brands already keep shade databases. The new part is putting them together around a person, which is a design problem, not an engineering one.' }] },
      ] },
      { nav: 'What’s next', fold: true, title: 'From one store to a profile that works everywhere', blocks: [
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
    ov: {
      outcome: 'Delivery updates, contract progress and payments now sit in one app, so farmers and buyers share one picture and can work together directly, without a middleman taking a cut.',
      part: 'A team of two. I worked on the research, the brand and the screens.',
      walk: [
        { img: im('kheyt-research-1', 484, 466, 'Interviewing a farmer in his field with paper prototypes'), line: 'On the farms, crops were <mark>sold straight after harvest</mark>, at whatever price was offered.' },
        { img: im('kheyt-toolkit', 1195, 896, 'The sorting toolkit: a three-section box with picture cards of a person, a cow and a bin, and vegetable cards'), line: 'Instead of surveys, farmers <mark>sorted picture cards</mark> of vegetables by freshness.' },
        { img: im('kheyt-kiosk', 2203, 1239, 'Kheyt kiosk screen in Punjabi listing onion, tomato, cucumber and capsicum offers, with buttons to take or turn down an offer'), line: 'A village kiosk shows <mark>what restaurants want</mark>, and at what price, in Punjabi.' },
        { img: im('kheyt-models-1', 2304, 1336, '3D model of the low-electricity brick storage unit under a sloped roof'), line: 'A brick store keeps the harvest <mark>cool without electricity</mark>.' },
        { img: im('kheyt-mobile-1', 474, 1026, 'Kheyt home: an upcoming beetroot delivery, past deliveries and a contract snapshot'), line: 'Restaurants <mark>follow every crate</mark>, from harvested to delivered.' },
        { img: im('kheyt-test-1', 1170, 1543, 'Testing the idea with a farmer outside his house'), line: 'Testing changed it: <mark>regional languages</mark>, and a fingerprint login instead of a card.' }],
    },
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
        { t: 'papers', items: [{ label: 'The toolkit', img: im('kheyt-toolkit', 1195, 896, 'The sorting toolkit: a three-section box with picture cards of a person, a cow and a bin, and vegetable cards') }, { label: 'Cards, sorted', img: im('kheyt-toolkit-mat', 904, 768, 'Vegetable cards sorted into the toolkit on a woven mat') }, { label: 'Session one', img: im('kheyt-session-1', 432, 768, 'A farmer and a researcher going through the toolkit outside a house') }, { label: 'Session two', img: im('kheyt-session-2', 432, 768, 'A researcher showing picture cards to a farmer in a field') }, { label: 'Session three', img: im('kheyt-session-3', 432, 768, 'Two farmers sorting cards with a researcher in a field') }], note: 'The toolkit, and sorting sessions with farmers in Ambala, Haryana. Open any of them to see it full size.' },
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
        { t: 'steps', fold: 'See the whole story, scene by scene', ar: '4 / 3', title: 'The journey across the system', items: [
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
      { nav: 'The system', design: true, title: 'Built for the village first', blocks: [
        { t: 'feature', n: 1, title: 'Grow what’s already sold',
          pain: 'Farmers can’t see what buyers need, so they <mark>sell straight away</mark>, at whatever price they’re offered.',
          solve: 'A kiosk at a common point in the village shows live demand: the crop, the quantity, the price per kilo and how far away the buyer is.',
          img: im('kheyt-kiosk', 2203, 1239, 'Kheyt kiosk screen in Punjabi listing onion, tomato, cucumber and capsicum offers, with buttons to take or turn down an offer'),
          decisions: [{ d: 'Two big buttons: take the offer, or turn it down', why: 'When reading is hard, one main action per screen matters more than more information.' }, { d: 'In the farmers’ language, with a photo of each crop', why: 'In testing, the language was a barrier for some farmers.' }] },
        { t: 'feature', n: 2, title: 'Keep the harvest without power',
          pain: 'Farmers have <mark>nowhere to store a harvest</mark>, and part of every harvest is left to spoil.',
          solve: 'A brick and clay store, with water running through pipes in its walls, keeps produce cool without electricity.',
          img: im('kheyt-models-1', 2304, 1336, '3D model of the low-electricity brick storage unit under a sloped roof'),
          decisions: [{ d: 'Cooled by water, not electricity', why: 'So farmers can wait for the right buyer instead of selling on the day.' }, { d: 'Kept in after testing', why: 'Farmers showed strong interest in storage, and said they’d pay for it.' }] },
        { t: 'feature', n: 3, title: 'Track every crate',
          pain: 'Even with a deal in place, communication fell apart after signing: <mark>no delivery updates</mark> and no shared record.',
          solve: 'Restaurants request contracts, follow each delivery from harvested to packed, shipped and delivered, and raise an issue in one tap.',
          img: im('kheyt-app-hand', 1024, 1536, 'A hand holding a phone with the Kheyt app in a restaurant kitchen'),
          decisions: [{ d: 'One tracker for every crop', why: 'With no signal that crops were ready and no shared record, the two sides couldn’t settle disagreements.' }, { d: 'Green as the only action colour', why: 'Green reads everywhere as confirmed or safe, which makes each decision easier in the stressful days of harvest.' }] },
        { t: 'p', title: 'The look', text: ['The visual language stays deliberately minimal: clean white surfaces, DM Sans throughout, and green as the only action colour, chosen because green reads everywhere as <mark>“confirmed” or “safe”</mark>, which makes each decision easier in the stressful days of harvest.'] },
        { t: 'images', layout: 'wide', images: [im('kheyt-brand', 2798, 1482, 'Kheyt brand identity')], cap: 'The Kheyt identity.' },
        { t: 'images', layout: 'row', images: [im('kheyt-crate-1', 2048, 2048, 'A Kheyt crate of beetroot and radishes in a ploughed field'), im('kheyt-crate-2', 2048, 2048, 'A Kheyt crate of peppers in a ploughed field'), im('kheyt-crate-3', 2048, 2048, 'A Kheyt crate of cucumbers in a ploughed field')], cap: 'Kheyt crates, straight from the field.' },
        { t: 'more', summary: 'See every part of the system', blocks: [
          { t: 'p', title: 'The village kiosk', text: ['A physical kiosk shows live demand from buyers, so farmers can decide what to grow and how much. Each offer shows the crop, the quantity, the price per kilo and how far away the buyer is, with two big buttons: <b>take the offer</b> or <b>turn it down</b>. It’s written in the farmers’ language, with large type and a photo of each crop.'] },
          { t: 'images', layout: 'wide', images: [im('kheyt-kiosk', 2203, 1239, 'Kheyt kiosk screen in Punjabi listing onion, tomato, cucumber and capsicum offers, with buttons to take or turn down an offer')], cap: 'The kiosk screen, in Punjabi: this month’s offers from nearby restaurants.' },
          { t: 'p', title: 'The cool store', text: ['A storage room built from brick and clay that keeps produce cool without electricity, so farmers can wait for the right buyer instead of selling on the day.'] },
          { t: 'list', items: ['A wooden roof protects it from rain.', 'Wooden and concrete pillars keep it stable.', 'PVC pipes between the bricks circulate water.', 'A brick and clay base gives it strength and keeps it cool.'] },
          { t: 'images', layout: 'row', images: [im('kheyt-models-1', 2304, 1336, '3D model of the low-electricity brick storage unit under a sloped roof'), im('kheyt-models-2', 929, 1336, '3D model of the village kiosk: a wooden stand holding a tilted touchscreen')], cap: '3D models of the cool store and the village kiosk.' },
          { t: 'p', title: 'The restaurant app', text: ['Restaurant owners open the app, land on a dashboard, choose what to do and dig into the details: upcoming deliveries, past orders, a snapshot of their contracts, and a tracker that follows each crop from harvested to packed, shipped and delivered. They can download an invoice or raise an issue from the same screen.'] },
          { t: 'images', layout: 'phones', images: [im('kheyt-mobile-1', 474, 1026, 'Kheyt home: an upcoming beetroot delivery, past deliveries and a contract snapshot'), im('kheyt-mobile-2', 474, 1026, 'Kheyt welcome screen with log-in and sign-up buttons'), im('kheyt-mobile-3', 474, 1026, 'Kheyt “Request new contract” screen: a grid of crops with prices per kilo')],
          cap: 'Home, sign in, and requesting a new contract.' }] },
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
      { nav: 'Business model', fold: true, title: 'Who pays, who gains, and how it grows', blocks: [
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
    ov: {
      impactTitle: 'The problem in numbers',
      impact: [
        { n: 68, unit: '%', label: 'of policyholders surveyed had never read their policy in full' },
        { n: 14, label: 'calls, on average, to chase one claim' },
        { n: 50, unit: '%', label: 'of people wait 6–48 hours to leave hospital on a cashless claim' }],
      outcome: 'By leading with what the cover includes, letting people act straight away and answering questions when they come up, Intact gives people control at every stage, not just at claim time.',
      part: 'My part: the research, the brand and the app, built with AI coding tools.',
      walk: [
        { img: im('intact-reimb-2', 1024, 559, 'Illustration: she and her father go through a long checklist of documents'), line: 'Following claims start to finish: <mark>four moments of peak anxiety</mark>, from diagnosis to a part-paid claim.' },
        { img: im('intact-key-screens', 1156, 718, 'Intact app map: the home dashboard branching into policy, claims, AI assistant, hospitals, profile and documents'), line: 'Everything sits <mark>one tap from home</mark>: the policy, claims, the assistant and hospitals.' },
        { img: im('intact-mobile-1', 543, 1060, 'Intact home: “Hi Sana”, a family floater plan with ₹5,00,000 cover and quick actions'), line: 'Home opens with <mark>your cover in plain numbers</mark>.' },
        { img: im('intact-mockups-2', 908, 857, 'A woman reading an Intact AI chat about her coverage on her phone'), line: 'Ask <mark>“Am I covered?”</mark> and see your limit, and what you might pay.' },
        { img: im('intact-mobile-3', 602, 1102, 'Intact claim status: a ₹45,000 claim at Apollo Hospital, currently in review'), line: 'See <mark>where your claim is</mark>, without chasing it by phone.' },
        { img: im('intact-cover-alt', 1860, 1000), line: 'One confident blue, and the name as the promise: <mark>health, kept intact</mark>.' }],
    },
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
      { nav: 'Two journeys', fold: true, title: 'Two ways a claim can go, and where each one breaks', blocks: [
        { t: 'steps', ar: '4 / 3', title: 'A cashless claim', intro: 'The hospital is in the insurer’s network, and the insurer pays the hospital directly.', items: [
          { title: 'Arriving at a network hospital', img: im('intact-cashless-1', 983, 758, 'Illustration: she arrives at City Hospital, a network hospital') }, { title: 'Asking for approval before treatment', img: im('intact-cashless-2', 501, 574, 'Illustration: at the insurance desk, she hands over her details for approval') }, { title: 'The insurer checks cover, waiting periods and conditions', img: im('intact-cashless-3', 1024, 655, 'Illustration: the administrator checks her cover, waiting periods and conditions on screen') },
          { title: 'Care begins after the first approval', img: im('intact-cashless-4', 1024, 696, 'Illustration: doctors begin treatment while the administrator follows updates') }, { title: 'Medical records and bills are prepared', img: im('intact-cashless-5', 1024, 696, 'Illustration: the final bill and medical files are prepared for submission') }, { title: 'The insurer and hospital settle the claim', img: im('intact-cashless-6', 1024, 559, 'Illustration: she receives the settlement summary at the discharge desk') }] },
        { t: 'steps', ar: '4 / 3', title: 'A reimbursement claim', intro: 'The hospital isn’t in the network, or the cashless claim fails: you pay first and claim the money back.', items: [
          { title: 'Treated at a hospital outside the network', img: im('intact-reimb-1', 1024, 559, 'Illustration: at a hospital outside the network, she is told the full bill must be paid') }, { title: 'Paying the full hospital bill', img: im('intact-reimb-2', 1024, 559, 'Illustration: she and her father go through a long checklist of documents') }, { title: 'Gathering every document the claim needs', img: im('intact-reimb-3', 481, 390, 'Illustration: at the claim submission office, stacks of papers are ready') },
          { title: 'Submitting them to the claims office or administrator', img: im('intact-reimb-4', 481, 390, 'Illustration: the administrator checks the documents against the policy') }, { title: 'The documents and the cover are checked', img: im('intact-reimb-5', 481, 390, 'Illustration: the administrator asks for more prescriptions and statements') }, { title: 'More documents and clarification are asked for', img: im('intact-reimb-6', 481, 390, 'Illustration: the claim waits on a query for more information') }] },
      ] },
      { nav: 'The gaps', fold: true, title: 'Nobody can say how much is covered, or how much they’ll pay', blocks: [
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
      { nav: 'Design', design: true, title: 'Warm where it can be, clear where it must be', blocks: [
        { t: 'feature', n: 1, title: 'Your cover, at a glance',
          pain: '<mark>68% of policyholders</mark> had never read their policy in full.',
          solve: 'Home opens with a hello and your plan in plain numbers: the plan, the cover amount and the quick actions you’ll need.',
          img: im('intact-mobile-1', 543, 1060, 'Intact home: “Hi Sana”, a family floater plan with ₹5,00,000 cover and quick actions'),
          decisions: [{ d: 'A warm hello first', why: 'Claims happen when people are vulnerable and overloaded, so the screen has to calm, not add to it.' }, { d: 'Plain numbers, no jargon', why: 'Of the people who had read their policy, fewer than a third could explain their cover.' }] },
        { t: 'feature', n: 2, title: 'Ask before you worry',
          pain: 'There’s <mark>no single, trustworthy place</mark> to get answers about your own policy.',
          solve: 'Ask “Am I covered for knee surgery?” and the assistant answers with your limit, your room-rent limit and what you might pay yourself.',
          img: im('intact-mockups-2', 908, 857, 'A woman reading an Intact AI chat about her coverage on her phone'),
          decisions: [{ d: 'Answers in your own numbers', why: 'The question people most wished they could ask instantly was “Am I covered for this procedure?”' }, { d: 'A reason with every amount', why: 'Money decisions arrived without clarity or reasons.' }] },
        { t: 'feature', n: 3, title: 'Know where your claim is',
          pain: 'People made <mark>14 calls</mark>, on average, to chase one claim.',
          solve: 'Each claim shows its amount, the hospital and the stage it’s at.',
          img: im('intact-mobile-3', 602, 1102, 'Intact claim status: a ₹45,000 claim at Apollo Hospital, currently in review'),
          decisions: [{ d: 'Every stage visible', why: 'Not seeing a claim’s progress builds distrust.' }, { d: 'Network hospitals found for you when you file', why: 'Half of people on a cashless claim waited 6 to 48 hours to leave hospital, because it wasn’t routed clearly at the start.' }] },
        { t: 'p', title: 'The brand', text: ['The name is the promise: <b>Health, kept intact.</b> One confident blue does the heavy lifting, softened by pale blue and greys, with a single typeface, Satoshi, in three weights.'] },
        { t: 'palette', fonts: [{ name: 'Satoshi', note: 'Regular, Medium and Bold', css: 'var(--f-body)' }], colors: ['#014CF0', '#E6EEFE', '#F3F3F3', '#939393', '#1B1B1B'] },
        { t: 'images', layout: 'wide', images: [im('intact-cover-alt', 1860, 1000, 'Intact brand identity')], cap: 'The Intact identity.' },
        { t: 'more', summary: 'See more screens', blocks: [
          { t: 'images', layout: 'phones', images: [im('intact-mobile-1', 543, 1060, 'Intact home: “Hi Sana”, a family floater plan with ₹5,00,000 cover and quick actions'), im('intact-mobile-2', 493, 1053, 'Intact home, lower half: quick actions, Ask Intact AI and an active claim’s progress'), im('intact-mobile-3', 602, 1102, 'Intact claim status: a ₹45,000 claim at Apollo Hospital, currently in review')],
          cap: 'Home, the assistant and an active claim, and the claim status screen.' },
          { t: 'images', layout: 'row', images: [im('intact-mockups-1', 865, 994, 'A hand holding a phone showing the Intact splash screen'), im('intact-claim-hand', 1024, 996, 'A hand holding a phone on the first step of filing a claim, listing network hospitals nearby'), im('intact-mockups-2', 908, 857, 'A woman reading an Intact AI chat about her coverage on her phone')], cap: 'The splash screen, filing a claim (the app finds network hospitals near you), and the assistant answering a coverage question.' }] },
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
    ov: {
      impactTitle: 'What research showed',
      impact: [
        { n: 15, label: 'people interviewed: organisers, staff, exhibitors and artists' },
        { n: 4, label: 'event spaces observed' },
        { n: 83, unit: '%', label: 'had trouble coordinating during the event' }],
      outcome: 'With the crowd heatmap and attendance trend at a glance, vendors could plan staff and restocking before queues formed, not after. One shared platform also cut the back-and-forth between organisers and vendors.',
      part: 'My part: the research, the brand, the screens and the AR pieces.',
      walk: [
        { img: im('morphea-story-5', 1536, 1024, 'Storyboard: organisers handle a delayed transport while the crowd enjoys the show'), line: 'At four event spaces, <mark>every important decision was made too late</mark>.' },
        { img: im('morphea-sketch-1', 2064, 2752, 'Pencil sketch of the app screens and dashboards'), line: 'Sketches first, then a cut to <mark>what the event must have</mark>.' },
        { img: im('morphea-mobile-1', 390, 845, 'Morphea vendor portal: a live crowd heatmap and attendance trends'), line: 'Vendors see <mark>the crowd as it moves</mark>, so they can staff up before queues form.' },
        { img: im('morphea-mobile-2', 390, 845, 'Morphea volunteer view: assigned incidents with in-progress, resolved and accept actions'), line: 'Volunteers <mark>own each incident</mark> until it’s resolved.' },
        { img: im('morphea-mockups-3', 445, 453, 'AR view of a 3D monument model rising out of an event map'), line: 'On the ground: ID kits, badges and <mark>an AR map</mark> of the venue.' },
        { img: im('morphea-brand', 1920, 787, 'Morphea brand identity'), line: 'A mark that <mark>moves like a festival</mark>.' }],
    },
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
      { nav: 'What people said', fold: true, title: 'In their words', blocks: [
        { t: 'quotes', items: [
          { q: 'Our stall was set up, but barely anyone knew we were here. It felt like we were hidden.' },
          { q: 'Last-minute changes weren’t communicated properly, which confused both staff and exhibitors.' },
          { q: 'We were constantly running around to clarify small things that should have been sorted beforehand.' },
          { q: 'Whenever I needed to check in with another team, it took too long to figure out who was responsible.' },
          { q: 'Sponsors told us they didn’t see the kind of audience engagement they were promised.' }] },
      ] },
      { nav: 'Who it’s for', fold: true, title: 'Three people, three very different event days', blocks: [
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
      { nav: 'Ideas', fold: true, title: 'Deciding what to build first', blocks: [
        { t: 'columns', intro: 'We sorted every idea into what the event must have, should have, could have, and won’t have yet.', items: [
          { title: 'Must have', tone: 'key', items: ['One web app for every stakeholder, with updates, a progress tracker and interactive maps', 'Walkie-talkies, staff IDs and a venue map marking every stall', 'Interactive visiting cards with AR', 'A mock-up book showing sponsors where their brand will appear'] },
          { title: 'Should have', items: ['Physical IDs and signboards for easy navigation', 'QR-coded wristbands made from sustainable material', '“Ask me” badges, so attendees can find a volunteer', 'Digital tickets with QR codes'] },
          { title: 'Could have', items: ['A kanban board for visual planning', 'A guide for vendors on dealing with visitors', 'Games for the audience at stalls', 'Colour-coded badges for each role', 'Interactive QR phrases on vendor T-shirts', 'Colour-coded task cards with QR codes'] },
          { title: 'Won’t have, for now', items: ['Heatmaps and footstep signs to guide attendees around', 'Staff allocation at crowded corners'] }] },
        { t: 'papers', items: [{ label: 'The app', img: im('morphea-sketch-1', 2064, 2752, 'Pencil sketch of the app screens and dashboards') }, { label: 'The sponsor booklet', img: im('morphea-sketch-2', 2064, 2752, 'Pencil sketch of the sponsor booklet') }, { label: 'The ID kit', img: im('morphea-sketch-3', 2064, 2752, 'Pencil sketch of the physical ID kit with a walkie-talkie and map') }, { label: 'The visiting card', img: im('morphea-sketch-4', 2064, 2752, 'Pencil sketch of the interactive visiting card') }], note: 'The final sketches. Open any of them to see it full size.' },
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
      { nav: 'Dashboards', design: true, title: 'A dashboard for every role', blocks: [
        { t: 'feature', n: 1, title: 'See the crowd as it moves',
          pain: 'Vendors know what they’ve sold, but <mark>not whether the crowd is heading their way</mark>.',
          solve: 'A live heatmap of where people are, and how attendance is changing through the day.',
          img: im('morphea-mobile-1', 390, 845, 'Morphea vendor portal: a live crowd heatmap and attendance trends'),
          decisions: [{ d: 'The heatmap first, the trend second, people third', why: 'That’s the order people needed answers in: where customers are, how attendance changed, and who to contact.' }, { d: 'Fewer numbers on screen', why: 'Early wireframes showed too many numbers at once, and felt like a report rather than a tool.' }] },
        { t: 'feature', n: 2, title: 'Every problem has an owner',
          pain: 'Organisers coordinated dozens of vendors over <mark>WhatsApp chains</mark> that created noise and missed urgent signals.',
          solve: 'Volunteers see the incidents assigned to them and mark each one in progress or resolved.',
          img: im('morphea-mobile-2', 390, 845, 'Morphea volunteer view: assigned incidents with in-progress, resolved and accept actions'),
          decisions: [{ d: 'One owner for each incident', why: '47% found it hard to keep track of everyone working on the event.' }, { d: 'Three states: assigned, in progress, resolved', why: 'So organisers always know who’s handling what.' }] },
        { t: 'findings', plain: true, cols: 2, items: [
          { title: 'Organisers', img: im('morphea-dash-org', 1500, 1125, 'Organiser dashboard: a live venue map, incidents and available staff'), body: 'Monitor people and operations, manage incidents and talk to every stakeholder in real time.' },
          { title: 'Volunteers', img: im('morphea-dash-vol', 1500, 1125, 'Volunteer dashboard: assigned incidents, recent updates and today’s tasks'), body: 'See tasks, handle incidents, stay in touch with organisers and open quick guides on the spot.' },
          { title: 'Core team', img: im('morphea-dash-core', 1500, 1125, 'Core team dashboard: incidents by severity, response times and attendance'), body: 'A control centre for live numbers, incident trends and how engaged attendees are.' },
          { title: 'Exhibitors', img: im('morphea-dash-exh', 1500, 1125, 'Exhibitor dashboard: registration and a stall map with resource requests'), body: 'Register, book a stall and request power, Wi-Fi or supplies with little effort, while organisers stay updated.' }] },
      ] },
      { nav: 'On the ground', title: 'Where the app meets the event floor', blocks: [
        { t: 'feature', n: 3, title: 'Ready on day one',
          pain: '<mark>83% had trouble</mark> coordinating during the event.',
          solve: 'An onboarding kit with ID cards, a venue map and walkie-talkies gets volunteers, exhibitors and the core team aligned before the gates open.',
          img: im('morphea-mockups-2', 274, 438, 'A staff member wearing a Morphea lanyard working at a vendor table during a cultural event'),
          decisions: [{ d: 'On paper as well as in the app', why: 'Audiences range from tech-savvy to offline-first, so the plan can’t live only on a screen.' }, { d: '“Ask me” badges for volunteers', why: 'So attendees can find a volunteer at a glance.' }] },
        { t: 'findings', plain: true, items: [
          { title: 'Visiting cards', body: 'A QR code that opens an AR experience and social links, for easy networking.' },
          { title: 'An onboarding kit', body: 'ID cards, maps and walkie-talkies that align volunteers, exhibitors and the core team before the event.' },
          { title: 'ID card and map', body: 'A handy ID with the venue map and simple rules on the back, starting with “Atithi Devo Bhava”: greet and guide every guest.' },
          { title: 'Tickets', body: 'On-brand tickets with unique barcodes, so entry is secure, fakes are stopped, and moving from online booking to the gate is easy.' },
          { title: 'Posters', body: 'Clear branding and a QR code that turn offline reach into online registrations.' }] },
        { t: 'images', layout: 'row', images: [im('morphea-mockups-1', 485, 455, 'Black Morphea core-team box printed with blue dancer illustrations'), im('morphea-staff', 800, 1280, 'A staff member wearing a Morphea lanyard working at a vendor table during a cultural event'), im('morphea-mockups-3', 445, 453, 'AR view of a 3D monument model rising out of an event map')],
          cap: 'The core-team kit, a staff lanyard at work, and the AR view of a monument rising out of the event map.' },
        { t: 'more', summary: 'More from the event floor', blocks: [
          { t: 'images', layout: 'row', images: [im('morphea-badges', 1200, 1888, 'Round “Ask me” volunteer badges with friendly phrases'), im('morphea-band', 408, 612, 'A Morphea wristband on a wrist'), im('morphea-sufi', 736, 1041, 'Jashn-e-Sufi poster artwork: a whirling dervish')], cap: '“Ask me” badges, a QR wristband, and the artwork for the Jashn-e-Sufi poster.' },
          { t: 'images', layout: 'row', images: [im('morphea-stage', 1170, 692, 'The Morphea logo on a stage screen between coloured light pillars'), im('morphea-van', 612, 408, 'A black van wrapped with the Morphea logo'), im('morphea-bottles', 612, 408, 'Morphea water bottles in black, yellow, blue and pink')], cap: 'The brand on stage and on the move.' }] },
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
    ov: {
      outcome: 'Kalaghar connects discovering craft online with seeing it made in person. The van’s schedule gives people a reason to come back, and the shop makes browsing purposeful rather than overwhelming.',
      part: 'My part: the research, the brand and the screens.',
      walk: [
        { img: im('kalaghar-field-1', 4032, 2268, 'A jutti-making family at their workshop in Patiala'), line: 'Three days in Patiala: <mark>the skill is passed down, the money isn’t</mark>.' },
        { img: im('kalaghar-blueprint', 1920, 1080, 'Service blueprint'), line: 'A service blueprint for <mark>every step</mark>, in front of the visitor and behind the scenes.' },
        { img: im('kalaghar-truck', 1376, 768, 'Illustration: a painted heritage truck on a village road, with a banner reading “Preserving our roots”'), line: 'The idea: <mark>a heritage hub on wheels</mark>, with stalls run by the artisans.' },
        { img: im('kalaghar-research-3', 960, 1280, 'A craftsman stitching leather juttis on the floor of his workshop'), line: 'Visitors <mark>learn from the maker</mark>, in hands-on workshops.' },
        { img: im('kalaghar-mobile', 1920, 1080, 'Kalaghar low-literacy mobile screens with voice-note uploads, beside an artisan and her child'), line: 'Artisans sell <mark>in their own language</mark>, through WhatsApp.' },
        { img: im('kalaghar-web', 1920, 1080, 'Kalaghar website on three laptops: artisan stories, van locations and the product shop'), line: 'Buyers see <mark>where the van goes next</mark>, and the shop keeps artisans visible after it leaves.' }],
    },
    chapters: [
      { nav: 'Goals', fold: true, title: 'What we set out to do', blocks: [
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
        { t: 'papers', items: [{ label: 'A potter’s shelf', img: im('kalaghar-research-1', 1280, 960, 'A potter’s workshop: stacked clay plates on a shelf above the wheel') }, { label: 'Taped for stitching', img: im('kalaghar-research-2', 960, 1280, 'An artisan’s hand with yellow tape wrapped around the fingertips') }, { label: 'A phulkari', img: im('kalaghar-research-4', 1200, 1600, 'Hands holding a red embroidered phulkari textile') }], note: 'In the workshops. Open any of them to see it full size.' },
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
      { nav: 'Who it’s for', fold: true, title: 'The maker and the buyer', blocks: [
        { t: 'persona', items: [
          { role: 'artisan', name: 'Baldev Singh', img: im('kalaghar-persona-baldev', 960, 1280, 'Baldev Singh, an elderly artisan in a turban, stitching a jutti'), facts: ['48 years old', 'Patiala, Punjab', 'Jutti artisan', 'Earns ₹8,000–12,000'],
            bio: 'A skilled jutti artisan carrying on a family tradition of handmade footwear. Trained by his father, he has practised the craft for over 30 years. Despite money troubles and little recognition, he remains passionate about jutti-making, and dreams of a better income, passing the art to his children and getting credit for his designs.',
            lists: [['Goals', ['Support his family through jutti-making', 'Pass the craft to the next generation', 'Be recognised for his work']], ['Pain points', ['No credit for his designs', 'Low, unstable earnings', 'Dependence on the middleman']], ['What drives him', ['Pride in his ancestral craft and identity', 'The dream of being featured on YouTube', 'A better life through steadier income']]] },
          { role: 'buyer', name: 'Simran Kaur', img: im('kalaghar-persona-simran', 720, 821, 'Simran Kaur standing on a hillside'), facts: ['29 years old', 'Chandigarh', 'HR manager', 'Earns ₹45,000'],
            bio: 'Blends tradition with modern life. She wears juttis to work and to celebrations, looking for pairs that are stylish and comfortable, and loves handmade goods. She prefers supporting local artisans but often wishes she knew more about who made what she buys.',
            lists: [['Goals', ['Support local craftsmanship', 'Live more sustainably', 'Find stylish, comfortable juttis for festivals']], ['Pain points', ['Limited choice in art and craft', 'Products vary from store to store', 'Dependence on middlemen']], ['What drives her', ['Owning unique products and accessories', 'Things that reflect Indian culture']]] }] },
      ] },
      { nav: 'The idea', design: true, title: 'A heritage hub on wheels', blocks: [
        { t: 'p', lead: true, text: ['A moving heritage hub, a “travelling truck”, that journeys across India bringing crafts, cultures and stories directly to people. It stops in cities, villages and tourist spots with exhibitions, live craft demonstrations and learning sessions.'] },
        { t: 'images', layout: 'row', images: [im('kalaghar-truck', 1376, 768, 'Illustration: a painted heritage truck on a village road, with a banner reading “Preserving our roots”'), im('kalaghar-stall', 1376, 768, 'Illustration: the heritage truck opened up as a craft stall with visitors')], cap: 'The heritage hub on the road, and opened up for visitors.' },
        { t: 'feature', n: 1, title: 'The van comes to you',
          pain: 'Buyers who discover craft online <mark>want to see it being made</mark>, not just own it.',
          solve: 'A moving hub that stops in cities, villages and tourist spots, with exhibitions, live craft demonstrations and learning sessions.',
          img: im('kalaghar-van', 1362, 732, 'The Kalaghar van'),
          decisions: [{ d: 'Stalls run by the artisans themselves', why: 'Middlemen set the price and kept most of the margin.' }, { d: 'A schedule to look forward to', why: 'Knowing when the van is back gives people a reason to return.' }] },
        { t: 'feature', n: 2, title: 'Learn from the maker',
          pain: 'To buyers, <mark>buying craft online felt riskier</mark>.',
          solve: 'Hands-on workshops in block printing, pottery and weaving, led by the artisans who keep those crafts alive.',
          img: im('kalaghar-research-3', 960, 1280, 'A craftsman stitching leather juttis on the floor of his workshop'),
          decisions: [{ d: 'Stories told by the artisans', why: 'Artisans cared most about being represented with dignity.' }, { d: 'Make it, then take it home', why: 'Buyers build confidence by seeing the work made before they buy.' }] },
        { t: 'columns', items: [
          { title: 'Why it exists', body: 'To preserve and promote India’s artisanal heritage by connecting skilled craftspeople with modern audiences through workshops, cultural experiences and handmade products. It empowers rural artisans, revives dying crafts and builds real connections between people and art.' },
          { title: 'What it offers', items: ['Craft workshops (block printing, pottery, weaving) led by real artisans', 'Artisan-made kits for hands-on making', 'Handmade products from rural artisans', 'Stories of the journey behind each craft'] },
          { title: 'How it works', items: ['Interactive workshops in cities and towns', 'Partnering directly with artisans for fair wages and representation', 'The Kalaghar van as a mobile creative space', 'Craft kits and products sold online and at events', 'Social media and storytelling to raise awareness of India’s living heritage'] },
          { title: 'Where it runs', items: ['Offline: workshops, schools, cultural festivals and community centres across India', 'Online: a website and social media', 'On the move: the van, reaching places that are underserved or curious about craft'] }] },
      ] },
      { nav: 'Service design', fold: true, title: 'Every step, in front of the visitor and behind the scenes', blocks: [
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
        { t: 'feature', n: 3, title: 'Sell in your own language',
          pain: 'Artisans <mark>didn’t want to manage a shop</mark>.',
          solve: 'Artisans share photos and voice notes through a WhatsApp assistant that speaks Hindi, Punjabi, Tamil, Bengali, Marathi and more.',
          img: im('kalaghar-mobile', 1920, 1080, 'Kalaghar low-literacy mobile screens with voice-note uploads, beside an artisan and her child'),
          decisions: [{ d: 'WhatsApp, not a new app', why: 'It’s a chat app they already use, so there’s nothing new to learn.' }, { d: 'Voice notes as well as photos', why: 'The screens were designed for artisans who find reading and writing hard.' }] },
        { t: 'images', layout: 'wide', title: 'For buyers: the website', images: [im('kalaghar-web', 1920, 1080, 'Kalaghar website on three laptops: artisan stories, van locations and the product shop')], cap: 'Artisan stories, where the van is going next, and the shop.' },
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
