"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import GameShell from "../_shared/GameShell";
import { GameProps } from "../_shared/types";
import { BigTile, BigTileProps } from "../_shared/BigTile";
import { Button } from "@/components/ui/button";
import { SEQUENCES } from "./data";
import { getLevel, LevelSettings } from "./levels";

const API = "http://localhost:5000";

// A generic activity, or a photo from the user's own day.
type Card =
  | { kind: "step"; emoji: string; label: string }
  | { kind: "photo"; url: string; timestamp: number };

interface Round {
  title: string;
  cards: Card[]; // in the correct order
}

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Card indices 0..n-1 in a random order that is never already solved.
function unsolvedOrder(n: number): number[] {
  const order = Array.from({ length: n }, (_, i) => i);
  let shuffled = shuffle(order);
  while (n > 1 && shuffled.every((v, i) => v === i)) shuffled = shuffle(order);
  return shuffled;
}

async function fetchDayFrames(date: string): Promise<Card[]> {
  try {
    const res = await fetch(`${API}/day-frames?date=${date}`);
    if (!res.ok) return [];
    const data: { frames?: { url: string; timestamp: number }[] } = await res.json();
    return (data.frames ?? []).map((f) => ({
      kind: "photo",
      url: API + encodeURI(f.url),
      timestamp: f.timestamp,
    }));
  } catch {
    return []; // backend down: generic rounds only
  }
}

function buildRounds(frames: Card[], { cards, rounds }: LevelSettings): Round[] {
  const personal =
    frames.length >= cards ? [{ title: "Put your day back in order", cards: frames.slice(0, cards) }] : [];
  const generic = shuffle(SEQUENCES).map((s) => ({
    title: s.title,
    cards: s.steps.slice(0, cards).map((step): Card => ({ kind: "step", ...step })),
  }));
  return [...personal, ...generic].slice(0, rounds);
}

const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

function CardTile({
  card,
  state = "default",
  revealed = false,
  onClick,
}: {
  card: Card;
  state?: BigTileProps["state"];
  revealed?: boolean;
  onClick: () => void;
}) {
  if (card.kind === "step") {
    return (
      <BigTile
        emoji={card.emoji}
        label={card.label}
        state={state}
        onClick={onClick}
        className="w-full min-h-[140px] gap-2 [&>span:first-child]:text-6xl [&>span:last-child]:text-xl"
      />
    );
  }
  // BigTile has no image slot, so the photo sits over it without catching taps.
  // The time is only shown after Check, since it would give the order away.
  return (
    <div className="relative">
      <BigTile
        label={revealed ? `at ${formatTime(card.timestamp)}` : undefined}
        state={state}
        onClick={onClick}
        className="w-full min-h-[170px] justify-end [&>span]:text-lg"
      />
      <img
        src={card.url}
        alt="A moment from your day"
        className="pointer-events-none absolute left-3 top-3 h-[112px] w-[calc(100%-1.5rem)] rounded-lg object-cover"
      />
    </div>
  );
}

function Board({
  date,
  settings,
  onDone,
}: {
  date: string;
  settings: LevelSettings;
  onDone: (score: number) => void;
}) {
  const [rounds, setRounds] = useState<Round[] | null>(null);
  const [roundIndex, setRoundIndex] = useState(0);
  const [tray, setTray] = useState<number[]>([]); // unplaced card indices, in display order
  const [slots, setSlots] = useState<(number | null)[]>([]); // card index placed in each slot
  const [checked, setChecked] = useState(false);
  const [correctSoFar, setCorrectSoFar] = useState(0);

  const startRound = (round: Round) => {
    setTray(unsolvedOrder(round.cards.length));
    setSlots(round.cards.map(() => null));
    setChecked(false);
  };

  useEffect(() => {
    let cancelled = false;
    fetchDayFrames(date).then((frames) => {
      if (cancelled) return;
      const built = buildRounds(frames, settings);
      setRounds(built);
      startRound(built[0]);
    });
    return () => {
      cancelled = true;
    };
  }, [date, settings]);

  if (!rounds) {
    return <p className="py-12 text-center text-xl">Getting your cards ready…</p>;
  }

  const round = rounds[roundIndex];
  const isLast = roundIndex === rounds.length - 1;
  const roundCorrect = slots.filter((card, i) => card === i).length;

  const place = (card: number) => {
    const slot = slots.indexOf(null);
    if (checked || slot === -1) return;
    setSlots(slots.map((c, i) => (i === slot ? card : c)));
    setTray(tray.filter((c) => c !== card));
  };

  const sendBack = (slot: number) => {
    const card = slots[slot];
    if (checked || card === null) return;
    setSlots(slots.map((c, i) => (i === slot ? null : c)));
    setTray([...tray, card]);
  };

  const check = () => {
    setCorrectSoFar(correctSoFar + roundCorrect);
    setChecked(true);
  };

  const next = () => {
    if (isLast) {
      const totalCards = rounds.reduce((sum, r) => sum + r.cards.length, 0);
      onDone((correctSoFar / totalCards) * 100);
      return;
    }
    setRoundIndex(roundIndex + 1);
    startRound(rounds[roundIndex + 1]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-bold md:text-3xl">{round.title}</h2>
        <span className="text-lg text-muted-foreground">
          Round {roundIndex + 1} of {rounds.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {slots.map((card, i) => (
          <div key={i} className="space-y-2">
            <p className="text-center text-3xl font-bold">{i + 1}</p>
            {card === null ? (
              <div className="min-h-[140px] rounded-xl border-2 border-dashed border-border" />
            ) : (
              <CardTile
                card={round.cards[card]}
                state={checked ? (card === i ? "correct" : "wrong") : "selected"}
                revealed={checked}
                onClick={() => sendBack(i)}
              />
            )}
          </div>
        ))}
      </div>

      {tray.length > 0 && (
        <div className="grid grid-cols-2 gap-4 border-t border-border pt-8 md:grid-cols-4">
          {tray.map((card) => (
            <CardTile key={card} card={round.cards[card]} onClick={() => place(card)} />
          ))}
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        {checked && (
          <p className="text-xl font-semibold">
            {roundCorrect} of {slots.length} in the right place
          </p>
        )}
        {checked ? (
          <Button size="lg" className="h-14 px-12 text-xl" onClick={next}>
            {isLast ? "Finish" : "Next"}
          </Button>
        ) : (
          <Button size="lg" className="h-14 px-12 text-xl" disabled={tray.length > 0} onClick={check}>
            Check
          </Button>
        )}
      </div>
    </div>
  );
}

export default function PlanTheDay({
  level = 1,
  date = format(new Date(), "yyyy-MM-dd"),
  onFinish,
}: GameProps) {
  return (
    <GameShell
      gameId="plan-the-day"
      title="Plan the Day"
      instructions="Tap the cards in the order they happen."
      level={level}
      skill="sequencing"
      date={date}
      onFinish={onFinish}
    >
      {(handleFinish) => <Board date={date} settings={getLevel(level)} onDone={handleFinish} />}
    </GameShell>
  );
}
