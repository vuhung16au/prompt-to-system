# Content Completion and Expansion Plan

**Status:** Proposed implementation plan  
**Prepared:** 8 October 2026  
**Audience:** Vu Hung, Antigravity, content editors, and technical reviewers  
**Scope:** Editorial correctness, learning content, diagrams, navigation, links, examples, domains, About, FAQ, and licensing  
**Source plan audited:** `docs/ADVANCED-CONTENT-ENRICHMENT-PLAN.md`

## 1. Executive verdict

The advanced-content implementation is substantial, but the source plan is **not yet complete to its own editorial standard**.

The site now contains an Advanced Systems path, 31 track-labelled advanced entries, five capstone artifacts across the lesson and example collections, 30 glossary entries, 10 domains, and seven reviewed examples. The production build succeeds. Those are meaningful improvements.

The remaining gaps are material:

1. Three planned architecture/orchestration lessons are absent.
2. Most advanced lessons do not satisfy the 15-part advanced editorial contract.
3. Advanced metadata and review evidence are incomplete or use placeholder reviewer identities.
4. Twenty-seven of the 31 advanced entries are below the plan's recommended 1,200-word lower bound; several are under 600 words.
5. The Learn page does not present the eight advanced tracks, their prerequisites, effort, and artifacts as a coherent journey.
6. All 38 Mermaid blocks are displayed as code rather than rendered diagrams.
7. GitHub Pages base-path errors create broken glossary and artifact links.
8. Only seven reviewed examples are public, not the requested twelve.
9. Only one domain is classified as Applied practice.
10. About and FAQ pages do not exist, and the current license does not express the requested Creative Commons terms for educational content.
11. Accessibility and Lighthouse scripts still print success messages without running tests.

The implementation should therefore be described as **content-complete in breadth, but not yet review-complete in depth, evidence, or publishing quality**.

## 2. Audit evidence

The following snapshot should be retained in the implementation pull request or completion report.

| Area | Current state | Assessment |
|---|---:|---|
| Lessons | 38 total | Good breadth |
| Advanced track-labelled entries | 31 | Broad coverage, but includes four capstones and one template |
| Planned Track 1 conceptual lessons missing | 3 | Release gap |
| Advanced entries at least 1,200 words | 4 of 31 | Major depth gap |
| Advanced entries with `competencies` | 14 of 31 | Incomplete |
| Advanced entries with `prerequisites` | 7 of 31 | Incomplete |
| Advanced entries with `estimated_lab_minutes` | 14 of 31 | Incomplete |
| Advanced entries with `required_artifacts` | 10 of 31 | Incomplete |
| Advanced entries with `verified_with` | 0 of 31 | Missing |
| Advanced entries with source URLs | 12 of 31 | Incomplete |
| Advanced entries with reviewers and review status | 12 of 31 | Incomplete and identities require verification |
| Public reviewed examples | 7 | Add 5 to reach 12 |
| Draft placeholder examples | 20 | Correctly hidden; do not republish without rewriting |
| Domains | 10 | Good breadth |
| Applied practice domains | 1 | Add 2 |
| Glossary entries | 30 | Target reached |
| Mermaid blocks | 38 | None rendered as diagrams |
| Internal base-path defect | Glossary plus 3 artifact links | Release blocker |
| Accessibility/Lighthouse automation | Echo-only scripts | Not implemented |

### 2.1 Missing curriculum items

The following lessons were specified in Track 1 but do not have corresponding lesson entries:

- **Orchestration Patterns and Failure Boundaries**
- **Durable, Long-Running Agent Execution**
- **Multi-Agent Systems Without Cargo Culting**

Capstone C does not replace the missing multi-agent conceptual lesson. A capstone demonstrates synthesis; it should not be the learner's first structured explanation of the design decision.

### 2.2 Editorial-contract coverage

All 31 advanced entries discuss failures and privacy, but the other required sections are inconsistent. Current heading coverage is:

