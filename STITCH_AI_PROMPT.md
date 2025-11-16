# Streamlit UI 프로젝트 설명 - Kastor Data Academy

## 프로젝트 개요
**Kastor Data Academy**는 데이터 분석을 게임화하여 가르치는 교육용 Streamlit 웹 애플리케이션입니다. 사용자는 탐정이 되어 13단계의 스토리를 진행하며 데이터 분석 기술을 배웁니다.

---

## 핵심 UI 구조

### 1. 메인 레이아웃 (2단 구성)
```
┌─────────────────────────────────────────────────────┐
│  [왼쪽 40%: 증거 자료]   │  [오른쪽 60%: AI 대화]  │
│                          │                          │
│  • 캐릭터 통계           │  • Kastor (AI 파트너)   │
│  • 일일 트렌드           │  • 채팅 인터페이스       │
│  • 패치 노트             │  • 단계별 진행 상황      │
│  • 서버 로그             │  • 포인트/배지 시스템    │
│  • 플레이어 프로필       │                          │
│  • 매치 기록             │                          │
└─────────────────────────────────────────────────────┘
```

### 2. 주요 파일 구조
```
Kastor-Data-Academy/
├── app.py                          # 메인 Streamlit 앱 (1,631줄)
├── streamlit_app/
│   └── app.py                      # 클라우드 배포용 (1,185줄)
├── data/                           # CSV 데이터 파일
└── [분석 문서들]
```

---

## UI 컴포넌트 상세

### A. 왼쪽 패널 - 증거 자료 (40%)

#### 6개의 확장 가능한 섹션:

1. **📊 캐릭터 통계**
   - Plotly 차트로 시각화
   - 단계별로 점진적 공개
   - 이상 패턴 강조 표시

2. **📈 일일 트렌드**
   - 시계열 데이터
   - 특정 날짜 스파이크 탐지

3. **📝 패치 노트**
   - 게임 업데이트 기록
   - 데이터 불일치 찾기

4. **🖥️ 서버 로그**
   - 필터링 가능한 로그
   - IP 주소 추적

5. **👤 플레이어 프로필**
   - 의심 플레이어 정보
   - 디바이스 지문

6. **🎮 매치 기록**
   - 게임 플레이 히스토리
   - 이상 행동 패턴

### B. 오른쪽 패널 - 대화 인터페이스 (60%)

#### 주요 요소:

1. **AI 캐릭터 (Kastor)**
   - 모델: Claude 3.5 Haiku
   - 개성 있는 대화 스타일
   - 500자+ 시스템 프롬프트
   - 최대 200 토큰 응답

