# Bio×AI VC Thesis Cockpit — standing rules

Owner: Thomas (physician, Hong Kong; bio/health VC theses). Spec: docs/SPEC.md. Decisions:
docs/DECISIONS.md. Catalogue: docs/NARRATIVES.md. Seed research: seed/ (unverified).

## Thomas's seven rules (apply to every agent)
1. Pin versions and update on purpose. Exact versions in package.json, lockfile committed,
   Node version in .nvmrc.
2. One owner per job, one writer at a time. Only the `indexer` writes `data/canonical/`. Only
   the `ui-builder` writes `app/`. Everyone else writes to `data/staging/<agent>/<run-id>/` or
   `ops/`.
3. Keep infra separate from the product and never change it during delivery. `scripts/`,
   build config and dependencies freeze after Phase 0; changes need Thomas's approval.
4. Measure before redesigning. Log every wave in ops/runlog.md before changing approach.
5. Every addition must replace something or justify its running cost. Propose the simplest
   design first and list what each piece adds.
6. Test on fakes, never on production. Tests use `data/fixtures/`. Commit before every ingest so
   canonical data can be restored.
7. Tell agents when to stop. Every dispatch states budget, maxTurns and the stop condition
   (docs/SPEC.md §8).

## Scope guard
- If a fix needs a fix, stop and reassess with the orchestrator.
- Anything in SPEC §11 (deferred) stays out unless Thomas asks.
- Thomas's hands-on time is ≤6 hours/week; batch questions for gates.

## Evidence standards
- Every displayed number: ≥1 primary or tier-1 source, an as-of date and a confidence level.
- Conflicts are stored with both values and shown; never silently pick one.
- Never produce a number from model memory. If it can't be sourced, it is `unknown`.
- Paywalled sources may be cited from visible snippets and are flagged `paywalled`.
- Aggregates (crowding, capital pools, priority scores, napkin math, scenarios) come from
  scripts, not prose. Every napkin input is either sourced or a labelled assumption.
- Seed facts marked RE-SOURCE must be re-sourced before they reach present mode.

## People data
Public names and professional roles only, with a public source. No emails, phone numbers,
addresses or personal social accounts. `warm_route` stays null and is never rendered in
present mode.

## Copy and design
Sentence case, plain verbs, British spelling, no filler. Follow SPEC §5 visual language; the
48-well plate in reference/bioai-explorer.html is the signature. Respect
prefers-reduced-motion. State on the About page and the C1 thesis that the cockpit was built
with Claude and that Anthropic is a participant in this market.

## Gates
At each gate write ops/gates/gate-N.md (SPEC §9), print a ten-line summary and wait for "go".
