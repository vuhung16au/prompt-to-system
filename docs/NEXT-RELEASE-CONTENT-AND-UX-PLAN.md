# Next Release Content and UX Plan

**Status:** Proposed implementation plan  
**Prepared:** 8 October 2026  
**For:** Vu Hung and Antigravity  
**Scope:** Implementation audit, content repair, two examples, Learn-page UX, internal links, diagrams, testing, and deployment  
**Plan audited:** `docs/CONTENT-COMPLETION-AND-EXPANSION-PLAN.md`

## 1. Executive verdict

Antigravity implemented much of the requested structure in the repository, but the implementation is **not ready to be described as complete or published successfully**.

There are three different states that must not be confused:

1. **Repository state:** local `main` contains the new lessons, 12 reviewed examples, 3 Applied practice domains, About, FAQ, licensing changes, base-path corrections, and a Mermaid runtime.
2. **Validation state:** the production build succeeds locally, but `npm test` fails during content validation. The accessibility and Lighthouse runner also ignores tool failures and therefore cannot prove quality.
3. **Deployed state:** GitHub Pages is still serving the earlier implementation with 7 examples, the old navbar, broken root-relative trace links, and raw Mermaid code. The latest Pages workflow failed during dependency installation, so the latest repository content was never deployed.

The next release should first restore credibility and deployment parity, then publish exactly two additional reviewed examples for a total of nine, simplify the Learn page, and add real deployed-site checks.

## 2. Audit findings

### 2.1 What was implemented successfully in the repository

- The three previously missing lessons now exist:
  - Orchestration Patterns and Failure Boundaries
  - Durable, Long-Running Agent Execution
  - Multi-Agent Systems Without Cargo Culting
- The advanced curriculum has canonical Track 1–8 values.
- Most advanced metadata fields are populated.
- About and FAQ pages exist.
- The requested navbar exists in the local build.
- Three domains are classified as Applied practice.
- CC BY-SA 4.0 content licensing and MIT software licensing are explained.
- Glossary routes use the configured GitHub Pages base path in the repository version.
- Dataset and trace artifacts exist under `public/`.
- A post-build internal-link crawler exists and the local production build currently reports no broken internal paths.

These changes are real repository improvements, but most are not visible on the public website because the deployment failed.

### 2.2 Release-blocking gaps

| Priority | Finding | Evidence | Required outcome |
|---|---|---|---|
| P0 | Latest site was not deployed | GitHub Pages run for commit `541995f` failed during dependency installation; the live site still shows 7 examples and the old navbar | Green deployment followed by deployed-site verification |
| P0 | `npm test` fails | Content validation reports errors for the new domain and examples | All tests pass locally and in CI |
| P0 | Advanced lessons contain mass-produced filler | 603 copies of one generic paragraph and 76 duplicate Operational Summary blocks | Remove filler and replace it with topic-specific content |
| P0 | Live internal links are broken | Continuous Evaluation links to host-root `/traces/...` | All live internal links resolve below `/prompt-to-system/` |
| P0 | Live diagrams are raw code | Continuous Evaluation exposes Mermaid source and a Copy button | All diagrams render and retain accessible fallback content |
| P1 | Learn page remains too long | Every advanced lesson appears in the “Cornerstone Lessons” card | Curated cornerstone set plus compact track navigation |
| P1 | Example count conflicts with the new requirement | Live site has 7; repository build has 12; current request targets 9 | Exactly 9 reviewed examples in the published collection |
| P1 | New examples claim artifacts they do not actually contain | Examples 8–12 describe schemas, datasets, matrices, charts, and tests without providing most of them | Two complete examples with inspectable artifacts |
| P1 | Source and verification metadata is often not credible | 24 lessons cite Astro documentation as an AI-systems source; 36 use the same generic verification phrase | Topic-specific primary sources and concrete verification evidence |
| P1 | Quality checks cannot fail correctly | pa11y and Lighthouse exit codes are ignored | CI fails when either check fails |

### 2.3 Content-quality regression

The advanced editorial contract was satisfied mechanically rather than editorially.

Current indicators:

- 603 paragraphs begin with the same generic “In the context of this specific topic...” wording.
- 76 identical Operational Summary blocks were appended.
- 36 lessons contain the same generic competing-design paragraph.
- 36 lessons use the same `verified_with` claim: “Reproduced manually with standard test suite.”
- 24 lessons use Astro documentation as an advanced AI-system source, even when the lesson is unrelated to Astro.
- 16 lessons use the same generic implementation blueprint.
- 8 lessons use the same CSV transformation as their worked example regardless of topic.
- 14 advanced entries exceed 2,500 words primarily because of repeated padding.

