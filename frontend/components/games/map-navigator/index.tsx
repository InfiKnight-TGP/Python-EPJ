"use client";

import React from "react";
import GameShell from "../_shared/GameShell";
import { GameProps } from "../_shared/types";
import { BigTile } from "../_shared/BigTile";
import { Button } from "@/components/ui/button";

export default function MapNavigator({
  level = 3,
  date = new Date().toISOString().split("T")[0],
  onFinish,
}: GameProps) {
  return (
    <GameShell
      gameId="map-navigator"
      title="Map Navigator"
      instructions="Follow directional instructions to navigate from origin to destination."
      level={level}
      skill="spatial"
      date={date}
      onFinish={onFinish}
    >
      {(handleFinish) => (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          <BigTile emoji="🗺️" label="Coming Soon" state="default" />
          <p className="text-muted-foreground text-sm max-w-sm">
            Map Navigator is under development. Exercise your spatial navigation skills!
          </p>
          <Button variant="secondary" onClick={() => handleFinish(100)}>
            Complete Demo
          </Button>
        </div>
      )}
    </GameShell>
  );
}
