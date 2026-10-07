---
id: example-10
title: Agent Trace Grading and Regression Gate
summary: A CI release gate using deterministic invariant checks and model-grader rubrics to evaluate agent trajectories.
kind: rubric
level: advanced
domains:
  - software-engineering
tags:
  - evaluation
  - ci-cd
  - tracing
status: reviewed
language: en
last_verified: 2026-10-08
evidence_produced: Representative traces, deterministic invariant checks, model-grader rubric, and CI release decision.
estimated_time_minutes: 150
---

## Purpose

To prevent regressions in agent behavior by evaluating not just the final output, but the entire trajectory (sequence of tool calls and reasoning steps) before a new agent version is deployed.

## Prerequisites

- Experience with agent tracing and observability.
- Familiarity with CI/CD pipelines.
- Understanding of LLM-as-a-judge techniques.

## Scenario

An agent is capable of reaching the correct final answer through multiple paths. However, in three test executions, one agent version took an unsafe action (querying a restricted database), and another took a highly wasteful path (looping tool calls). A regression gate is needed to catch these trajectory flaws even if the final output looks correct.

## Input

A batch of agent execution traces containing prompts, reasoning (chain-of-thought), tool calls, and outputs.

## Artifact: Model-Grader Rubric and Invariant Checks

1. **Deterministic Checks**: Ensure no restricted tools were called, and the tool call loop count did not exceed a set threshold.
2. **Model Grader Rubric**: An LLM judge evaluates the reasoning steps for logic, conciseness, and adherence to system instructions.

## Output

A CI release decision (Pass/Fail) based on the combined score of the invariant checks and the model grader.

## Evaluation Rubric

- **Outcome Quality**: Final answer correctness compared to ground truth.
- **Trajectory Quality**: Efficiency of the path taken (minimal unnecessary tool calls).
- **Unsafe-Action Detection**: Immediate failure if a forbidden tool or parameter is used.
- **Agreement with Human Labels**: The model grader's scores must align >90% with a golden set of human-graded traces.
- **False-Positive Rate**: The CI gate must not block valid, safe, and efficient agent behaviors.

## Failure Cases and Recovery

- **Judge Miscalibration**: The LLM judge may drift; requires periodic recalibration against the golden dataset.
- **CI Timeout**: Trace evaluation can be slow; run grading asynchronously or sample traces.

## Security and Privacy

- Traces used in CI must be sanitized of PII.
- The grading environment must have read-only access to traces.

## Latency and Cost

- LLM-as-a-judge incurs additional token costs per CI run. Use a smaller, cheaper model for grading if accuracy allows.

## Provenance

Author: Vu Hung. Implemented for deployment gates in autonomous research agents.

## Next Lesson

- Trajectory Evaluation and Judge Calibration.
