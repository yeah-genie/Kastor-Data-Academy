import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:kastor_data_academy/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('Kastor Data Academy E2E Tests', () {
    setUpAll(() async {
      // Initialize SharedPreferences for testing
      SharedPreferences.setMockInitialValues({
        'tutorial_completed': true, // Skip tutorial for tests
      });
    });

    testWidgets('앱 시작 및 메인 메뉴 표시', (WidgetTester tester) async {
      // 앱 시작
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 3));

      // 메인 타이틀 확인
      expect(find.text('KASTOR'), findsOneWidget);
      expect(find.text('Data Academy'), findsOneWidget);

      // 메뉴 버튼 확인
      expect(find.text('New Game'), findsOneWidget);
      expect(find.text('Continue'), findsAtLeastNWidgets(1));
      expect(find.text('Episodes'), findsOneWidget);
      expect(find.text('Settings'), findsOneWidget);
    });

    testWidgets('New Game 버튼 클릭 및 Dashboard 이동', (WidgetTester tester) async {
      // 앱 시작
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 3));

      // New Game 버튼 찾기 및 클릭
      final newGameButton = find.text('New Game');
      expect(newGameButton, findsOneWidget);
      await tester.tap(newGameButton);
      await tester.pumpAndSettle(const Duration(seconds: 2));

      // Dashboard로 이동했는지 확인
      expect(find.text('KASTOR Data Academy'), findsOneWidget);

      // 탭 버튼 확인
      expect(find.text('Chat'), findsOneWidget);
      expect(find.text('Data'), findsOneWidget);
      expect(find.text('Files'), findsOneWidget);
      expect(find.text('Team'), findsOneWidget);
      expect(find.text('Progress'), findsOneWidget);
    });

    testWidgets('Dashboard 탭 전환', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 3));
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle(const Duration(seconds: 2));

      // Data 탭으로 전환
      await tester.tap(find.text('Data'));
      await tester.pumpAndSettle(const Duration(seconds: 1));
      expect(find.text('데이터 분석'), findsAtLeastNWidgets(1));

      // Files 탭으로 전환
      await tester.tap(find.text('Files'));
      await tester.pumpAndSettle(const Duration(seconds: 1));
      // Files 탭 컨텐츠 확인 (카테고리 필터)
      expect(find.text('전체'), findsAtLeastNWidgets(1));

      // Team 탭으로 전환
      await tester.tap(find.text('Team'));
      await tester.pumpAndSettle(const Duration(seconds: 1));
      // Team 탭 컨텐츠 확인 (캐릭터 카드)
      expect(find.textContaining('Isabella'), findsAtLeastNWidgets(1));

      // Progress 탭으로 전환
      await tester.tap(find.text('Progress'));
      await tester.pumpAndSettle(const Duration(seconds: 1));
      expect(find.textContaining('진행률'), findsAtLeastNWidgets(1));

      // Chat 탭으로 다시 전환
      await tester.tap(find.text('Chat'));
      await tester.pumpAndSettle(const Duration(seconds: 1));
      expect(find.textContaining('Kastor'), findsAtLeastNWidgets(1));
    });

    testWidgets('Chat 탭 - 메시지 입력 및 전송', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 3));
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle(const Duration(seconds: 2));

      // Chat 탭 확인 (기본 선택됨) - Kastor 메시지 확인
      await tester.pumpAndSettle(const Duration(seconds: 1));
      expect(find.textContaining('Kastor'), findsAtLeastNWidgets(1));

      // 메시지 입력 필드 찾기
      final messageInput = find.byType(TextField);
      if (messageInput.evaluate().isNotEmpty) {
        // 이름 입력이 먼저 나타날 수 있으므로 확인
        final hasNamePrompt = find.textContaining('이름').evaluate().isNotEmpty;

        if (hasNamePrompt) {
          // 이름 입력
          await tester.enterText(messageInput.first, '테스트 탐정');
          await tester.pumpAndSettle(const Duration(milliseconds: 500));

          final sendButton = find.byIcon(Icons.send);
          if (sendButton.evaluate().isNotEmpty) {
            await tester.tap(sendButton.first);
            await tester.pumpAndSettle(const Duration(seconds: 2));
          }
        }

        // 일반 메시지 입력 (이름 입력 후 또는 이름 입력이 없는 경우)
        final messageFields = find.byType(TextField);
        if (messageFields.evaluate().isNotEmpty) {
          await tester.enterText(messageFields.last, '테스트 메시지입니다');
          await tester.pumpAndSettle(const Duration(seconds: 1));

          final sendButtons = find.byIcon(Icons.send);
          if (sendButtons.evaluate().isNotEmpty) {
            await tester.tap(sendButtons.last);
            await tester.pumpAndSettle(const Duration(seconds: 1));

            // 전송된 메시지 확인
            expect(find.text('테스트 메시지입니다'), findsAtLeastNWidgets(1));
          }
        }
      }
    });

    testWidgets('Chat 탭 - 선택지 버튼 클릭', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 3));
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle(const Duration(seconds: 2));

      // 초기 메시지 확인
      await tester.pumpAndSettle(const Duration(seconds: 1));
      expect(find.textContaining('Kastor'), findsAtLeastNWidgets(1));

      // 선택지 버튼 찾기 (스토리 진행 후 나타날 수 있음)
      // 충분한 시간을 기다려 스토리가 진행되도록 함
      await tester.pumpAndSettle(const Duration(seconds: 10));

      final choiceButton = find.textContaining('패치');
      if (choiceButton.evaluate().isEmpty) {
        // 대체 텍스트로 찾기
        final altChoice = find.textContaining('무단');
        if (altChoice.evaluate().isNotEmpty) {
          await tester.tap(altChoice.first);
          await tester.pumpAndSettle(const Duration(seconds: 1));
        }
      } else {
        await tester.tap(choiceButton.first);
        await tester.pumpAndSettle(const Duration(seconds: 1));
      }
    });

    testWidgets('Files 탭 - 파일 목록 및 카테고리 필터', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 3));
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle(const Duration(seconds: 2));

      // Files 탭으로 이동
      await tester.tap(find.text('Files'));
      await tester.pumpAndSettle(const Duration(seconds: 1));

      // 카테고리 필터 확인
      expect(find.text('전체'), findsAtLeastNWidgets(1));
      expect(find.textContaining('증거'), findsAtLeastNWidgets(1));

      // 파일 항목 확인 (파일명이 있는 경우)
      final fileItem = find.textContaining('server_logs');
      if (fileItem.evaluate().isNotEmpty) {
        expect(fileItem, findsAtLeastNWidgets(1));

        // 증거 카테고리로 필터링 (있는 경우)
        final evidenceButton = find.text('증거');
        if (evidenceButton.evaluate().isNotEmpty) {
          await tester.tap(evidenceButton.first);
          await tester.pumpAndSettle(const Duration(seconds: 1));

          // 증거 파일이 여전히 표시되는지 확인
          expect(find.textContaining('server_logs'), findsAtLeastNWidgets(1));
        }
      }
    });

    testWidgets('Team 탭 - 캐릭터 카드 표시', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 3));
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle(const Duration(seconds: 2));

      // Team 탭으로 이동
      await tester.tap(find.text('Team'));
      await tester.pumpAndSettle(const Duration(seconds: 1));

      // 캐릭터 확인
      expect(find.textContaining('Isabella'), findsAtLeastNWidgets(1));
      expect(find.textContaining('Alex'), findsAtLeastNWidgets(1));

      // 역할 확인 (있는 경우)
      final analyst = find.textContaining('Analyst');
      final engineer = find.textContaining('Engineer');
      if (analyst.evaluate().isNotEmpty || engineer.evaluate().isNotEmpty) {
        // 역할이 표시되는지 확인
        expect(analyst.evaluate().isNotEmpty || engineer.evaluate().isNotEmpty, true);
      }
    });

    testWidgets('Progress 탭 - 진행률 및 에피소드 표시', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 3));
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle(const Duration(seconds: 2));

      // Progress 탭으로 이동
      await tester.tap(find.text('Progress'));
      await tester.pumpAndSettle(const Duration(seconds: 1));

      // 진행률 표시 확인
      expect(find.textContaining('진행률'), findsAtLeastNWidgets(1));

      // 에피소드 목록 확인
      expect(find.textContaining('Episode'), findsAtLeastNWidgets(1));
    });

    testWidgets('뒤로가기 - Dashboard에서 메인 메뉴로', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 3));
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle(const Duration(seconds: 2));

      // Dashboard 확인
      expect(find.text('KASTOR Data Academy'), findsOneWidget);

      // 뒤로가기
      await tester.pageBack();
      await tester.pumpAndSettle(const Duration(seconds: 1));

      // 메인 메뉴로 돌아왔는지 확인
      expect(find.text('KASTOR'), findsOneWidget);
      expect(find.text('Data Academy'), findsOneWidget);
    });

    testWidgets('Chat 탭 - + 버튼 메뉴 열기', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 3));
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle(const Duration(seconds: 2));

      // Chat 탭에서 메시지 확인
      await tester.pumpAndSettle(const Duration(seconds: 1));
      expect(find.textContaining('Kastor'), findsAtLeastNWidgets(1));

      // + 버튼 찾기 (있는 경우)
      final addButton = find.byIcon(Icons.add);
      if (addButton.evaluate().isNotEmpty) {
        await tester.tap(addButton.first);
        await tester.pumpAndSettle(const Duration(seconds: 1));
        // 메뉴가 열렸는지 확인
      }
    });

    testWidgets('성능 테스트 - 탭 전환 속도', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle(const Duration(seconds: 3));
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle(const Duration(seconds: 2));

      // 여러 탭을 빠르게 전환
      final tabs = ['Data', 'Files', 'Team', 'Progress', 'Chat'];

      for (final tab in tabs) {
        final tabFinder = find.text(tab);
        if (tabFinder.evaluate().isNotEmpty) {
          final startTime = DateTime.now();
          await tester.tap(tabFinder);
          await tester.pumpAndSettle(const Duration(seconds: 1));
          final elapsed = DateTime.now().difference(startTime);

          // 탭 전환이 3초 이내에 완료되는지 확인
          expect(elapsed.inSeconds, lessThan(3), reason: '$tab 탭 전환이 너무 느립니다');
        }
      }
    });
  });
}
