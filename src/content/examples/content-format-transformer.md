---
id: content-format-transformer
title: Content Format Transformer
summary: A utility prompt that takes content in one format (e.g., text, Markdown) and transforms it into another structured format (e.g., JSON, CSV, YAML) while maintaining data integrity.
kind: prompt
level: beginner
domains:
  - productivity
  - content-creation
tags:
  - formatting
  - data-transformation
status: reviewed
language: en
last_verified: 2026-10-05
---

## Purpose
To accurately and consistently reformat unstructured or semi-structured text into a strict, machine-readable, or highly structured format.

## When to Use
- Converting a list of notes into a CSV file for import into a database.
- Transforming a Markdown table into JSON objects.
- Reformatting a transcript into structured Q&A pairs.

## When NOT to Use
- Complex data transformations that require business logic or mathematical calculations (write a script instead).
- When the input data is highly irregular and cannot be consistently mapped to the target schema.

## Inputs
- `source_content`: The text or data to be transformed.
- `target_format`: The desired output format (e.g., JSON, CSV, Markdown table).
- `schema_or_example` (optional): An example of the desired output structure or a specific schema definition.

## Prompt / Procedure
```text
You are a precise Data Transformation Engine. Your task is to convert the following source content into the requested target format.

Target Format: {{target_format}}
Required Schema/Example: 
{{schema_or_example}}

Source Content:
{{source_content}}

Rules:
1. Output ONLY the transformed data. Do not include introductory or concluding text.
2. Maintain data integrity; do not add information that is not present in the source content, and do not omit any items.
3. If a field in the target schema cannot be populated from the source content, leave it null/empty.
4. Ensure the output is valid {{target_format}} syntax.
```

## Expected Output
Only the raw data in the requested target format, ready to be copied and pasted or parsed by a script.

## Example

**Input (`source_content`):**
```text
Meeting Notes - Oct 5, 2026
Attendees: Alice, Bob, Charlie
- Discussed the new marketing campaign. Alice will draft the email copy by Tuesday.
- Bob mentioned the budget is tight, needs approval for the software subscription.
- Charlie to follow up with the design team regarding the new logo by EOD tomorrow.
```

**Variables:**
- `target_format`: JSON
- `schema_or_example`:
```json
[
  {
    "assignee": "Name of the person responsible",
    "task": "Description of the task",
    "deadline": "Day or time"
  }
]
```

**Output:**
```json
[
  {
    "assignee": "Alice",
    "task": "Draft the email copy",
    "deadline": "Tuesday"
  },
  {
    "assignee": "Bob",
    "task": "Get approval for the software subscription",
    "deadline": null
  },
  {
    "assignee": "Charlie",
    "task": "Follow up with the design team regarding the new logo",
    "deadline": "EOD tomorrow"
  }
]
```

## Evaluation Rubric
- **Syntax Validity:** Is the output valid JSON, CSV, etc.?
- **Fidelity:** Was all data preserved without hallucination or omission?
- **Compliance:** Did the model follow the instruction to output *only* the data without conversational filler?

## Failure Modes & Risks
- **Conversational Filler:** The model might wrap the output in Markdown code blocks or say "Here is your JSON:" which breaks automated parsers.
- **Hallucination:** The model might try to fill in missing fields with made-up data.