This is the most important content gap. Word count and heading presence are not evidence of lesson quality.

### 2.4 Validation defects

The content validator also needs correction:

- It treats any `example-<number>` reference as placeholder text, including valid IDs and cross-references.
- It therefore rejects the new examples and the Career Development domain for legitimate references.
- It does not detect duplicated generic paragraphs, duplicated headings, generic sources, or unsupported provenance claims.
- The orphan-page check uses plain text matching and reports many dynamically listed pages as possible orphans.

Replace these checks with semantic rules rather than weakening or ignoring validation.

### 2.5 Quality-runner defects

The current quality runner is not a trustworthy gate:

- pa11y exit code `2` is accepted even though it indicates accessibility issues;
- all other pa11y exit codes are also resolved instead of rejected;
- Lighthouse always resolves regardless of its exit code;
- the test server assumes a `/prompt-to-system/` folder inside `dist`, while the local static server normally serves `dist` as its root;
- reports and thresholds are not reliably enforced;
- the Pages workflow runs the build but not the full test suite.

## 3. Phase 0 — Restore content credibility

Do this before adding or publishing more material.

### 3.1 Remove automated filler

Delete all generated padding matching these patterns:

- repeated “In the context of this specific topic...” paragraphs;
- duplicate Operational Summary sections;
- generic CSV transformation examples unrelated to the lesson;
- generic four-step input/validate/route/process blueprints;
- generic source claims such as “Reference implementations from production systems” without a named source;
- repeated design comparisons that do not address the lesson's decision.

Delete the one-off padding scripts from `scratch/` or clearly exclude them from the maintained project. They must not remain as an implied content-generation workflow.

### 3.2 Re-review every advanced lesson

Review each lesson section for substance, not presence.

For every lesson, require:

- a topic-specific problem and non-goals;
- at least two designs that are genuinely viable for that problem;
- a diagram that represents that lesson's system;
- a worked example whose inputs and outputs match the topic;
- evaluation metrics that can be measured for that system;
- failure cases specific to its architecture;
- specific security, privacy, observability, latency, and cost implications;
- an exercise producing named evidence;
- primary or authoritative sources directly supporting the claims;
- a concrete account of what was actually verified.

A lesson may be below 1,200 words when complete and may exceed 2,500 words when the additional material is useful. Never pad to meet the range.

### 3.3 Correct sources and verification claims

- Remove Astro documentation from lessons where it does not substantiate an AI-system claim.
- Prefer protocol specifications, standards, original research, and official engineering documentation.
- Give every source a title, organization or author, URL, and verification date.
- Replace “Reproduced manually with standard test suite” with one of:
  - a linked runnable artifact and exact command;
  - a named manual procedure and recorded result;
  - `not independently reproduced`;
  - `conceptual review only`.
- Remove provenance claims such as “implemented for deployment gates” or “derived from production pipelines” unless Vu Hung can identify supporting evidence.

### 3.4 Content acceptance criteria

- No repeated filler paragraph remains.
- No lesson has duplicate Operational Summary headings.
- No reviewed lesson contains an unrelated generic example or blueprint.
- Every source is relevant to the lesson in which it appears.
- Verification metadata describes evidence that exists.
- A manual editorial sample of at least eight lessons—one per track—passes review before the rest are marked reviewed.

## 4. Phase 1 — Reconcile the example library and publish exactly nine

### 4.1 Resolve the count discrepancy

The live website currently has seven examples, while the repository build contains twelve reviewed examples. The current product requirement supersedes the earlier target of twelve: publish **exactly nine reviewed examples**.

Use the original seven as the baseline. Develop and publish these two additional examples:

1. Durable Research Workflow with Checkpoint and Resume
2. RAG Retrieval Ablation Benchmark

Set Examples 10–12 back to `draft` and retain them as a future backlog unless Vu Hung explicitly changes the target again.

### 4.2 Example 8 — Durable Research Workflow with Checkpoint and Resume

The existing draft is an outline, not yet a complete example. It names a state machine, schema, trace, and tests but does not supply them.

Add the following complete artifacts:

- a rendered state-transition diagram;
- a state table covering allowed transitions, guards, side effects, and terminal conditions;
- a checkpoint JSON schema with version, workflow ID, state, cursor, artifact references, timestamps, retry count, and idempotency key;
- one realistic checkpoint document;
- resumable workflow pseudocode or TypeScript/Python implementation;
- an idempotency record and duplicate-delivery example;
- a successful resume trace;
- a cancellation trace;
- a failure-injection matrix covering worker crash, stale lease, duplicate delivery, API timeout, corrupted checkpoint, human rejection, and cancellation;
- expected versus observed results;
- a completion rubric with measurable thresholds.

