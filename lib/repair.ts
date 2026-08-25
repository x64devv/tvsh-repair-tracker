// State model for the TVSH repair-tracking POC.
// Ported verbatim from the design source of truth:
//   design/TVSH Repair Tracker Demo.dc.html  (<script data-dc-script> block)

export type Screen = 'intake' | 'logged' | 'track' | 'repair' | 'chat';

export type ReturnMethod = 'collect' | 'deliver';

export type Msg =
  | { mine: true; text: string }
  | { mine: false; lines: string[] };

export type Stage = {
  /** timeline heading + status headline */
  name: string;
  /** timeline sub-line */
  meta: string;
  /** customer-facing sentence in the status card */
  blurb: string;
  /** technician note shown for that stage */
  note: string;
};

/** The PSU milestone sequence — order matters. */
export const STAGES: Stage[] = [
  {
    name: 'Logged at Africa Unity Square',
    meta: '11 Aug · booked in by Tanaka M',
    blurb: 'Your TV is booked in at the branch and waiting for the courier.',
    note: 'Booked in and tagged at Africa Unity Square. Courier collects tomorrow at 09:00.',
  },
  {
    name: 'Collected for the service centre',
    meta: '12 Aug · courier picked up',
    blurb: "It's on its way to the Kelvin Road service centre in Graniteside.",
    note: 'Collected from the branch, in transit to the Graniteside PSU.',
  },
  {
    name: 'Assessed by a technician',
    meta: '13 Aug · fault confirmed: main board',
    blurb: 'A technician at Graniteside has looked at it and confirmed the fault.',
    note: 'No picture, sound present — main board diagnosed as faulty.',
  },
  {
    name: 'Waiting for the part',
    meta: '13–18 Aug · board ordered from supplier',
    blurb: "We're waiting on the replacement main board from the supplier.",
    note: 'Board ordered from the supplier; ETA five working days.',
  },
  {
    name: 'Being repaired',
    meta: 'In progress since 19 Aug',
    blurb: 'Your TV is on the bench at the Kelvin Road service centre right now.',
    note: 'Main board replaced. Running a 24-hour burn-in test before quality control — this is normal and included in the timeline.',
  },
  {
    name: 'Quality control',
    meta: '20 Aug · final checks',
    blurb: "It's being checked over before it leaves Graniteside.",
    note: 'Picture, sound and all ports tested against the original fault.',
  },
  {
    name: 'On its way back to your branch',
    meta: '21 Aug · in transit to AUS',
    blurb: "It's on the truck back to Africa Unity Square.",
    note: 'Signed off and loaded for the Africa Unity Square branch.',
  },
  {
    name: 'Ready for you to collect',
    meta: 'Waiting at Africa Unity Square',
    blurb: 'Waiting for you at Africa Unity Square since this morning.',
    note: 'Repair complete, three months warranty on the new part.',
  },
];

export const LAST_STAGE = STAGES.length - 1; // 7

export const DAYS_LEFT = [
  'about 9 working days',
  'about 8 working days',
  'about 7 working days',
  'about 6 working days',
  'about 4 working days',
  'about 2 working days',
  'tomorrow',
  "it's here",
];

export const SCREEN_LABELS: Record<Screen, string> = {
  intake: 'Branch portal · log a repair',
  logged: 'Branch portal · job logged',
  track: 'Customer lookup',
  repair: 'Customer status',
  chat: 'WhatsApp assistant',
};

/** The five tappable WhatsApp prompts. Two are stage-aware. */
export const REPLIES: Record<string, (stage: number) => string[]> = {
  'Any news on my TV?': (s) => [
    'Hi Rudo 👋 Your Samsung 55" QLED (job TVSH-49281) is currently at "' +
      STAGES[s].name.toLowerCase() +
      '".',
    STAGES[s].note +
      (s < LAST_STAGE
        ? ' Expected back at Africa Unity Square around Friday 21 August.'
        : ' You can fetch it any time before 17:30.'),
  ],
  'Why is it taking so long?': () => [
    'Fair question. Six of the ten days were spent waiting for the main board to reach Graniteside from the supplier — that part landed on Tuesday.',
    "Repairs like yours average 12 days, so you're a little ahead of the norm.",
  ],
  'Can you deliver it instead?': () => [
    'I can. Delivery from Africa Unity Square to your address in Avondale is US$15, usually the next working day after sign-off.',
    "I've noted it as an option — confirm it on your status screen and the branch will arrange it.",
  ],
  'What will it cost me?': () => [
    'Nothing. The TV is inside its 24-month warranty and the fault is a manufacturing one, so parts and labour are covered.',
    "If anything outside warranty comes up we'd send you a quote to approve first.",
  ],
  "I'd rather speak to someone": () => [
    'No problem. Africa Unity Square branch: 0242 750 118, open till 17:30 weekdays.',
    "I've also flagged your job so the branch calls you back within the hour.",
  ],
};

export const PROMPTS = Object.keys(REPLIES);

export const RETURN_BLURB: Record<ReturnMethod, string> = {
  collect:
    'Africa Unity Square, Harare · open till 17:30. Change this any time before collection.',
  deliver:
    'Delivery from Africa Unity Square to your address · US$15 · next working day after sign-off.',
};

/** Device frame dimensions used by the fit-to-viewport scaling. */
export const PORTAL_W = 1180;
export const PORTAL_H = 780;
export const PHONE_W = 402;
export const PHONE_H = 874;
