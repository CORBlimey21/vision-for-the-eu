/** Explanatory annotations for the illustrative energy scene, not infrastructure facts. */
export const spatialNotes = [
  {
    id: 'share',
    number: '01',
    label: 'Share across borders',
    center: [-8, 53.3] as [number, number],
    anchor: 'right' as const,
    title: 'Another way to share electricity',
    description:
      'In this scenario, the link represents another way for electricity to be shared. It does not represent the route, capacity or status of a real interconnector.',
  },
  {
    id: 'balance',
    number: '02',
    label: 'Balance differences',
    center: [16.5, 62] as [number, number],
    anchor: 'left' as const,
    title: 'Supply and demand change',
    description:
      'The model illustrates sharing between places when local supply and demand differ. Moving lights show the idea of exchange, not measured electricity or a forecast.',
  },
  {
    id: 'build',
    number: '03',
    label: 'Investment needed',
    center: [25, 45.8] as [number, number],
    anchor: 'left' as const,
    title: 'Connections have a cost.',
    description:
      'These possible benefits would require investment in infrastructure and coordination between countries. The amber indicator shows that cost.',
  },
];
export type SpatialNoteId = (typeof spatialNotes)[number]['id'];
