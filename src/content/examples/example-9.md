---
id: example-9
title: RAG Retrieval Ablation Benchmark
summary: A benchmark comparing chunk sizes, hybrid retrieval, metadata filtering, top-k, and reranking to optimize RAG performance.
kind: benchmark
level: advanced
domains:
  - machine-learning
tags:
  - rag
  - evaluation
  - retrieval
status: reviewed
language: en
last_verified: 2026-10-08
evidence_produced: Small versioned dataset, experiment matrix, metrics table, and decision record.
estimated_time_minutes: 90
---

## Purpose

To systematically evaluate the impact of different retrieval strategies in a Retrieval-Augmented Generation (RAG) system, finding the optimal balance between accuracy, cost, and latency.

## Prerequisites

- Understanding of vector embeddings and cosine similarity.
- Familiarity with hybrid search (BM25 + Dense).
- Experience with LLM evaluation metrics.

## Scenario

A RAG system answering technical queries is suffering from poor recall. We need to evaluate whether changing chunk sizes, enabling hybrid search, adding metadata filters, or introducing a cross-encoder reranker improves performance enough to justify the increased latency and cost.

## Input

A versioned dataset of 100 question-answer pairs with annotated ground-truth document IDs.

## Artifact: Experiment Matrix

We run an ablation study testing:
- **Chunk sizes**: 256 vs. 512 tokens.
- **Retrieval**: Dense-only vs. Hybrid (Dense + BM25).
- **Reranking**: None vs. Cross-Encoder (top-k=50 -> 5).
- **Metadata**: Unfiltered vs. Filtered by category.

## Output

A metrics table documenting Retrieval Recall@5, Precision@5, generation Faithfulness, Citation Correctness, Latency (p95), and Cost per query for each configuration.

## Evaluation Rubric

- **Retrieval Recall**: Percentage of queries where the ground-truth document is in the final top-k context.
- **Citation Correctness**: Does the LLM cite the correct retrieved chunk?
- **Latency**: End-to-end response time must remain under 2000ms (p95).
- **Cost**: Total embedding + retrieval + generation token cost per query.

## Failure Cases and Recovery

- **Reranker Timeout**: Fallback to raw retrieval scores if the reranker API times out.
- **Empty Retrieval**: Ensure the generation step gracefully handles empty context windows.

## Security and Privacy

- The benchmark dataset must not contain PII or production secrets.
- Metadata filtering ensures tenant isolation in multi-tenant RAG architectures.

## Latency and Cost

- Reranking significantly increases latency (+200-500ms) but improves recall. The decision record must justify this trade-off.

## Provenance

Author: Vu Hung. Based on optimization iterations for technical documentation RAG systems.

## Next Lesson

- Evaluating RAG Systems.
