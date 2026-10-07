# Advanced Content Enrichment Plan

**Status:** Proposed implementation roadmap  
**Prepared:** 7 October 2026  
**Primary audience:** Senior AI engineers, AI platform engineers, agent engineers, technical leads, and architects  
**Relationship to the earlier plan:** This plan first closes the unfinished commitments in `CONTENT-ENRICHMENT-PLAN.md`, then adds a production-oriented advanced curriculum.

## 1. Executive summary

The website now has a substantially better visual foundation: Tailwind design tokens, reusable components, a redesigned home page, ordered lesson metadata, breadcrumbs, filters, grouped domains, and an expanded glossary. The Astro build succeeds and content validation passes.

However, the original content-enrichment plan is not complete. The implementation is strongest in layout and scaffolding and weakest where the plan required original, evidence-backed teaching material. Twenty generic examples are marked as reviewed, every domain uses the same outcomes and example, evidence projects contain the placeholder `project-1`, most new glossary entries are tautological, and the advanced quality gates were not implemented.

Advanced content must not be added on top of these placeholders. The implementation should use two gates:

1. **Credibility gate:** repair the existing examples, domains, glossary, sources, taxonomy, and verification claims.
2. **Senior curriculum gate:** add architecture, labs, benchmarks, traces, threat models, operational runbooks, and evaluated case studies for production AI systems.

The desired product is not a larger collection of definitions. It is a field guide that shows senior engineers how to make design decisions, measure trade-offs, recover from failures, and operate AI systems under real constraints.

## 2. Review of the previous implementation

### Implemented well

- Tailwind CSS 4 is formalized through semantic design tokens and reusable Astro components.
- The site layout now supports wide index pages and readable lesson pages.
- The home page communicates the five-layer model and provides clear calls to action.
- Lesson metadata includes ordering, stages, duration, outcomes, prerequisites, relationships, glossary references, status, and sources.
- Lesson pages provide breadcrumbs, metadata, outcomes, related examples, glossary terms, and previous/next navigation.
- Domain and glossary indexes have much stronger visual hierarchy.
- Example filters use shareable URL parameters.
- `AGENTS.md` references an interaction-design policy.
- Missing provenance headings in the four named examples were repaired.
- The production build succeeds and emits the expected static pages.

### Partially implemented

- **Learn journey:** the five stages are visible, but stages do not show their required aggregate outcomes, prerequisites, total effort, representative example, status, or explicit stage action. Cross-cutting coverage is effectively limited to evaluation.
- **Lesson normalization:** headings are consistent, but authoritative sources are vague strings, sources are not rendered, provenance/further reading sections are missing, and `context-basics` has no related example.
- **Interaction-design policy:** the file exists but its page checklists are abbreviated and do not fully encode the acceptance criteria from the earlier plan.
- **Glossary:** alphabetical navigation exists, but only 25 entries were created, most entries are placeholders, relationships are rarely populated, duplicate concepts remain, and entry bodies are not rendered.
- **Discovery:** examples can be filtered, but domains cannot. Search excludes domains and glossary entries and uses unranked substring matching.
- **Baseline quality:** content validation and builds exist, but the claimed quality baseline does not include completed Lighthouse, accessibility, keyboard, screen-reader, journey, orphan-page, or stale-content checks.

### Not implemented to the required content standard

- **Evidence-backed domain curricula:** all 11 domains share `Accelerated workflow`, `Enhanced quality`, `example-1`, the same two lessons, generic technology tags, and `project-1`. Domain bodies remain short generic overviews rather than mini-curricula.
- **Practical example library:** `example-1` through `example-20` are generic shells such as “Analyze input_data according to ... best practices,” yet are published as reviewed material.
- **Domain taxonomy:** Python and TypeScript remain top-level domains; writing and content-writing remain duplicated; technical education and NLP/language systems are missing; sales and marketing are promoted ahead of the evidence-backed priorities.
- **Phase 5 verification:** there is no implemented accessibility automation, performance budget, journey test, orphan/stale relationship report, or enforced Lighthouse target. The link checker warns but cannot fail because it never changes its error state.
- **Evidence integrity:** home-page effort values are hardcoded and conflict with lesson durations, while “tested in production” is not supported by linked case-study evidence.

