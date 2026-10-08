# Aussie Improvement Plan — Applied LLM Patterns

> **Goal:** Make the site feel distinctly Australian, richer in content, and more pleasant to browse and learn from.
>
> **Status:** Draft plan for review
>
> **Date:** 2026-10-08

---

## Table of Contents

1. [Australian English & Localisation](#1-australian-english--localisation)
2. [Australia-Relevant Examples & Domains](#2-australia-relevant-examples--domains)
3. [New Content Additions](#3-new-content-additions)
4. [Learning UX Improvements](#4-learning-ux-improvements)
5. [Browsing & Reading Experience](#5-browsing--reading-experience)
6. [Colour Scheme Refresh](#6-colour-scheme-refresh)
7. [Favicon Redesign](#7-favicon-redesign)
8. [Visuals & Diagrams](#8-visuals--diagrams)
9. [Icons (React Icons)](#9-icons-react-icons)
10. [Third "Growing Collections" Domain](#10-third-growing-collections-domain)
11. [Implementation Phases](#11-implementation-phases)

---

## 1. Australian English & Localisation

### Current state

- The site uses American English throughout (e.g. "optimization", "color", "customize", "behavioral").
- The HTML `lang` attribute is set to `"en"` — no regional variant specified.
- No Australian-specific cultural references, companies, or institutions in examples.

### Proposed changes

| Area | What to change |
|------|---------------|
| **HTML lang** | Change `<html lang="en">` → `<html lang="en-AU">` in [Layout.astro](file:///Users/vuhung/00.Work/00.Workspace/prompt-to-system/src/layouts/Layout.astro#L24) |
| **Spelling audit** | Run a systematic find-and-replace across all `.md`, `.mdx`, and `.astro` files for common US→AU differences: |
| | `optimization` → `optimisation` |
| | `organize` → `organise` |
| | `customize` → `customise` |
| | `analyze` → `analyse` |
| | `color` → `colour` |
| | `behavior` → `behaviour` |
| | `modeling` → `modelling` |
| | `categorize` → `categorise` |
| | `center` → `centre` |
| | `defense` → `defence` |
| | `license` (noun) → `licence` |
| **Code comments** | CSS variable names (`--code-bg`, `--color-*`) stay as-is (they're code identifiers, not prose) |
| **About page** | Add a note that the site uses Australian English conventions |

> [!IMPORTANT]
> Only change prose/content spelling — never change CSS property names, JavaScript identifiers, HTML attribute values, or third-party API names.

---

## 2. Australia-Relevant Examples & Domains

### Current state

- Examples are generic / US-centric (e.g. `$5M` budgets, "climate change on coastal cities" — valid but no Australian flavour).
- No references to Australian companies, government, geography, or institutions.

### Proposed changes

#### 2a. Localise existing worked examples

| Lesson / Example | Current | Proposed Australian version |
|---|---|---|
| **Prompt Engineering** – Worked example | "impacts of climate change on coastal cities" | "impacts of climate change on Australian coastal communities — from the Gold Coast to the Kimberley" |
| **Context Basics** – Worked example | "Project Apollo, \$5M budget" | "Project Waratah for NSW Transport, \$3.2M budget" |
| **Data Analysis Summary** | Generic dataset prompt | Reference ABS (Australian Bureau of Statistics) data; audience = "State Government Minister" |
| **Code Review Assistant** | Generic PR review | Reference an Australian coding standards body or use Aussie variable naming in the snippet (e.g. `calculateGST()`) |

#### 2b. Add new Australian-themed examples

| New example | Description | Domain |
|---|---|---|
| **Medicare Claims Analyser** | Prompt pattern to summarise bulk-billed claims data from Medicare/PBS datasets | data-python, research |
| **Bushfire Risk Briefing** | Generate a community briefing from BOM weather data and RFS alerts | research-writing-communication |
| **NBN Rollout Tracker** | Structured extraction from nbn™ deployment reports | software-engineering |
| **NAPLAN Results Interpreter** | Summarise NAPLAN school results for parent audiences | technical-education |
| **Fair Work Compliance Checker** | Check employment terms against Fair Work Act requirements | applied-ai-agents |

---

## 3. New Content Additions

### 3a. New lessons to consider

| Lesson idea | Stage | Why |
|---|---|---|
| **Privacy & AI under Australian law** | 5 (Loop eng.) | Cover the Australian Privacy Act 1988, APPs, and OAIC guidance for AI systems — a gap no other site fills well |
| **Prompt Localisation Patterns** | 1 (Prompt eng.) | How to adapt prompts for regional language, metric system, date formats (DD/MM/YYYY), currency (AUD) |
| **Evaluating with Australian Datasets** | 4 (Harness eng.) | Using ABS, data.gov.au, BOM, and CSIRO datasets as golden evaluation sets |

### 3b. New glossary terms

- **Data sovereignty** — particularly relevant in Australian government/health contexts
- **Responsible AI** — CSIRO's National AI Centre framework
- **Retrieval-Augmented Generation (RAG)** — already exists, but add Australian data source examples

### 3c. FAQ additions

- "Can I use these patterns with Australian Government data?" → Yes, with guidance on data.gov.au and API access
- "What date/currency format should I specify in prompts?" → Always DD/MM/YYYY and AUD for Australian audiences

---

## 4. Learning UX Improvements

### Current state

- Lessons have mermaid diagrams and clear structure ✓
- No progress tracking or reading-time estimates on cards
- No "mark as complete" or visual progress bar
- Table of Contents exists but only on detail pages
- No estimated reading time on lesson cards

### Proposed changes

| Improvement | Description | Priority |
|---|---|---|
| **Reading time badges** | Show `duration_minutes` on lesson cards in the Learn index (`LessonCard.astro`) as a badge: e.g. "⏱ 15 min" | High |
| **Progress indicator on Learn page** | A visual progress bar or fraction (e.g. "3 of 28 lessons started") using `localStorage` | Medium |
| **"Back to top" button** | Floating button on long lesson pages for quick scroll-back | Medium |
| **Collapsible sections** | Use `<details>`/`<summary>` for "Failure Modes", "Evaluation Rubric" in examples — progressive disclosure | Medium |
| **Keyboard shortcuts legend** | Document ⌘K (search) and add keyboard nav hints in the footer | Low |
| **Print stylesheet** | Add `@media print` styles so lessons print cleanly (hide nav, footer, search) | Low |
| **Related content sidebar** | On lesson detail pages, show related lessons and examples in a right sidebar (desktop) or bottom section (mobile) | High |

---

## 5. Browsing & Reading Experience

### Current state

- Clean, minimal layout ✓
- Good responsive design ✓
- Navigation has 7 items — can feel crowded on mobile
- No dark/light mode toggle (relies on system preference only)
- Code blocks have copy button ✓ but no language label
- No breadcrumbs on example/glossary detail pages

### Proposed changes

| Improvement | Description | Priority |
|---|---|---|
| **Dark/light mode toggle** | Add a sun/moon toggle button in the header — currently the site only respects `prefers-color-scheme` with no user override | High |
| **Mobile hamburger menu** | On mobile, collapse nav into a hamburger menu (currently items wrap, which can look untidy on small screens) | High |
| **Code block language labels** | Show the language name (e.g. "Python", "XML") as a label in the top-left corner of code blocks | Medium |
| **Breadcrumbs everywhere** | Add breadcrumbs to example detail pages (`/examples/[id]`) and glossary detail pages (`/glossary/[id]`) — currently only some pages have them | Medium |
| **Scroll progress bar** | A thin accent-coloured bar at the top of the page showing reading progress on lesson/example pages | Low |
| **Sticky Table of Contents** | Make the ToC sticky on desktop for long lessons, so the reader always knows where they are | Medium |
| **Font size toggle** | A small A/large A button for accessibility — helpful for the technical education audience | Low |

---

## 6. Colour Scheme Refresh

### Current state

The current scheme in [global.css](file:///Users/vuhung/00.Work/00.Workspace/prompt-to-system/src/styles/global.css):

- **Accent:** `#F2120C` (bright red, labelled "bookred") — high contrast but harsh for extended reading
- **Hover:** `#B51825` (dark red)
- **Surface:** Pure white `#FFFFFF` / dark `#111827`
- **Text:** `#302C2A` (warm charcoal) — good ✓
- **Surface muted:** `#F2EFEB` (soft ivory) — pleasant ✓

### Problem

The bright red accent (`#F2120C`) is visually aggressive for a **learning/reading** site. Red triggers alert/error associations, making links and CTAs feel alarming rather than inviting.

### Proposed: "Eucalyptus" colour scheme

A nature-inspired palette that feels distinctly Australian — warm, calm, and readable:

#### Light mode

| Token | Current | Proposed | Rationale |
|---|---|---|---|
| `--accent-primary` | `#F2120C` (red) | `#0B6E4F` (deep eucalyptus green) | Calmer, inviting, distinctly Australian |
| `--accent-hover` | `#B51825` | `#084C37` (darker green) | Accessible hover state |
| `--accent-muted` | `rgba(242,18,12,0.1)` | `rgba(11,110,79,0.08)` | Subtle highlight |
| `--border-focus` | `#F2120C` | `#0B6E4F` | Matches accent |
| `--surface` | `#FFFFFF` | `#FAFAF8` (warm white) | Slightly off-white, easier on eyes |
| `--surface-muted` | `#F2EFEB` | `#F0EDE8` (parchment) | Keep the warmth, slight adjustment |
| `--status-success` | `#059669` | `#059669` | Keep (already green) |
| `--status-warning` | `#d97706` | `#B8860B` (dark goldenrod — "ochre") | More Australian earthy tone |
| `--status-error` | `#dc2626` | `#C62828` | Slightly muted red for actual errors |

#### Dark mode

| Token | Current | Proposed | Rationale |
|---|---|---|---|
| `--accent-primary` | `#f87171` (light red) | `#4ADE80` (soft green) | Readable on dark, inviting |
| `--accent-hover` | `#fca5a5` | `#86EFAC` (lighter green) | Hover state |
| `--accent-muted` | `rgba(248,113,113,0.2)` | `rgba(74,222,128,0.15)` | Subtle |
| `--surface` | `#111827` | `#0F1419` (deeper, warmer dark) | Less blue-grey, more charcoal |
| `--surface-muted` | `#1f2937` | `#1A2332` | Slightly warmer |

> [!TIP]
> The "Eucalyptus" theme creates a calmer reading environment. Green is associated with growth and learning — perfect for an educational site. The ochre/goldenrod warning colour adds an Australian earth tone.

### Alternative considered: "Outback Teal"

If green feels too generic, consider `#006D77` (teal) for accent — evokes the Australian coast. Both options are WCAG AA compliant on the proposed surfaces.

---

## 7. Favicon Redesign

### Current state

The current favicon ([favicon.svg](file:///Users/vuhung/00.Work/00.Workspace/prompt-to-system/public/favicon.svg)) is the **default Astro rocket logo** — it doesn't represent the project at all.

### Proposed: Custom "Prompt → System" favicon

Design a favicon that represents the project's identity:

| Option | Description | Concept |
|---|---|---|
| **A. Lightning bolt in brackets** | `⟨⚡⟩` — A lightning bolt inside angle brackets, representing "prompt to system" | Code + AI energy |
| **B. Layered chevrons** | Five stacked chevrons (representing the five-layer learning path), in eucalyptus green gradient | Learning progression |
| **C. Australian-themed** | A simplified boomerang forming a ">" prompt symbol | Australian identity + command line |
| **D. Initials "PS"** | Stylised "PS" (Prompt-to-System) in a rounded square | Simple, memorable |

> [!NOTE]
> **Recommendation:** Option **C** (boomerang-prompt) is the most distinctive and ties directly to the Australian identity. It works at 16×16 and scales up well.

### Implementation

- Create SVG favicon with light/dark mode support (using `prefers-color-scheme`)
- Generate `.ico` from SVG for legacy browser support
- Add `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` to Layout.astro (currently missing!)
- Add apple-touch-icon and manifest entries for PWA-readiness

---

## 8. Visuals & Diagrams

### Current state

- Mermaid.js is integrated and used in several lessons ✓
- No images, illustrations, or diagrams outside of mermaid
- No hero images or section illustrations
- Pure text-heavy pages for lessons and examples

### Proposed additions

#### 8a. Architectural diagrams for key lessons

| Lesson | Diagram to add |
|---|---|
| **Workflow Engineering** | Flowchart showing prompt → validate → transform → output pipeline |
| **Multi-Agent Systems** | Diagram showing agent orchestration with message passing |
| **Production RAG Architecture** | Full RAG pipeline: ingest → chunk → embed → store → retrieve → generate |
| **Threat Modelling** | Attack surface diagram for agentic systems |
| **Cost Engineering** | Token usage breakdown visualisation |

#### 8b. Concept illustrations

| Where | What |
|---|---|
| **Home page hero** | A subtle background pattern or abstract illustration representing "layers" (matching the five-layer path) |
| **Learn page** | Stage icons — small illustrative icons for each of the 5 stages |
| **Domains page** | Domain-specific icons/illustrations for each domain card |
| **404 page** | A friendly illustration (kangaroo lost in the bush?) |

#### 8c. Interactive diagrams

- Consider adding a **zoomable/pannable** mermaid viewer for complex diagrams
- Add **before/after** code comparison panels for the worked examples

---

## 9. Icons (React Icons)

### Current state

- All icons are inline SVGs hand-coded in the Astro components
- Inconsistent icon sizing and stroke widths
- Limited icon vocabulary (only ~5 unique icons used: lightning bolt, shield, clock, pencil, arrow)
- No icon system or library

### Proposed approach

#### Option A: `astro-icon` + Iconify (Recommended)

Since this is an **Astro** project (not React), use the [`astro-icon`](https://github.com/natemoo-re/astro-icon) package with the Iconify icon set:

```bash
npm install astro-icon
```

Benefits:
- **Zero JS** — icons are rendered as inline SVGs at build time
- **Massive library** — access to Lucide, Heroicons, Tabler, Material icons via Iconify
- **Tree-shaken** — only the icons you use are bundled
- **Consistent** — uniform sizing, stroke width, and accessibility

#### Option B: React Icons (if React components are added later)

If React islands are introduced:

```bash
npm install react-icons
```

Use `react-icons/lu` (Lucide) for a clean, modern look.

#### Proposed icon mapping

| Location | Current | Proposed icon (Lucide set) |
|---|---|---|
| **Logo/brand** | Lightning bolt SVG | `Zap` or custom boomerang |
| **Learn nav** | None | `BookOpen` |
| **Examples nav** | None | `FlaskConical` |
| **Domains nav** | None | `Layers` |
| **Glossary nav** | None | `BookA` |
| **About nav** | None | `Info` |
| **FAQ nav** | None | `HelpCircle` |
| **Search** | Magnifying glass SVG | `Search` (consistent) |
| **External link** | Arrow SVG | `ExternalLink` |
| **Duration badge** | None | `Clock` |
| **Stage 1** | Number | `Pencil` |
| **Stage 2** | Number | `Database` |
| **Stage 3** | Number | `Workflow` |
| **Stage 4** | Number | `Wrench` |
| **Stage 5** | Number | `RefreshCw` |
| **Copy code** | Clipboard SVG | `Copy` / `Check` |
| **Dark mode toggle** | None | `Sun` / `Moon` |
| **Domain: Software Eng.** | None | `Code2` |
| **Domain: Data & Python** | None | `BarChart3` |
| **Domain: ML/NLP** | None | `Brain` |
| **Domain: Education** | None | `GraduationCap` |
| **Domain: Marketing** | None | `Megaphone` |
| **Domain: Sales** | None | `Handshake` |
| **Domain: Maths** | None | `Calculator` |
| **Domain: Research** | None | `FileSearch` |

---

## 10. Third "Growing Collections" Domain

### Current state

"Growing collections" currently has **2 domains**:
1. **Marketing** (`order: 7`) — Copywriting, campaign planning, and audience analysis
2. **Sales** (`order: 8`) — Outreach, lead generation, and pitch optimization

Both are thin — generic summaries, no Australian flavour, only draft-level content.

### Proposed 3rd domain: **Healthcare & Allied Health**

| Field | Value |
|---|---|
| **id** | `healthcare` |
| **title** | Healthcare & Allied Health |
| **summary** | Clinical documentation, patient communication, triage support, and health data analysis — with a focus on Australian health systems (Medicare, PBS, NDIS). |
| **group** | `Growing collections` |
| **order** | `9` |

#### Why Healthcare?

- **Australia-relevant:** Medicare, PBS, NDIS, TGA, AHPRA — uniquely Australian systems
- **High demand:** Healthcare is one of the fastest-growing areas for AI/LLM adoption
- **Rich examples:** Clinical note summarisation, patient discharge letters, medication interaction checks, NDIS plan summaries
- **Ethical weight:** Demonstrates responsible AI patterns (guardrails, human-in-the-loop) — ties directly to the learning path
- **Complementary:** Sits well alongside Marketing and Sales as a "real-world application" domain

#### Proposed content

```markdown
---
id: healthcare
title: Healthcare & Allied Health
summary: Clinical documentation, patient communication, triage support, and health data analysis for Australian health systems.
group: 'Growing collections'
order: 9
outcomes:
  - 'Summarised clinical notes and discharge letters'
  - 'Generated patient-friendly explanations of medical reports'
  - 'Structured triage data for clinical decision support'
featured_examples:
  - 'content-format-transformer'
featured_lessons:
  - 'prompt-engineering'
  - 'context-basics'
technologies:
  - 'LLM'
  - 'AI Agents'
evidence_projects:
  - 'https://github.com/vuhung16au/prompt-to-system'
status: 'draft'
last_verified: 2026-10-08
---

## Overview

Healthcare in Australia is increasingly supported by AI-driven tools for clinical documentation, patient communication, and data analysis. LLMs can summarise complex medical records, generate patient-friendly discharge summaries, and assist allied health professionals with report writing.

Australian health systems like Medicare, the Pharmaceutical Benefits Scheme (PBS), and the National Disability Insurance Scheme (NDIS) produce large volumes of structured and unstructured data. AI patterns from this learning path can be applied to streamline documentation while maintaining the strict accuracy and privacy requirements of healthcare.

## Best Practices

- Always include a human-in-the-loop for any clinical decision support.
- Never present AI-generated content as medical advice without clinician review.
- Use structured output formats (e.g., SOAP notes) to reduce hallucination risk.
- Reference Australian clinical guidelines (e.g., Therapeutic Guidelines, RACGP standards).
- Comply with the Australian Privacy Act 1988 and My Health Records Act 2012.
```

#### Alternative candidates considered

| Domain | Pros | Cons |
|---|---|---|
| **Legal & Compliance** | Australian-specific (Fair Work, ACCC, ASIC) | Overlaps with Career Development |
| **Agriculture & Resources** | Very Australian (mining, farming, BOM data) | Niche audience |
| **Government & Public Policy** | data.gov.au, APS frameworks | Narrow |

> **Recommendation:** Healthcare wins on breadth, Australian relevance, and ethical teaching opportunities.

---

## 11. Implementation Phases

### Phase 1 — Quick wins (1–2 days)

- [ ] Change `<html lang="en">` to `<html lang="en-AU">`
- [ ] Add favicon `<link>` to Layout.astro head
- [ ] Run AU spelling audit across all content files
- [ ] Add reading time badges to lesson cards
- [ ] Install `astro-icon` and replace inline SVGs in nav
- [ ] Create the `healthcare.md` domain file
- [ ] Add breadcrumbs to example and glossary detail pages

### Phase 2 — Colour & visual refresh (2–3 days)

- [ ] Implement the "Eucalyptus" colour scheme in `global.css`
- [ ] Design and implement custom favicon (boomerang-prompt)
- [ ] Add dark/light mode toggle to header
- [ ] Add code block language labels
- [ ] Add domain-specific icons to domain cards
- [ ] Add mobile hamburger menu

### Phase 3 — Content & Australian examples (3–5 days)

- [ ] Rewrite worked examples in lessons with Australian context
- [ ] Create 3–5 new Australian-themed examples (Medicare, bushfire, NAPLAN, etc.)
- [ ] Write Healthcare domain overview and best practices
- [ ] Add FAQ entries about Australian data and formats
- [ ] Update About page with Australian English note

### Phase 4 — UX enhancements (3–5 days)

- [ ] Implement progress tracking with `localStorage`
- [ ] Add related content sidebar to lesson detail pages
- [ ] Add collapsible sections to examples
- [ ] Add sticky Table of Contents for desktop
- [ ] Add scroll progress bar
- [ ] Add "Back to top" button
- [ ] Add diagrams to 5 key lessons (mermaid)
- [ ] Design 404 page illustration
- [ ] Add print stylesheet

---

> [!NOTE]
> This plan is designed to be tackled incrementally. Each phase delivers visible improvements independently. Phase 1 can be started immediately with no design dependencies.
