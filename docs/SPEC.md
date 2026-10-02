# Bio×AI VC Thesis Cockpit — specification

As of 2 Oct 2026. Read with CLAUDE.md (rules), DECISIONS.md (choices) and NARRATIVES.md
(catalogue). When this spec and DECISIONS.md disagree, DECISIONS.md wins.

## 1. Purpose and audience

A reusable, evidence-backed way to present any bio/health venture thesis to investors, with an
interactive cockpit Thomas can screen-share in meetings. Audiences: generalist tech VCs,
biotech specialist VCs, pharma BD. Every thesis must answer, on screen and in under a minute
each:

1. What is the claim, and is it consensus, non-consensus or contrarian?
2. Where is the arbitrage?
3. How crowded is it?
4. How much money is already in and waiting for an exit, and how much is up for grabs?
5. Who should be called first if it is investable?
6. How long to liquidity, and what breaks it?
7. Why now: which trends make it timely, and does the napkin math say it is worth it?
8. What business model captures the value?

## 2. The thesis spine (twelve sections)

| # | Section | Question it answers |
|---|---|---|
| 1 | Claim and verdict | One sentence; consensus / non-consensus / contrarian |
| 2 | Why-now lattice | Which trend clocks make it timely, how, and when (§3.7) |
| 3 | Position | Stack layer × evidence maturity (plate coordinates) |
| 4 | Money in | Rounds, leads, capital tribe, valuations, step-ups |
| 5 | Value out | Exits, cash vs headline, comps, time to liquidity |
| 6 | Evidence | Proof points, base rates, benchmark quality, confidence |
| 7 | People | Investors, operators, pharma buyers, regulators |
| 8 | Counter-case | Strongest counterargument, numeric falsifier |
| 9 | Signposts | Catalyst calendar for the next 24 months |
| 10 | Expression and asymmetry | How to invest; where price and evidence diverge; the ask |
| 11 | Business model | Who pays whom, revenue unit, margins, capital intensity (§3.8) |
| 12 | Napkin math and theorycraft | Back-of-envelope value, sensitivity, bear/base/bull, what must be true (§3.9) |

Presentation rules: lead with the conclusion; one number per screen; always show price against
evidence; speak in VC units (entry price, step-up, time to liquidity, exit comps); state the
consensus before the difference; every number carries a source badge and as-of date.

Stack layers (x): Compute, Data, Models, Agents, Automation, Software, Drug assets, Trust.
Evidence maturity (y): 0 concept, 1 funded build, 2 technical proof, 3 external validation,
4 outcome proof, 5 at scale.

## 3. Signature metrics

Numbers are computed by deterministic scripts in `scripts/metrics/` from canonical data and
`data/assumptions.json`. LLM agents supply inputs and narrative; they never compute aggregates
in prose. Every metric shows its inputs on hover and a data-coverage figure.

### 3.1 Arbitrage — "where's the arbitrage"

Types (multi-select): price–evidence, capital-stack (tech-VC platform pricing vs pharma asset
pricing), geographic (cost and speed vs US exit pricing), layer (value capture mispriced
across the stack), regulatory (pathway or timing advantage), information (validation or
credibility asymmetry), structural (deal terms: upfront vs headline, subscription vs milestone).

Statement template, mandatory for Tier A and S:
"Buy {what} from {whom} at {price or cost}; it is worth {exit price or comps} to {buyer} because
{reason}; the spread closes when {signpost}."

Spread: when both sides have sourced numbers, show buy reference, sell reference and the ratio.
Otherwise show the statement without a ratio and mark `qualitative`.

Score anchors: 1 no visible spread or fully priced; 3 spread visible but contested or closing;
5 large, persistent spread with a credible closing mechanism inside three years.

### 3.2 Crowding index — "how crowded"