### Additional verification issue

`npm test` is not hermetic because `markdownlint-cli` is invoked through `npx` but is not declared in `package.json` or `package-lock.json`. In a restricted or offline environment, the test stalls while attempting to obtain the package. Add it as a pinned development dependency and invoke the local binary through the npm script.

## 3. Remediation gate before advanced publication

Do not label the earlier plan complete until the following work is finished.

### 3.1 Replace or unpublish placeholder examples

- Replace `example-1` through `example-20` with named, task-specific artifacts.
- Until rewritten, set them to `draft` and exclude drafts from the public build.
- A reviewed example must contain a realistic input, full prompt or procedure, representative output, measurable rubric, failure cases, safety notes, cost/latency notes where relevant, and verifiable provenance.
- Add a content-quality rule that rejects summaries beginning with “A practical example for” and generic procedures containing only `input_data`.

### 3.2 Rewrite the domain collection

- Replace `project-1` with selected first-party repositories and stable URLs.
- Give each domain unique outcomes, technologies, examples, lessons, risks, and a practice task.
- Publish at least six evidence-backed domains before treating the collection as complete: applied AI and agents; ML/NLP; software engineering; data and Python; technical education; mathematics and mathematical AI.
- Require at least three relevant linked assets and one original end-to-end workflow for every core domain.
- Reclassify sales and marketing as growing collections until they meet the same evidence standard.

### 3.3 Correct the taxonomy

- Move Python and TypeScript from domain pages to technology tags.
- Merge writing and content-writing into research, writing, and communication.
- Add technical education and NLP/language systems as first-class domains.
- Keep domain, technology, task, artifact type, and difficulty as separate facets.

### 3.4 Finish the glossary

- Consolidate `few-shot` with `few-shot-prompting` and `zero-shot` with `zero-shot-prompting`.
- Replace “Definition for ...” entries with substantive definitions.
- Reach at least 30 reviewed terms before the phase is considered complete.
- Render the entry body, related terms, aliases, examples, and “used in” lesson links.
- Validate that every key term referenced by a reviewed lesson resolves to a substantive entry.

### 3.5 Finish lesson provenance

- Add a rendered “Provenance and further reading” section to every lesson.
- Store source title, author or organization, URL, publication date, and access or verification date.
- Ensure every lesson links to at least one relevant example and a clear next step.
- Clearly distinguish model-independent principles from vendor-specific implementation notes.

### 3.6 Make quality claims enforceable

- Make broken internal links fail the build.
- Add orphan-page, stale-review-date, empty-relationship, duplicate-concept, and placeholder-text checks.
- Add automated accessibility and Lighthouse checks against the production build.
- Record manual keyboard and screen-reader smoke tests.
- Derive learning-path effort from metadata or explicitly label additional lab/practice time.
- Replace “tested in production” with specific linked evidence or narrower language.

**Remediation exit criteria:** no placeholder content is publicly marked reviewed; all core domains meet their editorial contract; at least 30 substantive glossary terms are cross-linked; all lessons render traceable sources; tests run without network installation; and the original Phase 5 quality gates have recorded results.

## 4. Senior audience definition

The advanced path assumes readers can already:

- call an LLM API and handle structured output;
- build a basic RAG pipeline;
- implement tool/function calling;
- read Python or TypeScript;
- use tests, version control, logs, and CI;
- reason about distributed-system basics such as retries, queues, timeouts, and idempotency.

The advanced path should teach readers to:

