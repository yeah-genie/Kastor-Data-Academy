import { motion, AnimatePresence } from "framer-motion";
import { User, Bot, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

interface Pattern {
  id: string;
  type: "normal" | "bot";
  loginTime: string;
  sessionLength: number;
  location: string[];
  consistency: "random" | "fixed";
  description: string;
}

interface PatternMatchingProps {
  data: {
    patterns: Pattern[];
  };
  onComplete: (accuracy: number) => void;
}

export function PatternMatching({ data, onComplete }: PatternMatchingProps) {
  const [placements, setPlacements] = useState<Map<string, "normal" | "bot">>(new Map());
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  const playSound = (soundName: string) => {
    try {
      const audio = new Audio(`/sounds/${soundName}.mp3`);
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (error) {}
  };

  const handleDrop = (patternId: string, zone: "normal" | "bot") => {
    const newPlacements = new Map(placements);
    newPlacements.set(patternId, zone);
    setPlacements(newPlacements);
    playSound("click");
  };

  const handleSubmit = () => {
    let correctCount = 0;
    data.patterns.forEach((pattern) => {
      const placement = placements.get(pattern.id);
      if (placement === pattern.type) {
        correctCount++;
      }
    });

    const accuracyPercent = Math.round((correctCount / data.patterns.length) * 100);
    setAccuracy(accuracyPercent);
    setShowResult(true);
    setIsComplete(true);

    if (accuracyPercent >= 90) {
      playSound("success");
    } else if (accuracyPercent >= 70) {
      playSound("notification");
    } else {
      playSound("warning-beep");
    }

    setTimeout(() => {
      onComplete(accuracyPercent);
    }, 2000);
  };

  const getPatternZone = (patternId: string) => placements.get(patternId);

  const isPatternCorrect = (pattern: Pattern) => {
    if (!showResult) return null;
    const placement = placements.get(pattern.id);
    return placement === pattern.type;
  };

  const getRemainingPatterns = () => {
    return data.patterns.filter((p) => !placements.has(p.id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🧩 Match Patterns: Normal vs Bot
        </h2>
        <p className="text-gray-600">
          Drag patterns to the correct category
        </p>
        <p className="text-sm text-gray-500 mt-2">
          💡 Hint: Bots have fixed timing (03:00:00) and location hopping
        </p>
      </div>

      {/* Drop Zones */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Normal Zone */}
        <div className="border-2 border-dashed border-green-400 rounded-xl p-4 bg-green-50 min-h-[400px]">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-green-700">NORMAL USERS</h3>
          </div>
          <div className="space-y-3">
            {data.patterns
              .filter((p) => getPatternZone(p.id) === "normal")
              .map((pattern) => (
                <PatternCard
                  key={pattern.id}
                  pattern={pattern}
                  isCorrect={isPatternCorrect(pattern)}
                  onDrop={handleDrop}
                  isComplete={isComplete}
                />
              ))}
            {!isComplete && getRemainingPatterns().length === 0 && placements.size === 0 && (
              <p className="text-gray-500 text-center py-8">Drop patterns here</p>
            )}
          </div>
        </div>

        {/* Bot Zone */}
        <div className="border-2 border-dashed border-red-400 rounded-xl p-4 bg-red-50 min-h-[400px]">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-6 h-6 text-red-600" />
            <h3 className="text-xl font-bold text-red-700">BOT PATTERNS</h3>
          </div>
          <div className="space-y-3">
            {data.patterns
              .filter((p) => getPatternZone(p.id) === "bot")
              .map((pattern) => (
                <PatternCard
                  key={pattern.id}
                  pattern={pattern}
                  isCorrect={isPatternCorrect(pattern)}
                  onDrop={handleDrop}
                  isComplete={isComplete}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Remaining Patterns */}
      {!isComplete && getRemainingPatterns().length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            Patterns to Match (Drag to categories above):
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {getRemainingPatterns().map((pattern) => (
              <DraggablePattern
                key={pattern.id}
                pattern={pattern}
                onDrop={handleDrop}
              />
            ))}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="text-center mb-4">
        <span className="text-lg font-semibold text-gray-600">
          Placed: {placements.size}/{data.patterns.length}
        </span>
      </div>

      {/* Result Message */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-lg mb-4 ${
              accuracy >= 90
                ? "bg-green-50 border-2 border-green-500"
                : accuracy >= 70
                ? "bg-yellow-50 border-2 border-yellow-500"
                : "bg-red-50 border-2 border-red-500"
            }`}
          >
            <div className="text-center font-semibold">
              {accuracy >= 90 && (
                <span className="text-green-700">
                  🎉 Excellent! {accuracy}% accuracy! +25 points
                </span>
              )}
              {accuracy >= 70 && accuracy < 90 && (
                <span className="text-yellow-700">
                  👍 Good! {accuracy}% accuracy! +15 points
                </span>
              )}
              {accuracy < 70 && (
                <span className="text-red-700">
                  🤔 {accuracy}% accuracy. Review bot patterns! +5 points
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      {!isComplete && (
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={placements.size !== data.patterns.length}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              placements.size === data.patterns.length
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Check Matches
          </motion.button>
        </div>
      )}
    </div>
  );
}

// Draggable Pattern Component
function DraggablePattern({
  pattern,
  onDrop,
}: {
  pattern: Pattern;
  onDrop: (patternId: string, zone: "normal" | "bot") => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-3 bg-white border-2 border-gray-300 rounded-lg cursor-move shadow-sm hover:shadow-md transition-shadow ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="text-sm text-gray-700">
        <div className="font-semibold mb-1">Pattern {pattern.id}</div>
        <div className="text-xs space-y-1">
          <div>Login: {pattern.loginTime}</div>
          <div>Session: {pattern.sessionLength}min</div>
          <div>Location: {pattern.location.join("→")}</div>
        </div>
      </div>

      {/* Simple button-based drag */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onDrop(pattern.id, "normal")}
          className="flex-1 px-2 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 rounded"
        >
          Normal
        </button>
        <button
          onClick={() => onDrop(pattern.id, "bot")}
          className="flex-1 px-2 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded"
        >
          Bot
        </button>
      </div>
    </motion.div>
  );
}

// Pattern Card (placed in zone)
function PatternCard({
  pattern,
  isCorrect,
  onDrop,
  isComplete,
}: {
  pattern: Pattern;
  isCorrect: boolean | null;
  onDrop: (patternId: string, zone: "normal" | "bot") => void;
  isComplete: boolean;
}) {
  const getBorderColor = () => {
    if (isCorrect === null) return "border-gray-300";
    return isCorrect ? "border-green-500" : "border-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative p-3 bg-white border-2 rounded-lg ${getBorderColor()}`}
    >
      {/* Result Indicator */}
      {isCorrect !== null && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2"
        >
          {isCorrect ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500" />
          )}
        </motion.div>
      )}

      <div className="text-sm text-gray-700">
        <div className="font-semibold mb-1">Pattern {pattern.id}</div>
        <div className="text-xs space-y-1">
          <div>Login: {pattern.loginTime}</div>
          <div>Session: {pattern.sessionLength}min</div>
          <div>Location: {pattern.location.join("→")}</div>
        </div>
      </div>
    </motion.div>
  );
}
