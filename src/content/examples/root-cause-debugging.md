---
id: root-cause-debugging
title: Root Cause Debugging
summary: A systematic prompt designed to help developers identify the root cause of an error by analyzing logs, stack traces, and code snippets.
kind: prompt
level: advanced
domains:
  - software-engineering
tags:
  - debugging
  - troubleshooting
  - logs
status: reviewed
language: en
last_verified: 2026-10-05
---

## Purpose

To assist developers in tracking down the underlying cause of a software bug or failure, moving beyond surface-level symptoms to find the true root cause.

## When to Use

- You have an error message or stack trace but are unsure what caused it.
- A system is behaving unexpectedly and you need a systematic approach to investigate.
- You want to generate hypotheses for a complex bug.

## When NOT to Use

- The issue is a simple syntax error that a compiler or linter already explains clearly.
- You have no context, logs, or code to provide.

## Inputs

- `error_message`: The exact error message or stack trace.
- `relevant_code`: The code snippet where the error occurred (or is suspected to originate).
- `system_context`: Information about the environment (e.g., Node.js v18, production environment).

## Prompt / Procedure

```text
You are an expert Debugging Assistant. I need your help finding the root cause of an issue.

Error Message / Stack Trace:
{{error_message}}

Relevant Code:
{{relevant_code}}

System Context:
{{system_context}}

Please analyse the provided information and do the following:
1. Explain the Error: Briefly explain what the error message means in plain English.
2. Formulate Hypotheses: Propose 2-3 potential root causes for this error based on the code and context. Rank them from most likely to least likely.
3. Troubleshooting Steps: For each hypothesis, provide concrete steps I can take to verify if it is the actual root cause (e.g., adding specific logging, checking a database configuration).
4. Potential Fixes: Suggest potential code changes to resolve the most likely hypotheses.
```

## Expected Output

A structured debugging guide containing an explanation of the error, ranked hypotheses, steps to verify, and potential fixes.

## Evaluation Rubric

- **Accuracy:** Does the model correctly interpret the stack trace?
- **Plausibility:** Are the generated hypotheses realistic given the context?
- **Actionability:** Are the troubleshooting steps clear and easy to follow?

## Failure Modes & Risks

- **Guessing:** The model might confidently suggest a fix that is completely unrelated if the provided context is too sparse.
- **Outdated Knowledge:** The model might suggest fixes that apply to older versions of a library/framework.

## Provenance

- **Author:** Vu Hung
- **Date:** October 2026
- **Source:** Original example created for the Applied LLM Patterns learning path.
