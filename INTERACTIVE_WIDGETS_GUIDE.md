# 인터랙티브 위젯 사용 가이드

Kastor Data Academy 스토리에 실감나는 인터랙티브 효과를 추가하는 방법입니다.

## 📱 알림 오버레이 (Notification Overlay)

### 사용법
```dart
import 'package:flutter/material.dart';
import '../../widgets/notification_overlay.dart';

// 이메일 알림
NotificationOverlay.show(
  context,
  NotificationData(
    type: NotificationType.email,
    title: '새 메일 도착',
    message: 'Maya Kim: 긴급! 랭킹 시스템 이상 발견',
    time: '09:30',
  ),
);

// 전화 알림
NotificationOverlay.show(
  context,
  NotificationData(
    type: NotificationType.phone,
    title: '부재중 전화',
    message: 'Maya Kim',
    time: '14:22',
  ),
);

// 알람 알림
NotificationOverlay.show(
  context,
  NotificationData(
    type: NotificationType.alarm,
    title: '알람',
    message: '회의 시작 10분 전',
    time: '09:50',
  ),
);

// 메시지 알림
NotificationOverlay.show(
  context,
  NotificationData(
    type: NotificationType.message,
    title: 'Kastor',
    message: '데이터 확인 부탁드립니다',
    time: '방금',
  ),
);

// 시스템 알림
NotificationOverlay.show(
  context,
  NotificationData(
    type: NotificationType.system,
    title: '시스템 알림',
    message: '데이터 동기화 완료',
    time: '방금',
  ),
);
```

### 스토리에서 사용
```dart
// StoryProvider에서 호출
ref.read(storyProviderV2.notifier).showNotificationEffect(
  context,
  NotificationData(
    type: NotificationType.email,
    title: '새 메일',
    message: '${speaker}: ${emailSubject}',
    time: storyTime,
  ),
);
```

## ✨ 화면 효과 (Screen Effects)

### 1. 플래시 효과
```dart
import '../../widgets/screen_effects.dart';

// 충격적인 발견이나 반전이 있을 때
ScreenEffects.flash(context);

// 또는 Provider를 통해
ref.read(storyProviderV2.notifier).showFlashEffect(context);
```

### 2. 페이드 효과
```dart
// 시간 경과나 장면 전환
ScreenEffects.fade(context);

// 특정 색상으로 페이드
ScreenEffects.fade(context, color: Colors.black);

// Provider를 통해
ref.read(storyProviderV2.notifier).showFadeEffect(context, color: Colors.black);
```

### 3. 진동 효과
```dart
// 가벼운 진동 (버튼 클릭)
ScreenEffects.vibrate(VibrationPattern.light);

// 중간 진동 (알림)
ScreenEffects.vibrate(VibrationPattern.medium);

// 강한 진동 (충격적인 순간)
ScreenEffects.vibrate(VibrationPattern.heavy);

// 선택 피드백
ScreenEffects.vibrate(VibrationPattern.selection);

// Provider를 통해
ref.read(storyProviderV2.notifier).vibrateEffect(VibrationPattern.medium);
```

### 4. 블러 효과
```dart
// 배경 블러 (모달 뒤에)
ScreenEffects.blur(
  child: YourWidget(),
  sigma: 10.0, // 블러 강도
);
```

## 📧 전체화면 이메일 (Email Fullscreen)

### 사용법
```dart
import '../../widgets/email_fullscreen.dart';

// 이메일 데이터
final email = EmailData(
  from: 'Maya Kim',
  fromEmail: 'maya.kim@company.com',
  subject: '[긴급] 랭킹 조작 의심 사례 발견',
  body: '''안녕하세요, Kastor님

어제 말씀드린 랭킹 시스템 이상 징후에 대해 조사한 결과를 공유드립니다.

문제의 사용자(ID: ghost_user_47)가...
''',
  time: '2024년 1월 15일 오전 9:30',
  isRead: false,
  avatarPath: 'assets/characters/maya.svg',
);

// 이메일 전체화면 표시
EmailFullScreen.show(context, email);

// Provider를 통해
ref.read(storyProviderV2.notifier).showEmailFullscreen(context, email);
```

### 이메일 카드에서 연결
```dart
InkWell(
  onTap: () {
    // 진동 피드백
    ScreenEffects.vibrate(VibrationPattern.light);
    
    // 전체화면 이메일 표시
    EmailFullScreen.show(context, emailData);
  },
  child: Card(...), // 이메일 카드 UI
)
```

## 🎬 스토리 시나리오 예시

### Episode 2 - 유령 유저 발견 장면

