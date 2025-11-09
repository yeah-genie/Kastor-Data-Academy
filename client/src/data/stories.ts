import { case1Story } from "./case1-story";
import { case2Story } from "./case2-story";
import { case3Story } from "./case3-story";
import { case4Story } from "./case4-story";
import { case5Story } from "./case5-story";
import type { StoryNode } from "./case1-story";

export interface CaseMetadata {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  keyLearning: string;
  imageUrl?: string;
}

export const caseMetadata: Record<number, CaseMetadata> = {
  1: {
    id: 1,
    title: "The Missing Balance Patch",
    subtitle: "Uncover unauthorized game modifications",
    description: "A specific character's win rate has abnormally surged in a popular online game. Analyze the win rate graphs and patch logs to uncover the insider's manipulation!",
    difficulty: "Beginner",
    tags: ["Data Analysis", "Log Tracking", "Change Detection"],
    keyLearning: "Sudden changes in data always have a cause. Check system logs and permission records to discover hidden manipulations.",
  },
  2: {
    id: 2,
    title: "The Ghost User's Ranking Manipulation",
    subtitle: "Track down the phantom bot account",
    description: "A non-existent user appeared at the top of the rankings. Analyze connection logs, ranking tables, and database query logs to track the bot account!",
    difficulty: "Intermediate",
    tags: ["Database", "Log Analysis", "Bot Detection"],
    keyLearning: "Data integrity is the foundation of all systems. Check relationships between tables to discover abnormal data insertion.",
  },
  3: {
    id: 3,
    title: "The Secret of the Hidden Algorithm",
    subtitle: "Expose the rigged matchmaking system",
    description: "A matchmaking system favorable to certain users has been discovered. Analyze the matchmaking result distribution and algorithm settings to identify the manipulated rules!",
    difficulty: "Advanced",
    tags: ["Algorithm Analysis", "Pattern Recognition", "Fairness Verification"],
    keyLearning: "Algorithm fairness must be verified not only by code but also by execution results. Unusual patterns are evidence of hidden bias.",
  },
  4: {
    id: 4,
    title: "The DLC Revenue Mystery",
    subtitle: "Uncover the pay-to-win crisis",
    description: "DLC sales revenue has doubled, but player satisfaction is plummeting. Analyze revenue data and player reviews to discover why short-term profits are killing the game!",
    difficulty: "Intermediate",
    tags: ["Business Analytics", "Player Retention", "Monetization Strategy"],
    keyLearning: "Revenue growth doesn't equal success. Always analyze player satisfaction, retention, and long-term sustainability alongside financial metrics. Pay-to-win models may boost short-term revenue but often destroy the player base.",
  },
  5: {
    id: 5,
    title: "The Server Crash Pattern",
    subtitle: "Identify the DDoS attack",
    description: "Game servers crash every day at the same time. Analyze server logs and traffic patterns to uncover a coordinated DDoS attack timed with a competitor's launch!",
    difficulty: "Advanced",
    tags: ["Network Security", "Log Analysis", "Cyber Attack Detection"],
    keyLearning: "When investigating technical issues, always look for patterns in timing, sources, and context. Correlation analysis can reveal malicious intent. Proper monitoring and data analysis are essential for identifying cyber threats.",
  },
};

export const stories: Record<number, Record<string, StoryNode>> = {
  1: case1Story,
  2: case2Story,
  3: case3Story,
  4: case4Story,
  5: case5Story,
};

export function getStory(caseId: number): Record<string, StoryNode> {
  return stories[caseId] || case1Story;
}

export function getCaseMetadata(caseId: number): CaseMetadata {
  return caseMetadata[caseId] || caseMetadata[1];
}
