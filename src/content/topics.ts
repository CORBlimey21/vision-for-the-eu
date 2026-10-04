import { scenarioEffects } from '../data/scenarios.ts';
import type { Topic } from '../domain/types';
export const topics: Topic[] = [
  {
    id: 'energy',
    title: 'Energy',
    eyebrow: 'Connecting electricity grids',
    status: 'illustrative',
    present: {
      headline: 'What if Europe shared more of its power?',
      explanation:
        'Our proposal: invest in renewable power and stronger electricity links. Ireland and Spain could share more power when supply and demand differ. The Celtic Interconnector is a real Ireland–France project; the lines here are conceptual.',
      statistics: [],
    },
    choices: [
      {
        id: 'current-path',
        resultHeadline: 'Keep the current approach.',
        title: 'Keep the current path',
        description: 'Leave this illustrative scenario unchanged.',
        effects: scenarioEffects['current-path'],
        consequences: [
          'No additional changes are applied in this scenario. Existing real-world electricity connections are not shown.',
        ],
        visual: {},
      },
      {
        id: 'shared-grid',
        resultHeadline: 'Build more connections.',
        title: 'Connect our energy',
        description:
          'Invest in stronger grids and renewable power, and agree how countries would share the benefits.',
        effects: scenarioEffects['shared-grid'],
        consequences: [
          'More connections could help countries share renewable electricity when production and demand differ.',
          'Countries could have more options when their local electricity supply is disrupted.',
          'Our proposed investment deal would seek discounted access to surplus power. This is not an existing EU entitlement: pricing, funding, permitting and fairness would need agreement.',
        ],
        visual: { networkId: 'shared-grid' },
      },
    ],
    sourceIds: ['celtic'],
    teamVision: {
      choiceId: 'shared-grid',
      status: 'approved',
      explanation:
        'Invest in renewable power and grid connections. Agree how countries would share the benefits.',
    },
  },
  {
    id: 'decision-making',
    illustration: 'council-vote',
    title: 'Decision-making',
    eyebrow: 'How Council votes work',
    status: 'illustrative',
    present: {
      headline: 'When should one government be able to say no?',
      explanation:
        'The Council usually uses qualified majority voting: 55% of states representing 65% of the population on Commission or High Representative proposals. Foreign policy generally requires unanimity, with exceptions. Our question concerns extending majority voting, not changing every EU decision.',
      statistics: [],
    },
    choices: [
      {
        id: 'retain-unanimity',
        title: 'Keep the national veto',
        description: 'Retain the current unanimity requirements in foreign policy.',
        effects: scenarioEffects['retain-unanimity'],
        visual: { votingRule: 'unanimity' },
        resultHeadline: 'Keep the veto.',
        consequences: [
          'A government can prevent a decision it opposes where unanimity is required; abstention does not itself block agreement.',
          'That protection can also delay collective action. Keeping the rule does not guarantee that countries will reach a compromise.',
        ],
      },
      {
        id: 'targeted-qmv',
        title: 'Expand majority voting',
        description:
          'Seek wider QMV for foreign policy and sanctions decisions; retain national control over taxation.',
        effects: scenarioEffects['targeted-qmv'],
        visual: { votingRule: 'qualified-majority' },
        resultHeadline: 'Fewer single-country vetoes.',
        consequences: [
          'Our proposal could reduce the ability of one government to block collective foreign-policy action. It would not guarantee agreement or better decisions.',
          'A government could be outvoted on sensitive matters. The proposal would need safeguards, especially for smaller states.',
          'This is a proposed reform, not a switch available to voters today. Its legal route needs careful review; military and defence decisions require separate treatment.',
        ],
      },
    ],
    sourceIds: ['qmv', 'unanimity', 'sanctions', 'cfsp-treaty'],
    backgroundNotes: [
      {
        title: 'Step aside without changing the voting rule',
        text: 'Abstention already allows a unanimous decision to pass. In foreign policy, a formal constructive abstention can also excuse a state from applying it, subject to treaty conditions. This is voluntary; it cannot force a government to stop opposing a decision.',
      },
      {
        title: 'A bridge to majority voting',
        text: 'Article 31(3) TEU lets the European Council unanimously authorise wider QMV in foreign policy. This passerelle excludes decisions with military or defence implications. It is a possible legal route, not an automatic reform.',
      },
      {
        title: 'What this proposal leaves alone',
        text: 'Our proposal keeps taxation and treaty changes outside its scope. EU budget rules differ by instrument: own resources and the multiannual financial framework require unanimity. We do not claim that every budget vote does.',
      },
    ],
    teamVision: {
      choiceId: 'targeted-qmv',
      status: 'approved',
      explanation:
        'Seek faster joint action on foreign policy and sanctions, while keeping taxation outside this proposal.',
    },
  },
  {
    id: 'public-transport',
    title: 'Public transport',
    eyebrow: 'A useful alternative to the car',
    status: 'illustrative',
    evaluation: 'qualitative',
    present: {
      headline: 'What would make you leave the car at home?',
      explanation:
        'The EU already supports sustainable urban mobility. Our 2050 proposal puts reliable buses, trains and trams at the centre of everyday travel, with services suited to each place. What should investment prioritise?',
      statistics: [],
    },
    choices: [
      {
        id: 'transport-local-path',
        title: 'Continue with local plans',
        description: 'Keep improvements within existing local and national priorities.',
        effects: scenarioEffects['transport-local-path'],
        visual: {},
        resultHeadline: 'Improve at the local pace.',
        consequences: [
          'Local authorities can tailor services to their communities and existing budgets.',
          'This choice adds no shared investment commitment. It does not imply that existing plans or services stand still.',
          'We would still need to ask whether current plans deliver reliable and accessible alternatives to driving.',
        ],
      },
      {
        id: 'reliable-public-transport',
        title: 'Prioritise reliable public transport',
        description:
          'Support frequent, accessible services and useful connections, rather than infrastructure alone.',
        effects: scenarioEffects['reliable-public-transport'],
        visual: {},
        resultHeadline: 'Make public transport worth choosing.',
        consequences: [
          'Our proposal aims to make everyday journeys possible without a car. That depends on frequency, affordability, accessibility and connections.',
          'Building a line is only part of the task: services also need long-term funding, staff and maintenance.',
          'Different places need different solutions. We cannot promise every city a tram or forecast how many drivers would switch.',
        ],
      },
    ],
    sourceIds: ['urban-mobility'],
    teamVision: {
      choiceId: 'reliable-public-transport',
      status: 'approved',
      explanation:
        'Invest in reliable public transport so that fewer everyday journeys need a car.',
    },
  },
  {
    id: 'repair-reuse',
    title: 'Repair & reuse',
    eyebrow: 'Keep useful things in use',
    status: 'illustrative',
    evaluation: 'qualitative',
    present: {
      headline: 'Repair it, or replace it?',
      explanation:
        'EU repair rules already cover certain products. Our 2050 vision goes further: make durability, repair and reuse everyday practice. How far should the EU push that change?',
      statistics: [],
    },
    choices: [
      {
        id: 'existing-repair-rules',
        title: 'Focus on existing repair rules',
        description: 'Prioritise implementing current protections before proposing wider measures.',
        effects: scenarioEffects['existing-repair-rules'],
        visual: {},
        resultHeadline: 'Make existing rights work.',
        consequences: [
          'Implementation can help people use the repair protections that already exist for covered products.',
          'Current rules have a defined scope; this option does not create a universal right to repair every product.',
          'Affordability, spare parts and access to repairers still matter even where a legal right exists.',
        ],
      },
      {
        id: 'repair-first',
        title: 'Make repair and reuse the default',
        description:
          'Support durable design, spare parts and accessible repairs, alongside changes in how we buy.',
        effects: scenarioEffects['repair-first'],
        visual: {},
        resultHeadline: 'Keep products in the loop.',
        consequences: [
          'Our aim is to keep useful products working longer and reduce avoidable disposal.',
          'Manufacturers would need to design for durability and repair; people would need affordable, convenient services.',
          'Price, safety and access need attention. A circular economy is an ambition, not a promise that waste disappears by 2050.',
        ],
      },
    ],
    sourceIds: ['right-to-repair'],
    teamVision: {
      choiceId: 'repair-first',
      status: 'approved',
      explanation: 'Make repair, reuse and longer-lasting products ordinary practice.',
    },
  },
];