```dart
// 1. 아침 알람
NotificationOverlay.show(
  context,
  NotificationData(
    type: NotificationType.alarm,
    title: '알람',
    message: '기상 시간',
    time: '07:00',
  ),
);

// 2초 후...

// 2. Maya의 긴급 이메일 알림
NotificationOverlay.show(
  context,
  NotificationData(
    type: NotificationType.email,
    title: '새 메일',
    message: 'Maya Kim: [긴급] 랭킹 조작 의심',
    time: '09:30',
  ),
);

// 3. 이메일 클릭 시 전체화면으로
EmailFullScreen.show(
  context,
  EmailData(
    from: 'Maya Kim',
    subject: '[긴급] 랭킹 조작 의심 사례 발견',
    body: '...',
    time: '2024년 1월 15일 오전 9:30',
  ),
);

// 4. 충격적인 데이터 발견 시 플래시
ScreenEffects.flash(context);
ScreenEffects.vibrate(VibrationPattern.heavy);
```

### Episode 3 - 완벽한 승리의 비밀 장면

```dart
// 1. 분석 시작 - 페이드인
ScreenEffects.fade(context, color: Colors.black);

// 2. 시스템 알림
NotificationOverlay.show(
  context,
  NotificationData(
    type: NotificationType.system,
    title: '데이터 분석 완료',
    message: '승률 패턴 이상 징후 감지',
    time: '방금',
  ),
);

// 3. 진실 발견 - 강한 플래시와 진동
ScreenEffects.flash(context);
ScreenEffects.vibrate(VibrationPattern.heavy);
```

## 🔧 스토리 JSON에 효과 추가하기

스토리 JSON에 효과를 추가하려면 각 노드에 `effects` 필드를 추가합니다:

```json
{
  "id": "node_1",
  "speaker": "narrator",
  "text": "그날 아침, 평소보다 일찍 일어난 Kastor의 휴대폰에 알림이 울렸다.",
  "effects": [
    {
      "type": "notification",
      "notificationType": "alarm",
      "title": "알람",
      "message": "기상 시간",
      "time": "07:00",
      "delay": 0
    },
    {
      "type": "notification",
      "notificationType": "email",
      "title": "새 메일",
      "message": "Maya Kim: [긴급] 랭킹 조작 의심",
      "time": "09:30",
      "delay": 2000
    }
  ]
}
```

## 📱 타이핑 효과 (Typing Text)

기존에 구현된 타이핑 효과 사용:

```dart
import '../../widgets/typing_text.dart';

// 타이핑 효과가 있는 텍스트
TypingText(
  text: message.text,
  style: TextStyle(fontSize: 16),
  duration: Duration(milliseconds: 30), // 글자당 30ms
  onComplete: () {
    // 타이핑 완료 후 실행할 코드
    print('타이핑 완료!');
  },
)

// 타이핑 인디케이터 (점 3개)
TypingIndicator(
  color: Colors.grey,
)
```

## 🎯 권장 사용 시나리오

1. **알림 오버레이**
   - 이메일 도착: 새로운 정보나 단서 제공
   - 전화: 긴급한 상황이나 대화 요청
   - 알람: 시간 경과나 일정 알림
   - 메시지: 캐릭터 간 짧은 메시지
   - 시스템: 분석 결과나 시스템 상태

2. **플래시 효과**
   - 충격적인 진실 발견
   - 반전 장면
   - 중요한 깨달음의 순간

3. **페이드 효과**
   - 장면 전환
   - 시간 경과 표현
   - 회상 또는 플래시백

4. **진동 효과**
   - Light: 버튼 클릭, 선택
   - Medium: 일반 알림, 메시지
   - Heavy: 충격적인 순간, 중요한 알림
   - Selection: 리스트 스크롤, 선택지

5. **전체화면 이메일**
   - 긴 이메일 내용
   - 중요한 증거 문서
   - 상세한 분석 결과

## ⚠️ 주의사항

1. **효과 남용 금지**: 너무 자주 사용하면 오히려 몰입감이 떨어집니다
2. **맥락에 맞게**: 상황에 맞는 효과를 선택하세요
3. **성능 고려**: 한 번에 너무 많은 효과를 동시에 실행하지 마세요
4. **접근성**: 진동이나 플래시는 일부 사용자에게 불편할 수 있으니 설정에서 끌 수 있게 고려하세요

## 🚀 다음 단계

1. 각 에피소드의 핵심 장면에 효과 추가
2. 사용자 테스트를 통해 효과의 강도와 타이밍 조정
3. 설정 화면에서 효과 on/off 옵션 추가
4. 추가 효과 (셰이크, 줌 등) 구현 고려
