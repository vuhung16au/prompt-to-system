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

## Accessibility & SEO (Placeholder)
- Target: WCAG 2.2 AA.
- Lighthouse scores pending full CI setup.
