import type { StoryNode } from "./case1-story";

export const case4Story: Record<string, StoryNode> = {
  start: {
    id: "start",
    phase: "briefing",
    messages: [
      {
        id: "m1",
        speaker: "system",
        text: "📁 CASE FILE #004",
      },
      {
        id: "m2",
        speaker: "system",
        text: "THE DLC REVENUE MYSTERY",
      },
      {
        id: "m3",
        speaker: "narrator",
        text: "A game studio's finance director urgently contacts you...",
      },
      {
        id: "m4",
        speaker: "client",
        text: "Detective! We have a strange situation. Our DLC sales revenue has doubled, but player satisfaction is plummeting!",
      },
      {
        id: "m5",
        speaker: "detective",
        text: "Interesting. Higher revenue but lower satisfaction? Let's examine the data carefully.",
      },
      {
        id: "m6",
        speaker: "client",
        text: "We launched a new DLC pack last month. Sales are amazing, but the community is furious. I don't understand what went wrong!",
      },
    ],
    autoAdvance: {
      nextNode: "briefing_data",
      delay: 1000,
    },
  },

  briefing_data: {
    id: "briefing_data",
    phase: "briefing",
    messages: [
      {
        id: "m7",
        speaker: "client",
        text: "Here's the revenue data from the past 3 months.",
      },
    ],
    dataVisualizations: [
      {
        type: "chart",
        title: "DLC Revenue (3 Months)",
        data: {
          labels: ["Month 1", "Month 2", "Month 3"],
          datasets: [
            {
              label: "Cosmetic DLC",
              data: [15000, 16000, 17000],
              color: "#3b82f6",
            },
            {
              label: "Premium Power Pack",
              data: [0, 0, 42000],
              color: "#ef4444",
            },
            {
              label: "Story Expansion",
              data: [18000, 19000, 20000],
              color: "#8b5cf6",
            },
          ],
        },
      },
    ],
    question: {
      id: "q1",
      text: "First clue: Which DLC shows unusual revenue growth?",
      choices: [
        {
          id: "c1",
          text: "Cosmetic DLC shows steady growth",
          isCorrect: false,
          nextNode: "wrong_answer_1",
          feedback: "Cosmetic DLC shows normal, gradual growth.",
          pointsAwarded: 0,
        },
        {
          id: "c2",
          text: "Premium Power Pack generated massive revenue suddenly in Month 3",
          isCorrect: true,
          nextNode: "investigation_start",
          feedback: "Correct! The Premium Power Pack appeared suddenly and generated more revenue than all other DLCs combined!",
          clueAwarded: {
            id: "clue1",
            title: "Suspicious Revenue Spike",
            description: "Premium Power Pack shows abnormal revenue concentration",
          },
          pointsAwarded: 10,
        },
        {
          id: "c3",
          text: "Story Expansion is performing poorly",
          isCorrect: false,
          nextNode: "wrong_answer_1",
          feedback: "Story Expansion shows healthy, consistent growth.",
          pointsAwarded: 0,
        },
      ],
    },
  },

  wrong_answer_1: {
    id: "wrong_answer_1",
    phase: "briefing",
    messages: [
      {
        id: "m8",
        speaker: "detective",
        text: "Look more carefully. Which DLC was just introduced and shows dramatic impact?",
      },
    ],
    autoAdvance: {
      nextNode: "briefing_data",
      delay: 1500,
    },
  },

  investigation_start: {
    id: "investigation_start",
    phase: "investigation",
    messages: [
      {
        id: "m9",
        speaker: "client",
        text: "Yes! The Premium Power Pack was our new strategy to increase revenue. It includes powerful weapons and stat boosts!",
      },
      {
        id: "m10",
        speaker: "detective",
        text: "Let's check the player review data. What are players saying about this?",
      },
      {
        id: "m11",
        speaker: "client",
        text: "Here are the recent player reviews and ratings.",
      },
    ],
    dataVisualizations: [
      {
        type: "table",
        title: "Player Review Analysis (Recent 2 Weeks)",
        data: {
          headers: ["Category", "Positive %", "Negative %", "Common Keywords"],
          rows: [
            ["Gameplay Balance", "15%", "85%", "unfair, pay-to-win, broken"],
            ["Premium Power Pack", "8%", "92%", "overpowered, expensive, cheating"],
            ["Story Content", "78%", "22%", "good story, fun quests"],
            ["Cosmetics", "82%", "18%", "beautiful, worth it"],
          ],
        },
      },
    ],
    question: {
      id: "q2",
      text: "Second clue: What is the core problem shown in the review data?",
      choices: [
        {
          id: "c4",
          text: "Players don't like the story content",
          isCorrect: false,
          nextNode: "wrong_answer_2",
          feedback: "Story content has 78% positive reviews. That's not the problem.",
          pointsAwarded: 0,
        },
        {
          id: "c5",
          text: "The Premium Power Pack is creating a pay-to-win environment, making the game unfair for non-paying players",
          isCorrect: true,
          nextNode: "investigation_deep",
          feedback: "Exactly! 92% negative reviews with keywords like 'pay-to-win', 'overpowered', and 'unfair' reveal the core issue!",
          clueAwarded: {
            id: "clue2",
            title: "Pay-to-Win Problem",
            description: "Premium items create unfair advantage and damage game balance",
          },
          pointsAwarded: 15,
        },
        {
          id: "c6",
          text: "Cosmetics are too expensive",
          isCorrect: false,
          nextNode: "wrong_answer_2",
          feedback: "Cosmetics have 82% positive reviews. They're not the issue.",
          pointsAwarded: 0,
        },
      ],
    },
  },

  wrong_answer_2: {
    id: "wrong_answer_2",
    phase: "investigation",
    messages: [
      {
        id: "m12",
        speaker: "detective",
        text: "That's not it. Focus on what has the highest negative feedback.",
      },
    ],
    autoAdvance: {
      nextNode: "investigation_start",
      delay: 1500,
    },
  },

  investigation_deep: {
    id: "investigation_deep",
    phase: "investigation",
    messages: [
      {
        id: "m13",
        speaker: "client",
        text: "Oh no... I was so focused on revenue that I didn't consider the competitive balance!",
      },
      {
        id: "m14",
        speaker: "detective",
        text: "Let's examine player retention data to see the long-term impact.",
      },
    ],
    dataVisualizations: [
      {
        type: "log",
        title: "Player Activity Metrics (Post-DLC Launch)",
        data: {
          entries: [
            { time: "Week 1", user: "Active Players", action: "45,000 players", status: "normal" },
            { time: "Week 2", user: "Active Players", action: "38,000 players (-15%)", status: "declining" },
            { time: "Week 3", user: "Active Players", action: "29,000 players (-35%)", status: "critical" },
            { time: "Week 4", user: "Active Players", action: "22,000 players (-51%)", status: "emergency" },
          ],
        },
      },
    ],
    question: {
      id: "q3",
      text: "Final verdict: What is the business impact of this pay-to-win model?",
      choices: [
        {
          id: "c7",
          text: "Short-term revenue is up, so it's working well",
          isCorrect: false,
          nextNode: "wrong_answer_3",
          feedback: "You're missing the bigger picture. Look at the player retention trend.",
          pointsAwarded: 0,
        },
        {
          id: "c8",
          text: "While generating short-term revenue, it's destroying the game's competitive integrity and causing massive player exodus (-51%), which will kill the game long-term",
          isCorrect: true,
          nextNode: "resolution_start",
          feedback: "Perfect analysis! Short-term profits are destroying long-term sustainability. The player base is collapsing!",
          clueAwarded: {
            id: "clue3",
            title: "Unsustainable Revenue Model",
            description: "Pay-to-win strategy sacrifices long-term player base for short-term profits",
          },
          pointsAwarded: 20,
        },
        {
          id: "c9",
          text: "Players are just complaining but will adapt",
          isCorrect: false,
          nextNode: "wrong_answer_3",
          feedback: "The 51% player loss shows they're not adapting—they're leaving.",
          pointsAwarded: 0,
        },
      ],
    },
  },

  wrong_answer_3: {
    id: "wrong_answer_3",
    phase: "investigation",
    messages: [
      {
        id: "m15",
        speaker: "detective",
        text: "Think about sustainability. What happens when half your players leave?",
      },
    ],
    autoAdvance: {
      nextNode: "investigation_deep",
      delay: 1500,
    },
  },

  resolution_start: {
    id: "resolution_start",
    phase: "resolution",
    messages: [
      {
        id: "m16",
        speaker: "detective",
        text: "The evidence is clear. Your DLC strategy prioritized immediate revenue over game health.",
      },
      {
        id: "m17",
        speaker: "client",
        text: "I understand now... What should we do?",
      },
      {
        id: "m18",
        speaker: "detective",
        text: "I recommend: 1) Remove or rebalance the pay-to-win items, 2) Shift to cosmetic-only monetization, 3) Issue a public apology and compensation to players.",
      },
      {
        id: "m19",
        speaker: "detective",
        text: "Remember: A healthy player community is worth more than short-term profit spikes. Data showed you made $42,000 this month but lost 51% of your players—that's not sustainable.",
      },
      {
        id: "m20",
        speaker: "narrator",
        text: "✅ CASE CLOSED: The DLC Revenue Mystery",
      },
      {
        id: "m21",
        speaker: "system",
        text: "💡 KEY LEARNING: Revenue growth doesn't equal success. Always analyze player satisfaction, retention, and long-term sustainability alongside financial metrics. Pay-to-win models may boost short-term revenue but often destroy the player base.",
      },
    ],
  },
};
