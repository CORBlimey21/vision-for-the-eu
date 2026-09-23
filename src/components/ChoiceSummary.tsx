import type { Topic } from '../domain/types';
export function ChoiceSummary({
  topics,
  selections,
  onEdit,
}: {
  topics: Topic[];
  selections: Record<string, string>;
  onEdit: (id: string) => void;
}) {
  return (
    <details className="choice-summary">
      <summary>Your choices beside our draft</summary>
      <p className="policy-explanation">See where your choices differ from our draft.</p>
      {topics.map((topic) => {
        const visitor = topic.choices.find((c) => c.id === selections[topic.id]);
        const team = topic.choices.find((c) => c.id === topic.teamVision?.choiceId);
        return (
          <div className="choice-summary-row" key={topic.id}>
            <h3>{topic.title}</h3>
            <dl>
              <div>
                <dt>You</dt>
                <dd>{visitor?.title ?? 'Not chosen yet'}</dd>
              </div>
              <div>
                <dt>Our draft</dt>
                <dd>{team?.title ?? 'Still open'}</dd>
              </div>
            </dl>
            <button className="text-button" onClick={() => onEdit(topic.id)}>
              {visitor ? 'Revisit' : 'Explore'} {topic.title.toLowerCase()} ↗
            </button>
          </div>
        );
      })}
    </details>
  );
}
