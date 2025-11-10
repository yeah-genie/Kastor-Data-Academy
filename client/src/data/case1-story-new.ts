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

export interface StageSummary {
  stage: number;
  title: string;
  keyFindings: string[];
  evidenceCount: number;
  nextStageHint?: string;
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
      evidenceAwarded?: any;
      pointsAwarded?: number;
      hintEvidenceId?: string;
      hintText?: string;
    }[];
  };
  autoAdvance?: {
    nextNode: string;
    delay: number;
  };
  stageSummary?: StageSummary;
}

import { case1Evidence } from "./case1-evidence";

export const case1Story: Record<string, StoryNode> = {
  start: {
    id: "start",
    phase: "stage1",
    messages: [
      { id: "m1", speaker: "system", text: "📁 CASE FILE #001" },
      { id: "m2", speaker: "system", text: "THE MISSING BALANCE PATCH" },
      { id: "m3", speaker: "narrator", text: "🕐 11:47 PM. Your detective office computer screen glows in the darkness. An email notification chimes." },
      { id: "m4", speaker: "narrator", text: "📧 From: Game Studio HQ - Maya Chen" },
      { id: "m5", speaker: "narrator", text: "Subject: [URGENT] Game balance issue - Investigation needed immediately" },
    ],
    autoAdvance: { nextNode: "email_content", delay: 1000 },
  },

  email_content: {
    id: "email_content",
    phase: "stage1",
    messages: [
      { id: "m6", speaker: "client", text: "Detective, we have a major problem. After last night's update, the character 'Shadow Reaper' became incredibly overpowered. Win rate jumped abnormally." },
      { id: "m7", speaker: "client", text: "The community thinks someone deliberately manipulated the balance. Many players have stopped playing. I have a meeting tomorrow morning and need to know what happened." },
      { id: "m8", speaker: "client", text: "- Maya Chen, Game Director" },
      { id: "m9", speaker: "narrator", text: "💬 Kastor (your AI assistant): 'Interesting case! We'll need to analyze the data to solve this mystery. Where should we start?'" },
    ],
    question: {
      id: "q1",
      text: "🎯 HYPOTHESIS: What could cause a sudden win rate spike?",
      choices: [
        { id: "c1", text: "A bug in the update made the character too strong", isCorrect: false, nextNode: "stage2_start", feedback: "Possible, but let's look for evidence of intentional changes first. Let's investigate further.", pointsAwarded: 3 },
        { id: "c2", text: "Someone deliberately changed the balance data", isCorrect: true, nextNode: "stage2_start", feedback: "Good thinking! Let's investigate who had access and motive.", pointsAwarded: 10 },
        { id: "c3", text: "Players discovered a new strategy", isCorrect: false, nextNode: "stage2_start", feedback: "An overnight discovery by all players? Unlikely. But let's investigate the facts.", pointsAwarded: 3 },
      ],
    },
  },

  stage2_start: {
    id: "stage2_start",
    phase: "stage2",
    messages: [
      { id: "m10", speaker: "system", text: "📊 STAGE 2: DATA COLLECTION" },
      { id: "m11", speaker: "narrator", text: "☀️ 8:00 AM. You arrive at the impressive Game Studio headquarters. Large monitors display game stats everywhere." },
      { id: "m12", speaker: "client", text: "Good morning, Detective. Let me introduce you to my team." },
    ],
    autoAdvance: { nextNode: "meet_team", delay: 1000 },
  },

  meet_team: {
    id: "meet_team",
    phase: "stage2",
    messages: [
      { id: "m13", speaker: "client", text: "This is Maya Chen - I'm the Game Director, responsible for all balance decisions." },
      { id: "m14", speaker: "client", text: "Chris Park is our Data Analyst. He specializes in game matchmaking systems." },
      { id: "m15", speaker: "client", text: "And Ryan Torres, our Junior Server Engineer. He manages our log systems." },
      { id: "m16", speaker: "narrator", text: "💬 Kastor: 'I've documented their roles and access levels in your evidence notebook.'" },
    ],
    question: {
      id: "q2",
      text: "🔍 Who should we interview first?",
      choices: [
        { id: "c4", text: "Maya Chen (Game Director)", isCorrect: true, nextNode: "maya_interview", feedback: "Good choice! As the person responsible for balance, Maya is key.", evidenceAwarded: [case1Evidence.maya_profile, case1Evidence.chris_profile, case1Evidence.ryan_profile], pointsAwarded: 15 },
        { id: "c5", text: "Chris Park (Data Analyst)", isCorrect: true, nextNode: "chris_interview", feedback: "Smart! Data analysts often notice unusual patterns first.", evidenceAwarded: [case1Evidence.maya_profile, case1Evidence.chris_profile, case1Evidence.ryan_profile], pointsAwarded: 15 },
        { id: "c6", text: "Ryan Torres (Server Engineer)", isCorrect: true, nextNode: "ryan_interview", feedback: "Excellent! Server logs will be crucial evidence.", evidenceAwarded: [case1Evidence.maya_profile, case1Evidence.chris_profile, case1Evidence.ryan_profile], pointsAwarded: 15 },
      ],
    },
  },

  maya_interview: {
    id: "maya_interview",
    phase: "stage2",
    messages: [
      { id: "m17", speaker: "detective", text: "Maya, tell me about the update process. What happened last night?" },
      { id: "m18", speaker: "client", text: "I stayed late, until midnight, checking all the balance values. I triple-checked everything... [looks exhausted] But with all the pressure lately, maybe I made a mistake..." },
      { id: "m19", speaker: "detective", text: "When did you access the database?" },
      { id: "m20", speaker: "client", text: "I logged in with my admin01 account at 10:47 PM. I reviewed all the balance data, then logged out before midnight." },
      { id: "m21", speaker: "narrator", text: "💬 Kastor: 'Interesting. Maya claims she checked everything carefully, but she admits being under stress. I've saved this conversation.'" },
    ],
    question: {
      id: "q3",
      text: "🎯 What's your next step?",
      choices: [
        { id: "c7", text: "Interview Chris Park", isCorrect: true, nextNode: "chris_interview", feedback: "Let's hear what the data analyst knows.", evidenceAwarded: case1Evidence.maya_dialogue, pointsAwarded: 10 },
        { id: "c8", text: "Interview Ryan Torres", isCorrect: true, nextNode: "ryan_interview", feedback: "Good idea. Server logs will help verify Maya's story.", evidenceAwarded: case1Evidence.maya_dialogue, pointsAwarded: 10 },
      ],
    },
  },

  chris_interview: {
    id: "chris_interview",
    phase: "stage2",
    messages: [
      { id: "m22", speaker: "detective", text: "Chris, as a data analyst, did you notice anything unusual in the win rates?" },
      { id: "m23", speaker: "client", text: "Oh, yes! [smiles nervously] I actually saw strange patterns a few days ago. But I've been really busy with... with my research project." },
      { id: "m24", speaker: "detective", text: "Research project?" },
      { id: "m25", speaker: "client", text: "[defensive] It's just... personal research. Using AI to create better game matchmaking. It's not related to the company! [pauses] Well, I needed some data for it..." },
      { id: "m26", speaker: "narrator", text: "💬 Kastor: 'He's hiding something. Why would he need company data for 'personal' research? Let's keep investigating.'" },
    ],
    question: {
      id: "q4",
      text: "🎯 What's your next step?",
      choices: [
        { id: "c9", text: "Interview Ryan Torres", isCorrect: true, nextNode: "ryan_interview", feedback: "Server logs will show us what really happened.", evidenceAwarded: case1Evidence.chris_dialogue, pointsAwarded: 10 },
        { id: "c10", text: "Interview Maya Chen", isCorrect: true, nextNode: "maya_interview", feedback: "Let's get Maya's perspective first.", evidenceAwarded: case1Evidence.chris_dialogue, pointsAwarded: 10 },
      ],
    },
  },

  ryan_interview: {
    id: "ryan_interview",
    phase: "stage2",
    messages: [
      { id: "m27", speaker: "detective", text: "Ryan, you manage server logs. Can you show me what happened last night?" },
      { id: "m28", speaker: "client", text: "[quietly] ...Yes. But first, I need to tell you something. I was the one who anonymously posted about this issue to the gaming community." },
      { id: "m29", speaker: "client", text: "I'm tired of this company's overtime culture and the way things are handled. Data doesn't lie. Look at these server logs - you'll see exactly what happened." },
    ],
    dataVisualizations: [{
      type: "log",
      title: "Server Access Logs - November 8",
      data: {
        entries: [
          { time: "10:47 PM", user: "admin01", action: "Login", status: "success", ip: "192.168.1.47" },
          { time: "11:12 PM", user: "admin01", action: "Access Balance_DB", status: "success", ip: "192.168.1.47" },
          { time: "11:15 PM", user: "admin01", action: "MODIFY Shadow_Reaper.attack_power: 100 → 150", status: "success", ip: "192.168.1.47" },
          { time: "11:58 PM", user: "admin01", action: "Logout", status: "success", ip: "192.168.1.47" },
        ],
      },
    }],
    question: {
      id: "q5",
      text: "🔍 What pattern do you see in these logs?",
      choices: [
        { id: "c11", text: "Maya's admin01 account modified Shadow Reaper at 11:15 PM", isCorrect: true, nextNode: "stage3_start", feedback: "Correct! But was it really Maya? Let's analyze deeper.", evidenceAwarded: [case1Evidence.ryan_dialogue, case1Evidence.server_logs], pointsAwarded: 20 },
        { 
          id: "c12", 
          text: "Nothing suspicious", 
          isCorrect: false, 
          nextNode: "stage3_start", 
          feedback: "Actually, there is something suspicious. Let's analyze the modification timestamp and investigate who was really behind it.", 
          evidenceAwarded: [case1Evidence.ryan_dialogue, case1Evidence.server_logs], 
          pointsAwarded: 8,
          hintEvidenceId: "server_logs",
          hintText: "서버 로그를 다시 자세히 살펴보세요. 11:15 PM에 어떤 일이 일어났나요? admin01 계정으로 Shadow Reaper의 공격력이 100에서 150으로 변경되었습니다!"
        },
      ],
    },
  },

  stage3_start: {
    id: "stage3_start",
    phase: "stage3",
    messages: [
      { id: "m30", speaker: "system", text: "🔬 STAGE 3: DATA PREPROCESSING" },
      { id: "m31", speaker: "narrator", text: "💬 Kastor: 'Detective, we have a critical clue! The admin01 account made changes at 11:15 PM. But we need to verify WHO was actually using it.'" },
      { id: "m32", speaker: "detective", text: "Ryan, can you check the IP address and cross-reference it with workstation assignments?" },
      { id: "m33", speaker: "client", text: "Good idea. Let me pull up the IP timeline..." },
    ],
    autoAdvance: { nextNode: "ip_analysis", delay: 1000 },
  },

  ip_analysis: {
    id: "ip_analysis",
    phase: "stage3",
    messages: [
      { id: "m34", speaker: "client", text: "Here's what I found. This includes CCTV timestamps and network activity." },
    ],
    dataVisualizations: [{
      type: "table",
      title: "IP Address Timeline Analysis",
      data: {
        headers: ["Time", "Event", "IP Address", "User/Device"],
        rows: [
          ["10:47 PM", "Maya leaves office (CCTV)", "N/A", "Maya Chen"],
          ["11:12 PM", "admin01 login to Balance_DB", "192.168.1.47", "Unknown"],
          ["11:12 PM", "Workstation activity detected", "192.168.1.47", "Chris Park's computer"],
          ["11:15 PM", "Shadow Reaper modification", "192.168.1.47", "Chris Park's computer"],
          ["11:58 PM", "admin01 logout", "192.168.1.47", "Chris Park's computer"],
        ],
      },
    }],
    question: {
      id: "q6",
      text: "🔍 ANOMALY DETECTION: What does this timeline reveal?",
      choices: [
        { 
          id: "c13", 
          text: "Maya made the changes from her office", 
          isCorrect: false, 
          nextNode: "stage4_start", 
          feedback: "Actually, Maya left at 10:47 PM according to CCTV. But the evidence shows the modification happened at 11:15 PM from Chris's workstation. Let's continue the investigation.", 
          evidenceAwarded: case1Evidence.ip_analysis, 
          pointsAwarded: 10,
          hintEvidenceId: "ip_analysis",
          hintText: "위 타임라인 표를 다시 확인해보세요. Maya가 퇴근한 시간과 수정이 일어난 시간, 그리고 IP 주소가 어느 컴퓨터인지 주의깊게 살펴보세요."
        },
        { id: "c14", text: "Chris used Maya's admin01 account from his computer at 11:15 PM after she left", isCorrect: true, nextNode: "stage4_start", feedback: "Excellent detective work! The IP matches Chris's workstation!", evidenceAwarded: case1Evidence.ip_analysis, pointsAwarded: 25 },
        { 
          id: "c15", 
          text: "The logs are wrong", 
          isCorrect: false, 
          nextNode: "stage4_start", 
          feedback: "The logs are actually accurate. The IP evidence clearly shows it was Chris's computer. Let's synthesize all the evidence.", 
          evidenceAwarded: case1Evidence.ip_analysis, 
          pointsAwarded: 10,
          hintEvidenceId: "ip_analysis",
          hintText: "서버 로그는 매우 정확합니다. IP 주소 192.168.1.47이 누구의 컴퓨터인지 표에서 확인해보세요."
        },
      ],
    },
  },

  stage4_start: {
    id: "stage4_start",
    phase: "stage4",
    messages: [
      { id: "m35", speaker: "system", text: "🧩 STAGE 4: EVIDENCE ANALYSIS" },
      { id: "m36", speaker: "detective", text: "Let's review all the evidence we've gathered:" },
      { id: "m37", speaker: "narrator", text: "💬 Kastor: 'Combining all evidence pieces...'" },
      { id: "m38", speaker: "detective", text: "1. Shadow Reaper's attack power changed from 100 to 150\n2. Win rate jumped from 49% to 74% overnight\n3. Maya's admin01 account was used\n4. But Chris's computer (IP 192.168.1.47) made the change at 11:15 PM\n5. Maya had already left the office at 10:47 PM\n6. Chris mentioned needing data for 'research'" },
    ],
    dataVisualizations: [{
      type: "chart",
      title: "Shadow Reaper Win Rate Timeline",
      data: {
        labels: ["Nov 7", "Nov 8 (Pre-Update)", "Nov 8 (Post-Update)", "Nov 9"],
        datasets: [{
          label: "Win Rate %",
          data: [48.5, 49.2, 73.8, 75.1],
          color: "#ef4444",
        }],
      },
    }],
    question: {
      id: "q7",
      text: "🎯 EVIDENCE SYNTHESIS: What's the complete picture?",
      choices: [
        { 
          id: "c16", 
          text: "Maya made a mistake", 
          isCorrect: false, 
          nextNode: "confront_chris", 
          feedback: "Actually, Maya wasn't in the office when the change was made. All evidence points to Chris using her account. Let's confront him.", 
          evidenceAwarded: case1Evidence.winrate_chart, 
          pointsAwarded: 12,
          hintEvidenceId: "ip_analysis",
          hintText: "IP 분석 증거를 다시 확인해보세요. Maya는 10:47 PM에 퇴근했지만, 수정은 11:15 PM에 Chris의 컴퓨터에서 일어났습니다."
        },
        { id: "c17", text: "Chris used Maya's account to modify the balance for his AI research experiment", isCorrect: true, nextNode: "confront_chris", feedback: "Perfect analysis! All evidence points to Chris!", evidenceAwarded: case1Evidence.winrate_chart, pointsAwarded: 30 },
        { 
          id: "c18", 
          text: "Ryan framed Chris", 
          isCorrect: false, 
          nextNode: "confront_chris", 
          feedback: "Ryan only provided the logs - the IP evidence is solid and verifiable. All signs point to Chris. Let's confront him.", 
          evidenceAwarded: case1Evidence.winrate_chart, 
          pointsAwarded: 12,
          hintEvidenceId: "server_logs",
          hintText: "서버 로그는 조작될 수 없습니다. IP 주소가 Chris의 컴퓨터를 가리키고 있으며, 이는 CCTV 타임라인과 일치합니다."
        },
      ],
    },
  },

  confront_chris: {
    id: "confront_chris",
    phase: "stage4",
    messages: [
      { id: "m39", speaker: "detective", text: "Chris, the evidence shows you used Maya's admin01 account from your computer at 11:15 PM to modify Shadow Reaper's attack power. Care to explain?" },
      { id: "m40", speaker: "client", text: "[shocked] How did you... [sighs deeply] ...Okay. You're right." },
      { id: "m41", speaker: "client", text: "I needed experimental data for my AI research. I thought if I temporarily made Shadow Reaper overpowered, I could collect unusual gameplay patterns." },
      { id: "m42", speaker: "client", text: "I was going to change it back in a few days! I never thought it would become this big of a problem... I didn't mean to harm anyone." },
      { id: "m43", speaker: "client", text: "Maya Chen (angry): Chris! How could you use my account without permission?! Do you realize how many players this affected?!" },
      { id: "m44", speaker: "client", text: "Ryan Torres: This is exactly what I was talking about. All for your 'research' while thousands of players suffered." },
    ],
    autoAdvance: { nextNode: "stage5_resolution", delay: 1500 },
  },

  stage5_resolution: {
    id: "stage5_resolution",
    phase: "stage5",
    messages: [
      { id: "m45", speaker: "system", text: "✅ STAGE 5: INSIGHT & RESOLUTION" },
      { id: "m46", speaker: "detective", text: "Case Summary: Data Analyst Chris Park secretly used Game Director Maya Chen's admin01 credentials to modify Shadow Reaper's balance (attack power 100 → 150)." },
      { id: "m47", speaker: "detective", text: "Motive: Chris needed experimental data for his unauthorized AI matchmaking research project." },
      { id: "m48", speaker: "detective", text: "Evidence: Server logs, IP timeline analysis, character profiles, and interviews all confirmed Chris's actions from his workstation after Maya left the office." },
      { id: "m49", speaker: "detective", text: "Impact: Win rate jumped from 49% to 74%, causing thousands of players to quit and damaging the game's reputation." },
      { id: "m50", speaker: "client", text: "Maya Chen: Thank you, Detective. I can present this clearly at the meeting. We'll revert the changes immediately and review our account security." },
      { id: "m51", speaker: "narrator", text: "✅ CASE CLOSED: The Missing Balance Patch" },
      { id: "m52", speaker: "system", text: "💡 KEY INSIGHT: Data Analysis Process\n\n1. HYPOTHESIS: Identify possible causes\n2. DATA COLLECTION: Gather evidence (logs, interviews, profiles)\n3. DATA PREPROCESSING: Clean and organize (IP analysis, timelines)\n4. EVIDENCE ANALYSIS: Combine pieces to see patterns\n5. INSIGHT & RESOLUTION: Draw conclusions and solve the mystery\n\nAlways verify WHO, WHAT, WHEN, WHERE, and WHY using multiple evidence sources!" },
    ],
  },
};
