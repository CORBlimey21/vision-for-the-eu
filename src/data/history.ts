import type { HistoryMoment } from '../domain/types';
export const history: HistoryMoment[] = [
  {
    year: 1957,
    label: 'The beginning',
    headline: 'Six countries sign the Treaties of Rome.',
    description:
      'The Treaties of Rome are signed. Belgium, France, West Germany, Italy, Luxembourg and the Netherlands establish the EEC from 1958.',
    add: ['BE', 'FR', 'DE', 'IT', 'LU', 'NL'],
    sourceId: 'eu-history',
    center: [8, 48],
  },
  {
    year: 1973,
    label: 'Ireland, Denmark and the UK',
    headline: 'The Communities grow to nine.',
    description:
      'Ireland, Denmark and the United Kingdom join the European Communities. Six becomes nine.',
    add: ['IE', 'DK', 'UK'],
    sourceId: 'accession',
    center: [2, 52],
  },
  {
    year: 1981,
    label: 'Greece joins',
    headline: 'Greece becomes the tenth member.',
    description: 'Greece joins the European Communities, becoming the tenth member.',
    add: ['EL'],
    sourceId: 'accession',
    center: [18, 44],
  },
  {
    year: 1986,
    label: 'Spain and Portugal join',
    headline: 'Membership reaches twelve.',
    description:
      'Spain and Portugal join. The European Communities now bring together twelve countries.',
    add: ['ES', 'PT'],
    sourceId: 'accession',
    center: [4, 44],
  },
  {
    year: 1995,
    label: 'Austria, Finland and Sweden join',
    headline: 'Three more countries join.',
    description:
      'Austria, Finland and Sweden join the European Union, bringing membership to fifteen.',
    add: ['AT', 'FI', 'SE'],
    sourceId: 'accession',
    center: [16, 56],
  },
  {
    year: 2004,
    label: 'The largest enlargement',
    headline: 'Ten countries join in one year.',
    description:
      'Cyprus, Czechia, Estonia, Hungary, Latvia, Lithuania, Malta, Poland, Slovakia and Slovenia join in the largest enlargement.',
    add: ['CY', 'CZ', 'EE', 'HU', 'LV', 'LT', 'MT', 'PL', 'SK', 'SI'],
    sourceId: 'accession',
    center: [20, 51],
  },
  {
    year: 2007,
    label: 'Bulgaria and Romania join',
    headline: 'Membership reaches twenty-seven.',
    description: 'Bulgaria and Romania join, bringing the European Union to twenty-seven members.',
    add: ['BG', 'RO'],
    sourceId: 'accession',
    center: [22, 47],
  },
  {
    year: 2013,
    label: 'Croatia joins',
    headline: 'Croatia becomes the 28th member.',
    description: 'Croatia becomes the twenty-eighth member of the European Union.',
    add: ['HR'],
    sourceId: 'accession',
    center: [17, 47],
  },
  {
    year: 2020,
    label: 'A departure',
    headline: 'The United Kingdom leaves the EU.',
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
    headline: 'Twenty-seven countries are in the EU.',
    description:
      'The Union has changed many times since 1957. What should it do next?',
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
