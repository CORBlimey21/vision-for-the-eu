export const palette = {
  ocean: '#0b4063',
  land: '#304c40',
  border: '#718780',
  member: '#79c875',
  memberOpacity: 0.9,
  selected: '#d5f7cf',
  network: '#eac98a',
  sky: '#08151f',
  horizon: '#568aa7',
  reliefShadow: '#152e30',
  reliefHighlight: '#a6b395',
  reliefAccent: '#304940',
  memberBorder: '#a5d69c',
};
export const camera = {
  overview: { center: [13, 51] as [number, number], zoom: 2.2, bearing: 0, pitch: 0 },
  energy: { center: [12, 52] as [number, number], zoom: 2.4, bearing: 0, pitch: 0 },
  narration: {
    union: { center: [13, 51] as [number, number], zoom: 2.4, bearing: 0, pitch: 0 },
    electricity: { center: [8, 52] as [number, number], zoom: 2.5, bearing: 0, pitch: 0 },
  },
  duration: 1900,
  minZoom: 2.2,
  maxZoom: 5.4,
  overviewBounds: { west: 0, east: 24, south: 43, north: 57 },
  countryZoom: 3.5,
  centerBounds: { west: -12, east: 36, south: 35, north: 66 },
};

/** Clamp the camera centre, rather than fitting viewport bounds that flatten the globe. */
export function constrainEuropeCamera(center: { lng: number; lat: number }, zoom: number) {
  const constrainedZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, zoom));
  // Keep the broad view anchored on Europe; allow its outlying members at country scale.
  const countryProgress = Math.min(
    1,
    (constrainedZoom - camera.minZoom) / (camera.countryZoom - camera.minZoom),
  );
  const interpolate = (overview: number, country: number) =>
    overview + (country - overview) * countryProgress;
  const bounds = {
    west: interpolate(camera.overviewBounds.west, camera.centerBounds.west),
    east: interpolate(camera.overviewBounds.east, camera.centerBounds.east),
    south: interpolate(camera.overviewBounds.south, camera.centerBounds.south),
    north: interpolate(camera.overviewBounds.north, camera.centerBounds.north),
  };
  return {
    center: [
      Math.max(bounds.west, Math.min(bounds.east, center.lng)),
      Math.max(bounds.south, Math.min(bounds.north, center.lat)),
    ] as [number, number],
    zoom: constrainedZoom,
  };
}
export const HISTORY_INTERVAL = 3300;

/** Schematic visual anchors, not wind/solar site locations or installation counts. */
export const renewableSites = [
  { kind: 'wind' as const, center: [-9.6, 53.7] as [number, number], label: 'Wind · illustration' },
  { kind: 'solar' as const, center: [-3.7, 40] as [number, number], label: 'Solar · illustration' },
];
