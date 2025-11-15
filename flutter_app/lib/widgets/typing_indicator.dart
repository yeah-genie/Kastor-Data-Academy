import 'package:flutter/material.dart';

/// 디스코드 스타일의 "is typing..." 인디케이터
class CharacterTypingIndicator extends StatefulWidget {
  final String name;
  final String? avatarUrl;
  final Color accentColor;

  const CharacterTypingIndicator({
    super.key,
    required this.name,
    this.avatarUrl,
    this.accentColor = const Color(0xFF00D9FF),
  });

  @override
  State<CharacterTypingIndicator> createState() => _CharacterTypingIndicatorState();
}

class _CharacterTypingIndicatorState extends State<CharacterTypingIndicator>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        children: [
          // Avatar
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  widget.accentColor.withOpacity(0.6),
                  widget.accentColor,
                ],
              ),
              boxShadow: [
                BoxShadow(
                  color: widget.accentColor.withOpacity(0.3),
                  blurRadius: 8,
                  spreadRadius: 1,
                ),
              ],
            ),
            child: Center(
              child: Text(
                widget.name[0].toUpperCase(),
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          ),
          
          const SizedBox(width: 12),
          
          // Typing bubble
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: const Color(0xFF252A3E),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: widget.accentColor.withOpacity(0.3),
                width: 1,
              ),
              boxShadow: [
                BoxShadow(
                  color: widget.accentColor.withOpacity(0.1),
                  blurRadius: 8,
                ),
              ],
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  '${widget.name} is typing',
                  style: TextStyle(
                    fontSize: 13,
                    color: widget.accentColor.withOpacity(0.9),
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(width: 8),
                _AnimatedDots(
                  controller: _controller,
                  color: widget.accentColor,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _AnimatedDots extends StatelessWidget {
  final AnimationController controller;
  final Color color;

  const _AnimatedDots({
    required this.controller,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(3, (index) {
        final delay = index * 0.2;
        return AnimatedBuilder(
          animation: controller,
          builder: (context, child) {
            final value = (controller.value - delay) % 1.0;
            final opacity = value < 0.5 ? value * 2 : (1 - value) * 2;
            final scale = 0.7 + (opacity * 0.3);
            
            return Transform.scale(
              scale: scale,
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 2),
                width: 6,
                height: 6,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: color.withOpacity(0.3 + opacity * 0.7),
                  boxShadow: [
                    BoxShadow(
                      color: color.withOpacity(opacity * 0.5),
                      blurRadius: 4,
                    ),
                  ],
                ),
              ),
            );
          },
        );
      }),
    );
  }
}
