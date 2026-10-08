# Story Builder

Verbal memory exercise for Level 1 featuring everyday Indian cultural themes and settings.

## Mechanics
- **Session Structure**: 2 short stories per session (6 total blanks).
- **Read Phase**: Player reads a 4-sentence story at their own pace. Includes an optional "🔊 Read Aloud" speech button using `window.speechSynthesis` (`lang: "en-IN"`).
- **Recall Phase**: Player completes 3 fill-in-the-blank sentences per story with 3 multiple-choice options per blank. Whole-word regex matching ensures exact word replacement.
- **Scoring**: `Math.round((totalCorrect / 6) * 100)` (0 to 100%).
- **Level**: 1 (untimed).
