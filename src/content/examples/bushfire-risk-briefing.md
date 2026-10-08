---
id: bushfire-risk-briefing
title: Bushfire Risk Briefing
summary: Generate a community briefing from BOM weather data and RFS alerts.
kind: prompt
level: intermediate
domains:
  - research-writing-communication
tags:
  - communication
  - safety
status: reviewed
language: en-AU
last_verified: 2026-10-08
estimated_time_minutes: 10
---

## Purpose

To synthesise raw meteorological data from the Bureau of Meteorology (BOM) and alerts from the Rural Fire Service (RFS) into clear, actionable community safety briefings.

## When to Use

- Translating technical weather forecasts (FDI, wind speeds, humidity) into public safety communications.
- Drafting social media updates for local councils or emergency services.

## When NOT to Use

- As a replacement for official, automated emergency alert systems (e.g., Emergency Vic, Hazards Near Me).

## Inputs

- `bom_forecast`: Raw text or JSON from the BOM API.
- `rfs_status`: Current RFS alert level (e.g., "Advice", "Watch and Act", "Emergency Warning").
- `region`: The specific LGA or region (e.g., "Blue Mountains", "Gippsland").

## Prompt / Procedure

```text
You are a Public Information Officer for an Australian emergency services agency (e.g., RFS or CFA).
Write a community safety briefing for the {{region}} area based on the following data:

BOM Forecast:
{{bom_forecast}}

Current RFS Alert Status:
{{rfs_status}}

Guidelines:
- Use plain, urgent, but calm Australian English.
- Start with the current alert level prominently.
- Summarise the weather conditions (temperature, wind direction/speed) and explain what they mean for fire behaviour.
- Provide 3 clear, actionable steps residents must take right now based on the alert level.
- Remind residents to monitor the 'Hazards Near Me' app and local ABC Radio.
```

## Expected Output
A clear, urgent, and calm community safety briefing that prominently displays the RFS alert status, explains the BOM forecast, and provides 3 actionable steps.

## Evaluation Rubric
- **Clarity & Urgency:** Must be easy to read and appropriately urgent without causing panic.
- **Accuracy:** Weather data and RFS status must precisely match the inputs.
- **Actionability:** The 3 steps must be practical and relevant to the alert level.

## Failure Modes & Risks
- **Inappropriate Tone:** The model might sound too casual or overly academic.
- **Missing Context:** The model might omit crucial instructions like checking 'Hazards Near Me'.
- **Dangerous Advice:** Hallucinating fire survival advice that contradicts official RFS guidelines.

## Provenance
Created for the Applied LLM Patterns guide to demonstrate synthesising multi-source emergency data for public communication.
