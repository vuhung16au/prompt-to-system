---
id: workflow-engineering
title: Workflow Engineering
summary: Breaking down complex tasks into structured, reliable sequences of LLM calls and code.
level: advanced
last_verified: 2026-10-05
---

## Key Takeaway
Instead of relying on a single "mega-prompt" to solve a complex problem, break the task down into a structured sequence (a workflow or pipeline) where the output of one step becomes the input to the next.

## Explanation
Workflow engineering (also known as prompt chaining or LLM orchestration) is the practice of designing a directed graph of operations to accomplish a goal. It answers the question: *What discrete steps are required to produce a reliable result?*

In a workflow, each step is highly specialized. A step might be an LLM call with a narrow prompt, a deterministic function (like querying a database), an API call (like searching the web), or even a pause for human-in-the-loop feedback. By scoping each LLM call to a single, focused task, you significantly increase reliability, reduce hallucination, and make the overall system easier to debug.

## When to use it
- **Multi-step generation tasks:** Such as writing a long-form article (research $\rightarrow$ outline $\rightarrow$ draft $\rightarrow$ edit).
- **Tool use and RAG:** When the LLM needs to plan a query, retrieve data, and then synthesize the results.
- **Tasks requiring high reliability:** Breaking a task down allows you to insert validation or retry logic at intermediate steps.
- **Complex reasoning:** When the problem requires planning, reflection, or multiple distinct perspectives (e.g., multi-agent systems).

## When NOT to use it
- **Simple, single-shot requests:** Basic summarization, translation, or sentiment analysis where one prompt is sufficient.
- **Low-latency requirements:** Chaining multiple LLM calls increases the total response time significantly.
- **Strict budget constraints:** Multiple calls mean more tokens processed and higher costs.

## Small Example
Instead of asking an LLM to "write a comprehensive report on quantum computing," a workflow approach looks like this:

1. **Step 1: Research (Tool-Augmented LLM)**
   - *Prompt:* "Search the web for the latest breakthroughs in quantum computing and extract the key facts."
   - *Output:* JSON array of facts.
2. **Step 2: Outlining (LLM)**
   - *Prompt:* "Given these facts, create a hierarchical outline for a research report."
   - *Output:* Markdown outline.
3. **Step 3: Drafting (LLM, chunked)**
   - *Prompt:* "Write section 1 of the outline using these facts." (Repeated for each section)
   - *Output:* Draft text.
4. **Step 4: Review (LLM / Human)**
   - *Prompt:* "Review this draft for logical flow and factual accuracy against the original facts."
   - *Output:* Final polished report.

## Common Failure Modes
- **Error Propagation:** If Step 1 produces poor or hallucinated output, Steps 2, 3, and 4 will amplify the error (garbage in, garbage out).
- **Context Loss:** Passing only the output of a previous step might strip away necessary context needed by downstream steps.
- **Complexity Overhead:** Over-engineering a workflow can make the system brittle and hard to maintain.

## Best Practices
- **Structured Outputs:** Enforce JSON outputs for intermediate steps to ensure data flows reliably from one node to the next.
- **Independent Evaluation:** Test and evaluate the prompts for each step individually, not just the end-to-end system.
- **Human-in-the-Loop (HITL):** For critical workflows, insert a human approval step before taking irreversible actions (like sending an email or publishing a post).

## How to Evaluate
- **End-to-End Quality:** Is the final output significantly higher quality or more reliable than a single-prompt (zero-shot) attempt?
- **Step-Level Accuracy:** What is the success rate of each individual node in the workflow?
- **Cost and Latency:** Does the improvement in quality justify the increased token cost and execution time?

## Related Examples
- [Content Format Transformer](/prompt-to-system/examples/content-format-transformer)
