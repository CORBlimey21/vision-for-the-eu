import { useCallback, useEffect, useRef, useState } from 'react';
import { togglePresentation, type Recording } from '../domain/narration';

/** A single native media clock owns playback and caption timing, including silent playback. */
export function useNarration(recording: Recording, active: boolean, onEnd: () => boolean) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const continueNext = useRef(false);
  const request = useRef(0);
  const wantsPlayback = useRef(false);
  const sources = useRef<string[]>([]);
  const sourceIndex = useRef(0);
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
    if (!audio?.getAttribute('src')) return;
    const ticket = ++request.current;
    setError('');
    setEndedRecording(null);
    wantsPlayback.current = true;
    // Retry a failed request inside the fresh user gesture on iOS.
    if (audio.error) audio.load();
    if (audio.ended) audio.currentTime = 0;
    try {
      await audio.play();
      if (ticket === request.current) setPlaying(!audio.paused);
    } catch (reason) {
      if (ticket !== request.current) return;
      wantsPlayback.current = false;
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
    setError('');
    setDuration(recording.duration);
    setLoading(false);
    sources.current = audio.canPlayType('audio/mp4; codecs="mp4a.40.2"')
      ? [recording.file, recording.fallbackFile]
      : [recording.fallbackFile];
    sourceIndex.current = 0;
    if (active) audio.src = `${import.meta.env.BASE_URL}audio/${sources.current[0]}`;
    else audio.removeAttribute('src');
    audio.load();
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
  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, seconds));
    setTime(audio.currentTime);
    setEndedRecording(null);
  }, []);
  return {
    audioRef,
    modes,
    time,
    duration,
    playing,
    ended: endedRecording === recording.id,
    error,
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
      onTimeUpdate: () => setTime(audioRef.current?.currentTime ?? 0),
      onLoadedMetadata: () => {
        const value = audioRef.current?.duration;
        if (value && Number.isFinite(value)) setDuration(value);
      },
      onPlaying: () => {
        setPlaying(!audioRef.current?.paused);
        setLoading(false);
      },
      onPause: () => setPlaying(false),
      onWaiting: () => setLoading(true),
      onCanPlay: () => setLoading(false),
      onEnded: () => {
        wantsPlayback.current = false;
        setPlaying(false);
        setEndedRecording(recording.id);
        continueNext.current = endCallback.current();
      },
      onError: () => {
        const audio = audioRef.current;
        if (!audio?.getAttribute('src') || !audio.error) return;
        request.current++;
        const fallback = sources.current[sourceIndex.current + 1];
        if (fallback) {
          const resume = wantsPlayback.current && !document.hidden;
          sourceIndex.current++;
          audio.src = `${import.meta.env.BASE_URL}audio/${fallback}`;
          setError('');
          setLoading(resume);
          audio.load();
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
