import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trophy, Star, Clock, Check, X } from "lucide-react";
import { useDetectiveGame, Grade } from "@/lib/stores/useDetectiveGame";
import { motion } from "framer-motion";

interface CaseEvaluationScreenProps {
  onContinue: () => void;
}

export function CaseEvaluationScreen({ onContinue }: CaseEvaluationScreenProps) {
  const { getCaseStats, calculateGrade } = useDetectiveGame();
  const [stats, setStats] = useState(getCaseStats());
  const [grade, setGrade] = useState<Grade>("C");
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const finalStats = getCaseStats();
    const finalGrade = calculateGrade();
    setStats(finalStats);
    setGrade(finalGrade);

    setTimeout(() => setShowStats(true), 500);
  }, []);

  const getGradeColor = (grade: Grade) => {
    switch (grade) {
      case "S":
        return "text-yellow-500";
      case "A":
        return "text-green-500";
      case "B":
        return "text-blue-500";
      case "C":
        return "text-slate-500";
    }
  };

  const getGradeMessage = (grade: Grade) => {
    switch (grade) {
      case "S":
        return "Outstanding Detective Work!";
      case "A":
        return "Excellent Investigation!";
      case "B":
        return "Good Work, Detective!";
      case "C":
        return "Case Solved, But Room for Improvement";
    }
  };

  const StatLine = ({ label, value, total, delay }: { label: string; value: number; total: number; delay: number }) => {
    const isComplete = value === total;
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700"
      >
        <span className="font-medium">{label}:</span>
        <div className="flex items-center gap-2">
          <span className={`font-bold ${isComplete ? "text-green-500" : "text-slate-500"}`}>
            {value} / {total}
          </span>
          {isComplete ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <X className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <div className={`text-8xl font-bold ${getGradeColor(grade)}`}>
              {grade}
            </div>
          </motion.div>
          <CardTitle className="text-2xl">{getGradeMessage(grade)}</CardTitle>
          <p className="text-muted-foreground">Case #001: The Missing Balance Patch</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {showStats && (
            <>
              <div className="space-y-2">
                <StatLine
                  label="Evidence Collected"
                  value={stats.evidenceCollected}
                  total={stats.totalEvidence}
                  delay={0.1}
                />
                <StatLine
                  label="Logic Connections Made"
                  value={stats.logicConnectionsMade}
                  total={stats.totalLogicConnections}
                  delay={0.2}
                />
                <StatLine
                  label="Contradictions Found"
                  value={stats.contradictionsFound}
                  total={stats.totalContradictions}
                  delay={0.3}
                />

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700"
                >
                  <span className="font-medium">Interview Accuracy:</span>
                  <span className={`font-bold ${stats.interviewAccuracy === 100 ? "text-green-500" : "text-slate-500"}`}>
                    {stats.interviewAccuracy}%
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-between py-3"
                >
                  <span className="font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time Taken:
                  </span>
                  <span className="font-bold">{stats.timeTaken}</span>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 text-center"
              >
                <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                <h3 className="font-bold text-xl mb-2">Final Grade: {grade} RANK</h3>
                <div className="flex justify-center gap-1">
                  {["S", "A", "B", "C"].map((g) => (
                    <Star
                      key={g}
                      className={`w-6 h-6 ${
                        g <= grade ? "text-yellow-500 fill-yellow-500" : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              {grade === "S" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-500 rounded-lg p-4 text-center"
                >
                  <p className="font-bold text-yellow-900 dark:text-yellow-100">
                    🎊 Perfect Score! You are a true Data Detective!
                  </p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Button onClick={onContinue} className="w-full" size="lg">
                  Continue
                </Button>
              </motion.div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
