import { useCallback, useEffect, useRef, useState } from 'react';
import { startMedia } from './mediaPlayback';
import { togglePresentation, type Recording } from '../domain/narration';

/** A single native media clock owns playback and caption timing, including silent playback. */
export function useNarration(recording: Recording, active: boolean, onEnd: () => boolean) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const continueNext = useRef(false);
  const request = useRef(0);
  const wantsPlayback = useRef(false);
  const sources = useRef<string[]>([]);
  const sourceIndex = useRef(0);
  const enabled = useRef(active);
  enabled.current = active;
  const failures = useRef<string[]>([]);
  const pendingSeek = useRef<number | null>(null);
  const [details, setDetails] = useState('');
  const endCallback = useRef(onEnd);
  endCallback.current = onEnd;
  const [modes, setModes] = useState({ voice: true, subtitles: true });
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [endedRecording, setEndedRecording] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(recording.duration);
  const pause = useCallback(() => {
    request.current++;
    continueNext.current = false;
    wantsPlayback.current = false;
    audioRef.current?.pause();
    setPlaying(false);
  }, []);
  const play = useCallback(async () => {
    const audio = audioRef.current;
    const source = sources.current[sourceIndex.current];
    if (!audio || !enabled.current || !source) return;
    const ticket = ++request.current;
    setError('');
    setEndedRecording(null);
    wantsPlayback.current = true;
    setLoading(true);
    try {
      await startMedia(audio, source);
      if (ticket === request.current) setPlaying(!audio.paused);
    } catch (reason) {
      if (ticket !== request.current) return;
      wantsPlayback.current = false;
      setDetails(
        [
          ...failures.current,
          reason instanceof Error ? `${reason.name}: ${reason.message}` : String(reason),
        ].join(' · '),
      );
      setPlaying(false);
      setLoading(false);
      setError(
        reason instanceof DOMException && reason.name === 'NotAllowedError'
          ? 'Press Play to start this point.'
          : 'Audio could not play. You can still read the transcript below.',
      );
    }
  }, []);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const shouldContinue = continueNext.current && active && !document.hidden;
    continueNext.current = false;
    request.current++;
    audio.pause();
    wantsPlayback.current = false;
    setPlaying(false);
    setEndedRecording(null);
    setTime(0);
    pendingSeek.current = null;
    setError('');
    setDetails('');
    failures.current = [];
    setDuration(recording.duration);
    setLoading(false);
    sources.current = audio.canPlayType('audio/mp4; codecs="mp4a.40.2"')
      ? [recording.file, recording.fallbackFile]
      : [recording.fallbackFile];
    sources.current = sources.current.map(
      (file) => new URL(`${import.meta.env.BASE_URL}audio/${file}`, document.baseURI).href,
    );
    sourceIndex.current = 0;
    if (active && audio.currentSrc === sources.current[0] && Number.isFinite(audio.duration))
      audio.currentTime = 0;
    // Manual navigation prepares the source; the Play tap performs the first load.
    if (!active && audio.getAttribute('src')) {
      audio.removeAttribute('src');
      audio.load();
    }
    if (shouldContinue) void play();
    return () => {
      request.current++;
      wantsPlayback.current = false;
      audio.pause();
    };
  }, [recording.id, recording.file, recording.fallbackFile, recording.duration, active, play]);
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = !modes.voice;
  }, [modes.voice]);
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) pause();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [pause]);
  const seek = useCallback(
    (seconds: number) => {
      const audio = audioRef.current;
      const target = Math.max(0, Math.min(recording.duration, seconds));
      if (!audio || !enabled.current) return;
      if (
        audio.currentSrc !== sources.current[sourceIndex.current] ||
        !Number.isFinite(audio.duration)
      ) {
        pendingSeek.current = target;
        setTime(target);
      } else {
        audio.currentTime = Math.min(audio.duration, target);
        setTime(audio.currentTime);
      }
      setEndedRecording(null);
    },
    [recording.duration],
  );
  return {
    audioRef,
    modes,
    time,
    duration,
    playing,
    ended: endedRecording === recording.id,
    error,
    details,
    loading,
    pause,
    play,
    seek,
    togglePlay: () => (playing ? pause() : void play()),
    toggleMode: (mode: 'voice' | 'subtitles') =>
      setModes((current) => togglePresentation(current, mode)),
    restart: () => {
      seek(0);
      void play();
    },
    mediaEvents: {
      onTimeUpdate: () => {
        const audio = audioRef.current;
        if (enabled.current && audio?.currentSrc === sources.current[sourceIndex.current])
          setTime(audio.currentTime);
      },
      onLoadedMetadata: () => {
        const value = audioRef.current?.duration;
        if (
          audioRef.current?.currentSrc === sources.current[sourceIndex.current] &&
          value &&
          Number.isFinite(value)
        ) {
          setDuration(value);
          const audio = audioRef.current;
          if (audio && pendingSeek.current !== null) {
            audio.currentTime = Math.min(value, pendingSeek.current);
            pendingSeek.current = null;
            setTime(audio.currentTime);
          }
        }
      },
      onPlaying: () => {
        setPlaying(!audioRef.current?.paused);
        setLoading(false);
      },
      onPause: () => setPlaying(false),
      onWaiting: () => setLoading(true),
      onCanPlay: () => setLoading(false),
      onEnded: () => {
        if (!enabled.current || !wantsPlayback.current) return;
        wantsPlayback.current = false;
        setPlaying(false);
        setEndedRecording(recording.id);
        continueNext.current = endCallback.current();
      },
      onError: () => {
        const audio = audioRef.current;
        if (!enabled.current || !audio?.error || audio.src !== sources.current[sourceIndex.current])
          return;
        const format = audio.src.endsWith('.m4a') ? 'AAC' : 'MP3';
        const labels = [
          'unknown',
          'interrupted',
          'network error',
          'decoding error',
          'unsupported source',
        ];
        failures.current.push(
          `${format}: ${labels[audio.error.code] ?? 'unknown'} (${audio.error.code})${audio.error.message ? ` — ${audio.error.message}` : ''}`,
        );
        setDetails(failures.current.join(' · '));
        request.current++;
        const fallback = sources.current[sourceIndex.current + 1];
        if (fallback) {
          const resume = wantsPlayback.current && !document.hidden;
          sourceIndex.current++;
          // The alternate source is also loaded by the synchronous play path.
          setError('');
          setLoading(resume);
          if (resume) void play();
          return;
        }
        wantsPlayback.current = false;
        setPlaying(false);
        setLoading(false);
        continueNext.current = false;
        setError('Audio could not load. Press Play to retry, or read the transcript below.');
      },
    },
  };
}
