import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// Story message for chat display
class StoryMessage {
  final String id;
  final String speaker; // 'kastor', 'detective', 'maya', 'narrator', 'system'
  final String text;
  final DateTime timestamp;
  final String? email; // Email content if this is an email message
  final Map<String, dynamic>? emailData; // Full email data

  StoryMessage({
    required this.id,
    required this.speaker,
    required this.text,
    required this.timestamp,
    this.email,
    this.emailData,
  });
}

// Story choice for interactive decisions
class StoryChoice {
  final String id;
  final String text;
  final String nextSceneId;
  final int? points;

  StoryChoice({
    required this.id,
    required this.text,
    required this.nextSceneId,
    this.points,
  });
}

// Current story state
class StoryState {
  final List<StoryMessage> messages;
  final List<StoryChoice>? currentChoices;
  final String currentSceneId;
  final int investigationPoints;
  final String? detectiveName;
  final bool waitingForInput;
  final String? inputPrompt;

  StoryState({
    required this.messages,
    this.currentChoices,
    required this.currentSceneId,
    this.investigationPoints = 0,
    this.detectiveName,
    this.waitingForInput = false,
    this.inputPrompt,
  });

  StoryState copyWith({
    List<StoryMessage>? messages,
    List<StoryChoice>? currentChoices,
    String? currentSceneId,
    int? investigationPoints,
    String? detectiveName,
    bool? waitingForInput,
    String? inputPrompt,
  }) {
    return StoryState(
      messages: messages ?? this.messages,
      currentChoices: currentChoices ?? this.currentChoices,
      currentSceneId: currentSceneId ?? this.currentSceneId,
      investigationPoints: investigationPoints ?? this.investigationPoints,
      detectiveName: detectiveName ?? this.detectiveName,
      waitingForInput: waitingForInput ?? this.waitingForInput,
      inputPrompt: inputPrompt ?? this.inputPrompt,
    );
  }
}

// Story provider to manage Episode 1 story progression
class StoryNotifier extends StateNotifier<StoryState> {
  StoryNotifier() : super(StoryState(messages: [], currentSceneId: 'scene_0_start')) {
    _initializeStory();
  }

  void _initializeStory() {
    // Scene 0: Partnership - Start with initial messages
    _addMessage('kastor', '(코를 골며) Zzzzz...');

    Future.delayed(const Duration(milliseconds: 800), () {
      if (!mounted) return;
      _addMessage('narrator', '[문이 열리며 탐정이 들어온다]');
    });

    Future.delayed(const Duration(milliseconds: 1600), () {
      if (!mounted) return;
      _addMessage('detective', '...여기가 맞나?');
    });

    Future.delayed(const Duration(milliseconds: 2400), () {
      if (!mounted) return;
      _addMessage('kastor', '음? (기지개를 켜며) 오! 새 사람?');
    });

    Future.delayed(const Duration(milliseconds: 3200), () {
      if (!mounted) return;
      _addMessage('detective', '신입 탐정입니다.');
    });

    Future.delayed(const Duration(milliseconds: 4000), () {
      if (!mounted) return;
      _addMessage('kastor', '탐정? 그렇게 안 보이는데~');
    });

    Future.delayed(const Duration(milliseconds: 4800), () {
      if (!mounted) return;
      _addMessage('detective', '첫 출근이에요!');
    });

    Future.delayed(const Duration(milliseconds: 5600), () {
      if (!mounted) return;
      _addMessage('kastor', '알겠어. 얼굴에 다 써있어. (웃으며)');
    });

    Future.delayed(const Duration(milliseconds: 6400), () {
      if (!mounted) return;
      _addMessage('detective', '(이 사람...)');
    });

    Future.delayed(const Duration(milliseconds: 7200), () {
      if (!mounted) return;
      _addMessage('kastor', '난 Kastor! 네 파트너야!');
    });

    Future.delayed(const Duration(milliseconds: 8000), () {
      if (!mounted) return;
      _addMessage('kastor', '이름이 뭐야?');
      // Set waiting for name input
      state = state.copyWith(
        waitingForInput: true,
        inputPrompt: '당신의 이름을 입력하세요',
      );
    });
  }

