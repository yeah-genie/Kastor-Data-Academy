import 'package:flutter/material.dart';

class TypingText extends StatefulWidget {
  final String text;
  final TextStyle? style;
  final Duration? duration;
  final VoidCallback? onComplete;

  const TypingText({
    super.key,
    required this.text,
    this.style,
    this.duration,
    this.onComplete,
  });

  @override
  State<TypingText> createState() => _TypingTextState();
}

class _TypingTextState extends State<TypingText>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<int> _characterCount;

  @override
  void initState() {
    super.initState();

    // Calculate duration based on text length (faster for longer texts)
    final baseSpeed = widget.duration ?? const Duration(milliseconds: 50);
    final totalDuration = Duration(
      milliseconds: (widget.text.length * baseSpeed.inMilliseconds / 50).round(),
    );

    _controller = AnimationController(
      duration: totalDuration,
      vsync: this,
    );

    _characterCount = StepTween(
      begin: 0,
      end: widget.text.length,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOut,
    ));

    _controller.forward().then((_) {
      if (widget.onComplete != null) {
        widget.onComplete!();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _characterCount,
      builder: (context, child) {
        final String visibleText =
            widget.text.substring(0, _characterCount.value);

        return Text(
          visibleText,
          style: widget.style,
        );
      },
    );
  }
}

/// A simpler typing indicator for "someone is typing..."
class TypingIndicator extends StatefulWidget {
  final Color? color;

  const TypingIndicator({
    super.key,
    this.color,
  });

  @override
  State<TypingIndicator> createState() => _TypingIndicatorState();
}

class _TypingIndicatorState extends State<TypingIndicator>
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
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(3, (index) {
        return AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            final delay = index * 0.2;
            final value = (_controller.value - delay).clamp(0.0, 1.0);
            final opacity = (Curves.easeInOut.transform(value) * 2).clamp(0.0, 1.0);

            return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 2),
              child: Opacity(
                opacity: opacity > 1.0 ? 2.0 - opacity : opacity,
                child: Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: widget.color ?? Colors.white70,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            );
          },
        );
      }),
    );
  }
}
