import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";

interface HintDialogProps {
  isOpen: boolean;
  onClose: () => void;
  hint: string;
}

export function HintDialog({ isOpen, onClose, hint }: HintDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-gradient-to-br from-purple-900/90 to-slate-900/90 border-2 border-purple-600/50 rounded-2xl p-6 z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-purple-200">Hint</h3>
              </div>
              <button
                onClick={onClose}
                className="text-purple-300 hover:text-purple-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
              <p className="text-slate-200 leading-relaxed">{hint}</p>
            </div>
            
            <button
              onClick={onClose}
              className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              OK
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
