/** A deliberately bounded example: all 27 participate, 26 support the proposal.
 * No countries or population weights are invented. One state cannot form a
 * blocking minority under the standard QMV rule. This is not a vote calculator.
 */
export type VotingRule = 'unanimity' | 'qualified-majority';
export type RemainingVote = 'oppose' | 'abstain';
export function explainVote(rule: VotingRule, remainingVote: RemainingVote) {
  const passes = rule === 'qualified-majority' || remainingVote === 'abstain';
  return { passes, supporting: 26, remainingVote, rule };
}
