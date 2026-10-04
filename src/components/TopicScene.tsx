import { sources } from '../data/sources';
import type { Ref } from 'react';
import { cueAt, formatMediaTime, type NarratedTopic, type Recording } from '../domain/narration';
import type { useNarration } from '../app/useNarration';
import { Icon } from './Icon';

interface Props {
  topic: NarratedTopic;
  pointIndex: number;
  recording: Recording;
  player: ReturnType<typeof useNarration>;
  autoAdvance: boolean;
  onAutoAdvance: () => void;
  headingRef: Ref<HTMLHeadingElement>;
  onPoint: (index: number) => void;
  onNextTopic: () => void;
  lastTopic: boolean;
}
/** The same scene presents every narrated point, player, subtitles and evidence. */
export function TopicScene({
  topic,
  pointIndex,
  recording,
  player,
  autoAdvance,
  onAutoAdvance,
  headingRef,
  onPoint,
  onNextTopic,
  lastTopic,
}: Props) {
  const point = topic.points[pointIndex];
  const cue = cueAt(recording.cues, player.time);
  return (
    <>
      <p className="eyebrow">
        <span className="accent-dot" /> {topic.title}{' '}
        <span className="draft-tag">Our position</span>
      </p>
      <p className="point-counter">
        Point {pointIndex + 1} of {topic.points.length}
      </p>
      <h1 ref={headingRef} tabIndex={-1} className="future-title">
        {point.title}
      </h1>
      <p className="policy-explanation">{point.position}</p>
      <div className="narration-player" aria-label="Narration controls">
        <div className="narration-play-row">
          <button
            className="narration-play"
            onClick={player.togglePlay}
            aria-label={
              player.playing
                ? 'Pause narration'
                : player.modes.voice
                  ? 'Play narration'
                  : 'Play subtitles'
            }
          >
            <Icon name={player.playing ? 'pause' : 'play'} />
            {player.playing ? 'Pause' : player.ended ? 'Replay' : 'Play'}
          </button>
          <span className="media-time">
            {formatMediaTime(player.time)} / {formatMediaTime(player.duration)}
          </span>
          <button className="text-button" onClick={player.restart} aria-label="Restart this point">
            ↺ Restart
          </button>
        </div>
        <label className="sr-only" htmlFor="narration-seek">
          Seek within this point
        </label>
        <input
          id="narration-seek"
          className="narration-seek"
          type="range"
          min="0"
          max={player.duration}
          step="0.1"
          value={Math.min(player.time, player.duration)}
          onChange={(event) => player.seek(Number(event.target.value))}
          aria-valuetext={`${formatMediaTime(player.time)} of ${formatMediaTime(player.duration)}`}
        />
        <div className="presentation-modes" role="group" aria-label="Voice and subtitles">
          <button aria-pressed={player.modes.voice} onClick={() => player.toggleMode('voice')}>
            Voice <span>{player.modes.voice ? 'On' : 'Off'}</span>
          </button>
          <button
            aria-pressed={player.modes.subtitles}
            onClick={() => player.toggleMode('subtitles')}
          >
            Subtitles <span>{player.modes.subtitles ? 'On' : 'Off'}</span>
          </button>
        </div>
        <span className="sr-only" role="status">
          Voice {player.modes.voice ? 'on' : 'off'}. Subtitles{' '}
          {player.modes.subtitles ? 'on' : 'off'}.
        </span>
        <p className="mode-help">At least voice or subtitles stays on.</p>
        {player.modes.subtitles && (
          <div className="narration-subtitles" aria-label="English subtitles" aria-live="off">
            <span className="eyebrow">
              {player.modes.voice ? 'Subtitles' : 'Subtitles · voice off'}
            </span>
            <p>
              {cue?.text ??
                (player.ended
                  ? 'End of this point.'
                  : player.time === 0
                    ? 'Press Play to hear our decision, or follow it with subtitles.'
                    : '…')}
            </p>
          </div>
        )}
        {player.loading && (
          <p className="playback-message" role="status">
            Loading audio…
          </p>
        )}
        {player.error && (
          <p className="playback-message" role="status">
            {player.error}
          </p>
        )}
        {player.ended && pointIndex === topic.points.length - 1 && (
          <p className="playback-message" role="status">
            Chapter complete. Continue when you are ready.
          </p>
        )}
        <button className="autoplay-toggle" aria-pressed={autoAdvance} onClick={onAutoAdvance}>
          Continue through this chapter <span>{autoAdvance ? 'On' : 'Off'}</span>
        </button>
      </div>
      <nav className="point-navigation" aria-label="Narrated points">
        <button disabled={pointIndex === 0} onClick={() => onPoint(pointIndex - 1)}>
          ← Previous point
        </button>
        <span>
          {String(pointIndex + 1).padStart(2, '0')} / {String(topic.points.length).padStart(2, '0')}
        </span>
        {pointIndex < topic.points.length - 1 ? (
          <button onClick={() => onPoint(pointIndex + 1)}>Next point →</button>
        ) : (
          <button onClick={onNextTopic}>{lastTopic ? 'Thank you →' : 'Next chapter →'}</button>
        )}
      </nav>
      {point.qualification && <p className="narration-context">{point.qualification}</p>}
      <details className="topic-evidence">
        <summary>Read this recording</summary>
        <p>Subtitles are based on edited machine transcription; timing is approximate.</p>
        <ol className="recording-transcript">
          {recording.cues.map((line, index) => (
            <li key={index}>
              <button
                onClick={() => player.seek(line.start)}
                aria-label={`Seek to ${formatMediaTime(line.start)}`}
              >
                {formatMediaTime(line.start)}
              </button>
              <span>{line.text}</span>
            </li>
          ))}
        </ol>
      </details>
      <details className="topic-evidence">
        <summary>Factual background & sources</summary>
        <p>
          These sources explain current arrangements. Our recordings describe team views and
          aspirations, not forecasts.
        </p>
        {topic.sourceIds.map((id) => {
          const source = sources.find((item) => item.id === id);
          return source ? (
            <a key={id} href={source.url} target="_blank" rel="noreferrer">
              {source.title} ↗
            </a>
          ) : null;
        })}
      </details>
      <details className="topic-evidence point-index">
        <summary>All points in this chapter</summary>
        {topic.points.map((item, index) => (
          <button
            key={item.id}
            aria-current={index === pointIndex ? 'step' : undefined}
            onClick={() => onPoint(index)}
          >
            {String(index + 1).padStart(2, '0')} · {item.title}
          </button>
        ))}
      </details>
    </>
  );
}
