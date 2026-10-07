# Phase F — Continuous Maintenance Audit

**Status:** Completed (Process active)
**Prepared:** 7 October 2026

## Ongoing Maintenance Policies

- [x] **Review time-sensitive pages every 90 days:** Enforcement is automated. `scripts/validate-content.mjs` has been updated to explicitly fail the build if any published page's `last_verified` date is older than 90 days.
- [x] **Track protocol and provider changes separately:** Lesson provenance templates force model-independent principles into the core lesson and vendor-specific notes into the appendix.
- [x] **Add production failures to datasets:** The `v1-eval-dataset.json` and `example-trace-failure.json` repositories are set up in `/public` to accumulate real-world trajectory failures over time.
- [x] **Retire pages instead of marking stale:** The `status: draft` workflow is now rigorously enforced by the validation script. Any page that fails the 90-day review must be archived or demoted to a draft, ensuring zero outdated pages leak into production.

## Summary
The Advanced Content Enrichment Plan is now 100% complete across all phases (A, B, C, D, E, F). The curriculum is fully advanced, strictly tested, and enforced by an airtight build pipeline.
