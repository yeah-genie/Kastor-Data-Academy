import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

enum NotificationType {
  email,
  phone,
  alarm,
  message,
  system,
}

class NotificationData {
  final NotificationType type;
  final String title;
  final String message;
  final String? time;
  final VoidCallback? onTap;
  final VoidCallback? onDismiss;

  NotificationData({
    required this.type,
    required this.title,
    required this.message,
    this.time,
    this.onTap,
    this.onDismiss,
  });
}

class NotificationOverlay {
  static void show(BuildContext context, NotificationData notification) {
    final overlay = Overlay.of(context);
    late OverlayEntry entry;

    entry = OverlayEntry(
      builder: (context) => Positioned(
        top: MediaQuery.of(context).padding.top + 10,
        left: 10,
        right: 10,
        child: _NotificationCard(
          notification: notification,
          onDismiss: () {
            entry.remove();
            notification.onDismiss?.call();
          },
          onTap: () {
            entry.remove();
            notification.onTap?.call();
          },
        ),
      ),
    );

    overlay.insert(entry);

    // Vibration feedback
    HapticFeedback.mediumImpact();

    // Auto dismiss after 4 seconds
    Future.delayed(const Duration(seconds: 4), () {
      if (entry.mounted) {
        entry.remove();
      }
    });
  }
}

class _NotificationCard extends StatefulWidget {
  final NotificationData notification;
  final VoidCallback onDismiss;
  final VoidCallback onTap;

  const _NotificationCard({
    required this.notification,
    required this.onDismiss,
    required this.onTap,
  });

  @override
  State<_NotificationCard> createState() => _NotificationCardState();
}

class _NotificationCardState extends State<_NotificationCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
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
      curve: Curves.easeIn,
    ));

    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  IconData _getIcon() {
    switch (widget.notification.type) {
      case NotificationType.email:
        return Icons.email;
      case NotificationType.phone:
        return Icons.phone;
      case NotificationType.alarm:
        return Icons.alarm;
      case NotificationType.message:
        return Icons.message;
      case NotificationType.system:
        return Icons.info;
    }
  }

  Color _getColor() {
    switch (widget.notification.type) {
      case NotificationType.email:
        return const Color(0xFF3B82F6);
      case NotificationType.phone:
        return const Color(0xFF10B981);
      case NotificationType.alarm:
        return const Color(0xFFF59E0B);
      case NotificationType.message:
        return const Color(0xFF8B5CF6);
      case NotificationType.system:
        return const Color(0xFF6366F1);
    }
  }

  @override
  Widget build(BuildContext context) {
    return SlideTransition(
      position: _slideAnimation,
      child: FadeTransition(
        opacity: _fadeAnimation,
        child: Material(
          color: Colors.transparent,
          child: GestureDetector(
            onTap: widget.onTap,
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.15),
                    blurRadius: 20,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: _getColor().withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(
                      _getIcon(),
                      color: _getColor(),
                      size: 28,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                widget.notification.title,
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black87,
                                ),
                              ),
                            ),
                            if (widget.notification.time != null)
                              Text(
                                widget.notification.time!,
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey[600],
                                ),
                              ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          widget.notification.message,
                          style: TextStyle(
                            fontSize: 14,
                            color: Colors.grey[700],
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  IconButton(
                    icon: const Icon(Icons.close, size: 20),
                    color: Colors.grey[600],
                    onPressed: widget.onDismiss,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
