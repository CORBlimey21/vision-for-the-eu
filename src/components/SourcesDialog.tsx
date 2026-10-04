import { useEffect, useRef } from 'react';
import { sources } from '../data/sources';
import { school, teamMembers } from '../content/project';
import { Icon } from './Icon';
export function SourcesDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    return () => ref.current?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="sources-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-heading">
        <span className="eyebrow">Sources and method</span>
        <button className="icon-button" onClick={onClose} aria-label="Close sources">
          <Icon name="close" />
        </button>
      </div>
      <h2>Vision for the EU</h2>
      <p className="project-credit">
        {school} · {teamMembers.join(' · ')}
      </p>
      <h3>What the map shows</h3>
      <p>
        The dates and membership history have sources. The map uses current country boundaries.
        Policy scenarios explain ideas; they are not forecasts.
      </p>
      <h3>Geography, history & policy sources</h3>
      <p>
        Contemporary GISCO 2024 borders are used throughout. The historical sequence is schematic:
        Germany is shown in its present shape, and historical territorial changes are not
        reconstructed.
      </p>
      <ul>
        {sources.map((source) => (
          <li key={source.id}>
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.title} ↗
            </a>
            <small>Retrieved {source.retrievedAt}</small>
          </li>
        ))}
      </ul>
      <h3>About the policy scenarios</h3>
      <p>
        The scores and routes are authored illustrations. Transport and repair choices use
        qualitative trade-offs without scores. Lines express potential cooperation, not actual or
        proposed electricity infrastructure. Existing grid connections are not represented. No
        numerical forecast is made.
      </p>
      <h3>Your choices stay here</h3>
      <p>
        This version sends no responses, sets no tracking cookies, and stores no choices. Choices
        reset when you reload. Anonymous comparison is not implemented. The team positions were
        confirmed as agreed on 4 October 2026. They describe ambitions; the implementation details
        and future outcomes remain open.
      </p>
    </dialog>
  );
}
