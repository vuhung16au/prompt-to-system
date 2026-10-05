---
id: structured-seo-outliner
title: Structured SEO Outliner
summary: A prompt pattern that helps create comprehensive, SEO-optimized outlines for blog posts and articles based on target keywords and competitor analysis.
kind: prompt
level: intermediate
domains:
  - marketing
  - content-creation
tags:
  - seo
  - content-marketing
  - writing
status: reviewed
language: en
last_verified: 2026-10-05
---

## Purpose
Generate highly structured, intent-driven, and SEO-optimized outlines for articles. This ensures all critical topics are covered and semantic keywords are naturally included before the drafting phase begins.

## When to Use
- Planning long-form content (blog posts, guides, whitepapers).
- Performing content gap analysis against competitors.
- Organizing thoughts into a logical flow that matches search intent.

## When NOT to Use
- Writing short, creative copy (e.g., social media posts) where strict structure inhibits creativity.
- Creating purely opinion-based pieces that don't target specific search queries.

## Inputs
- `target_keyword`: The primary keyword to rank for.
- `secondary_keywords`: A list of LSI or related keywords.
- `target_audience`: A brief description of the intended reader.
- `competitor_urls` (optional): Links to top-ranking articles for the target keyword.

## Prompt / Procedure
```text
You are an expert SEO Content Strategist. Your task is to create a comprehensive, highly structured outline for an article targeting the primary keyword: "{{target_keyword}}".

Here is the context:
- Secondary Keywords: {{secondary_keywords}}
- Target Audience: {{target_audience}}

Your outline must include:
1. A catchy, click-worthy H1 title.
2. A brief summary of the search intent behind the primary keyword.
3. H2 and H3 subheadings organized logically.
4. For each section, provide a 1-2 sentence description of what should be covered.
5. Identify which secondary keywords should be naturally integrated into each section.
6. Suggest internal and external linking opportunities where appropriate.

Do not write the article itself; provide only the outline.
```

## Expected Output
A hierarchical outline (Markdown format) with clear headings, section descriptions, and keyword placement instructions.

## Evaluation Rubric
- **Search Intent Match:** Does the outline directly address what the user is trying to find?
- **Comprehensiveness:** Are all major subtopics related to the keyword covered?
- **Logical Flow:** Do the headings progress in a way that makes sense to a reader?
- **Keyword Integration:** Are secondary keywords distributed naturally across the sections?

## Failure Modes & Risks
- **Over-optimization (Keyword Stuffing):** The model might suggest forcing too many keywords into a single section.
- **Generic Headings:** Producing overly generic H2s (e.g., "Introduction", "Conclusion") instead of descriptive, keyword-rich headings.

## Provenance
Created to streamline content marketing workflows and improve organic search visibility.
