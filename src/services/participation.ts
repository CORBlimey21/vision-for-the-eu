import type { Submission } from '../domain/types';
// Integration seam only. No client, network request, storage, or identifiers yet.
export interface AggregateResult {
  totalResponses: number;
  counts: Record<string, Record<string, number>>;
}
export interface ParticipationService {
  submit(payload: Submission): Promise<void>;
  aggregate(): Promise<AggregateResult>;
}
// Future implementation must validate allowed choices server-side, aggregate above
// a minimum cohort size, rate-limit without fingerprinting, and document retention.
