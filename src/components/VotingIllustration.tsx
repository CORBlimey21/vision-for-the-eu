import { useState } from 'react';
import { explainVote, type RemainingVote, type VotingRule } from '../domain/voting';
import { votingExample as copy } from '../content/voting';

/** A reusable visual explanation, selected by content schema, not a policy page. */
export function VotingIllustration({ rule }: { rule: VotingRule }) {
  const [remainingVote, setRemainingVote] = useState<RemainingVote>('oppose');
  const result = explainVote(rule, remainingVote);
  return (
    <section
      className={`voting-illustration ${result.passes ? 'vote-passes' : 'vote-blocked'}`}
      aria-label="Illustrative Council vote"
    >
      <p className="eyebrow">{copy.title}</p>
      <p className="vote-premise">{copy.premise}</p>
      <div className="vote-orbit">
        <svg viewBox="0 0 280 200" aria-hidden="true">
          <ellipse cx="140" cy="105" rx="110" ry="78" className="vote-orbit-track" />
          {Array.from({ length: 27 }, (_, i) => {
            const angle = (i / 27) * Math.PI * 2 - Math.PI / 2;
            const x = 140 + Math.cos(angle) * 110,
              y = 105 + Math.sin(angle) * 78;
            return (
              <g key={i} className={i === 0 ? `vote-last ${remainingVote}` : 'vote-support'}>
                <circle cx={x} cy={y} r={i === 0 ? 9 : 5} />
                {i === 0 && (
                  <text x={x} y={y + 4} textAnchor="middle">
                    {remainingVote === 'oppose' ? '×' : '–'}
                  </text>
                )}
              </g>
            );
          })}
          <text x="140" y="103" textAnchor="middle" className="vote-number">
            26 + 1
          </text>
          <text x="140" y="126" textAnchor="middle" className="vote-rule">
            {copy.rules[rule].label}
          </text>
        </svg>
      </div>
      <div className="vote-switch" role="group" aria-label="Position of the remaining government">
        <button
          aria-pressed={remainingVote === 'oppose'}
          onClick={() => setRemainingVote('oppose')}
        >
          One opposes
        </button>
        <button
          aria-pressed={remainingVote === 'abstain'}
          onClick={() => setRemainingVote('abstain')}
        >
          One abstains
        </button>
      </div>
      <div className="vote-outcome" role="status">
        <strong>{result.passes ? 'Decision passes' : 'Decision blocked'}</strong>
        <p>{result.passes ? copy.rules[rule].pass : copy.rules[rule].block}</p>
      </div>
      <details className="topic-evidence">
        <summary>How this example works</summary>
        <p>{copy.explanation[rule]}</p>
        <p>{copy.qualification}</p>
        <a
          href="https://www.consilium.europa.eu/en/council-eu/how-does-the-council-vote/qualified-majority/"
          target="_blank"
          rel="noreferrer"
        >
          Council: QMV and blocking minorities ↗
        </a>
        <a
          href="https://www.consilium.europa.eu/en/council-eu/how-does-the-council-vote/unanimity/"
          target="_blank"
          rel="noreferrer"
        >
          Council: unanimity and abstention ↗
        </a>
      </details>
      <p className="model-note">{copy.scope}</p>
    </section>
  );
}
