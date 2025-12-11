# Beta Experiment

A Mastra-based project demonstrating weather forecasting workflows, agents, and evaluation scorers.

## Prerequisites

- Node.js >= 22.13.0
- pnpm (package manager)

## Setup

### 1. Install Dependencies

```bash
pnpm i
```

### 2. Environment Configuration

Copy the environment file and add your API keys:

```bash
cp .env .env.local
```

Required environment variables in `.env.local`:
- `OPENAI_API_KEY` - Your OpenAI API key
- `LANGFUSE_PUBLIC_KEY` - Langfuse public key
- `LANGFUSE_SECRET_KEY` - Langfuse secret key
- `LANGFUSE_BASE_URL` - Langfuse base URL

### 3. Run the Development Server

In a separate terminal, start the Mastra development studio:

```bash
pnpm run dev
```

### 4. Run Workflows

Execute the weather workflow:

```bash
pnpm runscript tests/mastra/workflows.ts
```

### Expected  to see
- Scores in Mastra Studio
- No warnings witn Langfuse.
  - Scores in Langfuse.