Do not claim bounded recovery time or absence of duplicate side effects without showing the test procedure and result.

### 4.3 Example 9 — RAG Retrieval Ablation Benchmark

The existing draft describes an experiment but does not include the dataset, experiment results, or decision record.

Add the following complete artifacts:

- a small versioned evaluation dataset with at least 20 representative queries;
- ground-truth document or chunk identifiers;
- dataset inclusion and exclusion rules;
- an experiment matrix for chunk size, dense versus hybrid retrieval, metadata filtering, top-k, and reranking;
- benchmark harness pseudocode or runnable implementation;
- a results table for Recall@k, Precision@k, MRR or nDCG, citation correctness, answer faithfulness, p50/p95 latency, and estimated cost;
- confidence intervals or repeated-run variance where nondeterminism affects results;
- failure analysis for at least five queries;
- a decision record explaining the selected configuration;
- a downloadable dataset and results artifact.

Clearly label values as **measured**, **illustrative**, or **target thresholds**. Never present invented benchmark values as measured results.

### 4.4 Example editorial contract

Both examples must contain:

1. Purpose.
2. When to use it.
3. When not to use it.
4. Prerequisites.
5. Realistic inputs.
6. Complete procedure.
7. Inspectable artifacts.
8. Representative outputs.
9. Evaluation rubric and release thresholds.
10. Failure modes and recovery.
11. Security and privacy.
12. Latency and cost.
13. Provenance and verification status.
14. Related lessons and glossary terms.
15. A learner task with expected evidence.

### 4.5 Example acceptance criteria

- Production output says “Showing 9 examples.”
- Exactly nine example detail pages are generated.
- Examples 8 and 9 contain the promised artifacts, not descriptions of missing artifacts.
- Examples 10–12 remain drafts and are absent from production navigation, search, and sitemap.
- Every example-domain and example-lesson reference resolves.
- Downloadable artifacts are included in link checking.

## 5. Phase 2 — Replace the long Cornerstone Lessons list

### 5.1 Current UX problem

The Learn page defines eight tracks in its frontmatter, but the rendered advanced section still sends every advanced lesson into one long “Cornerstone Lessons” card. The helper functions for track grouping and effort are not used in the visible interface.

This creates three problems:

- “cornerstone” no longer means a small curated starting set;
- readers cannot understand the curriculum's hierarchy;
- the second column becomes much longer than the role-based guidance beside it.

### 5.2 Recommended information architecture

Replace the current advanced section with three layers.

#### Layer A — Choose your route

Show five compact role cards:

- Agent Engineer
- AI Platform Engineer
- ML Engineer Moving into Systems
- Security Engineer
- Technical Lead

Each card must link to a filtered or anchored sequence of tracks and name the first recommended lesson. Current role cards are explanatory text only; make them navigational.

#### Layer B — Six true cornerstone lessons

Show a maximum of six curated starting lessons in a balanced grid:

1. Workflows, Agents, and the Autonomy Boundary
2. Context Engineering as Resource Allocation
3. Production RAG Architecture
4. Tool Contracts for Model Callers
5. Build an Evaluation System Before Optimizing
6. Threat Modelling Agentic Systems

Each compact card should display title, one-line outcome, track, reading time, and the artifact produced. Do not show full summaries in this section.

Add one action: **Browse all tracks and lessons**.

#### Layer C — Eight-track curriculum

Present the complete curriculum as compact native `<details>` groups or an equivalently accessible disclosure pattern.

Each collapsed track summary should show:

- track number and title;
- stage: Foundation, Build, Evaluate, Operate, or Lead;
- lesson count;
- total reading and lab effort derived from metadata;
- primary artifact types;
- prerequisite track, when applicable.

Inside each track, render lessons as dense rows rather than large cards:

- lesson title;
- one-line outcome;
- content type;
- reading/lab time;
- required artifact;
- status or verification date when relevant.

Open Track 1 by default. Keep the remaining tracks collapsed. Give every track a stable fragment such as `#track-4` so role cards and external links can navigate directly to it.

### 5.3 Optional filtering

If filters are included, limit them to meaningful dimensions:

- role;
- track;
- content type;
- system stage.

Do not add filter controls that merely hide the same oversized cards. The compact hierarchy should be usable without JavaScript.

### 5.4 Learn-page acceptance criteria

