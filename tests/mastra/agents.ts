import { createScorer, runEvals } from "@mastra/core/evals";
import { weatherAgent } from "../../src/mastra/agents/weather-agent";

async function run() {
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
    target: weatherAgent,
    data: [
      {
        input: "What's the weather in New York?",
        groundTruth: {
          output: 'The weather in New York is sunny with a temperature of 60 degrees Fahrenheit',
        },
      },
      {
        input: "What's the weather in Berlin?",
        groundTruth: {
          output: 'The weather in Berlin is sunny with a temperature of 60 degrees Fahrenheit',
        },
      },
      {
        input: "What's the weather in Paris?",
        groundTruth: {
          output: 'The weather in Paris is sunny with a temperature of 60 degrees Fahrenheit',
        },
      },      
    ],
    scorers: [scorer],
  })
  return result;
}

run().then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error);
});