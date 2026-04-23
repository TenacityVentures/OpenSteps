export interface Intent {
  icon: string;
  question: string;
  /** Suggested guide titles */
  suggestions: string[];
  /** Guide slugs matching the suggestions */
  slugs: string[];
}

export const INTENTS: Intent[] = [
  {
    icon: '🏢',
    question: "I'm starting a small business",
    suggestions: ['Register a business', 'Get a TIN', 'Enrol in NASSIT'],
    slugs: ['register-a-business', 'get-a-tin', 'nassit-enrolment'],
  },
  {
    icon: '🪪',
    question: 'I need a national ID card',
    suggestions: ['Apply for NIN', 'Get a birth certificate', 'Replace a lost ID'],
    slugs: ['apply-for-nin', 'get-birth-certificate', 'replace-lost-id'],
  },
  {
    icon: '✈️',
    question: "I'm travelling abroad",
    suggestions: ['Apply for a passport', 'Get a police clearance', 'Renew a passport'],
    slugs: ['apply-for-passport', 'police-clearance', 'renew-passport'],
  },
  {
    icon: '🚗',
    question: "I want a driver's licence",
    suggestions: ["Get a learner's permit", 'Book a road test', 'Register a vehicle'],
    slugs: ['learners-permit', 'road-test', 'register-vehicle'],
  },
];
