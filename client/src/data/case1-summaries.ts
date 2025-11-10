import { StageSummary } from "./case1-story-new";

export const case1Summaries: Record<string, StageSummary> = {
  stage1_complete: {
    stage: 1,
    title: "문제 파악 및 가설 수립",
    keyFindings: [
      "Shadow Reaper의 승률이 비정상적으로 상승함",
      "게임 밸런스가 의도적으로 조작되었을 가능성",
      "서버 로그와 증인 인터뷰를 통해 조사 시작",
    ],
    evidenceCount: 2,
    nextStageHint: "증인들과 인터뷰를 진행하세요"
  },
  
  stage2_complete: {
    stage: 2,
    title: "증인 인터뷰",
    keyFindings: [
      "Maya는 10:47 PM에 퇴근했다고 CCTV에 기록됨",
      "Chris는 개인 AI 연구를 위해 회사 데이터가 필요했다고 인정",
      "Ryan은 익명으로 커뮤니티에 이슈를 게시했으며 서버 로그 제공",
      "admin01 계정으로 11:15 PM에 Shadow Reaper의 공격력이 100→150으로 수정됨"
    ],
    evidenceCount: 4,
    nextStageHint: "IP 주소 분석을 통해 실제 범인을 찾아보세요"
  },
  
  stage3_complete: {
    stage: 3,
    title: "데이터 전처리 및 분석",
    keyFindings: [
      "Maya가 퇴근한 후 Chris의 컴퓨터(192.168.1.47)에서 활동 감지",
      "11:15 PM에 Chris의 컴퓨터에서 Maya의 admin01 계정으로 로그인",
      "Chris가 Maya의 계정을 무단으로 사용했다는 결정적 증거 확보",
      "IP 주소와 CCTV 타임라인이 완벽하게 일치"
    ],
    evidenceCount: 6,
    nextStageHint: "모든 증거를 종합하여 결론을 도출하세요"
  },
  
  stage4_complete: {
    stage: 4,
    title: "증거 종합",
    keyFindings: [
      "Chris가 AI 연구를 위해 Maya의 계정 정보를 도용",
      "실험 데이터 확보를 위해 의도적으로 게임 밸런스를 조작",
      "승률 데이터가 Chris의 가설을 뒷받침함",
      "모든 증거가 Chris를 범인으로 지목"
    ],
    evidenceCount: 8,
    nextStageHint: "Chris를 대면하고 진실을 밝히세요"
  }
};

export function getStageSummary(stageNumber: number): StageSummary | undefined {
  const key = `stage${stageNumber}_complete`;
  return case1Summaries[key];
}
