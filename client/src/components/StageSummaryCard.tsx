import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Users, Search, Scale } from "lucide-react";
import { Button } from "./ui/button";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto mb-6"
    >
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
              <StageIcon className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-400">
                Stage {summary.stage} Complete
              </h3>
              <p className="text-sm text-slate-300">{summary.title}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              핵심 발견사항
            </h4>
            <ul className="space-y-2">
              {summary.keyFindings.map((finding, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-slate-200"
                >
                  <span className="text-amber-400 mt-1">•</span>
                  <span className="text-sm leading-relaxed">{finding}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-700">
            <div className="text-sm text-slate-400">
              수집된 증거: <span className="text-amber-400 font-semibold">{summary.evidenceCount}</span>개
            </div>
            {summary.nextStageHint && (
              <div className="text-xs text-slate-500 italic max-w-xs text-right">
                💡 {summary.nextStageHint}
              </div>
            )}
          </div>

          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
          >
            다음 Stage로 계속 →
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
