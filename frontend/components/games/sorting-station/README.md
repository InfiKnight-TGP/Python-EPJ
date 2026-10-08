# Sorting Station

**Level:** 2 (medium), the only level for this game
**Skill:** cognitive flexibility (rule switching)
**Files:** `index.tsx` (UI), `logic.ts` (session building and scoring), `data.ts` (rule pairs and items)

## How to play

- One item at a time appears in the centre: a big emoji and a short label.
- Two large bins sit below it, each with an icon and a label. Tap the bin the item belongs in.
- The current rule is always shown in large text above the bins ("Sort by …").
- There is **no timer** per item.

## Session structure

- **2 rounds × 12 items = 24 items.**
- Each round uses a **different random rule pair**.
- In each round:
  1. A 3-second full-screen cue shows the round's first rule.
  2. **Items 1–6** are sorted by **Rule A**.
  3. A 3-second full-screen cue appears: **"New rule! Now sort by ___"**.
  4. **Items 7–12** are sorted by **Rule B**.
- No item repeats within a round. Each half of a round is balanced across the two bins (3 + 3 where the data allows), so always tapping the same bin doesn't pay off.

## Feedback

- **Correct:** the bin flashes green and the item drops into it.
- **Wrong:** the tapped bin flashes red and the correct bin glows green for 1 second. Then the game moves on. No "wrong" text is shown.
- Taps are ignored while feedback or a cue is on screen.

## Rule pairs

All items are familiar from everyday Indian life. Every item has one clear answer under **both** rules of its pair (see `data.ts`). Ambiguous items were left out on purpose (e.g. tomato for fruit/vegetable, coconut for puja/kitchen).

| # | Rule A | Rule B | Items |
|---|--------|--------|-------|
| 1 | Wet waste 🟢 vs Dry waste 🔵 | Kitchen 🍳 vs Bathroom 🛁 | 18 |
| 2 | Fruit 🍎 vs Vegetable 🥦 | Red/orange 🟠 vs Green 🟩 | 16 |
| 3 | Things you eat 🍽️ vs Things you wear 👕 | Hot/warm 🔥 vs Cold/cool ❄️ | 16 |
| 4 | Puja item 🛕 vs Kitchen item 🍳 | Metal 🔩 vs Not metal 🌱 | 16 |

Note on pair 3: all clothing items are warm winter wear (sweater, muffler, gloves, jacket, socks), so under "Hot or Cold" they always go in **Hot / warm**.

## Scoring

- **Score (0–100)** = `round(correct sorts / 24 × 100)`. It is passed to `onFinish` through `GameShell`, which saves it with `saveScore`.
- **switchErrors** = wrong answers on the **first 2 items after each mid-round rule change** (items 7 and 8 of each round), so the maximum is 4 per session. The shared `SaveScoreParams` type has no extra fields, so `switchErrors` is written to the browser console when the session ends:
  `[sorting-station] session complete { correct, total, score, switchErrors, pairs }`.
  The start of round 2 brings in a new pair and is announced with a cue, but it does not count towards switch errors.

## Evidence note

Rule-switching games have weaker evidence for executive function benefits (Abd-alrazaq et al., 2022), so this game is included mainly for variety and engagement.
