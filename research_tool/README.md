# Kastor Data Academy - 사업계획서 자료 수집 도구

Reddit 커뮤니티 분석을 통한 시장 조사 자동화 도구입니다.

**데이터 수집 → 분석 → 리포트 생성**을 한 번에 실행하여 사업계획서에 바로 활용할 수 있는 근거 자료를 생성합니다.

## 🎯 주요 기능

### 1. 자동 데이터 수집
- **PRAW** (Python Reddit API Wrapper) 사용
- 4개 주요 서브레딧에서 자동 수집:
  - r/teenagers (청소년 진로 고민)
  - r/Parenting (부모의 교육 니즈)
  - r/learnprogramming (프로그래밍 학습 어려움)
  - r/datascience (데이터 사이언스 진입 장벽)
- 키워드 기반 검색 (30+ 키워드)

### 2. 데이터 분석
- **감정 분석** (VADER Sentiment): 긍정/부정/중립 분류
- **고통점 추출**: 학습 어려움, 좌절감 표현 게시글 식별
- **키워드 빈도 분석**: 가장 많이 언급된 단어 Top 50
- **참여도 분석**: 업보트, 댓글 수, 인기도

### 3. 시각화
- 워드클라우드
- 감정 분포 차트
- 서브레딧별 게시글 통계
- 업보트/고통점 분포 그래프

### 4. 사업계획서용 리포트 생성
- **HTML 리포트** 자동 생성
- PDF로 변환 가능
- 시장 조사 섹션에 바로 삽입 가능한 형식
- 실제 사용자 인용문 포함

---

## 🚀 빠른 시작

### 1. 설치

```bash
# 1. 가상환경 생성 (권장)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 2. 패키지 설치
pip install -r requirements.txt
```

### 2. Reddit API 설정

1. https://www.reddit.com/prefs/apps 접속
2. 'create app' 클릭
3. 다음과 같이 입력:
   - **name**: Kastor Research Tool
   - **type**: script
   - **redirect uri**: http://localhost:8080
4. 생성된 `client_id`와 `client_secret` 복사
5. `.env` 파일 생성:

```bash
cp .env.example .env
```

6. `.env` 파일 편집:

```
REDDIT_CLIENT_ID=your_client_id_here
REDDIT_CLIENT_SECRET=your_client_secret_here
REDDIT_USER_AGENT=Kastor_Research_Bot/1.0
```

### 3. 실행

```bash
# 전체 프로세스 한 번에 실행
python main.py
```

**실행 시간**: 약 5-10분 (네트워크 속도에 따라 다름)

---

## 📊 생성되는 파일

실행 후 `output/` 폴더에 다음 파일들이 생성됩니다:

```
output/
├── reddit_raw_data_20250112_143022.csv          # 원본 데이터 (CSV)
├── reddit_raw_data_20250112_143022.xlsx         # 원본 데이터 (Excel)
├── reddit_analyzed_20250112_143022.xlsx         # 분석 데이터 (Excel)
├── business_report_20250112_143022.html         # 📄 사업계획서 리포트
└── charts/
    ├── wordcloud.png                            # 워드클라우드
    ├── overview.png                             # 개요 차트
    └── trend.png                                # 트렌드 차트
```

---

## 📄 리포트 활용 방법

### 1. HTML 리포트 열기

```bash
# Mac/Linux
open output/business_report_*.html

# Windows
start output/business_report_*.html
```

### 2. PDF로 저장

1. 브라우저에서 리포트 열기
2. 하단의 **'📄 PDF로 저장'** 버튼 클릭
3. 인쇄 대화상자에서 **'PDF로 저장'** 선택
4. 저장

### 3. 사업계획서에 활용

리포트에서 다음 섹션을 복사/인용:

- **시장 조사 섹션**:
  - "주요 발견사항" → 타겟 사용자 니즈 입증
  - "사용자 고통점" → 해결해야 할 문제 정의
  - "실제 사용자 목소리" → 직접 인용

- **시장 규모 섹션**:
  - 게시글 수, 참여도 통계 → 시장 관심도 지표

- **경쟁 우위 섹션**:
  - "결론 및 시사점" → 차별화 포인트

---

## ⚙️ 설정 커스터마이징

`config.py`에서 다음을 수정할 수 있습니다:

