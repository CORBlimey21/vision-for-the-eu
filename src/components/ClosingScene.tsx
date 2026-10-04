import type { Ref } from 'react';
import { motion } from 'motion/react';
import { closingMessage, school, teamMembers } from '../content/project';
import { Icon } from './Icon';

interface Props {
  headingRef: Ref<HTMLHeadingElement>;
  reduced: boolean;
  onReplay: () => void;
  onExplore: () => void;
}

export function ClosingScene({ headingRef, reduced, onReplay, onExplore }: Props) {
  return (
    <div className="closing-scene">
      <motion.svg
        className="closing-stars"
        viewBox="0 0 160 160"
        aria-hidden="true"
        initial={{ opacity: reduced ? 1 : 0, rotate: reduced ? 0 : -12 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: reduced ? 0 : 1.4, ease: 'easeOut' }}
      >
        <circle cx="80" cy="80" r="59" />
        {Array.from({ length: 12 }, (_, index) => (
          <g key={index} transform={`rotate(${index * 30} 80 80)`}>
            <path d="m80 14 1.7 4.7h5l-4 3 1.5 4.8-4.2-3-4.2 3 1.5-4.8-4-3h5Z" />
          </g>
        ))}
        <path className="closing-thread" d="M53 81h54M80 54v54" />
        <text x="80" y="84" textAnchor="middle">
          EU
        </text>
      </motion.svg>
      <p className="eyebrow">Our Europe. Our shared future.</p>
      <h1 ref={headingRef} tabIndex={-1}>
        Thank you.
        <br />
        <em>From all of us.</em>
      </h1>
      <p className="story-copy">{closingMessage}</p>
      <ul className="closing-names" aria-label="The project team">
        {teamMembers.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <p className="closing-school">{school} · Vision for the EU</p>
      <div className="closing-actions">
        <button className="primary-button" onClick={onReplay}>
          Hear our vision again <Icon name="arrow" />
        </button>
        <button className="text-button" onClick={onExplore}>
          Explore Europe ↗
        </button>
      </div>
    </div>
  );
}
