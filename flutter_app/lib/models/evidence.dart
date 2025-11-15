import 'package:json_annotation/json_annotation.dart';

part 'evidence.g.dart';

enum EvidenceType {
  @JsonValue('document')
  document,
  @JsonValue('log')
  log,
  @JsonValue('email')
  email,
  @JsonValue('image')
  image,
  @JsonValue('video')
  video,
  @JsonValue('data')
  data,
}

enum ImportanceLevel {
  @JsonValue('low')
  low,
  @JsonValue('medium')
  medium,
  @JsonValue('high')
  high,
  @JsonValue('critical')
  critical,
}

@JsonSerializable()
class Evidence {
  final String id;
  final String title;
  final String type;
  final String description;
  final String? content;
  final String? imageUrl;
  final String? fileUrl;
  final String importance;
  final List<String>? relatedCharacters;
  final List<String>? relatedEvidence;
  final String? unlockCondition;
  final bool isUnlocked;
  final Map<String, dynamic>? metadata;

  Evidence({
    required this.id,
    required this.title,
    required this.type,
    required this.description,
    this.content,
    this.imageUrl,
    this.fileUrl,
    required this.importance,
    this.relatedCharacters,
    this.relatedEvidence,
    this.unlockCondition,
    required this.isUnlocked,
    this.metadata,
  });

  factory Evidence.fromJson(Map<String, dynamic> json) =>
      _$EvidenceFromJson(json);
  Map<String, dynamic> toJson() => _$EvidenceToJson(this);

  Evidence copyWith({
    String? id,
    String? title,
    String? type,
    String? description,
    String? content,
    String? imageUrl,
    String? fileUrl,
    String? importance,
    List<String>? relatedCharacters,
    List<String>? relatedEvidence,
    String? unlockCondition,
    bool? isUnlocked,
    Map<String, dynamic>? metadata,
  }) {
    return Evidence(
      id: id ?? this.id,
      title: title ?? this.title,
      type: type ?? this.type,
      description: description ?? this.description,
      content: content ?? this.content,
      imageUrl: imageUrl ?? this.imageUrl,
      fileUrl: fileUrl ?? this.fileUrl,
      importance: importance ?? this.importance,
      relatedCharacters: relatedCharacters ?? this.relatedCharacters,
      relatedEvidence: relatedEvidence ?? this.relatedEvidence,
      unlockCondition: unlockCondition ?? this.unlockCondition,
      isUnlocked: isUnlocked ?? this.isUnlocked,
      metadata: metadata ?? this.metadata,
    );
  }
}

// UI 확장
extension EvidenceTypeExtension on EvidenceType {
  String get label {
    switch (this) {
      case EvidenceType.document:
        return 'Documents';
      case EvidenceType.log:
        return 'Logs';
      case EvidenceType.email:
        return 'Emails';
      case EvidenceType.image:
        return 'Images';
      case EvidenceType.video:
        return 'Videos';
      case EvidenceType.data:
        return 'Data';
    }
  }

  String get labelKo {
    switch (this) {
      case EvidenceType.document:
        return '문서';
      case EvidenceType.log:
        return '로그';
      case EvidenceType.email:
        return '이메일';
      case EvidenceType.image:
        return '이미지';
      case EvidenceType.video:
        return '영상';
      case EvidenceType.data:
        return '데이터';
    }
  }

  String get icon {
    switch (this) {
      case EvidenceType.document:
        return '📄';
      case EvidenceType.log:
        return '📝';
      case EvidenceType.email:
        return '📧';
      case EvidenceType.image:
        return '🖼️';
      case EvidenceType.video:
        return '🎬';
      case EvidenceType.data:
        return '📊';
    }
  }
}
