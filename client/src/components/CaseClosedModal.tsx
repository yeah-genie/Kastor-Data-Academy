import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, X, Award } from "lucide-react";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { useDetectiveGame, type Grade } from "@/lib/stores/useDetectiveGame";

interface CaseClosedModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseNumber: number;
  caseTitle: string;
}

export function CaseClosedModal({ isOpen, onClose, caseNumber, caseTitle }: CaseClosedModalProps) {
  const calculateGrade = useDetectiveGame((state) => state.calculateGrade);
  const hintsUsed = useDetectiveGame((state) => state.hintsUsed);
  const evidenceCollected = useDetectiveGame((state) => state.evidenceCollected);
  const sessionMetrics = useDetectiveGame((state) => state.sessionMetrics);
  
  const [grade, setGrade] = useState<Grade>('B');
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (isOpen) {
      const calculatedGrade = calculateGrade();
      setGrade(calculatedGrade);
    }
  }, [isOpen, calculateGrade]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const gradeColors = {
    'S': { bg: 'from-yellow-400 to-amber-500', text: 'text-yellow-500', border: 'border-yellow-400' },
    'A': { bg: 'from-green-400 to-emerald-500', text: 'text-green-500', border: 'border-green-400' },
    'B': { bg: 'from-blue-400 to-indigo-500', text: 'text-blue-500', border: 'border-blue-400' },
    'C': { bg: 'from-gray-400 to-slate-500', text: 'text-gray-500', border: 'border-gray-400' },
  };
  
  const gradeMessages = {
    'S': 'Outstanding Detective Work!',
    'A': 'Excellent Investigation!',
    'B': 'Good Detective Work!',
    'C': 'Case Solved!',
  };
  
  const correctDecisions = sessionMetrics.decisions.filter(d => d.isCorrect).length;
  const totalDecisions = sessionMetrics.decisions.length;
  const evidenceRate = sessionMetrics.totalEvidenceInCase > 0 
    ? Math.round((evidenceCollected.length / sessionMetrics.totalEvidenceInCase) * 100)
    : 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Confetti effect */}
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
          />

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-gradient-to-br from-amber-50 to-yellow-50 border-4 border-amber-400 rounded-3xl p-8 z-50 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              {/* Trophy icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-4"
              >
                <div className="bg-amber-400 rounded-full p-6">
                  <Trophy className="w-16 h-16 text-white" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-amber-900 mb-2"
              >
                🎉 CASE CLOSED!
              </motion.h2>

              {/* Case info */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-700 mb-6"
              >
                {caseTitle}
              </motion.p>

              {/* Grade Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <div className={`mx-auto w-32 h-32 rounded-full bg-gradient-to-br ${gradeColors[grade].bg} flex items-center justify-center border-4 ${gradeColors[grade].border} shadow-lg`}>
                  <span className="text-6xl font-bold text-white">{grade}</span>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-3 text-lg font-semibold text-gray-700"
                >
                  {gradeMessages[grade]}
                </motion.p>
              </motion.div>

              {/* Performance Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/50 rounded-xl p-4 mb-6 space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Correct Decisions:</span>
                  <span className="font-semibold text-gray-900">{correctDecisions}/{totalDecisions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Evidence Collected:</span>
                  <span className="font-semibold text-gray-900">{evidenceRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hints Used:</span>
                  <span className="font-semibold text-gray-900">{hintsUsed}/3</span>
                </div>
              </motion.div>

              {/* Congratulations text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-gray-600 mb-6 text-sm"
              >
                Congratulations, Detective! 🎊<br />
                You've successfully solved the case!
              </motion.p>

              {/* Continue button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                onClick={onClose}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
