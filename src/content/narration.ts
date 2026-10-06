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
    id: 'funding',
    title: 'Fund shared progress',
    introduction: 'How should contributions and shared investment work together?',
    sourceIds: ['eu-budget', 'irish-transactions-2022', 'eu-budget-data'],
    points: [
      {
        id: 'funding-sources',
        recordingId: 'funding1',
        title: 'Contribute to shared goals.',
        position:
          'The point: national contributions help finance the EU budget. Our decision is to judge that shared funding by what it can achieve together.',
        graphic: 'ambition',
        graphicLabels: ['Contribute', 'Invest', 'Review'],
        qualification:
          'GNI-based contributions are one source of revenue, alongside customs duties, VAT-based contributions and non-recycled plastic packaging contributions. Corrections also apply; this is a simplified explanation.',
      },
      {
        id: 'funding-fairness',
        recordingId: 'funding2',
        title: 'What makes funding fair?',
        position:
          'The point: countries can contribute and receive different amounts. Our decision is to consider the wider purpose of cooperation alongside direct budget flows.',
        graphic: 'trust',
        graphicLabels: ['Contributions', 'Shared benefits', 'Fairness'],
        qualification:
          'Ireland’s approximately €3.6 billion contribution in 2022 is supported by the Department of Finance’s cash-based report. The rest of the numerical comparison is omitted: national cash reports and Commission accounting data differ, and direct budget flows do not measure all membership benefits.',
      },
      {
        id: 'funding-purpose',
        recordingId: 'funding3',
        title: 'Invest in future opportunity.',
        position:
          'Our decision: support investment that helps economies build capacity, opportunities and connections. Assess the results rather than assuming every project succeeds.',
        graphic: 'ambition',
        graphicLabels: ['Build capacity', 'Create opportunity', 'Evaluate'],
        qualification:
          'The recording describes a rationale for investment, not a measured causal effect. Its Portugal GDP figure and claim of proof are omitted.',
      },
    ],
  },
  {
    id: 'decision-making',
    title: 'Decide together',
    introduction: 'How can the EU act together while protecting national consent?',
    sourceIds: ['qmv', 'unanimity', 'sanctions', 'cfsp-treaty', 'eu-courts', 'article-7'],
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
          'Wider majority voting is our proposed reform. It does not guarantee faster or better policy outcomes.',
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
      {
        id: 'shared-rules',
        recordingId: 'rogue-member-states',
        title: 'Shared rules need accountability.',
        position:
          'Our decision: make cooperation accountable through lawful enforcement of shared EU obligations, with independent courts and clear procedures.',
        graphic: 'trust',
        graphicLabels: ['Shared rules', 'Independent courts', 'Accountability'],
        qualification:
          'EU-law infringement proceedings and Article 7 protection of EU values are different procedures. Penalties are subject to legal conditions; disagreement with a policy is not itself a breach. The judicial institution includes both the Court of Justice and the General Court.',
      },
    ],
  },
  {
    id: 'ireland',
    title: 'Ireland’s next steps',
    introduction: 'How can Ireland make more of its EU membership?',
    sourceIds: ['ireland-eu', 'horizon-europe', 'erasmus', 'irish-offshore'],
    points: [
      {
        id: 'ireland-opportunities',
        recordingId: 'what-ireland-should-do1',
        title: 'Make membership work for Ireland.',
        position:
          'Our decision: turn EU membership into practical opportunities through funding, education, trade and cooperation.',
        graphic: 'ambition',
        graphicLabels: ['Funding', 'Education', 'Cooperation'],
      },
      {
        id: 'ireland-funding',
        recordingId: 'what-ireland-should-do2',
        title: 'Help people access funding.',
        position:
          'Our decision: give businesses, community groups and local organisations clearer guidance and support to apply for suitable EU funding.',
        graphic: 'ambition',
        graphicLabels: ['Find programmes', 'Get support', 'Apply'],
        qualification:
          'Funding depends on programme eligibility, selection and delivery requirements; support does not guarantee an award.',
      },
      {
        id: 'ireland-research',
        recordingId: 'what-ireland-should-do3',
        title: 'Research together.',
        position:
          'Our decision: connect Irish universities and businesses with European research partners in healthcare, AI and renewable energy.',
        graphic: 'digital',
        graphicLabels: ['Research partners', 'Shared knowledge', 'Innovation'],
        qualification:
          'Horizon Europe supports research and innovation. The possible jobs and improvements described in the recording are ambitions, not forecasts.',
      },
      {
        id: 'ireland-business',
        recordingId: 'what-ireland-should-do4',
        title: 'Help smaller businesses reach Europe.',
        position:
          'Our decision: help smaller Irish companies understand EU requirements and expand into the single market.',
        graphic: 'trust',
        graphicLabels: ['Understand rules', 'Support businesses', 'Reach customers'],
        qualification:
          'The single market reduces many barriers; it does not remove every regulatory requirement or business cost.',
      },
      {
        id: 'ireland-wind',
        recordingId: 'what-ireland-should-do5',
        title: 'Develop offshore wind responsibly.',
        position:
          'Our decision: invest in Ireland’s offshore wind potential as part of a cleaner, more connected energy system.',
        graphic: 'energy',
        graphicLabels: ['Wind potential', 'Investment', 'Grid connections'],
        qualification:
          'Ireland has an offshore renewable-energy framework. Project delivery still depends on planning, environmental assessment, infrastructure and investment; benefits are not guaranteed.',
      },
      {
        id: 'ireland-education',
        recordingId: 'what-ireland-should-do6',
        title: 'Open more European opportunities.',
        position:
          'Our decision: increase participation in Erasmus+ and other European learning opportunities, helping students gain experience, languages and international connections.',
        graphic: 'ambition',
        graphicLabels: ['Study', 'Train', 'Connect'],
        qualification:
          'Erasmus+ opportunities have eligibility and application requirements, often through a school, college or other organisation.',
      },
      {
        id: 'ireland-conclusion',
        recordingId: 'what-ireland-should-do7',
        title: 'Turn cooperation into action.',
        position:
          'Our decision: connect funding advice, business support, research, renewable energy and education so Ireland can make more of its EU membership.',
        graphic: 'trust',
        graphicLabels: ['Practical support', 'European partners', 'Shared opportunity'],
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
