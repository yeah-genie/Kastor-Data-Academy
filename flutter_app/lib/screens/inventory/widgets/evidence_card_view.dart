import 'package:flutter/material.dart';
import '../../../models/evidence.dart';
import 'evidence_detail_modal.dart';

class EvidenceCardView extends StatelessWidget {
  final List<Evidence> evidences;
  final Function(Evidence) onEvidenceTap;

  const EvidenceCardView({
    super.key,
    required this.evidences,
    required this.onEvidenceTap,
  });

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      padding: const EdgeInsets.all(16),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 0.85,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
      ),
      itemCount: evidences.length,
      itemBuilder: (context, index) {
        final evidence = evidences[index];
        return _EvidenceCard(
          evidence: evidence,
          onTap: () => onEvidenceTap(evidence),
        );
      },
    );
  }
}

class _EvidenceCard extends StatefulWidget {
  final Evidence evidence;
  final VoidCallback onTap;

  const _EvidenceCard({
    required this.evidence,
    required this.onTap,
  });

  @override
  State<_EvidenceCard> createState() => _EvidenceCardState();
}

class _EvidenceCardState extends State<_EvidenceCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final importance = widget.evidence.importance;
    final importanceLevel = importance == 'critical' ? 3 : importance == 'high' ? 2 : 1;

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          decoration: BoxDecoration(
            color: const Color(0xFF252A3E),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: _isHovered
                  ? const Color(0xFF00D9FF)
                  : const Color(0xFF00D9FF).withOpacity(0.3),
              width: _isHovered ? 2 : 1,
            ),
            boxShadow: _isHovered
                ? [
                    BoxShadow(
                      color: const Color(0xFF00D9FF).withOpacity(0.3),
                      blurRadius: 12,
                      spreadRadius: 2,
                    ),
                  ]
                : [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.3),
                      blurRadius: 8,
                      offset: const Offset(0, 4),
                    ),
                  ],
          ),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header
                Row(
                  children: [
                    // Type icon
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: const Color(0xFF00D9FF).withOpacity(0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        _getTypeIcon(widget.evidence.type),
                        style: const TextStyle(fontSize: 20),
                      ),
                    ),
                    const Spacer(),
                    // Importance stars
                    Row(
                      children: List.generate(
                        3,
                        (index) => Icon(
                          index < importanceLevel ? Icons.star : Icons.star_border,
                          size: 14,
                          color: const Color(0xFFFBBF24),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Title
                Text(
                  widget.evidence.title,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 6),

                // Description
                Expanded(
                  child: Text(
                    widget.evidence.description,
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.white.withOpacity(0.7),
                      height: 1.4,
                    ),
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),

                // Footer
                Row(
                  children: [
                    // Related count
                    if (widget.evidence.relatedEvidence != null &&
                        widget.evidence.relatedEvidence!.isNotEmpty)
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFF00D9FF).withOpacity(0.2),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(
                              Icons.link,
                              size: 12,
                              color: Color(0xFF00D9FF),
                            ),
                            const SizedBox(width: 4),
                            Text(
                              widget.evidence.relatedEvidence!.length.toString(),
                              style: const TextStyle(
                                fontSize: 11,
                                color: Color(0xFF00D9FF),
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    const Spacer(),
                    // New badge
                    if (!widget.evidence.isUnlocked)
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 6,
                          vertical: 3,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFFFF006E),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: const Text(
                          'NEW',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  String _getTypeIcon(String type) {
    switch (type.toLowerCase()) {
      case 'graph':
      case 'data':
        return '📊';
      case 'log':
        return '📝';
      case 'profile':
        return '👤';
      case 'email':
        return '📧';
      case 'document':
        return '📄';
      case 'image':
        return '🖼️';
      case 'video':
        return '🎬';
      default:
        return '🔍';
    }
  }
}
