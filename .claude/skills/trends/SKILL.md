---
name: trends
description: Refresh the why-now lattice — update readings, direction and break signals for trend clocks. Triggered by the cockpit's Refresh trends button.
argument-hint: [family | trend-id | all]
disable-model-invocation: true
---
Refresh trend clocks: $ARGUMENTS (if empty, all clocks older than 60 days).
1. Dispatch a researcher (≤3 searches per clock) for the latest reading, direction and any break
   signal, with sources.
2. Verifier on new readings; indexer ingest; rebuild.
3. Report clocks whose direction changed and the theses linked to them.
