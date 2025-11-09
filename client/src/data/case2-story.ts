import { StoryNode, Message, DataVisualization } from "./case1-story";

export const case2Story: Record<string, StoryNode> = {
  start: {
    id: "start",
    phase: "briefing",
    messages: [
      {
        id: "m1",
        speaker: "system",
        text: "📁 CASE FILE #002",
      },
      {
        id: "m2",
        speaker: "system",
        text: "THE GHOST USER'S RANKING MANIPULATION",
      },
      {
        id: "m3",
        speaker: "narrator",
        text: "당신의 명성을 듣고 또 다른 의뢰인이 찾아왔습니다...",
      },
      {
        id: "m4",
        speaker: "client",
        text: "탐정님! 우리 게임 랭킹 시스템에 이상한 일이 벌어졌어요!",
      },
      {
        id: "m5",
        speaker: "detective",
        text: "차분히 설명해주세요. 어떤 문제가 있나요?",
      },
      {
        id: "m6",
        speaker: "client",
        text: "어제 아침, 랭킹 1위에 'PhantomKing'이라는 유저가 나타났어요. 하지만 우리 데이터베이스에 그런 계정이 없습니다!",
      },
      {
        id: "m7",
        speaker: "client",
        text: "더 이상한 건, 이 유저의 점수가 비정상적으로 높다는 겁니다. 여기 랭킹 데이터를 보세요.",
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
        text: "최근 일주일간의 상위 랭킹 데이터입니다.",
      },
    ],
    dataVisualizations: [
      {
        type: "table",
        title: "게임 랭킹 Top 10",
        data: {
          headers: ["순위", "유저명", "점수", "가입일"],
          rows: [
            ["1", "PhantomKing", "9,999,999", "데이터 없음"],
            ["2", "ProGamer123", "125,430", "2024-01-15"],
            ["3", "SkillMaster", "118,920", "2023-11-03"],
            ["4", "TopPlayer99", "112,850", "2024-02-20"],
            ["5", "EliteRank", "108,200", "2023-12-10"],
          ],
        },
      },
    ],
    question: {
      id: "q1",
      text: "첫 번째 단서: 랭킹 데이터에서 의심스러운 점은?",
      choices: [
        {
          id: "c1",
          text: "2위와 3위의 점수 차이가 크다",
          isCorrect: false,
          nextNode: "wrong_answer_1",
          feedback: "2위와 3위는 정상적인 경쟁 범위입니다. 더 극단적인 이상치를 찾아보세요.",
          pointsAwarded: 0,
        },
        {
          id: "c2",
          text: "PhantomKing의 점수가 2위보다 약 80배 높고, 가입 기록이 없다",
          isCorrect: true,
          nextNode: "investigation_start",
          feedback: "정확합니다! PhantomKing의 점수는 비현실적으로 높고, 가입 기록조차 없습니다!",
          clueAwarded: {
            id: "clue1",
            title: "유령 계정 발견",
            description: "PhantomKing 계정은 DB에 존재하지 않지만 랭킹에 표시됨",
          },
          pointsAwarded: 10,
        },
        {
          id: "c3",
          text: "상위 랭커들의 가입일이 다양하다",
          isCorrect: false,
          nextNode: "wrong_answer_1",
          feedback: "다양한 가입일은 정상입니다. 더 명백한 이상을 찾아보세요.",
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
        text: "PhantomKing의 데이터를 다시 살펴봅시다.",
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
        text: "맞아요! 데이터베이스를 아무리 뒤져도 이 계정이 없어요!",
      },
      {
        id: "m11",
        speaker: "detective",
        text: "접속 로그를 확인해봅시다. 이 유저가 실제로 게임에 접속한 기록이 있나요?",
      },
    ],
    dataVisualizations: [
      {
        type: "log",
        title: "서버 접속 로그 (최근 7일)",
        data: {
          entries: [
            { time: "2025-11-08 14:23", user: "ProGamer123", action: "로그인", status: "성공" },
            { time: "2025-11-08 14:25", user: "PhantomKing", action: "점수 갱신", status: "성공" },
            { time: "2025-11-08 14:25", user: "PhantomKing", action: "로그인", status: "실패 - 계정 없음" },
            { time: "2025-11-08 14:30", user: "SkillMaster", action: "로그인", status: "성공" },
            { time: "2025-11-08 15:00", user: "PhantomKing", action: "점수 갱신", status: "성공" },
          ],
        },
      },
    ],
    question: {
      id: "q2",
      text: "두 번째 단서: 접속 로그에서 이상한 점은?",
      choices: [
        {
          id: "c4",
          text: "PhantomKing이 너무 자주 접속했다",
          isCorrect: false,
          nextNode: "wrong_answer_2",
          feedback: "빈도가 문제가 아닙니다. 로그인과 점수 갱신의 관계를 보세요.",
          pointsAwarded: 0,
        },
        {
          id: "c5",
          text: "PhantomKing은 로그인 실패했지만 점수 갱신은 성공했다",
          isCorrect: true,
          nextNode: "investigation_deep",
          feedback: "정확합니다! 로그인도 하지 못한 유저가 어떻게 점수를 갱신할 수 있을까요?",
          clueAwarded: {
            id: "clue2",
            title: "불가능한 점수 갱신",
            description: "로그인 없이 점수 갱신이 이루어짐 - 직접 DB 조작 의심",
          },
          pointsAwarded: 15,
        },
        {
          id: "c6",
          text: "다른 유저들의 접속 시간이 정상적이다",
          isCorrect: false,
          nextNode: "wrong_answer_2",
          feedback: "다른 유저들은 정상입니다. PhantomKing에 집중하세요.",
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
        text: "로그인 상태와 점수 갱신의 관계를 다시 살펴보세요.",
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
        text: "맞아요! 이건 말이 안 돼요. 로그인도 못한 유저가 점수를 갱신할 수는 없잖아요!",
      },
      {
        id: "m14",
        speaker: "detective",
        text: "데이터베이스 직접 접근 로그를 확인해봅시다. 누군가 수동으로 점수를 조작했을 가능성이 있습니다.",
      },
    ],
    dataVisualizations: [
      {
        type: "table",
        title: "데이터베이스 직접 쿼리 로그",
        data: {
          headers: ["시간", "사용자", "쿼리 유형", "대상 테이블"],
          rows: [
            ["2025-11-08 14:20", "admin_system", "SELECT", "users"],
            ["2025-11-08 14:25", "bot_script_01", "INSERT", "rankings"],
            ["2025-11-08 14:26", "admin_system", "SELECT", "rankings"],
            ["2025-11-08 15:00", "bot_script_01", "UPDATE", "rankings"],
            ["2025-11-08 15:05", "dev_sarah", "SELECT", "logs"],
          ],
        },
      },
    ],
    question: {
      id: "q3",
      text: "결정적 증거: 범인을 찾아내세요!",
      choices: [
        {
          id: "c7",
          text: "admin_system이 랭킹을 자주 조회했다",
          isCorrect: false,
          nextNode: "wrong_answer_3",
          feedback: "조회(SELECT)는 데이터를 읽기만 합니다. 데이터를 변경한 것을 찾아야 합니다.",
          pointsAwarded: 0,
        },
        {
          id: "c8",
          text: "bot_script_01이 PhantomKing 계정을 생성하지 않고 랭킹 테이블에 직접 INSERT/UPDATE했다",
          isCorrect: true,
          nextNode: "resolution_start",
          feedback: "완벽합니다! bot_script_01이 정상적인 가입 절차 없이 랭킹만 조작했습니다!",
          clueAwarded: {
            id: "clue3",
            title: "봇 스크립트 조작 발견",
            description: "bot_script_01이 users 테이블 없이 rankings만 조작",
          },
          pointsAwarded: 20,
        },
        {
          id: "c9",
          text: "dev_sarah이 로그를 삭제하려 했다",
          isCorrect: false,
          nextNode: "wrong_answer_3",
          feedback: "dev_sarah는 로그를 조회만 했습니다. 랭킹 조작과 무관합니다.",
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
        text: "INSERT와 UPDATE는 데이터를 생성하거나 수정합니다. 누가 랭킹 테이블을 건드렸나요?",
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
        text: "1. PhantomKing 계정은 users 테이블에 존재하지 않습니다.",
      },
      {
        id: "m18",
        speaker: "detective",
        text: "2. 하지만 rankings 테이블에는 이상한 점수로 1위를 차지하고 있습니다.",
      },
      {
        id: "m19",
        speaker: "detective",
        text: "3. bot_script_01이 정상적인 가입 절차 없이 rankings 테이블에 직접 데이터를 삽입했습니다.",
      },
      {
        id: "m20",
        speaker: "detective",
        text: "4. 이후에도 계속 UPDATE 쿼리로 점수를 조작했습니다.",
      },
      {
        id: "m21",
        speaker: "client",
        text: "bot_script_01... 그건 우리가 테스트용으로 쓰는 자동화 스크립트인데, 누군가 악용한 거군요!",
      },
      {
        id: "m22",
        speaker: "detective",
        text: "봇 스크립트의 접근 권한을 즉시 제한하고, 랭킹 시스템에 유효성 검증을 추가하세요.",
      },
      {
        id: "m23",
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
        id: "m24",
        speaker: "system",
        text: "당신은 봇 스크립트의 악용을 밝혀냈습니다!",
      },
    ],
  },
};
