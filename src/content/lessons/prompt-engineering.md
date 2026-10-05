---
id: prompt-engineering
title: Prompt Engineering
summary: Mastering the fundamental instructions intended primarily for one model interaction.
level: intermediate
last_verified: 2026-10-05
---

## Key Takeaway
Clear, constrained, and well-structured instructions yield predictable, high-quality results from Large Language Models (LLMs).

## Introduction
Prompt engineering is the base layer of LLM interaction. It answers the fundamental question: *What should the model do in this specific interaction?* It is the craft of designing inputs that optimally steer the model toward the desired output. While "engineering" might sound highly technical, it is often more akin to clear communication and precise writing.

## The Anatomy of a Good Prompt
A well-constructed prompt usually contains several of the following elements:
- **Role (Persona):** Who should the model act as? (e.g., "Act as a senior software engineer.")
- **Task:** What is the specific action required? (e.g., "Review this code for security vulnerabilities.")
- **Context:** What background information does the model need? (e.g., "This code is part of a financial trading application.")
- **Format:** How should the output be structured? (e.g., "Output a markdown table with columns: Line Number, Vulnerability, Fix.")
- **Constraints:** What limits should the model respect? (e.g., "Do not suggest architectural changes, only security patches.")

## Advanced Prompting Techniques

### 1. Zero-Shot Prompting
Asking the model to perform a task without providing any examples. This relies entirely on the model's pre-trained knowledge.
*Example:* "Classify the sentiment of this text: 'I loved the new movie!'"

### 2. Few-Shot Prompting
Providing the model with a few examples of the desired input-output pairs to demonstrate the expected pattern or format. This significantly improves accuracy and formatting consistency.
*Example:*
> Review: "Terrible service." -> Sentiment: Negative
> Review: "Great food." -> Sentiment: Positive
> Review: "The ambience was okay." -> Sentiment: Neutral
> Review: "I will definitely come back!" -> Sentiment:

### 3. Chain-of-Thought (CoT) Prompting
Encouraging the model to explain its reasoning step-by-step before arriving at the final answer. This is crucial for complex logic, math, or multi-step reasoning problems.
*Example:* "Solve this math problem. Think step-by-step before providing the final answer."

## When to use it
- Single-turn tasks (e.g., translation, summarization, classification).
- Brainstorming and ideation.
- Basic text transformations (e.g., changing tone, formatting data).
- Extracting structured data from unstructured text.

## When NOT to use it
- **When tasks require multiple autonomous steps:** If a task requires the model to plan, execute, evaluate, and retry, you need an Agentic system, not just a single prompt.
- **When external data is required:** If the model needs real-time information, you should use Retrieval-Augmented Generation (RAG) or tool-calling.

## Examples

### Before vs. After
**Poor Prompt (Too vague):**
> "Write a summary about climate change."

**Better Prompt (Specific, constrained, formatted):**
> "You are an expert environmental scientist. Summarize the main impacts of climate change on coastal cities.
> 
> Guidelines:
> - Keep it under 150 words.
> - Focus specifically on economic and infrastructural impacts.
> - Format the response as a bulleted list."

## Common Failure Modes
- **Vagueness:** Asking for "good code" instead of "code that passes these specific linting rules."
- **Information Overload:** Providing too much irrelevant context, which can cause the model to lose focus (the "lost in the middle" phenomenon).
- **Contradictory Instructions:** Telling the model to be extremely concise but also asking it to explain every detail.
- **Assuming Implicit Knowledge:** Expecting the model to know specific internal company jargon without defining it in the context.

## How to Evaluate Prompt Effectiveness
- **Constraint Satisfaction:** Does the output match the specified constraints (e.g., length, format, tone)?
- **Robustness:** Does the prompt work consistently across different inputs of the same type?
- **Accuracy (Hallucination Rate):** Does the prompt generate factually incorrect information? (Often mitigated by providing better context).

## Related Examples
- [Structured SEO Article Outliner](/prompt-to-system/examples/structured-seo-outliner)
