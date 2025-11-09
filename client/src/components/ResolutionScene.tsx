import { motion } from "framer-motion";
import { Star, Trophy, ArrowRight } from "lucide-react";
import { useDetectiveGame } from "@/lib/stores/useDetectiveGame";
import { useState, useEffect } from "react";

interface ResolutionSceneProps {
  onContinue: () => void;
}

export function ResolutionScene({ onContinue }: ResolutionSceneProps) {
  const { score, cluesCollected, completeCase } = useDetectiveGame();

  const calculateStars = () => {
    if (score >= 40) return 3;
    if (score >= 25) return 2;
    return 1;
  };

  const stars = calculateStars();
  
  const [caseCompleted, setCaseCompleted] = useState(false);

  useEffect(() => {
    if (!caseCompleted) {
      completeCase(stars);
      setCaseCompleted(true);
    }
  }, [stars, completeCase, caseCompleted]);

  const getPerformanceMessage = () => {
    if (stars === 3) return "완벽한 추리입니다! 당신은 진정한 데이터 탐정입니다!";
    if (stars === 2) return "훌륭한 추리력을 보여주셨습니다!";
    return "사건을 해결했습니다. 다음에는 더 잘할 수 있을 거예요!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-amber-900/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-slate-800/90 border-2 border-amber-600/50 rounded-2xl p-8"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <Trophy className="w-20 h-20 text-amber-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-amber-100 mb-2">사건 해결!</h1>
          <p className="text-slate-300">{getPerformanceMessage()}</p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3].map((starNum) => (
            <motion.div
              key={starNum}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.5 + starNum * 0.2,
                type: "spring",
                stiffness: 200
              }}
            >
              <Star
                className={`w-16 h-16 ${
                  starNum <= stars
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-600 text-slate-600"
                }`}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-slate-900/50 rounded-lg p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-amber-200 mb-4">사건 요약</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <span className="text-slate-300">획득 점수</span>
              <span className="text-amber-400 font-bold text-lg">{score} 점</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <span className="text-slate-300">수집한 단서</span>
              <span className="text-blue-400 font-bold">{cluesCollected.length} 개</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <span className="text-slate-300">등급</span>
              <span className="text-amber-400 font-bold">
                {stars === 3 ? "S급 탐정" : stars === 2 ? "A급 탐정" : "B급 탐정"}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="bg-amber-900/30 border border-amber-600/50 rounded-lg p-4 mb-6"
        >
          <h4 className="text-amber-200 font-semibold mb-2">🎯 핵심 교훈</h4>
          <p className="text-amber-100 text-sm">
            데이터의 급격한 변화는 항상 원인이 있습니다. 시스템 로그와 권한 기록을 확인하면 
            숨겨진 조작을 발견할 수 있습니다. 데이터 분석가는 숫자 뒤의 진실을 찾는 탐정입니다!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="space-y-3"
        >
          <button
            onClick={onContinue}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            다음 사건으로
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-3 rounded-lg transition-colors"
          >
            메인 메뉴로
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
