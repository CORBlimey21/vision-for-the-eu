export const votingExample = {
  title: 'The same voices. A different rule.',
  premise: 'Imagine 26 governments support a proposal. One takes a different position.',
  scope: 'Fictional vote · all 27 participate · no country positions implied',
  rules: {
    unanimity: {
      label: 'Unanimity',
      pass: 'Abstention leaves the way open.',
      block: 'One objection stops the decision.',
    },
    'qualified-majority': {
      label: 'Proposed wider QMV',
      pass: 'One state cannot block this vote.',
      block: '',
    },
  },
  explanation: {
    unanimity: 'An opposing vote blocks a unanimous decision. An abstention does not.',
    'qualified-majority':
      'In this 26-to-1 example, the proposal passes: a blocking minority needs at least four states. Most QMV votes also depend on population; equal-sized marks here are not population weights.',
  },
  qualification:
    'Extending this rule to more foreign-policy decisions is the team’s proposal, not the current rule for all such decisions.',
};
