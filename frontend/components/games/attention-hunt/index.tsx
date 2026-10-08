"use client";

import React from "react";
import GameShell from "../_shared/GameShell";
import { GameProps } from "../_shared/types";
import { BigTile } from "../_shared/BigTile";
import { Button } from "@/components/ui/button";

export default function AttentionHunt({
  level = 3,
  date = new Date().toISOString().split("T")[0],
  onFinish,
}: GameProps) {
  return (
    <GameShell
      gameId="attention-hunt"
      title="Attention Hunt"
      instructions="Locate specific target shapes among visually similar distractors."
      level={level}
      skill="selective attention"
      date={date}
      onFinish={onFinish}
    >
      {(handleFinish) => (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <BigTile emoji="🎯" label="Coming Soon" state="default" />
          <p className="text-muted-foreground text-sm max-w-sm">
            Attention Hunt is under development. Focus your selective visual attention!
          </p>
          <Button variant="secondary" onClick={() => handleFinish(100)}>
            Complete Demo
          </Button>
        </div>
      )}
    </GameShell>
  );
}
