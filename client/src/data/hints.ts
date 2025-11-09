export const caseHints: Record<number, Record<string, string>> = {
  1: {
    briefing_data: "그래프에서 급격한 변화가 있는 캐릭터를 찾아보세요. Week 3의 데이터에 주목하세요.",
    investigation_start: "패치 로그에서 드래곤나이트와 관련된 변경사항을 찾아보세요.",
    investigation_deep: "권한 로그에서 새벽 시간대의 활동을 자세히 살펴보세요. 로그 삭제 시도가 있나요?",
  },
  2: {
    briefing_data: "PhantomKing의 점수와 가입일 데이터를 다른 유저들과 비교해보세요.",
    investigation_start: "로그인 상태와 점수 갱신 액션의 순서를 확인해보세요. 논리적으로 가능한가요?",
    investigation_deep: "데이터베이스에 직접 접근한 사용자와 대상 테이블을 확인하세요. INSERT와 UPDATE가 무엇을 의미하나요?",
  },
  3: {
    briefing_data: "각 유저의 '상대 실력 차이' 값을 비교해보세요. 누가 가장 극단적인 값을 가지고 있나요?",
    investigation_start: "매칭 규칙 테이블에서 LuckyPlayer의 규칙이 다른 그룹과 어떻게 다른지 확인하세요.",
    investigation_deep: "IP 주소, 디바이스 ID, 이메일, 접속 시간을 종합적으로 비교해보세요.",
  },
};

export function getHint(caseId: number, nodeId: string): string | null {
  return caseHints[caseId]?.[nodeId] || null;
}
