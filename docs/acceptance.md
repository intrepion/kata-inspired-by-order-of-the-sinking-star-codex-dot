# Acceptance evidence

## Compulsory swap correction — 2026-10-16

Root cause: Seer movement and swapping were separate code paths, selected by an optional cast argument, Space modifier, or UI toggle. Direction input now searches first and must swap with the nearest visible crystal or inactive hero. Walls stop the search; without a target, the Seer attempts an ordinary one-tile walk. The optional action, modifier and toggle have been removed.

Chrome on the user's Mac, local preview at http://127.0.0.1:5217. Each passage below was re-solved through normal keyboard presses or visible direction buttons, with visible “Passage complete.” confirmation. No programmatic game-state changes or solve hooks were used.

| Passage | Replayed moves | Observed browser result |
|---|---:|---|
| The first obstruction | 5 | Keyboard push, exit completion passed |
| The reluctant companion | 6 | On-screen arrows, compulsory pull and route around obstacle passed |
| A distant exchange | 3 | Plain Right immediately swaps from (1,1) to (5,1); two more Right inputs walk to exit |
| Borrowed strength | 11 | Hero selection 1/2, on-screen corner extraction and pushing passed |
| Across the divide | 8 | Keyboard-only companion movement and compulsory exchanges passed |
| Three ways through | 46 | On-screen arrows, all three heroes, relay exchange, final completion passed |

Additional checks:
- Plain keyboard Right on passage 3 exchanged the Seer and distant crystal; visible positions confirmed. Undo restored both positions and the move count to zero.
- An on-screen Up into a wall displayed blocked feedback without adding a move. On-screen Right then performed the same compulsory swap as keyboard Right; following Right inputs walked when no target remained ahead.
- No swap-mode control or Space instruction remains in the UI. Native button activation is no longer intercepted by a Space handler.
- All six existing completion badges survived loading the correction. The storage key `threefold-passage.v1.completed`, passage order, all six layouts, and stored badge representation are unchanged. No other saves were read or cleared.
- The previous final-puzzle route was revised to use Tether as a nearby relay for Seer. Puzzle layouts did not need modification.
- Inspected the final completion screenshot with current instructions and controls. No browser UI screenshots or third-party artwork are tracked.

## Automated verification and review

`npm run check` and `npm test` pass. Eighteen tests include all six complete solution replays plus compulsory swap priority, inability to opt out via the removed false argument, nearest-object selection, inactive-hero targets, wall blocking, no-target walking, boundary blocking, undo of both endpoints/move count, and blocked-move history behavior. The tests use the same session history functions as the browser UI.

Independent Standards and Spec reviewers both reported no actionable implementation findings, independently reran syntax checking and all 18 tests, and did not operate the browser. Spec review requested refreshing this evidence file; that documentation follow-up is included here.

## Prior published version

The 2026-10-15 acceptance at commit `0733d001fe060a88db82161e7fbb157963cb5705` tested the earlier optional-swap implementation (11 tests, 41-move final route). Those results do not establish correctness of compulsory swapping and are superseded by the local results above. The user subsequently authorized committing and pushing this correction. Its checks and browser evidence are recorded above; the prior published GitHub Actions success applies only to the earlier commit.

Research and remaining fidelity boundaries are in [research.md](research.md). The original-author source confirms the selected targeting subset, but no broader fidelity claims or unrelated mechanics were added.