- choose between a deterministic workflow and an autonomous agent;
- design explicit state, failure boundaries, permissions, and recovery paths;
- evaluate both final outcomes and multi-step trajectories;
- isolate retrieval, reasoning, tool, and orchestration failures;
- operate agents with measurable reliability, security, latency, and cost objectives;
- justify multi-agent or protocol complexity with evidence;
- produce architecture decisions, threat models, runbooks, and evaluation reports suitable for review by other senior engineers.

## 5. Advanced curriculum architecture

Retain the five-layer beginner-to-intermediate path. Add an **Advanced Systems** path alongside it rather than stretching the existing five stages until they become unclear.

The advanced path should contain eight tracks. Each track ends in a practical artifact that can be reviewed independently.

### Track 1 — Architecture and orchestration

#### Lesson: Workflows, agents, and the autonomy boundary

- Decide when a single call, deterministic workflow, router, evaluator-optimizer loop, or autonomous agent is appropriate.
- Compare predictability, recoverability, latency, cost, and blast radius.
- Identify where model judgment is useful and where normal code should retain control.
- **Artifact:** architecture decision record selecting an approach for three contrasting use cases.

#### Lesson: Orchestration patterns and failure boundaries

- Prompt chaining, routing, parallel fan-out/fan-in, planner-executor, evaluator-optimizer, and human approval gates.
- Typed intermediate artifacts and contract validation between steps.
- Partial failure, compensation, and error propagation.
- **Lab:** implement one task as a monolithic prompt and as a staged workflow, then compare quality, latency, cost, and diagnosability.

#### Lesson: Durable, long-running agent execution

- Explicit state machines, checkpoints, resumability, leases, heartbeats, cancellation, and human pause/resume.
- Idempotent tools, deduplication keys, retry classes, and compensation for side effects.
- Context reconstruction after process restarts.
- **Artifact:** state-transition diagram, recovery matrix, and failure-injection test report.

#### Lesson: Multi-agent systems without cargo culting

- When parallel exploration or specialist separation improves results.
- Supervisor, peer-to-peer, blackboard, and map-reduce patterns.
- Coordination cost, shared-state hazards, conflicting conclusions, and termination.
- **Lab:** compare a single-agent research system with a small parallel research team using the same evaluation set and budget.

### Track 2 — Context, retrieval, and memory

#### Lesson: Context engineering as resource allocation

- Treat tokens as a finite attention and cost budget.
- Just-in-time context loading, compaction, structured notes, salience, and context eviction.
- Instruction, state, retrieved evidence, tool output, and conversation history as distinct context classes.
- **Artifact:** context budget with inclusion, compression, and eviction policy.

#### Lesson: Production RAG architecture

- Ingestion, document identity, chunk boundaries, metadata, hybrid retrieval, query rewriting, reranking, and access control.
- Freshness, deletion, versioning, citations, and tenant isolation.
- Separate retrieval quality from generation quality.
- **Lab:** build a small hybrid retrieval benchmark with ablations for chunking, top-k, reranking, and metadata filters.

#### Lesson: Evaluating RAG systems

- Retrieval recall and precision, context relevance, answer faithfulness, citation correctness, abstention, and answer utility.
- Reference-based versus reference-free measures and their failure modes.
- Build adversarial and temporal evaluation cases.
- **Artifact:** versioned evaluation dataset, baseline report, failure taxonomy, and improvement decision.

#### Lesson: Agent memory design

- Working, episodic, semantic, and procedural memory.
- Memory write policy, retrieval policy, consolidation, expiry, provenance, consent, and deletion.
- Distinguish memory from context and user profile data.
- **Lab:** implement a memory policy and demonstrate both a useful recall and a prevented unsafe recall.

### Track 3 — Tools and interoperability protocols

#### Lesson: Tool contracts for model callers

- Tool granularity, names, descriptions, schemas, examples, preconditions, postconditions, and error semantics.
- Make invalid states unrepresentable where practical.
- Return structured, bounded, provenance-aware results.
- **Lab:** redesign a poorly performing tool suite and measure call selection, argument validity, and recovery rate.