  void _addMessage(String speaker, String text, {String? email, Map<String, dynamic>? emailData}) {
    if (!mounted) return;

    final message = StoryMessage(
      id: 'msg_${DateTime.now().millisecondsSinceEpoch}',
      speaker: speaker,
      text: text,
      timestamp: DateTime.now(),
      email: email,
      emailData: emailData,
    );

    state = state.copyWith(
      messages: [...state.messages, message],
    );
  }

  void submitDetectiveName(String name) {
    if (!state.waitingForInput) return;

    state = state.copyWith(
      detectiveName: name,
      waitingForInput: false,
      inputPrompt: null,
    );

    _addMessage('detective', name);

    Future.delayed(const Duration(milliseconds: 800), () {
      if (!mounted) return;
      _addMessage('kastor', '멋진 이름이네! 철자 맞게 썼어?');
    });

    Future.delayed(const Duration(milliseconds: 1600), () {
      if (!mounted) return;
      _addMessage('detective', '제가 직접 입력했는데요.');
    });

    Future.delayed(const Duration(milliseconds: 2400), () {
      if (!mounted) return;
      _addMessage('kastor', '좋아! 명찰은 환불 안 돼.');
    });

    Future.delayed(const Duration(milliseconds: 3200), () {
      if (!mounted) return;
      _addMessage('detective', '네?');
    });

    Future.delayed(const Duration(milliseconds: 4000), () {
      if (!mounted) return;
      _addMessage('narrator', '[이메일 알림음 - 딩!]');
    });

    Future.delayed(const Duration(milliseconds: 4800), () {
      if (!mounted) return;
      _addMessage('kastor', '오! 메일이다!');
    });

    Future.delayed(const Duration(milliseconds: 5600), () {
      if (!mounted) return;
      _addMessage('detective', '벌써요?');
    });

    Future.delayed(const Duration(milliseconds: 6400), () {
      if (!mounted) return;
      _addMessage('kastor', '운이 좋네! 사건 없으면 지루하거든. 클릭해봐!');
    });

    Future.delayed(const Duration(milliseconds: 7200), () {
      if (!mounted) return;
      // Show email
      _showMayaEmail();
    });
  }

  void _showMayaEmail() {
    final emailData = {
      'from': 'Maya Zhang (Director, Legend Arena)',
      'subject': 'URGENT! Need Help!',
      'body': '''Hello detectives!

Our character Shadow's win rate jumped from 50% to 85% in ONE DAY!

We didn't patch him! I have NO idea why this happened! 😰

The community is exploding! If we lose player trust, the game is finished!

PLEASE HELP US!''',
    };

    _addMessage(
      'system',
      '📧 새 이메일이 도착했습니다',
      email: emailData['body'],
      emailData: emailData,
    );

    Future.delayed(const Duration(milliseconds: 1600), () {
      if (!mounted) return;
      _addMessage('kastor', '오! 게임 케이스다! 재밌겠는걸!');
    });

    Future.delayed(const Duration(milliseconds: 2400), () {
      if (!mounted) return;
      _addMessage('detective', 'Shadow가 갑자기 엄청 강해졌다는 건가요...?');
    });

    Future.delayed(const Duration(milliseconds: 3200), () {
      if (!mounted) return;
      _addMessage('kastor', '35% 상승! 엄청난 거지!');
    });

    Future.delayed(const Duration(milliseconds: 4000), () {
      if (!mounted) return;
      _addMessage('detective', '그게 많은 건가요?');
    });

    Future.delayed(const Duration(milliseconds: 4800), () {
      if (!mounted) return;
      _addMessage('kastor', '상상해봐... 치킨 반 마리 먹다가 갑자기 세 마리 먹는 거야.');
    });

    Future.delayed(const Duration(milliseconds: 5600), () {
      if (!mounted) return;
      _addMessage('detective', '...무슨 비유가 그래요?');
    });

    Future.delayed(const Duration(milliseconds: 6400), () {
      if (!mounted) return;
      _addMessage('kastor', '안 통해? 그럼 피자로—');
    });

    Future.delayed(const Duration(milliseconds: 7200), () {
      if (!mounted) return;
      _addMessage('detective', '아니요! 알겠어요! 엄청 많은 거죠!');
    });

    Future.delayed(const Duration(milliseconds: 8000), () {
      if (!mounted) return;
      _addMessage('kastor', '(웃으며) 봐! 음식 비유가 통하잖아!');
    });

    Future.delayed(const Duration(milliseconds: 9000), () {
      if (!mounted) return;
      _showHypothesisChoices();
    });
  }

