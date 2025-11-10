import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ClueAnimationProps {
  clue: {
    title: string;
    description: string;
  } | null;
  onComplete: () => void;
}

export function ClueAnimation({ clue, onComplete }: ClueAnimationProps) {
  if (!clue) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onComplete}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: "spring", duration: 0.7 }}
          className="bg-gradient-to-br from-amber-700 to-amber-900 border-4 border-amber-400 rounded-2xl p-8 max-w-md relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-10 -right-10 text-amber-300/20 text-9xl"
          >
            <Sparkles size={120} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center relative z-10"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-amber-100 mb-2">Clue Obtained!</h2>
            <h3 className="text-xl font-semibold text-amber-200 mb-3">{clue.title}</h3>
            <p className="text-amber-100 text-sm">{clue.description}</p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-6 text-amber-300 text-xs"
            >
              (Tap to continue)
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
