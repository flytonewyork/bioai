---
name: verify
description: Re-verify every number and role shown for one thesis. Triggered by the cockpit's Verify button.
argument-hint: <narrative-id>
disable-model-invocation: true
---
Verify $ARGUMENTS.
1. List every claim rendered on the thesis page and its present deck.
2. Dispatch the verifier on all of them; indexer ingest; rebuild.
3. Report the pass rate and anything now excluded from present mode.
