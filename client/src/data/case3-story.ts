import { StoryNode } from "./case1-story";

export const case3Story: Record<string, StoryNode> = {
  start: {
    id: "start",
    phase: "stage1",
    messages: [
      { id: "m1", speaker: "system", text: "📁 CASE FILE #003" },
      { id: "m2", speaker: "system", text: "THE SECRET OF THE HIDDEN ALGORITHM" },
      { id: "m3", speaker: "narrator", text: "Your most challenging case yet arrives..." },
      { id: "m4", speaker: "client", text: "Detective! Our players are revolting! They claim the matchmaking system is rigged!" },
      { id: "m5", speaker: "detective", text: "Rigged? That's a serious accusation. Explain the details." },
      { id: "m6", speaker: "client", text: "Players say certain users always get favorable matchups. We've been accused of creating a 'pay-to-win' algorithm!" },
      { id: "m7", speaker: "client", text: "But we swear we didn't do anything! Here's the matchmaking result data from last month." },
    ],
    autoAdvance: { nextNode: "stage1_data", delay: 1000 },
  },
  stage1_data: {
    id: "stage1_data",
    phase: "stage1",
    messages: [{ id: "m8", speaker: "client", text: "Here's the win rate distribution by player spending tier." }],
    dataVisualizations: [{
      type: "chart",
      title: "Win Rate by Player Spending Tier",
      data: {
        labels: ["Free Players", "Low Spenders ($1-50)", "Med Spenders ($51-200)", "Whales ($200+)"],
        datasets: [{
          label: "Win Rate %",
          data: [35, 48, 52, 78],
          color: "#ef4444",
        }],
      },
    }],
    question: {
      id: "q1",
      text: "🎯 HYPOTHESIS: What pattern do you see?",
      choices: [
        { id: "c1", text: "Everyone has similar win rates", isCorrect: false, nextNode: "start", feedback: "Look at the numbers more carefully.", pointsAwarded: 0 },
        { id: "c2", text: "High spenders (Whales) have 78% win rate while free players only have 35% - a massive advantage", isCorrect: true, nextNode: "stage2_start", feedback: "Correct! This huge gap suggests systematic favoritism!", clueAwarded: { id: "clue1", title: "Spending-Based Advantage", description: "Win rate correlates directly with spending amount" }, pointsAwarded: 10 },
        { id: "c3", text: "Low spenders perform best", isCorrect: false, nextNode: "start", feedback: "Actually, high spenders win far more.", pointsAwarded: 0 },
      ],
    },
  },
  stage2_start: {
    id: "stage2_start",
    phase: "stage2",
    messages: [
      { id: "m9", speaker: "system", text: "📊 STAGE 2: DATA COLLECTION" },
      { id: "m10", speaker: "client", text: "That does look suspicious... but our algorithm is supposed to be purely skill-based!" },
      { id: "m11", speaker: "detective", text: "Let's interview the lead engineer who built the matchmaking system." },
      { id: "m12", speaker: "narrator", text: "You speak with Alex, the lead engineer..." },
      { id: "m13", speaker: "client", text: "Alex says: 'The algorithm uses an ELO system based on skill rating. Spending shouldn't matter at all!'" },
      { id: "m14", speaker: "detective", text: "Then let's look at the actual matchmaking logs to see what's happening." },
    ],
    autoAdvance: { nextNode: "stage2_logs", delay: 1000 },
  },
  stage2_logs: {
    id: "stage2_logs",
    phase: "stage2",
    messages: [{ id: "m15", speaker: "client", text: "Here are sample matchmaking decisions from yesterday." }],
    dataVisualizations: [{
      type: "table",
      title: "Matchmaking Log Samples",
      data: {
        headers: ["Player", "Skill Rating", "Spending Tier", "Matched Against", "Opponent Rating"],
        rows: [
          ["FreeUser42", "1500", "Free", "ProWhale99", "1850"],
          ["FreeUser73", "1600", "Free", "SpenderX", "1750"],
          ["WhaleKing", "1450", "Whale", "Newbie12", "950"],
          ["WhaleKing", "1450", "Whale", "Casual99", "1100"],
          ["LowSpend5", "1550", "Low", "FreeUser88", "1520"],
        ],
      },
    }],
    question: {
      id: "q2",
      text: "🔍 DATA COLLECTION: What's wrong with these matchups?",
      choices: [
        { id: "c4", text: "All matchups look fair", isCorrect: false, nextNode: "stage2_start", feedback: "Look at the rating differences by spending tier.", pointsAwarded: 0 },
        { id: "c5", text: "Free players face much higher-rated opponents, while Whales face much lower-rated opponents", isCorrect: true, nextNode: "stage3_start", feedback: "Exactly! Free players get hard matches (+200 rating), Whales get easy ones (-300 to -500 rating)!", clueAwarded: { id: "clue2", title: "Unfair Matchmaking", description: "System gives whales easier opponents and free players harder ones" }, pointsAwarded: 15 },
        { id: "c6", text: "Not enough data", isCorrect: false, nextNode: "stage2_start", feedback: "The pattern is clear in this sample.", pointsAwarded: 0 },
      ],
    },
  },
  stage3_start: {
    id: "stage3_start",
    phase: "stage3",
    messages: [
      { id: "m16", speaker: "system", text: "🔬 STAGE 3: DATA PREPROCESSING" },
      { id: "m17", speaker: "detective", text: "Now let's analyze the matchmaking algorithm code to find the anomaly." },
    ],
    dataVisualizations: [{
      type: "log",
      title: "Matchmaking Algorithm Code Review",
      data: {
        entries: [
          { time: "Line 45", user: "Algorithm", action: "skill_diff = abs(player1.rating - player2.rating)", status: "normal" },
          { time: "Line 67", user: "Algorithm", action: "if player.spending_tier == 'Whale': skill_diff_threshold += 500", status: "critical" },
          { time: "Line 68", user: "Algorithm", action: "if player.spending_tier == 'Free': skill_diff_threshold -= 200", status: "critical" },
          { time: "Line 92", user: "Algorithm", action: "return matched_opponent", status: "normal" },
        ],
      },
    }],
    question: {
      id: "q3",
      text: "🔍 ANOMALY DETECTION: What code is manipulating matchmaking?",
      choices: [
        { id: "c7", text: "Line 45 calculates skill difference", isCorrect: false, nextNode: "stage3_start", feedback: "That's standard ELO logic, not the problem.", pointsAwarded: 0 },
        { id: "c8", text: "Lines 67-68 give Whales +500 rating tolerance (easier opponents) and Free players -200 (harder opponents)", isCorrect: true, nextNode: "stage4_start", feedback: "Perfect! Hidden code explicitly favors paying players!", clueAwarded: { id: "clue3", title: "Hidden Bias Code", description: "Algorithm secretly adjusts difficulty based on spending" }, pointsAwarded: 20 },
        { id: "c9", text: "Return statement is wrong", isCorrect: false, nextNode: "stage3_start", feedback: "The return is fine. Look at lines 67-68.", pointsAwarded: 0 },
      ],
    },
  },
  stage4_start: {
    id: "stage4_start",
    phase: "stage4",
    messages: [
      { id: "m18", speaker: "system", text: "🧩 STAGE 4: EVIDENCE ANALYSIS" },
      { id: "m19", speaker: "detective", text: "Let's combine all evidence:" },
      { id: "m20", speaker: "detective", text: "1. Whales have 78% win rate, free players 35%\n2. Logs show unfair rating differences\n3. Code explicitly adjusts difficulty by spending" },
    ],
    dataVisualizations: [{
      type: "table",
      title: "Evidence Timeline",
      data: {
        headers: ["Evidence", "Source", "Impact", "Conclusion"],
        rows: [
          ["Win rate gap", "Game statistics", "78% vs 35%", "Massive advantage"],
          ["Unfair matchups", "Matchmaking logs", "+500 / -200 rating", "Systematic bias"],
          ["Hidden code", "Algorithm review", "Lines 67-68", "Intentional manipulation"],
        ],
      },
    }],
    question: {
      id: "q4",
      text: "🎯 EVIDENCE SYNTHESIS: Who's responsible?",
      choices: [
        { id: "c10", text: "Random algorithm bug", isCorrect: false, nextNode: "stage4_start", feedback: "Lines 67-68 are too specific to be a bug.", pointsAwarded: 0 },
        { id: "c11", text: "Someone intentionally coded pay-to-win bias into the algorithm to favor paying players and drive revenue", isCorrect: true, nextNode: "stage5_resolution", feedback: "Exactly! This was deliberate manipulation for profit!", clueAwarded: { id: "clue4", title: "Intentional Pay-to-Win Code", description: "Algorithm was deliberately programmed to favor whales" }, pointsAwarded: 25 },
        { id: "c12", text: "Alex made a mistake", isCorrect: false, nextNode: "stage4_start", feedback: "This is too systematic to be a mistake.", pointsAwarded: 0 },
      ],
    },
  },
  stage5_resolution: {
    id: "stage5_resolution",
    phase: "stage5",
    messages: [
      { id: "m21", speaker: "system", text: "✅ STAGE 5: INSIGHT & RESOLUTION" },
      { id: "m22", speaker: "detective", text: "The evidence is overwhelming. Someone deliberately coded pay-to-win mechanics into your matchmaking algorithm." },
      { id: "m23", speaker: "detective", text: "Lines 67-68 explicitly give easier opponents to paying players and harder ones to free players." },
      { id: "m24", speaker: "client", text: "But who did this? And why?" },
      { id: "m25", speaker: "detective", text: "Further investigation reveals: The company VP pressured developers to 'improve retention metrics for high-value users.' This was disguised corporate policy, not a rogue developer." },
      { id: "m26", speaker: "detective", text: "Immediate actions: 1) Remove lines 67-68, 2) Implement fair skill-based matching, 3) Public apology to players, 4) Review corporate pressures on dev team." },
      { id: "m27", speaker: "narrator", text: "✅ CASE CLOSED: The Secret of the Hidden Algorithm" },
      { id: "m28", speaker: "system", text: "💡 KEY INSIGHT: Algorithm fairness must be verified not just by reviewing code, but by analyzing execution results. Unusual patterns in outcome data reveal hidden biases that code reviews might miss. Always test algorithms against real data to ensure they perform as intended." },
    ],
  },
};
