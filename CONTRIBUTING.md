# Contributing to Applied LLM Patterns

Welcome to the Applied LLM Patterns project! We are building a concise educational website for intermediate and advanced LLM users.

## Taxonomy

We use the following definitions to classify our content:

### Artifact Types

| Type | Definition |
| --- | --- |
| **Lesson** | A concise explanation of one concept or technique. |
| **Prompt** | Instructions intended primarily for one model interaction. |
| **Pattern** | A reusable technique independent of a specific domain. |
| **Playbook** | A human-guided sequence of steps for completing a task. |
| **Agent workflow** | A multi-step task involving model decisions and tools. |
| **Harness blueprint** | Guidance for tools, permissions, instructions, tests, and feedback around an agent. |
| **Loop blueprint** | Repeated execution with state, checks, budgets, recovery, and stop rules. |
| **Checklist** | Preparation or review criteria. |
| **Rubric** | Criteria for evaluating an output or workflow. |
| **Case study** | Evidence about what worked, what failed, and why. |

### Domains

- `research` (Research and analysis)
- `writing` (Writing and communication)
- `sales` (Sales)
- `marketing` (Marketing)
- `mathematics` (Mathematics)
- `data-analysis` (Data analysis)
- `software-engineering` (Software engineering)
- `it-operations` (IT and operations)
- `productivity` (Productivity)

### Levels

- `beginner`
- `intermediate`
- `advanced`

### Statuses

- `draft`
- `reviewed`
- `deprecated`

---

## Content Templates

All content must use Markdown and YAML frontmatter.

### Lesson Template

```markdown
---
id: [unique-id]
title: [Lesson Title]
summary: [One-sentence summary]
level: [intermediate/advanced]
last_verified: YYYY-MM-DD
---

## Key Takeaway
[Practical takeaway near the top]

## Explanation
[What the technique is and why it matters]

## When to use it
- [Use case 1]
- [Use case 2]

## When NOT to use it
- [Avoid case 1]

## Small Example
[Compact inline example]

## Common Failure Modes
[What can go wrong]

## How to Evaluate
[How to check whether it worked]

## Related Examples
- [Link to complete example in repository]
```

### Example Template

```markdown
---
id: [unique-id]
title: [Example Title]
summary: [One-sentence summary]
kind: [prompt|pattern|playbook|agent workflow|harness blueprint|loop blueprint]
level: [intermediate/advanced]
domains:
  - [domain-name]
technologies:
  - [optional]
tags:
  - [tag1]
status: reviewed
language: en
last_verified: YYYY-MM-DD
featured: [true/false]
provenance:
  type: [original|adapted|quoted]
---

## Purpose
[Why this exists]

## When to Use
[Use cases]

## When NOT to Use
[Avoid cases]

## Inputs
- `[variable_name]`: [Description]

## Prompt / Procedure
```text
[Prompt text or steps]
```

## Expected Output
[What to expect]

## Evaluation Rubric
[How to grade the output]

## Failure Modes & Risks
[Limitations and risks]

## Provenance
[Where this came from, based on our policy]
```

---

## Provenance and Attribution Policy

Every migrated or contributed asset must be reviewed before publication.

1. **Original Content**: Content created entirely by the project contributors. Needs no external attribution.
2. **Adapted Content**: Content inspired by or heavily modified from another source. Must link to the original source and credit the author in the `Provenance` section.
3. **Quoted Content**: Direct copies of prompts or workflows from another source. Must only be published if the original license permits it, and must preserve copyright notices and attribute the author.

Material with unclear reuse rights must not be published verbatim.

**Safety Checks:**
- Remove unsupported performance claims.
- Remove instructions that attempt to override system or safety controls.
- Avoid invented statistics, testimonials, citations, or guarantees.
- Mark high-stakes uses and require professional review where appropriate.
- Identify privacy-sensitive inputs.
