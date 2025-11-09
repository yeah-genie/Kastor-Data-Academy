import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { useDetectiveGame } from "@/lib/stores/useDetectiveGame";
import { useAudio } from "@/lib/stores/useAudio";

interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  nextNode: string;
  feedback: string;
}

interface ChoiceButtonsProps {
  question: string;
  choices: Choice[];
  onChoiceSelected: (choice: Choice) => void;
}

export function ChoiceButtons({ question, choices, onChoiceSelected }: ChoiceButtonsProps) {
  const { visitedCharacters } = useDetectiveGame();
  const { playSuccess, playHit } = useAudio();
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const hasEmoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u26FF]|[\u2700-\u27BF]/.test(question);

  const filteredChoices = choices.filter(choice => {
    if (choice.text.includes("Talk to")) {
      const characterMatch = choice.text.match(/Talk to (\w+)/);
      if (characterMatch) {
        const character = characterMatch[1].toLowerCase();
        return !visitedCharacters.includes(character);
      }
    }
    return true;
  });

  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
    
    if (choice.isCorrect) {
      playSuccess();
    } else {
      playHit();
    }
    
    setTimeout(() => {
      onChoiceSelected(choice);
      setShowFeedback(false);
      setSelectedChoice(null);
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-6"
    >
      <div className="bg-slate-800/95 border-2 border-slate-600 rounded-xl p-4 mb-4 shadow-lg">
        <div className="flex items-start gap-3">
          {!hasEmoji && <span className="text-amber-400 text-2xl md:text-xl">🔍</span>}
          <p className="text-slate-100 font-bold flex-1 text-lg md:text-base leading-relaxed">{question}</p>
        </div>
      </div>

      <div className="space-y-3">
        {filteredChoices.map((choice, index) => (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, x: -20 }}
            animate={
              showFeedback && selectedChoice?.id === choice.id
                ? choice.isCorrect
                  ? { 
                      opacity: 1, 
                      x: 0, 
                      scale: [1, 1.02, 1],
                      boxShadow: ["0 0 0px rgba(34, 197, 94, 0)", "0 0 20px rgba(34, 197, 94, 0.6)", "0 0 10px rgba(34, 197, 94, 0.3)"]
                    }
                  : { 
                      opacity: 1, 
                      x: [0, -10, 10, -10, 10, 0],
                    }
                : { opacity: 1, x: 0 }
            }
            transition={
              showFeedback && selectedChoice?.id === choice.id
                ? choice.isCorrect
                  ? { duration: 0.6, times: [0, 0.5, 1] }
                  : { duration: 0.5 }
                : { delay: index * 0.1 }
            }
            onClick={() => !showFeedback && handleChoice(choice)}
            disabled={showFeedback}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all shadow-md min-h-[56px] ${
              showFeedback && selectedChoice?.id === choice.id
                ? choice.isCorrect
                  ? "bg-green-500/20 border-green-500 text-gray-900"
                  : "bg-red-500/20 border-red-500 text-red-100"
                : "bg-slate-800/90 border-slate-600 text-slate-100 hover:bg-slate-700/90 hover:border-slate-500 hover:shadow-lg"
            } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center gap-3">
              {showFeedback && selectedChoice?.id === choice.id && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {choice.isCorrect ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                      <span className="text-2xl">😊</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <XCircle className="w-6 h-6 text-red-400" />
                      <span className="text-2xl">🤔</span>
                    </div>
                  )}
                </motion.div>
              )}
              <span className="flex-1 font-medium text-base md:text-sm">{choice.text}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {showFeedback && selectedChoice && selectedChoice.feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className={`mt-4 p-4 rounded-xl border-2 shadow-md ${
            selectedChoice.isCorrect
              ? "bg-green-500/20 border-green-500 text-gray-900"
              : "bg-red-500/20 border-red-500 text-red-100"
          }`}
        >
          <div className="flex items-start gap-2">
            <span className="text-2xl flex-shrink-0">
              {selectedChoice.isCorrect ? "✨" : "💡"}
            </span>
            <p className="text-base md:text-sm font-medium flex-1">{selectedChoice.feedback}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
