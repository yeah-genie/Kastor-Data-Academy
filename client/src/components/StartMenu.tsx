import { motion } from "framer-motion";
import { Play, Info, Lock, Star } from "lucide-react";
import { useDetectiveGame } from "@/lib/stores/useDetectiveGame";
import { caseMetadata } from "@/data/stories";

export function StartMenu() {
  const { startCase, unlockedCases, achievements, totalScore } = useDetectiveGame();

  const getCaseStars = (caseId: number) => {
    const perfectAchievement = `case${caseId}_perfect`;
    return achievements.includes(perfectAchievement) ? 3 : 0;
  };

  const isCaseUnlocked = (caseId: number) => {
    return unlockedCases.includes(caseId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900/20 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="text-6xl font-bold text-amber-400 mb-4 tracking-wide">KASTOR</h1>
          <p className="text-xl text-slate-300 mb-2">데이터 탐정 게이미피케이션</p>
          <p className="text-sm text-slate-400">데이터로 진실을 밝혀라</p>
          
          {totalScore > 0 && (
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <div className="bg-slate-800/70 px-4 py-2 rounded-lg border border-amber-600/30">
                <span className="text-slate-400">총점: </span>
                <span className="text-amber-400 font-bold">{totalScore}</span>
              </div>
              <div className="bg-slate-800/70 px-4 py-2 rounded-lg border border-amber-600/30">
                <span className="text-slate-400">업적: </span>
                <span className="text-blue-400 font-bold">{achievements.length}</span>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/80 border-2 border-amber-600/50 rounded-2xl p-8 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold text-amber-300 mb-6 text-center">사건 목록</h2>

          <div className="space-y-4">
            {[1, 2, 3].map((caseId, index) => {
              const metadata = caseMetadata[caseId];
              const isUnlocked = isCaseUnlocked(caseId);
              const stars = getCaseStars(caseId);

              return (
                <motion.div
                  key={caseId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={isUnlocked ? { scale: 1.02 } : {}}
                  whileTap={isUnlocked ? { scale: 0.98 } : {}}
                  className={`rounded-xl p-6 border-2 ${
                    isUnlocked
                      ? "bg-slate-700/60 border-slate-600 cursor-pointer hover:border-amber-500/50 transition-colors"
                      : "bg-slate-700/30 border-slate-600/50 opacity-60 cursor-not-allowed"
                  }`}
                  onClick={() => isUnlocked && startCase(caseId)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl filter">
                      {isUnlocked ? "📁" : <Lock className="w-10 h-10 text-slate-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-lg font-bold ${isUnlocked ? "text-amber-200" : "text-slate-500"}`}>
                          사건 #{caseId.toString().padStart(3, "0")}
                        </h3>
                        {isUnlocked ? (
                          <span className="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded font-semibold">
                            플레이 가능
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded font-semibold">
                            잠금
                          </span>
                        )}
                        {stars > 0 && (
                          <div className="flex gap-0.5">
                            {[...Array(stars)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        )}
                      </div>
                      <h4 className={`text-xl font-semibold mb-2 ${isUnlocked ? "text-white" : "text-slate-500"}`}>
                        {metadata.title}
                      </h4>
                      <p className={`text-sm mb-3 ${isUnlocked ? "text-slate-300" : "text-slate-500"}`}>
                        {isUnlocked ? metadata.description : "이전 사건을 해결하면 잠금이 해제됩니다."}
                      </p>
                      {isUnlocked && (
                        <div className="flex gap-2 text-xs flex-wrap">
                          {metadata.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">
                              {tag}
                            </span>
                          ))}
                          <span className="px-2 py-1 bg-amber-900/50 text-amber-300 rounded">
                            {metadata.difficulty}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 bg-amber-900/30 border border-amber-600/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-100">
                <p className="font-semibold mb-1">게임 방법</p>
                <p>
                  캐릭터와의 대화를 읽고, 제시된 데이터를 분석하세요. 질문에 올바른 답을 선택하면 단서를
                  얻고 점수를 획득합니다. 모든 단서를 모아 사건을 해결하세요!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-slate-500 text-sm mt-6"
        >
          학습 목표: 데이터 추론력 향상 | 대상: 초·중등 학생 (12-15세)
        </motion.p>
      </motion.div>
    </div>
  );
}
