import 'package:flutter/material.dart';
import '../../../models/evidence.dart';

class EvidenceDetailModal extends StatelessWidget {
  final Evidence evidence;

  const EvidenceDetailModal({
    super.key,
    required this.evidence,
  });

  @override
  Widget build(BuildContext context) {
    return DraggableScrollableSheet(
      initialChildSize: 0.7,
      minChildSize: 0.5,
      maxChildSize: 0.95,
      builder: (context, scrollController) {
        return Container(
          decoration: const BoxDecoration(
            color: Color(0xFF252A3E),
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(24),
              topRight: Radius.circular(24),
            ),
          ),
          child: Column(
            children: [
              // Handle bar
              Container(
                margin: const EdgeInsets.only(top: 12, bottom: 8),
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: const Color(0xFF00D9FF).withOpacity(0.3),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),

              // Content
              Expanded(
                child: ListView(
                  controller: scrollController,
                  padding: const EdgeInsets.all(24),
                  children: [
                    // Header
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: const Color(0xFF00D9FF).withOpacity(0.2),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            _getTypeIcon(evidence.type),
                            style: const TextStyle(fontSize: 32),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                evidence.title,
                                style: const TextStyle(
                                  fontSize: 22,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                _getTypeLabel(evidence.type),
                                style: TextStyle(
                                  fontSize: 14,
                                  color: const Color(0xFF00D9FF).withOpacity(0.8),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 24),

                    // Importance
                    _buildSection(
                      'Importance',
                      Row(
                        children: List.generate(
                          5,
                          (index) => Icon(
                            index < _getImportanceLevel(evidence.importance)
                                ? Icons.star
                                : Icons.star_border,
                            size: 20,
                            color: const Color(0xFFFBBF24),
                          ),
                        ),
                      ),
                    ),

                    const SizedBox(height: 20),

                    // Description
                    _buildSection(
                      'Description',
                      Text(
                        evidence.description,
                        style: TextStyle(
                          fontSize: 15,
                          color: Colors.white.withOpacity(0.9),
                          height: 1.5,
                        ),
                      ),
                    ),

                    if (evidence.content != null) ...[
                      const SizedBox(height: 20),
                      _buildSection(
                        'Content',
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: const Color(0xFF1A1D2E),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: const Color(0xFF00D9FF).withOpacity(0.2),
                            ),
                          ),
                          child: Text(
                            evidence.content!,
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.white.withOpacity(0.8),
                              height: 1.6,
                              fontFamily: 'monospace',
                            ),
                          ),
                        ),
                      ),
                    ],

                    // Related evidence
                    if (evidence.relatedEvidence != null &&
                        evidence.relatedEvidence!.isNotEmpty) ...[
                      const SizedBox(height: 20),
                      _buildSection(
                        'Related Evidence',
                        Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: evidence.relatedEvidence!.map((id) {
                            return Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 8,
                              ),
                              decoration: BoxDecoration(
                                color: const Color(0xFF00D9FF).withOpacity(0.1),
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(
                                  color: const Color(0xFF00D9FF).withOpacity(0.3),
                                ),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Icon(
                                    Icons.link,
                                    size: 14,
                                    color: Color(0xFF00D9FF),
                                  ),
                                  const SizedBox(width: 6),
                                  Text(
                                    id,
                                    style: const TextStyle(
                                      fontSize: 12,
                                      color: Color(0xFF00D9FF),
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ],
                              ),
                            );
                          }).toList(),
                        ),
                      ),
                    ],

                    // Related characters
                    if (evidence.relatedCharacters != null &&
                        evidence.relatedCharacters!.isNotEmpty) ...[
                      const SizedBox(height: 20),
                      _buildSection(
                        'Related Characters',
                        Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: evidence.relatedCharacters!.map((character) {
                            return Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 8,
                              ),
                              decoration: BoxDecoration(
                                color: const Color(0xFF00D9FF).withOpacity(0.1),
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(
                                  color: const Color(0xFF00D9FF).withOpacity(0.3),
                                ),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Text(
                                    '👤',
                                    style: TextStyle(fontSize: 14),
                                  ),
                                  const SizedBox(width: 6),
                                  Text(
                                    character,
                                    style: const TextStyle(
                                      fontSize: 12,
                                      color: Color(0xFF00D9FF),
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ],
                              ),
                            );
                          }).toList(),
                        ),
                      ),
                    ],

                    const SizedBox(height: 32),

                    // Close button
                    ElevatedButton(
                      onPressed: () => Navigator.pop(context),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF00D9FF),
                        foregroundColor: const Color(0xFF0A0E1A),
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        elevation: 8,
                        shadowColor: const Color(0xFF00D9FF).withOpacity(0.5),
                      ),
                      child: const Text(
                        'Close',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildSection(String title, Widget content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: Color(0xFF00D9FF),
          ),
        ),
        const SizedBox(height: 12),
        content,
      ],
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

  String _getTypeLabel(String type) {
    return type.toUpperCase();
  }

  int _getImportanceLevel(String importance) {
    switch (importance.toLowerCase()) {
      case 'critical':
        return 5;
      case 'high':
        return 4;
      case 'medium':
        return 3;
      case 'low':
        return 2;
      default:
        return 1;
    }
  }
}
