---
id: data-analysis-summary
title: Data Analysis Summary
summary: A prompt that guides the model to analyze raw data (CSV, JSON, or text) and provide a concise, actionable summary with key insights and trends.
kind: prompt
level: intermediate
domains:
  - research
  - data-science
tags:
  - analysis
  - data
  - reporting
status: reviewed
language: en
last_verified: 2026-10-05
---

## Purpose
To convert raw or unstructured data into a structured summary that highlights key metrics, anomalies, and trends for stakeholders.

## When to Use
- You have a dataset (e.g., CSV, JSON) and need a quick overview of its contents.
- You need to present data findings to non-technical stakeholders.
- You want to identify outliers or interesting patterns quickly.

## When NOT to Use
- The dataset is extremely large (exceeds the context window of the LLM).
- You require precise, complex statistical modeling (use dedicated tools like Python/R instead).

## Inputs
- `raw_data`: The data to be analyzed (pasted text, CSV, or JSON).
- `focus_areas` (optional): Specific metrics or trends to look out for.
- `audience`: Who will be reading the summary (e.g., Executive, Marketing Team).

## Prompt / Procedure
```text
You are an expert Data Analyst. I will provide you with a dataset, and your task is to analyze it and produce a clear, actionable summary.

Here is the data:
{{raw_data}}

Please consider these focus areas: {{focus_areas}}
The audience for this summary is: {{audience}}

Please provide the following:
1. High-Level Overview: A 2-3 sentence summary of the dataset.
2. Key Findings: 3-5 bullet points highlighting the most important trends, anomalies, or insights.
3. Actionable Recommendations: Based on the findings, suggest 1-2 concrete actions the audience can take.
4. Data Quality Note: Mention any missing values, inconsistencies, or limitations in the provided data.
```

## Expected Output
A structured summary in Markdown format, tailored to the requested audience, containing the four sections requested above.

## Evaluation Rubric
- **Accuracy:** Does the summary accurately reflect the provided data without hallucinating?
- **Clarity:** Is the language appropriate for the target audience?
- **Actionability:** Are the recommendations practical and supported by the data?

## Failure Modes & Risks
- **Hallucination:** The model might invent trends that are not statistically significant.
- **Context Limit:** Providing too much data might cause the model to lose focus or truncate the analysis.

## Provenance
- **Author:** Vu Hung
- **Date:** October 2026
- **Source:** Original example created for the Applied LLM Patterns learning path.
