"use client";

import React from "react";
import GameShell from "../_shared/GameShell";
import { GameProps } from "../_shared/types";
import { BigTile } from "../_shared/BigTile";
import { Button } from "@/components/ui/button";

export default function MolePath({
  level = 2,
  date = new Date().toISOString().split("T")[0],
  onFinish,
}: GameProps) {
  return (
    <GameShell
      gameId="mole-path"
      title="Mole Path"
      instructions="Memorize and repeat the sequence of tiles visited by the mole."
      level={level}
      skill="working memory"
      date={date}
      onFinish={onFinish}
    >
      {(handleFinish) => (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <BigTile emoji="🐹" label="Coming Soon" state="default" />
          <p className="text-muted-foreground text-sm max-w-sm">
            Mole Path is under development. Test your spatial working memory!
          </p>
          <Button variant="secondary" onClick={() => handleFinish(100)}>
            Complete Demo
          </Button>
        </div>
      )}
    </GameShell>
  );
}
