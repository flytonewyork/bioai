# Horses module: handoff

As of 9 October 2026. Branch `claude/build-this-jpcibf`, draft pull request flytonewyork/bioai#1.
Build spec: "Horse ranking module: build spec" (9 Oct 2026). It is not in the repo; paste it into
the new session if the agent needs it.

## Pick up on the Mac mini

```sh
git clone https://github.com/flytonewyork/bioai.git && cd bioai
git checkout claude/build-this-jpcibf
node --test committee/engine.test.mjs        # expect 8 of 8 passing (Node 22)
```

Then start Claude Code in the repo root and paste the "Prompt for the new session" below.

## Where things stand

| Piece | State |
| --- | --- |
| `committee/index.html` | Committee page with the horses module built in (155 kB). **Not yet republished.** |
| `committee/engine.test.mjs` + `data/fixtures/horse-engine.json` | Engine tests on fake data: acceptance tests 1, 2 and 3, and the hashing half of test 5. Passing. |
| `committee/seed/horses-seed-2026-10-09.json` | One batch of 45 writes: 14 entities, 18 evidence records, 12 horse shells, and `horse_rubric` plus `engine_params` merged into `meta/config`. **Not yet applied.** |
| Live artifact | https://claude.ai/artifact/PyaMhGie2hMvwT4wiiUzVr. When this was written it held 31 entities and 54 evidence records, and `meta/config` was at version 1. |

## Remaining steps, in order

1. **Seed the database.** Apply `committee/seed/horses-seed-2026-10-09.json` with the ArtifactData
   `batch` action against the artifact URL. Read `meta/config` first. If its version is no longer 1,
   change the `if_version` on the last entry (the `meta/config` update) to the current version. All
   other entries create new documents. Check first that none of these ids already exist:
   `x-genfleet`, `x-verastem`, `x-akeso`, `x-summit`, `x-kelun`, `x-merck`, `x-joyo`, `x-erasca`,
   `x-hengrui`, `x-revmed`, `x-3sbio`, `x-pfizer`, `x-lanova`, `x-bms`.
2. **Republish the page.** Read the live artifact first with the Artifact tool's `read` action. If it
   changed after 9 Oct (version `1790494146-413d`), merge those changes into `committee/index.html`.
   Then publish to the same URL and keep the declared capabilities: db, downloads, mcp (PubMed) and
   sample.
3. **Run the remaining acceptance tests in the browser:**
   - Test 4: a snapshot reloads with identical numbers, and history lines appear only on horses
     that moved.
   - Test 5: freeze a call, then run `shasum -a 256` on the downloaded JSON; it must match the stored
     hash.
   - Test 6: Theses, Evidence and Landscape behave as before, and the landscape shows 45 entities.
   - Test 7: at phone width the Horses table scrolls inside its own box.
4. **Set up Paperclip** (research API). See the next section.
5. Tick the build-plan dates in the spec (Oct 10 to Oct 16). TT-001 is due to be frozen on 13 Oct,
   ahead of the Verastem update on 14 Oct.

## Paperclip

Install it in Terminal yourself, not inside Claude Code, because it needs a browser sign-in:

```sh
curl -fsSL https://paperclip.gxl.ai/install.sh | bash   # script read on 9 Oct; it installs to ~/.paperclip and ~/.local/bin
paperclip install                                       # sets Paperclip up for Claude Code
```

- The command line also accepts `PAPERCLIP_API_KEY` for sign-in without a browser.
- The committee page cannot call a program on the Mac. To use Paperclip from inside the page, it
  needs a hosted Paperclip MCP server added as a connector in claude.ai Settings → Connectors. The
  page then declares it the way it declares PubMed. Whether Paperclip runs such a server is not yet
  confirmed. Check before building a connector of our own.

## Calls for Thomas to confirm

- **Track rule.** "Track when two thresholds hold or access is missing" is implemented as: Track when
  at least two of P ≥ 0.60, V ≥ 2 and L ≥ 2 hold; Back needs all three plus access = yes; Drop
  otherwise.
- **Value gap.** With only A or C citations, value gap is capped at 1 (2 or 3 needs a B or D
  citation).
- **No citation.** An uncited score is 0 on all seven tests, not only tests 1 to 5.
- **Access.** Access is exempt from the change rule and the tier caps.
- **Outreach template.** The five-part template is a placeholder. Put the real one in
  `meta/config.outreach_template` as five `{part, text}` entries; text placeholders such as
  `{why_you}` and `{scorecard}` get filled in.
- **Seed content.** Seed evidence claims are the spec's short forms, flagged "check against the
  source". Horse lanes other than RAS come from public knowledge; LM-350's lane is blank.
  Catalyst dates are unknown except GFH375 (14 Oct).

## Prompt for the new session

> Continue the horses module on branch `claude/build-this-jpcibf`. Read `committee/HANDOFF.md`
> first, then do remaining steps 1 to 3 in order and stop before step 4. Budget: one session.
> Stop if the live artifact differs from the 9 Oct version in a way that conflicts with the module,
> and report it.
