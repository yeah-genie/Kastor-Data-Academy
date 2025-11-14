import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../providers/game_state_provider.dart';

class ProgressTab extends ConsumerWidget {
  const ProgressTab({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final gameState = ref.watch(gameStateProvider);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Overall progress
          _buildOverallProgress(gameState.gameProgress),
          const SizedBox(height: 24),

          // Episodes progress
          _buildSectionTitle('에피소드 진행률'),
          const SizedBox(height: 16),
          _buildEpisodesProgress(gameState.completedEpisodes),
          const SizedBox(height: 24),

          // Statistics
          _buildSectionTitle('통계'),
          const SizedBox(height: 16),
          _buildStatistics(gameState),
          const SizedBox(height: 24),

          // Achievements
          _buildSectionTitle('업적'),
          const SizedBox(height: 16),
          _buildAchievements(),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(
        color: Colors.white,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
    );
  }

  Widget _buildOverallProgress(double progress) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF6366F1), Color(0xFF8B5CF6)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          const Text(
            '전체 진행률',
            style: TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            '${(progress * 100).toInt()}%',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 48,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          LinearProgressIndicator(
            value: progress,
            backgroundColor: Colors.white.withOpacity(0.3),
            valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
            minHeight: 8,
            borderRadius: BorderRadius.circular(4),
          ),
        ],
      ),
    );
  }

  Widget _buildEpisodesProgress(List<String> completedEpisodes) {
    final episodes = [
      _EpisodeProgress(
        number: 1,
        title: 'The Missing Balance Patch',
        isCompleted: completedEpisodes.contains('episode1'),
        difficulty: 2,
      ),
      _EpisodeProgress(
        number: 2,
        title: 'The Ghost User\'s Ranking',
        isCompleted: completedEpisodes.contains('episode2'),
        difficulty: 3,
      ),
      _EpisodeProgress(
        number: 3,
        title: 'The Perfect Victory',
        isCompleted: completedEpisodes.contains('episode3'),
        difficulty: 4,
      ),
      _EpisodeProgress(
        number: 4,
        title: 'The Data Breach',
        isCompleted: completedEpisodes.contains('episode4'),
        difficulty: 5,
      ),
    ];

    return Column(
      children: episodes.map((episode) {
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: episode.isCompleted
                ? const Color(0xFF10B981).withOpacity(0.1)
                : Colors.white.withOpacity(0.05),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: episode.isCompleted
                  ? const Color(0xFF10B981)
                  : Colors.white.withOpacity(0.1),
              width: 1,
            ),
          ),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: episode.isCompleted
                      ? const Color(0xFF10B981)
                      : Colors.white.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: episode.isCompleted
                      ? const Icon(Icons.check, color: Colors.white)
                      : Text(
                          '${episode.number}',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 18,
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
                      'Episode ${episode.number}',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.7),
                        fontSize: 12,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      episode.title,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
              Row(
                children: List.generate(
                  5,
                  (index) => Icon(
                    index < episode.difficulty
                        ? Icons.star
                        : Icons.star_border,
                    color: const Color(0xFFF59E0B),
                    size: 16,
                  ),
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }

  Widget _buildStatistics(gameState) {
    return Row(
      children: [
        Expanded(
          child: _StatCard(
            icon: Icons.bookmark,
            label: '수집한 증거',
            value: '${gameState.collectedEvidence.length}',
            color: const Color(0xFF3B82F6),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _StatCard(
            icon: Icons.explore,
            label: '탐색한 장면',
            value: '${gameState.sceneHistory.length}',
            color: const Color(0xFF8B5CF6),
          ),
        ),
      ],
    );
  }

  Widget _buildAchievements() {
    final achievements = [
      _Achievement(
        icon: Icons.emoji_events,
        title: '첫 발견',
        description: '첫 번째 증거를 발견했습니다',
        isUnlocked: true,
      ),
      _Achievement(
        icon: Icons.lightbulb,
        title: '날카로운 관찰',
        description: '숨겨진 단서를 찾아냈습니다',
        isUnlocked: true,
      ),
      _Achievement(
        icon: Icons.psychology,
        title: '논리적 추론',
        description: '모든 퍼즐을 해결했습니다',
        isUnlocked: false,
      ),
      _Achievement(
        icon: Icons.military_tech,
        title: '마스터 탐정',
        description: '모든 에피소드를 완료했습니다',
        isUnlocked: false,
      ),
    ];

    return Column(
      children: achievements.map((achievement) {
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: achievement.isUnlocked
                ? const Color(0xFFF59E0B).withOpacity(0.1)
                : Colors.white.withOpacity(0.05),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: achievement.isUnlocked
                  ? const Color(0xFFF59E0B)
                  : Colors.white.withOpacity(0.1),
              width: 1,
            ),
          ),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: achievement.isUnlocked
                      ? const Color(0xFFF59E0B)
                      : Colors.white.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  achievement.icon,
                  color: achievement.isUnlocked
                      ? Colors.white
                      : Colors.white.withOpacity(0.3),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      achievement.title,
                      style: TextStyle(
                        color: achievement.isUnlocked
                            ? Colors.white
                            : Colors.white.withOpacity(0.5),
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      achievement.description,
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.5),
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
              if (achievement.isUnlocked)
                const Icon(
                  Icons.check_circle,
                  color: Color(0xFF10B981),
                ),
            ],
          ),
        );
      }).toList(),
    );
  }
}

class _StatCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color color;

  const _StatCard({
    required this.icon,
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.3),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: color.withOpacity(0.3),
          width: 1,
        ),
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: 32),
          const SizedBox(height: 8),
          Text(
            value,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              color: Colors.white.withOpacity(0.7),
              fontSize: 12,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _EpisodeProgress {
  final int number;
  final String title;
  final bool isCompleted;
  final int difficulty;

  _EpisodeProgress({
    required this.number,
    required this.title,
    required this.isCompleted,
    required this.difficulty,
  });
}

class _Achievement {
  final IconData icon;
  final String title;
  final String description;
  final bool isUnlocked;

  _Achievement({
    required this.icon,
    required this.title,
    required this.description,
    required this.isUnlocked,
  });
}
