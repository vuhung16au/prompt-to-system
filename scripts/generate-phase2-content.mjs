import fs from 'fs';
import path from 'path';

const lessons = [
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    summary: 'Mastering the fundamental instructions intended primarily for one model interaction.',
    level: 'intermediate',
    last_verified: '2026-10-05',
    content: `
## Key Takeaway
Clear, constrained instructions yield predictable results.

## Explanation
Prompt engineering is the base layer of LLM interaction. It answers: What should the model do in this interaction?

## When to use it
- Single-turn tasks.
- Brainstorming.
- Basic transformations.

## When NOT to use it
- When tasks require multiple steps or external tools.

## Small Example
Instead of "Write a summary", use:
"Summarize the text in 3 bullet points focusing on financial risks."

## Common Failure Modes
- Vagueness.
- Contradictory instructions.

## How to Evaluate
- Does the output match the specified constraints (e.g., length, format)?

## Related Examples
- [Structured SEO Article Outliner](/examples/structured-seo-outliner)
`
  },
  {
    id: 'context-engineering',
    title: 'Context Engineering',
    summary: 'Providing the right information at the right time.',
    level: 'intermediate',
    last_verified: '2026-10-05',
    content: `
## Key Takeaway
The model is only as smart as the context you provide.

## Explanation
Context engineering answers: What should the model know and see?

## When to use it
- Answering questions about specific documents (RAG).
- Providing few-shot examples.

## When NOT to use it
- When general knowledge is sufficient.

## Small Example
"Use the following Q3 earnings report to answer the question..."

## Common Failure Modes
- Context window overflow.
- Irrelevant information confusing the model.

## How to Evaluate
- Does the model hallucinate, or stick to the provided facts?

## Related Examples
- [Data Analysis Summary Pattern](/examples/data-analysis-summary)
`
  },
  {
    id: 'workflow-engineering',
    title: 'Workflow Engineering',
    summary: 'Chaining multiple steps to produce a reliable result.',
    level: 'advanced',
    last_verified: '2026-10-05',
    content: `
## Key Takeaway
Complex tasks should be broken down into human-guided sequences.

## Explanation
Workflow engineering answers: What steps produce the result?

## When to use it
- Multi-step writing tasks (outline -> draft -> edit).
- Complex data transformations.

## When NOT to use it
- Simple, one-shot requests.

## Small Example
Step 1: Extract key facts. Step 2: Write an outline based on facts. Step 3: Expand outline into a draft.

## Common Failure Modes
- Error propagation across steps.

## How to Evaluate
- Is the final output higher quality than a zero-shot attempt?

## Related Examples
- [Content Format Transformer](/examples/content-format-transformer)
`
  },
  {
    id: 'harness-engineering',
    title: 'Harness Engineering',
    summary: 'Providing tools, constraints, and feedback around an agent.',
    level: 'advanced',
    last_verified: '2026-10-05',
    content: `
## Key Takeaway
Agents need safe environments to operate.

## Explanation
Harness engineering answers: What tools, permissions, instructions, tests, and feedback support the agent?

## When to use it
- When agents need to execute code or access APIs.

## When NOT to use it
- Text-only conversational tasks.

## Small Example
Providing a sandboxed Python execution environment for an analysis agent.

## Common Failure Modes
- Unrestricted access leading to dangerous actions.

## How to Evaluate
- Are security and cost limits respected?

## Related Examples
- [Root-cause Debugging Playbook](/examples/root-cause-debugging)
`
  },
  {
    id: 'loop-engineering',
    title: 'Loop Engineering',
    summary: 'Managing repeated work with state, checks, and stop rules.',
    level: 'advanced',
    last_verified: '2026-10-05',
    content: `
## Key Takeaway
Autonomous loops must have explicit termination conditions.

## Explanation
Loop engineering answers: How does repeated work converge, stop, recover, or escalate?

## When to use it
- Continuous monitoring tasks.
- Self-correcting agents.

## When NOT to use it
- Linear, predictable tasks.

## Small Example
An agent that writes code, runs tests, and fixes errors until all tests pass or a max iteration limit is reached.

## Common Failure Modes
- Infinite loops.
- Budget exhaustion.

## How to Evaluate
- Does the loop terminate gracefully upon success or failure?

## Related Examples
- [Root-cause Debugging Playbook](/examples/root-cause-debugging)
`
  },
  {
    id: 'evaluation-reliability',
    title: 'Evaluation and Reliability',
    summary: 'Measuring success systematically across all layers.',
    level: 'advanced',
    last_verified: '2026-10-05',
    content: `
## Key Takeaway
You cannot improve what you cannot measure.

## Explanation
Evaluation applies across all five layers. It answers: How well is the system performing?

## When to use it
- Always, for production systems.

## When NOT to use it
- Casual experimentation.

## Small Example
Using an LLM-as-judge to score summary accuracy against a rubric.

## Common Failure Modes
- Over-indexing on a single metric.
- Flawed evaluation rubrics.

## How to Evaluate
- Do the automated metrics correlate with human judgment?

## Related Examples
- [Code Review Assistant](/examples/code-review-assistant)
`
  }
];

