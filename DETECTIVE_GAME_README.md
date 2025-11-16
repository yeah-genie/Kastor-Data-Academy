# 🔍 Kastor Data Academy - Episode 1

교육용 데이터 분석 학습 게임입니다. AI 파트너 Kastor와 대화하며 데이터 분석의 기본 프로세스(가설 설정 → 검증)를 배웁니다.

## 📖 스토리

게임 '레전드 아레나'의 캐릭터 '셰도우'의 승률이 하루 만에 **50% → 85%**로 폭등했습니다!
패치도 밸런스 변경도 없었는데 왜 이런 일이 발생했을까요?

Kastor와 함께 데이터를 분석하며 원인을 찾아보세요!

## ✨ 주요 기능

### 🤖 Kastor - AI 데이터 분석 파트너
- **음식 비유 덕후**: 복잡한 데이터를 음식으로 쉽게 설명
- **분위기 메이커**: 긴장을 풀고 격려하며 함께 분석
- **스마트 힌트**: 막힐 때마다 적절한 힌트 제공

### 📊 인터랙티브 데이터 분석
- **3가지 데이터셋**: 캐릭터 승률, 시간별 추이, 매치 로그
- **실시간 차트**: Plotly로 만든 인터랙티브 차트
- **자유 탐색**: 원하는 데이터를 펼쳐보며 분석

### 🎯 학습 목표
1. **가설 설정**: 문제 상황에서 가능한 원인 추론하기
2. **데이터 검증**: 가설을 데이터로 확인하기
3. **패턴 발견**: 시간별, 조건별 변화 찾기
4. **근거 찾기**: 구체적인 수치로 결론 도출하기

### 💬 혼합형 대화 시스템
- **선택지 버튼**: 추천 행동으로 빠르게 진행
- **자유 채팅**: Kastor에게 자유롭게 질문
- **OpenAI API**: GPT-3.5로 자연스러운 대화

## 🚀 빠른 시작

### 1. 필수 요구사항
- Python 3.8 이상
- OpenAI API 키 ([발급 받기](https://platform.openai.com/api-keys))

### 2. 설치

```bash
# 저장소 클론
git clone https://github.com/yeah-genie/Kastor-Data-Academy.git
cd Kastor-Data-Academy

# 가상환경 생성 (선택)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 패키지 설치
pip install -r requirements.txt
```

### 3. 환경 설정

```bash
# .env 파일 생성
cp .env.example .env

# .env 파일 편집하여 API 키 입력
# OPENAI_API_KEY=your-actual-api-key-here
```

### 4. 실행

```bash
streamlit run app.py
```

브라우저에서 자동으로 열립니다! (보통 http://localhost:8501)

## 📁 프로젝트 구조

```
Kastor-Data-Academy/
├── app.py                      # 메인 Streamlit 애플리케이션
├── data/
│   ├── characters.csv          # 캐릭터 승률 데이터
│   ├── shadow_hourly.csv       # 셰도우 시간별 데이터
│   └── match_logs.csv          # 매치 상세 로그
├── requirements.txt            # Python 패키지 목록
├── .env.example               # 환경 변수 템플릿
└── README.md                  # 이 파일
```

## 🎮 플레이 가이드

### 진행 순서

1. **인트로 (0%)**
   - Kastor 만나기
   - 사건 소개 받기

2. **데이터 탐색 (20%)**
   - 캐릭터 승률 확인
   - 셰도우의 이상 징후 발견

3. **가설 설정 (40-80%)**
   - 가설 1: 패치 변경? → 시간별 데이터 확인
   - 가설 2: 프로 게이머? → 플레이어 확인
   - 가설 3: 버그? → 매치 로그 분석

4. **결론 (100%)**
   - 원인 발견!
   - 학습 내용 정리

### 팁

- 📊 **데이터 expander**를 펼쳐서 자세히 보세요
- 💬 **자유롭게 질문**하세요 (Kastor가 친절히 답변합니다)
- 🔍 **차트를 클릭**하면 인터랙티브하게 확대/축소 가능
- 💡 **추천 행동 버튼**을 누르면 빠르게 진행할 수 있어요

## 🛠️ 기술 스택

- **Streamlit**: 웹 애플리케이션 프레임워크
- **OpenAI API**: GPT-3.5 기반 대화형 AI
- **Pandas**: 데이터 처리 및 분석
- **Plotly**: 인터랙티브 데이터 시각화
- **Python-dotenv**: 환경 변수 관리

## 🐛 문제 해결

### API 키 오류
```
Error: OpenAI API key not found
```
→ `.env` 파일에 올바른 API 키를 입력했는지 확인하세요.

### 패키지 설치 오류
```bash
# 최신 pip로 업그레이드
pip install --upgrade pip

# 다시 설치
pip install -r requirements.txt
```

### 포트 충돌
```bash
# 다른 포트로 실행
streamlit run app.py --server.port 8502
```

## 🎓 학습 포인트

이 게임을 통해 배우는 것:

1. **데이터 분석 사고 프로세스**
   - 문제 인식 → 가설 설정 → 데이터 수집 → 검증 → 결론

2. **데이터 탐색 기법**
   - 전체 통계 확인 (평균, 이상치)
   - 시계열 패턴 분석
   - 상세 로그 조사

3. **비판적 사고**
   - 여러 가능성 고려하기
   - 데이터로 검증하기
   - 근거 기반 결론 도출

## 🚧 향후 계획

- [ ] Episode 2: 유령 유저의 랭킹 조작
- [ ] Episode 3: 완벽한 승리
- [ ] 성취 시스템 추가
- [ ] 학습 진도 저장 기능

## 📄 라이선스

MIT License

## 🤝 기여

이슈, PR 환영합니다!

---

**만든이**: Kastor Data Academy Team
**문의**: [GitHub Issues](https://github.com/yeah-genie/Kastor-Data-Academy/issues)