Inputs per thesis, trailing 24 months unless noted: active funded companies; rounds; disclosed
capital raised; distinct lead investors; rounds led by tech price-setters (list in
`data/assumptions.json`); median valuation step-up (needs ≥3 pairs); pharma deals.
Computation: percentile-rank each input across all theses, average the available ranks, map to
1–5 by quintile. If fewer than half the inputs are known, display "insufficient data" instead
of a number. Show top-3 capital concentration separately as a concentration flag.

### 3.3 Capital pools — "money in vs up for grabs"

Locked in, awaiting exit: Σ disclosed capital raised by private, non-exited cohort companies,
and Σ latest disclosed post-money marks. Low = disclosed only; high = disclosed plus an
estimate for undisclosed rounds (count × median disclosed round size at that stage in the
cohort).

Up for grabs, next 24 months — low / base / high, components shown separately, never collapsed:
- Pipeline rounds: reported or announced-unclosed rounds × probability (assumption).
- Replacement financing: companies whose last disclosed round is >18 months old × median round
  size for their stage.
- Buyer demand: trailing-24-month pharma upfronts plus M&A consideration in the thesis × run-rate
  factors (assumptions; defaults 0.5 / 1.0 / 1.5).
- Public window: trailing-12-month IPO proceeds in the thesis × factor.

Exit capacity: disclosed prices paid in the thesis or nearest analogue (median and range) and
the top acquirers. Time to liquidity: median years from first institutional round to IPO or
M&A for exited cohort companies; fewer than three exits → "not yet observed" plus the nearest
analogue.

Every assumption in `data/assumptions.json` has a rationale and a source. Changing an assumption
needs Thomas's approval at a gate.

### 3.4 Reach-out priority — "who to call first"

For each person linked to the thesis from public sources:
involvement 0–3 (led a round, board seat, founder, signed a deal in cohort companies) +
centrality 0–3 (number of cohort companies connected) + decision power 0–2 (partner, MD,
C-suite, BD head = 2; principal or director = 1) + recency 0–1 (activity in the last 12 months)
+ reachability 0–1 (public-facing: speaks, writes, conference listings) = priority out of 10.
Show the components. Top five become "first calls", each with a one-line reason and a public
source. No contact details are stored. `warm_route` exists in the schema, is null by default,
and is never rendered in present mode.

### 3.5 Scores (1–5, each with a one-line note; no composite)

Maturity, consensus (1 consensus → 5 contrarian), evidence quality, capital intensity, arbitrage,
crowding (computed), policy sensitivity, investability (1 no accessible expression → 5 several:
open private rounds, public tickers, NewCo formation). Tier S selection ranks by
arbitrage × investability.

### 3.6 Red-team protocol (Tier S)

Attack with: base rates; the strongest counter-evidence; an alternative explanation for the
same facts; who loses if the thesis is true and how they respond; kill criteria. Verdict:
survives / survives with revision / fails. The red team writes to staging only; the populator
applies revisions; the indexer merges. A thesis that fails keeps its page with the verdict
shown.

### 3.7 Why-now lattice

A shared registry of trend clocks in `data/trends/`, seeded from seed/lattice-and-models.md.
Families: AI and compute rollout, model maturity, wet lab to clinic, deal cycles and
seasonality, regulatory, consumer, pharma, funding, geopolitics. Each clock: metric, latest
reading with source and as-of, direction (accelerating / steady / decelerating / reversing),
continuation assumption (what we assume keeps happening, until when), break signals, and a
series where one exists.

Each thesis links 3–6 drivers: {trend_id, mechanism (one sentence on how the trend makes the
thesis timely), timing (when it bites), napkin input it moves}. Theorycrafting means layering
these drivers: the lattice shows every family across 2020–2028 with the thesis's drivers lit.
The deal-cycle clock (JPM in January, AACR, ASCO, BIO, ESMO, year-end) is used to time
catalysts and outreach.

### 3.8 Business models

