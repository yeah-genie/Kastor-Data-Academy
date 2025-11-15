import 'package:flutter/material.dart';
import 'dart:async';
import 'package:flutter/services.dart';

/// 실제 시스템 알람처럼 보이는 리얼한 노티피케이션
class RealisticNotification extends StatefulWidget {
  final String appName;
  final String title;
  final String body;
  final String? icon;
  final Color? accentColor;
  final VoidCallback? onTap;
  final VoidCallback? onDismiss;

  const RealisticNotification({
    super.key,
    required this.appName,
    required this.title,
    required this.body,
    this.icon,
    this.accentColor,
    this.onTap,
    this.onDismiss,
  });

  static OverlayEntry? _currentOverlay;

  /// 리얼한 시스템 알람 표시
  static void show(
    BuildContext context, {
    required String appName,
    required String title,
    required String body,
    String? icon,
    Color? accentColor,
    Duration duration = const Duration(seconds: 5),
    VoidCallback? onTap,
  }) {
    // 기존 알람 제거
    _currentOverlay?.remove();

    // 햅틱 피드백
    HapticFeedback.mediumImpact();

    final overlay = OverlayEntry(
      builder: (context) => Positioned(
        top: MediaQuery.of(context).padding.top + 8,
        left: 8,
        right: 8,
        child: _NotificationContainer(
          appName: appName,
          title: title,
          body: body,
          icon: icon,
          accentColor: accentColor,
          onTap: onTap,
          onDismiss: () {
            _currentOverlay?.remove();
            _currentOverlay = null;
          },
        ),
      ),
    );

    _currentOverlay = overlay;
    Overlay.of(context).insert(overlay);

    // 자동 제거
    Timer(duration, () {
      overlay.remove();
      if (_currentOverlay == overlay) {
        _currentOverlay = null;
      }
    });
  }

  @override
  State<RealisticNotification> createState() => _RealisticNotificationState();
}

class _RealisticNotificationState extends State<RealisticNotification>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, -1.5),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.elasticOut,
    ));

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: const Interval(0, 0.5),
    ));

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _dismiss() {
    _controller.reverse().then((_) {
      widget.onDismiss?.call();
    });
  }

  @override
  Widget build(BuildContext context) {
    return SlideTransition(
      position: _slideAnimation,
      child: FadeTransition(
        opacity: _fadeAnimation,
        child: Material(
          color: Colors.transparent,
          child: widget,
        ),
      ),
    );
  }
}

class _NotificationContainer extends StatefulWidget {
  final String appName;
  final String title;
  final String body;
  final String? icon;
  final Color? accentColor;
  final VoidCallback? onTap;
  final VoidCallback? onDismiss;

  const _NotificationContainer({
    required this.appName,
    required this.title,
    required this.body,
    this.icon,
    this.accentColor,
    this.onTap,
    this.onDismiss,
  });

  @override
  State<_NotificationContainer> createState() => _NotificationContainerState();
}

class _NotificationContainerState extends State<_NotificationContainer>
    with SingleTickerProviderStateMixin {
  late AnimationController _slideController;
  late Animation<Offset> _slideAnimation;
  bool _isDismissing = false;

  @override
  void initState() {
    super.initState();
    _slideController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _slideAnimation = Tween<Offset>(
      begin: Offset.zero,
      end: const Offset(0, -1),
    ).animate(CurvedAnimation(
      parent: _slideController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _slideController.dispose();
    super.dispose();
  }

  void _handleDismiss() {
    if (_isDismissing) return;
    setState(() => _isDismissing = true);
    
    _slideController.forward().then((_) {
      widget.onDismiss?.call();
    });
  }

  @override
  Widget build(BuildContext context) {
    return SlideTransition(
      position: _slideAnimation,
      child: GestureDetector(
        onTap: () {
          widget.onTap?.call();
          _handleDismiss();
        },
        onVerticalDragUpdate: (details) {
          if (details.delta.dy < -3) {
            _handleDismiss();
          }
        },
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 8),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                const Color(0xFF1E2130),
                const Color(0xFF252A3E),
              ],
            ),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: widget.accentColor?.withOpacity(0.5) ?? 
                     const Color(0xFF00D9FF).withOpacity(0.5),
              width: 1,
            ),
            boxShadow: [
              BoxShadow(
                color: widget.accentColor?.withOpacity(0.3) ?? 
                       const Color(0xFF00D9FF).withOpacity(0.3),
                blurRadius: 20,
                spreadRadius: 2,
              ),
              BoxShadow(
                color: Colors.black.withOpacity(0.5),
                blurRadius: 15,
                offset: const Offset(0, 5),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              // Header
              Row(
                children: [
                  // App Icon
                  Container(
                    width: 28,
                    height: 28,
                    decoration: BoxDecoration(
                      color: widget.accentColor?.withOpacity(0.2) ?? 
                             const Color(0xFF00D9FF).withOpacity(0.2),
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(
                        color: widget.accentColor ?? const Color(0xFF00D9FF),
                        width: 1,
                      ),
                    ),
                    child: Center(
                      child: Text(
                        widget.icon ?? '🔔',
                        style: const TextStyle(fontSize: 16),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  
                  // App Name
                  Expanded(
                    child: Text(
                      widget.appName,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: widget.accentColor ?? const Color(0xFF00D9FF),
                        letterSpacing: 0.5,
                      ),
                    ),
                  ),
                  
                  // Time
                  Text(
                    'now',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.white.withOpacity(0.5),
                    ),
                  ),
                  const SizedBox(width: 12),
                  
                  // Dismiss button
                  GestureDetector(
                    onTap: _handleDismiss,
                    child: Container(
                      padding: const EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Icon(
                        Icons.close,
                        size: 14,
                        color: Colors.white.withOpacity(0.7),
                      ),
                    ),
                  ),
                ],
              ),
              
              const SizedBox(height: 12),
              
              // Title
              Text(
                widget.title,
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  height: 1.3,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              
              const SizedBox(height: 6),
              
              // Body
              Text(
                widget.body,
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.white.withOpacity(0.8),
                  height: 1.4,
                ),
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
              ),
              
              // Accent bar at bottom
              const SizedBox(height: 12),
              Container(
                height: 2,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      widget.accentColor?.withOpacity(0.0) ?? 
                             const Color(0xFF00D9FF).withOpacity(0.0),
                      widget.accentColor ?? const Color(0xFF00D9FF),
                      widget.accentColor?.withOpacity(0.0) ?? 
                             const Color(0xFF00D9FF).withOpacity(0.0),
                    ],
                  ),
                  borderRadius: BorderRadius.circular(1),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
