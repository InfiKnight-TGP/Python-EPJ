"use client";

import React from "react";
import GameShell from "../_shared/GameShell";
import { GameProps } from "../_shared/types";
import { BigTile } from "../_shared/BigTile";
import { Button } from "@/components/ui/button";

export default function WordAssociation({
  level = 1,
  date = new Date().toISOString().split("T")[0],
  onFinish,
}: GameProps) {
  return (
    <GameShell
      gameId="word-association"
      title="Word Association"
      instructions="Pair semantically related words and concepts together."
      level={level}
      skill="semantic memory"
      date={date}
      onFinish={onFinish}
    >
      {(handleFinish) => (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <BigTile emoji="🔗" label="Coming Soon" state="default" />
          <p className="text-muted-foreground text-sm max-w-sm">
            Word Association is under development. Practice connecting related ideas!
          </p>
          <Button variant="secondary" disabled>
            Coming soon
          </Button>
        </div>
      )}
    </GameShell>
  );
}
