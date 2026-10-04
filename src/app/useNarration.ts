import { useCallback, useEffect, useRef, useState } from 'react';
import { togglePresentation, type Recording } from '../domain/narration';

/** A single native media clock owns playback and caption timing, including silent playback. */
export function useNarration(recording: Recording, active: boolean, onEnd: () => boolean) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const continueNext = useRef(false);
  const request = useRef(0);
  const endCallback = useRef(onEnd);
  endCallback.current = onEnd;
  const [modes, setModes] = useState({ voice: true, subtitles: true });
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(recording.duration);
  const pause = useCallback(() => {
    request.current++;
    continueNext.current = false;
    audioRef.current?.pause();
    setPlaying(false);
  }, []);
  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio?.getAttribute('src')) return;
    const ticket = ++request.current;
    setError('');
    setEnded(false);
    if (audio.ended) audio.currentTime = 0;
    try {
      await audio.play();
      if (ticket === request.current) setPlaying(!audio.paused);
    } catch (reason) {
      if (ticket !== request.current) return;
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
    setPlaying(false);
    setEnded(false);
    setTime(0);
    setError('');
    setDuration(recording.duration);
    setLoading(false);
    if (active) audio.src = `${import.meta.env.BASE_URL}audio/${recording.file}`;
    else audio.removeAttribute('src');
    audio.load();
    if (shouldContinue) void play();
    return () => {
      request.current++;
      audio.pause();
    };
  }, [recording.id, recording.file, recording.duration, active, play]);
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
    setEnded(false);
  }, []);
  return {
    audioRef,
    modes,
    time,
    duration,
    playing,
    ended,
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
        setPlaying(false);
        setEnded(true);
        continueNext.current = endCallback.current();
      },
      onError: () => {
        if (!audioRef.current?.getAttribute('src')) return;
        request.current++;
        setPlaying(false);
        setLoading(false);
        continueNext.current = false;
        setError('Audio could not load. You can still read the transcript below.');
      },
    },
  };
}
