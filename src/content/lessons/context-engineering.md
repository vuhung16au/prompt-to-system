---
id: context-engineering
title: Context Engineering
summary: Mastering the art of providing the right information at the right time to maximize LLM performance.
level: intermediate
last_verified: 2026-10-05
---

## Key Takeaway
An AI model is only as smart as the context you provide. Structuring, filtering, and injecting the right information at the right time is often more impactful than tweaking the prompt instructions themselves.

## The Core Concept
Context engineering is the systematic practice of assembling the optimal set of background information, constraints, and data for an LLM to process a request successfully. It answers the critical question: **What exactly does the model need to know and see right now?**

While Prompt Engineering focuses on *how* to ask (the instructions), Context Engineering focuses on *what* to provide (the data). 

## Core Techniques

### 1. Retrieval-Augmented Generation (RAG)
The most common form of context engineering. Instead of relying on the model's internal memory, you search an external database for relevant documents and inject them into the prompt.
- **Example:** Searching a vector database for internal HR policies before asking the model to answer an employee's question about vacation days.

### 2. Context Window Management
Assembling context isn't just about adding data; it's about managing limits.
- **Truncation:** Cutting off old chat history to fit new information.
- **Summarization:** Condensing previous interactions or large documents before feeding them into the current prompt.
- **Prioritization:** Placing the most critical instructions at the very beginning or very end of the prompt (leveraging the "Lost in the Middle" phenomenon).

### 3. Dynamic Context Injection
Automatically injecting relevant system state or user variables into the prompt at runtime.
- **Example:** Injecting the current date and time, the user's OS, or active workspace paths into the system prompt.

### 4. Few-Shot Examples (In-Context Learning)
Providing examples of inputs and desired outputs within the prompt to set a pattern for the model to follow.
- **Example:** Providing 3 examples of extracting JSON from raw text before asking the model to process the 4th text.

## When to use it
- **Enterprise Applications:** When the model needs to answer questions based on proprietary, private, or real-time data.
- **Complex Workflows:** Providing few-shot examples to enforce strict output formats (e.g., JSON schemas or specific code syntax).
- **Agentic Systems:** Injecting the current environment state, available tools, and previous tool outputs so the agent knows what to do next.

## When NOT to use it
- **General Knowledge Tasks:** When standard, generalized knowledge is sufficient. Over-stuffing context here wastes tokens and increases latency.
- **Creative Writing:** When you want the model to generate novel ideas, overly constrained context might limit its creativity.

## Practical Examples

### Basic RAG Injection
```text
You are an expert financial analyst. Answer the user's question using ONLY the provided Q3 Earnings Report. If the answer is not in the report, say "I don't know."

<q3_earnings_report>
Revenue: $2.4B (up 12% YoY)
Operating Margin: 18%
Headcount: 4,500
</q3_earnings_report>

Question: What was the revenue growth year-over-year?
```

### Dynamic State Injection (Agentic Context)
```text
<system_state>
Current User: vuhung
Current Directory: /src/components/
Local Time: 2026-10-05T14:30:00Z
</system_state>

User Request: "Create a new React button component here."
```

## Common Failure Modes
- **Context Bloat / Overflow:** Stuffing too much information into the prompt, leading to increased costs, slower response times, and token limit errors.
- **Lost in the Middle:** Models tend to remember information at the beginning and end of a long context window, but forget or ignore information in the middle.
- **Distraction / Dilution:** Including irrelevant documents that confuse the model or cause it to hallucinate connections that don't exist.

## How to Evaluate
- **Groundedness:** Does the model stick strictly to the provided facts without hallucinating external information?
- **Retrieval Metrics:** (For RAG) Are you fetching the *correct* context to begin with? Measure Recall and Precision of your retrieval step.
- **Instruction Adherence:** Can the model still follow its core instructions despite a massive payload of context?

## Related Examples
- [Data Analysis Summary Pattern](/prompt-to-system/examples/data-analysis-summary)
