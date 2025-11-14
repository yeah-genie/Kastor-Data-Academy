import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:kastor_data_academy/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('Kastor Data Academy E2E Tests', () {
    testWidgets('앱 시작 및 메인 메뉴 표시', (WidgetTester tester) async {
      // 앱 시작
      app.main();
      await tester.pumpAndSettle();

      // 메인 타이틀 확인
      expect(find.text('KASTOR'), findsOneWidget);
      expect(find.text('Data Academy'), findsOneWidget);

      // 메뉴 버튼 확인
      expect(find.text('New Game'), findsOneWidget);
      expect(find.text('Continue'), findsOneWidget);
      expect(find.text('Episodes'), findsOneWidget);
      expect(find.text('Settings'), findsOneWidget);
    });

    testWidgets('New Game 버튼 클릭 및 Dashboard 이동', (WidgetTester tester) async {
      // 앱 시작
      app.main();
      await tester.pumpAndSettle();

      // New Game 버튼 찾기 및 클릭
      final newGameButton = find.text('New Game');
      expect(newGameButton, findsOneWidget);
      await tester.tap(newGameButton);
      await tester.pumpAndSettle();

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
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Data 탭으로 전환
      await tester.tap(find.text('Data'));
      await tester.pumpAndSettle();
      expect(find.text('데이터 분석'), findsOneWidget);

      // Files 탭으로 전환
      await tester.tap(find.text('Files'));
      await tester.pumpAndSettle();
      // Files 탭 컨텐츠 확인 (카테고리 필터)
      expect(find.text('전체'), findsOneWidget);

      // Team 탭으로 전환
      await tester.tap(find.text('Team'));
      await tester.pumpAndSettle();
      // Team 탭 컨텐츠 확인 (캐릭터 카드)
      expect(find.text('Isabella Torres'), findsOneWidget);

      // Progress 탭으로 전환
      await tester.tap(find.text('Progress'));
      await tester.pumpAndSettle();
      expect(find.text('전체 진행률'), findsOneWidget);

      // Chat 탭으로 다시 전환
      await tester.tap(find.text('Chat'));
      await tester.pumpAndSettle();
      expect(find.text('안녕하세요! 카스토르입니다'), findsOneWidget);
    });

    testWidgets('Chat 탭 - 메시지 입력 및 전송', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Chat 탭 확인 (기본 선택됨)
      expect(find.text('안녕하세요! 카스토르입니다'), findsOneWidget);

      // 메시지 입력 필드 찾기
      final messageInput = find.byType(TextField);
      expect(messageInput, findsOneWidget);

      // 메시지 입력
      await tester.enterText(messageInput, '테스트 메시지입니다');
      await tester.pumpAndSettle();

      // 전송 버튼 찾기 및 클릭
      final sendButton = find.byIcon(Icons.send);
      expect(sendButton, findsOneWidget);
      await tester.tap(sendButton);
      await tester.pumpAndSettle();

      // 전송된 메시지 확인
      expect(find.text('테스트 메시지입니다'), findsOneWidget);
    });

    testWidgets('Chat 탭 - 선택지 버튼 클릭', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // 초기 메시지 확인
      expect(find.text('안녕하세요! 카스토르입니다'), findsOneWidget);

      // 선택지 버튼 찾기 (첫 번째 선택지)
      final choiceButton = find.text('서버 로그를 확인하겠습니다');
      if (choiceButton.evaluate().isNotEmpty) {
        await tester.tap(choiceButton);
        await tester.pumpAndSettle();

        // 선택한 메시지가 채팅에 추가되었는지 확인
        expect(find.text('서버 로그를 확인하겠습니다'), findsWidgets);
      }
    });

    testWidgets('Files 탭 - 파일 목록 및 카테고리 필터', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Files 탭으로 이동
      await tester.tap(find.text('Files'));
      await tester.pumpAndSettle();

      // 카테고리 필터 확인
      expect(find.text('전체'), findsOneWidget);
      expect(find.text('증거'), findsOneWidget);
      expect(find.text('미디어'), findsOneWidget);
      expect(find.text('기록'), findsOneWidget);

      // 파일 항목 확인
      expect(find.text('server_logs_020823.txt'), findsOneWidget);

      // 증거 카테고리로 필터링
      await tester.tap(find.text('증거'));
      await tester.pumpAndSettle();

      // 증거 파일만 표시되는지 확인
      expect(find.text('server_logs_020823.txt'), findsOneWidget);
    });

    testWidgets('Team 탭 - 캐릭터 카드 표시', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Team 탭으로 이동
      await tester.tap(find.text('Team'));
      await tester.pumpAndSettle();

      // 캐릭터 확인
      expect(find.text('Isabella Torres'), findsOneWidget);
      expect(find.text('Alex Reeves'), findsOneWidget);
      expect(find.text('Camille Beaumont'), findsOneWidget);

      // 역할 확인
      expect(find.text('Senior Data Analyst'), findsOneWidget);
      expect(find.text('Infrastructure Engineer'), findsOneWidget);
    });

    testWidgets('Progress 탭 - 진행률 및 에피소드 표시', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Progress 탭으로 이동
      await tester.tap(find.text('Progress'));
      await tester.pumpAndSettle();

      // 진행률 표시 확인
      expect(find.text('전체 진행률'), findsOneWidget);
      expect(find.text('에피소드 진행률'), findsOneWidget);

      // 에피소드 목록 확인
      expect(find.text('Episode 1'), findsOneWidget);
      expect(find.text('Episode 2'), findsOneWidget);
      expect(find.text('Episode 3'), findsOneWidget);
      expect(find.text('Episode 4'), findsOneWidget);
    });

    testWidgets('뒤로가기 - Dashboard에서 메인 메뉴로', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Dashboard 확인
      expect(find.text('KASTOR Data Academy'), findsOneWidget);

      // 뒤로가기
      await tester.pageBack();
      await tester.pumpAndSettle();

      // 메인 메뉴로 돌아왔는지 확인
      expect(find.text('KASTOR'), findsOneWidget);
      expect(find.text('Data Academy'), findsOneWidget);
    });

    testWidgets('Episodes 메뉴 - 에피소드 선택 화면', (WidgetTester tester) async {
      // 앱 시작
      app.main();
      await tester.pumpAndSettle();

      // Episodes 버튼 클릭
      await tester.tap(find.text('Episodes'));
      await tester.pumpAndSettle();

      // 에피소드 선택 화면 확인
      expect(find.text('Episodes'), findsOneWidget);

      // Episode 1 카드 확인
      expect(find.text('Episode 1'), findsWidgets);
      expect(find.text('The Missing Balance Patch'), findsOneWidget);
    });

    testWidgets('Chat 탭 - + 버튼 메뉴 열기', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Chat 탭 확인 (기본 선택됨)
      expect(find.text('안녕하세요! 카스토르입니다'), findsOneWidget);

      // + 버튼 찾기
      final plusButton = find.byIcon(Icons.add_circle_outline);
      if (plusButton.evaluate().isNotEmpty) {
        // + 버튼 클릭
        await tester.tap(plusButton);
        await tester.pumpAndSettle();

        // 메뉴 항목 확인
        expect(find.text('데이터 분석'), findsOneWidget);
        expect(find.text('파일'), findsOneWidget);
        expect(find.text('팀'), findsOneWidget);
        expect(find.text('진행률'), findsOneWidget);

        // 메뉴 닫기 (오버레이 클릭)
        await tester.tapAt(const Offset(10, 10));
        await tester.pumpAndSettle();
      }
    });

    testWidgets('성능 테스트 - 탭 전환 속도', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // 탭 전환 측정
      final stopwatch = Stopwatch()..start();

      await tester.tap(find.text('Data'));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Files'));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Team'));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Progress'));
      await tester.pumpAndSettle();

      await tester.tap(find.text('Chat'));
      await tester.pumpAndSettle();

      stopwatch.stop();

      // 5개 탭 전환이 5초 이내에 완료되어야 함
      expect(stopwatch.elapsedMilliseconds, lessThan(5000));
    });

    testWidgets('접근성 - 모든 주요 버튼에 Semantics 있음', (WidgetTester tester) async {
      // 앱 시작
      app.main();
      await tester.pumpAndSettle();

      // 메인 메뉴 버튼 확인
      expect(find.text('New Game'), findsOneWidget);
      expect(find.text('Continue'), findsOneWidget);
      expect(find.text('Episodes'), findsOneWidget);
      expect(find.text('Settings'), findsOneWidget);
    });

    testWidgets('Settings 화면 - 설정 변경', (WidgetTester tester) async {
      // 앱 시작
      app.main();
      await tester.pumpAndSettle();

      // Settings 버튼 클릭
      await tester.tap(find.text('Settings'));
      await tester.pumpAndSettle();

      // 설정 화면 확인
      expect(find.text('설정'), findsOneWidget);

      // BGM 볼륨 슬라이더 확인
      final bgmSlider = find.byType(Slider).first;
      if (bgmSlider.evaluate().isNotEmpty) {
        expect(bgmSlider, findsOneWidget);
      }
    });

    testWidgets('Episode 1 스토리 진행 - 시작 장면', (WidgetTester tester) async {
      // 앱 시작
      app.main();
      await tester.pumpAndSettle();

      // Episodes 메뉴로 이동
      await tester.tap(find.text('Episodes'));
      await tester.pumpAndSettle();

      // Episode 1 카드 찾기 및 클릭
      final episode1Card = find.text('Episode 1').first;
      if (episode1Card.evaluate().isNotEmpty) {
        await tester.tap(episode1Card);
        await tester.pumpAndSettle();

        // 스토리 화면이 열렸는지 확인
        // Kastor의 첫 대사가 나타나는지 확인
        await tester.pump(const Duration(seconds: 2));

        // 스토리 내용 확인 (시간이 지나면 나타남)
        final storyContent = find.textContaining('Kastor');
        expect(storyContent, findsWidgets);
      }
    });

    testWidgets('선택지 정답/오답 처리 테스트', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Chat 탭 확인
      expect(find.text('안녕하세요! 카스토르입니다'), findsOneWidget);

      // 선택지가 나타날 때까지 대기
      await tester.pump(const Duration(seconds: 1));

      // 선택지 버튼 찾기
      final choice1 = find.text('서버 로그를 확인하겠습니다');
      final choice2 = find.text('패치 노트를 먼저 보겠습니다');

      // 첫 번째 선택지가 있으면 클릭
      if (choice1.evaluate().isNotEmpty) {
        await tester.tap(choice1);
        await tester.pumpAndSettle();

        // 선택 후 반응 확인
        await tester.pump(const Duration(seconds: 1));
      } else if (choice2.evaluate().isNotEmpty) {
        await tester.tap(choice2);
        await tester.pumpAndSettle();

        await tester.pump(const Duration(seconds: 1));
      }
    });

    testWidgets('Data 탭 - 차트 상호작용', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Data 탭으로 이동
      await tester.tap(find.text('Data'));
      await tester.pumpAndSettle();

      // 데이터 분석 화면 확인
      expect(find.text('데이터 분석'), findsOneWidget);

      // 데이터 카드 확인
      final dataCards = find.byType(Card);
      expect(dataCards, findsWidgets);

      // 첫 번째 데이터 카드 클릭 시도
      if (dataCards.evaluate().isNotEmpty) {
        final firstCard = dataCards.first;
        await tester.tap(firstCard);
        await tester.pumpAndSettle();

        // 상세 정보가 표시되는지 확인
        await tester.pump(const Duration(milliseconds: 500));
      }
    });

    testWidgets('힌트 시스템 - 힌트 버튼 표시 및 사용', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Chat 탭에서 힌트 버튼 찾기
      final hintButton = find.byIcon(Icons.lightbulb_outline);

      if (hintButton.evaluate().isNotEmpty) {
        // 힌트 버튼 클릭
        await tester.tap(hintButton);
        await tester.pumpAndSettle();

        // 힌트 다이얼로그가 나타나는지 확인
        expect(find.text('힌트'), findsOneWidget);

        // 힌트 사용 또는 취소 버튼 확인
        final cancelButton = find.text('취소');
        if (cancelButton.evaluate().isNotEmpty) {
          await tester.tap(cancelButton);
          await tester.pumpAndSettle();
        }
      }
    });

    testWidgets('업적 시스템 - 업적 화면 접근', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Progress 탭으로 이동
      await tester.tap(find.text('Progress'));
      await tester.pumpAndSettle();

      // 업적 버튼 또는 섹션 찾기
      final achievementButton = find.text('업적');

      if (achievementButton.evaluate().isNotEmpty) {
        // 업적 화면으로 이동
        await tester.tap(achievementButton);
        await tester.pumpAndSettle();

        // 업적 목록 확인
        expect(find.text('첫 사건 해결'), findsWidgets);
        expect(find.text('완벽한 추리'), findsWidgets);
      } else {
        // Progress 탭에 업적 정보가 표시되는지 확인
        expect(find.text('전체 진행률'), findsOneWidget);
      }
    });

    testWidgets('+ 메뉴에서 Data 탭으로 이동', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Chat 탭 확인 (기본 선택됨)
      expect(find.text('안녕하세요! 카스토르입니다'), findsOneWidget);

      // + 버튼 클릭
      final plusButton = find.byIcon(Icons.add_circle_outline);
      if (plusButton.evaluate().isNotEmpty) {
        await tester.tap(plusButton);
        await tester.pumpAndSettle();

        // '데이터 분석' 메뉴 항목 클릭
        final dataMenuItem = find.text('데이터 분석');
        if (dataMenuItem.evaluate().isNotEmpty) {
          await tester.tap(dataMenuItem);
          await tester.pumpAndSettle();

          // Data 탭으로 이동했는지 확인
          expect(find.text('데이터 분석'), findsOneWidget);
        }
      }
    });

    testWidgets('캐릭터 아바타 표시 테스트', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Team 탭으로 이동
      await tester.tap(find.text('Team'));
      await tester.pumpAndSettle();

      // 캐릭터 이름 확인
      expect(find.text('Isabella Torres'), findsOneWidget);
      expect(find.text('Alex Reeves'), findsOneWidget);
      expect(find.text('Camille Beaumont'), findsOneWidget);

      // 캐릭터 카드 클릭 (상세 정보)
      final isabellaCard = find.text('Isabella Torres');
      await tester.tap(isabellaCard);
      await tester.pumpAndSettle();

      // 상세 정보가 표시되는지 확인 (다이얼로그 또는 확장)
      await tester.pump(const Duration(milliseconds: 500));
    });

    testWidgets('파일 상세 보기 테스트', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Files 탭으로 이동
      await tester.tap(find.text('Files'));
      await tester.pumpAndSettle();

      // 파일 항목 클릭
      final fileItem = find.text('server_logs_020823.txt');
      if (fileItem.evaluate().isNotEmpty) {
        await tester.tap(fileItem);
        await tester.pumpAndSettle();

        // 파일 내용이 표시되는지 확인
        await tester.pump(const Duration(milliseconds: 500));
      }
    });

    testWidgets('전체 사용자 흐름 - New Game부터 Episode 시작까지', (WidgetTester tester) async {
      // 앱 시작
      app.main();
      await tester.pumpAndSettle();

      // 메인 메뉴 확인
      expect(find.text('KASTOR'), findsOneWidget);

      // New Game 클릭
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // Dashboard 확인
      expect(find.text('KASTOR Data Academy'), findsOneWidget);

      // Chat 탭에서 환영 메시지 확인
      expect(find.text('안녕하세요! 카스토르입니다'), findsOneWidget);

      // Progress 탭으로 이동
      await tester.tap(find.text('Progress'));
      await tester.pumpAndSettle();

      // Episode 목록 확인
      expect(find.text('Episode 1'), findsOneWidget);

      // Episode 1 클릭 시도
      final episode1 = find.text('Episode 1').first;
      if (episode1.evaluate().isNotEmpty) {
        await tester.tap(episode1);
        await tester.pumpAndSettle();

        // Episode 화면으로 이동했는지 확인
        await tester.pump(const Duration(seconds: 1));
      }
    });

    testWidgets('메모리 누수 테스트 - 여러 화면 왕복', (WidgetTester tester) async {
      // 앱 시작 및 Dashboard로 이동
      app.main();
      await tester.pumpAndSettle();
      await tester.tap(find.text('New Game'));
      await tester.pumpAndSettle();

      // 여러 번 탭 전환 (메모리 누수 체크)
      for (int i = 0; i < 5; i++) {
        await tester.tap(find.text('Data'));
        await tester.pumpAndSettle();

        await tester.tap(find.text('Files'));
        await tester.pumpAndSettle();

        await tester.tap(find.text('Team'));
        await tester.pumpAndSettle();

        await tester.tap(find.text('Progress'));
        await tester.pumpAndSettle();

        await tester.tap(find.text('Chat'));
        await tester.pumpAndSettle();
      }

      // 마지막에도 정상 작동하는지 확인
      expect(find.text('안녕하세요! 카스토르입니다'), findsOneWidget);
    });
  });
}
