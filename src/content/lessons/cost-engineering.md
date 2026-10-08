---
id: cost-engineering
title: Cost Engineering
summary: Advanced lesson on tracking, forecasting, and minimizing costs associated with large language model systems.
level: advanced
status: reviewed
track: "Track 7"
order: 3
last_verified: 2026-10-07
competencies: 
  - "System design"
prerequisites: 
  - "Foundation layers"
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

Cost engineering ensures LLM applications remain economically viable at scale through meticulous token tracking, optimized prompt design, and tiered model architectures.

## Mental model or small diagram

```mermaid
flowchart TD
    A[User Request] --> B{Task Complexity?}
    B -- Simple --> C["Flash/Lite Model (Low Cost)"]
    B -- Complex --> D["Pro Model (High Cost)"]
    C --> E[Response]
    D --> E
```

## When to use and when not to use

**When to use:**
- When scaling a prototype to a large user base.
- When unit economics (cost per inference) threaten profit margins.
- In multi-agent systems that generate extensive internal reasoning tokens.

**Non-goals:**
- Sacrificing critical application quality just to save fractions of a cent.
- Premature optimisation during early exploratory phases.

## Method or procedure

1. **Token Accounting:** Tag all API requests with user, tenant, and feature IDs to attribute costs accurately.
2. **Prompt Minification:** Remove unnecessary boilerplate, whitespace, and verbose instructions from system prompts.
3. **Model Cascading:** Start with a cheap model; if confidence is low, escalate to a more expensive model.
4. **Context Truncation:** Limit conversation history to the minimum required for accurate responses.

## Worked example

**Input:** A summarization pipeline costing $1000/day using a heavy model.

**Process:**
```python
def summarize_document(doc):
    # Tier 1: Try fast, cheap model first
    summary, confidence = fast_llm.summarize_with_confidence(doc)
    
    if confidence < 0.8:
        # Tier 2: Escalate to expensive model only when necessary
        summary = pro_llm.summarize(doc)
        
    return summary
```

**Output:** By routing 80% of documents to the fast model, the daily cost drops to $250 without a noticeable loss in quality.

## Failure modes and mitigations

- **Hidden Token Bloat:** Automated context retrieval injecting thousands of irrelevant tokens. *Mitigation: Implement strict token caps on retrieval tools.*
- **Unexpected Spikes:** A rogue script or an infinite loop generating millions of tokens. *Mitigation: Set hard daily spend limits at the API provider level.*

## Evaluation checklist or rubric (measurable release thresholds)

- [ ] Are costs tracked per feature and per tenant?
- [ ] Is there an automated alert for unusual spikes in token consumption?
- [ ] Has the system prompt been audited for unnecessary token bloat?

## Safety, privacy, and cost notes

- **Safety:** Ensure cost-saving mechanisms (like model cascading) do not bypass safety guardrails present only in larger models.
- **Privacy:** Be cautious when using third-party caching services; ensure data privacy agreements are in place.
- **Cost:** This is the core focus of the lesson. Always measure cost per interaction.

## Practice task

Implement a token counter wrapper around your LLM calls that logs the exact cost in USD based on the current pricing of input and output tokens for the specific model used.

## Provenance and further reading

- **Source**: Engineering Documentation
- **Author/Organization**: Platform Team
- **Publication Date**: 2026-10-07

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
