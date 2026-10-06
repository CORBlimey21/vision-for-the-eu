import { useEffect, useRef } from 'react';
import { sources } from '../data/sources';
import { aiDisclosure, school, teamMembers } from '../content/project';
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
        <span className="eyebrow">About, sources and AI assistance</span>
        <button className="icon-button" onClick={onClose} aria-label="Close sources">
          <Icon name="close" />
        </button>
      </div>
      <h2>Vision for the EU</h2>
      <p className="project-credit">
        {school} · {teamMembers.join(' · ')}
      </p>
      <h3>{aiDisclosure.title}</h3>
      {aiDisclosure.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <h3>What the map shows</h3>
      <p>
        The dates and membership history have sources. The map uses current country boundaries. The
        narrated proposals express our views; they are not forecasts.
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
      <h3>About the recordings and graphics</h3>
      <p>
        Our team positions were confirmed as agreed on 4 October 2026. Recordings are edited
        excerpts; flagged wording and unsupported passages are omitted. Subtitles use machine
        transcription with approximate timing. The original recordings remain preserved.
      </p>
      <p>
        Graphics illustrate our proposals, not measured outcomes. Globe lines express potential
        cooperation, not infrastructure routes. Implementation details and future outcomes remain
        open.
      </p>
      <h3>Playback stays in this session</h3>
      <p>
        This website uses no analytics or tracking cookies and saves no playback preferences. Voice
        and subtitles start on. At least one stays enabled, and narration pauses when the page is
        hidden.
      </p>
    </dialog>
  );
}
