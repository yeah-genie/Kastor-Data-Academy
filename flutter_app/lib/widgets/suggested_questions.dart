import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/settings_provider.dart';

/// 추천 질문 위젯 - 뤼튼 AI 스타일
class SuggestedQuestions extends ConsumerWidget {
  final Function(String) onQuestionTap;

  const SuggestedQuestions({
    super.key,
    required this.onQuestionTap,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final settings = ref.watch(settingsProvider);
    final screenWidth = MediaQuery.of(context).size.width;
    final isMobile = screenWidth < 600;

    final questions = _getQuestions(settings.language);

    return Container(
      padding: EdgeInsets.all(isMobile ? 16 : 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            children: [
              const Icon(
                Icons.wb_incandescent_outlined,
                color: Color(0xFF6366F1),
                size: 20,
              ),
              const SizedBox(width: 8),
              Text(
                settings.language == 'ko' ? '이런 질문은 어떠세요?' : 'Try asking:',
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF6366F1),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),

          // Questions grid
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: questions.map((question) {
              return _SuggestedQuestionChip(
                question: question,
                onTap: () => onQuestionTap(question),
                isMobile: isMobile,
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  List<String> _getQuestions(String language) {
    if (language == 'ko') {
      return [
        '💡 Shadow의 승률이 왜 이렇게 올랐나요?',
        '📊 다른 캐릭터들의 승률은 어떤가요?',
        '🎮 밸런스 패치는 언제 진행되었나요?',
        '🔍 게임 로그에서 이상한 점을 찾아주세요',
        '👥 이 사건과 관련된 인물은 누구인가요?',
        '📈 데이터 분석 결과를 요약해주세요',
      ];
    } else {
      return [
        '💡 Why did Shadow\'s win rate spike?',
        '📊 How are other characters performing?',
        '🎮 When was the balance patch applied?',
        '🔍 Find anomalies in the game logs',
        '👥 Who are the key people involved?',
        '📈 Summarize the data analysis',
      ];
    }
  }
}

class _SuggestedQuestionChip extends StatefulWidget {
  final String question;
  final VoidCallback onTap;
  final bool isMobile;

  const _SuggestedQuestionChip({
    required this.question,
    required this.onTap,
    this.isMobile = false,
  });

  @override
  State<_SuggestedQuestionChip> createState() => _SuggestedQuestionChipState();
}

class _SuggestedQuestionChipState extends State<_SuggestedQuestionChip> {
  bool _isHovered = false;
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedScale(
        scale: _isPressed ? 0.95 : (_isHovered ? 1.02 : 1.0),
        duration: const Duration(milliseconds: 150),
        child: GestureDetector(
          onTapDown: (_) => setState(() => _isPressed = true),
          onTapUp: (_) {
            setState(() => _isPressed = false);
            if (!_isPressed) {
              widget.onTap();
            }
          },
          onTapCancel: () => setState(() => _isPressed = false),
          child: Container(
            constraints: BoxConstraints(
              maxWidth: widget.isMobile ? double.infinity : 280,
            ),
            padding: EdgeInsets.symmetric(
              horizontal: widget.isMobile ? 14 : 16,
              vertical: widget.isMobile ? 10 : 12,
            ),
            decoration: BoxDecoration(
              gradient: _isHovered
                  ? LinearGradient(
                      colors: [
                        const Color(0xFF6366F1).withOpacity(0.15),
                        const Color(0xFF8B5CF6).withOpacity(0.15),
                      ],
                    )
                  : null,
              color: _isHovered
                  ? null
                  : const Color(0xFF6366F1).withOpacity(0.08),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: _isHovered
                    ? const Color(0xFF6366F1).withOpacity(0.5)
                    : const Color(0xFF6366F1).withOpacity(0.2),
                width: _isHovered ? 1.5 : 1,
              ),
              boxShadow: _isHovered
                  ? [
                      BoxShadow(
                        color: const Color(0xFF6366F1).withOpacity(0.2),
                        blurRadius: 8,
                        spreadRadius: 1,
                      ),
                    ]
                  : null,
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Flexible(
                  child: Text(
                    widget.question,
                    style: TextStyle(
                      fontSize: widget.isMobile ? 13 : 14,
                      color: _isHovered
                          ? const Color(0xFF6366F1)
                          : Colors.white.withOpacity(0.9),
                      fontWeight: _isHovered ? FontWeight.w600 : FontWeight.w500,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                if (_isHovered) ...[
                  const SizedBox(width: 8),
                  const Icon(
                    Icons.arrow_forward,
                    size: 16,
                    color: Color(0xFF6366F1),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
