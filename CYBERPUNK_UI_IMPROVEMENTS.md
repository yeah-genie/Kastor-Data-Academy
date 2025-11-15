# 📱 사이버펑크 UI 개선 사항

## ✨ 구현된 기능

### 1. 🎭 리얼한 시스템 알람 (`RealisticNotification`)
실제 스마트폰 알람처럼 화면 상단에서 슬라이드되어 나타나는 알람입니다.

**특징:**
- 📱 실제 시스템 알람과 동일한 디자인 (앱 아이콘, 앱 이름, 시간 표시)
- ✨ 사이버펑크 네온 glow 효과 (파란 빛 확산)
- 🎬 Elastic 애니메이션으로 부드럽게 등장
- 👆 위로 스와이프하거나 X 버튼으로 제거
- ⏰ 5초 후 자동 제거
- 🔔 햅틱 피드백

**사용 예시:**
```dart
RealisticNotification.show(
  context,
  appName: 'Kastor',
  title: 'New Message',
  body: 'You have a suspicious email from Maya...',
  icon: '📧',
  accentColor: Color(0xFF00D9FF),
  onTap: () {
    // 알람 클릭 시 동작
  },
);
```

### 2. 💬 Typing Indicator (`TypingIndicator`)
디스코드 스타일의 "Kastor is typing..." 표시

**특징:**
- 💬 디스코드 스타일 디자인
- ✨ 애니메이션 점(dot) 3개
- 🎨 캐릭터별 색상 테마 적용
- 👤 프로필 아이콘과 함께 표시

**사용 예시:**
```dart
TypingIndicator(
  name: 'Kastor',
  accentColor: Color(0xFF00D9FF),
)
```

### 3. 👤 프로필 사진 크기 확대 및 네온 효과
- **크기:** 40x40 → 60x60으로 확대
- **네온 효과:** 그라디언트 배경 + 테두리 glow
- **그림자:** 캐릭터 색상에 맞는 빛 확산 효과

**Before:**
```dart
Container(
  width: 40,
  height: 40,
  color: Colors.blue.withOpacity(0.2),
)
```

**After:**
```dart
Container(
  width: 60,
  height: 60,
  decoration: BoxDecoration(
    gradient: LinearGradient(...),
    border: Border.all(color: cyan, width: 2),
    boxShadow: [
      BoxShadow(
        color: cyan.withOpacity(0.5),
        blurRadius: 15,
        spreadRadius: 3,
      ),
    ],
  ),
)
```

### 4. 🎭 이모지 반응 고급화
기존 단순한 흰색 박스에서 사이버펑크 스타일로 변경

**특징:**
- ✨ Elastic 애니메이션으로 튀어나옴
- 🎨 그라디언트 배경 (dark blue)
- 💎 네온 테두리 (cyan)
- 🌟 Glow 효과 (이모지 자체에도 그림자 적용)

### 5. 🎨 사이버펑크 탐정 스타일 UI

#### 색상 팔레트:
- **Background:** `#1A1D2E` (다크 네이비)
- **Card:** `#252A3E` (카드 배경)
- **Accent:** `#00D9FF` (사이안 네온)
- **Bright Cyan:** `#00F5FF` (밝은 사이안)

#### UI 요소들:
1. **네온 테두리:** 모든 중요 요소에 glow 효과
2. **그라디언트:** 단색 대신 그라디언트 사용
3. **Box Shadow:** 네온 빛 확산 효과
4. **애니메이션:** Elastic, bounce 등 dynamic한 움직임

## 📦 설치된 패키지

```yaml
dependencies:
  lottie: ^3.1.3  # 애니메이션 아이콘용 (향후 이모지 대체)
```

## 🎬 사용 가이드

### Story Provider에서 리얼한 알람 표시:

```dart
// 이메일 도착 알람
ref.read(storyProviderV2.notifier).showRealisticNotification(
  context,
  appName: 'Email',
  title: 'New Email from Maya',
  body: 'There\'s something wrong with the ranking system...',
  icon: '📧',
  accentColor: Color(0xFFFF006E), // 빨간색으로 긴급함 표현
);

// 시스템 알람
RealisticNotification.show(
  context,
  appName: 'KASTOR',
  title: '⚠️ System Alert',
  body: 'Anomaly detected in database',
  icon: '🚨',
  accentColor: Color(0xFFFF3860),
);
```

### Typing Indicator 사용:

Story JSON에 typing indicator 추가:
```json
{
  "id": "msg_typing",
  "speaker": "system",
  "text": "",
  "typingUser": "Kastor",
  "delay": 2000
}
```

### 사이버펑크 스타일 새 컴포넌트 만들기:

```dart
Container(
  decoration: BoxDecoration(
    gradient: LinearGradient(
      colors: [Color(0xFF252A3E), Color(0xFF1E2130)],
    ),
    borderRadius: BorderRadius.circular(16),
    border: Border.all(
      color: Color(0xFF00D9FF).withOpacity(0.5),
      width: 2,
    ),
    boxShadow: [
      BoxShadow(
        color: Color(0xFF00D9FF).withOpacity(0.3),
        blurRadius: 12,
        spreadRadius: 2,
      ),
    ],
  ),
  child: YourContent(),
)
```

## 🎯 다음 개선 사항

1. **이모지 → Lottie 애니메이션 아이콘 교체**
   - Flaticon 에서 animated icon 다운로드
   - JSON 형식으로 변환
   - Lottie.asset()으로 교체

2. **음성 효과 추가**
   - 알람 소리 (디잉!)
   - 타이핑 소리
   - 이모지 반응 소리

3. **더 많은 interactive 효과**
   - 화면 깜빡임 (해킹 당했을 때)
   - 글리치 효과
   - 홀로그램 스캔 라인

## 📝 변경된 파일 목록

1. `pubspec.yaml` - lottie 패키지 추가
2. `lib/widgets/realistic_notification.dart` - NEW ✨
3. `lib/widgets/typing_indicator.dart` - NEW ✨
4. `lib/screens/story/story_chat_screen_v2.dart` - 프로필 크기 & 이모지 개선
5. `lib/providers/story_provider_v2.dart` - 리얼한 알람 메서드 추가

## 🎨 디자인 참고

- **알람 디자인:** iOS/Android 시스템 알람
- **Typing:** Discord typing indicator
- **색상 테마:** Cyberpunk 2077, Blade Runner
- **네온 효과:** 80s synthwave aesthetic
