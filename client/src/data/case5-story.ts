import type { StoryNode } from "./case1-story";

export const case5Story: Record<string, StoryNode> = {
  start: {
    id: "start",
    phase: "briefing",
    messages: [
      {
        id: "m1",
        speaker: "system",
        text: "📁 CASE FILE #005",
      },
      {
        id: "m2",
        speaker: "system",
        text: "THE SERVER CRASH PATTERN",
      },
      {
        id: "m3",
        speaker: "narrator",
        text: "An urgent call arrives from a frantic server administrator...",
      },
      {
        id: "m4",
        speaker: "client",
        text: "Detective! Our game servers keep crashing at the same time every day! We're losing thousands of players!",
      },
      {
        id: "m5",
        speaker: "detective",
        text: "Calm down. Tell me more about these crashes. When exactly do they occur?",
      },
      {
        id: "m6",
        speaker: "client",
        text: "Every evening around 8 PM! It started 5 days ago. We've checked our code, hardware, everything—but can't find the cause!",
      },
      {
        id: "m7",
        speaker: "detective",
        text: "Consistent timing is suspicious. Let's analyze the server logs and traffic patterns.",
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
        id: "m8",
        speaker: "client",
        text: "Here's our server load data from the past week.",
      },
    ],
    dataVisualizations: [
      {
        type: "chart",
        title: "Server Load Pattern (7 Days)",
        data: {
          labels: ["12PM", "2PM", "4PM", "6PM", "8PM", "10PM", "12AM"],
          datasets: [
            {
              label: "Normal Days (Before Incident)",
              data: [5000, 8000, 12000, 18000, 22000, 15000, 8000],
              color: "#3b82f6",
            },
            {
              label: "Crash Days (Recent)",
              data: [5000, 8000, 12000, 18000, 95000, 0, 0],
              color: "#ef4444",
            },
          ],
        },
      },
    ],
    question: {
      id: "q1",
      text: "First clue: What pattern do you see in the server load?",
      choices: [
        {
          id: "c1",
          text: "Server load gradually increases during the day",
          isCorrect: false,
          nextNode: "wrong_answer_1",
          feedback: "That's normal behavior. Focus on what's different during crash days.",
          pointsAwarded: 0,
        },
        {
          id: "c2",
          text: "At 8PM on crash days, server load suddenly spikes to 95,000 (4x normal), then drops to zero (server crash)",
          isCorrect: true,
          nextNode: "investigation_start",
          feedback: "Excellent observation! The load jumps from 22,000 to 95,000—far beyond normal capacity!",
          clueAwarded: {
            id: "clue1",
            title: "Abnormal Traffic Spike",
            description: "Server receives 4x normal traffic at exactly 8PM, causing system overload",
          },
          pointsAwarded: 10,
        },
        {
          id: "c3",
          text: "Player activity is too high at night",
          isCorrect: false,
          nextNode: "wrong_answer_1",
          feedback: "Normal peak is 22,000. The 95,000 spike is not normal player activity.",
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
        id: "m9",
        speaker: "detective",
        text: "Look at the numbers more carefully. Compare normal days vs crash days at 8PM.",
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
        id: "m10",
        speaker: "client",
        text: "You're right! That's way beyond our server capacity. But where is all that traffic coming from?",
      },
      {
        id: "m11",
        speaker: "detective",
        text: "Let's examine the connection logs. We need to see WHO is connecting.",
      },
      {
        id: "m12",
        speaker: "client",
        text: "Here's the IP connection analysis from last night's crash.",
      },
    ],
    dataVisualizations: [
      {
        type: "table",
        title: "Connection Analysis (8PM Crash Event)",
        data: {
          headers: ["IP Pattern", "Connection Count", "Request Type", "Geographic Origin"],
          rows: [
            ["Legitimate Players", "22,000", "Normal gameplay", "Global (distributed)"],
            ["185.220.*.* range", "45,000", "Login spam", "Single datacenter (Eastern Europe)"],
            ["92.118.*.* range", "28,000", "Login spam", "Single datacenter (Eastern Europe)"],
            ["Bot Pattern IPs", "73,000", "Automated requests", "2 locations only"],
          ],
        },
      },
    ],
    question: {
      id: "q2",
      text: "Second clue: What does this connection data tell you?",
      choices: [
        {
          id: "c4",
          text: "You suddenly got very popular in Eastern Europe",
          isCorrect: false,
          nextNode: "wrong_answer_2",
          feedback: "Real players distribute globally. Focused traffic from 2 datacenters is suspicious.",
          pointsAwarded: 0,
        },
        {
          id: "c5",
          text: "73,000 bot connections from 2 datacenter locations are flooding the server with automated login spam—this is a DDoS attack",
          isCorrect: true,
          nextNode: "investigation_deep",
          feedback: "Precisely! Concentrated traffic from limited sources making automated requests is a classic DDoS attack pattern!",
          clueAwarded: {
            id: "clue2",
            title: "DDoS Attack Confirmed",
            description: "Malicious botnet flooding server with fake login requests",
          },
          pointsAwarded: 15,
        },
        {
          id: "c6",
          text: "Your login system is broken",
          isCorrect: false,
          nextNode: "wrong_answer_2",
          feedback: "The login system is fine. The problem is the malicious traffic overwhelming it.",
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
        id: "m13",
        speaker: "detective",
        text: "Think about the pattern: same source locations, automated requests, overwhelming volume.",
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
        id: "m14",
        speaker: "client",
        text: "A DDoS attack?! But who would do this and why?",
      },
      {
        id: "m15",
        speaker: "detective",
        text: "Let's check the timing more carefully. Is there any pattern to when attacks start?",
      },
    ],
    dataVisualizations: [
      {
        type: "log",
        title: "Attack Timeline Analysis",
        data: {
          entries: [
            { time: "5 days ago", user: "Competitor Game", action: "Launched similar game", status: "noted" },
            { time: "5 days ago 8PM", user: "First DDoS", action: "During your peak tournament event", status: "attacked" },
            { time: "4 days ago 8PM", user: "Second DDoS", action: "During ranked season start", status: "attacked" },
            { time: "3 days ago 8PM", user: "Third DDoS", action: "During new content launch", status: "attacked" },
            { time: "Yesterday 8PM", user: "Fourth DDoS", action: "During esports championship", status: "attacked" },
          ],
        },
      },
    ],
    question: {
      id: "q3",
      text: "Final analysis: What is the attacker's strategy?",
      choices: [
        {
          id: "c7",
          text: "Random attacks just to cause chaos",
          isCorrect: false,
          nextNode: "wrong_answer_3",
          feedback: "The timing is too precise. Every attack hits during your major events.",
          pointsAwarded: 0,
        },
        {
          id: "c8",
          text: "Strategically timed attacks during your biggest events (tournaments, launches, championships) to drive frustrated players to the competing game that just launched",
          isCorrect: true,
          nextNode: "resolution_start",
          feedback: "Perfect deduction! This is coordinated sabotage—attacking during key events to maximize player frustration and drive them to competitors!",
          clueAwarded: {
            id: "clue3",
            title: "Competitive Sabotage",
            description: "DDoS attacks strategically timed with major game events and competitor's launch",
          },
          pointsAwarded: 20,
        },
        {
          id: "c9",
          text: "Your infrastructure can't handle peak times",
          isCorrect: false,
          nextNode: "wrong_answer_3",
          feedback: "Your normal peak is 22,000. The 95,000 is malicious traffic, not real players.",
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
        id: "m16",
        speaker: "detective",
        text: "Look at the correlation: competitor launch + attacks during YOUR major events. What does that suggest?",
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
        id: "m17",
        speaker: "detective",
        text: "This is deliberate competitive sabotage. Someone wants to destroy your player experience at critical moments.",
      },
      {
        id: "m18",
        speaker: "client",
        text: "What can we do to stop this?",
      },
      {
        id: "m19",
        speaker: "detective",
        text: "Immediate actions: 1) Implement DDoS protection (rate limiting, IP filtering), 2) Add server capacity and CDN, 3) Report the attacking IP ranges to authorities, 4) Consider legal action against the competitor.",
      },
      {
        id: "m20",
        speaker: "detective",
        text: "I've documented all evidence. The attack pattern, timing correlation with competitor's launch, and strategic targeting of your events creates a strong case.",
      },
      {
        id: "m21",
        speaker: "narrator",
        text: "✅ CASE CLOSED: The Server Crash Pattern",
      },
      {
        id: "m22",
        speaker: "system",
        text: "💡 KEY LEARNING: When investigating technical issues, always look for patterns in timing, sources, and context. Correlation analysis can reveal malicious intent. DDoS attacks often target critical business moments to maximize damage. Proper monitoring and data analysis are essential for identifying and responding to cyber threats.",
      },
    ],
  },
};
