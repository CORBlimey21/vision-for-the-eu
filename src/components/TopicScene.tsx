import { sources } from '../data/sources';
import type { Ref } from 'react';
import type { Topic } from '../domain/types';
import { Statistics } from './Statistics';
import { Icon } from './Icon';
interface Props {
  topic: Topic;
  selectedChoice?: string;
  showResults: boolean;
  consequences: string[];
  headingRef: Ref<HTMLHeadingElement>;
  onChoose: (id: string) => void;
  onResults: () => void;
  onRevise: () => void;
}
/** Shared by any topic: no topic-specific branches or separate pages. */
export function TopicScene({
  topic,
  selectedChoice,
  showResults,
  consequences,
  headingRef,
  onChoose,
  onResults,
  onRevise,
}: Props) {
  const selected = topic.choices.find((choice) => choice.id === selectedChoice);
  return (
    <>
      <p className="eyebrow">
        <span className="accent-dot" /> {topic.title}{' '}
        {topic.status === 'illustrative' && <span className="draft-tag">Illustrative</span>}
      </p>
      <h1 ref={headingRef} tabIndex={-1} className="future-title">
        {showResults
          ? (selected?.resultHeadline ?? 'Your possible future.')
          : topic.present.headline}
      </h1>
      {!showResults ? (
        <>
          <p className="policy-explanation">{topic.present.explanation}</p>
          <Statistics items={topic.present.statistics} />
          <div
            className="policy-choices"
            role="group"
            aria-label={`Choose an option for ${topic.title.toLowerCase()}`}
          >
            {topic.choices.map((choice) => (
              <button
                key={choice.id}
                aria-pressed={selectedChoice === choice.id}
                className={`policy-choice ${selectedChoice === choice.id ? 'chosen' : ''}`}
                onClick={() => onChoose(choice.id)}
              >
                <span className="choice-indicator" />
                <span>
                  <strong>{choice.title}</strong>
                  <small>{choice.description}</small>
                </span>
                <span className="choice-arrow">↗</span>
              </button>
            ))}
          </div>
          <button className="primary-button" disabled={!selectedChoice} onClick={() => onResults()}>
            See the consequences
            <Icon name="arrow" />
          </button>
        </>
      ) : (
        <>
          <ol className="consequences">
            {consequences.map((text, i) => (
              <li key={text}>
                <span>0{i + 1}</span>
                {text}
              </li>
            ))}
          </ol>
          <button className="outline-button" onClick={() => onRevise()}>
            ← Revisit your choice
          </button>
        </>
      )}
      <details className="topic-evidence">
        <summary>Factual background & sources</summary>
        <p>
          The sources explain existing arrangements. Choices and scored effects are authored
          proposals, not findings from these sources.
        </p>
        {topic.sourceIds.map((id) => {
          const source = sources.find((s) => s.id === id);
          return source ? (
            <a key={id} href={source.url} target="_blank" rel="noreferrer">
              {source.title} ↗
            </a>
          ) : null;
        })}
      </details>
      <p className="model-note">
        An explanatory scenario, not a forecast.
        <br />
        Routes and effects are illustrative.
      </p>
    </>
  );
}
