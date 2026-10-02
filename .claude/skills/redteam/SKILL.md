---
name: redteam
description: Run the red-team protocol on one thesis. Triggered by the cockpit's Red-team button.
argument-hint: <narrative-id>
disable-model-invocation: true
---
Red-team $ARGUMENTS.
1. Dispatch the red-team subagent with docs/SPEC.md §3.6 and the canonical record.
2. If the verdict is "survives with revision", dispatch the populator to apply the revisions.
3. Dispatch the indexer, rebuild the bundle, and report the verdict, kill criteria and changes.
Stop after one verdict.
