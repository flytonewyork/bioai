---
name: people
description: Expand and re-rank the "who to call first" map for one thesis. Triggered by the cockpit's Find people button.
argument-hint: <narrative-id>
disable-model-invocation: true
---
Find people for $ARGUMENTS.
1. Dispatch a researcher (≤20 searches) for lead partners, board members, founders, pharma BD and
   AI heads, frontier-lab leads, regulators and bankers tied to the cohort, from public sources.
2. Verifier confirms each person's current role. No contact details.
3. Indexer ingest; recompute reach-out priority; report the new top five with reasons.
