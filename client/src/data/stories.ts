import { case1Story } from "./case1-story";
import { case2Story } from "./case2-story";
import { case3Story } from "./case3-story";
import type { StoryNode } from "./case1-story";

export interface CaseMetadata {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: "초급" | "중급" | "고급";
  tags: string[];
  keyLearning: string;
}

export const caseMetadata: Record<number, CaseMetadata> = {
  1: {
    id: 1,
    title: "실종된 밸런스 패치",
    subtitle: "The Missing Balance Patch",
    description: "인기 온라인 게임에서 특정 캐릭터의 승률이 비정상적으로 급등했습니다. 승률 그래프와 패치 로그를 분석하여 내부자의 조작을 밝혀내세요!",
    difficulty: "초급",
    tags: ["데이터 분석", "로그 추적", "변화 탐지"],
    keyLearning: "데이터의 급격한 변화는 항상 원인이 있습니다. 시스템 로그와 권한 기록을 확인하면 숨겨진 조작을 발견할 수 있습니다.",
  },
  2: {
    id: 2,
    title: "유령 유저의 랭킹 조작",
    subtitle: "The Ghost User's Ranking Manipulation",
    description: "존재하지 않는 사용자가 랭킹 최상위에 등장했습니다. 접속 로그, 랭킹 테이블, 데이터베이스 쿼리 로그를 분석하여 봇 계정을 추적하세요!",
    difficulty: "중급",
    tags: ["데이터베이스", "로그 분석", "봇 탐지"],
    keyLearning: "데이터 무결성은 모든 시스템의 기초입니다. 테이블 간의 관계를 확인하면 비정상적인 데이터 삽입을 발견할 수 있습니다.",
  },
  3: {
    id: 3,
    title: "숨겨진 알고리즘의 비밀",
    subtitle: "The Secret of the Hidden Algorithm",
    description: "특정 유저에게만 유리한 매칭 시스템이 발견되었습니다. 매칭 결과 분포와 알고리즘 설정을 분석하여 조작된 규칙을 확인하세요!",
    difficulty: "고급",
    tags: ["알고리즘 분석", "패턴 인식", "공정성 검증"],
    keyLearning: "알고리즘의 공정성은 코드뿐 아니라 실행 결과로도 검증해야 합니다. 특이 패턴은 숨겨진 편향의 증거입니다.",
  },
};

export const stories: Record<number, Record<string, StoryNode>> = {
  1: case1Story,
  2: case2Story,
  3: case3Story,
};

export function getStory(caseId: number): Record<string, StoryNode> {
  return stories[caseId] || case1Story;
}

export function getCaseMetadata(caseId: number): CaseMetadata {
  return caseMetadata[caseId] || caseMetadata[1];
}
