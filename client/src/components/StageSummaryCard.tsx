import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, TrendingUp, Users, Search, Scale } from "lucide-react";

interface StageSummary {
  stage: number;
  title: string;
  keyFindings: string[];
  evidenceCount: number;
  nextStageHint?: string;
}

interface StageSummaryCardProps {
  summary: StageSummary;
  onContinue: () => void;
}

const stageIcons = {
  1: TrendingUp,
  2: Users,
  3: Search,
  4: Scale,
  5: CheckCircle,
};

export function StageSummaryCard({ summary, onContinue }: StageSummaryCardProps) {
  const StageIcon = stageIcons[summary.stage as keyof typeof stageIcons] || CheckCircle;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onContinue}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <StageIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Stage {summary.stage} Complete
                </h3>
                <p className="text-sm text-gray-600">{summary.title}</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-5 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                핵심 발견사항
              </h4>
              <ul className="space-y-2.5">
                {summary.keyFindings.map((finding, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-sm leading-relaxed">{finding}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                수집된 증거: <span className="text-blue-600 font-semibold">{summary.evidenceCount}</span>개
              </div>
              {summary.nextStageHint && (
                <div className="text-xs text-gray-500 italic max-w-xs text-right">
                  💡 {summary.nextStageHint}
                </div>
              )}
            </div>

            <button
              onClick={onContinue}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              다음 Stage로 계속 →
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
