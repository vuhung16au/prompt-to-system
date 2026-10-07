---
id: rag
title: "Retrieval-Augmented Generation (RAG)"
summary: "A technique that grounds a model's responses in external knowledge retrieved from a database or search engine."
aliases: ["RAG"]
---
RAG combines an information retrieval system with a language model. Before generating a response, the system queries a database (often a vector database) for relevant documents, then injects those documents into the model's prompt. This reduces hallucinations and allows the model to answer questions about proprietary or recent data.
