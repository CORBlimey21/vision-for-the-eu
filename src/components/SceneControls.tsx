import { Icon } from './Icon';
interface Props {
  canCompare: boolean;
  flowsAvailable: boolean;
  baseline: boolean;
  paused: boolean;
  reduced: boolean;
  onCompare: (enabled: boolean) => void;
  onPause: () => void;
  onReset: () => void;
}
/** View-only controls never change the visitor's saved policy selection. */
export function SceneControls({
  canCompare,
  flowsAvailable,
  baseline,
  paused,
  reduced,
  onCompare,
  onPause,
  onReset,
}: Props) {
  return (
    <div className="scene-controls" aria-label="Scenario view controls">
      <div
        className="comparison-switch"
        role="group"
        aria-label="Compare the additional scenario effects"
      >
        <button aria-pressed={!baseline} disabled={!canCompare} onClick={() => onCompare(false)}>
          Your choice
        </button>
        <button aria-pressed={baseline} disabled={!canCompare} onClick={() => onCompare(true)}>
          Without this change
        </button>
      </div>
      <div className="scene-control-tools">
        <button
          className="icon-button"
          aria-label="Reframe Europe"
          title="Reframe Europe"
          onClick={onReset}
        >
          <Icon name="reset" />
        </button>
        {flowsAvailable && (
          <button
            className="text-button"
            disabled={reduced || !flowsAvailable || baseline}
            onClick={onPause}
          >
            {reduced ? 'Static view' : paused ? 'Resume flows' : 'Pause flows'}
            <Icon name={paused ? 'play' : 'pause'} />
          </button>
        )}
      </div>
    </div>
  );
}