#### Lesson: Production MCP engineering

- MCP prompts, resources, and tools and their different control boundaries.
- Capability discovery, versioning, authentication, authorization, stateless operation, long-running tasks, and audit logging.
- Treat every remote MCP server and tool result as a supply-chain and prompt-injection boundary.
- **Artifact:** an MCP server contract, threat model, conformance tests, and example client trace.

#### Lesson: Agent-to-agent interoperability

- Agent discovery, capabilities, task lifecycle, messages, artifacts, and opaque-agent boundaries.
- MCP for tools/data versus A2A for agent collaboration.
- Identity, authorization, trace propagation, cancellation, and failure handling across organizations.
- **Lab:** connect two minimal agents through an explicit task contract and test timeout, rejection, and partial-result cases.

#### Lesson: Sandboxed code and computer-use tools

- Ephemeral environments, filesystem and network policy, secret injection, artifact extraction, time and resource limits.
- Observation-action loops and the difference between interface success and task success.
- Approval gates for irreversible or externally visible actions.
- **Artifact:** sandbox policy, permissions manifest, and escape/exfiltration test suite.

### Track 4 — Evaluation-driven engineering

#### Lesson: Build an evaluation system before optimizing

- Turn product requirements into tasks, datasets, graders, and release thresholds.
- Stratify by common cases, edge cases, adversarial cases, and known production failures.
- Dataset versioning, leakage prevention, reproducibility, and confidence intervals.
- **Artifact:** evaluation specification and 50-case starter dataset for a real workflow.

#### Lesson: Agent outcome and trajectory evaluation

- Evaluate final state, intermediate decisions, tool selection, tool arguments, recovery behavior, and efficiency.
- Trace grading, invariant checks, and step-level counterfactual analysis.
- Detect agents that reach the right answer through unsafe or brittle paths.
- **Lab:** grade traces from successful, inefficient, and unsafe executions that share the same final answer.

#### Lesson: Calibrating LLM judges

- Rubric construction, pointwise versus pairwise grading, position and verbosity bias, reference answers, and multi-judge disagreement.
- Calibrate against blinded human labels and report agreement.
- Prevent the evaluator from seeing irrelevant or leaked information.
- **Artifact:** judge card documenting prompt, model, dataset, agreement, known biases, and allowed uses.

#### Lesson: Continuous evaluation and production feedback

- Offline gates, shadow testing, canaries, sampled production grading, drift detection, and incident-driven dataset growth.
- Connect evaluation changes to prompt, model, retrieval, tool, and policy versions.
- **Artifact:** release policy showing block, warn, monitor, rollback, and escalation conditions.

### Track 5 — Reliability and operations

#### Lesson: Failure taxonomy and recovery design

- Model refusal, malformed output, hallucination, context failure, retrieval miss, tool timeout, tool side effect, orchestration deadlock, and budget exhaustion.
- Retry only transient failures; use bounded exponential backoff and jitter.
- Avoid retry storms and non-idempotent duplicate actions.
- **Lab:** inject failures at every workflow boundary and measure successful recovery and safe escalation.

#### Lesson: Budgets, stop rules, and escalation

- Token, time, tool-call, financial, and risk budgets.
- Progress signals, convergence checks, repeated-action detection, and circuit breakers.
- Human escalation packets that contain state, evidence, attempted actions, and the decision required.
- **Artifact:** loop policy plus tests for success, exhaustion, repetition, cancellation, and human escalation.

#### Lesson: Model routing and graceful degradation

- Route by task complexity, risk, modality, latency, context requirement, and budget.
- Fallback providers, structured-output compatibility, capability probes, and semantic differences.
- Avoid silent quality degradation.
- **Lab:** design and evaluate a router with a quality-cost frontier and explicit fallback behavior.

