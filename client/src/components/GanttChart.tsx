import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Clock, CheckCircle, X } from "lucide-react";

interface TeamMember {
  name: string;
  startTime: number;
  endTime: number;
  hours: number;
  color: string;
  isCorrect?: boolean;
}

interface GanttChartProps {
  title: string;
  members: TeamMember[];
  question: string;
  correctAnswer: string;
  onComplete: (selectedMember: string, isCorrect: boolean) => void;
}

export function GanttChart({ title, members, question, correctAnswer, onComplete }: GanttChartProps) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const minTime = Math.min(...members.map(m => m.startTime));
  const maxTime = Math.max(...members.map(m => m.endTime));
  const timeRange = maxTime - minTime;

  const getBarPosition = (startTime: number, endTime: number) => {
    const start = ((startTime - minTime) / timeRange) * 100;
    const width = ((endTime - startTime) / timeRange) * 100;
    return { left: `${start}%`, width: `${width}%` };
  };

  const formatTime = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  const timeLabels = [];
  for (let i = minTime; i <= maxTime; i += 2) {
    timeLabels.push(i);
  }
  if (!timeLabels.includes(maxTime)) {
    timeLabels.push(maxTime);
  }

  const handleBarClick = (member: TeamMember) => {
    if (showFeedback) return;

    const correct = member.name === correctAnswer;
    setSelectedMember(member.name);
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onComplete(member.name, correct);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-2xl p-4 my-3 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-4 text-gray-700">
        <Clock className="w-4 h-4" />
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-700 font-medium mb-4">{question}</p>
        <p className="text-xs text-blue-600">💡 Click on a team member's work bar to select your answer</p>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <div className="flex justify-between mb-2 px-32">
            {timeLabels.map((time, idx) => (
              <div key={idx} className="text-xs text-gray-500 font-medium">
                {formatTime(time)}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {members.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-semibold text-gray-800 flex-shrink-0">
                    {member.name}
                  </div>
                  
                  <div className="flex-1 relative h-12 bg-gray-100 rounded-lg">
                    <motion.button
                      onClick={() => handleBarClick(member)}
                      disabled={showFeedback}
                      whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                      whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                      className={`absolute h-full rounded-lg shadow-md transition-all ${
                        showFeedback
                          ? selectedMember === member.name
                            ? isCorrect
                              ? 'bg-green-500 cursor-default'
                              : 'bg-red-400 cursor-default'
                            : 'bg-gray-300 cursor-default opacity-50'
                          : 'cursor-pointer hover:shadow-lg'
                      }`}
                      style={{
                        ...getBarPosition(member.startTime, member.endTime),
                        backgroundColor: showFeedback 
                          ? selectedMember === member.name
                            ? isCorrect ? '#22c55e' : '#f87171'
                            : '#d1d5db'
                          : member.color
                      }}
                    >
                      <div className="flex items-center justify-center h-full px-3">
                        <span className="text-white font-bold text-sm">
                          {member.hours}h
                        </span>
                        {showFeedback && selectedMember === member.name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-2"
                          >
                            {isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : (
                              <X className="w-5 h-5 text-white" />
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  </div>
                </div>

                <div className="ml-28 mt-1 text-xs text-gray-500">
                  {formatTime(member.startTime)} - {formatTime(member.endTime)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 p-4 rounded-xl ${
              isCorrect
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`font-semibold text-sm ${
                  isCorrect ? 'text-green-900' : 'text-red-900'
                }`}>
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </p>
                <p className={`text-sm mt-1 ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCorrect
                    ? `${selectedMember} worked ${members.find(m => m.name === selectedMember)?.hours} hours that day.`
                    : `${correctAnswer} actually worked the longest with ${members.find(m => m.name === correctAnswer)?.hours} hours.`
                  }
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
