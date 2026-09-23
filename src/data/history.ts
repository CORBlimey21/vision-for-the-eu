import type { HistoryMoment } from '../domain/types';
export const history: HistoryMoment[] = [
  {
    year: 1957,
    label: 'The beginning',
    headline: 'Six countries. A shared beginning.',
    description:
      'The Treaties of Rome are signed. Belgium, France, West Germany, Italy, Luxembourg and the Netherlands establish the EEC from 1958.',
    add: ['BE', 'FR', 'DE', 'IT', 'LU', 'NL'],
    sourceId: 'eu-history',
    center: [8, 48],
  },
  {
    year: 1973,
    label: 'An Atlantic horizon',
    headline: 'The horizon moves west.',
    description:
      'Ireland, Denmark and the United Kingdom join the European Communities. Six becomes nine.',
    add: ['IE', 'DK', 'UK'],
    sourceId: 'accession',
    center: [2, 52],
  },
  {
    year: 1981,
    label: 'Looking south',
    headline: 'A place for Greece.',
    description: 'Greece joins the European Communities, becoming the tenth member.',
    add: ['EL'],
    sourceId: 'accession',
    center: [18, 44],
  },
  {
    year: 1986,
    label: 'An Iberian chapter',
    headline: 'A wider southern horizon.',
    description:
      'Spain and Portugal join. The European Communities now bring together twelve countries.',
    add: ['ES', 'PT'],
    sourceId: 'accession',
    center: [4, 44],
  },
  {
    year: 1995,
    label: 'Looking north',
    headline: 'The north draws closer.',
    description:
      'Austria, Finland and Sweden join the European Union, bringing membership to fifteen.',
    add: ['AT', 'FI', 'SE'],
    sourceId: 'accession',
    center: [16, 56],
  },
  {
    year: 2004,
    label: 'The great enlargement',
    headline: 'Ten countries. One turning point.',
    description:
      'Cyprus, Czechia, Estonia, Hungary, Latvia, Lithuania, Malta, Poland, Slovakia and Slovenia join in the largest enlargement.',
    add: ['CY', 'CZ', 'EE', 'HU', 'LV', 'LT', 'MT', 'PL', 'SK', 'SI'],
    sourceId: 'accession',
    center: [20, 51],
  },
  {
    year: 2007,
    label: 'Further together',
    headline: 'The east becomes closer.',
    description: 'Bulgaria and Romania join, bringing the European Union to twenty-seven members.',
    add: ['BG', 'RO'],
    sourceId: 'accession',
    center: [22, 47],
  },
  {
    year: 2013,
    label: 'A new neighbour within',
    headline: 'Croatia joins the story.',
    description: 'Croatia becomes the twenty-eighth member of the European Union.',
    add: ['HR'],
    sourceId: 'accession',
    center: [17, 47],
  },
  {
    year: 2020,
    label: 'A departure',
    headline: 'Integration is not inevitable.',
    description:
      'The United Kingdom leaves the European Union on 31 January 2020. Twenty-seven countries remain.',
    add: [],
    remove: ['UK'],
    sourceId: 'brexit',
    center: [3, 52],
  },
  {
    year: 2026,
    label: 'The present',
    headline: 'A union still being written.',
    description:
      'Twenty-seven countries. Different histories. A future shaped by the choices we make together.',
    add: [],
    sourceId: 'eu-countries',
    center: [13, 51],
  },
];
export function membersAt(index: number): string[] {
  const members = new Set<string>();
  for (const moment of history.slice(0, index + 1)) {
    moment.add.forEach((id) => members.add(id));
    moment.remove?.forEach((id) => members.delete(id));
  }
  return [...members];
}
export const currentMembers = membersAt(history.length - 1);
