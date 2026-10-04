import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { useEffect, useRef, useState } from 'react';
import {
  Map as MapLibreMap,
  setWorkerUrl,
  Marker,
  type GeoJSONSource,
  type Map as MapInstance,
} from 'maplibre-gl';
import type { ExperienceState } from '../app/state';
import { camera } from './config';
import { animateWhileVisible } from './animation';
import { flowParticles } from './flow';
import { grid } from './networks';
import { spatialNotes } from '../content/spatialNotes';
import { globeStyle } from './style';
import { currentMembers, history, membersAt } from '../data/history';
import { countryById } from '../data/countries';
import 'maplibre-gl/dist/maplibre-gl.css';
// Explicit URL lets Vite bundle the v6 module worker and its shared imports.
setWorkerUrl(workerUrl);

interface Props {
  state: ExperienceState;
  reduced: boolean;
  network: boolean;
  flowPaused: boolean;
  activeNote: string;
  showNotes?: boolean;
  onNote: (id: string) => void;
  onSelect: (id: string) => void;
  onReady: () => void;
}
export function Globe({
  state,
  reduced,
  network,
  flowPaused,
  activeNote,
  showNotes = true,
  onNote,
  onSelect,
  onReady,
}: Props) {
  const container = useRef<HTMLDivElement>(null),
    map = useRef<MapInstance | null>(null);
  const lightLevels = useRef<Record<string, number>>({});
  const flowElapsed = useRef(0);
  const latest = useRef({ state, onSelect, onReady, onNote, reduced });
  latest.current = { state, onSelect, onReady, onNote, reduced };
  const [ready, setReady] = useState(false),
    [failure, setFailure] = useState(false),
    [hover, setHover] = useState<{ name: string; x: number; y: number } | null>(null);
  useEffect(() => {
    if (!container.current) return;
    setReady(false);
    setFailure(false);
    let instance: MapInstance;
    try {
      instance = new MapLibreMap({
        container: container.current,
        style: globeStyle(),
        ...camera.overview,
        minZoom: camera.minZoom,
        maxZoom: camera.maxZoom,
        maxPitch: 0,
        attributionControl: false,
        renderWorldCopies: false,
        canvasContextAttributes: { antialias: true },
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      });
    } catch {
      setFailure(true);
      latest.current.onReady();
      return;
    }
    map.current = instance;
    instance.dragRotate.disable();
    instance.touchZoomRotate.disableRotation();
    instance.doubleClickZoom.disable();
    instance.keyboard.disable();
    instance
      .getCanvas()
      .setAttribute(
        'aria-label',
        'Interactive globe of Europe. Use the country list for keyboard selection.',
      );
    instance.getCanvas().setAttribute('tabindex', '-1');
    let hovered: string | undefined;
    let didLoad = false;
    const clearHover = () => {
      if (hovered) instance.setFeatureState({ source: 'countries', id: hovered }, { hover: false });
      hovered = undefined;
      setHover(null);
      instance.getCanvas().style.cursor = '';
    };
    instance.on('load', () => {
      didLoad = true;
      setFailure(false);
      setReady(true);
      latest.current.onReady();
    });
    instance.on('error', (event) => {
      // Relief is enhancement-only. Missing core geometry must be surfaced.
      if (event.error.message.includes('countries.geojson')) {
        setFailure(true);
        latest.current.onReady();
      }
      console.error('MapLibre:', event.error.message);
    });
    instance.on('mousemove', 'land', (event) => {
      if (!['PRESENT', 'EXPLORE'].includes(latest.current.state.stage)) return;
      const id = event.features?.[0]?.properties.id as string;
      if (hovered !== id) clearHover();
      if (!countryById[id]) return;
      hovered = id;
      instance.setFeatureState({ source: 'countries', id }, { hover: true });
      instance.getCanvas().style.cursor = 'pointer';
      setHover({ name: countryById[id].name, x: event.point.x, y: event.point.y });
    });
    instance.on('mouseleave', 'land', clearHover);
    instance.on('click', 'land', (event) => {
      if (!['PRESENT', 'EXPLORE'].includes(latest.current.state.stage)) return;
      const id = event.features?.[0]?.properties.id as string;
      if (countryById[id]) {
        clearHover();
        latest.current.onSelect(id);
      }
    });
    // Constrain the focus without maxBounds forcing the globe to zoom into a flat map.
    instance.on('moveend', () => {
      const p = instance.getCenter(),
        lng = Math.max(-22, Math.min(42, p.lng)),
        lat = Math.max(33, Math.min(68, p.lat));
      if (lng !== p.lng || lat !== p.lat)
        instance.easeTo({ center: [lng, lat], duration: latest.current.reduced ? 0 : 400 });
    });
    const onContextLost = () => setFailure(true);
    const onContextRestored = () => setFailure(false);
    instance.getCanvas().addEventListener('webglcontextlost', onContextLost);
    instance.getCanvas().addEventListener('webglcontextrestored', onContextRestored);
    const observer = new ResizeObserver(() => instance.resize());
    observer.observe(container.current);
    const timeout = window.setTimeout(() => {
      if (!didLoad) {
        setFailure(true);
        latest.current.onReady();
      }
    }, 15000);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      // MapLibre deliberately loses its WebGL context on remove (including StrictMode).
      instance.getCanvas().removeEventListener('webglcontextlost', onContextLost);
      instance.getCanvas().removeEventListener('webglcontextrestored', onContextRestored);
      instance.remove();
      map.current = null;
    };
  }, []);
  useEffect(() => {
    const m = map.current;
    if (!ready || !m || !m.getLayer('members')) return;
    const ids =
      state.stage === 'INTRO'
        ? []
        : state.stage === 'HISTORY'
          ? membersAt(state.historyIndex)
          : currentMembers;
    for (const id of [...currentMembers, 'UK'])
      m.setFeatureState(
        { source: 'countries', id },
        { member: ids.includes(id), selected: id === state.selectedCountry, hover: false },
      );
    m.setPaintProperty('members', 'fill-opacity', [
      '*',
      ['coalesce', ['feature-state', 'illumination'], 0],
      state.selectedCountry ? 0.16 : 0.55,
    ]);
    const free = ['PRESENT', 'EXPLORE', 'BUILD_FUTURE', 'RESULTS'].includes(state.stage);
    if (free) {
      m.dragPan.enable();
      m.scrollZoom.enable();
      m.touchZoomRotate.enable();
      m.touchZoomRotate.disableRotation();
    } else {
      m.dragPan.disable();
      m.scrollZoom.disable();
      m.touchZoomRotate.disable();
    }
    m.getCanvas().style.cursor = '';
    setHover(null);
  }, [ready, state.stage, state.historyIndex, state.selectedCountry]);
  useEffect(() => {
    const m = map.current;
    if (!ready || !m || !m.getLayer('members')) return;
    const members =
      state.stage === 'INTRO'
        ? []
        : state.stage === 'HISTORY'
          ? membersAt(state.historyIndex)
          : currentMembers;
    const starts = { ...lightLevels.current };
    const illuminate = (elapsed: number) => {
      const t = reduced ? 1 : Math.min(1, elapsed / 1100);
      const ease = t * t * (3 - 2 * t);
      for (const id of [...currentMembers, 'UK']) {
        const value =
          (starts[id] ?? 0) + ((members.includes(id) ? 1 : 0) - (starts[id] ?? 0)) * ease;
        lightLevels.current[id] = value;
        m.setFeatureState({ source: 'countries', id }, { illumination: value });
      }
      return t < 1;
    };
    if (reduced) {
      illuminate(1100);
      return;
    }
    return animateWhileVisible(illuminate, 30);
  }, [ready, state.stage, state.historyIndex, reduced]);
  useEffect(() => {
    const m = map.current;
    if (!ready || !m || !m.getLayer('members')) return;
    const country = state.selectedCountry ? countryById[state.selectedCountry] : null;
    const target = country
      ? { ...camera.overview, center: country.center, zoom: country.zoom }
      : state.stage === 'HISTORY'
        ? {
            ...camera.overview,
            center: history[state.historyIndex]?.center ?? camera.overview.center,
          }
        : ['BUILD_FUTURE', 'RESULTS', 'TEAM_VISION'].includes(state.stage)
          ? camera.energy
          : camera.overview;
    m.flyTo({ ...target, duration: reduced ? 0 : camera.duration, essential: false });
  }, [
    ready,
    state.selectedCountry,
    state.stage,
    state.historyIndex,
    state.cameraRevision,
    reduced,
  ]);
  useEffect(() => {
    const m = map.current;
    if (!ready || !m || !m.getLayer('members')) return;
    for (const id of ['grid-halo', 'grid-lines'])
      m.setPaintProperty(id, 'line-opacity', network ? (id === 'grid-halo' ? 0.3 : 0.8) : 0);
    for (const id of ['grid-nodes', 'flow-particles', 'flow-halo', 'node-pulse'])
      m.setPaintProperty(
        id,
        'circle-opacity',
        network ? (id === 'flow-halo' ? 0.35 : id === 'node-pulse' ? 0.12 : 0.95) : 0,
      );
    m.setPaintProperty('grid-nodes', 'circle-stroke-opacity', network ? 0.14 : 0);
    const source = m.getSource('particles') as GeoJSONSource;
    if (!network) {
      source.setData({ type: 'FeatureCollection', features: [] });
      return;
    }
    const start = flowElapsed.current;
    const render = (elapsed: number) => {
      const total = start + elapsed;
      flowElapsed.current = total;
      source.setData(flowParticles(grid, total));
      m.setPaintProperty('node-pulse', 'circle-radius', 8 + Math.sin(total / 1100) * 2);
    };
    render(0);
    if (reduced || flowPaused) return;
    return animateWhileVisible(render, 24);
  }, [ready, network, reduced, flowPaused]);
  useEffect(() => {
    const m = map.current;
    if (!ready || !m || !m.getLayer('members')) return;
    const moment = state.stage === 'HISTORY' ? history[state.historyIndex] : null;
    const changed = moment ? [...moment.add, ...(moment.remove ?? [])] : [];
    const source = m.getSource('accession') as GeoJSONSource;
    source.setData({
      type: 'FeatureCollection',
      features: changed.map((id) => ({
        type: 'Feature',
        properties: { color: moment?.remove?.includes(id) ? '#eac98a' : '#d5f7cf' },
        geometry: { type: 'Point', coordinates: countryById[id]?.center ?? [-2, 54] },
      })),
    });
    m.setPaintProperty('accession-pulse', 'circle-stroke-opacity', 0);
    if (!changed.length || reduced) return;
    return animateWhileVisible((elapsed) => {
      const t = Math.min(1, elapsed / 1600);
      m.setPaintProperty('accession-pulse', 'circle-radius', 4 + t * 28);
      m.setPaintProperty('accession-pulse', 'circle-stroke-opacity', (1 - t) * 0.6);
      return t < 1;
    });
  }, [ready, state.stage, state.historyIndex, reduced]);
  useEffect(() => {
    const m = map.current;
    if (!ready || !m || !network || !showNotes || state.stage === 'TEAM_VISION') return;
    const markers = spatialNotes.map((note) => {
      const element = document.createElement('button');
      element.type = 'button';
      element.className = 'spatial-pin';
      element.dataset.note = note.id;
      element.setAttribute('aria-label', note.label);
      element.setAttribute('aria-pressed', String(note.id === activeNote));
      const number = document.createElement('span');
      number.className = 'pin-number';
      number.textContent = note.number;
      const label = document.createElement('span');
      label.className = 'pin-label';
      label.textContent = note.label;
      element.append(number, label);
      element.addEventListener('click', () => latest.current.onNote(note.id));
      return new Marker({
        element,
        anchor: note.anchor,
        offset: note.anchor === 'right' ? [-12, 0] : [12, 0],
        opacityWhenCovered: 0,
      })
        .setLngLat(note.center)
        .addTo(m);
    });
    return () => markers.forEach((marker) => marker.remove());
  }, [ready, network, state.stage, showNotes]);
  useEffect(() => {
    container.current
      ?.querySelectorAll<HTMLButtonElement>('.spatial-pin')
      .forEach((element) =>
        element.setAttribute('aria-pressed', String(element.dataset.note === activeNote)),
      );
  }, [activeNote, network]);

  return (
    <div className="globe-stage">
      <div className="globe-canvas" ref={container} />
      {hover && (
        <div className="map-tooltip" style={{ left: hover.x + 16, top: hover.y - 20 }}>
          {hover.name}
          <span>Inspect ↗</span>
        </div>
      )}
      {failure && (
        <div className="map-fallback" role="status">
          <span className="eyebrow">Globe unavailable</span>
          <h2>The story continues.</h2>
          <p>
            Your browser could not display the globe. History, country information and the energy
            experiment are still available below.
          </p>
        </div>
      )}
    </div>
  );
}
