import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle, GripVertical } from "lucide-react";
import { useState } from "react";

interface TimelineEvent {
  id: string;
  timestamp: string;
  description: string;
  actor: string;
  correctPosition: number;
}

interface TimelineReconstructionProps {
  data: {
    events: TimelineEvent[];
  };
  onComplete: (isCorrect: boolean) => void;
}

export function TimelineReconstruction({ data, onComplete }: TimelineReconstructionProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([...data.events]);
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const playSound = (soundName: string) => {
    try {
      const audio = new Audio(`/sounds/${soundName}.mp3`);
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (error) {}
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newEvents = [...events];
    [newEvents[index - 1], newEvents[index]] = [newEvents[index], newEvents[index - 1]];
    setEvents(newEvents);
    playSound("click");
  };

  const handleMoveDown = (index: number) => {
    if (index === events.length - 1) return;
    const newEvents = [...events];
    [newEvents[index], newEvents[index + 1]] = [newEvents[index + 1], newEvents[index]];
    setEvents(newEvents);
    playSound("click");
  };

  const handleSubmit = () => {
    let errorCount = 0;
    events.forEach((event, index) => {
      if (event.correctPosition !== index + 1) {
        errorCount++;
      }
    });

    setMistakes(errorCount);
    setShowResult(true);
    setIsComplete(true);

    if (errorCount === 0) {
      playSound("success");
    } else {
      playSound("warning-beep");
    }

    setTimeout(() => {
      onComplete(errorCount === 0);
    }, 2000);
  };

  const isEventCorrect = (event: TimelineEvent, index: number) => {
    if (!showResult) return null;
    return event.correctPosition === index + 1;
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📅 Arrange Events in Chronological Order
        </h2>
        <p className="text-gray-600">
          Drag events to reorder them from earliest to latest
        </p>
        <p className="text-sm text-gray-500 mt-2">
          💡 Hint: Read the timestamps carefully!
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-3 mb-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`relative p-4 rounded-lg border-2 ${
              isEventCorrect(event, index) === true
                ? "border-green-500 bg-green-50"
                : isEventCorrect(event, index) === false
                ? "border-red-500 bg-red-50"
                : "border-gray-300 bg-white"
            }`}
          >
            {/* Position Number */}
            <div className="absolute left-2 top-2 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              {index + 1}
            </div>

            {/* Result Indicator */}
            {showResult && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2"
              >
                {isEventCorrect(event, index) ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                    ✗
                  </div>
                )}
              </motion.div>
            )}

            {/* Event Content */}
            <div className="ml-12 mr-24">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-mono text-gray-600">{event.timestamp}</span>
              </div>
              <div className="font-semibold text-gray-800">{event.description}</div>
              <div className="text-sm text-gray-600 mt-1">Actor: {event.actor}</div>
            </div>

            {/* Move Controls */}
            {!isComplete && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className={`p-1 rounded ${
                    index === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-600"
                  }`}
                >
                  ▲
                </motion.button>
                <GripVertical className="w-5 h-5 text-gray-400" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleMoveDown(index)}
                  disabled={index === events.length - 1}
                  className={`p-1 rounded ${
                    index === events.length - 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-600"
                  }`}
                >
                  ▼
                </motion.button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Result Message */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-lg mb-4 ${
              mistakes === 0
                ? "bg-green-50 border-2 border-green-500"
                : mistakes <= 2
                ? "bg-yellow-50 border-2 border-yellow-500"
                : "bg-red-50 border-2 border-red-500"
            }`}
          >
            <div className="text-center font-semibold">
              {mistakes === 0 && (
                <span className="text-green-700">
                  🎉 Perfect chronological order! +30 points
                </span>
              )}
              {mistakes > 0 && mistakes <= 2 && (
                <span className="text-yellow-700">
                  👍 Close! {mistakes} mistakes. +{Math.max(0, 30 - mistakes * 5)} points
                </span>
              )}
              {mistakes > 2 && (
                <span className="text-red-700">
                  🤔 {mistakes} mistakes. Review the timestamps! +{Math.max(0, 30 - mistakes * 5)} points
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      {!isComplete && (
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Check Order
          </motion.button>
        </div>
      )}
    </div>
  );
}