| Required area | Entries containing it | Required target |
|---|---:|---:|
| Non-goals | 27 | 31 |
| System diagram | 26 | 31 |
| Competing designs and trade-offs | 19 | 31 |
| Implementation blueprint | 19 | 31 |
| Worked example | 23 | 31 |
| Evaluation criteria | 23 | 31 |
| Security | 27 | 31 |
| Observability | 24 | 31 |
| Latency | 19 | 31 |
| Cost | 26 | 31 |
| What would change this decision? | 19 | 31 |
| Exercise | 19 | 31 |
| Further reading | 15 | 31 |
| Sources | 19 | 31 |

Headings alone are not sufficient. Each section must contain scenario-specific analysis, not reusable boilerplate.

### 2.3 Review-integrity issue

Values such as `senior-ai-engineer-1`, `security-engineer-1`, and `principal-engineer-1` are not acceptable evidence of a completed human review unless they map to identifiable reviewers and real review records.

Until review actually occurs:

- identify the content as **AI-assisted draft reviewed by Vu Hung**, if that is accurate;
- do not imply that an independent senior, security, or principal engineer approved it;
- record a real reviewer name or stable public identity, review date, review scope, and evidence link when external review occurs;
- use `review_status: author-reviewed` or `review_status: awaiting-technical-review` rather than `approved` when appropriate.

## 3. Phase 0 — Correct the advanced curriculum before adding more breadth

### 3.1 Add the three missing lessons

Each missing lesson must follow the advanced editorial contract and produce an inspectable artifact.

#### Orchestration Patterns and Failure Boundaries

- Compare chaining, routing, fan-out/fan-in, planner-executor, evaluator-optimizer, and approval-gated workflows.
- Show typed boundaries, partial failure, compensation, cancellation, and error propagation.
- Include one monolithic-versus-staged comparison using the same dataset and budget.
- Artifact: architecture decision record and failure-boundary map.

#### Durable, Long-Running Agent Execution

- Cover state machines, checkpoints, leases, heartbeats, pause/resume, idempotency, deduplication, and compensation.
- Include restart, duplicate-delivery, stale-lease, cancellation, and partial-side-effect tests.
- Artifact: state-transition diagram, recovery matrix, and failure-injection report.

#### Multi-Agent Systems Without Cargo Culting

- Compare supervisor, peer, blackboard, and map-reduce patterns with a single-agent baseline.
- Cover coordination overhead, shared-state hazards, contradiction handling, budgets, and termination.
- Require evidence that multiple agents materially improve an agreed metric.
- Artifact: experiment report with equal-budget and unequal-budget comparisons.

### 3.2 Bring every advanced entry to the editorial contract

For each advanced lesson, template, and capstone:

1. State a concrete production problem and non-goals.
2. Declare prerequisites, system scale, risk level, and assumed operating context.
3. Render a system diagram with trust and failure boundaries.
4. Compare at least two viable designs.
5. Provide an implementation blueprint or complete pseudocode.
6. Use realistic inputs and outputs in a worked example.
7. Include failure injection or adversarial cases.
8. Define evaluation metrics and release thresholds.
9. Address security and privacy separately and specifically.
10. State logs, traces, metrics, and audit evidence required.
11. Quantify or bound latency and cost.
12. Produce a reviewable artifact.
13. Cite authoritative sources with stable URLs and verification dates.
14. Explain what evidence would change the recommendation.
15. Include a hands-on exercise and expected evidence of completion.

Use 1,200–2,500 words as a diagnostic range, not a padding target. A shorter entry may pass only when it fully satisfies the contract with unusually concise, substantive material.

### 3.3 Normalize metadata and track names

- Use one canonical value for each of the eight tracks; do not mix `Track 3` with `Track 3 — Tools and interoperability protocols`.
- Require the advanced fields in the content schema whenever `level: advanced` or `track` is present.
- Populate `competencies`, `prerequisites`, `estimated_lab_minutes`, `required_artifacts`, `system_scale`, `risk_level`, `vendor_scope`, `verified_with`, `source_urls`, `last_verified`, `reviewers`, and `review_status`.
- Define `verified_with` as concrete evidence, such as a runnable repository, dataset version, trace bundle, or documented manual reproduction—not a model name alone.
- Do not mark a page reviewed when required metadata or evidence is absent.

### 3.4 Rebuild the Advanced Systems journey

The Learn page should show:

