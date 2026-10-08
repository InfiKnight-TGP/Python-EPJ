"use client";

import React from "react";
import GameShell from "../_shared/GameShell";
import { GameProps } from "../_shared/types";
import { BigTile } from "../_shared/BigTile";
import { Button } from "@/components/ui/button";

export default function WhackAMole({
  level = 2,
  date = new Date().toISOString().split("T")[0],
  onFinish,
}: GameProps) {
  return (
    <GameShell
      gameId="whack-a-mole"
      title="Whack-a-Mole"
      instructions="Tap target moles while suppressing the urge to tap distractors."
      level={level}
      skill="inhibition"
      date={date}
      onFinish={onFinish}
    >
      {(handleFinish) => (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <BigTile emoji="🔨" label="Coming Soon" state="default" />
          <p className="text-muted-foreground text-sm max-w-sm">
            Whack-a-Mole is under development. Test response inhibition!
          </p>
          <Button variant="secondary" disabled>
            Coming soon
          </Button>
        </div>
      )}
    </GameShell>
  );
}
