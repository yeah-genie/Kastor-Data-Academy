import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "menu" | "briefing" | "investigation" | "resolution";
export type StoryNode = string;

export interface Clue {
  id: string;
  title: string;
  description: string;
  timestamp: number;
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  nextNode: string;
  feedback: string;
}

export interface Question {
  id: string;
  text: string;
  choices: Choice[];
}

interface DetectiveGameState {
  phase: GamePhase;
  currentNode: StoryNode;
  cluesCollected: Clue[];
  score: number;
  starsEarned: number;
  currentCase: number;
  hintsUsed: number;
  maxHints: number;

  setPhase: (phase: GamePhase) => void;
  setCurrentNode: (node: StoryNode) => void;
  addClue: (clue: Clue) => void;
  addScore: (points: number) => void;
  setStarsEarned: (stars: number) => void;
  useHint: () => void;
  resetCase: () => void;
  startCase: (caseNumber: number) => void;
}

export const useDetectiveGame = create<DetectiveGameState>()(
  subscribeWithSelector((set) => ({
    phase: "menu",
    currentNode: "start",
    cluesCollected: [],
    score: 0,
    starsEarned: 0,
    currentCase: 1,
    hintsUsed: 0,
    maxHints: 3,

    setPhase: (phase) => set({ phase }),
    
    setCurrentNode: (node) => set({ currentNode: node }),
    
    addClue: (clue) =>
      set((state) => ({
        cluesCollected: [...state.cluesCollected, clue],
      })),
    
    addScore: (points) =>
      set((state) => ({ score: state.score + points })),
    
    setStarsEarned: (stars) => set({ starsEarned: stars }),
    
    useHint: () =>
      set((state) => ({
        hintsUsed: Math.min(state.hintsUsed + 1, state.maxHints),
      })),
    
    resetCase: () =>
      set({
        currentNode: "start",
        cluesCollected: [],
        score: 0,
        starsEarned: 0,
        hintsUsed: 0,
      }),
    
    startCase: (caseNumber) =>
      set({
        currentCase: caseNumber,
        phase: "briefing",
        currentNode: "start",
        cluesCollected: [],
        score: 0,
        starsEarned: 0,
        hintsUsed: 0,
      }),
  }))
);
