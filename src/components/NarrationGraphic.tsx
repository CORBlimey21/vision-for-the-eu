import type { NarratedPoint } from '../domain/narration';
import { VotingIllustration } from './VotingIllustration';

/** Content selects a bounded conceptual diagram; no policy-specific pages or measured scales. */
export function NarrationGraphic({ point }: { point: NarratedPoint }) {
  return (
    <aside
      className={`narration-graphic graphic-${point.graphic}`}
      aria-label="Graphic for this point"
    >
      {point.graphic === 'vote' ? (
        <VotingIllustration
          rule={point.votingRule ?? 'unanimity'}
          stance={point.remainingVote}
          interactive={false}
        />
      ) : (
        <>
          <p className="eyebrow">
            {point.graphic === 'energy' ? 'Connected electricity' : 'The idea in view'}
          </p>
          <svg viewBox="0 0 300 200" role="img" aria-label={point.graphicLabels.join(' → ')}>
            {point.graphic === 'circular' ? (
              <>
                <circle cx="150" cy="100" r="65" className="diagram-path" />
                {point.graphicLabels.map((label, index) => {
                  const angle = (index * Math.PI) / 2 - Math.PI / 2;
                  const x = 150 + Math.cos(angle) * 65,
                    y = 100 + Math.sin(angle) * 65;
                  return (
                    <g key={label}>
                      <circle cx={x} cy={y} r="8" className="diagram-node" />
                      <text x={x} y={y + (index === 0 ? -18 : 28)} textAnchor="middle">
                        {label}
                      </text>
                    </g>
                  );
                })}
              </>
            ) : (
              <>
                <path d="M45 70 Q100 30 150 70 T255 70" className="diagram-path" />
                {point.graphicLabels.map((label, index) => (
                  <g key={label}>
                    <circle
                      cx={45 + index * 105}
                      cy="70"
                      r={point.graphic === 'trust' ? 26 : 17}
                      className="diagram-ring"
                    />
                    <circle cx={45 + index * 105} cy="70" r="5" className="diagram-node" />
                    <text x={45 + index * 105} y={112 + (index % 2) * 20} textAnchor="middle">
                      {label.split(' ').slice(0, 2).join(' ')}
                    </text>
                    <text x={45 + index * 105} y={127 + (index % 2) * 20} textAnchor="middle">
                      {label.split(' ').slice(2).join(' ')}
                    </text>
                  </g>
                ))}
              </>
            )}
          </svg>
          <h2>{point.title}</h2>
          <p className="model-note">
            {point.graphic === 'energy'
              ? 'Conceptual links · not infrastructure routes'
              : 'An illustration of our proposal · not a measured outcome'}
          </p>
        </>
      )}
    </aside>
  );
}
