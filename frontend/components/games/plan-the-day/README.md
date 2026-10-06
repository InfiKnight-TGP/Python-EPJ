# Plan the Day

**Level 1 · Skill: sequencing**

## Rules

1. Each round shows 4 picture cards in a shuffled order.
2. Tap the cards in the order they happen. Each tap fills the next empty slot, 1 to 4.
3. Tap a card in a slot to send it back to the tray.
4. When all slots are filled, tap **Check**. Cards in the right slot turn green and cards in the wrong slot turn red.
5. Tap **Next** to go to the next round. There are 5 rounds and no timer.

## Personal mode and generic mode

The game asks the backend for photos from the date chosen on the `/games` page:

```
GET /day-frames?date=YYYY-MM-DD
→ { "date": "...", "frames": [{ "url": "/frames/<video>_chunks/chunk_0000_0010/3.jpg", "timestamp": 4.5 }] }
```

- **Personal mode:** if 4 or more frames come back, round 1 is "Put your day back in order", using those photos. The time of each photo appears only after Check, since showing it earlier would give the order away. Rounds 2 to 5 are generic.
- **Generic mode:** if there are fewer than 4 frames, or the backend can't be reached, all 5 rounds are picked at random from the activity sequences in `data.ts`, such as making tea or a bus ride.

How the backend picks frames:

- It finds the videos whose journal `date` matches. The stored value is the browser's local midnight in UTC, for example `2025-11-07T18:30:00.000Z` for Nov 8 in India, so it is converted to the server's local date before comparing.
- It reads the frames the video pipeline saved in `backend/frames/<video>_chunks/chunk_<start>_<end>/<n>.jpg`.
- It orders them by video upload time, then chunk start, then frame number, and returns 4 evenly spaced frames.
- Frames are only numbered, so each `timestamp` is an estimate spread across its chunk's time span.

## Scoring

```
score = cards in the right slot across all rounds / total cards × 100
```

5 rounds of 4 cards make 20 cards. For example, 17 correct gives 85. `GameShell` rounds the score, saves it through `saveScore` (to `POST /performance` with `game_id: "plan-the-day"`), and passes it to `onFinish`.

## Files

- `index.tsx`: the game
- `data.ts`: generic activity sequences, each a title and 4 steps in the correct order
- `levels.ts`: cards and rounds per level