Archetype registry in `data/registries/business-models.json`: asset-centric, platform
partnering, software/subscription, dedicated-model licensing, data licensing, services and
automation, NewCo arbitrage, care delivery and consumer, tools and instruments. Each archetype:
who pays, revenue unit, gross-margin range, capital intensity, time to first revenue, usual exit
path, public comps — sourced or labelled assumption. Each thesis picks its archetype(s), fills
known unit economics, and the UI draws a who-pays-whom flow.

### 3.9 Napkin math and theorycraft

Each Tier A/S thesis carries 1–3 napkin calculations: a formula over named inputs, each with
low / base / high and either a source or an explicit, labelled assumption. One pinned expression
evaluator runs the formulas in scripts and in the browser; results are never computed in prose.
Show low / base / high and a sensitivity bar ranking which input moves the result most.

Theorycraft: three scenarios (bear, base, bull) built by moving linked lattice drivers, each
mapped to napkin inputs; present mode shows the three outcomes; explore mode exposes sliders for
live what-ifs, labelled illustrative. Add a "what must be true" list: the three conditions the
bull case needs.

## 4. Data model

Entities (Zod schemas in `app/src/schema/`, shared by scripts):
- Source {id, url, publisher, title, date, tier: primary|tier1|secondary|low, paywalled, accessed}
- Claim {id, subject_id, field, value, unit, as_of, source_ids[], confidence H|M|L,
  conflict_note?, verified: verified|unverified|failed, verified_at?}
- Company {id, name, aliases[], hq, geography, layer, maturity_history[], status
  (private|public|acquired|defunct), narratives[], theses[]}
- Investor {id, name, type (tech_vc|techbio_vc|bio_builder|crossover|pharma_cvc|strategic_cvc|
  frontier_lab|sovereign_pension|government), hq, funds[]}
- Person {id, name, org_id, role, role_type, involvement[{company_id, kind, source_id}],
  warm_route: null}
- Deal {id, type (round|ipo|mna|licence|collaboration|secondary), date, company_id,
  counterparty_ids[], amount_headline, amount_upfront, valuation_pre, valuation_post, lead_ids[],
  participant_ids[], source_ids[]}
- Event {id, date, kind (catalyst|milestone|policy|readout), subject_ids[], description,
  status (past|expected), stated_by}
- Trend {id, family, metric, reading{value, unit, as_of, source_id}, direction, continuation,
  break_signals[], series[]}
- BusinessModel {id, archetype, who_pays, revenue_unit, gross_margin_range, capital_intensity,
  time_to_revenue, exit_path, comps[], source_ids[]}
- Thesis {id (catalogue ID), title, claim, tag (TS|NO|CO), domain, tier (S|A|B), spine{…twelve
  sections…}, arbitrage{types[], statement, spread{buy, sell, ratio}}, lattice_links[{trend_id,
  mechanism, timing, moves_input}], business_model{archetypes[], unit_economics, flow[]},
  napkin[{id, label, formula, inputs[{name, low, base, high, unit, source_id | assumption}]}],
  scenarios[{name, driver_settings, outcome}], what_must_be_true[], scores{…}, red_team?,
  angle?, ask?, status}

IDs are kebab-case slugs; narratives use catalogue IDs (F4, B3…). Facts live in Claims;
entities reference claim IDs. Computed metrics live in `data/computed/` with an inputs hash.

Layout:
```
app/                      ui-builder only
data/canonical/           indexer only (one writer, lock file data/.lock)
data/staging/<agent>/<run-id>/   every other agent
data/staging/_rejected/   indexer rejects with reasons
data/computed/            metrics output (scripts only)
data/trends/              trend clocks (via indexer)
data/registries/          business-model archetypes (via indexer)
data/assumptions.json     gate-approved changes only
data/fixtures/            fake data for tests
scripts/                  indexer CLI, metrics, bundle build (frozen after Phase 0)
ops/plan.md ops/runlog.md ops/gates/ ops/qa/ ops/queue/
```

