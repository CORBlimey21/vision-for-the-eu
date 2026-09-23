import type { StyleSpecification } from 'maplibre-gl';
import { palette } from './config';
import { graticule, grid, gridNodes } from './networks';
export function globeStyle(): StyleSpecification {
  const base = new URL(import.meta.env.BASE_URL, window.location.href).href;
  return {
    version: 8,
    projection: { type: 'globe' },
    transition: { duration: 800, delay: 0 },
    sky: {
      'sky-color': '#080e13',
      'horizon-color': '#29404c',
      'fog-color': '#101d28',
      'sky-horizon-blend': 0.8,
      'horizon-fog-blend': 0.3,
      'fog-ground-blend': 0.15,
      'atmosphere-blend': 0.6,
    },
    sources: {
      countries: {
        type: 'geojson',
        data: `${base}data/countries.geojson`,
        promoteId: 'id',
        tolerance: 0.35,
      },
      relief: {
        type: 'raster-dem',
        tiles: [`${base}data/relief/{z}/{x}/{y}.png`],
        tileSize: 256,
        encoding: 'terrarium',
        bounds: [-25, 32, 45, 73],
        minzoom: 0,
        maxzoom: 5,
      },
      graticule: { type: 'geojson', data: graticule },
      grid: { type: 'geojson', data: grid },
      nodes: { type: 'geojson', data: gridNodes },
      particles: { type: 'geojson', data: { type: 'FeatureCollection', features: [] } },
      accession: { type: 'geojson', data: { type: 'FeatureCollection', features: [] } },
    },
    layers: [
      { id: 'ocean', type: 'background', paint: { 'background-color': palette.ocean } },
      { id: 'land', type: 'fill', source: 'countries', paint: { 'fill-color': palette.land } },
      {
        id: 'graticule',
        type: 'line',
        source: 'graticule',
        paint: { 'line-color': '#849995', 'line-opacity': 0.1, 'line-width': 0.5 },
      },
      {
        id: 'members',
        type: 'fill',
        source: 'countries',
        paint: {
          'fill-color': palette.member,
          'fill-opacity': ['*', ['coalesce', ['feature-state', 'illumination'], 0], 0.55],
        },
      },
      {
        id: 'relief',
        type: 'hillshade',
        source: 'relief',
        paint: {
          'hillshade-shadow-color': '#071017',
          'hillshade-highlight-color': '#95a69d',
          'hillshade-accent-color': '#1d3035',
          'hillshade-exaggeration': 0.48,
          'hillshade-illumination-direction': 315,
        },
      },
      {
        id: 'borders',
        type: 'line',
        source: 'countries',
        paint: { 'line-color': palette.border, 'line-width': 0.55, 'line-opacity': 0.65 },
      },
      {
        id: 'member-glow',
        type: 'line',
        source: 'countries',
        paint: {
          'line-color': palette.member,
          'line-width': 5,
          'line-blur': 4,
          'line-opacity': ['*', ['coalesce', ['feature-state', 'illumination'], 0], 0.3],
        },
      },
      {
        id: 'member-borders',
        type: 'line',
        source: 'countries',
        paint: {
          'line-color': '#a5ceba',
          'line-width': 0.8,
          'line-opacity': ['*', ['coalesce', ['feature-state', 'illumination'], 0], 0.65],
        },
      },
      {
        id: 'focus',
        type: 'fill',
        source: 'countries',
        paint: {
          'fill-color': palette.selected,
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            0.36,
            ['boolean', ['feature-state', 'hover'], false],
            0.18,
            0,
          ],
        },
      },
      {
        id: 'focus-border',
        type: 'line',
        source: 'countries',
        paint: {
          'line-color': palette.selected,
          'line-width': 1.8,
          'line-opacity': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            1,
            ['boolean', ['feature-state', 'hover'], false],
            0.8,
            0,
          ],
        },
      },
      {
        id: 'grid-halo',
        type: 'line',
        source: 'grid',
        paint: {
          'line-color': palette.network,
          'line-width': 8,
          'line-blur': 6,
          'line-opacity': 0,
        },
      },
      {
        id: 'grid-lines',
        type: 'line',
        source: 'grid',
        paint: { 'line-color': palette.network, 'line-width': 1.05, 'line-opacity': 0 },
      },
      {
        id: 'flow-halo',
        type: 'circle',
        source: 'particles',
        paint: {
          'circle-radius': 8,
          'circle-blur': 1,
          'circle-color': '#f5d49b',
          'circle-opacity': 0,
        },
      },
      {
        id: 'flow-particles',
        type: 'circle',
        source: 'particles',
        paint: { 'circle-radius': 2, 'circle-color': '#fff7e1', 'circle-opacity': 0 },
      },
      {
        id: 'node-pulse',
        type: 'circle',
        source: 'nodes',
        paint: {
          'circle-radius': 9,
          'circle-color': '#eac98a',
          'circle-opacity': 0,
          'circle-blur': 0.7,
        },
      },
      {
        id: 'accession-pulse',
        type: 'circle',
        source: 'accession',
        paint: {
          'circle-radius': 0,
          'circle-color': 'transparent',
          'circle-stroke-color': ['get', 'color'],
          'circle-stroke-width': 1.4,
          'circle-radius-transition': { duration: 0 },
          'circle-stroke-opacity-transition': { duration: 0 },
          'circle-stroke-opacity': 0,
        },
      },
      {
        id: 'grid-nodes',
        type: 'circle',
        source: 'nodes',
        paint: {
          'circle-radius': 3.5,
          'circle-color': '#fff2d4',
          'circle-stroke-width': 5,
          'circle-stroke-color': '#eac98a',
          'circle-stroke-opacity': 0.15,
          'circle-opacity': 0,
        },
      },
    ],
  };
}
