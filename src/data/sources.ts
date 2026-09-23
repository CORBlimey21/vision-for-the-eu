import type { Source } from '../domain/types';
export const sources: Source[] = [
  {
    id: 'celtic',
    title: 'EirGrid · Celtic Interconnector',
    url: 'https://www.eirgrid.ie/celticinterconnector',
    retrievedAt: '2026-09-15',
  },
  {
    id: 'qmv',
    title: 'Council · qualified majority voting',
    url: 'https://www.consilium.europa.eu/en/council-eu/how-does-the-council-vote/qualified-majority/',
    retrievedAt: '2026-09-15',
  },
  {
    id: 'unanimity',
    title: 'Council · unanimity',
    url: 'https://www.consilium.europa.eu/en/council-eu/how-does-the-council-vote/unanimity/',
    retrievedAt: '2026-09-15',
  },
  {
    id: 'sanctions',
    title: 'Council · adoption of sanctions decisions',
    url: 'https://www.consilium.europa.eu/en/policies/sanctions-adoption-review-procedure/',
    retrievedAt: '2026-09-15',
  },
  {
    id: 'climate-law',
    title: 'Council · European climate law',
    url: 'https://www.consilium.europa.eu/en/press/press-releases/2021/06/28/council-adopts-european-climate-law/',
    retrievedAt: '2026-09-15',
  },
  {
    id: 'accession',
    title: 'Council of the EU · accession timeline',
    url: 'https://www.consilium.europa.eu/en/policies/how-enlargement-works/timeline-accession-eu-member-states/',
    retrievedAt: '2026-09-11',
  },
  {
    id: 'eu-history',
    title: 'European Union · history of the EU',
    url: 'https://european-union.europa.eu/principles-countries-history/history-eu_en',
    retrievedAt: '2026-09-11',
  },
  {
    id: 'brexit',
    title: 'Council of the EU · Brexit',
    url: 'https://www.consilium.europa.eu/en/policies/brexit/',
    retrievedAt: '2026-09-11',
  },
  {
    id: 'eu-countries',
    title: 'European Union · countries',
    url: 'https://european-union.europa.eu/principles-countries-history/eu-countries_en',
    retrievedAt: '2026-09-11',
  },
  {
    id: 'gisco',
    title: 'Eurostat GISCO · country boundaries, 2024',
    url: 'https://ec.europa.eu/eurostat/web/gisco/geodata/administrative-units/countries',
    retrievedAt: '2026-09-11',
  },
  {
    id: 'terrain',
    title: 'Mapzen · open elevation tiles',
    url: 'https://registry.opendata.aws/terrain-tiles/',
    retrievedAt: '2026-09-11',
  },
];