## 5. Cockpit

Views:
- **Board — "Hunting ground".** All 70 narratives: x = crowding, y = arbitrage, bubble = capital
  locked in (log), colour = domain, ring = tier. Quadrants: Hunting ground (high arbitrage, low
  crowding), Crowded trade, Quiet for a reason, Priced in. Filters: domain, tier, tag, consensus.
- **Thesis.** The twelve-section spine as one scrolling page with a sticky score strip.
- **Lattice.** Every trend clock by family across 2020–2028; select a thesis to light its drivers.
- **Present.** Seven-slide deck per thesis; a meeting builder to pick and order theses.
- **Library.** Companies, investors, people and deals tables with entity cards.
- **About.** Method, metric definitions, as-of date, disclosure (built with Claude; Anthropic is
  a participant, relevant to C1).

Reusable components: ScoreStrip, Plate (with time-lapse), MoneyStrip (in vs out), SpreadBar,
CrowdingMeter + Swarm, Reservoirs, CompsStrip, OrbitMap, CatalystRunway, EvidenceLedger,
DealTimeline, CompanyCard, PersonCard, RedTeamPanel, SourceBadge, ActionBar, LatticeGrid,
ModelFlow, NapkinTape, SensitivityBars, ScenarioSliders.

Visual language: reuse the reference's tokens, typography (Instrument Sans, condensed display
cuts) and light/dark theming. The plate is the signature element; keep everything else quiet.
Motion: one orchestrated entrance per slide, user-triggered transitions elsewhere; vocabulary =
fill (scores, reservoirs), grow (swarm), sweep (time-lapse, meter), orbit (people), spread
(arbitrage), ignite (lattice drivers light in sequence), tally (napkin terms multiply into the
result). `prefers-reduced-motion` renders end states. Colour is never the only carrier of
meaning. Unverified numbers show a hollow badge and are excluded from present mode.

Agent action buttons (ActionBar on thesis, company and person; hidden in present mode, `A`
toggles): Deepen, Red-team, Refresh, Find people, Verify, Promote, Theorycraft, Refresh trends. Each button copies the
slash command (`/deepen F4`, `/redteam B3`, `/people J3`…) to the clipboard, appends the task
to a local queue (localStorage), and shows a confirmation. "Export queue" downloads
`queue.json`; `/queue` processes `ops/queue/queue.json`. No backend.

## 6. Present mode

Per thesis, eight core slides; keys: ←/→ navigate, D drill-down, N notes, T tribe variant,
M "my angle", K "the ask", B business model, P napkin math, Esc exit. Works offline from the
static build.

1. **The claim** — claim, verdict, tag, score bars fill in, one-number hook.
2. **Why now** — lattice grid; this thesis's drivers ignite in sequence with mechanism and
   timing; next seasonal window on the deal calendar.
3. **Where it sits** — plate time-lapse 2020 → as-of for the cohort; others dimmed.
4. **Where's the arbitrage** — buy and sell bars animate apart; the statement; type chips.
   Drill-down B: business-model flow (who pays whom).
5. **How crowded** — meter sweeps to the index; company swarm grows year by year; concentration
   ring; count of lead investors.
6. **The money** — two reservoirs fill to low → base → high (locked in; up for grabs); exits and
   comps strip; time to liquidity. Drill-down P: napkin tape tallies, sensitivity bars, bear /
   base / bull.
7. **Who to call first** — orbit map fills inner ring to outer; five cards with reason and
   source.
8. **What breaks it** — red-team verdict, falsifiers, what must be true, catalyst runway for the
   next 24 months.

Presenter notes per slide: the one sentence to say, the number to land, the likely objection.

## 7. Workflow (dynamic)