#### Lesson: SLOs and incident response for AI systems

- Define service, quality, safety, and cost indicators.
- Error budgets for non-deterministic workflows.
- Incident detection, trace capture, containment, rollback, communication, and postmortems.
- **Artifact:** SLO document, dashboard specification, runbook, and blameless incident report.

### Track 6 — Security, privacy, and governance

#### Lesson: Threat modelling agentic systems

- Map trust boundaries among user input, retrieved content, model output, tools, MCP servers, agents, sandboxes, and humans.
- Prompt injection, indirect injection, confused deputy, privilege escalation, data exfiltration, memory poisoning, and denial of wallet.
- **Artifact:** data-flow diagram, abuse cases, mitigations, residual risks, and verification plan.

#### Lesson: Capability security and human control

- Least privilege, scoped credentials, capability tokens, just-in-time access, allowlists, approval gates, and reversible operations.
- Separate planning authority from action authority.
- Log who or what authorized every consequential action.
- **Lab:** redesign an overprivileged agent and prove that blocked actions fail safely.

#### Lesson: Tool and agent supply-chain security

- Dependency and server provenance, signed releases, schema drift, malicious tool descriptions, compromised updates, and transitive trust.
- Enterprise allowlisting and isolation for external MCP/A2A services.
- **Artifact:** supplier review checklist, trust policy, and emergency revocation procedure.

#### Lesson: Operational AI governance

- Use NIST AI RMF functions—govern, map, measure, and manage—as an operational workflow.
- Map relevant OWASP GenAI risks to tests and controls.
- Model cards, system cards, evaluation evidence, exception management, and audit trails.
- **Artifact:** risk register and release evidence pack for one capstone system.

### Track 7 — Observability, performance, and economics

#### Lesson: Trace-first observability

- Trace requests across model calls, retrieval, tools, agents, queues, and human checkpoints.
- Record model, prompt, policy, dataset, tool, and code versions.
- Use GenAI semantic conventions where stable and document project extensions.
- Redact secrets and sensitive content before export.
- **Lab:** diagnose an intermittent agent failure from traces without reproducing it locally.

#### Lesson: Latency and throughput engineering

- Time-to-first-token, end-to-end latency, critical path, parallelism, streaming, batching, queueing, rate limits, and backpressure.
- Distinguish model latency from orchestration and tool latency.
- **Artifact:** latency budget and load-test report with p50, p95, and p99 results.

#### Lesson: Cost engineering

- Token accounting, prompt caching, context reuse, model routing, batch processing, retry amplification, and tool/infrastructure cost.
- Optimize cost per successful task rather than cost per model call.
- **Lab:** reduce cost per successful evaluation case while preserving the release threshold.

### Track 8 — Model adaptation and technical leadership

#### Lesson: Prompt, retrieval, tools, fine-tuning, or a better model?

- Diagnose whether the bottleneck is knowledge, behavior, reasoning, latency, format reliability, or domain language.
- Compare intervention cost, reversibility, data requirement, operational burden, and evaluation evidence.
- **Artifact:** decision memo with rejected alternatives and rollback plan.

#### Lesson: Synthetic data and data quality

- Generate, filter, diversify, and audit synthetic evaluation or training data.
- Avoid self-confirming evaluators, contamination, mode collapse, and hidden duplication.
- **Lab:** create a synthetic edge-case set, then measure how human review changes its value.

#### Lesson: Architecture reviews for AI systems

- Review task definition, data, model, context, tools, orchestration, evaluation, security, operations, and economics together.
- Identify assumptions that must be tested before scale.
- **Artifact:** reusable senior-level architecture review template and a completed review of a capstone.

## 6. Required case studies and capstones

Every case study must publish the design, trace samples, evaluation method, failures, costs, and changes made after evidence—not only the final architecture.

### Capstone A — Evidence-grounded research assistant