const domains = [
  { id: 'software-engineering', title: 'Software Engineering', summary: 'Using LLMs for coding, debugging, and architecture.' },
  { id: 'writing', title: 'Writing and Communication', summary: 'Drafting, editing, and formatting text.' },
  { id: 'marketing', title: 'Marketing', summary: 'Copywriting, campaign planning, and audience analysis.' },
  { id: 'productivity', title: 'Productivity', summary: 'Task management, summarization, and automation.' },
  { id: 'research', title: 'Research and Analysis', summary: 'Literature review, data extraction, and synthesis.' }
];

const examples = [];
let exampleCount = 1;

for (const domain of domains) {
  for (let i = 1; i <= 4; i++) {
    examples.push({
      id: `example-${exampleCount}`,
      title: `${domain.title} Example ${i}`,
      summary: `A practical example for ${domain.title.toLowerCase()}.`,
      kind: 'prompt',
      level: 'intermediate',
      domains: [domain.id],
      tags: ['demo', domain.id],
      status: 'reviewed',
      language: 'en',
      last_verified: '2026-10-05',
      content: `
## Purpose
Demonstrate a reliable LLM pattern in ${domain.title}.

## When to Use
When automating or accelerating ${domain.title} tasks.

## When NOT to Use
For highly deterministic or sensitive operations without human oversight.

## Inputs
- \`input_data\`: The source information.

## Prompt / Procedure
\`\`\`text
Analyze the following input_data according to ${domain.title} best practices and provide a structured output.
\`\`\`

## Expected Output
A well-formatted response addressing the core task.

## Evaluation Rubric
- Accuracy
- Formatting
- Tone

## Failure Modes & Risks
- Hallucination
- Missing edge cases

## Provenance
Original example created for the Applied LLM Patterns library.
`
    });
    exampleCount++;
  }
}

function writeMarkdown(filePath, frontmatterObj, content) {
  const yaml = Object.entries(frontmatterObj)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n${value.map(v => `  - ${v}`).join('\n')}`;
      }
      if (typeof value === 'object' && value !== null) {
        return `${key}:\n${Object.entries(value).map(([k, v]) => `  ${k}: ${v}`).join('\n')}`;
      }
      return `${key}: ${value}`;
    })
    .join('\n');

  const fullContent = "---\n" + yaml + "\n---\n" + content;

  fs.writeFileSync(filePath, fullContent);
}

// Write Lessons
lessons.forEach(lesson => {
  const { content, ...frontmatter } = lesson;
  writeMarkdown(path.join('src/content/lessons', lesson.id + '.md'), frontmatter, content);
});

// Write Domains
domains.forEach(domain => {
  const { summary, ...frontmatter } = domain;
  const content = "\n## Overview\n" + summary + "\n\nLLMs provide significant leverage in this domain by automating repetitive tasks and augmenting human reasoning.\n\n## Suggested Learning Sequence\n1. [Prompt Engineering](/learn/prompt-engineering)\n2. [Workflow Engineering](/learn/workflow-engineering)\n";
  writeMarkdown(path.join('src/content/domains', domain.id + '.md'), { ...frontmatter, summary }, content);
});

// Write Examples
examples.forEach(example => {
  const { content, ...frontmatter } = example;
  writeMarkdown(path.join('src/content/examples', example.id + '.md'), frontmatter, content);
});

console.log('Content generated successfully.');
