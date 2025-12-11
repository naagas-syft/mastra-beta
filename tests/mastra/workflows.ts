import { createScorer, runEvals } from "@mastra/core/evals";
import { mastra } from "../../src/mastra";

async function run() {
  const weatherWorkflow = mastra.getWorkflow('weatherWorkflow');

  const scorer = createScorer({
    id: 'test-scorer',
    name: 'Test Scorer',
    description: 'Test Scorer',
    type: 'agent',
    judge: {  
      model: 'openai/gpt-4o',
      instructions: 'Test Scorer',
    },
  })
  .generateScore(({ results }) => {
    return 1;
  })
  .generateReason(({ results }) => {
    return 'Test Scorer';
  });

  const result = await runEvals({
    target: weatherWorkflow as any,
    data: [
      {
        input: {
          city: 'New York',
        },
        groundTruth: {
          activities: 'Visit the Statue of Liberty and the Empire State Building',
        },
      },
    ],
    scorers: [scorer],
  })
  console.log("result workflow", result);
  return result;
}

run().then(async (result) => {
  console.log("result", result);
  // Shutdown mastra to flush observability traces to storage
  await mastra.shutdown();
}).catch(async (error) => {
  console.error("error", error);
  await mastra.shutdown();
});