// Every business detail lives here, so the whole site updates from one file.
// All facts come from the previous jeffjencareplus.co.uk site (Nov 2026).
// Anything marked TO CONFIRM is a placeholder: check it before launch.
export const siteConfig = {
  name: "Jeff Jen Care Plus",
  legalName: "Jeff Jen Care Plus Ltd",
  shortName: "Jeff Jen Care Plus",
  // Other ways people type the name, so search engines connect them.
  alternateNames: [
    "Jeff Jen Care Plus Ltd",
    "JeffJen Care Plus",
    "Jeff Jen Care",
    "JeffJen Care",
  ],
  tagline: "Safe, compassionate care",
  description:
    "Safe, compassionate and consistent care for older people and people living with dementia, in their own homes across Oxfordshire. We also supply nurses and care staff to nursing and residential homes, day or night, 7 days a week.",

  phone: "07554 572378",
  phoneHref: "tel:+447554572378",
  phone2: "07787 161203",
  phone2Href: "tel:+447787161203",
  whatsappHref: "", // TO CONFIRM: add a wa.me link if they use WhatsApp
  email: "info@jeffjencareplus.co.uk",
  emailHref: "mailto:info@jeffjencareplus.co.uk",

  domain: "jeffjencareplus.co.uk",
  url: "https://www.jeffjencareplus.co.uk",

  address: {
    lines: ["49a Oxford Road", "Cowley", "Oxford", "OX4 2ER"],
    directions:
      "Christian Life Centre office, opposite the BP petrol station, by Pink Coco Nail Salon",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=49a+Oxford+Road+Cowley+Oxford+OX4+2ER",
  },

  serviceArea: "Oxford and across Oxfordshire",
  // What the old site said. Office opening hours: TO CONFIRM.
  hoursShort: "Care available day and night, 7 days a week",
  replyTime: "Call for the quickest answer. We reply to messages as soon as we can.",

  // Companies Act 2006: shown in the footer.
  companyNumber: "09301895",
  registeredOffice: "49a Oxford Road, Cowley, Oxford, OX4 2ER", // TO CONFIRM

  // CQC: registered providers must show their latest rating on their website
  // once rated. Add the location ID to switch on the official CQC widget.
  cqcLocationId: "", // TO CONFIRM, e.g. "1-123456789"

  applicationFormHref: "/downloads/jeff-jen-care-plus-application-form.pdf",

  nav: [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about-us" },
    { label: "Services", href: "/services" },
    { label: "Care homes", href: "/care-homes" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],

  privacy: {
    lastUpdated: "November 2026",
    retentionEnquiries: "12 months",
    retentionApplicants: "6 months after the role is filled",
  },
};

// The notice box on the homepage (and the label above the hero headline).
// Edited in the admin panel; untick "active" there to hide it.
export const offer = {
  active: true,
  label: "We're recruiting carers and nurses",
  headline: "Join our team",
  summary:
    "Looking for a career in care, part-time hours or ad hoc shifts? Get in touch. We have a thorough recruitment process and give everyone an equal opportunity, whatever their race, sex, gender or cultural background.",
  included: [
    "Health Care Assistants",
    "Support Workers",
    "Home carers (preferably with your own transport)",
    "Nurses, all specialities: RN, RMN, RN(LD)",
  ],
  terms: "Walk in to our Cowley office or call us for more information.",
};

// Ordered deliberately: home care leads. `from` is an optional price line,
// empty by default (no prices on the old site); set it in the admin panel.
export const services = [
  {
    slug: "home-care",
    title: "Home care",
    lede: "Care and support in your own home, from the same familiar faces.",
    description:
      "We help older people and people living with dementia stay safe and comfortable at home. We keep the same carers with each client wherever we can, so you get to know each other and trust builds.",
    features: [
      "Visits planned around you and your routine",
      "Consistent carers, so you see familiar faces",
      "Day or night, 7 days a week",
      "Across Oxford and Oxfordshire",
    ],
    from: "",
  },
  {
    slug: "dementia-care",
    title: "Dementia care",
    lede: "Specialist, patient support, including for challenging behaviour.",
    description:
      "Dementia care is at the heart of what we do. Our carers and nurses support people living with dementia, including challenging behaviour, with patience, consistency and respect.",
    features: [],
    from: "",
  },
  {
    slug: "elderly-care",
    title: "Elderly care",
    lede: "Safe, compassionate support for older people.",
    description:
      "Help with the everyday things that keep life comfortable and safe at home, from carers who take the time to know you.",
    features: [],
    from: "",
  },
  {
    slug: "care-home-staffing",
    title: "Staffing for care homes",
    lede: "Nurses and care staff for nursing and residential homes.",
    description:
      "Skilled nurses, health care assistants and support workers for nursing and residential homes across Oxfordshire, for ad hoc shifts or regular cover.",
    features: [],
    from: "",
  },
  {
    slug: "mental-health",
    title: "Mental health",
    lede: "Support for adults with mental health problems.",
    description: "",
    features: [],
    from: "",
  },
  {
    slug: "learning-disabilities",
    title: "Learning disabilities",
    lede: "Care and support for adults with a learning disability.",
    description: "",
    features: [],
    from: "",
  },
  {
    slug: "adult-autism",
    title: "Adult autism",
    lede: "Support for autistic adults.",
    description: "",
    features: [],
    from: "",
  },
  {
    slug: "end-of-life-care",
    title: "End of life care",
    lede: "Gentle care and comfort, and support for the family.",
    description: "",
    features: [],
    from: "",
  },
  {
    slug: "supported-living",
    title: "Supported living",
    lede: "Support to live as independently as possible.",
    description: "",
    features: [],
    from: "",
  },
  {
    slug: "one-to-one",
    title: "One-to-one cover",
    lede: "Dedicated one-to-one staff when someone needs it.",
    description: "",
    features: [],
    from: "",
  },
  {
    slug: "personal-assistant",
    title: "Personal assistant (PA)",
    lede: "A PA to support you with daily life.",
    description: "",
    features: [],
    from: "",
  },
  {
    slug: "training",
    title: "Mandatory training consultancy",
    lede: "Help with the mandatory training care staff need.",
    description: "",
    features: [],
    from: "",
  },
  {
    slug: "agency-setup",
    title: "Setting up a care agency",
    lede: "Support if you're starting your own care agency.",
    description: "",
    features: [],
    from: "",
  },
];

// Who we look after (from the old About page).
export const whoWeHelp = [
  "Older people",
  "People living with dementia",
  "Challenging behaviour in dementia",
  "People with learning disabilities",
  "Adults with mental health problems",
];

// Accreditations shown on the old site.
export const accreditations = [
  {
    name: "Care Quality Commission",
    detail: "Registered with the CQC, the independent regulator of health and social care in England",
  },
  {
    name: "OACP member",
    detail: "Member 111 of the Oxfordshire Association of Care Providers",
  },
  {
    name: "CPD member",
    detail: "Member of the CPD Certification Service",
  },
];

// Care home staffing (from the old Home and About pages).
export const careHomeStaff = [
  { title: "Nurses", body: "All specialities: RN, RMN and RN(LD)." },
  { title: "Health Care Assistants", body: "Experienced HCAs for nursing and residential homes." },
  { title: "Support Workers", body: "Including dementia, learning disability and mental health support." },
];

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  location: string;
  summary: string;
  delivered: string[];
  image: string;
  url?: string;
};

