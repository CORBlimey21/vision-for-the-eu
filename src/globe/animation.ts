/** One bounded render clock. No frames are requested while the document is hidden. */
export function animateWhileVisible(update: (elapsed: number) => boolean | void, fps = 24) {
  let frame = 0;
  let elapsed = 0;
  let previous = 0;
  let painted = -Infinity;
  let disposed = false;
  const tick = (now: number) => {
    if (disposed || document.hidden) return;
    if (previous) elapsed += Math.min(now - previous, 100);
    previous = now;
    if (elapsed - painted >= 1000 / fps) {
      painted = elapsed;
      if (update(elapsed) === false) {
        dispose();
        return;
      }
    }
    frame = requestAnimationFrame(tick);
  };
  const visibility = () => {
    cancelAnimationFrame(frame);
    previous = 0;
    if (!document.hidden && !disposed) frame = requestAnimationFrame(tick);
  };
  function dispose() {
    disposed = true;
    cancelAnimationFrame(frame);
    document.removeEventListener('visibilitychange', visibility);
  }
  document.addEventListener('visibilitychange', visibility);
  visibility();
  return dispose;
}
