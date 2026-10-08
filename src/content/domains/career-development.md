---
id: career-development
title: Career Development and Job Search Systems
summary: Apply LLM workflows to job discovery, evidence-based resume tailoring, interview preparation, and application tracking without inventing credentials.
group: 'Applied practice'
order: 12
outcomes:
  - 'extract competencies and constraints from job descriptions'
  - 'map requirements to verified personal evidence'
  - 'tailor resumes and cover letters without fabricated claims'
  - 'construct interview-preparation datasets and feedback rubrics'
  - 'operate an application workflow with privacy, provenance, review, and versioning'
  - 'evaluate relevance, truthfulness, coverage, tone, and human acceptance'
featured_examples: []
featured_lessons:
  - 'prompt-engineering'
technologies:
  - 'LLM'
  - 'RAG'
  - 'Evaluation'
evidence_projects:
  - 'https://github.com/vuhung16au/genai-jobseeker'
status: 'reviewed'
last_verified: 2026-10-08
---

## Purpose

Apply LLM workflows to job discovery, evidence-based resume tailoring, interview preparation, and application tracking without inventing credentials.

## Overview

The job search process involves significant unstructured data processing—parsing job descriptions, aligning past experience, and preparing for interviews. By applying engineering rigor to this process, you can create a verifiable, truthful, and highly tailored application system that avoids the hallucinations and generic output of typical AI-generated resumes.

## Mini-Curriculum

1. **Job-description parsing into a competency schema**: Automatically extract required skills, constraints, and nice-to-haves from job postings.
2. **Evidence retrieval from resumes, portfolios, and repositories**: Use RAG to pull highly relevant evidence from your own verified history.
3. **Claim grounding and anti-fabrication controls**: Implement invariant checks to ensure the LLM never invents experience or skills.
4. **Resume and cover-letter transformations with change logs**: Generate diffs instead of just final documents, so you can review exactly what was changed.
5. **Interview simulation and rubric-based feedback**: Build a mock interview system that scores your responses against the extracted competencies.
6. **Application tracking, privacy, and human approval**: Manage the state of multiple applications securely.

## Practice Artifacts

- Requirement-evidence matrix
- Grounded resume diff
- Claim provenance table
- Interview rubric
- Application decision log

## Evaluation Rubric

- **Relevance**: Tailored artifacts directly address the extracted competencies.
- **Truthfulness**: 100% of claims made in generated artifacts map back to a verified source in the evidence database.
- **Coverage**: The system successfully parses a wide variety of job description formats.
- **Tone**: The generated content matches the applicant's authentic voice.
