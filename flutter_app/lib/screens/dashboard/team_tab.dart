import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class TeamTab extends ConsumerWidget {
  const TeamTab({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final characters = _getCharacters();

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: characters.length,
      itemBuilder: (context, index) {
        return _buildCharacterCard(context, characters[index]);
      },
    );
  }

  Widget _buildCharacterCard(BuildContext context, _Character character) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      color: Colors.white.withOpacity(0.05),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(
          color: _getStatusColor(character.status).withOpacity(0.3),
          width: 2,
        ),
      ),
      child: InkWell(
        onTap: () => _showCharacterDetail(context, character),
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Row(
                children: [
                  // Avatar
                  Container(
                    width: 64,
                    height: 64,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: _getStatusColor(character.status)
                          .withOpacity(0.2),
                      border: Border.all(
                        color: _getStatusColor(character.status),
                        width: 2,
                      ),
                    ),
                    child: Center(
                      child: Text(
                        character.name[0],
                        style: TextStyle(
                          color: _getStatusColor(character.status),
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),

                  // Info
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          character.name,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          character.role,
                          style: TextStyle(
                            color: Colors.white.withOpacity(0.7),
                            fontSize: 14,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 4,
                              ),
                              decoration: BoxDecoration(
                                color: _getStatusColor(character.status)
                                    .withOpacity(0.2),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Text(
                                character.status.toUpperCase(),
                                style: TextStyle(
                                  color: _getStatusColor(character.status),
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),

                  // Trust level
                  Column(
                    children: [
                      const Icon(
                        Icons.favorite,
                        color: Color(0xFFEF4444),
                        size: 20,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '${character.trustLevel}/5',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ],
              ),

              // Trust level bar
              const SizedBox(height: 12),
              LinearProgressIndicator(
                value: character.trustLevel / 5,
                backgroundColor: Colors.white.withOpacity(0.1),
                valueColor: AlwaysStoppedAnimation<Color>(
                  _getTrustColor(character.trustLevel),
                ),
              ),

              // Suspicious activities count
              if (character.suspiciousActivities > 0) ...[
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF59E0B).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      const Icon(
                        Icons.warning,
                        color: Color(0xFFF59E0B),
                        size: 16,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        '의심스러운 활동: ${character.suspiciousActivities}건',
                        style: const TextStyle(
                          color: Color(0xFFF59E0B),
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'active':
        return const Color(0xFF10B981);
      case 'suspect':
        return const Color(0xFFEF4444);
      case 'cleared':
        return const Color(0xFF3B82F6);
      case 'arrested':
        return const Color(0xFF6B7280);
      default:
        return Colors.grey;
    }
  }

  Color _getTrustColor(int trustLevel) {
    if (trustLevel >= 4) return const Color(0xFF10B981);
    if (trustLevel >= 3) return const Color(0xFF3B82F6);
    if (trustLevel >= 2) return const Color(0xFFF59E0B);
    return const Color(0xFFEF4444);
  }

  void _showCharacterDetail(BuildContext context, _Character character) {
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF1E1B4B),
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.7,
        minChildSize: 0.5,
        maxChildSize: 0.9,
        expand: false,
        builder: (context, scrollController) => SingleChildScrollView(
          controller: scrollController,
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.3),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Row(
                children: [
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: _getStatusColor(character.status)
                          .withOpacity(0.2),
                      border: Border.all(
                        color: _getStatusColor(character.status),
                        width: 3,
                      ),
                    ),
                    child: Center(
                      child: Text(
                        character.name[0],
                        style: TextStyle(
                          color: _getStatusColor(character.status),
                          fontSize: 36,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          character.name,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          character.role,
                          style: TextStyle(
                            color: Colors.white.withOpacity(0.7),
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              _buildDetailSection(
                '배경',
                character.background,
              ),
              const SizedBox(height: 16),
              if (character.suspiciousActivities > 0)
                _buildDetailSection(
                  '의심스러운 활동',
                  ['활동 내역 조사 중...'],
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDetailSection(String title, List<String> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            color: Color(0xFF6366F1),
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        ...items.map((item) => Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    '• ',
                    style: TextStyle(color: Colors.white70),
                  ),
                  Expanded(
                    child: Text(
                      item,
                      style: const TextStyle(
                        color: Colors.white70,
                        fontSize: 14,
                      ),
                    ),
                  ),
                ],
              ),
            )),
      ],
    );
  }

  List<_Character> _getCharacters() {
    return [
      _Character(
        name: 'Isabella Torres',
        role: 'Senior Data Analyst',
        status: 'suspect',
        trustLevel: 2,
        suspiciousActivities: 3,
        background: [
          '뛰어난 분석가로 공정성 지표와 예측 모델링 전문',
          '분석 금고에 대한 관리 권한을 가진 몇 안 되는 직원 중 하나',
        ],
      ),
      _Character(
        name: 'Alex Reeves',
        role: 'Infrastructure Engineer',
        status: 'active',
        trustLevel: 4,
        suspiciousActivities: 0,
        background: [
          '인프라 관리 담당',
          '시스템 보안에 대한 전문 지식 보유',
        ],
      ),
      _Character(
        name: 'Camille Beaumont',
        role: 'Chief of Security',
        status: 'active',
        trustLevel: 4,
        suspiciousActivities: 1,
        background: [
          '전직 군 사이버 방어 장교',
          '이상 탐지 및 사고 대응 프로토콜 담당',
        ],
      ),
    ];
  }
}

class _Character {
  final String name;
  final String role;
  final String status;
  final int trustLevel;
  final int suspiciousActivities;
  final List<String> background;

  _Character({
    required this.name,
    required this.role,
    required this.status,
    required this.trustLevel,
    required this.suspiciousActivities,
    required this.background,
  });
}
