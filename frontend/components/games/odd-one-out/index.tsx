"use client";

import React from "react";
import GameShell from "../_shared/GameShell";
import { GameProps } from "../_shared/types";
import { BigTile } from "../_shared/BigTile";
import { Button } from "@/components/ui/button";

export default function OddOneOut({
  level = 1,
  date = new Date().toISOString().split("T")[0],
  onFinish,
}: GameProps) {
  return (
    <GameShell
      gameId="odd-one-out"
      title="Odd One Out"
      instructions="Identify the item that does not belong with the rest."
      level={level}
      skill="attention"
      date={date}
      onFinish={onFinish}
    >
      {(handleFinish) => (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <BigTile emoji="🔍" label="Coming Soon" state="default" />
          <p className="text-muted-foreground text-sm max-w-sm">
            Odd One Out is under development. Exercise your visual attention!
          </p>
          <Button variant="secondary" onClick={() => handleFinish(100)}>
            Complete Demo
          </Button>
        </div>
      )}
    </GameShell>
  );
}
