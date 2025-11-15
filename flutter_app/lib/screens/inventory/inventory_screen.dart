import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../models/evidence.dart';
import '../../providers/inventory_provider.dart';
import '../../providers/settings_provider.dart';
import 'widgets/evidence_card_view.dart';
import 'widgets/evidence_mindmap_view.dart';
import 'widgets/evidence_detail_modal.dart';

class InventoryScreen extends ConsumerStatefulWidget {
  const InventoryScreen({super.key});

  @override
  ConsumerState<InventoryScreen> createState() => _InventoryScreenState();
}

class _InventoryScreenState extends ConsumerState<InventoryScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: EvidenceType.values.length, vsync: this);
    
    // Load demo data
    Future.microtask(() {
      ref.read(inventoryProvider.notifier).loadDemoData();
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final inventory = ref.watch(inventoryProvider);
    final settings = ref.watch(settingsProvider);
    final isKorean = settings.language == 'ko';

    return Scaffold(
      backgroundColor: const Color(0xFF1A1D2E),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1A1D2E),
        elevation: 0,
        title: Row(
          children: [
            const Text(
              '📦',
              style: TextStyle(fontSize: 24),
            ),
            const SizedBox(width: 8),
            Text(
              isKorean ? '증거 보관함' : 'Evidence Vault',
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ],
        ),
        actions: [
          // View mode toggle
          IconButton(
            onPressed: () {
              ref.read(inventoryProvider.notifier).toggleViewMode();
            },
            icon: Icon(
              inventory.isMindMapView ? Icons.grid_view : Icons.hub,
              color: const Color(0xFF00D9FF),
            ),
            tooltip: inventory.isMindMapView
                ? (isKorean ? '카드 뷰' : 'Card View')
                : (isKorean ? '마인드맵 뷰' : 'Mind Map View'),
          ),
          const SizedBox(width: 8),
        ],
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          indicatorColor: const Color(0xFF00D9FF),
          indicatorWeight: 3,
          labelColor: const Color(0xFF00D9FF),
          unselectedLabelColor: Colors.white60,
          labelStyle: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 14,
          ),
          tabs: EvidenceType.values.map((type) {
            final count = inventory.getEvidencesByType(type).length;
            final unreadCount = inventory.getUnreadCount(type);

            return Tab(
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    type.icon,
                    style: const TextStyle(fontSize: 18),
                  ),
                  const SizedBox(width: 6),
                  Text(isKorean ? type.labelKo : type.label),
                  if (count > 0) ...[
                    const SizedBox(width: 6),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 6,
                        vertical: 2,
                      ),
                      decoration: BoxDecoration(
                        color: unreadCount > 0
                            ? const Color(0xFFFF006E)
                            : const Color(0xFF00D9FF).withOpacity(0.3),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        count.toString(),
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            );
          }).toList(),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: EvidenceType.values.map((type) {
          final evidences = inventory.getEvidencesByType(type);

          if (evidences.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    type.icon,
                    style: const TextStyle(fontSize: 64),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    isKorean ? '아직 발견한 ${type.labelKo}가 없습니다' : 'No ${type.label} found yet',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white.withOpacity(0.5),
                    ),
                  ),
                ],
              ),
            );
          }

          return inventory.isMindMapView
              ? EvidenceMindMapView(
                  evidences: evidences,
                  allEvidences: inventory.evidences,
                  onEvidenceTap: (evidence) {
                    _showEvidenceDetail(context, evidence);
                  },
                )
              : EvidenceCardView(
                  evidences: evidences,
                  onEvidenceTap: (evidence) {
                    _showEvidenceDetail(context, evidence);
                  },
                );
        }).toList(),
      ),
    );
  }

  void _showEvidenceDetail(BuildContext context, Evidence evidence) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => EvidenceDetailModal(evidence: evidence),
    );
  }
}
