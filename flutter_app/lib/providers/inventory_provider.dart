import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/evidence.dart';

class InventoryState {
  final List<Evidence> evidences;
  final EvidenceType? selectedType;
  final String? selectedEvidenceId;
  final bool isMindMapView; // false = card view, true = mind map view

  const InventoryState({
    this.evidences = const [],
    this.selectedType,
    this.selectedEvidenceId,
    this.isMindMapView = false,
  });

  InventoryState copyWith({
    List<Evidence>? evidences,
    EvidenceType? selectedType,
    String? selectedEvidenceId,
    bool? isMindMapView,
  }) {
    return InventoryState(
      evidences: evidences ?? this.evidences,
      selectedType: selectedType ?? this.selectedType,
      selectedEvidenceId: selectedEvidenceId ?? this.selectedEvidenceId,
      isMindMapView: isMindMapView ?? this.isMindMapView,
    );
  }

  List<Evidence> getEvidencesByType(EvidenceType type) {
    return evidences.where((e) => e.type == type.name).toList();
  }

  Evidence? getEvidenceById(String id) {
    try {
      return evidences.firstWhere((e) => e.id == id);
    } catch (_) {
      return null;
    }
  }

  int getUnreadCount(EvidenceType type) {
    // Since Evidence model doesn't have isRead field, return 0 for now
    // Will be implemented when isRead is added to Evidence model
    return 0;
  }
}

class InventoryNotifier extends Notifier<InventoryState> {
  @override
  InventoryState build() {
    return const InventoryState();
  }

  void addEvidence(Evidence evidence) {
    state = state.copyWith(
      evidences: [...state.evidences, evidence],
    );
  }

  void markAsRead(String evidenceId) {
    // TODO: Implement when isRead field is added to Evidence model
  }

  void selectType(EvidenceType? type) {
    state = state.copyWith(selectedType: type);
  }

  void selectEvidence(String? id) {
    state = state.copyWith(selectedEvidenceId: id);
    if (id != null) {
      markAsRead(id);
    }
  }

  void toggleViewMode() {
    state = state.copyWith(isMindMapView: !state.isMindMapView);
  }

  void clearInventory() {
    state = const InventoryState();
  }

  // Demo data for testing
  void loadDemoData() {
    final demoEvidences = [
      Evidence(
        id: 'data_1',
        title: 'Win Rate Anomaly',
        description: 'Sudden spike in win rate from 52% to 99.8%',
        type: 'data',
        content: 'Player win rate increased from 52% to 99.8% within 24 hours. Statistical impossibility detected.',
        importance: 'critical',
        isUnlocked: true,
        relatedEvidence: ['log_1', 'log_2'],
        relatedCharacters: ['Ghost User #47'],
      ),
      Evidence(
        id: 'log_1',
        title: 'Game Activity Log',
        description: '147 games per day - suspicious pattern detected',
        type: 'log',
        content: '''
[2024-01-15 10:23:45] Game Start - Match ID: #4729
[2024-01-15 10:24:03] Game End - Result: WIN (18s)
[2024-01-15 10:24:05] Game Start - Match ID: #4730
[2024-01-15 10:24:22] Game End - Result: WIN (17s)
[Pattern continues with 145 more games...]
        ''',
        importance: 'high',
        isUnlocked: true,
        relatedEvidence: ['data_1'],
        relatedCharacters: ['Ghost User #47'],
      ),
      Evidence(
        id: 'log_2',
        title: 'API Response Log',
        description: '0.1 second average response time - too fast for human',
        type: 'log',
        content: 'Average API response time: 0.1s. Human average: 0.3-0.5s. Bot behavior suspected.',
        importance: 'high',
        isUnlocked: true,
        relatedEvidence: ['data_1'],
        relatedCharacters: ['Ghost User #47'],
      ),
      Evidence(
        id: 'email_1',
        title: 'Maya\'s Report',
        description: 'Initial anomaly detection report from Maya',
        type: 'email',
        content: '''
From: Maya Chen <maya@kastor-studios.com>
To: Detective Team
Subject: Urgent - Ranking System Anomaly

We've detected impossible statistics in our ranking system. 
User #47's win rate jumped to 99.8% overnight. 
This is statistically impossible and affecting fair play.

Please investigate immediately.

- Maya
        ''',
        importance: 'medium',
        isUnlocked: true,
      ),
      Evidence(
        id: 'document_1',
        title: 'Ghost User Profile',
        description: 'User profile with impossible statistics',
        type: 'document',
        content: '''
Username: Ghost User #47
Account Created: 2024-01-10
Total Games: 1,470
Win Rate: 99.8%
Average Game Duration: 18 seconds
Last Active: Always Online (24/7)
        ''',
        importance: 'critical',
        isUnlocked: true,
        relatedEvidence: ['data_1', 'log_1', 'log_2'],
        relatedCharacters: ['Ghost User #47', 'Maya Chen'],
      ),
      Evidence(
        id: 'image_1',
        title: 'Win Rate Graph',
        description: 'Visual representation of the sudden spike',
        type: 'image',
        importance: 'medium',
        isUnlocked: true,
        relatedEvidence: ['data_1'],
      ),
    ];

    state = state.copyWith(evidences: demoEvidences);
  }
}

final inventoryProvider = NotifierProvider<InventoryNotifier, InventoryState>(
  () => InventoryNotifier(),
);
