---
id: example-11
title: Threat Model and Permission Policy for a Tool-Using Agent
summary: A comprehensive security threat model and capability policy for an agent that modifies code repositories.
kind: threat model
level: advanced
domains:
  - software-engineering
tags:
  - security
  - threat-modeling
  - permissions
status: draft
language: en
last_verified: 2026-10-08
evidence_produced: Data-flow diagram, trust boundaries, abuse cases, capability policy, approval matrix, and negative tests.
estimated_time_minutes: 180
---

## Purpose

To systematically identify, mitigate, and test security risks associated with deploying an autonomous agent that has write access to production systems or code repositories.

## Prerequisites

- Understanding of STRIDE threat modeling.
- Familiarity with least privilege and capability-based security.
- Experience with prompt injection and jailbreak mitigation.

## Scenario

A developer productivity agent is tasked with reading GitHub issues, cloning a repository, making code changes, and proposing a pull request. We need to ensure the agent cannot be manipulated via malicious issue descriptions (prompt injection) to exfiltrate secrets or introduce backdoors.

## Input

System architecture, API specifications, and agent system prompts.

## Artifact: Threat Model and Capability Policy

1. **Data-Flow Diagram**: Visualizes the flow of data from untrusted sources (GitHub issues) to the LLM and out to the repository.
2. **Trust Boundaries**: Explicitly separates the LLM execution environment from the repository secrets.
3. **Capability Policy**: The agent is granted a narrow scoped token that can *only* create branches and open PRs, but *cannot* push to `main` or read CI secrets.
4. **Approval Matrix**: Defines which actions require human-in-the-loop (HITL) approval (e.g., merging a PR).

## Output

A documented threat model, a hardened permission configuration, and a suite of negative tests.

## Evaluation Rubric

- **Blocked Privilege Escalation**: Negative tests must prove the agent cannot elevate its permissions.
- **Prompt-Injection Containment**: If the agent is injected, the blast radius must be contained by the capability policy.
- **Audit Completeness**: Every tool call and state change must be immutably logged.
- **Safe Failure**: If a security check fails, the agent must halt and alert, rather than continuing execution.

## Failure Cases and Recovery

- **Token Exfiltration**: If a token is somehow leaked, its blast radius is limited by scope, and it is automatically rotated on a short TTL.

## Security and Privacy

- The agent operates in an isolated sandbox with no network access outside of explicitly allowlisted endpoints.

## Latency and Cost

- Sandboxing and capability checks add minor execution latency but are non-negotiable for system integrity.

## Provenance

Author: Vu Hung. Adapted from secure deployment architectures for coding agents.

## Next Lesson

- Capability Security and Sandboxing.
