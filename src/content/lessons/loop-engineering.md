---
id: loop-engineering
title: Loop Engineering
summary: Managing repeated work with state, checks, and stop rules.
level: advanced
last_verified: 2026-10-05
order: 5
stage: 5
duration_minutes: 25
outcomes: 
  - Design autonomous loops with explicit termination conditions.
  - Manage context over multiple iterations.
prerequisites: 
  - harness-engineering
related_lessons: 
  - evaluation-reliability
related_examples: 
  - root-cause-debugging
glossary_terms: 
  - termination-condition
  - infinite-loops
  - context-collapse
status: reviewed
sources: 
  - "Designing Autonomous Agents"
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

Autonomous loops must be designed with explicit termination conditions, robust state management, and clear escalation paths to prevent runaway execution and budget exhaustion.

## Mental model or small diagram

```mermaid
stateDiagram-v2
    [*] --> Plan
    Plan --> Execute
    Execute --> Evaluate
    Evaluate --> Plan : Failure
    Evaluate --> [*] : Success
    Evaluate --> Escalate : Max Iterations Reached
```

## When to use and when not to use

**When to use:**

- Self-Correcting Workflows (e.g., agents writing and debugging code).
- Open-Ended Research tasks requiring continuous information gathering.
- Multi-Agent Orchestration.

**When not to use:**

- Linear, Predictable Tasks like simple data extraction. Use a DAG or pipeline instead.
- Strict Budget Constraints where you cannot risk an agent looping unnecessarily.

## Method or procedure

1. **Define Convergence:** Establish how the agent measures progress toward its goal.
2. **Set Termination Rules:** Enforce max iterations, timeout limits, or budget caps.
3. **Build Recovery Logic:** Detect when the agent repeats the exact same action and force a new approach or pause.
4. **Context Pruning:** Implement summarization steps to compress previous iterations so the context window doesn't overflow.

## Worked example

**Process:**

```python
max_iterations = 5
iteration = 0
passed = False
previous_errors = []

while iteration < max_iterations and not passed:
    code = agent.generate_code(prompt, previous_errors)
    test_results = environment.run_tests(code)
    
    if test_results.is_success:
        passed = True
        break
        
    if agent.is_stuck_in_repetition(test_results, previous_errors):
        agent.escalate_to_human("Stuck in a loop. Need assistance.")
        break
        
    previous_errors.append(test_results.error_messages)
    iteration += 1
```

## Failure modes and mitigations

- **Infinite Loops (Hallucination Traps):** The agent tries the same incorrect solution endlessly. *Mitigation: Track action history and break if the similarity of consecutive actions is too high.*
- **Context Collapse:** The loop runs so long the prompt history exceeds the LLM limit. *Mitigation: Summarize past iterations every N steps.*

## Evaluation checklist or rubric

- [ ] **Graceful Termination:** Does the loop stop when max iterations are hit?
- [ ] **Repetition Awareness:** Does the agent recognize and recover from repeated failures?
- [ ] **Escalation Triggers:** Does the agent ask for human help when genuinely stuck?

## Safety, privacy, and cost notes

- **Cost:** Loops are extremely dangerous for budgets. Always set a hard limit on API calls or token spend per session.

## Practice task

Design a state machine for an agent whose goal is to scrape a website, extract pricing data, and format it. Define the states, the success condition, and at least two failure states that trigger an escalation to a human.

## Provenance and further reading

> **Note:** The principles taught in this lesson are model-independent. Any vendor-specific implementation notes (e.g., specific API features or context limits from Anthropic or OpenAI) are used for illustration and should be adapted to your chosen provider.

- **Source**: [Agentic Design Patterns](https://www.deeplearning.ai/the-batch/how-agents-can-improve-llm-performance/)
- **Author/Organization**: Andrew Ng
- **Publication Date**: 2024-04-12
- **Access Date**: 2026-10-07
- **Next Steps**: Review the related example `content-format-transformer` or proceed to the lesson `harness-engineering`.

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