- eight track cards in their intended sequence;
- purpose and outcomes for each track;
- prerequisites and assumed knowledge;
- lesson count and total reading/lab effort derived from metadata;
- required artifacts;
- one recommended starting lesson;
- track-level progress states such as Foundation, Build, Evaluate, Operate, and Lead;
- role-based routes for agent engineer, AI platform engineer, ML engineer, security engineer, and technical lead;
- filters for concept, lab, case study, template, and reference;
- a production-readiness checklist linking reliability, evaluation, security, observability, and economics.

Do not present all advanced lessons as one large undifferentiated “Cornerstone Lessons” grid.

## 4. Phase 1 — Render every Markdown diagram correctly

### 4.1 Current problem

There are 38 fenced Mermaid blocks. The generated site emits all 38 as `<pre data-language="mermaid">` syntax-highlighted code. No Mermaid SVGs are produced. The global copy-code behavior also treats these blocks as ordinary code.

### 4.2 Required approach

Prefer **build-time Mermaid-to-SVG rendering** for this static GitHub Pages site.

Build-time output should:

- produce self-contained SVG without a CDN or browser-time Mermaid dependency;
- work under the `/prompt-to-system/` base path;
- preserve readable text and sufficient contrast in light and dark presentation;
- wrap each diagram in a `<figure>` with a concise caption;
- expose an accessible name or adjacent textual description;
- support horizontal scrolling or responsive scaling on narrow screens;
- remain readable in print;
- retain a “View source” disclosure only when the Mermaid source has educational value;
- exclude rendered diagrams from the generic code-copy enhancement.

If client-side Mermaid is chosen instead, bundle it locally, initialize it deterministically after page load, prevent flashes of raw source, provide a no-JavaScript textual fallback, and test it under the GitHub Pages base path. Do not load Mermaid from an unpinned CDN.

### 4.3 Diagram content review

Rendering is not enough. Review every diagram for:

- valid Mermaid syntax;
- meaningful node names rather than implementation abbreviations;
- labelled trust boundaries and failure boundaries where the lesson requires them;
- a clear reading direction;
- agreement between diagram and prose;
- no meaning conveyed by colour alone;
- a short text explanation immediately before or after it.

### 4.4 Diagram acceptance criteria

- All 38 current Mermaid blocks render as diagrams in the production output.
- No raw Mermaid source is visible by default.
- A production-output test finds an SVG or approved rendered figure for every Mermaid source block.
- Representative complex diagrams are checked at 320 px, 768 px, and desktop widths.
- Keyboard, screen-reader, dark-theme, print, and no-JavaScript checks are recorded.

## 5. Phase 2 — Eliminate dead links and prevent recurrence

### 5.1 Confirmed internal failures

The site is deployed below `/prompt-to-system/`, but several generated links incorrectly start at the host root.

Confirmed affected areas:

- every glossary card links to `/glossary/<term>`;
- every glossary detail page links back to `/glossary`;
- related glossary, lesson, and example links on glossary detail pages use host-root paths;
- the evaluation lesson links to `/datasets/v1-eval-dataset.json`;
- two lesson links point to `/traces/example-trace-failure.json`.

This explains the reported `https://vuhung16au.github.io/glossary/chain-of-thought` 404. The correct deployed URL is below `https://vuhung16au.github.io/prompt-to-system/`.

### 5.2 Link policy

- Generate internal links through one base-aware URL helper or `import.meta.env.BASE_URL`.
- Do not hand-author host-root internal URLs in Astro templates.
- Define a base-aware convention for links authored in Markdown, including downloadable datasets and traces.
- Validate page fragments as well as page paths.
- Treat missing internal pages, assets, downloads, and anchors as build failures.
- Treat external-link checks as a scheduled report with retries, because remote sites can be transient; do not make every remote timeout a publishing blocker.

### 5.3 Replace source-only checks with production-output checks

The current Markdown checker cannot discover template-generated link defects. Add a post-build crawler that:

1. scans every generated HTML file;
2. resolves every internal `href`, `src`, canonical URL, and downloadable artifact against the configured site and base;
3. verifies the corresponding output file exists;
4. verifies fragments resolve to an element ID;
5. rejects unexpected host-root internal URLs;
6. reports the source page, broken destination, and link text;
7. fails CI on any internal defect.

