import type { Statistic } from '../domain/types';
import { sources } from '../data/sources';
/** Empty by default: real content can be added without inventing current statistics. */
export function Statistics({ items }: { items: Statistic[] }) {
  if (!items.length) return null;
  return (
    <dl className="statistics">
      {items.map((item) => {
        const source = sources.find((s) => s.id === item.sourceId);
        return (
          <div key={`${item.label}-${item.year}`}>
            <dt>{item.label}</dt>
            <dd>
              {item.value.toLocaleString('en-IE')} {item.unit}
              <small>
                {item.year} ·{' '}
                {item.status === 'illustrative' ? (
                  'Illustrative example'
                ) : source ? (
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title} ↗
                  </a>
                ) : (
                  'Source pending review'
                )}
              </small>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
