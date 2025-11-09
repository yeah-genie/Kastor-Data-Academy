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
  phase: "briefing" | "investigation" | "resolution";
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
    phase: "briefing",
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
        text: "늦은 밤, 당신의 사무실 문이 급하게 열립니다...",
      },
      {
        id: "m4",
        speaker: "client",
        text: "탐정님! 큰일났어요! 우리 게임에 심각한 문제가 생겼습니다!",
      },
      {
        id: "m5",
        speaker: "detective",
        text: "진정하세요. 천천히 무슨 일인지 설명해주시겠습니까?",
      },
      {
        id: "m6",
        speaker: "client",
        text: "저는 '레전드 배틀'이라는 온라인 게임의 게임 디자이너입니다. 며칠 전부터 특정 캐릭터의 승률이 비정상적으로 급증했어요!",
      },
      {
        id: "m7",
        speaker: "client",
        text: "아무도 변경사항을 만들지 않았는데... 뭔가 이상한 일이 벌어지고 있어요. 혹시 내부자가 데이터를 조작한 건 아닐까요?",
      },
      {
        id: "m8",
        speaker: "detective",
        text: "흥미롭군요. 게임 데이터와 패치 로그를 보여주시겠습니까?",
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
        id: "m9",
        speaker: "client",
        text: "여기 최근 3주간의 캐릭터별 승률 데이터입니다.",
      },
    ],
    dataVisualizations: [
      {
        type: "chart",
        title: "캐릭터별 승률 추이 (3주)",
        data: {
          labels: ["Week 1", "Week 2", "Week 3"],
          datasets: [
            {
              label: "드래곤나이트",
              data: [52, 53, 78],
              color: "#ef4444",
            },
            {
              label: "섀도우 어쌔신",
              data: [48, 49, 47],
              color: "#8b5cf6",
            },
            {
              label: "미스틱 메이지",
              data: [50, 51, 50],
              color: "#3b82f6",
            },
            {
              label: "홀리 팔라딘",
              data: [49, 48, 49],
              color: "#f59e0b",
            },
          ],
        },
      },
    ],
    question: {
      id: "q1",
      text: "첫 번째 단서: 데이터에서 어떤 이상한 점을 발견하셨나요?",
      choices: [
        {
          id: "c1",
          text: "모든 캐릭터의 승률이 동시에 상승했다",
          isCorrect: false,
          nextNode: "wrong_answer_1",
          feedback: "아닙니다. 그래프를 자세히 보세요. 한 캐릭터만 급격히 상승했습니다.",
          pointsAwarded: 0,
        },
        {
          id: "c2",
          text: "드래곤나이트의 승률이 3주차에 급격히 상승했다",
          isCorrect: true,
          nextNode: "investigation_start",
          feedback: "정확합니다! 드래곤나이트의 승률이 Week 3에 갑자기 52%에서 78%로 26%p나 급증했습니다.",
          clueAwarded: {
            id: "clue1",
            title: "비정상적 승률 급증",
            description: "드래곤나이트 캐릭터의 승률이 3주차에 26%p 급증",
          },
          pointsAwarded: 10,
        },
        {
          id: "c3",
          text: "섀도우 어쌔신의 승률이 하락하고 있다",
          isCorrect: false,
          nextNode: "wrong_answer_1",
          feedback: "섀도우 어쌔신의 변화는 정상 범위 내입니다. 더 극적인 변화를 찾아보세요.",
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
        id: "m10",
        speaker: "detective",
        text: "다시 한 번 데이터를 살펴봅시다. 어떤 캐릭터가 갑자기 변했나요?",
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
        id: "m11",
        speaker: "client",
        text: "맞아요! 정확히 3주차부터 이상해졌어요. 우리는 아무것도 건드리지 않았는데...",
      },
      {
        id: "m12",
        speaker: "detective",
        text: "패치 로그를 확인해봅시다. 3주차 전후로 어떤 변경사항이 있었는지 조사가 필요합니다.",
      },
      {
        id: "m13",
        speaker: "client",
        text: "여기 시스템 패치 로그가 있습니다.",
      },
    ],
    dataVisualizations: [
      {
        type: "table",
        title: "게임 패치 로그",
        data: {
          headers: ["날짜", "버전", "수정자", "변경 내용"],
          rows: [
            ["2025-10-15", "v2.3.1", "dev_jenny", "UI 버그 수정"],
            ["2025-10-22", "v2.3.2", "dev_mark", "서버 최적화"],
            ["2025-10-29", "v2.4.0", "admin01", "드래곤나이트 공격력 +15%, 방어력 +20%"],
            ["2025-11-02", "v2.4.1", "dev_jenny", "채팅 시스템 개선"],
          ],
        },
      },
    ],
    question: {
      id: "q2",
      text: "두 번째 단서: 패치 로그에서 의심스러운 부분은 무엇인가요?",
      choices: [
        {
          id: "c4",
          text: "dev_jenny가 너무 자주 수정했다",
          isCorrect: false,
          nextNode: "wrong_answer_2",
          feedback: "dev_jenny의 작업은 정상적인 개발 업무입니다.",
          pointsAwarded: 0,
        },
        {
          id: "c5",
          text: "10월 29일에 admin01이 드래곤나이트를 대폭 강화했다",
          isCorrect: true,
          nextNode: "investigation_deep",
          feedback: "정확합니다! admin01이 드래곤나이트의 공격력과 방어력을 크게 상승시켰습니다. 이것이 승률 급증의 원인입니다!",
          clueAwarded: {
            id: "clue2",
            title: "무단 밸런스 패치",
            description: "admin01이 승인 없이 드래곤나이트를 대폭 강화함",
          },
          pointsAwarded: 15,
        },
        {
          id: "c6",
          text: "서버 최적화가 문제다",
          isCorrect: false,
          nextNode: "wrong_answer_2",
          feedback: "서버 최적화는 캐릭터 밸런스와 관련이 없습니다.",
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
        id: "m14",
        speaker: "detective",
        text: "그건 아닌 것 같습니다. 드래곤나이트와 직접 관련된 변경사항을 찾아보세요.",
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
        id: "m15",
        speaker: "client",
        text: "admin01...? 그 사람은 서버 관리자인데, 게임 밸런스를 건드릴 권한이 없어요!",
      },
      {
        id: "m16",
        speaker: "detective",
        text: "흥미롭군요. 권한 로그를 확인해봅시다.",
      },
    ],
    dataVisualizations: [
      {
        type: "log",
        title: "관리자 권한 접근 로그",
        data: {
          entries: [
            { time: "2025-10-28 23:47", user: "admin01", action: "권한 상승 요청", status: "거부됨" },
            { time: "2025-10-29 02:15", user: "admin01", action: "데이터베이스 직접 접근", status: "성공" },
            { time: "2025-10-29 02:18", user: "admin01", action: "캐릭터 스탯 수정", status: "성공" },
            { time: "2025-10-29 02:20", user: "admin01", action: "로그 삭제 시도", status: "실패" },
          ],
        },
      },
    ],
    question: {
      id: "q3",
      text: "결정적 증거: admin01의 행동에서 무엇을 알 수 있나요?",
      choices: [
        {
          id: "c7",
          text: "실수로 잘못 건드린 것 같다",
          isCorrect: false,
          nextNode: "wrong_answer_3",
          feedback: "로그 삭제 시도는 실수가 아닙니다. 의도적인 행동입니다.",
          pointsAwarded: 0,
        },
        {
          id: "c8",
          text: "정상적인 권한 요청이 거부되자, 새벽에 불법적으로 데이터베이스에 접근해 스탯을 조작하고 증거 인멸을 시도했다",
          isCorrect: true,
          nextNode: "resolution_start",
          feedback: "완벽합니다! 모든 증거가 일치합니다. admin01은 의도적으로 게임 밸런스를 조작했습니다!",
          clueAwarded: {
            id: "clue3",
            title: "의도적 조작 증거",
            description: "admin01의 불법 접근과 증거 인멸 시도 확인",
          },
          pointsAwarded: 20,
        },
        {
          id: "c9",
          text: "admin01은 무죄다",
          isCorrect: false,
          nextNode: "wrong_answer_3",
          feedback: "로그를 다시 보세요. 명백한 불법 행위의 증거가 있습니다.",
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
        id: "m17",
        speaker: "detective",
        text: "로그를 시간 순서대로 다시 살펴보세요. 특히 새벽 시간대의 활동에 주목하세요.",
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
        id: "m18",
        speaker: "detective",
        text: "사건을 정리하겠습니다.",
      },
      {
        id: "m19",
        speaker: "detective",
        text: "1. 10월 29일, admin01은 정상적인 권한 요청이 거부되었습니다.",
      },
      {
        id: "m20",
        speaker: "detective",
        text: "2. 새벽 2시 15분, admin01은 데이터베이스에 불법적으로 직접 접근했습니다.",
      },
      {
        id: "m21",
        speaker: "detective",
        text: "3. 드래곤나이트의 공격력과 방어력을 대폭 상승시켰습니다.",
      },
      {
        id: "m22",
        speaker: "detective",
        text: "4. 증거를 인멸하기 위해 로그 삭제를 시도했으나 실패했습니다.",
      },
      {
        id: "m23",
        speaker: "detective",
        text: "5. 결과적으로 드래곤나이트의 승률이 26%p 급증했습니다.",
      },
      {
        id: "m24",
        speaker: "client",
        text: "믿을 수 없어요... admin01이 왜 이런 짓을...?",
      },
      {
        id: "m25",
        speaker: "detective",
        text: "추가 조사가 필요하지만, 데이터는 거짓말하지 않습니다. 이 증거들을 보안팀에 전달하세요.",
      },
      {
        id: "m26",
        speaker: "system",
        text: "🎉 사건 해결 완료!",
      },
    ],
    autoAdvance: {
      nextNode: "end",
      delay: 1000,
    },
  },

  end: {
    id: "end",
    phase: "resolution",
    messages: [
      {
        id: "m27",
        speaker: "system",
        text: "탐정으로서의 당신의 추리력이 빛을 발했습니다!",
      },
    ],
  },
};