Include regression cases for:

- glossary index to term;
- term to glossary index;
- term to related term, lesson, and example;
- lesson to dataset and trace;
- navbar and footer routes;
- About and FAQ routes;
- URLs with query parameters and fragments;
- the site's 404 page.

## 6. Phase 3 — Increase the public example library from 7 to 12

Do not republish the generic `example-1` to `example-20` drafts merely to reach the count. Add five complete, senior-level examples that turn lesson concepts into inspectable engineering evidence.

Every example must include a realistic scenario, prerequisites, input, complete procedure or artifact, representative output, evaluation rubric, failure cases, security/privacy notes, latency/cost considerations, provenance, and next lesson.

### Example 8 — Durable Research Workflow with Checkpoint and Resume

- **Scenario:** a multi-hour evidence synthesis task survives worker restart and human pause.
- **Artifact:** state machine, checkpoint schema, idempotency keys, resume trace, and recovery test.
- **Evaluation:** no duplicated side effects; state restored correctly; bounded recovery time; cancellation respected.
- **Links to:** durable execution, orchestration patterns, trace-first observability.

### Example 9 — RAG Retrieval Ablation Benchmark

- **Scenario:** compare chunk sizes, hybrid retrieval, metadata filtering, top-k, and reranking.
- **Artifact:** small versioned dataset, experiment matrix, metrics table, and decision record.
- **Evaluation:** retrieval recall/precision, faithfulness, citation correctness, latency, and cost measured separately.
- **Links to:** production RAG architecture and evaluating RAG systems.

### Example 10 — Agent Trace Grading and Regression Gate

- **Scenario:** three executions reach the same answer, but one is unsafe and one is wasteful.
- **Artifact:** representative traces, deterministic invariant checks, model-grader rubric, and CI release decision.
- **Evaluation:** outcome quality, trajectory quality, unsafe-action detection, agreement with human labels, and false-positive rate.
- **Links to:** trajectory evaluation, judge calibration, and continuous evaluation.

### Example 11 — Threat Model and Permission Policy for a Tool-Using Agent

- **Scenario:** an agent reads tickets, changes a repository, and proposes a pull request.
- **Artifact:** data-flow diagram, trust boundaries, abuse cases, capability policy, approval matrix, and negative tests.
- **Evaluation:** blocked privilege escalation, prompt-injection containment, audit completeness, and safe failure.
- **Links to:** threat modelling, capability security, sandboxing, and supply-chain security.

### Example 12 — Model Router with a Cost–Quality Budget

- **Scenario:** route low-risk summarisation, structured extraction, and high-risk analysis across model tiers.
- **Artifact:** routing policy, evaluation set, fallback matrix, quality-cost frontier, and degradation alert.
- **Evaluation:** quality threshold, p95 latency, spend per successful task, fallback correctness, and no silent quality regression.
- **Links to:** model routing, cost engineering, latency engineering, and SLOs.

### Example-index improvements

- Display exactly 12 reviewed examples in production after this phase.
- Add artifact-type filters: playbook, lab, benchmark, case study, rubric, threat model, and template.
- Add level, domain, lesson, and estimated-time filters.
- Show the evidence produced by each example, not only the task title.
- Provide a recommended sequence: Build → Evaluate → Secure → Operate.

## 7. Phase 4 — Add two Applied practice domains

The resulting Applied practice section should contain three complementary domains:

1. Research, Writing, and Communication
2. Productivity and Workflow Automation
3. Career Development and Job Search Systems

### 7.1 Productivity and Workflow Automation

Promote and substantially rewrite the existing `productivity` collection rather than creating a near-duplicate domain.

**Purpose:** apply reliable AI-system patterns to recurring individual and team knowledge-work processes.

**Learning outcomes:**

- identify tasks that should remain manual, use a deterministic workflow, or use an agent;
- turn meeting notes, inboxes, documents, and task queues into typed artifacts;
- design approval gates for calendar, email, issue-tracker, and document actions;
- measure time saved without sacrificing correctness, privacy, or accountability;
- build resumable automations with audit trails and safe fallbacks.

**Mini-curriculum:**

