# Threefold Passage

A playable browser puzzle kata inspired by **Order of the Sinking Star**, specifically its Hearty Heroes of Hauling family: one hero pushes, one automatically pulls, and another swaps places with distant objects. Six original passages teach these interactions and combine them. Original CSS artwork, characters, level layouts and presentation; no copied game assets.

## Play locally

Requires Node.js 22 or later. No packages or build step required.

```sh
npm start
```

Open **http://127.0.0.1:5217**. This server binds only to the local Mac. Override with `PORT=5220 npm start` if needed. No public website deployment is configured.

## Controls and objective

- **Arrow keys / WASD**: move the selected hero one tile.
- **1–3**, hero cards, or a hero on the board: select an existing hero. Their abilities never change.
- **Space + direction**: the Seer exchanges places with the first crystal or hero in that cardinal line of sight. Walls stop sight. Alternatively select **Swap mode** and use the direction buttons.
- **Z / Undo**: rewind a successful move, including all moved objects and hero selection at that move.
- **R / Restart**: reset the current passage. **A little insight** gives a hint.
- Every hero must stand on a glowing **◎ exit** at once. Crystals are obstacles, not targets. There is no timer or life limit; recover from a blocked layout with undo/restart. Any passage can be selected immediately.

Warden pushes one adjacent crystal or hero if the next tile is empty. Tether cannot push: when walking away, it automatically drags the object directly behind it. Seer walks normally but cannot push. The paired passages require choosing who acts and when; the final passage includes all three heroes.

## Research and limits

Read [the sourced mechanics and evidence](docs/research.md), [design decisions](docs/spec.md), and [domain glossary](CONTEXT.md). The scope deliberately selects one verified puzzle family. It does **not** implement the original's four-world combination system, mirrors, beams, stone throwing, enemies, later classes, overworld, camera zoom, or narrative. Exact original keybindings and some object edge cases remain unknown. This is a study, not a clone or an official product.

Completion checks use the isolated localStorage key `threefold-passage.v1.completed`. Restart does not erase completion badges. No other saves or browser storage are read or cleared. Movement history is session-local and resets on level changes/reload. The game works when storage is unavailable. All resources are local, with no analytics, external fonts, runtime dependencies, or network calls.

## Verification

```sh
npm run check
npm test
```

Tests cover push blocking and immutability, compulsory pulling, line-of-sight swaps, movable companions, simultaneous exit occupancy, and authored solutions for all six puzzles. [Acceptance and review evidence](docs/acceptance.md) records real Chrome input tests. Solutions are maintained in `tests/solutions.json` for reproducible reachability checks, not exposed as an in-game solve button.

The root `.gitignore` includes complete Linux, Windows and macOS Global templates fetched from [github/gitignore official main](https://github.com/github/gitignore/tree/main/Global) on 2026-10-15, followed by project-specific ignores.

## License

[MIT](LICENSE). Original game names belong to their respective owners. No affiliation with Thekla or Arc Games.
