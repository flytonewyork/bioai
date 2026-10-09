# GFH375 / VS-7375: Paperclip evidence run, 9 October 2026

Staging only. Nothing here has been written to the committee database or reviewed by Thomas.

## What is here
- `evidence-batch.json`: 41 evidence records for `h-gfh375`, in the same `{op, collection, doc_id, data}` shape as
  `committee/seed/horses-seed-2026-10-09.json`. Tiers: 16 A and 25 C. Stance: 10 for, 16 against, 15 context.
  The page has no field for stance, so each record's `notes` starts with it.
- `raw/`: the four research agents' outputs, the shared brief, and the quote checker (`verify.py`, `pin.py`).

## How it was checked
Every quote was re-read from Paperclip by script (`raw/verify.py`). Each one appears word for word (ignoring
whitespace) on the cited Paperclip lines. Three pinpoints were wrong and are now corrected. Duplicates were merged
(45 records became 41). Tiers follow the page's own rules: A for peer-reviewed results, labels and regulatory
decisions; C for abstracts, registry entries and commentaries.

## Proposed scores (Thomas decides; all are within the page's tier caps)
| Test | Proposed | Why, in one line | What would raise it |
|---|---|---|---|
| Mechanism | 2 | RAS inhibition is validated as a class (FDA G12C labels, including the CodeBreaK 300 RCT). No G12D-selective drug is approved yet; NEJM 2026 says so. | A peer-reviewed or FDA source for daraxonrasib; any approved or RCT-validated G12D drug |
| Exposure | 1 | Only China data can be read (ASCO 2025, 32 patients). Verastem is still testing both 600 and 900 mg, so the dose is unsettled. | Verastem ex-China ORR, PK and safety at a chosen dose |
| Comparator | 1 | Daraxonrasib is reported as the new second-line pancreatic standard (OS 13.2 vs 6.6 months, HR 0.40). G12D rivals show 37 to 61% response rates. No GFH375 efficacy data were found. | GFH375 response data that beat zoldonrasib or HRS-4642; a design against daraxonrasib |
| Population | 2 | The G12D share in pancreatic cancer is similar in China and the West (about 41 to 48%). Lung cancer mix, Western prior therapy and PK are not shown. | Efficacy and PK in US or EU patients; a multiregional trial with ethnic subgroups |
| Design | 1 | Both randomised trials found (pancreatic vs chemotherapy, NCT07262567; lung vs docetaxel, NCT07668752) are GenFleet's. No countries are listed. Verastem's studies are single-arm Phase 1/2 and Phase 2. NCT07026916 is withdrawn. | Countries for NCT07262567; a Verastem randomised Phase 3; a dose-optimisation cohort; FDA designations |
| Value gap | none | Paperclip has no SEC filings, so no deal terms could be read. | Verastem 8-K/10-K licence terms and Western comparable deals, taken from EDGAR directly |
| Leverage, Access | none | These depend on Thomas's own position and contacts, so they were not researched. | Thomas |

## Seed claims ("check against the source")
- `e-rasolute302-2026`: **confirmed**, from a peer-reviewed review (PMC13453085), not the primary paper. HR 0.40 holds
  in both the RAS G12 group and the overall population.
- `e-genfleet-kylin-wings-2025`: **correct with changes**. The Phase 3 against chemotherapy exists (NCT07262567,
  recruiting since 4 December 2025), but the registry text names neither GenFleet nor "KYLIN-WINGS".
- `e-gfh375-china-2025` (41% at 600 mg, n=66): **source not found**. A 2026 meta-analysis (PMC13103443) lists the
  China Phase I/IIa as 66 patients, which supports the n but not the 41%.
- `e-verastem-jun2026` (900 mg separates; CA19-9 13 of 14): **source not found**. It is probably a Verastem deck,
  which Paperclip does not index. Do not use it to support a score until the deck has been read.

## Gaps to close before the 14 October Verastem update
- Verastem's own data and its EDGAR filings (deal terms, which are what the value gap needs).
- Trial countries for the GenFleet randomised studies.
- The primary RASolute 302 paper or the FDA daraxonrasib decision (needed to move mechanism to 3 on tier A).
- Ethnic PK data for any KRAS inhibitor. One search hit Paperclip's rate limit and was not repeated.