1. Task decomposition and workflow selection.
2. Structured extraction and action-item contracts.
3. Human approval for externally visible actions.
4. Cross-tool orchestration, idempotency, and retries.
5. Privacy, retention, and enterprise-data boundaries.
6. Evaluation using completion quality, correction rate, time saved, and failure cost.

**Practice artifacts:** meeting-to-action workflow, inbox triage rubric, approval matrix, failure-recovery trace, and weekly effectiveness report.

**Evidence requirement:** link to relevant first-party repositories or documented workflows from Vu Hung's GitHub profile. Replace the current incorrect `github.com/vuhung/prompt-to-system` URL and do not substitute third-party projects as evidence of the author's experience.

### 7.2 Career Development and Job Search Systems

**Purpose:** apply LLM workflows to job discovery, evidence-based resume tailoring, interview preparation, and application tracking without inventing credentials.

**Learning outcomes:**

- extract competencies and constraints from job descriptions;
- map requirements to verified personal evidence;
- tailor resumes and cover letters without fabricated claims;
- construct interview-preparation datasets and feedback rubrics;
- operate an application workflow with privacy, provenance, review, and versioning;
- evaluate relevance, truthfulness, coverage, tone, and human acceptance.

**Mini-curriculum:**

1. Job-description parsing into a competency schema.
2. Evidence retrieval from resumes, portfolios, and repositories.
3. Claim grounding and anti-fabrication controls.
4. Resume and cover-letter transformations with change logs.
5. Interview simulation and rubric-based feedback.
6. Application tracking, privacy, and human approval.

**Practice artifacts:** requirement-evidence matrix, grounded resume diff, claim provenance table, interview rubric, and application decision log.

**Evidence requirement:** use relevant first-party work such as `genai-jobseeker` and related resume/job-description tooling only after confirming current repository names, URLs, scope, and maintenance status.

### 7.3 Domain editorial contract

All three Applied practice domains must contain:

- a precise scope and non-goals;
- unique outcomes, risks, technologies, lessons, and examples;
- a six-part mini-curriculum;
- at least three reviewed linked assets;
- one end-to-end practice workflow;
- a measurable evaluation rubric;
- first-party evidence where claiming author expertise;
- last-verified dates and no placeholder links.

## 8. Phase 5 — Navigation, About, FAQ, and licensing

### 8.1 Primary navigation

Use this order:

**Learn · Examples · Domains · Glossary · About · FAQ**

- Remove GitHub from the primary navigation and retain it in the footer and About page.
- Add active states for About and FAQ.
- Keep the sequence and labels identical on desktop and mobile.
- Ensure all links include the GitHub Pages base path.

### 8.2 About page — ready-to-implement copy

The following is draft copy, not merely an outline.

---

**Page title: About Applied LLM Patterns**

Applied LLM Patterns is a practical learning system for moving from one-off prompts to reliable AI workflows and production-grade agent systems.

The site begins with the foundations of prompt, context, workflow, loop, harness, and evaluation engineering. Its advanced path then covers architecture, retrieval, tools and interoperability, evaluation, reliability, security, observability, economics, and technical leadership.

The material is written for builders who want more than a list of techniques. Lessons emphasise design decisions, trade-offs, failure modes, measurable evaluation, and reviewable engineering artifacts.

#### Author and AI collaboration

Created by **Vu Hung with AI assistance, 2026**.

Vu Hung defines the learning goals, selects the domains, reviews the published material, and is responsible for the final editorial decisions. AI tools assist with research organisation, drafting, transformation, consistency checks, and implementation. AI assistance is not presented as independent human expert review.

Where a lesson has received additional technical review, the reviewer, review date, scope, and status are recorded explicitly. Content without that evidence should be treated as author-reviewed educational material rather than externally certified guidance.

#### How the content is developed

Each advanced lesson is expected to connect a production problem to competing designs, a worked example, failure and security analysis, measurable evaluation, operational evidence, and traceable sources. Time-sensitive claims include a verification date. Examples are intended to be inspectable and adaptable, not copied into production without review.

#### About Vu Hung

Vu Hung works across applied AI, software engineering, data and Python, machine learning and language systems, mathematics, technical education, and practical knowledge-work automation. The Domains section connects these interests to learning paths and selected project evidence.

