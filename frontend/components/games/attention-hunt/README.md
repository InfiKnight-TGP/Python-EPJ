# Attention Hunt

Selective attention exercise for Level 3.

## Mechanics
- **Objective**: Find every copy of the target item on the grid while ignoring similar distractors.
- **Rounds**: 5 rounds per session with increasing grid sizes (3×3 up to 5×5) and target counts (2–8 targets).
- **Round Timer**: 60 seconds per round. The timer pauses between rounds. When a round's 60 seconds expire, the game automatically advances to the next round.
- **Scoring**: `Math.max(0, Math.min(100, Math.round((foundTotal / totalTargets) * 100) - 5 * wrongTaps))` (0 to 100%).
- **Level**: 3.