- Hybrid retrieval, reranking, citations, abstention, temporal freshness, and source authority.
- Evaluation across retrieval, faithfulness, citation correctness, and usefulness.
- Prompt-injection tests against retrieved documents.

### Capstone B — Long-running coding agent harness

- Sandboxed code execution, repository permissions, checkpointing, tests as feedback, patch review, budget limits, and escalation.
- Failure injection for timeouts, repeated patches, flaky tests, and unsafe commands.

### Capstone C — Multi-agent research system

- Parallel exploration, shared research plan, evidence deduplication, contradiction handling, synthesis, and termination.
- Direct comparison against a single-agent baseline at equal and unequal budgets.

### Capstone D — Enterprise MCP gateway

- Server registry, identity, scoped authorization, policy enforcement, audit, rate limits, schema/version management, and revocation.
- Include a malicious or compromised-server scenario.

### Capstone E — Evaluation and observability platform

- Versioned datasets, deterministic and model graders, trace collection, dashboards, release gates, sampling, and drift detection.
- Demonstrate a regression caught before deployment and one production failure added back to the dataset.

## 7. Advanced editorial contract

Every advanced lesson must include:

1. A concrete production problem and explicit non-goals.
2. Prerequisites and assumed system scale.
3. A system diagram with trust and failure boundaries.
4. At least two viable designs and their trade-offs.
5. An implementation blueprint or complete pseudocode.
6. A worked example using realistic data.
7. Failure injection or adversarial cases.
8. Evaluation criteria and measurable release thresholds.
9. Security and privacy considerations.
10. Observability requirements.
11. Latency and cost considerations.
12. An operational or review artifact: ADR, threat model, runbook, trace, dataset, rubric, or benchmark.
13. Authoritative sources with URLs and verification dates.
14. A “what would change this decision?” section.
15. A hands-on exercise plus expected evidence of completion.

Recommended size is 1,200–2,500 words per advanced lesson, excluding code and references. Depth and evidence matter more than word count.

## 8. Content types and metadata

Add explicit content types beyond lesson and prompt:

- architecture decision record;
- implementation lab;
- benchmark report;
- evaluation dataset specification;
- threat model;
- incident postmortem;
- operational runbook;
- case study;
- protocol blueprint.

Add advanced metadata:

- `track`
- `competencies`
- `prerequisites`
- `estimated_lab_minutes`
- `required_artifacts`
- `system_scale`
- `risk_level`
- `vendor_scope` (`model-agnostic`, `comparative`, or a named provider)
- `verified_with`
- `source_urls`
- `last_verified`
- `reviewers`
- `review_status`

Do not publish advanced entries as reviewed until at least one technical reviewer has checked the architecture, one reviewer has run or inspected the exercise evidence, and every external claim is traceable.

## 9. Site structure for the advanced path

- Add an “Advanced Systems” entry point to Learn without replacing the five-layer foundation.
- Provide role-based starting points: agent engineer, AI platform engineer, ML engineer moving into systems, security engineer, and technical lead.
- Show prerequisites, total lesson and lab effort, and required artifacts for every track.
- Provide concept, lab, case-study, and reference filters.
- Add a “production readiness” checklist linking evaluation, security, reliability, observability, and economics.
- Add protocol/version badges only where content is tied to a specific revision; display the verification date prominently.
- Use expandable detail sparingly. Advanced content must remain linkable, searchable, printable, and accessible without client-side state.

## 10. Implementation phases

### Phase A — Repair credibility

- Complete every item in the remediation gate.
- Publish an implementation audit showing evidence for each original exit criterion.
- Remove or hide content that is still a placeholder.

**Exit criteria:** the original enrichment plan is genuinely complete and no reviewed page contains placeholder or unsupported content.

### Phase B — Advanced foundation

- Add the Advanced Systems path, metadata, content types, and editorial templates.
- Publish four cornerstone lessons: autonomy boundary; context as resource allocation; evaluation-system design; threat modelling agentic systems.
- Publish one complete architecture review template.

