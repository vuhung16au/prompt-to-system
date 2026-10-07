---
id: software-engineering
title: Software Engineering
summary: Using LLMs for coding, debugging, architecture, and deployment.
group: 'Core expertise'
order: 3
outcomes:
  - 'Accelerated development and prototyping'
  - 'Automated code reviews and vulnerability scanning'
  - 'Streamlined refactoring of legacy codebases'
featured_examples:
  - 'code-review-assistant'
  - 'root-cause-debugging'
featured_lessons:
  - 'loop-engineering'
  - 'workflow-engineering'
technologies:
  - 'GitHub Copilot'
  - 'Code LLMs'
  - 'CI/CD Pipelines'
evidence_projects:
  - 'https://github.com/features/copilot'
  - 'https://github.com/vuhung/prompt-to-system'
  - 'https://github.com/continuedev/continue'
status: 'reviewed'
last_verified: 2026-10-07
---

## Overview

Software engineering with AI represents a paradigm shift from manual coding to higher-level system design and orchestration. Developers can now rely on AI to draft boilerplate, write tests, refactor legacy systems, and provide intelligent suggestions in real-time.

## Outcomes

- **Accelerated development and prototyping**: Rapidly translating requirements into functional code.
- **Automated code reviews and vulnerability scanning**: Identifying bugs and security flaws early in the lifecycle.
- **Streamlined refactoring of legacy codebases**: Translating languages or updating outdated frameworks with AI assistance.

## Technologies

- AI Coding Assistants (GitHub Copilot, Continue)
- Code-specialized LLMs (Codex, StarCoder)
- Automated testing frameworks
- CI/CD integration

## Examples

- Generating unit and integration tests for a complex business logic module.
- Refactoring a monolithic application into microservices using AI guidance.
- Creating continuous integration scripts based on repository structures.

## Lessons

- Providing necessary context (types, schemas, interfaces) for accurate code generation.
- Iterating in small chunks rather than requesting massive features at once.
- Using AI to explain complex, undocumented legacy code.

## Risks

- Introducing subtle logical errors or security vulnerabilities.
- Code bloat from over-relying on auto-generated boilerplate.
- IP or licensing issues if models memorize restricted code snippets.

## Practice Task

Take a legacy function that lacks documentation and tests. Use an AI assistant to first explain what the code does, then generate a comprehensive set of unit tests for it, and finally refactor the function for better readability.
