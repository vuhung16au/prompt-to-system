---
id: code-review-assistant
title: Code Review Assistant
summary: A prompt pattern that acts as an automated reviewer for pull requests, checking for best practices, security vulnerabilities, and code clarity.
kind: prompt
level: advanced
domains:
  - software-engineering
tags:
  - code-review
  - security
  - best-practices
status: reviewed
language: en
last_verified: 2026-10-05
---

## Purpose

To provide constructive, thorough, and automated code reviews that highlight potential bugs, security issues, performance bottlenecks, and style violations.

## When to Use

- Reviewing pull requests or merge requests.
- Checking snippets of code for potential issues before committing.
- Mentoring junior developers by providing detailed explanations of issues.

## When NOT to Use

- As a replacement for traditional linting or static analysis tools.
- When reviewing entire large codebases at once (best used for isolated changes).

## Inputs

- `code_snippet`: The code or diff to be reviewed.
- `language`: The programming language used.
- `context`: What the code is supposed to do (e.g., ticket description).

## Prompt / Procedure

```text
You are an expert Senior Software Engineer performing a code review. Please review the following code snippet written in {{language}}.

Context of the change:
{{context}}

Code to review:
{{code_snippet}}

Your review should cover the following aspects:
1. Bugs & Logic Errors: Identify any obvious mistakes or edge cases that are not handled.
2. Security Vulnerabilities: Highlight any potential security risks (e.g., injection, XSS).
3. Performance: Suggest optimisations if applicable.
4. Readability & Maintainability: Comment on variable naming, code structure, and adherence to standard best practices.
5. Positive Feedback: Point out at least one thing the author did well.

Provide your feedback in a constructive and encouraging tone. Use code blocks for suggested fixes.
```

## Expected Output

A detailed, categorised review of the provided code, including specific line references and suggested improvements.

## Evaluation Rubric

- **Correctness:** Are the identified issues real problems?
- **Constructiveness:** Is the tone helpful rather than critical?
- **Actionability:** Are the suggested fixes practical and idiomatic for the language?

## Failure Modes & Risks

- **Nitpicking:** Focusing too much on stylistic choices that should be handled by a formatter (e.g., Prettier).
- **Misunderstanding Context:** Suggesting changes that break the intended functionality due to lack of broader system knowledge.

## Provenance

- **Author:** Vu Hung
- **Date:** October 2026
- **Source:** Original example created for the Applied LLM Patterns learning path.
