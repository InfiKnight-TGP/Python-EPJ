import React from "react";
import StoryBuilder from "./story-builder";
import PlanTheDay from "./plan-the-day";
import WordAssociation from "./word-association";
import OddOneOut from "./odd-one-out";
import MolePath from "./mole-path";
import SortingStation from "./sorting-station";
import WhackAMole from "./whack-a-mole";
import AttentionHunt from "./attention-hunt";
import MapNavigator from "./map-navigator";
import { GameProps } from "./_shared/types";

export interface GameRegistryEntry {
  id: string;
  name: string;
  skill: string;
  levels: (1 | 2 | 3)[];
  component: React.ComponentType<GameProps>;
  comingSoon: boolean;
  emoji: string;
  description: string;
}

export const GAME_REGISTRY: GameRegistryEntry[] = [
  {
    id: "story-builder",
    name: "Story Builder",
    skill: "verbal memory",
    levels: [1],
    component: StoryBuilder,
    comingSoon: true,
    emoji: "📖",
    description: "Remember and rebuild story sequences.",
  },
  {
    id: "plan-the-day",
    name: "Plan the Day",
    skill: "sequencing",
    levels: [1],
    component: PlanTheDay,
    comingSoon: false,
    emoji: "📅",
    description: "Organize daily tasks in correct logical order.",
  },
  {
    id: "word-association",
    name: "Word Association",
    skill: "semantic memory",
    levels: [1],
    component: WordAssociation,
    comingSoon: true,
    emoji: "🔗",
    description: "Connect related words and concepts together.",
  },
  {
    id: "odd-one-out",
    name: "Odd One Out",
    skill: "attention",
    levels: [1],
    component: OddOneOut,
    comingSoon: true,
    emoji: "🔍",
    description: "Find the item that doesn't belong in the group.",
  },
  {
    id: "mole-path",
    name: "Mole Path",
    skill: "working memory",
    levels: [2, 3],
    component: MolePath,
    comingSoon: true,
    emoji: "🐹",
    description: "Remember the sequence of tiles the mole visited.",
  },
  {
    id: "sorting-station",
    name: "Sorting Station",
    skill: "flexibility",
    levels: [2],
    component: SortingStation,
    comingSoon: true,
    emoji: "📦",
    description: "Adapt to changing rules to sort items correctly.",
  },
  {
    id: "whack-a-mole",
    name: "Whack-a-Mole",
    skill: "inhibition",
    levels: [2, 3],
    component: WhackAMole,
    comingSoon: true,
    emoji: "🔨",
    description: "Tap target moles while suppressing impulses for distractors.",
  },
  {
    id: "attention-hunt",
    name: "Attention Hunt",
    skill: "selective attention",
    levels: [3],
    component: AttentionHunt,
    comingSoon: true,
    emoji: "🎯",
    description: "Focus and find specific visual targets amidst noise.",
  },
  {
    id: "map-navigator",
    name: "Map Navigator",
    skill: "spatial",
    levels: [3],
    component: MapNavigator,
    comingSoon: true,
    emoji: "🗺️",
    description: "Navigate routes and spatial directions accurately.",
  },
];

export function getGameById(id: string): GameRegistryEntry | undefined {
  return GAME_REGISTRY.find((g) => g.id === id);
}
