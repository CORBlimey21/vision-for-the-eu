import type { NarratedTopic } from '../domain/narration';

export const narratedTopics: NarratedTopic[] = [
  {
    id: 'ambition',
    title: 'Keep the ambition',
    introduction: 'What should stay at the heart of the European project?',
    sourceIds: ['sdgs', 'climate-law'],
    points: [
      {
        id: 'goals',
        recordingId: 'what-needs-to-stay-the-same1',
        title: 'Keep aiming high.',
        position:
          'Our decision: keep clear goals for sustainability and people’s lives, and turn that ambition into action.',
        graphic: 'ambition',
        graphicLabels: ['Set goals', 'Take action', 'Review progress'],
      },
      {
        id: 'sdgs',
        recordingId: 'what-needs-to-stay-the-same2',
        title: 'A shared direction.',
        position:
          'Our decision: support the UN Sustainable Development Goals across education, equality, clean water and the environment.',
        graphic: 'ambition',
        graphicLabels: ['People', 'Opportunity', 'Environment'],
      },
      {
        id: 'climate-ambition',
        recordingId: 'what-needs-to-stay-the-same3',
        title: 'Keep climate ambition.',
        position:
          'Our decision: keep working towards a climate-neutral Europe, without assuming that today’s progress is enough.',
        graphic: 'ambition',
        graphicLabels: ['Reduce emissions', 'Improve systems', 'Check progress'],
        qualification:
          'Climate neutrality by 2050 is an EU legal objective, not a guarantee of delivery.',
      },
      {
        id: 'ambition-conclusion',
        recordingId: 'what-needs-to-stay-the-same4',
        title: 'Targets need follow-through.',
        position:
          'Our decision: maintain ambition while measuring progress honestly. Clear goals should guide practical improvements.',
        graphic: 'ambition',
        graphicLabels: ['Ambition', 'Delivery', 'Evidence'],
      },
    ],
  },
  {
    id: 'energy',
    title: 'Connect our energy',
    introduction: 'What should change in how countries share electricity?',
    sourceIds: ['celtic', 'climate-law'],
    points: [
      {
        id: 'grid-links',
        recordingId: 'what-needs-to-change1',
        title: 'Share clean electricity.',
        position:
          'Our decision: invest in renewable generation and stronger connections between national grids, so countries can exchange electricity when supply and demand differ.',
        graphic: 'energy',
        graphicLabels: ['Generate', 'Connect', 'Share'],
        qualification:
          'The Celtic Interconnector is a real Ireland–France project. The globe’s lines are conceptual, not infrastructure routes.',
      },
      {
        id: 'investment-deal',
        recordingId: 'what-needs-to-change2',
        title: 'Agree a fair investment deal.',
        position:
          'Our decision: seek shared investment with fair access to surplus power. Reduced prices would be a negotiated part of our proposed deal.',
        graphic: 'energy',
        graphicLabels: ['Shared funding', 'Local generation', 'Fair access'],
        qualification:
          'This price arrangement is our proposal, not an existing EU entitlement or a guarantee of cheaper electricity.',
      },
      {
        id: 'shared-benefits',
        recordingId: 'what-needs-to-change3',
        title: 'Share the benefits, too.',
        position:
          'Our decision: make cooperation useful to countries with different resources and needs, and agree how the benefits and costs are shared.',
        graphic: 'energy',
        graphicLabels: ['Different resources', 'Connected grids', 'Shared benefits'],
        qualification:
          'Renewable potential varies. We do not assume that small or landlocked countries cannot generate renewable power, or that imports always reduce prices.',
      },
    ],
  },
  {
    id: 'decision-making',
    title: 'Decide together',
    introduction: 'How can the EU act together while protecting national consent?',
    sourceIds: ['qmv', 'unanimity', 'sanctions', 'cfsp-treaty'],
    points: [
      {
        id: 'sovereignty',
        recordingId: 'decision-making1',
        title: 'Why keep a veto?',
        position:
          'The point: some decisions touch deeply on national sovereignty. Our decision needs to balance that protection with the ability to act together.',
        graphic: 'vote',
        graphicLabels: [],
        votingRule: 'unanimity',
        qualification:
          'Council voting rules vary by instrument. Foreign policy generally uses unanimity with exceptions; abstention does not itself block it. Not every EU budget vote requires unanimity.',
      },
      {
        id: 'gridlock',
        recordingId: 'decision-making2',
        title: 'When one “no” stops action.',
        position:
          'The point: where unanimity is required, one opposing government can block a proposal supported by the others.',
        graphic: 'vote',
        graphicLabels: [],
        votingRule: 'unanimity',
      },
      {
        id: 'reform-case',
        recordingId: 'decision-making4',
        title: 'The case for faster action.',
        position:
          'The point: wider majority voting could reduce single-country blocking. Our decision is to seek reform in foreign policy and sanctions.',
        graphic: 'vote',
        graphicLabels: [],
        votingRule: 'qualified-majority',
        qualification:
          'This demonstrates the proposed rule in a fictional 26-to-1 vote. It does not guarantee faster or better policy outcomes.',
      },
      {
        id: 'national-consent',
        recordingId: 'decision-making5',
        title: 'Protect the smaller voices.',
        position:
          'The point: reform also creates a risk of being outvoted. Our decision needs safeguards for smaller states and legitimacy for sensitive decisions.',
        graphic: 'vote',
        graphicLabels: [],
        votingRule: 'unanimity',
        qualification:
          'Changing the foreign-policy rule through Article 31(3) TEU requires unanimous agreement in the European Council.',
      },
      {
        id: 'middle-ground',
        remainingVote: 'abstain',
        recordingId: 'decision-making6',
        title: 'A way past a veto.',
        position:
          'The point: constructive abstention and the treaty’s passerelle offer bounded ways forward. They depend on governments agreeing to use them.',
        graphic: 'vote',
        graphicLabels: [],
        votingRule: 'unanimity',
        qualification:
          'Constructive abstention has treaty conditions. Article 31’s passerelle requires unanimous agreement and excludes decisions with military or defence implications.',
      },
      {
        id: 'our-qmv-decision',
        recordingId: 'decision-making7',
        title: 'Our decision on voting.',
        position:
          'Extend majority voting in foreign policy and sanctions, while leaving taxation and treaty changes outside this proposal.',
        graphic: 'vote',
        graphicLabels: [],
        votingRule: 'qualified-majority',
        qualification:
          'An agreed team proposal, not the current rule for every foreign-policy decision. Military and defence decisions need separate treatment.',
      },
    ],
  },
  {
    id: 'vision-2050',
    title: 'Our Europe / 2050',
    introduction: 'The Europe we want to build, and the trust it would need.',
    sourceIds: ['climate-law', 'urban-mobility', 'right-to-repair'],
    points: [
      {
        id: 'clean-power',
        recordingId: 'our-eu-20501',
        title: 'A cleaner, connected Europe.',
        position:
          'Our decision: develop clean electricity using different countries’ resources, and connect grids so that the benefits can be shared.',
        graphic: 'energy',
        graphicLabels: ['Clean generation', 'Grid connections', 'Shared access'],
        qualification:
          'Our 2050 ambition is not a forecast. Climate neutrality means balancing net greenhouse gas emissions, not eliminating every fuel.',
      },
      {
        id: 'transport',
        recordingId: 'our-eu-20502',
        title: 'Make public transport useful.',
        position:
          'Our decision: invest in reliable, accessible buses, trains and trams suited to each place, so fewer everyday journeys need a car.',
        graphic: 'transport',
        graphicLabels: ['Reliable services', 'Useful connections', 'Accessible journeys'],
        qualification:
          'Different places need different solutions. This is an aspiration, not a promise of a tram in every city or a forecast of car use.',
      },
      {
        id: 'circularity',
        recordingId: 'our-eu-20503',
        title: 'Keep useful things in use.',
        position:
          'Our decision: make durability, repair and reuse ordinary practice. Companies, governments and consumers all have a part to play.',
        graphic: 'circular',
        graphicLabels: ['Design', 'Use', 'Repair', 'Reuse'],
        qualification:
          'The aim is less avoidable waste, not a guarantee that waste disappears. Existing EU repair rules cover specified products.',
      },
      {
        id: 'technology',
        recordingId: 'our-eu-20504',
        title: 'Build digital independence.',
        position:
          'Our decision: invest in European chips, cloud infrastructure and AI research, reducing outside dependence for essential services.',
        graphic: 'digital',
        graphicLabels: ['European capacity', 'Essential services', 'Greater resilience'],
        qualification:
          'This is our direction for 2050, not a guarantee of complete technological self-sufficiency.',
      },
      {
        id: 'identity',
        recordingId: 'our-eu-20505',
        title: 'An identity across borders.',
        position:
          'Our decision: support a digital identity that works across member states. Privacy, voluntary use and access without a smartphone still need clear safeguards.',
        graphic: 'digital',
        graphicLabels: ['Your identity', 'Cross-border access', 'Privacy & choice'],
        qualification:
          'A shared identity cannot itself make national healthcare systems or entitlements identical. The recording describes our desired future.',
      },
      {
        id: 'defence',
        recordingId: 'our-eu-20506',
        title: 'Take responsibility for defence.',
        position:
          'Our decision: work towards an independent European force with unified command alongside national armies.',
        graphic: 'defence',
        graphicLabels: ['National armies', 'Shared command', 'Oversight to agree'],
        qualification:
          'A proposed independent-EU direction, not an existing EU army. Irish neutrality, deployment authority and parliamentary oversight remain unresolved.',
      },
      {
        id: 'trust',
        recordingId: 'our-eu-20507',
        title: 'Trust makes cooperation possible.',
        position:
          'Our decision: build consent and accountability alongside technology and institutions. Large and small countries need a voice in the power they share.',
        graphic: 'trust',
        graphicLabels: ['Public consent', 'Shared responsibility', 'Trust'],
      },
    ],
  },
];