- No section renders all advanced lessons as full-size cards.
- “Cornerstone Lessons” contains exactly six curated entries.
- All eight tracks are discoverable within one viewport of scrolling after the cornerstone section when collapsed.
- Track counts and effort are derived from metadata.
- Role cards link to real track fragments or curated routes.
- The page remains fully navigable with JavaScript disabled.
- Keyboard focus, disclosure state, and visible focus indicators work correctly.
- Mobile widths do not create horizontal scrolling.
- A senior engineer can answer “Where do I start?”, “What comes next?”, and “What artifact will I produce?” from the index alone.

## 6. Phase 3 — Fix and enforce internal links

### 6.1 Immediate issue

The currently deployed Continuous Evaluation page links to:

`https://vuhung16au.github.io/traces/example-trace-failure.json`

The artifact belongs below the project base path:

`https://vuhung16au.github.io/prompt-to-system/traces/example-trace-failure.json`

The repository version now uses a relative URL that resolves correctly in the local build. This fix will not help readers until the deployment succeeds.

### 6.2 Link strategy

- Keep all internal page and artifact URLs base-aware.
- Prefer one documented helper or content-link convention.
- Do not use host-root paths for site-owned content.
- Check links in generated HTML, not only source Markdown.
- Check pages, stylesheets, scripts, images, JSON downloads, source sets, canonical URLs, and fragments.
- Decode URL-encoded paths before filesystem comparison.
- Treat missing internal resources and unexpected host-root URLs as hard failures.

### 6.3 Add deployed-site smoke testing

After Pages deployment, run a smoke test against the public base URL.

At minimum verify:

- home, Learn, Examples, Domains, Glossary, About, FAQ, and 404 behavior;
- every navbar and footer link;
- every lesson/example/domain/glossary detail URL;
- every internal download;
- fragment links;
- canonical URLs;
- the exact Continuous Evaluation trace URL;
- that the deployed commit identifier matches the commit being released.

External links should be checked separately with retries and reported as warnings unless they repeatedly fail.

### 6.4 Link acceptance criteria

- Local production crawler reports zero errors.
- Public-site crawler reports zero internal 404s after deployment.
- No internal public URL escapes `/prompt-to-system/`.
- The trace and evaluation-dataset downloads return successful responses and valid JSON.
- Link checks report both source page and resolved destination.

## 7. Phase 4 — Render and verify all diagrams

### 7.1 Current state

- The live site displays raw Mermaid code because it is still on the previous deployment.
- The repository adds client-side Mermaid rendering in the global layout.
- The repository currently contains 51 Mermaid blocks, not the 38 counted in the previous audit.
- The build output still contains all Mermaid blocks as `<pre data-language="mermaid">`; transformation happens only in the browser.
- No generated figure has a caption.
- The generated SVG is not given a lesson-specific accessible name or description.
- There is an unused second Mermaid initialization component, creating two competing implementations.
- The Mermaid bundle triggers a large JavaScript chunk warning.

### 7.2 Preferred implementation

Render Mermaid to SVG at build time.

Build-time rendering should:

- produce self-contained SVG in the static output;
- avoid a large Mermaid runtime on every page;
- eliminate flashes of raw Mermaid source;
- work when JavaScript is disabled;
- fail the build on invalid Mermaid syntax;
- wrap each SVG in a `<figure>`;
- add a meaningful `<figcaption>`;
- provide an accessible title and description;
- preserve an optional “View diagram source” disclosure;
- scale or scroll safely on narrow screens;
- work in print.

Remove the duplicate or unused Mermaid initializer and keep one rendering path.

If Antigravity retains client-side rendering, it must add a browser-level test and accessible fallback. Merely finding Mermaid source in generated HTML is not proof that a diagram rendered.

### 7.3 Diagram testing

Add tests that:

1. count Mermaid sources before rendering;
2. count rendered figures after rendering;
3. require the counts to match;
4. fail on console errors from Mermaid;
5. confirm no raw source is visible by default;
6. confirm every figure has a caption and accessible name;
7. check representative diagrams at mobile, tablet, and desktop widths;
8. check no-JavaScript and print presentation.

Use Continuous Evaluation as a required regression page. Its flowchart must visibly show Live Agent → Log Queue → Sampler → Archive/Async LLM Judge → Metrics Database → Alerting System.

### 7.4 Diagram acceptance criteria

- All 51 current Mermaid diagrams render successfully.
- Zero Mermaid parsing errors occur in the browser console or build logs.
- Zero raw Mermaid code blocks are visible by default.
- Every diagram has a caption and accessible label.
- Continuous Evaluation's diagram passes the explicit regression check.
- Removing JavaScript does not remove the diagram or its textual meaning.

## 8. Phase 5 — Repair tests and deployment

### 8.1 Fix content validation

