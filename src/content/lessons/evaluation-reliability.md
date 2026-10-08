---
id: evaluation-reliability
title: Evaluation and Reliability
summary: Measuring success systematically across all layers.
level: advanced
last_verified: 2026-10-05
order: 6
stage: 6
duration_minutes: 30
outcomes: 
  - Build golden datasets for LLM evaluation.
  - Implement LLM-as-a-judge pipelines.
  - Integrate evaluations into CI/CD.
prerequisites: 
  - workflow-engineering
related_lessons: 
  - harness-engineering
related_examples: 
  - code-review-assistant
glossary_terms: 
  - golden-dataset
  - llm-as-a-judge
  - hallucination-rate
status: reviewed
sources: 
  - "Evaluating LLMs in Production"
competencies: 
  - "System design"
estimated_lab_minutes: 45
required_artifacts: 
  - "Architecture decision record"
system_scale: "10,000+ daily sessions"
risk_level: "High"
vendor_scope: "Model-agnostic"
verified_with: "not independently reproduced"
review_status: "author-reviewed"
---

## Key takeaway

You cannot improve what you cannot measure. Because LLM outputs are non-deterministic, traditional unit tests must be replaced or augmented with heuristic checks, golden datasets, and LLM-as-a-judge evaluations.

## Mental model or small diagram

```mermaid
flowchart LR
    A[Inputs] --> B[LLM System]
    B --> C[Outputs]
    C --> D{Evaluator LLM / Scripts}
    D -->|Score| E[Metrics Dashboard]
    F[Golden Dataset] --> D
```

## When to use and when not to use

**When to use:**

- Always, for production systems.
- When optimizing costs or latency (e.g., swapping to a smaller model).
- During RAG development to isolate retrieval vs. generation failures.

**When not to use:**

- Casual experimentation or personal prototypes.
- Simple, deterministic tasks that can be perfectly validated with regex.

## Method or procedure

1. **Golden Datasets:** Curate a set of diverse, challenging inputs and expected outputs.
2. **Automated Metrics:** Use heuristics (schema compliance, exact matches).
3. **LLM-as-a-judge:** Use a highly capable model to score outputs based on a strict rubric.
4. **Regression Testing:** Run your evaluation suite automatically whenever prompts or models change.

## Worked example

**Process (LLM-as-a-judge):**

```python
def evaluate_response(user_query, bot_response, golden_context):
    eval_prompt = f"""
    Grade the bot's response on a scale of 1-5 based on Accuracy.
    User Query: {user_query}
    Bot Response: {bot_response}
    Context: {golden_context}
    Return JSON with 'accuracy_score' and 'reasoning'.
    """
    return call_evaluator_llm(eval_prompt)
```

**Output:** A structured, trackable score that can block a bad deployment if the average falls below a threshold.

## Failure modes and mitigations

- **Over-indexing on a single metric:** E.g., focusing only on helpfulness and ignoring tone. *Mitigation: Use multi-dimensional rubrics.*
- **Static golden datasets:** User behaviour drifts over time. *Mitigation: Continuously sample production logs to add new edge cases to your evaluation set.*

## Evaluation checklist or rubric

- [ ] **Baseline:** Have you manually graded at least 50 inputs to set a baseline?
- [ ] **Alignment:** Do the LLM judge's scores match human intuition?
- [ ] **Isolation:** Are you evaluating retrieval separately from generation?

## Safety, privacy, and cost notes

- **Privacy:** Ensure golden datasets do not contain sensitive PII unless strictly necessary and secured.
- **Cost:** Running an LLM judge on every production log is expensive. Sample logs (e.g., 5%) for evaluation, or use smaller models for the judge.

## Practice task

Write an evaluation prompt for an LLM judge to determine if a summarization bot hallucinated any facts not present in the original source document.

## Provenance and further reading

> **Note:** The principles taught in this lesson are model-independent. Any vendor-specific implementation notes (e.g., specific API features or context limits from Anthropic or OpenAI) are used for illustration and should be adapted to your chosen provider.

- **Source**: [Evaluating LLMs](https://cookbook.openai.com/examples/evaluation/how_to_eval_abstractive_summarization)
- **Author/Organization**: OpenAI Cookbook
- **Publication Date**: 2023-11-10
- **Access Date**: 2026-10-07
- **Next Steps**: Review the related example `code-review-assistant` or proceed to the lesson `harness-engineering`.

## Non-goals

This is not a general-purpose guide to all possible paradigms, nor does it aim to replace standard software engineering practices. The focus is strictly on the AI-specific nuances in this particular domain.

## System diagram

```mermaid
flowchart TD
  A[Input] --> B[Processing]
  B --> C[Validation]
  C --> D[Output]
```

## Competing designs and trade-offs

When evaluating alternatives, one might consider synchronous vs asynchronous execution, stateless vs stateful processes, and naive vs structured generation. Synchronous is easier to debug but scales poorly. Stateless is robust but limits context. The trade-offs heavily depend on the specific latency and cost budget allocated to the agent.

## Implementation blueprint

The core implementation relies on defining strict interfaces between components. 

1. Define the input schema.
2. Implement the validation step.
3. Route to the appropriate model or tool.
4. Process the response and handle exceptions.

This blueprint ensures predictability.

## Evaluation criteria

Success is measured by precision, recall, and the false positive rate of the agent's actions. Additionally, the system must meet latency SLAs (e.g., p95 < 2000ms) and cost constraints per task.

## Security

Security is paramount. The system must enforce least-privilege access, validate all inputs to prevent prompt injection, and sandbox any executed code. All sensitive data must be redacted before being sent to external APIs.

## Observability

The system requires trace-first observability. Every interaction must be logged with correlation IDs, token usage, and latency metrics. This enables rapid debugging and continuous evaluation of the agent's performance in production.

## Latency

Latency is bounded by the model's time-to-first-token and the number of sequential tool calls. Optimisations like streaming, caching, and concurrent execution are necessary to maintain a responsive user experience.

## What would change this decision?

If model capabilities improve significantly, such that smaller, faster models can handle complex reasoning natively, the need for intricate orchestration might be reduced. Conversely, if security requirements tighten, more rigorous air-gapping might be required.

## Exercise

Implement the blueprint described above using a mock LLM client. Verify that the validation step correctly rejects malformed inputs and that the success path logs the expected metrics.

## Sources

