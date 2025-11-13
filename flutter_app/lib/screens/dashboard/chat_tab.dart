import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ChatTab extends ConsumerStatefulWidget {
  const ChatTab({super.key});

  @override
  ConsumerState<ChatTab> createState() => _ChatTabState();
}

class _ChatTabState extends ConsumerState<ChatTab> {
  final TextEditingController _messageController = TextEditingController();
  final List<_ChatMessage> _messages = [];

  @override
  void initState() {
    super.initState();
    // Add initial message
    _messages.add(
      _ChatMessage(
        speaker: 'kastor',
        text: '안녕하세요! 카스토르입니다. 함께 사건을 해결해봅시다.',
        timestamp: DateTime.now(),
      ),
    );
  }

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Messages list
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: _messages.length,
            itemBuilder: (context, index) {
              final message = _messages[index];
              return _buildMessageBubble(message);
            },
          ),
        ),

        // Choice buttons (if available)
        if (_hasChoices()) _buildChoiceButtons(),

        // Message input
        _buildMessageInput(),
      ],
    );
  }

  Widget _buildMessageBubble(_ChatMessage message) {
    final isUser = message.speaker == 'detective';

    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        mainAxisAlignment:
            isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (!isUser) ...[
            CircleAvatar(
              backgroundColor: const Color(0xFF6366F1),
              child: Text(
                message.speaker[0].toUpperCase(),
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(width: 8),
          ],
          Flexible(
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isUser
                    ? const Color(0xFF6366F1)
                    : Colors.white.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: isUser
                      ? const Color(0xFF6366F1)
                      : Colors.white.withOpacity(0.2),
                  width: 1,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (!isUser)
                    Text(
                      message.speaker.toUpperCase(),
                      style: const TextStyle(
                        color: Color(0xFF6366F1),
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  if (!isUser) const SizedBox(height: 4),
                  Text(
                    message.text,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 14,
                    ),
                  ),
                ],
              ),
            ),
          ),
          if (isUser) ...[
            const SizedBox(width: 8),
            const CircleAvatar(
              backgroundColor: Color(0xFF10B981),
              child: Icon(Icons.person, color: Colors.white),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildChoiceButtons() {
    final choices = [
      '서버 로그를 확인하겠습니다',
      '용의자들을 조사하겠습니다',
      '증거를 다시 살펴보겠습니다',
    ];

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.3),
        border: Border(
          top: BorderSide(
            color: Colors.white.withOpacity(0.1),
            width: 1,
          ),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text(
            '선택하세요:',
            style: TextStyle(
              color: Colors.white70,
              fontSize: 14,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 12),
          ...choices.map((choice) => Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _messages.add(
                        _ChatMessage(
                          speaker: 'detective',
                          text: choice,
                          timestamp: DateTime.now(),
                        ),
                      );
                    });
                  },
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.all(16),
                    backgroundColor: Colors.white.withOpacity(0.1),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                      side: BorderSide(
                        color: const Color(0xFF6366F1).withOpacity(0.5),
                        width: 1,
                      ),
                    ),
                  ),
                  child: Text(
                    choice,
                    style: const TextStyle(fontSize: 14),
                  ),
                ),
              )),
        ],
      ),
    );
  }

  Widget _buildMessageInput() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1B4B),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 10,
            offset: const Offset(0, -3),
          ),
        ],
      ),
      child: SafeArea(
        child: Row(
          children: [
            Expanded(
              child: TextField(
                controller: _messageController,
                style: const TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  hintText: '메시지를 입력하세요...',
                  hintStyle: TextStyle(color: Colors.white.withOpacity(0.5)),
                  filled: true,
                  fillColor: Colors.white.withOpacity(0.1),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(24),
                    borderSide: BorderSide.none,
                  ),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 20,
                    vertical: 12,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 8),
            IconButton(
              onPressed: () {
                if (_messageController.text.isNotEmpty) {
                  setState(() {
                    _messages.add(
                      _ChatMessage(
                        speaker: 'detective',
                        text: _messageController.text,
                        timestamp: DateTime.now(),
                      ),
                    );
                    _messageController.clear();
                  });
                }
              },
              icon: const Icon(Icons.send, color: Color(0xFF6366F1)),
              iconSize: 28,
            ),
          ],
        ),
      ),
    );
  }

  bool _hasChoices() {
    // In a real app, this would check if the current scene has choices
    return _messages.length == 1;
  }
}

class _ChatMessage {
  final String speaker;
  final String text;
  final DateTime timestamp;

  _ChatMessage({
    required this.speaker,
    required this.text,
    required this.timestamp,
  });
}
