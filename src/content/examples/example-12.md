---
id: example-12
title: Model Router with a Cost–Quality Budget
summary: A routing policy and evaluation matrix to dynamically route tasks across model tiers based on risk, complexity, and budget.
kind: pattern
level: advanced
domains:
  - software-engineering
tags:
  - optimisation
  - routing
  - cost-engineering
status: draft
language: en
last_verified: 2026-10-08
evidence_produced: Routing policy, evaluation set, fallback matrix, quality-cost frontier, and degradation alert.
estimated_time_minutes: 120
---

## Purpose

To optimize LLM usage by dynamically routing requests to the most appropriate model tier (e.g., fast/cheap vs. slow/expensive) based on the task's complexity, risk profile, and required quality, ensuring operational costs remain within budget without sacrificing critical performance.

## Prerequisites

- Experience with multiple LLM providers or tiers.
- Understanding of classification and heuristic-based routing.
- Familiarity with latency and cost profiling.

## Scenario

An application handles a mix of tasks: low-risk summarization, structured data extraction, and high-risk complex analysis. Sending everything to the most capable model is too expensive; sending everything to a smaller model results in unacceptable errors for complex tasks. We need a model router.

## Input

Incoming user requests categorised by task type and a configured cost-quality budget.

## Artifact: Routing Policy and Fallback Matrix

1. **Routing Policy**: Heuristics (e.g., input length, task category) or a small classifier that assigns a request to a model tier.
2. **Fallback Matrix**: If the primary model fails or times out, defines the next best model to attempt.
3. **Quality-Cost Frontier**: A chart plotting the expected quality vs. cost for different routing strategies.

## Output

A deployed router configuration and an alerting system for quality degradation.

## Evaluation Rubric

- **Quality Threshold**: The routed system must maintain an overall quality score within 5% of a pure top-tier baseline.
- **p95 Latency**: Must meet application SLA for fast tasks (e.g., < 500ms for summarization).
- **Spend per Successful Task**: Must be reduced by at least 40% compared to the top-tier baseline.
- **Fallback Correctness**: Fallbacks must successfully resolve transient errors.
- **No Silent Quality Regression**: The system must alert if the cheaper model's failure rate spikes.

## Failure Cases and Recovery

- **Router Misclassification**: Complex tasks sent to a weak model. Mitigated by continuous evaluation and tuning the routing heuristic.
- **Tier Outage**: The router automatically falls back to an available tier based on the fallback matrix.

## Security and Privacy

- Ensure that all routed models comply with data residency and privacy requirements (e.g., not routing sensitive data to a non-compliant provider).

## Latency and Cost

- The router itself must be extremely fast (< 10ms) to avoid negating the latency benefits of using a smaller model.

## Provenance

Author: Vu Hung. Based on optimisation strategies for high-volume LLM APIs.

## Next Lesson

- Cost Engineering and SLOs.
