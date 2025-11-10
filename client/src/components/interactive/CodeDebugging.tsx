import { motion, AnimatePresence } from "framer-motion";
import { Code, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

interface CodeLine {
  line: number;
  code: string;
  suspicious: boolean;
}

interface CodeDebuggingProps {
  data: {
    codeLines: CodeLine[];
    maxSelections: number;
    targetLines: number[];
  };
  onComplete: (correctCount: number) => void;
}

export function CodeDebugging({ data, onComplete }: CodeDebuggingProps) {
  const [selectedLines, setSelectedLines] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const playSound = (soundName: string) => {
    try {
      const audio = new Audio(`/sounds/${soundName}.mp3`);
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (error) {}
  };

  const handleToggleLine = (lineNumber: number) => {
    if (isComplete) return;

    const newSelected = new Set(selectedLines);
    if (newSelected.has(lineNumber)) {
      newSelected.delete(lineNumber);
      playSound("click");
    } else {
      if (newSelected.size < data.maxSelections) {
        newSelected.add(lineNumber);
        playSound("notification");
      }
    }
    setSelectedLines(newSelected);
  };

  const handleSubmit = () => {
    let correct = 0;
    selectedLines.forEach((line) => {
      if (data.targetLines.includes(line)) {
        correct++;
      }
    });

    setCorrectCount(correct);
    setShowResult(true);
    setIsComplete(true);

    if (correct === data.maxSelections) {
      playSound("success");
    } else {
      playSound("warning-beep");
    }

    setTimeout(() => {
      onComplete(correct);
    }, 2000);
  };

  const isLineSelected = (lineNumber: number) => selectedLines.has(lineNumber);

  const getLineBackgroundColor = (codeLine: CodeLine) => {
    if (!showResult) {
      return isLineSelected(codeLine.line) ? "bg-yellow-100" : "hover:bg-gray-50";
    }

    if (isLineSelected(codeLine.line)) {
      return data.targetLines.includes(codeLine.line) ? "bg-green-100" : "bg-red-100";
    }

    // Show missed suspicious lines
    if (data.targetLines.includes(codeLine.line)) {
      return "bg-orange-100";
    }

    return "bg-white";
  };

  const getLineIndicator = (codeLine: CodeLine) => {
    if (!showResult) return null;

    if (isLineSelected(codeLine.line)) {
      if (data.targetLines.includes(codeLine.line)) {
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      } else {
        return <XCircle className="w-5 h-5 text-red-600" />;
      }
    }

    // Show missed suspicious lines
    if (data.targetLines.includes(codeLine.line)) {
      return <span className="text-orange-600 font-bold">!</span>;
    }

    return null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          💻 Find Suspicious Code
        </h2>
        <p className="text-gray-600">
          Select {data.maxSelections} lines that look suspicious
        </p>
        <p className="text-sm text-gray-500 mt-2">
          💡 Hint: Look for conditional statements with unusual flags or bonuses
        </p>
      </div>

      {/* Code Block */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
        {data.codeLines.map((codeLine) => (
          <motion.div
            key={codeLine.line}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: codeLine.line * 0.03 }}
            onClick={() => handleToggleLine(codeLine.line)}
            className={`
              flex items-center gap-3 px-2 py-1 cursor-pointer transition-all rounded
              ${getLineBackgroundColor(codeLine)}
              ${isLineSelected(codeLine.line) && !showResult ? "border-l-4 border-yellow-500" : ""}
              ${!isComplete ? "hover:border-l-4 hover:border-blue-400" : ""}
            `}
          >
            {/* Line Number */}
            <span className="text-gray-400 select-none w-8 text-right flex-shrink-0">
              {codeLine.line}
            </span>

            {/* Code */}
            <span className={`flex-1 ${isLineSelected(codeLine.line) && !showResult ? "text-gray-900 font-semibold" : "text-gray-300"}`}>
              {codeLine.code || "\u00A0"}
            </span>

            {/* Selection Indicator */}
            {isLineSelected(codeLine.line) && !showResult && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-yellow-600 font-bold text-lg flex-shrink-0"
              >
                ⭐
              </motion.span>
            )}

            {/* Result Indicator */}
            {showResult && (
              <div className="flex-shrink-0">
                {getLineIndicator(codeLine)}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Selection Counter */}
      <div className="text-center mb-4">
        <span className={`text-lg font-semibold ${
          selectedLines.size === data.maxSelections ? "text-blue-600" : "text-gray-600"
        }`}>
          Selected: {selectedLines.size}/{data.maxSelections}
        </span>
      </div>

      {/* Legend */}
      {showResult && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
          <div className="font-semibold mb-2">Legend:</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-500 rounded"></div>
              <span>Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-500 rounded"></div>
              <span>Wrong</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border border-orange-500 rounded"></div>
              <span>Missed</span>
            </div>
          </div>
        </div>
      )}

      {/* Result Message */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-lg mb-4 ${
              correctCount === data.maxSelections
                ? "bg-green-50 border-2 border-green-500"
                : correctCount === 2
                ? "bg-yellow-50 border-2 border-yellow-500"
                : "bg-red-50 border-2 border-red-500"
            }`}
          >
            <div className="text-center font-semibold">
              {correctCount === 3 && (
                <span className="text-green-700">
                  🎉 Perfect! Found all backdoors! +35 points
                </span>
              )}
              {correctCount === 2 && (
                <span className="text-yellow-700">
                  👍 Good! Found main backdoor! +20 points
                </span>
              )}
              {correctCount < 2 && (
                <span className="text-red-700">
                  🤔 Keep looking at conditional statements! +10 points
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
            disabled={selectedLines.size !== data.maxSelections}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              selectedLines.size === data.maxSelections
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </motion.button>
        </div>
      )}
    </div>
  );
}
