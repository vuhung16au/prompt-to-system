---
id: nbn-rollout-tracker
title: NBN Rollout Tracker
summary: Structured extraction from nbn™ deployment reports.
kind: prompt
level: advanced
domains:
  - software-engineering
tags:
  - data-extraction
  - automation
status: draft
language: en-AU
last_verified: 2026-10-08
estimated_time_minutes: 20
---

## Purpose

To reliably extract structured data (JSON) from unstructured NBN Co rollout PDFs, press releases, or weekly progress reports, for ingestion into a tracking database.

## When to Use

- Converting text-heavy government or corporate infrastructure reports into structured tables.
- Building an automated data pipeline that monitors public infrastructure updates.

## When NOT to Use

- If NBN Co provides an official, up-to-date API or CSV dataset that already contains the required fields.

## Inputs

- `report_text`: The raw text extracted from the NBN update.

## Prompt / Procedure

```text
You are a data extraction system. Your task is to extract structured information about the nbn™ network rollout from the following text.

Text:
{{report_text}}

Extract the data into a JSON array of objects. Each object must represent a specific suburb or region mentioned in the text and match this exact schema:

{
  "suburb": "string",
  "state": "string (e.g., NSW, VIC, QLD)",
  "technology_type": "string (must be one of: FTTP, FTTN, FTTC, HFC, Fixed Wireless, Satellite)",
  "premises_ready": "integer",
  "estimated_completion": "string (YYYY-MM)"
}

Rules:
- If a field is not explicitly stated or cannot be confidently inferred, use null.
- Do NOT include any markdown formatting, explanations, or text outside the JSON array. Output ONLY valid JSON.
```
