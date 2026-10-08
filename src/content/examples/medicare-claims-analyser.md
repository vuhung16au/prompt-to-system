---
id: medicare-claims-analyser
title: Medicare Claims Analyser
summary: A prompt pattern to summarise bulk-billed claims data from Medicare/PBS datasets.
kind: prompt
level: advanced
domains:
  - data-python
  - healthcare
tags:
  - data-analysis
  - healthcare
  - python
status: draft
language: en-AU
last_verified: 2026-10-08
estimated_time_minutes: 15
---

## Purpose

To process and summarise large-scale bulk-billed claims data from Australian Medicare and PBS datasets while adhering strictly to privacy guidelines (avoiding PII exposure).

## When to Use

- Analysing de-identified Medicare Benefits Schedule (MBS) claims.
- Generating policy summaries for State Health departments.

## When NOT to Use

- When data contains Personally Identifiable Information (PII) or patient records (unless using a secure, local, HIPAA/Privacy Act compliant LLM).

## Inputs

- `claims_data_csv`: De-identified CSV string of MBS item numbers and counts.
- `target_demographic`: (Optional) specific age or location group (e.g., "NSW Regional").

## Prompt / Procedure

```text
You are a senior data analyst at the Australian Department of Health and Aged Care. 
Analyse the following de-identified Medicare (MBS) claims data.

Data:
{{claims_data_csv}}

Demographic focus: {{target_demographic}}

Provide:
1. Executive Summary: 2-3 sentences outlining the primary trends in bulk-billing rates.
2. Top Item Numbers: The 5 most frequently claimed MBS items and their descriptions.
3. Cost Implications: A brief analysis of the total cost to the Commonwealth based on the provided schedule fees.
4. Recommendations: 2 policy recommendations for improving access in the target demographic.

Format as a formal departmental brief using Australian English.
```