Explore Vu Hung's work on [GitHub](https://github.com/vuhung16au) or view the [project repository](https://github.com/vuhung16au/prompt-to-system).

#### Attribution and license

Unless a page states otherwise, the original educational text and original diagrams on this site are licensed under the **Creative Commons Attribution-ShareAlike 4.0 International license (CC BY-SA 4.0)**. You may share and adapt them with attribution and under the same license.

Third-party quotations, trademarks, code, datasets, and linked resources remain subject to their own licenses and terms. See the repository's attribution and license files for details.

---

### 8.3 FAQ page — ready-to-implement copy

Use accessible disclosure controls only if all questions and answers remain linkable, keyboard-operable, printable, and available without JavaScript. A simple heading list is also acceptable.

#### Who is this site for?

It is for software engineers, AI and ML engineers, technical leads, architects, educators, and knowledge workers who want to turn LLM capabilities into reliable systems. The foundation path is accessible to readers with basic LLM experience; the Advanced Systems path assumes familiarity with APIs, structured output, retrieval, tool calling, tests, logs, and distributed-system basics.

#### Where should I start?

Start with the Learn page. Use the five-layer foundation if you are still building reliable prompt and workflow habits. Use the role-based Advanced Systems routes if you already build LLM applications and need deeper material on architecture, evaluation, operations, or security.

#### What is the difference between a workflow and an agent?

A workflow follows an explicit control structure defined primarily by software. An agent gives a model more authority to choose actions and paths at runtime. Prefer the least autonomous design that meets the task: it is usually easier to evaluate, secure, recover, and operate.

#### Is the material tied to one model or provider?

Most lessons are model-agnostic. Provider-specific examples are labelled and include a verification date because APIs and capabilities change. Treat those examples as adaptations of the underlying pattern, not permanent universal instructions.

#### Are the examples production-ready?

The examples are educational reference artifacts. They demonstrate requirements, trade-offs, evaluation, and failure handling, but they are not a substitute for your organisation's security review, privacy assessment, testing, observability, and operational controls.

#### How is the content reviewed?

Vu Hung reviews all published material. AI tools assist with drafting and consistency checks. Independent technical review is recorded only when an identifiable reviewer has checked a defined scope and the site has review evidence. A page should not be interpreted as independently approved merely because it is marked published.

#### How current is the material?

Each reviewed page has a verification date. Model-independent principles should age slowly, while protocol, provider, model, and tooling guidance requires more frequent review. Stale time-sensitive pages should be marked for review or removed from the reviewed collection.

#### How should I evaluate an AI system built from these patterns?

Evaluate the complete task, not only fluent output. Use representative and adversarial datasets, deterministic checks where possible, calibrated model graders where necessary, trajectory and tool-use analysis for agents, and production feedback connected to versioned prompts, models, retrieval, tools, and policies.

#### Does this website call an LLM or store my data?

The published site is a static Astro website. Reading the site does not require sending your prompts or documents to an LLM. If interactive features are added later, their data handling and external services should be disclosed before use.

#### May I reuse or adapt the material?

Yes. Unless a page states otherwise, original educational text and diagrams are available under CC BY-SA 4.0: provide attribution, link to the license, indicate changes, and distribute adaptations under the same license. Third-party material and software code may have different terms.

#### How should I cite the site?

Suggested citation: **Vu Hung with AI assistance. “Applied LLM Patterns.” 2026.** Include the page title, page URL, and access date when citing a specific lesson.

#### How can I report an error or contribute?

Open an issue or pull request in the project repository. For factual or technical corrections, identify the page, the claim, supporting evidence, and the proposed change. Do not include confidential data, private prompts, credentials, or proprietary evaluation examples.

### 8.4 License changes

The repository currently contains an MIT License. Creative Commons ShareAlike and MIT serve different purposes; do not silently replace one with the other.

Recommended dual-license structure:

- **Educational text and original diagrams:** CC BY-SA 4.0.
- **Website source code and reusable software examples:** retain MIT, unless Vu Hung deliberately selects another software license.
- **Third-party material:** governed by its original license and recorded in attribution metadata.

Implementation tasks:

