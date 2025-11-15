import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../story/story_chat_screen_v2.dart';
import '../../widgets/win_rate_chart.dart';
import '../../providers/settings_provider.dart';

/// Demo screen to showcase Episode 1 with all new features:
/// - Language switching (Korean/English)
/// - Character avatars
/// - Chat UI
/// - Data visualization
class Episode1DemoScreen extends ConsumerStatefulWidget {
  const Episode1DemoScreen({super.key});

  @override
  ConsumerState<Episode1DemoScreen> createState() => _Episode1DemoScreenState();
}

class _Episode1DemoScreenState extends ConsumerState<Episode1DemoScreen> {
  bool _isLoadingChart = true;
  bool _isNavigating = false;

  @override
  void initState() {
    super.initState();
    // Simulate chart loading
    Future.delayed(const Duration(milliseconds: 800), () {
      if (mounted) {
        setState(() {
          _isLoadingChart = false;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final settings = ref.watch(settingsProvider);

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          settings.language == 'ko'
              ? '캐스터 데이터 아카데미'
              : 'Kastor Data Academy',
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.info_outline),
            onPressed: () {
              _showInfoDialog(context, settings.language);
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Simplified Mission Card
            Card(
              color: const Color(0xFF6366F1).withOpacity(0.2),
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: const Color(0xFFFBBF24).withOpacity(0.2),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Icon(
                            Icons.assignment,
                            color: Color(0xFFFBBF24),
                            size: 32,
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                settings.language == 'ko'
                                    ? '새로운 의뢰'
                                    : 'New Mission',
                                style: const TextStyle(
                                  fontSize: 14,
                                  color: Color(0xFFFBBF24),
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                settings.language == 'ko'
                                    ? '사라진 밸런스 패치'
                                    : 'The Missing Balance Patch',
                                style: const TextStyle(
                                  fontSize: 22,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    Row(
                      children: [
                        _buildInfoChip(
                          Icons.timer_outlined,
                          settings.language == 'ko' ? '40분' : '40 min',
                        ),
                        const SizedBox(width: 12),
                        _buildInfoChip(
                          Icons.stars,
                          '⭐⭐⭐',
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Text(
                      settings.language == 'ko'
                          ? '🕵️ Shadow의 승률이 급등했습니다!\n데이터 탐정 Kastor와 함께 진실을 밝혀보세요.'
                          : '🕵️ Shadow\'s win rate skyrocketed!\nUncover the truth with data detective Kastor.',
                      style: TextStyle(
                        fontSize: 15,
                        height: 1.6,
                        color: Colors.white.withOpacity(0.9),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Data visualization preview
            Text(
              settings.language == 'ko'
                  ? '📊 데이터 미리보기'
                  : '📊 Data Preview',
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 12),

            // Chart loading indicator
            if (_isLoadingChart)
              Container(
                height: 200,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const CircularProgressIndicator(),
                      const SizedBox(height: 16),
                      Text(
                        settings.language == 'ko'
                            ? '차트를 불러오는 중...'
                            : 'Loading chart...',
                        style: const TextStyle(color: Colors.white70),
                      ),
                    ],
                  ),
                ),
              )
            else ...[
              // Responsive chart container
              LayoutBuilder(
                builder: (context, constraints) {
                  return ShadowWinRateChart(
                    language: settings.language,
                    width: constraints.maxWidth,
                  );
                },
              ),
              const SizedBox(height: 16),
              LayoutBuilder(
                builder: (context, constraints) {
                  return CharacterComparisonChart(
                    title: settings.language == 'ko'
                        ? '캐릭터별 승률 비교'
                        : 'Character Win Rate Comparison',
                    characters: [
                      CharacterWinRate(
                        name: 'Shadow',
                        winRate: 85.0,
                        color: const Color(0xFFEF4444), // Red - suspicious
                      ),
                      CharacterWinRate(
                        name: 'Luna',
                        winRate: 52.0,
                        color: const Color(0xFF3B82F6), // Blue
                      ),
                      CharacterWinRate(
                        name: 'Striker',
                        winRate: 49.5,
                        color: const Color(0xFF10B981), // Green
                      ),
                      CharacterWinRate(
                        name: 'Mage',
                        winRate: 51.2,
                        color: const Color(0xFF8B5CF6), // Purple
                      ),
                    ],
                    width: constraints.maxWidth,
                  );
                },
              ),
            ],

            const SizedBox(height: 32),

            // Start button with loading state
            ElevatedButton(
              onPressed: _isNavigating || _isLoadingChart
                  ? null
                  : () {
                      setState(() {
                        _isNavigating = true;
                      });
                      Navigator.of(context)
                          .push(
                        MaterialPageRoute(
                          builder: (context) => const StoryChatScreenV2(),
                        ),
                      )
                          .then((_) {
                        if (mounted) {
                          setState(() {
                            _isNavigating = false;
                          });
                        }
                      });
                    },
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 20),
                backgroundColor: _isNavigating || _isLoadingChart
                    ? const Color(0xFF6366F1).withOpacity(0.5)
                    : const Color(0xFF6366F1),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: _isNavigating
                  ? const SizedBox(
                      height: 28,
                      width: 28,
                      child: CircularProgressIndicator(
                        strokeWidth: 3,
                        color: Colors.white,
                      ),
                    )
                  : Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.play_arrow, size: 28),
                        const SizedBox(width: 12),
                        Text(
                          settings.language == 'ko'
                              ? '에피소드 시작하기'
                              : 'Start Episode',
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
            ),

            const SizedBox(height: 16),

            // Language switch button
            OutlinedButton(
              onPressed: _isNavigating
                  ? null
                  : () async {
                      final newLang = settings.language == 'ko' ? 'en' : 'ko';
                      // Show loading indicator during language change
                      setState(() {
                        _isLoadingChart = true;
                      });
                      ref.read(settingsProvider.notifier).setLanguage(newLang);
                      // Simulate chart reload
                      await Future.delayed(const Duration(milliseconds: 500));
                      if (mounted) {
                        setState(() {
                          _isLoadingChart = false;
                        });
                      }
                    },
              style: OutlinedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                side: BorderSide(
                  color: _isNavigating
                      ? const Color(0xFF6366F1).withOpacity(0.5)
                      : const Color(0xFF6366F1),
                  width: 2,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.language),
                  const SizedBox(width: 12),
                  Text(
                    settings.language == 'ko'
                        ? 'Switch to English 🇺🇸'
                        : '한국어로 전환 🇰🇷',
                    style: const TextStyle(fontSize: 16),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),

            // Features list
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      settings.language == 'ko'
                          ? '✨ 새로운 기능'
                          : '✨ New Features',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    _buildFeatureItem(
                      icon: Icons.translate,
                      title: settings.language == 'ko'
                          ? '언어 전환'
                          : 'Language Switching',
                      description: settings.language == 'ko'
                          ? '한국어와 영어 사이에서 자유롭게 전환'
                          : 'Switch freely between Korean and English',
                    ),
                    const Divider(height: 24),
                    _buildFeatureItem(
                      icon: Icons.person,
                      title: settings.language == 'ko'
                          ? '캐릭터 아바타'
                          : 'Character Avatars',
                      description: settings.language == 'ko'
                          ? '캐스터, 탐정, 마야의 귀여운 아바타'
                          : 'Cute avatars for Kastor, Detective, and Maya',
                    ),
                    const Divider(height: 24),
                    _buildFeatureItem(
                      icon: Icons.chat,
                      title: settings.language == 'ko'
                          ? '채팅 UI'
                          : 'Chat UI',
                      description: settings.language == 'ko'
                          ? '메신저처럼 편한 대화 인터페이스'
                          : 'Comfortable conversation interface like a messenger',
                    ),
                    const Divider(height: 24),
                    _buildFeatureItem(
                      icon: Icons.insert_chart,
                      title: settings.language == 'ko'
                          ? '데이터 시각화'
                          : 'Data Visualization',
                      description: settings.language == 'ko'
                          ? '승률 추이와 비교 차트'
                          : 'Win rate trends and comparison charts',
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildFeatureItem({
    required IconData icon,
    required String title,
    required String description,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: const Color(0xFF6366F1).withOpacity(0.2),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: const Color(0xFF6366F1)),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                description,
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.grey[400],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildInfoChip(IconData icon, String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: Colors.white.withOpacity(0.2),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 16, color: const Color(0xFF00D9FF)),
          const SizedBox(width: 6),
          Text(
            text,
            style: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  void _showInfoDialog(BuildContext context, String language) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1E1B4B),
        title: Text(
          language == 'ko' ? '정보' : 'Information',
          style: const TextStyle(color: Colors.white),
        ),
        content: Text(
          language == 'ko'
              ? '캐스터 데이터 아카데미 EP1\n\n'
                  '• 대화형 스토리\n'
                  '• 실시간 데이터 분석\n'
                  '• 한/영 언어 지원\n\n'
                  '즐거운 학습 되세요!'
              : 'Kastor Data Academy EP1\n\n'
                  '• Interactive story\n'
                  '• Real-time data analysis\n'
                  '• KR/EN language support\n\n'
                  'Enjoy learning!',
          style: const TextStyle(color: Colors.white70),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(language == 'ko' ? '확인' : 'OK'),
          ),
        ],
      ),
    );
  }
}
