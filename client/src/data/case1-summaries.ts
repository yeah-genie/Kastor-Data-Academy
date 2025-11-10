import { StageSummary } from "./case1-story-new";

export const case1Summaries: Record<string, StageSummary> = {
  stage1_complete: {
    stage: 1,
    title: "Problem Identification and Hypothesis",
    keyFindings: [
      "Shadow Reaper's win rate increased abnormally",
      "Possible deliberate manipulation of game balance",
      "Investigation begins through server logs and witness interviews"
    ],
    evidenceCount: 2,
    nextStageHint: "Interview the team members"
  },
  
  stage2_complete: {
    stage: 2,
    title: "Witness Interviews",
    keyFindings: [
      "CCTV shows Maya left at 10:47 PM",
      "Chris admitted needing company data for personal AI research",
      "Ryan anonymously posted the issue to the community and provided server logs",
      "Shadow Reaper's attack was modified from 100→150 at 11:15 PM using admin01 account"
    ],
    evidenceCount: 4,
    nextStageHint: "Analyze IP addresses to find the real culprit"
  },
  
  stage3_complete: {
    stage: 3,
    title: "Data Processing and Analysis",
    keyFindings: [
      "Activity detected from Chris's computer (192.168.1.47) after Maya left",
      "At 11:15 PM, Maya's admin01 account was accessed from Chris's computer",
      "Decisive evidence that Chris used Maya's account without authorization",
      "IP addresses and CCTV timeline match perfectly"
    ],
    evidenceCount: 6,
    nextStageHint: "Synthesize all evidence to reach a conclusion"
  },
  
  stage4_complete: {
    stage: 4,
    title: "Evidence Synthesis",
    keyFindings: [
      "Chris stole Maya's account credentials for AI research",
      "Deliberately manipulated game balance to obtain experimental data",
      "Win rate data supports Chris's hypothesis",
      "All evidence points to Chris as the culprit"
    ],
    evidenceCount: 8,
    nextStageHint: "Confront Chris and reveal the truth"
  }
};

export function getStageSummary(stageNumber: number): StageSummary | undefined {
  const key = `stage${stageNumber}_complete`;
  return case1Summaries[key];
}