The main session is the orchestrator. Loop per wave: plan → dispatch subagents (≤ concurrency
in KICKOFF.md) → indexer ingests each output serially → metrics recompute → measure coverage and
verifier pass rate → re-plan. Log every wave in `ops/runlog.md` (agents, searches, duration,
spend if visible, records accepted and rejected, pass rate).

- **Phase 0 — scaffold.** Repo, pinned dependencies, schemas, fixtures, indexer CLI, metrics
  scripts, bundle build, app shell rendering fixtures; tests pass on fakes. Infra freezes here.
- **Phase 1 — thin slice.** Ingest `seed/` through staging. Take F4 (China asset → US NewCo →
  IPO) to Tier S end to end: spine, all metrics, lattice links, business model, one napkin
  calculation with scenarios, people orbit, red team, eight slides. Measure
  time, searches, spend and verifier pass rate. **Gate 1.**
- **Phase 2 — research waves.** Researchers run W3 Asia/HK bridge, W9 red team and base rates,
  W10 public comps, W12 why-now lattice (trend clocks) and W13 business-model archetypes first;
  then W4 company map, W5 pharma, W6 regulatory and policy, W7 AI labs and compute, W8
  longevity/prevention/clinic, W11 people expansion. Propose the final Tier S list. **Gate 2.**
- **Phase 3 — population.** Tier B cards for all 70 (batches of five per populator run); compute
  metrics; rank; promote to Tier A as budget allows; verifier pass on every present-mode number;
  red team on Tier S.
- **Phase 4 — wire and polish.** Board, thesis pages, present decks for Tier S and A, Library,
  ActionBar, visual QA screenshots, final verifier sweep. **Gate 3.**

Adaptive rules: verifier pass rate <80% in a wave → pause and report. If a fix needs a fix, stop
and reassess. At 80% of the spend ceiling → stop at the next gate.

## 8. Agent budgets and stop rules

| Agent | Web searches | maxTurns | Stops when |
|---|---|---|---|
| researcher | ≤40 per workstream (W12 ≤60) | 60 | Required outputs written or marked unknown |
| populator | Tier B ≤8 per narrative; Tier A ≤25 per thesis | 60 | Every spine field filled or unknown |
| verifier | ≤3 lookups per number | 80 | Every assigned number verified, failed or unverified |
| red-team | ≤15 per thesis | 40 | Verdict and kill criteria written |
| indexer | none | 40 per run | Staging batch merged or rejected with reasons |
| ui-builder | docs only | 80 | Assigned components pass tests and QA notes |
| visual-qa | none | 30 | Screenshot set captured and issues listed |

Never invent a number. Unknown is a valid answer. Escalate unresolved source conflicts to the
orchestrator instead of picking one.

## 9. Gate report (ops/gates/gate-N.md)

What was built; screenshots (light and dark, 1920×1080 and 390×844); coverage (theses by tier,
fields filled, unknowns); verifier pass rate; rejected records; spend and time; decisions
needed from Thomas; recommended next step; top risks. Print a ten-line summary and wait for "go".

## 10. Definition of done

- All 70 narratives at Tier B or better, each with crowding (or "insufficient data"), capital
  pool ranges (or unknown), ≥3 companies, ≥1 person, sources.
- Ten Tier S theses with full spine, red team and eight-slide deck; Tier A target 20.
- Trend registry: ≥25 clocks, each with a sourced latest reading; business-model registry
  complete. Tier A/S: business model, ≥1 napkin calculation with sensitivity, three scenarios,
  what must be true. Tier B: archetype and ≥2 lattice links.
- Every number in present mode verified, or excluded.
- Board, Thesis, Present, Library and About views run offline from the static export.
- ActionBar copies commands and queues tasks; `/queue` processes them.
- Screenshot set reviewed at Gate 3; run log complete with spend and time per phase.

## 11. Deferred to v2

Side-by-side compare; full network graph; scheduled refresh; hosted deployment with auth;
separate decks per tribe; returns modelling; warm-route overlay.
