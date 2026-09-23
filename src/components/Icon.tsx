export function Icon({
  name,
  className = '',
}: {
  name: 'arrow' | 'globe' | 'close' | 'play' | 'pause' | 'reset' | 'plus' | 'minus';
  className?: string;
}) {
  const paths = {
    arrow: 'M4 12h15m-6-6 6 6-6 6',
    globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18',
    close: 'm6 6 12 12M6 18 18 6',
    play: 'm8 5 11 7-11 7Z',
    pause: 'M8 5v14M16 5v14',
    reset: 'M4 10a8 8 0 1 1 1 8M4 4v6h6',
    plus: 'M12 5v14M5 12h14',
    minus: 'M5 12h14',
  };
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
