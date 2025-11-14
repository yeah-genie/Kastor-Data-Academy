# Integration Tests (E2E)

## 📋 테스트 시나리오

### 1. 기본 네비게이션
- ✅ 앱 시작 및 메인 메뉴 표시
- ✅ New Game 버튼 클릭 및 Dashboard 이동
- ✅ Dashboard 탭 전환 (Chat, Data, Files, Team, Progress)
- ✅ 뒤로가기 기능

### 2. Chat 탭
- ✅ 메시지 입력 및 전송
- ✅ 선택지 버튼 클릭
- ✅ + 버튼 메뉴 열기/닫기
- ✅ 메뉴 항목 (데이터 분석, 파일, 팀, 진행률)

### 3. Data 탭
- ✅ 데이터 분석 화면 표시

### 4. Files 탭
- ✅ 파일 목록 표시
- ✅ 카테고리 필터 (전체, 증거, 미디어, 기록)
- ✅ 파일 항목 확인

### 5. Team 탭
- ✅ 캐릭터 카드 표시
- ✅ 캐릭터 정보 (이름, 역할)

### 6. Progress 탭
- ✅ 진행률 표시
- ✅ 에피소드 목록

### 7. Episodes 화면
- ✅ Episodes 메뉴 접근
- ✅ Episode 1 카드 확인
- ✅ The Missing Balance Patch 제목

### 8. Settings 화면
- ✅ Settings 메뉴 접근
- ✅ BGM 볼륨 슬라이더

### 9. 성능 테스트
- ✅ 탭 전환 속도 (5초 이내)

### 10. 접근성
- ✅ 주요 버튼 Semantics

---

## 🚀 로컬에서 실행

### 웹 테스트 (Chrome)

```bash
# ChromeDriver 설치 (macOS)
brew install chromedriver

# ChromeDriver 설치 (Linux)
sudo apt-get install chromium-chromedriver

# ChromeDriver 시작
chromedriver --port=4444 &

# 테스트 실행
cd flutter_app
flutter drive \
  --driver=test_driver/integration_test.dart \
  --target=integration_test/app_test.dart \
  -d chrome

# ChromeDriver 종료
killall chromedriver
```

### 모바일 테스트 (Android/iOS)

```bash
# Android 에뮬레이터 시작
flutter emulators --launch <emulator_id>

# 테스트 실행
cd flutter_app
flutter test integration_test/app_test.dart
```

---

## 🤖 GitHub Actions에서 실행

### 자동 실행
다음 상황에서 자동으로 E2E 테스트가 실행됩니다:
- `main` 브랜치에 푸시
- `claude/**` 브랜치에 푸시
- Pull Request 생성
- 수동 실행 (workflow_dispatch)

### 워크플로우
- `.github/workflows/web-e2e-test.yml`

### 결과 확인
1. GitHub Actions 탭으로 이동
2. "Web E2E Tests" 워크플로우 선택
3. 최근 실행 항목 클릭
4. "test-results" Artifact 다운로드

---

## 📊 테스트 리포트

테스트가 완료되면 다음 Artifacts가 생성됩니다:
- `test-results`: 테스트 실행 결과
- `test-report`: Markdown 형식 리포트

PR에 자동으로 테스트 결과가 댓글로 달립니다.

---

## ✍️ 새로운 테스트 추가

### 테스트 작성 예시

```dart
testWidgets('새로운 기능 테스트', (WidgetTester tester) async {
  // 앱 시작
  app.main();
  await tester.pumpAndSettle();

  // 버튼 찾기 및 클릭
  final button = find.text('버튼 텍스트');
  expect(button, findsOneWidget);
  await tester.tap(button);
  await tester.pumpAndSettle();

  // 결과 확인
  expect(find.text('예상 결과'), findsOneWidget);
});
```

### 주의사항
- `pumpAndSettle()`: 모든 애니메이션이 완료될 때까지 대기
- `pump()`: 한 프레임만 진행
- `findsOneWidget`: 정확히 1개 위젯
- `findsWidgets`: 1개 이상 위젯
- `findsNothing`: 0개 위젯

---

## 🐛 디버깅

### 테스트 실패 시
1. 스크린샷 확인 (Artifacts)
2. 로그 확인 (GitHub Actions)
3. 로컬에서 재현
4. `tester.pumpAndSettle()`로 충분히 대기

### 타임아웃 발생 시
```dart
await tester.pumpAndSettle(const Duration(seconds: 10));
```

### 특정 위젯 못 찾을 때
```dart
// 위젯 트리 출력
debugDumpApp();

// Finder 정보 출력
print(find.text('찾을 텍스트').evaluate());
```

---

## 📚 참고 자료
- [Flutter Integration Testing](https://docs.flutter.dev/testing/integration-tests)
- [Widget Testing](https://docs.flutter.dev/cookbook/testing/widget/introduction)
- [WidgetTester API](https://api.flutter.dev/flutter/flutter_test/WidgetTester-class.html)
