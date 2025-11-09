import { StoryNode } from "./case1-story";

export const case3Story: Record<string, StoryNode> = {
  start: {
    id: "start",
    phase: "briefing",
    messages: [
      {
        id: "m1",
        speaker: "system",
        text: "📁 CASE FILE #003",
      },
      {
        id: "m2",
        speaker: "system",
        text: "THE SECRET OF THE HIDDEN ALGORITHM",
      },
      {
        id: "m3",
        speaker: "narrator",
        text: "당신의 명성은 이제 업계 전체에 퍼졌습니다...",
      },
      {
        id: "m4",
        speaker: "client",
        text: "탐정님! 제 게임의 매칭 시스템에 심각한 문제가 있어요!",
      },
      {
        id: "m5",
        speaker: "detective",
        text: "무슨 일인지 차근차근 설명해주세요.",
      },
      {
        id: "m6",
        speaker: "client",
        text: "우리 게임은 실력 기반 매칭 시스템을 쓰는데, 특정 유저들이 항상 자기보다 약한 상대와만 매칭된다는 제보가 들어왔어요.",
      },
      {
        id: "m7",
        speaker: "client",
        text: "이건 공정한 게임이 아니에요. 데이터를 보여드리겠습니다.",
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
        text: "최근 100경기의 매칭 데이터입니다.",
      },
    ],
    dataVisualizations: [
      {
        type: "chart",
        title: "유저별 평균 상대 실력 차이",
        data: {
          labels: ["User A", "User B", "User C", "LuckyPlayer", "User E"],
          datasets: [
            {
              label: "상대 실력 차이 (음수 = 자신보다 약함)",
              data: [2, -1, 3, -35, 1],
              color: "#3b82f6",
            },
          ],
        },
      },
    ],
    question: {
      id: "q1",
      text: "첫 번째 단서: 매칭 데이터에서 이상한 점은?",
      choices: [
        {
          id: "c1",
          text: "User A의 상대가 강하다",
          isCorrect: false,
          nextNode: "wrong_answer_1",
          feedback: "User A는 정상 범위입니다. 더 극단적인 케이스를 찾아보세요.",
          pointsAwarded: 0,
        },
        {
          id: "c2",
          text: "LuckyPlayer만 상대가 자신보다 평균 35점이나 약하다",
          isCorrect: true,
          nextNode: "investigation_start",
          feedback: "정확합니다! LuckyPlayer는 항상 자기보다 훨씬 약한 상대와만 매칭됩니다!",
          clueAwarded: {
            id: "clue1",
            title: "편향된 매칭",
            description: "LuckyPlayer는 항상 자신보다 35점 약한 상대와 매칭됨",
          },
          pointsAwarded: 10,
        },
        {
          id: "c3",
          text: "User C의 상대가 너무 강하다",
          isCorrect: false,
          nextNode: "wrong_answer_1",
          feedback: "+3은 정상적인 챌린지 범위입니다.",
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
        text: "음수 값에 주목하세요. 누가 항상 약한 상대와 매칭되나요?",
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
        text: "맞아요! LuckyPlayer는 100경기 내내 이렇게 쉬운 상대랑만 붙었어요!",
      },
      {
        id: "m11",
        speaker: "detective",
        text: "매칭 알고리즘 코드를 확인해봅시다.",
      },
    ],
    dataVisualizations: [
      {
        type: "table",
        title: "매칭 알고리즘 설정 파일",
        data: {
          headers: ["유저 그룹", "매칭 규칙", "수정자", "수정일"],
          rows: [
            ["일반 유저", "실력 ±5 범위 내", "system", "2024-01-10"],
            ["VIP 유저", "실력 ±10 범위 내", "system", "2024-01-10"],
            ["LuckyPlayer", "실력 -30 ~ -40 범위", "dev_alex", "2025-10-20"],
            ["신규 유저", "실력 -5 ~ 0 범위", "system", "2024-01-10"],
          ],
        },
      },
    ],
    question: {
      id: "q2",
      text: "두 번째 단서: 알고리즘 설정에서 문제점은?",
      choices: [
        {
          id: "c4",
          text: "VIP 유저의 범위가 너무 넓다",
          isCorrect: false,
          nextNode: "wrong_answer_2",
          feedback: "±10은 합리적인 범위입니다. LuckyPlayer의 설정을 보세요.",
          pointsAwarded: 0,
        },
        {
          id: "c5",
          text: "LuckyPlayer에게만 특별히 약한 상대를 배정하는 규칙이 있다",
          isCorrect: true,
          nextNode: "investigation_deep",
          feedback: "정확합니다! LuckyPlayer는 항상 30-40점 약한 상대와만 매칭되도록 조작되었습니다!",
          clueAwarded: {
            id: "clue2",
            title: "조작된 알고리즘",
            description: "LuckyPlayer 전용 약한 매칭 규칙 발견",
          },
          pointsAwarded: 15,
        },
        {
          id: "c6",
          text: "신규 유저 보호가 과하다",
          isCorrect: false,
          nextNode: "wrong_answer_2",
          feedback: "신규 유저 보호는 정상적인 기능입니다.",
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
        text: "LuckyPlayer의 매칭 범위를 다른 그룹과 비교해보세요.",
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
        text: "dev_alex가 왜 이런 규칙을...? 혹시 LuckyPlayer와 연관이 있나요?",
      },
      {
        id: "m14",
        speaker: "detective",
        text: "계정 정보를 교차 확인해봅시다.",
      },
    ],
    dataVisualizations: [
      {
        type: "table",
        title: "계정 정보 비교",
        data: {
          headers: ["항목", "dev_alex", "LuckyPlayer"],
          rows: [
            ["가입 IP 주소", "192.168.1.100", "192.168.1.100"],
            ["결제 이메일", "alex@company.com", "alex.kim@gmail.com"],
            ["최근 접속 시간", "2025-11-08 10:30", "2025-11-08 10:35"],
            ["디바이스 ID", "DEVICE_A123", "DEVICE_A123"],
          ],
        },
      },
    ],
    question: {
      id: "q3",
      text: "결정적 증거: dev_alex와 LuckyPlayer의 관계는?",
      choices: [
        {
          id: "c7",
          text: "우연히 같은 건물에 산다",
          isCorrect: false,
          nextNode: "wrong_answer_3",
          feedback: "같은 IP만으로는 우연일 수 있지만, 다른 증거들도 보세요.",
          pointsAwarded: 0,
        },
        {
          id: "c8",
          text: "dev_alex와 LuckyPlayer는 동일인물 - 같은 IP, 디바이스, 비슷한 이메일, 5분 차이 접속",
          isCorrect: true,
          nextNode: "resolution_start",
          feedback: "완벽합니다! dev_alex가 자신의 게임 계정에 유리하도록 알고리즘을 조작했습니다!",
          clueAwarded: {
            id: "clue3",
            title: "내부자 자기 특혜",
            description: "dev_alex가 자신의 계정 LuckyPlayer에 특혜 부여",
          },
          pointsAwarded: 20,
        },
        {
          id: "c9",
          text: "친구 관계일 뿐이다",
          isCorrect: false,
          nextNode: "wrong_answer_3",
          feedback: "디바이스 ID까지 같다면 동일인물입니다.",
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
        text: "모든 증거를 종합해보세요. IP, 디바이스, 이메일, 접속 시간...",
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
        text: "사건을 정리하겠습니다.",
      },
      {
        id: "m17",
        speaker: "detective",
        text: "1. LuckyPlayer는 항상 자신보다 30-40점 약한 상대와만 매칭되었습니다.",
      },
      {
        id: "m18",
        speaker: "detective",
        text: "2. 매칭 알고리즘에 LuckyPlayer 전용 특별 규칙이 있었습니다.",
      },
      {
        id: "m19",
        speaker: "detective",
        text: "3. 이 규칙은 dev_alex가 만들었습니다.",
      },
      {
        id: "m20",
        speaker: "detective",
        text: "4. dev_alex와 LuckyPlayer는 같은 IP, 같은 디바이스를 사용하는 동일인물입니다.",
      },
      {
        id: "m21",
        speaker: "detective",
        text: "5. dev_alex는 개발자 권한을 악용해 자신의 게임 계정에 부당한 이득을 제공했습니다.",
      },
      {
        id: "m22",
        speaker: "client",
        text: "믿을 수 없어요... 우리 개발자가 공정성을 훼손했다니!",
      },
      {
        id: "m23",
        speaker: "detective",
        text: "알고리즘 감사와 코드 리뷰 시스템을 강화하세요. 그리고 모든 특별 규칙은 반드시 문서화되어야 합니다.",
      },
      {
        id: "m24",
        speaker: "system",
        text: "🎉 모든 사건 해결 완료!",
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
        id: "m25",
        speaker: "system",
        text: "당신은 진정한 데이터 탐정입니다!",
      },
    ],
  },
};