- add a clear content-license file or section containing the standard CC BY-SA 4.0 notice and canonical license link;
- retain the MIT `LICENSE` for software and explicitly state its scope;
- add a short licensing table to the README and About page;
- add “© 2026 Vu Hung and contributors · Content: CC BY-SA 4.0 · Code: MIT” to the footer;
- record AI assistance as authorship-process disclosure, not as a legal copyright owner;
- verify that datasets, traces, screenshots, and copied code are eligible for the stated license.

## 9. Phase 6 — Make completion claims enforceable

Replace placeholder quality scripts and warning-only checks with real evidence.

### Required automated checks

- build succeeds with no content-schema errors;
- every reviewed advanced entry satisfies required metadata;
- every reviewed lesson has sources and a review state;
- no placeholder reviewer identities remain;
- no generic placeholder example is public;
- exactly 12 reviewed examples are public;
- exactly 3 Applied practice domains are public;
- every Mermaid source block produces a rendered figure;
- the production-output crawler finds no broken internal page, asset, download, or fragment;
- About and FAQ appear in the navbar and generated sitemap;
- automated accessibility tests inspect representative home, index, lesson, example, domain, glossary, About, FAQ, and 404 pages;
- Lighthouse runs against the production build and stores a report rather than printing a success string.

### Required manual checks

- complete a keyboard-only journey through the main learning path;
- perform a screen-reader smoke test on navigation, one lesson, one diagram, FAQ, and glossary;
- verify diagrams and tables on mobile and in print;
- inspect the five new example artifacts for realism and completeness;
- verify first-party evidence links and every claim about Vu Hung's experience;
- check the full deployed site below `/prompt-to-system/`, not only a root-hosted local preview.

## 10. Recommended implementation sequence

### Release 1 — Correctness blockers

1. Fix all base-path links.
2. Add the post-build internal link and fragment crawler.
3. Render and review all Mermaid diagrams.
4. Correct misleading review metadata.
5. Replace echo-only quality scripts with real checks.

**Exit:** no confirmed dead links, every diagram renders, and no unsupported review claim remains.

### Release 2 — Complete the advanced plan

1. Add the three missing Track 1 lessons.
2. Normalize track names and advanced metadata.
3. Enrich all advanced entries against the editorial contract.
4. Rebuild the Advanced Systems page as an eight-track journey.

**Exit:** every advanced entry has required evidence and each track is navigable as a curriculum.

### Release 3 — Expand applied practice

1. Add the five senior-level examples.
2. Rewrite and promote Productivity and Workflow Automation.
3. Add Career Development and Job Search Systems.
4. Cross-link examples, lessons, glossary terms, and domains.

**Exit:** 12 public reviewed examples and 3 Applied practice domains meet their editorial contracts.

### Release 4 — Trust and orientation

1. Add About and FAQ using the draft copy in this plan.
2. Update the navbar and footer.
3. Implement the dual-license explanation and attribution scope.
4. Run the automated and manual release checks.

**Exit:** readers can identify the author, AI's role, review status, reuse terms, starting path, and contribution route.

## 11. Final definition of done

Antigravity should not report this plan complete until all of the following are evidenced:

- [ ] The three missing advanced lessons are published and cross-linked.
- [ ] Every advanced entry satisfies the editorial and metadata contracts.
- [ ] Reviewer identities and review states are accurate and non-placeholder.
- [ ] The Learn page presents all eight advanced tracks with prerequisites, effort, and artifacts.
- [ ] All 38 current Mermaid blocks render as accessible diagrams.
- [ ] No generated internal link escapes the `/prompt-to-system/` deployment base.
- [ ] A production-output crawler reports zero broken internal links and fragments.
- [ ] Twelve reviewed, substantive examples are public.
- [ ] Three substantive Applied practice domains are public.
- [ ] The navbar reads Learn, Examples, Domains, Glossary, About, FAQ.
- [ ] About and FAQ contain the approved authorship, review, reuse, and contribution information.
- [ ] Educational content is clearly licensed CC BY-SA 4.0 and software remains clearly licensed MIT.
- [ ] Accessibility and Lighthouse checks execute real tools and preserve reports.
- [ ] Manual keyboard, screen-reader, mobile, print, and deployed-base-path checks are recorded.
- [ ] `npm test` and the production build pass without network-time dependency installation.
