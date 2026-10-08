import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Marker, type Map as MapInstance } from 'maplibre-gl';
import { renewableActive, type RenewableCue } from '../domain/renewables';
import { renewableSites } from './config';

function WindFarm() {
  return (
    <svg viewBox="0 0 110 84" aria-hidden="true">
      <ellipse className="renewable-ground" cx="55" cy="76" rx="43" ry="6" />
      {[
        { x: 26, y: 28, scale: 0.76 },
        { x: 80, y: 26, scale: 0.82 },
        { x: 53, y: 19, scale: 1 },
      ].map(({ x, y, scale }, index) => (
        <g key={index} transform={`translate(${x} ${y}) scale(${scale})`}>
          <path className="turbine-mast" d="M-2 0 L-3 56 Q0 59 3 56 L2 0 Z" />
          <g className="turbine-rotor" style={{ animationDelay: `${-index * 1.7}s` }}>
            {[0, 120, 240].map((angle) => (
              <path
                key={angle}
                className="turbine-blade"
                transform={`rotate(${angle})`}
                d="M-2 1 L-1 -23 Q0 -27 2 -24 L4 -7 L1 2 Z"
              />
            ))}
            <circle className="turbine-hub" r="3" />
          </g>
        </g>
      ))}
    </svg>
  );
}
function SolarFarm() {
  return (
    <svg viewBox="0 0 110 84" aria-hidden="true">
      <ellipse className="renewable-ground" cx="55" cy="74" rx="43" ry="6" />
      {[
        { x: 13, y: 22 },
        { x: 60, y: 22 },
        { x: 36, y: 45 },
      ].map(({ x, y }, index) => (
        <g key={index} transform={`translate(${x} ${y})`}>
          <path className="solar-support" d="M7 21 V29 M31 21 V29" />
          <path className="solar-panel" d="M6 0 H37 L32 22 H0 Z" />
          <path className="solar-cells" d="M16 0 L10 22 M27 0 L21 22 M3 11 H34" />
          <path
            className="solar-glint"
            style={{ animationDelay: `${-index * 0.9}s` }}
            d="M8 3 H31 L29 7 H7 Z"
          />
        </g>
      ))}
      <g className="solar-sun">
        <circle cx="93" cy="10" r="5" />
        <path d="M93 0 V2 M93 18 V20 M83 10 H85 M101 10 H103 M86 3 L88 5 M98 15 L100 17 M86 17 L88 15 M98 5 L100 3" />
      </g>
    </svg>
  );
}
/** Native markers keep the illustrations geographically attached through pan/zoom/resize. */
export function RenewableIllustrations({
  map,
  cues,
  time,
  running,
  reduced,
}: {
  map: MapInstance;
  cues: RenewableCue[];
  time: number;
  running: boolean;
  reduced: boolean;
}) {
  const [elements, setElements] = useState<HTMLElement[]>([]);
  useEffect(() => {
    const markers = renewableSites.map((site) => {
      const element = document.createElement('div');
      element.className = 'renewable-marker';
      element.setAttribute('aria-hidden', 'true');
      return new Marker({ element, anchor: 'bottom', opacityWhenCovered: 0 })
        .setLngLat(site.center)
        .addTo(map);
    });
    setElements(markers.map((marker) => marker.getElement()));
    return () => markers.forEach((marker) => marker.remove());
  }, [map]);
  return elements.map((element, index) => {
    const site = renewableSites[index];
    const active = renewableActive(cues, site.kind, time);
    return createPortal(
      <div
        className={`renewable-farm renewable-${site.kind}`}
        data-active={active}
        data-running={active && running && !reduced}
        data-reduced={reduced}
      >
        {site.kind === 'wind' ? <WindFarm /> : <SolarFarm />}
        <span className="renewable-label">{site.label}</span>
      </div>,
      element,
      site.kind,
    );
  });
}
