import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

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
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    setShowFeedback(true);
    
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
      <div className="bg-slate-800/90 border border-amber-600/50 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-2">
          <span className="text-amber-400 text-xl">❓</span>
          <p className="text-slate-100 font-semibold flex-1">{question}</p>
        </div>
      </div>

      <div className="space-y-3">
        {choices.map((choice, index) => (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !showFeedback && handleChoice(choice)}
            disabled={showFeedback}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              showFeedback && selectedChoice?.id === choice.id
                ? choice.isCorrect
                  ? "bg-green-900/40 border-green-500 text-green-100"
                  : "bg-red-900/40 border-red-500 text-red-100"
                : "bg-slate-700/60 border-slate-500/50 text-slate-100 hover:bg-slate-600/60 hover:border-slate-400/70"
            } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center gap-3">
              {showFeedback && selectedChoice?.id === choice.id && (
                <div>
                  {choice.isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                </div>
              )}
              <span className="flex-1">{choice.text}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {showFeedback && selectedChoice && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-4 rounded-lg border ${
            selectedChoice.isCorrect
              ? "bg-green-900/40 border-green-600/50 text-green-100"
              : "bg-red-900/40 border-red-600/50 text-red-100"
          }`}
        >
          <p className="font-semibold mb-1">
            {selectedChoice.isCorrect ? "✓ 정답입니다!" : "✗ 틀렸습니다"}
          </p>
          <p className="text-sm">{selectedChoice.feedback}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
