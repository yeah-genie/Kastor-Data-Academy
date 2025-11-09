export const caseHints: Record<number, Record<string, string>> = {
  1: {
    briefing_data: "Look for characters with sudden changes in the graph. Pay attention to Week 3 data.",
    investigation_start: "Find changes related to DragonKnight in the patch log.",
    investigation_deep: "Examine early morning activities in the permission logs. Are there any log deletion attempts?",
  },
  2: {
    briefing_data: "Compare PhantomKing's score and registration date with other users.",
    investigation_start: "Check the sequence of login status and score update actions. Is it logically possible?",
    investigation_deep: "Identify users who directly accessed the database and target tables. What do INSERT and UPDATE mean?",
  },
  3: {
    briefing_data: "Compare each user's 'Opponent Skill Difference' value. Who has the most extreme value?",
    investigation_start: "Check how LuckyPlayer's rules differ from other groups in the matching rules table.",
    investigation_deep: "Comprehensively compare IP addresses, device IDs, emails, and access times.",
  },
};

export function getHint(caseId: number, nodeId: string): string | null {
  return caseHints[caseId]?.[nodeId] || null;
}
