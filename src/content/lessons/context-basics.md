---
id: context-basics
title: Context Engineering Basics
summary: How to manage the context window effectively.
level: intermediate
last_verified: 2026-10-05
featured: true
---

# Context Engineering Basics

## Purpose
Understanding how to manage the context window effectively is crucial for building robust and reliable Large Language Model (LLM) applications. The context window is the memory space an LLM has for a given interaction. "Context engineering" is the process of curating, structuring, and optimizing the information fed into this window to maximize the relevance, accuracy, and usefulness of the model's output while minimizing hallucinations and latency.

## When to use
- **Always**, when building AI agents, RAG (Retrieval-Augmented Generation) systems, or any non-trivial LLM application.
- When passing external documents, code snippets, or database records to an LLM.
- When orchestrating multi-turn conversations where past interactions need to be remembered.

## When not to use
- When performing simple, zero-shot tasks that rely entirely on the LLM's internal knowledge (e.g., "Translate 'hello' to French").
- When cost and latency constraints are so extreme that only minimal, hardcoded prompts are feasible.

## Inputs
- **Static Context:** System prompts, persona definitions, and permanent rules.
- **Dynamic Context:** User queries, retrieved documents (RAG), conversation history, real-time data from APIs, and environmental state.
- **Formatting:** Markdown, XML/HTML tags, or JSON structures used to organize the text.

## Prompt or procedure
1. **Structure with Clear Boundaries:** Use delimiters (like XML tags `<context>...</context>` or markdown headers) to clearly separate instructions from context data.
2. **Prioritize Order (The "U-Shape" Effect):** LLMs tend to pay more attention to information at the very beginning and the very end of the prompt. Place critical instructions and key constraints at the end, and foundational context at the beginning. Put supporting details in the middle.
3. **Filter and Chunk:** Don't dump raw data. Filter out noise and break large documents into semantically meaningful chunks before adding them to the context.
4. **Include Metadata:** When providing documents, include relevant metadata (e.g., title, date, source) to help the model ground its understanding.

## Expected output
- Highly relevant and accurate responses grounded in the provided facts.
- Reduced hallucinations, as the model relies on provided context rather than guessing.
- Better adherence to complex constraints and formatting rules.

## Worked example

**Poor Context Engineering:**
```text
Here are some notes: The project is called Apollo. It started in 2023. The deadline is Q4 2024. The budget is $5M. 
Also, John is the PM. 
Based on the notes, write a project summary.
```

**Good Context Engineering:**
```xml
<system_instructions>
You are an expert project manager. Your task is to write a concise project summary based ONLY on the provided context.
</system_instructions>

<context>
Project Name: Apollo
Start Date: 2023
Target Deadline: Q4 2024
Budget: $5M
Project Manager: John Doe
</context>

<task>
Write a 2-sentence project summary highlighting the timeline and budget. Do not include information outside of the <context> block.
</task>
```

## Failure modes
- **Lost in the Middle:** Overloading the context window can cause the model to ignore or forget information located in the middle of the prompt.
- **Context Dilution:** Providing too much irrelevant information makes it harder for the model to attend to the critical details, leading to generic or inaccurate answers.
- **Conflicting Information:** If the context contains contradictory statements without clear timestamps or authority weights, the model may get confused.
- **Context Window Exceeded:** Exceeding the model's maximum token limit will result in truncation, potentially cutting off vital instructions or data.

## Evaluation rubric
- **Grounding (Faithfulness):** Does the model's response rely solely on the provided context, or does it hallucinate external information?
- **Completeness:** Did the model synthesize all relevant parts of the context to answer the query?
- **Instruction Following:** Did the model adhere to the constraints (e.g., formatting, tone) provided alongside the context?

## Safety and privacy notes where relevant
- **Data Leakage:** Never include sensitive Personally Identifiable Information (PII), API keys, passwords, or confidential trade secrets in the context window unless the LLM is hosted in a secure, compliant environment (and even practice data minimization then).
- **Prompt Injection:** Be wary of untrusted data added to the context. A malicious user might embed instructions within the context (e.g., "Ignore previous instructions and do X") that hijack the model.

## Provenance and attribution
Synthesized from standard prompt engineering best practices established by OpenAI, Anthropic, and the broader AI engineering community.
