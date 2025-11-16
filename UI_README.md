# Kastor Data Academy - 새로운 UI 버전

## 📱💻 반응형 UI 시스템

이 프로젝트는 이제 **모바일**과 **데스크톱** 두 가지 버전의 UI를 제공합니다.

---

## 🎨 디자인 특징

### 모바일 UI (mobile_ui.html)
- **2단 레이아웃**: 증거 자료(40%) + 대화(60%)
- **다크 테마**: 보라색 아카데미 스타일
- **폰트**:
  - Playfair Display (제목)
  - Cinzel (헤딩)
  - Space Grotesk (본문)
  - JetBrains Mono (데이터)
- **색상 팔레트**:
  - Primary: `#4C2AFF` (Royal Purple)
  - Background: `#2D1B4E` (Deep Academy Purple)
  - Midnight: `#1A1625`
  - Neon Cyan: `#00F6FF`
  - Electric Violet: `#B458FF`
  - Hologram Green: `#39FF14`

### 데스크톱 UI (desktop_ui.html)
- **클린한 2단 레이아웃**: 증거(40%) + 채팅(60%)
- **다크 모드 지원**
- **폰트**: Roboto (전체)
- **색상 팔레트**:
  - Primary: `#7C3AED` (Purple)
  - Background Dark: `#111827`
  - Gray 스케일 테마
- **부드러운 스크롤바**

---

## 🚀 실행 방법

### 1. 통합 버전 (자동 감지)
```bash
streamlit run new_app.py
```
- 화면에서 📱 Mobile / 💻 Desktop 버튼으로 전환 가능
- 테스트 및 개발에 적합

### 2. 모바일 전용
```bash
streamlit run mobile_app.py
```

### 3. 기존 앱 (원본)
```bash
streamlit run app.py
```

---

## 📂 파일 구조

```
Kastor-Data-Academy/
├── mobile_ui.html          # 모바일 UI (Tailwind + 아카데미 테마)
├── desktop_ui.html         # 데스크톱 UI (Tailwind + 그레이 테마)
├── new_app.py              # 통합 앱 (모바일/데스크톱 전환)
├── mobile_app.py           # 모바일 전용 앱
├── app.py                  # 기존 Streamlit 앱
└── UI_README.md            # 이 파일
```

---

## 🎯 주요 UI 컴포넌트

### 왼쪽 패널 (증거 자료)
1. **Character Stats** - 캐릭터 통계 + 바 차트
2. **Daily Trends** - 일일 트렌드 + 그래프
3. **Patch Notes** - 패치 노트
4. **Server Logs** - 서버 로그 (검색 가능)
5. **Player Profile** - 플레이어 프로필
6. **Match History** - 매치 기록

### 하단 (진행 상황)
- **Current Stage**: 5 / 13
- **Accumulated Points**: 18,450
- **Acquired Badges**: 3 / 7 (시각적 뱃지 표시)

### 오른쪽 패널 (대화)
- **AI 메시지** (Kastor) - 보라색 말풍선
- **사용자 메시지** - 회색 말풍선
- **타이핑 인디케이터** - 애니메이션 점 3개
- **응답 옵션** - 버튼 2개

---

## 🔧 커스터마이징

### 색상 변경 (Tailwind Config)
HTML 파일의 `tailwind.config` 섹션에서 색상 수정:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: "#7C3AED",  // 여기를 수정
                // ...
            }
        }
    }
}
```

### 폰트 변경
HTML `<head>`의 Google Fonts 링크 수정:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet"/>
```

---

## 📱 모바일 최적화

- ✅ 반응형 레이아웃 (`lg:flex-row`)
- ✅ 터치 친화적 버튼 크기
- ✅ 적절한 폰트 크기
- ✅ 스크롤 최적화
- ✅ 768px 브레이크포인트

---

## 💻 데스크톱 최적화

- ✅ 고정 높이 (`h-screen`)
- ✅ 사이드 스크롤 방지
- ✅ 커스텀 스크롤바 (6px)
- ✅ 호버 효과
- ✅ 최대 너비 (`max-w-screen-2xl`)

---

## 🆚 비교표

| 특징 | 모바일 UI | 데스크톱 UI |
|------|-----------|-------------|
| **테마** | 아카데미 다크 (보라색) | 클린 그레이 |
| **폰트** | 다양한 폰트 (4종류) | Roboto 단일 |
| **레이아웃** | 세로 → 가로 전환 | 고정 가로 2단 |
| **스크롤바** | 기본 | 커스텀 (6px) |
| **애니메이션** | 풍부 | 간결 |
| **사용 사례** | 몰입형 게임 | 분석/업무 |

---

## 🎮 다음 단계

### 동적 데이터 통합
현재 HTML은 **정적 프로토타입**입니다. 실제 데이터를 연결하려면:

1. **Streamlit Components 사용**:
   ```python
   components.html(html_content, height=800)
   ```

2. **JavaScript ↔ Python 통신**:
   ```javascript
   // HTML에서 Streamlit으로 데이터 전송
   window.parent.postMessage({
       type: 'streamlit:setComponentValue',
       value: userResponse
   }, '*');
   ```

3. **백엔드 API 통합**:
   - Claude API 호출
   - 데이터베이스 쿼리
   - 세션 상태 관리

### 인터랙션 추가
- [ ] 확장/축소 토글 기능
- [ ] 실시간 채팅
- [ ] 프로그레스 바 애니메이션
- [ ] 뱃지 획득 효과

---

## 📝 참고 자료

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Material Symbols**: https://fonts.google.com/icons
- **Streamlit Components**: https://docs.streamlit.io/library/components

---

## 🐛 알려진 이슈

1. **스크롤 동기화**: 모바일에서 긴 증거 데이터 시 스크롤 충돌 가능
2. **폰트 로딩**: 느린 네트워크에서 FOUT 발생 가능
3. **브라우저 호환성**: IE11 미지원 (Tailwind JIT)

---

## ✅ 체크리스트

- [x] 모바일 UI HTML 생성
- [x] 데스크톱 UI HTML 생성
- [x] 통합 Streamlit 앱 생성
- [x] README 작성
- [ ] 동적 데이터 연결
- [ ] API 통합
- [ ] 배포

---

**Made with ❤️ for Kastor Data Academy**
