export const palette = {
  ocean: '#101d28',
  land: '#24333b',
  border: '#45565b',
  member: '#76a997',
  selected: '#d5f7cf',
  network: '#eac98a',
};
export const camera = {
  overview: { center: [13, 51] as [number, number], zoom: 1.85, bearing: 0, pitch: 0 },
  energy: { center: [12, 52] as [number, number], zoom: 2.2, bearing: 0, pitch: 0 },
  narration: {
    union: { center: [13, 51] as [number, number], zoom: 2.15, bearing: 0, pitch: 0 },
    electricity: { center: [8, 52] as [number, number], zoom: 2.3, bearing: 0, pitch: 0 },
  },
  duration: 1900,
  minZoom: 1.85,
  maxZoom: 5.4,
  centerBounds: { west: -12, east: 36, south: 35, north: 66 },
};

/** Clamp the camera centre, rather than fitting viewport bounds that flatten the globe. */
export function constrainEuropeCamera(center: { lng: number; lat: number }, zoom: number) {
  const bounds = camera.centerBounds;
  return {
    center: [
      Math.max(bounds.west, Math.min(bounds.east, center.lng)),
      Math.max(bounds.south, Math.min(bounds.north, center.lat)),
    ] as [number, number],
    zoom: Math.max(camera.minZoom, Math.min(camera.maxZoom, zoom)),
  };
}
export const HISTORY_INTERVAL = 3300;