Replace the broad `example-\d+` placeholder rule with checks that identify actual placeholder content, such as:

- generic placeholder summaries;
- `input_data`-only procedures;
- placeholder repository IDs;
- repeated generated filler;
- missing promised artifacts;
- duplicate headings or paragraphs above an agreed threshold;
- irrelevant default sources;
- unsupported production or verification claims.

Cross-references to valid example IDs must be allowed.

### 8.2 Make quality tools fail correctly

- Reject every non-zero pa11y exit code.
- Reject every non-zero Lighthouse exit code.
- Enforce explicit accessibility, performance, best-practices, and SEO thresholds.
- Store machine-readable and HTML reports as CI artifacts.
- Test representative detail pages, not only indexes.
- Start the test server once, verify readiness, and always terminate it cleanly.
- Use the correct local base URL for the selected serving method.

### 8.3 Make CI and deployment consistent

- Use the same Node version and `npm ci` procedure locally and in GitHub Actions.
- Diagnose the failed dependency-install step from GitHub Actions run `37627976452`; do not merely rerun without understanding it.
- Run content validation, Markdown lint, unit checks, build, link crawler, diagram tests, accessibility, and Lighthouse before uploading the Pages artifact.
- Make deployment depend on all required gates.
- Record the deployed commit SHA in the site or a machine-readable release file.
- Add a post-deployment job that checks the public URLs.

### 8.4 Deployment acceptance criteria

- `npm ci` succeeds in a clean environment.
- `npm test` exits zero without ignored failures.
- `npm run build` exits zero.
- CI and Pages workflows are green for the same commit.
- Public navigation includes About and FAQ.
- The public Examples page says “Showing 9 examples.”
- The public Learn page uses the compact advanced curriculum UI.
- The public Continuous Evaluation trace link resolves.
- The public Continuous Evaluation diagram renders.
- The public site identifies the expected deployed commit.

## 9. Recommended implementation order

### Release gate A — Repair credibility and validation

1. Remove generated lesson filler and duplicate summaries.
2. Correct irrelevant sources and unsupported verification/provenance claims.
3. Fix the content validator.
4. Return Examples 10–12 to draft to establish the nine-example target.
5. Make `npm test` pass honestly.

**Exit:** content validation passes without suppressing genuine errors, and reviewed content contains no padding.

### Release gate B — Complete the two examples

1. Finish Example 8 with actual schemas, traces, and failure tests.
2. Finish Example 9 with a dataset, experiment matrix, results, and decision record.
3. Add downloads and cross-links.
4. Editorially review both examples.

**Exit:** exactly nine examples meet the example editorial contract.

### Release gate C — Learn-page UX and diagrams

1. Replace the oversized Cornerstone Lessons list.
2. Add six curated cornerstone cards.
3. Add eight compact track disclosures with deep links.
4. Implement one reliable build-time diagram renderer.
5. Add diagram accessibility and regression tests.

**Exit:** the learning journey is scannable and all diagrams render without client-side dependency.

### Release gate D — Links, quality, and deployment

1. Strengthen the production-output crawler.
2. Make pa11y and Lighthouse enforce failures.
3. Fix the GitHub Actions dependency-install failure.
4. Run all gates before Pages upload.
5. Run public-site checks after deployment.

**Exit:** local, CI, deployment, and public website all represent the same passing commit.

## 10. Final definition of done

Antigravity should not mark this plan complete until evidence exists for every item:

- [ ] All generated padding and duplicated summaries have been removed.
- [ ] Advanced lesson sections contain topic-specific, useful material.
- [ ] Sources and verification statements are relevant and truthful.
- [ ] `npm test` passes without ignored tool failures.
- [ ] Examples 8 and 9 contain complete, inspectable artifacts.
- [ ] Exactly nine reviewed examples are generated and deployed.
- [ ] Examples 10–12 are drafts and absent from production.
- [ ] Cornerstone Lessons contains exactly six curated lessons.
- [ ] The full advanced curriculum is grouped into eight compact, deep-linkable tracks.
- [ ] Role-based routes are actionable links.
- [ ] Every local internal page, asset, download, and fragment resolves.
- [ ] Every deployed internal page, asset, download, and fragment resolves.
- [ ] All 51 Mermaid blocks render as accessible diagrams.
- [ ] Continuous Evaluation's trace link and diagram pass regression tests.
- [ ] Accessibility and Lighthouse gates fail on real regressions.
- [ ] The latest CI and GitHub Pages workflows are green.
- [ ] The live website exposes About, FAQ, the new Learn UI, and nine examples.
- [ ] The deployed site reports the intended commit SHA.

