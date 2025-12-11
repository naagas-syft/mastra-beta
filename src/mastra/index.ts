
import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';
import { PinoLogger } from '@mastra/loggers';
import { DefaultExporter, Observability, SamplingStrategyType } from '@mastra/observability';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { weatherAgent } from './agents/weather-agent';
import { completenessScorer, toolCallAppropriatenessScorer, translationScorer } from './scorers/weather-scorer';
import { weatherWorkflow } from './workflows/weather-workflow';

// Use absolute path for the database so it's consistent across all entry points
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../../.mastra/mastra.db');

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  scorers: { toolCallAppropriatenessScorer, completenessScorer, translationScorer },
  storage: new LibSQLStore({
    id: "mastra-storage",
    url: `file:${dbPath}`,
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  observability: new Observability({
    configs: {
      default: {
        serviceName: 'beta-experiment',
        sampling: {
          type: SamplingStrategyType.ALWAYS,
        },
        exporters:[new DefaultExporter()]
      }
    }
  }),
});
