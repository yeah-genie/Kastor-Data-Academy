import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, X } from "lucide-react";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

interface CaseClosedModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseNumber: number;
  caseTitle: string;
}

export function CaseClosedModal({ isOpen, onClose, caseNumber, caseTitle }: CaseClosedModalProps) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

              {/* Stars */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-2 mb-6"
              >
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.6 + i * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <Star className="w-8 h-8 fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
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