  void _showHypothesisChoices() {
    _addMessage('kastor', '좋아! 첫 번째 미션! 가설을 세워보자!');

    Future.delayed(const Duration(milliseconds: 800), () {
      if (!mounted) return;
      _addMessage('kastor', '탐정은 아무렇게나 추측하면 안 돼. 시작 이론이 필요해.');
    });

    Future.delayed(const Duration(milliseconds: 1600), () {
      if (!mounted) return;
      _addMessage('detective', '방향 같은 건가요?');
    });

    Future.delayed(const Duration(milliseconds: 2400), () {
      if (!mounted) return;
      _addMessage('kastor', '정확해! 미스터리 게임에서 어느 문을 먼저 열지 정하는 것 같은 거야.');
    });

    Future.delayed(const Duration(milliseconds: 3200), () {
      if (!mounted) return;
      _addMessage('kastor', '자! 세 가지 가능성이 있어. Maya의 이메일을 보고 하나 골라봐!');

      // Show choices
      state = state.copyWith(
        currentChoices: [
          StoryChoice(
            id: 'choice_A',
            text: 'A) 공식 패치 (문서화 안 됨)\n이론: 팀이 Shadow를 패치했는데 기록하는 걸 깜빡했을까?',
            nextSceneId: 'scene_1_choice_A',
          ),
          StoryChoice(
            id: 'choice_B',
            text: 'B) 희귀한 버그\n이론: Shadow를 실수로 강하게 만든 랜덤 글리치?',
            nextSceneId: 'scene_1_choice_B',
          ),
          StoryChoice(
            id: 'choice_C',
            text: 'C) 무단 수정\n이론: 누군가 일부러 몰래 Shadow의 스탯을 바꿨을까?',
            nextSceneId: 'scene_1_choice_C',
            points: 10,
          ),
        ],
      );
    });
  }

  void selectChoice(StoryChoice choice) {
    // Clear choices
    state = state.copyWith(currentChoices: null);

    // Add detective's choice as message
    _addMessage('detective', choice.text);

    // Award points if any
    if (choice.points != null) {
      state = state.copyWith(
        investigationPoints: state.investigationPoints + choice.points!,
      );
    }

    // Process choice
    if (choice.id == 'choice_C') {
      _handleChoiceC();
    } else if (choice.id == 'choice_A') {
      _handleChoiceA();
    } else if (choice.id == 'choice_B') {
      _handleChoiceB();
    }
  }

  void _handleChoiceC() {
    Future.delayed(const Duration(milliseconds: 800), () {
      if (!mounted) return;
      _addMessage('kastor', '오! 범죄 느낌! 네 생각이 마음에 드는데!');
    });

    Future.delayed(const Duration(milliseconds: 1600), () {
      if (!mounted) return;
      _addMessage('detective', '그냥... 느낌이었어요.');
    });

    Future.delayed(const Duration(milliseconds: 2400), () {
      if (!mounted) return;
      _addMessage('kastor', '탐정은 느낌만으로 일할 수 없어~');
    });

    Future.delayed(const Duration(milliseconds: 3200), () {
      if (!mounted) return;
      _addMessage('detective', '그럼 뭘로요?');
    });

    Future.delayed(const Duration(milliseconds: 4000), () {
      if (!mounted) return;
      _addMessage('kastor', '데이터! 숫자는 거짓말하지 않아!');
    });

    Future.delayed(const Duration(milliseconds: 4800), () {
      if (!mounted) return;
      _addMessage('detective', '하지만 사람은 거짓말하죠?');
    });

    Future.delayed(const Duration(milliseconds: 5600), () {
      if (!mounted) return;
      _addMessage('kastor', '항상! 그래서 먼저 증거를 확인하는 거야. Maya한테 전화해보자!');
    });

    Future.delayed(const Duration(milliseconds: 6400), () {
      if (!mounted) return;
      _addMessage('system', '🎵 미니 축하! +10 포인트\n좋은 가설을 세웠습니다!');

      // Start Scene 2
      _startScene2();
    });
  }

