import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:flutter_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('E2E Hello Test', (WidgetTester tester) async {
    app.main();
    await tester.pumpAndSettle();

    expect(find.text('Hello, World!'), findsOneWidget);
  });
}