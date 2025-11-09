import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import { useDetectiveGame } from "@/lib/stores/useDetectiveGame";

export function StartMenu() {
  const { startCase } = useDetectiveGame();

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
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/80 border-2 border-amber-600/50 rounded-2xl p-8 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold text-amber-300 mb-6 text-center">사건 목록</h2>

          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-slate-700/60 border border-slate-600 rounded-xl p-6 cursor-pointer hover:border-amber-500/50 transition-colors"
              onClick={() => startCase(1)}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">📁</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-amber-200">사건 #001</h3>
                    <span className="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded font-semibold">
                      플레이 가능
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    실종된 밸런스 패치
                  </h4>
                  <p className="text-sm text-slate-300 mb-3">
                    인기 온라인 게임에서 특정 캐릭터의 승률이 비정상적으로 급등했습니다. 
                    승률 그래프와 패치 로그를 분석하여 내부자의 조작을 밝혀내세요!
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded">데이터 분석</span>
                    <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded">로그 추적</span>
                    <span className="px-2 py-1 bg-amber-900/50 text-amber-300 rounded">초급</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-6 opacity-60"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl filter grayscale">📁</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-400">사건 #002</h3>
                    <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded font-semibold">
                      곧 출시
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-400 mb-2">
                    유령 유저의 랭킹 조작
                  </h4>
                  <p className="text-sm text-slate-400">
                    존재하지 않는 사용자가 랭킹 최상위에 등장했습니다...
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-6 opacity-60"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl filter grayscale">📁</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-400">사건 #003</h3>
                    <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded font-semibold">
                      곧 출시
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-400 mb-2">
                    숨겨진 알고리즘의 비밀
                  </h4>
                  <p className="text-sm text-slate-400">
                    특정 유저에게만 유리한 매칭 시스템이 발견되었습니다...
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 bg-amber-900/30 border border-amber-600/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-100">
                <p className="font-semibold mb-1">게임 방법</p>
                <p>캐릭터와의 대화를 읽고, 제시된 데이터를 분석하세요. 질문에 올바른 답을 선택하면 단서를 얻고 점수를 획득합니다. 모든 단서를 모아 사건을 해결하세요!</p>
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
