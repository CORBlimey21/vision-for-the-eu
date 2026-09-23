import type { FeatureCollection, LineString } from 'geojson';
import { connectionCurve } from './flow.ts';
// Conceptual links between editorial anchors, NOT actual/planned cable routes.
const nodes: [number, number][] = [
  [-8, 53.3],
  [-3.5, 40.1],
  [2.5, 46.5],
  [10.4, 51.2],
  [16.5, 62],
  [26, 64],
  [19.2, 52],
  [12.8, 42.5],
  [25, 45.8],
  [23.5, 38.8],
  [5.4, 52.2],
];
const edges = [
  [0, 2],
  [1, 2],
  [2, 3],
  [2, 7],
  [3, 4],
  [4, 5],
  [3, 6],
  [6, 8],
  [8, 9],
  [3, 10],
  [0, 10],
];
export const grid: FeatureCollection<LineString> = {
  type: 'FeatureCollection',
  features: edges.map(([a, b]) => ({
    type: 'Feature',
    properties: {},
    geometry: { type: 'LineString', coordinates: connectionCurve(nodes[a], nodes[b]) },
  })),
};
export const gridNodes: FeatureCollection = {
  type: 'FeatureCollection',
  features: nodes.map((coordinates) => ({
    type: 'Feature',
    properties: {},
    geometry: { type: 'Point', coordinates },
  })),
};
export const graticule: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    ...Array.from({ length: 12 }, (_, i) => ({
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'LineString' as const,
        coordinates: Array.from({ length: 85 }, (_, j) => [-180 + i * 30, -84 + j * 2]),
      },
    })),
    ...Array.from({ length: 5 }, (_, i) => ({
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'LineString' as const,
        coordinates: Array.from({ length: 181 }, (_, j) => [-180 + j * 2, -60 + i * 30]),
      },
    })),
  ],
};
