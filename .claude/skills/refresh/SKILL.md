---
name: refresh
description: Refresh one narrative (or "all") for new rounds, exits, people moves and catalysts since its as-of date. Triggered by the cockpit's Refresh button.
argument-hint: <narrative-id | all>
disable-model-invocation: true
---
Refresh $ARGUMENTS since its last as-of date.
1. Dispatch a researcher with the brief "new rounds, exits, licensing deals, people moves,
   policy events and readouts since <as-of>" for the cohort of $ARGUMENTS (≤15 searches each).
2. Verifier on new numbers; indexer ingest; rebuild; recompute metrics.
3. Report what moved: crowding, capital pools, priority rankings, signposts hit or missed.
For "all", batch five narratives per researcher run and stop at the spend ceiling.
