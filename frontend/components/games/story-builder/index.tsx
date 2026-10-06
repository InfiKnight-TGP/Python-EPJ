"use client";

import React from "react";
import GameShell from "../_shared/GameShell";
import { GameProps } from "../_shared/types";
import { BigTile } from "../_shared/BigTile";
import { Button } from "@/components/ui/button";

export default function StoryBuilder({
  level = 1,
  date = new Date().toISOString().split("T")[0],
  onFinish,
}: GameProps) {
  return (
    <GameShell
      gameId="story-builder"
      title="Story Builder"
      instructions="Remember and rebuild the sequence of story events."
      level={level}
      skill="verbal memory"
      date={date}
      onFinish={onFinish}
    >
      {(handleFinish) => (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <BigTile emoji="📖" label="Coming Soon" state="default" />
          <p className="text-muted-foreground text-sm max-w-sm">
            Story Builder is under development. Look forward to restoring story lines in order!
          </p>
          <Button variant="secondary" onClick={() => handleFinish(100)}>
            Complete Demo
          </Button>
        </div>
      )}
    </GameShell>
  );
}
