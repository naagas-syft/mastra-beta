import { describe, it, expect } from 'vitest';
import { runEvals } from "@mastra/core/evals";
import { weatherWorkflow } from "./weather-workflow";
import { scorers } from "../scorers/weather-scorer";

describe('Weather Agent Tests', () => {
    it('should correctly extract locations from queries', async () => {
      const result = await runEvals({
        data: [
          {
            input: {
              city: 'Berlin',
            },
            groundTruth: { expectedLocation: 'Berlin', expectedCountry: 'DE' }
          },
          {
            input: {
              city: 'Berlin, Maryland',
            },
            groundTruth: { expectedLocation: 'Berlin', expectedCountry: 'US' }
          },
          {
            input: {
              city: 'Berlin, Russia',
            },
            groundTruth: { expectedLocation: 'Berlin', expectedCountry: 'RU' }
          },
        ],
        target: weatherWorkflow,
        scorers: [scorers.completenessScorer]
      });
  
      // Assert aggregate score meets threshold
      expect(result.scores['completeness-scorer']).toBeGreaterThan(0.8);
      expect(result.summary.totalItems).toBe(3);
    });
  });