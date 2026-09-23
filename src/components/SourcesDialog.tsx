import { useEffect, useRef } from 'react';
import { sources } from '../data/sources';
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
      <h2>What the map shows</h2>
      <p>
        The dates and membership history have sources. The map uses current country boundaries.
        Policy scenarios explain ideas; they are not forecasts.
      </p>
      <h3>Geography & history</h3>
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
        The scores and routes are authored examples awaiting team research review. Lines express
        potential cooperation, not actual or proposed electricity infrastructure. Existing grid
        connections are not represented. No numerical forecast is made.
      </p>
      <h3>Your choices stay here</h3>
      <p>
        This version sends no responses, sets no tracking cookies, and stores no choices. Choices
        reset when you reload. Anonymous comparison is not implemented. The team vision is an
        editable draft, not an approved consensus.
      </p>
    </dialog>
  );
}
