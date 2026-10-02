---
name: ingest
description: Ingest pending staging outputs into canonical data through the indexer.
argument-hint: [staging-path]
disable-model-invocation: true
---
Dispatch the indexer on: $ARGUMENTS
If no path was given, process every pending folder under data/staging/ oldest first, one batch
at a time. Report accepted, rejected and conflicting records per batch.
