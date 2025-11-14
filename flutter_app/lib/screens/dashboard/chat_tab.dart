import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../providers/story_provider.dart';
import '../../providers/settings_provider.dart';
import '../../widgets/typing_text.dart';

class ChatTab extends ConsumerStatefulWidget {
  const ChatTab({super.key});

  @override
  ConsumerState<ChatTab> createState() => _ChatTabState();
}

class _ChatTabState extends ConsumerState<ChatTab> {
  final TextEditingController _messageController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _messageController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final storyState = ref.watch(storyProvider);
    final settings = ref.watch(settingsProvider);

    // Auto-scroll to bottom when new messages arrive
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });

    return Column(
      children: [
        // Messages list
        Expanded(
          child: ListView.builder(
            controller: _scrollController,
            padding: const EdgeInsets.all(16),
            itemCount: storyState.messages.length,
            itemBuilder: (context, index) {
              final message = storyState.messages[index];
              final prevMessage =
                  index > 0 ? storyState.messages[index - 1] : null;
              final nextMessage = index < storyState.messages.length - 1
                  ? storyState.messages[index + 1]
                  : null;
              return _buildMessageBubble(
                message,
                prevMessage: prevMessage,
                nextMessage: nextMessage,
              );
            },
          ),
        ),

        // Progress indicator for auto mode
        if (settings.autoTextMode && storyState.pendingMessages > 0)
          _buildProgressIndicator(storyState.pendingMessages),

        // Choice buttons (if available)
        if (storyState.currentChoices != null)
          _buildChoiceButtons(storyState.currentChoices!),

        // Name input (if waiting for name)
        if (storyState.waitingForInput) _buildNameInput(storyState.inputPrompt),

        // Manual mode continue button
        if (!settings.autoTextMode &&
            !storyState.waitingForInput &&
            storyState.currentChoices == null)
          _buildManualContinueButton(),

        // Message input (only show in auto mode if not waiting for input or choices)
        if (settings.autoTextMode &&
            !storyState.waitingForInput &&
            storyState.currentChoices == null)
          _buildMessageInput(),
      ],
    );
  }

  Widget _buildMessageBubble(
    StoryMessage message, {
    StoryMessage? prevMessage,
    StoryMessage? nextMessage,
  }) {
    final storyState = ref.watch(storyProvider);
    final settings = ref.watch(settingsProvider);
    final isDetective = message.speaker == 'detective';
    final isNarrator = message.speaker == 'narrator';
    final isSystem = message.speaker == 'system';

    // Check if this is the latest message (for typing animation)
    final isLatestMessage = storyState.messages.isNotEmpty &&
        storyState.messages.last.id == message.id;
    final shouldAnimate = isLatestMessage &&
        settings.autoTextMode &&
        !isDetective; // Don't animate detective messages

    // Check message grouping
    final isSameAsPrev = prevMessage != null &&
        prevMessage.speaker == message.speaker &&
        !prevMessage.isNarration &&
        !message.isNarration;
    final isSameAsNext = nextMessage != null &&
        nextMessage.speaker == message.speaker &&
        !nextMessage.isNarration &&
        !message.isNarration;

    // Narrator and system messages - centered
    if (isNarrator || isSystem) {
      return Padding(
        padding: const EdgeInsets.only(bottom: 16),
        child: Center(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.05),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: Colors.white.withOpacity(0.1),
                width: 1,
              ),
            ),
            child: shouldAnimate
                ? TypingText(
                    text: message.text,
                    style: TextStyle(
                      color: isSystem ? const Color(0xFF6366F1) : Colors.white70,
                      fontSize: 13,
                      fontStyle: isNarrator ? FontStyle.italic : FontStyle.normal,
                    ),
                  )
                : Text(
                    message.text,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: isSystem ? const Color(0xFF6366F1) : Colors.white70,
                      fontSize: 13,
                      fontStyle: isNarrator ? FontStyle.italic : FontStyle.normal,
                    ),
                  ),
          ),
        ),
      );
    }

    // Email message
    if (message.emailData != null) {
      return _buildEmailBubble(message);
    }

    // Regular chat message
    // Adjust spacing for grouped messages
    final bottomPadding = isSameAsNext ? 4.0 : 16.0;
    final topPadding = isSameAsPrev ? 4.0 : 0.0;

    // Adjust border radius for grouped messages
    BorderRadius getBorderRadius() {
      if (isDetective) {
        if (isSameAsPrev && isSameAsNext) {
          return const BorderRadius.only(
            topLeft: Radius.circular(12),
            bottomLeft: Radius.circular(12),
            topRight: Radius.circular(4),
            bottomRight: Radius.circular(4),
          );
        } else if (isSameAsPrev) {
          return const BorderRadius.only(
            topLeft: Radius.circular(12),
            bottomLeft: Radius.circular(12),
            topRight: Radius.circular(4),
            bottomRight: Radius.circular(12),
          );
        } else if (isSameAsNext) {
          return const BorderRadius.only(
            topLeft: Radius.circular(12),
            bottomLeft: Radius.circular(12),
            topRight: Radius.circular(12),
            bottomRight: Radius.circular(4),
          );
        }
      } else {
        if (isSameAsPrev && isSameAsNext) {
          return const BorderRadius.only(
            topLeft: Radius.circular(4),
            bottomLeft: Radius.circular(4),
            topRight: Radius.circular(12),
            bottomRight: Radius.circular(12),
          );
        } else if (isSameAsPrev) {
          return const BorderRadius.only(
            topLeft: Radius.circular(4),
            bottomLeft: Radius.circular(12),
            topRight: Radius.circular(12),
            bottomRight: Radius.circular(12),
          );
        } else if (isSameAsNext) {
          return const BorderRadius.only(
            topLeft: Radius.circular(12),
            bottomLeft: Radius.circular(4),
            topRight: Radius.circular(12),
            bottomRight: Radius.circular(12),
          );
        }
      }
      return BorderRadius.circular(12);
    }

    return Padding(
      padding: EdgeInsets.only(bottom: bottomPadding, top: topPadding),
      child: Row(
        mainAxisAlignment:
            isDetective ? MainAxisAlignment.end : MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          if (!isDetective) ...[
            if (!isSameAsPrev)
              _buildAvatar(message.speaker)
            else
              const SizedBox(width: 36),
            const SizedBox(width: 8),
          ],
          Flexible(
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isDetective
                    ? const Color(0xFF6366F1)
                    : Colors.white.withOpacity(0.1),
                borderRadius: getBorderRadius(),
                border: Border.all(
                  color: isDetective
                      ? const Color(0xFF6366F1)
                      : Colors.white.withOpacity(0.2),
                  width: 1,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (!isDetective && !isSameAsPrev)
                    Text(
                      _getSpeakerName(message.speaker),
                      style: const TextStyle(
                        color: Color(0xFF6366F1),
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  if (!isDetective && !isSameAsPrev) const SizedBox(height: 4),
                  shouldAnimate
                      ? TypingText(
                          text: message.text,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 14,
                          ),
                        )
                      : Text(
                          message.text,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 14,
                          ),
                        ),
                  // Show reaction if present
                  if (message.reaction != null) ...[
                    const SizedBox(height: 4),
                    Text(
                      message.reaction!,
                      style: const TextStyle(
                        fontSize: 16,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
          if (isDetective) ...[
            const SizedBox(width: 8),
            if (!isSameAsPrev)
              const CircleAvatar(
                backgroundColor: Color(0xFF10B981),
                child: Icon(Icons.person, color: Colors.white, size: 20),
              )
            else
              const SizedBox(width: 36),
          ],
        ],
      ),
    );
  }

  Widget _buildEmailBubble(StoryMessage message) {
    final emailData = message.emailData!;

    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFF1E1B4B),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: const Color(0xFF6366F1),
            width: 2,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.email, color: Color(0xFF6366F1), size: 20),
                const SizedBox(width: 8),
                const Text(
                  'New Email',
                  style: TextStyle(
                    color: Color(0xFF6366F1),
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              'FROM: ${emailData['from']}',
              style: const TextStyle(
                color: Colors.white70,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              'SUBJECT: ${emailData['subject']}',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 14,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.05),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                emailData['body'] ?? '',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 13,
                  height: 1.5,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAvatar(String speaker) {
    Color color;
    String initial;

    switch (speaker) {
      case 'kastor':
        color = const Color(0xFF6366F1);
        initial = 'K';
        break;
      case 'maya':
        color = const Color(0xFFEC4899);
        initial = 'M';
        break;
      case 'kaito':
        color = const Color(0xFF8B5CF6);
        initial = 'K';
        break;
      default:
        color = const Color(0xFF6366F1);
        initial = speaker[0].toUpperCase();
    }

    return CircleAvatar(
      backgroundColor: color,
      radius: 18,
      child: Text(
        initial,
        style: const TextStyle(
          color: Colors.white,
          fontWeight: FontWeight.bold,
          fontSize: 14,
        ),
      ),
    );
  }

  String _getSpeakerName(String speaker) {
    switch (speaker) {
      case 'kastor':
        return 'KASTOR';
      case 'maya':
        return 'MAYA';
      case 'kaito':
        return 'KAITO';
      case 'lukas':
        return 'LUKAS';
      case 'detective':
        return 'DETECTIVE';
      default:
        return speaker.toUpperCase();
    }
  }

  Widget _buildChoiceButtons(List<StoryChoice> choices) {
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
            'Choose:',
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
                    ref.read(storyProvider.notifier).selectChoice(choice);
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
                    choice.text,
                    style: const TextStyle(fontSize: 13, height: 1.4),
                    textAlign: TextAlign.left,
                  ),
                ),
              )),
        ],
      ),
    );
  }

  Widget _buildNameInput(String? prompt) {
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
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (prompt != null)
              Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Text(
                  prompt,
                  style: const TextStyle(
                    color: Colors.white70,
                    fontSize: 14,
                  ),
                ),
              ),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    style: const TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      hintText: 'Enter your name...',
                      hintStyle:
                          TextStyle(color: Colors.white.withOpacity(0.5)),
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
                    onSubmitted: (value) {
                      if (value.isNotEmpty) {
                        ref.read(storyProvider.notifier).submitDetectiveName(value);
                        _messageController.clear();
                      }
                    },
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: () {
                    if (_messageController.text.isNotEmpty) {
                      ref
                          .read(storyProvider.notifier)
                          .submitDetectiveName(_messageController.text);
                      _messageController.clear();
                    }
                  },
                  icon: const Icon(Icons.send, color: Color(0xFF6366F1)),
                  iconSize: 28,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProgressIndicator(int pendingMessages) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.2),
        border: Border(
          top: BorderSide(
            color: Colors.white.withOpacity(0.05),
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          const TypingIndicator(color: Color(0xFF6366F1)),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              '$pendingMessages more message${pendingMessages > 1 ? 's' : ''} coming...',
              style: TextStyle(
                color: Colors.white.withOpacity(0.6),
                fontSize: 13,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildManualContinueButton() {
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
        child: SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: () {
              ref.read(storyProvider.notifier).continueStory();
            },
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.all(16),
              backgroundColor: const Color(0xFF6366F1),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.touch_app, size: 20),
                const SizedBox(width: 8),
                const Text(
                  'Tap to continue',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
        ),
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
                  hintText: 'Type a message...',
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
                onSubmitted: (value) {
                  if (value.isNotEmpty) {
                    ref.read(storyProvider.notifier).addUserMessage(value);
                    _messageController.clear();
                  }
                },
              ),
            ),
            const SizedBox(width: 8),
            IconButton(
              onPressed: () {
                if (_messageController.text.isNotEmpty) {
                  ref
                      .read(storyProvider.notifier)
                      .addUserMessage(_messageController.text);
                  _messageController.clear();
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
}
