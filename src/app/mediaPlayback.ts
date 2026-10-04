/** Keep source selection, loading and play synchronous within the caller's tap. */
export function startMedia(
  audio: Pick<HTMLAudioElement, 'src' | 'error' | 'ended' | 'currentTime' | 'load' | 'play'>,
  source: string,
): Promise<void> {
  if (audio.src !== source || audio.error) {
    audio.src = source;
    audio.load();
  } else if (audio.ended) {
    audio.currentTime = 0;
  }
  return audio.play();
}
