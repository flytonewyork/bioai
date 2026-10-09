# Shared brief: GFH375 / VS-7375 evidence run (9 Oct 2026)

Horse: h-gfh375, "GFH375 / VS-7375", lane RAS. Originator GenFleet (x-genfleet), licensee Verastem (x-verastem).
GenFleet keeps mainland China, HK, Macau, Taiwan. Next catalyst: Verastem update 2026-10-14.

## Tool
Use the Paperclip CLI: `~/.local/bin/paperclip`. It needs network, so run every paperclip Bash call with
dangerouslyDisableSandbox: true. Run `~/.local/bin/paperclip skill` once for the command guide.
Useful: `paperclip search -s pmc,biorxiv,medrxiv,abstracts "q"`, `-s trials` / `-s trials/us` / `-s trials/cn`,
`-s fda`, `paperclip cat /papers/<id>/meta.json`, `paperclip grep "term" /papers/<id>/content.lines`,
`paperclip skill sec` for SEC filings if relevant. Do NOT create paperclip repos.

## Rules (the repo's evidence standards)
- Never produce a fact from memory. Every record must rest on text you actually read via Paperclip.
- `quote`: verbatim from the source, <= 40 words, copied exactly (it will be machine-checked against the source).
- If you cannot find support, say so in `gaps` -- a clear unknown beats a plausible invention.
- Search as hard for evidence AGAINST the horse as for it; mark such records `"stance": "against"`.
- Tiers: A = peer-reviewed result, clinical guideline, regulatory decision. B = audited/filed financials, disclosed
  transactions (e.g. SEC 8-K/10-K deal terms). C = company statements, preprints, conference abstracts, trial-registry
  entries, trade press. D = funding rounds, valuations.
- Rubric (score 0-3):
  mechanism: Is the mechanism or its class validated in patients? 3 = class validated by RCT or regulatory approval.
  exposure: Activity/exposure outside China at the dose that will be registered? 1 = China-only or dose unsettled; 2 = early ex-China data same way; 3 = ex-China consistent with China at chosen dose.
  comparator: Will it beat the standard of care that exists at launch? 0 inferior .. 3 clear advantage.
  population: Will trial population translate to Western patients (biomarker mix, prior therapy, ethnicity)? 1 unknown, 2 plausible with gaps, 3 shown.
  design: Global development design credible to FDA (MRCT, dose optimisation, comparator)? 1 China-led with gaps, 2 MRCT plan minor gaps, 3 aligned with FDA guidance and under way.
  value_gap: How far below Western comparables is the asset priced? Needs B or D evidence for 2-3.
- Tier caps: mechanism/exposure/comparator/population/design need A or B for 3, C for 2. value_gap needs B or D for 2-3.

## Deliverable
Write ONE JSON file at the path your task names, shape:
{
 "tests": ["..."],
 "records": [ { "doc_id": "e-gfh375-<short-slug>", "claim": "one plain sentence, no more than the quote supports",
   "quote": "verbatim", "source": "Authors/Org, Title, Journal or registry, date", "url": "primary URL (DOI/NCT/SEC)",
   "paperclip": {"path": "/papers/<id>/content.lines or /trials/<id>/...", "lines": "L12-L14"},
   "tier": "A|B|C|D", "domain": "clinical|regulatory|company|market|technical", "date": "YYYY[-MM[-DD]]",
   "stance": "for|against|context", "tests": ["..."] } ],
 "proposed_scores": { "<test>": {"score": n, "cites": ["doc_id", ...], "why": "2 sentences", "what_would_raise_it": "..."} },
 "gaps": ["what you looked for and could not find"]
}
Then reply with a <= 15 line summary. Budget ~25 tool calls; stop when the tests are covered or the budget is spent.
