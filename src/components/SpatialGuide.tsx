import { AnimatePresence, motion } from 'motion/react';
import { spatialNotes } from '../content/spatialNotes';
export function SpatialGuide({
  active,
  onChange,
  reduced,
}: {
  active: string;
  onChange: (id: string) => void;
  reduced: boolean;
}) {
  const note = spatialNotes.find((n) => n.id === active) ?? spatialNotes[0];
  return (
    <aside className="spatial-guide" aria-label="Explore what the connections mean">
      <span className="eyebrow">Inside the idea</span>
      <div className="spatial-tabs" role="group" aria-label="Connection explanations">
        {spatialNotes.map((n) => (
          <button
            key={n.id}
            aria-label={n.label}
            aria-pressed={n.id === note.id}
            onClick={() => onChange(n.id)}
          >
            {n.number}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: reduced ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          aria-live="polite"
        >
          <h2>{note.title}</h2>
          <p>{note.description}</p>
        </motion.div>
      </AnimatePresence>
      <span className="spatial-footnote">An illustrative network · not actual routes</span>
    </aside>
  );
}
