# Source research and fidelity boundary
Researched 2026-10-15 before implementation. This is a small, original Hearty Heroes-inspired kata, not a recreation of the full game.

## Primary and observable sources
- [Thekla / Arc official site](https://www.orderofthesinkingstar.com/en/): four initially distinct worlds, later combining systems; links to the four foundational games.
- [Developer's Steam description](https://store.steampowered.com/app/499170/Order_of_the_Sinking_Star/): identifies Heroes of Sokoban, Mirror Isles, Promesst and Skipping Stones as foundations. Heroes have complementary abilities; exploration and revisiting are central.
- [PlayStation's hands-on report, July 21](https://blog.playstation.com/2026/07/21/order-of-the-sinking-star-is-coming-to-ps5-hands-on-report/): explicitly describes warrior pushing, thief only pulling, wizard swapping on line of sight; later heroes cooperate. Undo is available. Monsters can kill adjacent heroes or attack down sight lines. The report distinguishes mirrors, beams and throwing worlds.
- [Official extended overview footage](https://www.youtube.com/watch?v=4m8R1BjjioU), linked from the [official media gallery](https://www.orderofthesinkingstar.com/en/media): inspected in Chrome. Sampled the early hero/grid section around 0:20, Mirror Isles / realm transition around 0:30, and zoomed-out interconnected world around 1:14. The visible view is elevated, near top-down, with orthogonal tiled walkways, crystalline obstacles, several heroes, and camera scale changes. These sampled frames establish presentation; they do not independently prove every edge-case rule.
- [Hands-on demonstration report](https://www.gamefile.news/p/a-complicated-game): separately describes pushing warrior, dragging thief and swapping wizard.
- [Developer demonstration interview](https://www.pcgamer.com/games/puzzle/jonathan-blows-new-game-has-the-most-jonathan-blows-new-game-pitch-imaginable-a-game-design-supercollider-that-takes-4-puzzle-games-and-jams-them-together-into-a-500-hour-saga/): describes involuntary dragging and combining previously separate rules. Used for the automatic-pull detail, not as a substitute for official sources.

## Verified core and selected slice
| Aspect | Original evidence | Kata |
|---|---|---|
| Movement | Grid locations, block obstruction; elevated camera in official footage | Cardinal, discrete turns on a fixed elevated board |
| Distinct heroes | Warrior pushes, thief pulls, wizard swaps in sight | Warden, Tether, Seer retain separate abilities and positions |
| Cooperation | Initially separate heroes meet and combine abilities | Three teaching passages, two paired puzzles, one trio puzzle |
| Swap | User correction and foundational source: movement triggers exchange | Compulsory first crystal or inactive hero in a cardinal ray; walls block; no target means walk |
| Recovery | Undo/rewind documented | Unlimited move undo and restart |
| Goals | Foundation games guide heroes to exits; full game's global progression broader | All heroes on distinct glowing exits simultaneously |
| Failure | Monsters can kill; block layouts can obstruct progress | Recoverable deadlocks, no death, timer or lives |
| Controls | Exact original keyboard bindings not verified | Arrows/WASD; 1–3; Z; R; visible direction buttons |

## Unknown or deliberately unimplemented
Exact original keybindings, exit activation timing, wizard range/target eligibility for every object, automatic-pull priority when several objects surround a hero, and movement interactions with every later class were not established. This kata's explicit resolutions: only directly behind is pulled; one object pushed; no chain pushes; first ray object automatically swapped, including an inactive hero; all heroes stay present on exits. These are bounded implementation choices, not comprehensive fidelity claims.

No mirrors/reflection clones, beam powers, thrown stones/water paths, enemies, druid/bard/priestess, multi-height terrain, world merging, overworld travel, full narrative, or original assets. The full game's defining cross-world supercollider is outside this slice. Recognition rests on its verified complementary-hero puzzle family, not the title or a generic crate-to-target reskin.

## Compulsory swap correction — 2026-10-16
The earlier optional swap action was an implementation error. The user clarified that directional movement swaps whenever possible. Rechecked the original author's [Heroes of Sokoban page and embedded PuzzleScript source](https://sites.math.washington.edu/~ostroff/puzzles/Heroes_of_Sokoban.html), which the official game site links as a foundation. Its wizard movement launches a directional scan through cells without movable or static objects, exchanges with the first movable object, and restores ordinary movement when the scan hits a static object. In that source, movable means a crate or an inactive hero; static means a wall or closed door. This kata has walls, crystals and inactive heroes, but no doors. The source confirms this subset's nearest-target and blocker behavior; it is not proof of every later Order of the Sinking Star object interaction.

Both keyboard and visible arrows now use this single compulsory transition. The Seer walks one tile only when no valid target is visible, cannot opt out of a valid swap, and does nothing when its adjacent tile is blocked and no swap is available. No unrelated mechanics were added. All six existing layouts remain solvable, so completion storage and passage identities remain unchanged.
