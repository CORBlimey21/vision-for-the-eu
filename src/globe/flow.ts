import type { FeatureCollection, LineString, Point, Position } from 'geojson';
/** Decorative curve in geographic coordinates; MapLibre still owns projection.
 * These are explicitly conceptual links, not surveyed/geodesic cable routes. */
export function connectionCurve(a: Position, b: Position, bend = 0.13): Position[] {
  const dx = b[0] - a[0],
    dy = b[1] - a[1];
  const control = [(a[0] + b[0]) / 2 - dy * bend, (a[1] + b[1]) / 2 + dx * bend];
  return Array.from({ length: 41 }, (_, index) => {
    const t = index / 40,
      u = 1 - t;
    return [
      u * u * a[0] + 2 * u * t * control[0] + t * t * b[0],
      u * u * a[1] + 2 * u * t * control[1] + t * t * b[1],
    ];
  });
}
export function pointOnPath(path: Position[], phase: number): Position {
  const progress = (((phase % 1) + 1) % 1) * (path.length - 1);
  const index = Math.floor(progress),
    t = progress - index;
  const a = path[index],
    b = path[Math.min(index + 1, path.length - 1)];
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}
export function flowParticles(
  routes: FeatureCollection<LineString>,
  elapsed: number,
): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: routes.features.flatMap((route, index) =>
      [0, 0.5].map((offset) => ({
        type: 'Feature' as const,
        properties: {},
        geometry: {
          type: 'Point' as const,
          coordinates: pointOnPath(
            route.geometry.coordinates,
            elapsed / 7200 + offset + index * 0.137,
          ),
        },
      })),
    ),
  };
}
