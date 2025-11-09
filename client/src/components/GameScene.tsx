import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Volume2, VolumeX } from "lucide-react";
import { useDetectiveGame } from "@/lib/stores/useDetectiveGame";
import { useAudio } from "@/lib/stores/useAudio";
import { case1Story, StoryNode } from "@/data/case1-story";
import { ChatMessage } from "./ChatMessage";
import { DataVisualization } from "./DataVisualization";
import { ChoiceButtons } from "./ChoiceButtons";
import { DetectiveNotebook } from "./DetectiveNotebook";
import { ClueAnimation } from "./ClueAnimation";
import { ResolutionScene } from "./ResolutionScene";

export function GameScene() {
  const {
    phase,
    currentNode,
    setCurrentNode,
    setPhase,
    addClue,
    addScore,
    setStarsEarned,
  } = useDetectiveGame();

  const { isMuted, toggleMute, playSuccess } = useAudio();

  const [currentStoryNode, setCurrentStoryNode] = useState<StoryNode>(case1Story.start);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [showNotebook, setShowNotebook] = useState(false);
  const [pendingClue, setPendingClue] = useState<any>(null);

  useEffect(() => {
    const node = case1Story[currentNode];
    if (node) {
      setCurrentStoryNode(node);
      setPhase(node.phase);
      setVisibleMessages(0);

      const timer = setInterval(() => {
        setVisibleMessages((prev) => {
          if (prev < node.messages.length) {
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 600);

      if (node.autoAdvance) {
        setTimeout(() => {
          setCurrentNode(node.autoAdvance!.nextNode);
        }, node.autoAdvance.delay + node.messages.length * 600);
      }

      return () => clearInterval(timer);
    }
  }, [currentNode]);

  const handleChoiceSelected = (choice: any) => {
    if (choice.clueAwarded) {
      const clue = {
        ...choice.clueAwarded,
        timestamp: Date.now(),
      };
      addClue(clue);
      setPendingClue(clue);
      playSuccess();
    }

    if (choice.pointsAwarded) {
      addScore(choice.pointsAwarded);
    }

    setTimeout(() => {
      setCurrentNode(choice.nextNode);
    }, 500);
  };

  const handleClueAnimationComplete = () => {
    setPendingClue(null);
  };

  const handleResolutionContinue = () => {
    alert("Part 2와 Part 3는 곧 출시됩니다! 감사합니다.");
  };

  if (phase === "resolution" && currentNode === "end") {
    return <ResolutionScene onContinue={handleResolutionContinue} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="fixed top-0 left-0 right-0 bg-slate-900/95 border-b border-slate-700 px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🔍</div>
          <div>
            <h1 className="font-bold text-amber-300">KASTOR</h1>
            <p className="text-xs text-slate-400">데이터 탐정</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          
          <button
            onClick={() => setShowNotebook(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-semibold">노트</span>
          </button>
        </div>
      </div>

      <div className="pt-20 pb-6 px-4 max-w-4xl mx-auto">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 mb-4 text-center">
          <span className="text-amber-400 font-semibold text-sm">
            {phase === "briefing" && "📋 사건 브리핑"}
            {phase === "investigation" && "🔎 조사 중"}
            {phase === "resolution" && "⚖️ 사건 해결"}
          </span>
        </div>

        <div className="space-y-4">
          {currentStoryNode.messages.slice(0, visibleMessages).map((message, index) => (
            <ChatMessage key={message.id} message={message} index={index} />
          ))}

          {visibleMessages === currentStoryNode.messages.length && (
            <>
              {currentStoryNode.dataVisualizations?.map((viz, index) => (
                <DataVisualization key={index} visualization={viz} />
              ))}

              {currentStoryNode.question && (
                <ChoiceButtons
                  question={currentStoryNode.question.text}
                  choices={currentStoryNode.question.choices}
                  onChoiceSelected={handleChoiceSelected}
                />
              )}
            </>
          )}
        </div>
      </div>

      <DetectiveNotebook isOpen={showNotebook} onClose={() => setShowNotebook(false)} />
      
      {pendingClue && (
        <ClueAnimation clue={pendingClue} onComplete={handleClueAnimationComplete} />
      )}
    </div>
  );
}
