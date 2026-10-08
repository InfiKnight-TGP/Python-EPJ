# Mole Path

Visual working memory exercise for Level 2.

## Mechanics
- **Grid**: 3×3 circle grid.
- **Rounds**: 5 rounds per session starting at length 3.
- **Path Growth**: Increases path length by 1 after a correct round (up to length 7). Repeats the same path length after a mistake.
- **Preview Phase**: Each circle stays lit for 800 ms with a 400 ms gap between flashes.
- **Replay Feature**: Player may use "Replay path" once per round.
- **Scoring**: `Math.max(0, Math.min(100, Math.round((longestCorrectPath / 7) * 100)))` (0 to 100%).
- **Level**: 2.