// "Team & news" photos, added from the admin panel. Real photos only.
export const work: CaseStudy[] = [];

// What the business genuinely stands on (all from the old site).
export const promises = [
  {
    title: "The same familiar faces",
    body: "We keep consistent staff with each client, so carers and the people they look after build a real, trusting relationship.",
  },
  {
    title: "Day or night, 7 days a week",
    body: "Our carers and nurses are available around the clock, including weekends.",
  },
  {
    title: "Skilled, carefully recruited staff",
    body: "A thorough recruitment process in line with legal standards, and highly skilled nurses and support workers.",
  },
  {
    title: "Local, with a door you can walk through",
    body: "We're based in Cowley, Oxford. Call us, or walk in to our office and talk to us in person.",
  },
];

// Questions families, care homes and applicants ask. Answers use only
// facts from the old site; nothing here is invented.
export const faqs = [
  {
    question: "Which areas do you cover?",
    answer:
      "Oxford and across Oxfordshire. Our office is at 49a Oxford Road, Cowley, Oxford, OX4 2ER.",
  },
  {
    question: "Who do you look after?",
    answer:
      "Older people, people living with dementia (including challenging behaviour), people with learning disabilities, and adults with mental health problems.",
  },
  {
    question: "Will we see the same carers?",
    answer:
      "Wherever we can, yes. We keep consistent staff with each client, so carers and the people they look after build a good, trusting relationship.",
  },
  {
    question: "When are your carers available?",
    answer: "Our carers and nurses are available day or night, 7 days a week.",
  },
  {
    question: "Are you registered with the CQC?",
    answer:
      "Yes. Jeff Jen Care Plus Ltd is registered with the Care Quality Commission. We're also a member of the Oxfordshire Association of Care Providers (member 111) and the CPD Certification Service.",
  },
  {
    question: "How much does care cost?",
    answer:
      "It depends on the care and support you need, so please call us on 07554 572378 and we'll talk it through. We aim to keep our services cost-effective.",
  },
  {
    question: "Do you supply staff to care homes?",
    answer:
      "Yes. We supply nurses (RN, RMN, RN(LD)), health care assistants and support workers to nursing and residential homes across Oxfordshire, for ad hoc shifts or regular cover.",
  },
  {
    question: "Can I visit your office?",
    answer:
      "Yes, feel free to walk in. We're in the Christian Life Centre office on Oxford Road in Cowley, opposite the BP petrol station, by Pink Coco Nail Salon.",
  },
  {
    question: "I'd like to work for you. How do I apply?",
    answer:
      "We're recruiting HCAs, support workers, home carers and nurses. Download the application form from our Careers page, call us, or walk in to our office.",
  },
];

// A real sequence, so the numbering carries information.
export const process = [
  {
    title: "Call us",
    body: "Ring 07554 572378, or walk in to our Cowley office. Tell us what's happening and what you need.",
  },
  {
    title: "We get to know you",
    body: "We talk through your needs, your routine and what matters to you, so the care fits your life.",
  },
  {
    title: "Your care plan",
    body: "We agree a plan together: what help you'd like, when, and how often.",
  },
  {
    title: "Familiar carers",
    body: "Your care starts with a consistent team, so you see the same faces you've come to trust.",
  },
];
