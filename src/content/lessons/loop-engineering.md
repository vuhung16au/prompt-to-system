---
id: loop-engineering
title: Loop Engineering
summary: Managing repeated work with state, checks, and stop rules.
level: advanced
last_verified: 2026-10-05
---

## Key Takeaway
Autonomous loops must be designed with explicit termination conditions, robust state management, and clear escalation paths to prevent runaway execution and budget exhaustion.

## Explanation
Loop engineering is the discipline of designing iterative, autonomous agent workflows. Unlike standard software loops (e.g., `while` or `for`), autonomous agent loops deal with non-deterministic outputs (LLM generations) and external environments. This requires answering key questions:
- **Convergence:** How does the agent measure progress toward its goal?
- **Termination:** When does the loop stop? (Success, maximum iterations, context limit, budget cap).
- **Recovery:** What happens if the agent gets stuck in a repetitive failure cycle (e.g., trying the same incorrect fix multiple times)?
- **Escalation:** When should the agent pause and ask a human for help?

## When to use it
- **Self-Correcting Workflows:** Coding agents that write code, run tests, and debug errors iteratively until tests pass.
- **Continuous Monitoring:** Agents that poll an inbox, watch a database for changes, or monitor system health and react to anomalies.
- **Open-Ended Research:** Information gathering tasks where the agent must search, read, synthesize, and determine if more information is needed.
- **Multi-Agent Orchestration:** Complex tasks requiring back-and-forth collaboration between specialist agents (e.g., a planner and a researcher).

## When NOT to use it
- **Linear, Predictable Tasks:** Simple data extraction, single-shot formatting, or basic summarization. Use a standard pipeline or DAG instead.
- **Low-Latency Requirements:** Tasks that must complete in real-time or under strict time constraints, as loops introduce unpredictable latency.
- **Strict Budget Constraints without Guardrails:** Do not deploy autonomous loops without hard caps on token usage or API calls.

## Small Example
```python
# Pseudo-code for a self-correcting coding agent loop
max_iterations = 5
iteration = 0
passed = False
previous_errors = []

while iteration < max_iterations and not passed:
    # Agent attempts to write or fix the code
    code = agent.generate_code(prompt, previous_errors)
    test_results = environment.run_tests(code)
    
    if test_results.is_success:
        passed = True
        print("Success!")
        break
        
    # Check if the agent is trying the same failing approach
    if agent.is_stuck_in_repetition(test_results, previous_errors):
        agent.escalate_to_human("Stuck in a loop. Need assistance.")
        break
        
    previous_errors.append(test_results.error_messages)
    
    # Optional: Context pruning to prevent window exhaustion
    if len(previous_errors) > 3:
        previous_errors = agent.summarize_errors(previous_errors)
        
    iteration += 1

if not passed:
    raise Exception("Failed to solve after maximum iterations.")
```

## Advanced Patterns
- **Context Pruning:** Iterative loops can quickly bloat the LLM context window. Implement summarization steps to compress previous iterations and discard irrelevant logs.
- **State Machines:** Model the loop as a Finite State Machine (FSM) where the agent transitions between states (e.g., `PLAN`, `EXECUTE`, `VERIFY`) with strict entry and exit criteria.
- **Memory Layers:** Differentiate between short-term memory (context for this specific loop execution) and long-term memory (lessons learned from past executions stored in a vector database).

## Common Failure Modes
- **Infinite Loops (Hallucination Traps):** The agent confidently tries the same incorrect solution over and over, failing to recognize it is stuck.
- **Budget Exhaustion:** Without strict iteration limits, an agent can rack up massive API costs in a very short amount of time.
- **Context Collapse:** The loop runs for so long that the prompt history exceeds the LLM's context window, causing the agent to "forget" its original instructions or earlier progress.

## How to Evaluate
- **Graceful Termination:** Does the loop terminate gracefully? (Test with impossible tasks to ensure iteration and budget limits work).
- **Repetition Awareness:** Does the agent recognize repetition? (Measure if it tries genuinely new approaches after a failure).
- **Context Efficiency:** Is context managed efficiently? (Monitor token usage per iteration to ensure it does not grow linearly forever).
- **Escalation Triggers:** Are escalation triggers effective? (Does the agent ask for help when genuinely stuck instead of endlessly spinning?).

## Related Examples
- [Root-cause Debugging Playbook](/prompt-to-system/examples/root-cause-debugging)