```python
# 수집할 게시글 수
MAX_POSTS_PER_KEYWORD = 50

# 검색 기간
TIME_FILTER = 'year'  # 'hour', 'day', 'week', 'month', 'year', 'all'

# 정렬 기준
SORT_BY = 'relevance'  # 'relevance', 'hot', 'top', 'new', 'comments'

# 최소 업보트 수
MIN_UPVOTES = 5

# 서브레딧 및 키워드 추가/수정
SUBREDDITS = {
    'your_subreddit': {
        'keywords': ['keyword1', 'keyword2'],
        'description': '설명'
    }
}
```

---

## 🛠️ 개별 모듈 실행

전체 프로세스가 아닌 개별 단계만 실행하고 싶다면:

### 1. 데이터 수집만

```bash
python scraper.py
```

### 2. 분석만 (기존 데이터 사용)

```bash
python analyzer.py
```

### 3. 리포트 생성만

```bash
python reporter.py
```

---

## 📈 분석 항목

### 1. 감정 분석
- **VADER Sentiment Analyzer** 사용
- 점수 범위: -1 (매우 부정) ~ +1 (매우 긍정)
- 카테고리: Positive / Neutral / Negative

### 2. 고통점 분석
고통점 키워드 감지:
```
hard, difficult, struggle, frustrated, overwhelmed,
confused, give up, quit, too much, don't understand,
can't, impossible, stuck, lost, help
```

### 3. 키워드 추출
- 최소 4글자 영어 단어
- 불용어 제거
- 빈도수 기반 Top 50

### 4. 참여도 분석
- 평균 업보트
- 평균 댓글 수
- 업보트 비율 (upvote_ratio)

---

## 🎨 리포트 구성

생성되는 HTML 리포트는 다음 섹션을 포함합니다:

1. **조사 개요**
   - 핵심 통계 (게시글 수, 평균 업보트 등)
   - 조사 대상 커뮤니티 설명

2. **주요 발견사항**
   - 핵심 인사이트
   - Top 15 키워드
   - 워드클라우드

3. **사용자 고통점 (Pain Points)**
   - 고통점 표현 게시글 Top 10
   - 원문 링크 포함

4. **실제 사용자 목소리**
   - 인용 가능한 게시글 Top 10
   - 출처 및 링크

5. **데이터 시각화**
   - 감정 분포 차트
   - 서브레딧별 통계
   - 업보트/고통점 분포

6. **결론 및 시사점**
   - Kastor의 기회
   - 경쟁 우위 확보 방안

---

## 📚 사용 기술

| 분야 | 라이브러리 | 용도 |
|------|-----------|------|
| Reddit API | PRAW 7.7.1 | 데이터 수집 |
| 데이터 처리 | Pandas, NumPy | 데이터 분석 |
| 감정 분석 | VADER Sentiment | 감정 분류 |
| 시각화 | Matplotlib, Seaborn, WordCloud | 차트 생성 |
| 리포트 생성 | Jinja2 | HTML 템플릿 |

---

## 🔒 개인정보 및 윤리

- **공개 데이터만 수집**: Reddit의 공개 게시글만 분석
- **익명화**: 개인 식별 정보 미포함
- **Reddit API 정책 준수**: Rate limiting, Terms of Service 준수
- **학술 목적**: 사업 계획 및 시장 조사 목적으로만 사용

---

## 🐛 트러블슈팅

### 1. "Reddit API 연결 실패"

**해결 방법**:
- `.env` 파일에 `REDDIT_CLIENT_ID`와 `REDDIT_CLIENT_SECRET`이 올바르게 입력되었는지 확인
- https://www.reddit.com/prefs/apps 에서 앱 상태 확인

### 2. "게시글을 찾을 수 없습니다"

**원인**: 검색 키워드나 서브레딧에 해당 게시글이 없음

**해결 방법**:
- `config.py`에서 `TIME_FILTER`를 'all'로 변경
- 키워드를 더 일반적인 단어로 수정

### 3. "Rate Limit 오류"

**원인**: Reddit API 요청 한도 초과

**해결 방법**:
- `scraper.py`의 `time.sleep()` 값을 늘림 (0.5 → 1.0)
- 잠시 후 다시 시도

---

## 📞 도움말

문제가 발생하면:
1. 먼저 이 README의 트러블슈팅 섹션 확인
2. `output/` 폴더의 로그 확인
3. GitHub Issues에 문의

---

## 📝 라이선스

이 도구는 Kastor Data Academy 프로젝트의 일부로 개발되었습니다.

---

## 🙏 감사의 말

- Reddit API (PRAW)
- VADER Sentiment Analysis
- Open Source Community

---

**Made with ❤️ for Kastor Data Academy**
