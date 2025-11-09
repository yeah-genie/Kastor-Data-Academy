export interface Message {
  id: string;
  speaker: "detective" | "client" | "system" | "narrator";
  text: string;
  avatar?: string;
}

export interface DataVisualization {
  type: "chart" | "table" | "log";
  title: string;
  data: any;
}

export interface StoryNode {
  id: string;
  phase: "stage1" | "stage2" | "stage3" | "stage4" | "stage5";
  messages: Message[];
  dataVisualizations?: DataVisualization[];
  question?: {
    id: string;
    text: string;
    choices: {
      id: string;
      text: string;
      isCorrect: boolean;
      nextNode: string;
      feedback: string;
      clueAwarded?: {
        id: string;
        title: string;
        description: string;
      };
      pointsAwarded?: number;
    }[];
  };
  autoAdvance?: {
    nextNode: string;
    delay: number;
  };
}

export const case1Story: Record<string, StoryNode> = {
  start: {
    id: "start",
    phase: "stage1",
    messages: [
      {
        id: "m1",
        speaker: "system",
        text: "📁 CASE FILE #001",
      },
      {
        id: "m2",
        speaker: "system",
        text: "THE MISSING BALANCE PATCH",
      },
      {
        id: "m3",
        speaker: "narrator",
        text: "Late at night, your office door bursts open...",
      },
      {
        id: "m4",
        speaker: "client",
        text: "Detective! We have a serious problem with our game!",
      },
      {
        id: "m5",
        speaker: "detective",
        text: "Please calm down. Tell me what happened.",
      },
      {
        id: "m6",
        speaker: "client",
        text: "I'm a game designer for 'Legend Battle', an online game. A few days ago, a specific character's win rate surged abnormally!",
      },
      {
        id: "m7",
        speaker: "client",
        text: "Nobody made any changes... Something strange is happening. Could an insider have manipulated the data?",
      },
      {
        id: "m8",
        speaker: "detective",
        text: "Interesting. Can you show me the game data and patch logs?",
      },
    ],
    autoAdvance: {
      nextNode: "stage1_initial_data",
      delay: 1000,
    },
  },

  stage1_initial_data: {
    id: "stage1_initial_data",
    phase: "stage1",
    messages: [
      {
        id: "m9",
        speaker: "client",
        text: "Here's the win rate data for each character over the past 3 weeks.",
      },
    ],
    dataVisualizations: [
      {
        type: "chart",
        title: "Character Win Rate Trend (3 Weeks)",
        data: {
          labels: ["Week 1", "Week 2", "Week 3"],
          datasets: [
            {
              label: "Dragon Knight",
              data: [52, 53, 78],
              color: "#ef4444",
            },
            {
              label: "Shadow Assassin",
              data: [48, 49, 47],
              color: "#8b5cf6",
            },
            {
              label: "Mystic Mage",
              data: [50, 51, 50],
              color: "#3b82f6",
            },
          ],
        },
      },
    ],
    question: {
      id: "q1",
      text: "🎯 HYPOTHESIS: Which character shows abnormal behavior?",
      choices: [
        {
          id: "c1",
          text: "Shadow Assassin is slightly decreasing",
          isCorrect: false,
          nextNode: "wrong_answer_1",
          feedback: "That's a normal minor fluctuation.",
          pointsAwarded: 0,
        },
        {
          id: "c2",
          text: "Dragon Knight jumped from 53% to 78% in Week 3",
          isCorrect: true,
          nextNode: "stage2_start",
          feedback: "Correct! Dragon Knight's win rate increased by 25% - highly abnormal!",
          clueAwarded: {
            id: "clue1",
            title: "Abnormal Win Rate Spike",
            description: "Dragon Knight's win rate surged 25% in Week 3",
          },
          pointsAwarded: 10,
        },
        {
          id: "c3",
          text: "All characters are balanced",
          isCorrect: false,
          nextNode: "wrong_answer_1",
          feedback: "Look at the data more carefully.",
          pointsAwarded: 0,
        },
      ],
    },
  },

  wrong_answer_1: {
    id: "wrong_answer_1",
    phase: "stage1",
    messages: [
      {
        id: "m10",
        speaker: "detective",
        text: "Look at the data again. Which character changed suddenly?",
      },
    ],
    autoAdvance: {
      nextNode: "stage1_initial_data",
      delay: 1500,
    },
  },

  stage2_start: {
    id: "stage2_start",
    phase: "stage2",
    messages: [
      {
        id: "m11",
        speaker: "system",
        text: "📊 STAGE 2: DATA COLLECTION",
      },
      {
        id: "m12",
        speaker: "client",
        text: "Exactly! It became strange starting in Week 3. We didn't touch anything...",
      },
      {
        id: "m13",
        speaker: "detective",
        text: "Let's check the patch logs. I need to interview the development team to see what changes were made around Week 3.",
      },
      {
        id: "m14",
        speaker: "narrator",
        text: "You speak with Jenny, the lead developer...",
      },
      {
        id: "m15",
        speaker: "client",
        text: "Jenny says: 'I only worked on UI bugs and chat system. I didn't touch character balance at all.'",
      },
      {
        id: "m16",
        speaker: "detective",
        text: "Okay. Now let's look at the system patch logs.",
      },
    ],
    autoAdvance: {
      nextNode: "stage2_patch_logs",
      delay: 1000,
    },
  },

  stage2_patch_logs: {
    id: "stage2_patch_logs",
    phase: "stage2",
    messages: [
      {
        id: "m17",
        speaker: "client",
        text: "Here are the system patch logs.",
      },
    ],
    dataVisualizations: [
      {
        type: "table",
        title: "Game Patch Logs",
        data: {
          headers: ["Date", "Version", "Modified By", "Changes"],
          rows: [
            ["2025-10-15", "v2.3.1", "dev_jenny", "UI bug fixes"],
            ["2025-10-22", "v2.3.2", "dev_mark", "Server optimization"],
            ["2025-10-29", "v2.4.0", "admin01", "Dragon Knight ATK +15%, DEF +20%"],
            ["2025-11-02", "v2.4.1", "dev_jenny", "Chat system improvements"],
          ],
        },
      },
    ],
    question: {
      id: "q2",
      text: "🔍 DATA COLLECTION: What suspicious activity do you find in the patch logs?",
      choices: [
        {
          id: "c4",
          text: "dev_jenny modified too frequently",
          isCorrect: false,
          nextNode: "wrong_answer_2",
          feedback: "dev_jenny's work is normal development activity.",
          pointsAwarded: 0,
        },
        {
          id: "c5",
          text: "On Oct 29, admin01 significantly buffed Dragon Knight",
          isCorrect: true,
          nextNode: "stage3_start",
          feedback: "Correct! admin01 greatly increased Dragon Knight's attack and defense. This is the cause of the win rate spike!",
          clueAwarded: {
            id: "clue2",
            title: "Unauthorized Balance Patch",
            description: "admin01 buffed Dragon Knight without approval",
          },
          pointsAwarded: 15,
        },
        {
          id: "c6",
          text: "Server optimization is the problem",
          isCorrect: false,
          nextNode: "wrong_answer_2",
          feedback: "Server optimization doesn't affect character balance.",
          pointsAwarded: 0,
        },
      ],
    },
  },

  wrong_answer_2: {
    id: "wrong_answer_2",
    phase: "stage2",
    messages: [
      {
        id: "m18",
        speaker: "detective",
        text: "That's not it. Look for changes directly related to Dragon Knight.",
      },
    ],
    autoAdvance: {
      nextNode: "stage2_patch_logs",
      delay: 1500,
    },
  },

  stage3_start: {
    id: "stage3_start",
    phase: "stage3",
    messages: [
      {
        id: "m19",
        speaker: "system",
        text: "🔬 STAGE 3: DATA PREPROCESSING",
      },
      {
        id: "m20",
        speaker: "client",
        text: "admin01...? That person is a server administrator. They don't have permission to modify game balance!",
      },
      {
        id: "m21",
        speaker: "detective",
        text: "Interesting. Let's check the permission logs to identify anomalies.",
      },
    ],
    dataVisualizations: [
      {
        type: "log",
        title: "Admin Permission Access Logs",
        data: {
          entries: [
            { time: "2025-10-28 23:47", user: "admin01", action: "Permission elevation request", status: "denied" },
            { time: "2025-10-29 02:15", user: "admin01", action: "Direct database access", status: "success" },
            { time: "2025-10-29 02:18", user: "admin01", action: "Character stats modification", status: "success" },
            { time: "2025-10-29 02:20", user: "admin01", action: "Log deletion attempt", status: "failed" },
          ],
        },
      },
    ],
    question: {
      id: "q3",
      text: "🔍 ANOMALY DETECTION: What pattern do you see in admin01's activities?",
      choices: [
        {
          id: "c7",
          text: "Just a normal workflow",
          isCorrect: false,
          nextNode: "wrong_answer_3",
          feedback: "Log deletion attempts are not normal behavior.",
          pointsAwarded: 0,
        },
        {
          id: "c8",
          text: "Permission request denied → Late night unauthorized DB access → Stats manipulation → Attempted cover-up",
          isCorrect: true,
          nextNode: "stage4_start",
          feedback: "Perfect! This sequence clearly shows intentional unauthorized manipulation and evidence destruction attempts!",
          clueAwarded: {
            id: "clue3",
            title: "Unauthorized Access Pattern",
            description: "admin01 bypassed denied permissions and attempted to hide evidence",
          },
          pointsAwarded: 20,
        },
        {
          id: "c9",
          text: "Server maintenance activity",
          isCorrect: false,
          nextNode: "wrong_answer_3",
          feedback: "Server admins don't modify game balance during maintenance.",
          pointsAwarded: 0,
        },
      ],
    },
  },

  wrong_answer_3: {
    id: "wrong_answer_3",
    phase: "stage3",
    messages: [
      {
        id: "m22",
        speaker: "detective",
        text: "Think about the sequence of events. What story do they tell?",
      },
    ],
    autoAdvance: {
      nextNode: "stage3_start",
      delay: 1500,
    },
  },

  stage4_start: {
    id: "stage4_start",
    phase: "stage4",
    messages: [
      {
        id: "m23",
        speaker: "system",
        text: "🧩 STAGE 4: EVIDENCE ANALYSIS",
      },
      {
        id: "m24",
        speaker: "detective",
        text: "Now let's combine all the evidence. We have three key pieces:",
      },
      {
        id: "m25",
        speaker: "detective",
        text: "1. Dragon Knight's win rate increased 25% in Week 3\n2. admin01 made unauthorized balance changes on Oct 29\n3. admin01 attempted to delete access logs",
      },
      {
        id: "m26",
        speaker: "detective",
        text: "Let's verify the timeline alignment.",
      },
    ],
    dataVisualizations: [
      {
        type: "table",
        title: "Timeline Analysis",
        data: {
          headers: ["Event", "Date/Period", "Impact", "Evidence"],
          rows: [
            ["Normal gameplay", "Week 1-2", "Win rate 52-53%", "Game data"],
            ["Permission denied", "Oct 28 11:47PM", "Legitimate access blocked", "Permission log"],
            ["Unauthorized patch", "Oct 29 2:15AM", "+15% ATK, +20% DEF", "Patch log + DB log"],
            ["Win rate spike", "Week 3", "Win rate jumped to 78%", "Game data"],
            ["Cover-up attempt", "Oct 29 2:20AM", "Log deletion failed", "Security log"],
          ],
        },
      },
    ],
    question: {
      id: "q4",
      text: "🎯 EVIDENCE SYNTHESIS: What is the complete picture?",
      choices: [
        {
          id: "c10",
          text: "A simple mistake by admin01",
          isCorrect: false,
          nextNode: "wrong_answer_4",
          feedback: "The cover-up attempt proves intent, not a mistake.",
          pointsAwarded: 0,
        },
        {
          id: "c11",
          text: "admin01 deliberately manipulated game balance through unauthorized access and attempted to hide the evidence, causing competitive imbalance",
          isCorrect: true,
          nextNode: "stage5_resolution",
          feedback: "Excellent analysis! All evidence points to intentional insider manipulation!",
          clueAwarded: {
            id: "clue4",
            title: "Complete Case Evidence",
            description: "Full timeline of insider manipulation and cover-up",
          },
          pointsAwarded: 25,
        },
        {
          id: "c12",
          text: "A bug in the game system",
          isCorrect: false,
          nextNode: "wrong_answer_4",
          feedback: "Bugs don't show up in admin access logs and patch records.",
          pointsAwarded: 0,
        },
      ],
    },
  },

  wrong_answer_4: {
    id: "wrong_answer_4",
    phase: "stage4",
    messages: [
      {
        id: "m27",
        speaker: "detective",
        text: "Look at all the evidence together. What's the only explanation that fits all the facts?",
      },
    ],
    autoAdvance: {
      nextNode: "stage4_start",
      delay: 1500,
    },
  },

  stage5_resolution: {
    id: "stage5_resolution",
    phase: "stage5",
    messages: [
      {
        id: "m28",
        speaker: "system",
        text: "✅ STAGE 5: INSIGHT & RESOLUTION",
      },
      {
        id: "m29",
        speaker: "detective",
        text: "The case is clear. admin01, a server administrator, intentionally manipulated Dragon Knight's stats without authorization.",
      },
      {
        id: "m30",
        speaker: "detective",
        text: "When legitimate permission requests were denied, they used direct database access in the middle of the night to bypass security.",
      },
      {
        id: "m31",
        speaker: "detective",
        text: "The attempted log deletion proves this was premeditated, not an accident.",
      },
      {
        id: "m32",
        speaker: "client",
        text: "Unbelievable... What should we do?",
      },
      {
        id: "m33",
        speaker: "detective",
        text: "Immediate actions: 1) Revert the unauthorized patch, 2) Investigate admin01's motives and other activities, 3) Strengthen permission controls to prevent future incidents.",
      },
      {
        id: "m34",
        speaker: "narrator",
        text: "✅ CASE CLOSED: The Missing Balance Patch",
      },
      {
        id: "m35",
        speaker: "system",
        text: "💡 KEY INSIGHT: Sudden changes in data always have a cause. By checking system logs and permission records, you can uncover hidden manipulations. Always verify: What changed? When? Who made the change? Did they have proper authorization?",
      },
    ],
  },
};