  void _handleChoiceA() {
    Future.delayed(const Duration(milliseconds: 800), () {
      if (!mounted) return;
      _addMessage('kastor', '공식 기록부터 확인하는 건 좋은 접근이야!');
    });

    Future.delayed(const Duration(milliseconds: 1600), () {
      if (!mounted) return;
      _addMessage('kastor', '하지만 Maya가 "패치하지 않았다"고 확신하고 있어.');
    });

    Future.delayed(const Duration(milliseconds: 2400), () {
      if (!mounted) return;
      _addMessage('kastor', '다른 가능성도 생각해봐야 할 것 같아.');

      // Start Scene 2 anyway
      _startScene2();
    });
  }

  void _handleChoiceB() {
    Future.delayed(const Duration(milliseconds: 800), () {
      if (!mounted) return;
      _addMessage('kastor', '버그는 항상 가능성이 있지!');
    });

    Future.delayed(const Duration(milliseconds: 1600), () {
      if (!mounted) return;
      _addMessage('kastor', '하지만 35% 승률 증가는 랜덤 버그치곤 너무 구체적이야.');
    });

    Future.delayed(const Duration(milliseconds: 2400), () {
      if (!mounted) return;
      _addMessage('kastor', '뭔가 의도적인 것 같아. 자세히 조사해보자!');

      // Start Scene 2
      _startScene2();
    });
  }

  void _startScene2() {
    Future.delayed(const Duration(milliseconds: 1000), () {
      if (!mounted) return;
      _addMessage('narrator', '[전화 거는 소리...]');
    });

    Future.delayed(const Duration(milliseconds: 2000), () {
      if (!mounted) return;
      _addMessage('maya', '여보세요? 탐정님들?');
    });

    Future.delayed(const Duration(milliseconds: 2800), () {
      if (!mounted) return;
      _addMessage('detective', '네. 이메일 받았어요. 모든 걸 말씀해주시겠어요?');
    });

    Future.delayed(const Duration(milliseconds: 3600), () {
      if (!mounted) return;
      _addMessage('maya', 'Shadow의 승률이 28일째에 급증했어요. 우리는 확실히 패치하지 않았습니다. 커뮤니티는 우리가 거짓말한다고 생각해요!');
    });

    Future.delayed(const Duration(milliseconds: 4400), () {
      if (!mounted) return;
      _addMessage('kastor', '게임 데이터를 보내주실 수 있나요? 패치 노트, 서버 로그, 플레이어 통계요?');
    });

    Future.delayed(const Duration(milliseconds: 5200), () {
      if (!mounted) return;
      _addMessage('maya', '지금 보내드릴게요! 서둘러주세요 — 시간이 지날수록 플레이어를 더 잃고 있어요!');
    });

    Future.delayed(const Duration(milliseconds: 6000), () {
      if (!mounted) return;
      _addMessage('detective', '알아낼게요.');
    });

    Future.delayed(const Duration(milliseconds: 6800), () {
      if (!mounted) return;
      _addMessage('system', '📊 데이터 수신 완료!\n\nFiles 탭에서 다음을 확인하세요:\n• 승률 그래프\n• 패치 노트\n• 서버 로그');

      state = state.copyWith(currentSceneId: 'scene_3_graph_analysis');
    });
  }

  void addUserMessage(String text) {
    _addMessage('detective', text);
  }
}

final storyProvider = StateNotifierProvider<StoryNotifier, StoryState>((ref) {
  return StoryNotifier();
});
