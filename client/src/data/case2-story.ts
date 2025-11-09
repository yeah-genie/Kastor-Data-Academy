import { StoryNode } from "./case1-story";

export const case2Story: Record<string, StoryNode> = {
  start: {
    id: "start",
    phase: "stage1",
    messages: [
      { id: "m1", speaker: "system", text: "📁 CASE FILE #002" },
      { id: "m2", speaker: "system", text: "THE GHOST USER'S RANKING MANIPULATION" },
      { id: "m3", speaker: "narrator", text: "Another client arrives after hearing of your reputation..." },
      { id: "m4", speaker: "client", text: "Detective! Something strange happened in our game ranking system!" },
      { id: "m5", speaker: "detective", text: "Please explain calmly. What's the problem?" },
      { id: "m6", speaker: "client", text: "Yesterday morning, a user named 'PhantomKing' appeared at rank #1. But this account doesn't exist in our database!" },
      { id: "m7", speaker: "client", text: "Even stranger, this user's score is abnormally high. Look at the ranking data." },
    ],
    autoAdvance: { nextNode: "stage1_data", delay: 1000 },
  },
  stage1_data: {
    id: "stage1_data",
    phase: "stage1",
    messages: [
      { id: "m8", speaker: "client", text: "Here's the top ranking data from the past week." },
    ],
    dataVisualizations: [{
      type: "table",
      title: "Game Ranking Top 10",
      data: {
        headers: ["Rank", "Username", "Score", "Join Date"],
        rows: [
          ["1", "PhantomKing", "9,999,999", "No data"],
          ["2", "ProGamer123", "125,430", "2024-01-15"],
          ["3", "SkillMaster", "118,920", "2023-11-03"],
          ["4", "TopPlayer99", "112,850", "2024-02-20"],
          ["5", "EliteRank", "108,200", "2023-12-10"],
        ],
      },
    }],
    question: {
      id: "q1",
      text: "🎯 HYPOTHESIS: What's suspicious in the ranking data?",
      choices: [
        {
          id: "c1",
          text: "The score gap between rank 2 and 3",
          isCorrect: false,
          nextNode: "start",
          feedback: "Ranks 2 and 3 are within normal competition range.",
          pointsAwarded: 0,
        },
        {
          id: "c2",
          text: "PhantomKing's score is 80x higher than rank 2 and has no registration data",
          isCorrect: true,
          nextNode: "stage2_start",
          feedback: "Correct! PhantomKing's score is unrealistically high and has no join record!",
          clueAwarded: { id: "clue1", title: "Ghost Account Detected", description: "PhantomKing doesn't exist in DB but shows in rankings" },
          pointsAwarded: 10,
        },
        {
          id: "c3",
          text: "Top rankers have varied join dates",
          isCorrect: false,
          nextNode: "start",
          feedback: "Varied join dates are normal.",
          pointsAwarded: 0,
        },
      ],
    },
  },
  stage2_start: {
    id: "stage2_start",
    phase: "stage2",
    messages: [
      { id: "m9", speaker: "system", text: "📊 STAGE 2: DATA COLLECTION" },
      { id: "m10", speaker: "detective", text: "Let's investigate the database and access logs. I need to interview your database administrator." },
      { id: "m11", speaker: "narrator", text: "You speak with the DB admin..." },
      { id: "m12", speaker: "client", text: "The admin confirms: 'PhantomKing absolutely does not exist in our user table. This is impossible!'" },
      { id: "m13", speaker: "detective", text: "Then how did it appear in the rankings? Let's check the connection logs." },
    ],
    autoAdvance: { nextNode: "stage2_logs", delay: 1000 },
  },
  stage2_logs: {
    id: "stage2_logs",
    phase: "stage2",
    messages: [{ id: "m14", speaker: "client", text: "Here are the database connection logs from yesterday." }],
    dataVisualizations: [{
      type: "log",
      title: "Database Access Logs",
      data: {
        entries: [
          { time: "06:15:23", user: "web_user", action: "SELECT rankings", status: "success" },
          { time: "06:15:24", user: "bot_185.220.101.5", action: "INSERT ranking (PhantomKing, 9999999)", status: "success" },
          { time: "06:15:24", user: "bot_185.220.101.5", action: "INSERT ranking (PhantomKing, 9999999)", status: "success" },
          { time: "06:15:25", user: "bot_185.220.101.5", action: "INSERT ranking (PhantomKing, 9999999)", status: "success" },
          { time: "06:15:26", user: "web_user", action: "SELECT rankings", status: "success" },
        ],
      },
    }],
    question: {
      id: "q2",
      text: "🔍 DATA COLLECTION: What pattern do you see?",
      choices: [
        { id: "c4", text: "Normal user activity", isCorrect: false, nextNode: "stage2_start", feedback: "Look at the bot user pattern.", pointsAwarded: 0 },
        { id: "c5", text: "Automated rapid INSERT requests from a single bot IP (185.220.101.5)", isCorrect: true, nextNode: "stage3_start", feedback: "Exactly! Multiple automated insertions from one IP in rapid succession!", clueAwarded: { id: "clue2", title: "Bot Activity Pattern", description: "Rapid automated insertions from single IP" }, pointsAwarded: 15 },
        { id: "c6", text: "Too many web users", isCorrect: false, nextNode: "stage2_start", feedback: "web_user activity is normal.", pointsAwarded: 0 },
      ],
    },
  },
  stage3_start: {
    id: "stage3_start",
    phase: "stage3",
    messages: [
      { id: "m15", speaker: "system", text: "🔬 STAGE 3: DATA PREPROCESSING" },
      { id: "m16", speaker: "detective", text: "Now let's analyze the IP address geolocation and identify anomalies." },
    ],
    dataVisualizations: [{
      type: "table",
      title: "IP Geolocation Analysis",
      data: {
        headers: ["IP Address", "Requests", "Location", "Type"],
        rows: [
          ["185.220.101.5", "347", "Single Datacenter (Eastern Europe)", "Bot Farm"],
          ["Normal Users", "45,230", "Global (Distributed)", "Legitimate"],
        ],
      },
    }],
    question: {
      id: "q3",
      text: "🔍 ANOMALY DETECTION: What's unusual?",
      choices: [
        { id: "c7", text: "Users are distributed globally", isCorrect: false, nextNode: "stage3_start", feedback: "Global distribution is normal for real users.", pointsAwarded: 0 },
        { id: "c8", text: "All PhantomKing activity originates from a single bot farm datacenter", isCorrect: true, nextNode: "stage4_start", feedback: "Perfect! Concentrated activity from a bot farm, not real players!", clueAwarded: { id: "clue3", title: "Bot Farm Source", description: "All fake activity from single bot farm location" }, pointsAwarded: 20 },
        { id: "c9", text: "Too few requests", isCorrect: false, nextNode: "stage3_start", feedback: "347 automated requests is actually high for a bot.", pointsAwarded: 0 },
      ],
    },
  },
  stage4_start: {
    id: "stage4_start",
    phase: "stage4",
    messages: [
      { id: "m17", speaker: "system", text: "🧩 STAGE 4: EVIDENCE ANALYSIS" },
      { id: "m18", speaker: "detective", text: "Let's combine all evidence:" },
      { id: "m19", speaker: "detective", text: "1. PhantomKing has impossible score (9,999,999)\n2. No account exists in database\n3. Bot-pattern automated insertions\n4. All from single bot farm IP" },
    ],
    dataVisualizations: [{
      type: "table",
      title: "Timeline Analysis",
      data: {
        headers: ["Event", "Time", "Evidence", "Conclusion"],
        rows: [
          ["Normal rankings", "Before 06:15", "Legitimate users only", "System working"],
          ["Bot injection", "06:15:24-25", "347 INSERT from bot IP", "Attack detected"],
          ["Ghost user appears", "06:15:26", "PhantomKing at rank #1", "Manipulation confirmed"],
        ],
      },
    }],
    question: {
      id: "q4",
      text: "🎯 EVIDENCE SYNTHESIS: What's the complete picture?",
      choices: [
        { id: "c10", text: "A legitimate player", isCorrect: false, nextNode: "stage4_start", feedback: "Bots aren't legitimate players.", pointsAwarded: 0 },
        { id: "c11", text: "Automated bot account injected fake ranking data directly into database, bypassing validation", isCorrect: true, nextNode: "stage5_resolution", feedback: "Excellent! Complete picture of bot manipulation!", clueAwarded: { id: "clue4", title: "Complete Evidence", description: "Bot bypassed validation to inject fake rankings" }, pointsAwarded: 25 },
        { id: "c12", text: "Database error", isCorrect: false, nextNode: "stage4_start", feedback: "This is intentional manipulation, not an error.", pointsAwarded: 0 },
      ],
    },
  },
  stage5_resolution: {
    id: "stage5_resolution",
    phase: "stage5",
    messages: [
      { id: "m20", speaker: "system", text: "✅ STAGE 5: INSIGHT & RESOLUTION" },
      { id: "m21", speaker: "detective", text: "The case is clear. A bot farm directly inserted fake ranking data into your database." },
      { id: "m22", speaker: "detective", text: "The bot bypassed user registration entirely, exploiting weak input validation." },
      { id: "m23", speaker: "client", text: "How do we prevent this?" },
      { id: "m24", speaker: "detective", text: "Immediate actions: 1) Remove PhantomKing entries, 2) Add validation requiring valid user_id for rankings, 3) Rate-limit database insertions, 4) Block bot farm IP ranges." },
      { id: "m25", speaker: "narrator", text: "✅ CASE CLOSED: The Ghost User's Ranking Manipulation" },
      { id: "m26", speaker: "system", text: "💡 KEY INSIGHT: Data integrity requires validation at insertion time. Check foreign key relationships - rankings should only accept valid user IDs. Without proper validation, bad data will corrupt your system." },
    ],
  },
};
