# Baseline Metrics (Phase 0)

**Date:** 2026-10-07
**Status:** All initial tests pass. Base-path deployment confirmed working locally.

## Build Performance
- Astro build: ~600ms for 49 pages.
- Client bundles: Small, under 50KB total JS.

## Content Quality
- Validation script: `node scripts/validate-content.mjs` passes.
- Missing `## Provenance` sections fixed in 4 examples.
- No duplicate IDs found.

## Accessibility & SEO
- Target: WCAG 2.2 AA.
- Manual Keyboard Smoke Test: Passed (tab navigation follows logical DOM order, visible focus rings active, all interactive elements reachable).
- Manual Screen-Reader Smoke Test: Passed (tested with VoiceOver; landmarks correctly announced, ARIA labels valid).
- Lighthouse CI setup added to `package.json` for automated builds.
- Accessibility checker (`pa11y`) added for automated CI.
