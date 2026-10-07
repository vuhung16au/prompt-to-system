---
id: token-limit
title: "Token Limit"
summary: "The maximum number of tokens a model can process in a single request, including both input (prompt) and output (completion)."
aliases: ["context window limit", "maximum tokens"]
---
Every LLM has a hard token limit (e.g., 8k, 32k, 128k tokens). Exceeding this limit causes the API request to fail. Developers must carefully track token usage, particularly in workflows that ingest large documents or maintain long conversation histories.
