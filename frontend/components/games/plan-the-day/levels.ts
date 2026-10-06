import { GameLevel } from "../_shared/types";

export interface LevelSettings {
  cards: number; // cards per round
  rounds: number;
}

// No level has a timer. Only level 1 exists so far; other levels fall back to it.
const LEVEL_1: LevelSettings = { cards: 4, rounds: 5 };

export const LEVELS: Partial<Record<GameLevel, LevelSettings>> = { 1: LEVEL_1 };

export const getLevel = (level: GameLevel): LevelSettings => LEVELS[level] ?? LEVEL_1;
