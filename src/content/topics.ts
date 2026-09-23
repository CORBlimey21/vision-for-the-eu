import { scenarioEffects } from '../data/scenarios.ts';
import type { Topic } from '../domain/types';
export const topics: Topic[] = [
  {
    id: 'energy',
    title: 'Energy',
    eyebrow: 'An experiment in connection',
    status: 'illustrative',
    present: {
      headline: 'What if Europe shared more of its power?',
      explanation:
        'Our proposal: invest together in renewable generation and stronger electricity links. Ireland and Spain could share more power when supply and demand differ. The Celtic Interconnector is a real Ireland–France project; the lines here are conceptual.',
      statistics: [],
    },
    choices: [
      {
        id: 'current-path',
        resultHeadline: 'A path unchanged.',
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
        resultHeadline: 'More connected. More to consider.',
        title: 'Connect our energy',
        description:
          'Invest jointly in stronger grids and renewable generation, with fair access to shared benefits.',
        effects: scenarioEffects['shared-grid'],
        consequences: [
          'More connections could help countries share renewable electricity when production and demand differ.',
          'A more connected network could provide more options when a local supply is disrupted.',
          'Our proposed investment deal would seek discounted access to surplus power. This is not an existing EU entitlement: pricing, funding, permitting and fairness would need agreement.',
        ],
        visual: { networkId: 'shared-grid' },
      },
    ],
    sourceIds: ['celtic'],
    teamVision: {
      choiceId: 'shared-grid',
      status: 'draft',
      explanation:
        'Invest together in renewable generation and interconnection. Negotiate fair access to the benefits.',
    },
  },
  {
    id: 'decision-making',
    illustration: 'council-vote',
    title: 'Decision-making',
    eyebrow: 'The power to act together',
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
        resultHeadline: 'Consent before speed.',
        consequences: [
          'A government can prevent a decision it opposes where unanimity is required; abstention does not itself block agreement.',
          'That protection can also delay collective action. Keeping the rule does not guarantee that countries will reach a compromise.',
        ],
      },
      {
        id: 'targeted-qmv',
        title: 'Reform where action matters',
        description:
          'Seek wider QMV for foreign policy and sanctions decisions; retain national control over taxation.',
        effects: scenarioEffects['targeted-qmv'],
        visual: { votingRule: 'qualified-majority' },
        resultHeadline: 'More capacity to act. A harder bargain.',
        consequences: [
          'Our proposal could reduce the ability of one government to block collective foreign-policy action. It would not guarantee agreement or better decisions.',
          'A government could be outvoted on sensitive matters. Safeguards and trust would matter, particularly for smaller states.',
          'This is a proposed reform, not a switch available to voters today. Its legal route needs careful review; military and defence decisions require separate treatment.',
        ],
      },
    ],
    sourceIds: ['qmv', 'unanimity', 'sanctions'],
    teamVision: {
      choiceId: 'targeted-qmv',
      status: 'draft',
      explanation:
        'Seek faster joint action on foreign policy and sanctions, while keeping taxation outside this proposal.',
    },
  },
];
