import { describe, it, expect } from 'vitest';
import { createScorer, runEvals } from "@mastra/core/evals";
import { weatherAgent } from "./weather-agent";
import { scorers } from "../scorers/weather-scorer";

describe('Weather Agent Tests', () => {
    it('should correctly extract locations from queries', async () => {
      const result = await runEvals({
        data: [
          {
            input: 'weather in Berlin',
            groundTruth: { expectedLocation: 'Berlin', expectedCountry: 'DE' }
          },
          {
            input: 'weather in Berlin, Maryland',
            groundTruth: { expectedLocation: 'Berlin', expectedCountry: 'US' }
          },
          {
            input: 'weather in Berlin, Russia',
            groundTruth: { expectedLocation: 'Berlin', expectedCountry: 'RU' }
          },
        ],
        target: weatherAgent,
        scorers: [scorers.completenessScorer]
      });
  
      // Assert aggregate score meets threshold
      expect(result.scores['completeness-scorer']).toBeGreaterThan(0.8);
      expect(result.summary.totalItems).toBe(3);
    });
  });