2. **채팅 UI**
   - 메신저 스타일 말풍선
   - AI 보라색 (#7C3AED)
   - 사용자 회색 (#E5E5EA)
   - 타이핑 애니메이션

3. **진행 상황 표시**
   - 현재 스테이지 (1-13)
   - 누적 포인트
   - 획득 배지 (7개)

---

## 게임 메커니즘

### 13단계 스토리 진행

| 단계 | 제목 | 학습 목표 |
|------|------|-----------|
| 1 | 튜토리얼 | 기본 UI 이해 |
| 2-4 | 데이터 탐색 | 차트 읽기 |
| 5-7 | 가설 수립 | 이상 탐지 |
| 8-10 | 증거 수집 | 로그 분석 |
| 11-13 | 진실 규명 | 종합 분석 |

### 3가지 미니게임

1. **이상 탐지 게임**
   - 차트에서 스파이크 찾기
   - 시각적 패턴 인식

2. **타임라인 퍼즐**
   - 이벤트 순서 맞추기
   - 논리적 사고

3. **로그 필터링**
   - 의심 IP 찾기
   - 데이터 필터링 실습

### 배지 시스템 (7개)

```
🔍 탐정 입문  →  📊 데이터 분석가  →  🎯 진실 탐구자
       ↓              ↓                  ↓
   💡 통찰의 달인  →  🏆 카스토르의 제자  →  👑 전설의 탐정
                          ↓
                      ⭐ 완벽한 수사
```

획득 시 축하 애니메이션 (`badgePop`)

---

## 스타일링 시스템

### CSS 구성 (350+ 줄)

```css
/* 주요 색상 팔레트 */
--ai-purple: #7C3AED
--user-gray: #E5E5EA
--background: #0E1117
--card-bg: #1E1E1E
--accent: #FF6B6B

/* 애니메이션 (10+) */
@keyframes badgePop { ... }      /* 배지 획득 */
@keyframes pulse { ... }         /* 강조 효과 */
@keyframes typing { ... }        /* 타이핑 표시 */
@keyframes blink { ... }         /* 깜빡임 */
@keyframes slideInEvidence { ... } /* 증거 등장 */
```

### 반응형 디자인

```css
@media (max-width: 768px) {
  /* 모바일: 단일 컬럼 */
  /* 터치 최적화 */
  /* 작은 폰트 */
}

@media (prefers-reduced-motion: reduce) {
  /* 접근성: 애니메이션 최소화 */
}
```

---

## 데이터 흐름

```
[CSV 파일들]
     ↓
[Pandas DataFrame]
     ↓
[@st.cache_data 캐싱]
     ↓
[Plotly 차트 생성]
     ↓
[Streamlit 컴포넌트]
     ↓
[사용자 화면]
```

### 세션 상태 관리 (10+ 변수)

```python
st.session_state = {
    'stage': int,              # 현재 스테이지 (1-13)
    'points': int,             # 누적 포인트
    'badges': list,            # 획득 배지 목록
    'chat_history': list,      # 대화 내역
    'user_name': str,          # 사용자 이름
    'hints_used': int,         # 사용한 힌트 수
    'mini_game_scores': dict,  # 미니게임 점수
    'evidence_unlocked': dict, # 공개된 증거
    # ...
}
```

---

## AI 통합 세부사항

### Claude API 설정

```python
model = "claude-3-5-haiku-20241022"
max_tokens = 200
temperature = 0.7

system_prompt = """
당신은 카스토르(Kastor), 데이터 분석을 가르치는
AI 파트너입니다. 친근하지만 전문적인 톤으로...
[500자+ 프롬프트]
"""

# 컨텍스트: 최근 5개 메시지
context_window = chat_history[-5:]
```

---

## 교육 목표

### 학습 성과

1. **데이터 리터러시**
   - 차트 해석 능력
   - 이상치 탐지

2. **분석적 사고**
   - 가설 수립
   - 증거 기반 추론

3. **기술 스킬**
   - 로그 분석
   - 데이터 필터링
   - 디지털 포렌식

4. **문제 해결**
   - 비판적 사고
   - 패턴 인식

---

## 기술 스택

```yaml
프레임워크: Streamlit 1.x
AI: Anthropic Claude 3.5 Haiku
데이터: Pandas + NumPy
시각화: Plotly (인터랙티브)
스타일: CSS3 + JavaScript
배포: Streamlit Cloud
언어: Python 3.8+
```

---

## 개발 시 주의사항

### ✅ 해야 할 것

- `@st.cache_data`로 데이터 로딩 최적화
- 세션 상태로 사용자 진행 상황 추적
- 모바일 반응형 디자인 유지
- 접근성 고려 (애니메이션 옵션)
- 에러 핸들링 (API 실패 시)

### ❌ 하지 말아야 할 것

- 페이지 새로고침 시 진행 상황 손실
- 과도한 API 호출 (비용 증가)
- 복잡한 다중 페이지 구조
- 느린 데이터 로딩 (캐싱 필수)

---

## UI 작업 가이드

### 새 기능 추가 시

1. **세션 상태 확인**
   ```python
   if 'new_feature' not in st.session_state:
       st.session_state.new_feature = initial_value
   ```

2. **레이아웃 유지**
   ```python
   col1, col2 = st.columns([0.4, 0.6])
   with col1:
       # 증거 자료
   with col2:
       # AI 대화
   ```

3. **스타일 추가**
   ```python
   st.markdown("""
   <style>
   .new-component {
       /* CSS here */
   }
   </style>
   """, unsafe_allow_html=True)
   ```

4. **데이터 캐싱**
   ```python
   @st.cache_data
   def load_new_data():
       return pd.read_csv('new_data.csv')
   ```

---

## 성능 최적화

- **초기 로딩**: ~2-3초 (캐싱 후)
- **페이지 전환**: 즉시 (SPA)
- **AI 응답**: ~1-2초
- **차트 렌더링**: ~0.5초 (Plotly)

---

## 문서 참조

프로젝트 루트에 상세 문서 있음:

- `DOCUMENTATION_INDEX.md` - 전체 문서 네비게이션
- `STREAMLIT_UI_ANALYSIS.md` - 기술 상세 (20KB)
- `STREAMLIT_ANALYSIS_SUMMARY.md` - 요약 (12KB)
- `UI_STRUCTURE_DIAGRAM.txt` - 다이어그램 (16KB)

---

## 요약

이 Streamlit 앱은:
- ✨ **게임화된 학습 경험** (13단계 스토리)
- 🤖 **AI 파트너와 대화** (Claude 3.5 Haiku)
- 📊 **인터랙티브 데이터 시각화** (Plotly)
- 🏆 **배지와 포인트 시스템** (동기 부여)
- 📱 **반응형 디자인** (모바일 지원)
- 🎨 **세련된 UI** (350+ 줄 CSS)

**목표**: 재미있게 데이터 분석을 배우는 교육용 플랫폼
