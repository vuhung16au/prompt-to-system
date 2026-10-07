---
id: example-8
title: Durable Research Workflow with Checkpoint and Resume
summary: A state machine and checkpoint schema to ensure a multi-hour evidence synthesis task survives worker restart and human pause.
kind: playbook
level: advanced
domains:
  - software-engineering
tags:
  - durable-execution
  - state-machine
  - orchestration
status: reviewed
language: en
last_verified: 2026-10-08
evidence_produced: State machine, checkpoint schema, idempotency keys, resume trace, and recovery test.
estimated_time_minutes: 120
---

## Purpose

To demonstrate how to build a durable, long-running agent execution workflow that can survive unexpected failures, worker restarts, or human-in-the-loop pauses without duplicating side effects or losing progress.

## Prerequisites

- Understanding of state machines.
- Familiarity with durable execution frameworks or checkpointing patterns.
- Experience with multi-step LLM workflows.

## Scenario

A multi-hour evidence synthesis task must analyze thousands of documents, summarize findings, and compile a final report. The task spans hours, meaning worker restarts or network partitions are highly probable. Additionally, a human must approve the draft before final synthesis.

## Input

A large dataset of documents, search queries, and a research objective.

## Artifact: State Machine and Checkpoint Schema

The workflow uses an event-driven state machine with the following states:
1. `INITIALIZING`: Setting up the workspace and partition document sets.
2. `EXTRACTING`: Processing documents in batches with idempotency keys.
3. `WAITING_FOR_REVIEW`: Paused, awaiting human approval of the extracted summary.
4. `SYNTHESIZING`: Compiling the final report.
5. `COMPLETED` / `FAILED`: Terminal states.

Each state transition is recorded in a durable store with a corresponding `checkpoint_id` and `idempotency_key`.

## Implementation Details

When a task resumes after a restart:
1. The orchestrator loads the last known state from the durable store.
2. Any pending side effects (e.g., API calls to the LLM) check the `idempotency_key` against a cache to prevent duplicate processing.
3. The workflow resumes from the exact point of interruption.

## Output

A completed research report generated without duplicated work despite injected failures.

## Evaluation Rubric

- **No duplicated side effects**: LLM generation and external API calls must not trigger twice on retry.
- **State restored correctly**: Workflow variables must perfectly match the pre-restart state.
- **Bounded recovery time**: Resuming a task must not take linearly longer as the workflow progresses.
- **Cancellation respected**: If a cancellation signal is received during `WAITING_FOR_REVIEW`, the workflow must abort gracefully.

## Failure Cases and Recovery

- **Worker OOM during EXTRACTING**: The new worker resumes from the last completed batch checkpoint.
- **API Timeout**: Retried with exponential backoff; idempotency key ensures no duplicate billing if the request actually succeeded.

## Security and Privacy

- Checkpoints containing document data must be encrypted at rest.
- Human review logs must record the identity of the approver.

## Latency and Cost

- State persistence adds 10-50ms per transition.
- Checkpointing prevents expensive re-generation of LLM calls, saving significant token costs on failure.

## Provenance

Author: Vu Hung. Derived from patterns used in long-running research pipelines.

## Next Lesson

- Orchestration Patterns and Failure Boundaries.