**Exit criteria:** the advanced path is navigable, every entry exposes prerequisites and artifacts, and the four cornerstone lessons meet the advanced editorial contract.

### Phase C — Evaluation, retrieval, and tools

- Publish the remaining Track 2, Track 3, and Track 4 lessons.
- Deliver Capstone A and a production MCP lab.
- Add versioned evaluation datasets and downloadable trace examples.

**Exit criteria:** readers can build and evaluate a RAG system, a tool suite, and an MCP integration with reproducible evidence.

### Phase D — Reliability, security, and operations

- Publish Track 5, Track 6, and Track 7.
- Deliver Capstones B, D, and E.
- Add failure-injection exercises and operational runbooks.

**Exit criteria:** every operational claim is backed by a test, trace, metric, threat control, or runbook.

### Phase E — Multi-agent and leadership material

- Publish the multi-agent lessons, model-adaptation decisions, and architecture-review material.
- Deliver Capstone C with single-agent baselines.
- Invite external technical review for the protocol, security, and evaluation tracks.

**Exit criteria:** multi-agent recommendations demonstrate measured benefit, and all senior-level content has named review status and current sources.

### Phase F — Continuous maintenance

- Review time-sensitive pages at least every 90 days.
- Track protocol and provider changes separately from model-independent principles.
- Add production failures to datasets and case studies.
- Retire pages that cannot be maintained rather than leaving stale recommendations marked reviewed.

## 11. Prioritised first release

If only twelve advanced lessons can be produced initially, publish them in this order:

1. Workflows, agents, and the autonomy boundary.
2. Context engineering as resource allocation.
3. Production RAG architecture.
4. Evaluating RAG systems.
5. Tool contracts for model callers.
6. Production MCP engineering.
7. Build an evaluation system before optimizing.
8. Agent outcome and trajectory evaluation.
9. Failure taxonomy and recovery design.
10. Threat modelling agentic systems.
11. Trace-first observability.
12. Cost engineering.

This sequence gives senior readers a complete architecture–implementation–evaluation–operation loop before introducing more specialised multi-agent or fine-tuning material.

## 12. Success criteria

- No public reviewed content contains placeholder wording or fabricated project evidence.
- At least six evidence-backed domain curricula link to real first-party work.
- At least 30 substantive glossary entries are cross-linked and rendered fully.
- Every advanced lesson produces a reviewable engineering artifact.
- Every capstone includes evaluation data, representative traces, failure analysis, security boundaries, and a cost/latency report.
- Evaluation lessons distinguish outcome quality from trajectory quality.
- RAG lessons measure retrieval and generation independently.
- Agent lessons include budgets, stop rules, cancellation, recovery, and human escalation.
- Protocol-specific content displays protocol revision and verification date.
- Security coverage maps threats to concrete tests and controls.
- Observability uses end-to-end traces that join model, retrieval, tool, queue, and human steps.
- Technical claims link to primary sources or peer-reviewed research.
- The site can demonstrate, with CI artifacts, that reviewed content has no broken internal relationships and that representative pages meet accessibility and performance targets.

## 13. Primary references for implementation

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [OpenAI API: Agents](https://developers.openai.com/api/docs/guides/agents)
- [OpenAI API: Working with evals](https://developers.openai.com/api/docs/guides/evals)
- [OpenAI API: Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)
- [Model Context Protocol: server primitives](https://modelcontextprotocol.io/specification/draft/server/index)
- [Model Context Protocol: 2026-07-28 specification release](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- [A2A Protocol specification](https://a2a-protocol.org/latest/)
- [OpenTelemetry Generative AI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI 600-1: Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1)
- [OWASP GenAI Security Project](https://genai.owasp.org/)
- [RAGAS: Automated Evaluation of Retrieval-Augmented Generation](https://arxiv.org/abs/2309.15217)

