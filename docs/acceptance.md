# Acceptance evidence

2026-10-15, Chrome on the user's Mac, local preview on 127.0.0.1:5217. No programmatic game-state changes or solve hooks were used in browser testing. Each passage was completed through ordinary key presses or visible direction buttons, followed by visible DOM confirmation of “Passage complete.”

| Passage | Accepted solution length | Browser result |
|---|---:|---|
| The first obstruction | 5 | Push, goal, continue passed |
| The reluctant companion | 6 | Compulsory pull and route around obstacle passed |
| A distant exchange | 3 | Space+Right ranged exchange then walking passed |
| Borrowed strength | 11 | Hero selection 1/2, corner extraction and pushing passed |
| Across the divide | 8 | Moving companion and multiple ranged exchanges passed |
| Three ways through | 41 | All three heroes, push/pull/swap, final completion passed |

Additional acceptance: keyboard move then Z restored initial move count/position, disabled undo when history empty. Visible swap-mode control used for the final exchange. All six completion badges earned without touching any other game's saves. Desktop screenshots inspected during play. No browser UI screenshots or third-party artwork are included in source.

Automated: `npm run check` and `npm test` pass. Eleven tests include six complete solution replays with no blocked inputs and no object overlap. Source is dependency-free; CI runs the same checks on Node 24. This is syntax checking, not TypeScript typechecking.

Research limitations and all deliberate mechanics boundaries are in [research.md](research.md). Review findings and publication checks are recorded below after review.
