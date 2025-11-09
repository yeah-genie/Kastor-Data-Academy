import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TutorialStep {
  id: string;
  message: string;
  position: "top" | "center" | "bottom";
  highlightElement?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    message: "Welcome to Kastor! Tap anywhere to continue the story and uncover clues.",
    position: "center",
  },
  {
    id: "send",
    message: "Use this button to advance the conversation and reveal new messages.",
    position: "bottom",
    highlightElement: "send-button",
  },
  {
    id: "notebook",
    message: "Your notebook stores all collected evidence, clues, and character profiles. Check it anytime!",
    position: "top",
    highlightElement: "notebook-button",
  },
];

interface TutorialOverlayProps {
  onComplete: () => void;
}

export function TutorialOverlay({ onComplete }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 300);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const step = tutorialSteps[currentStep];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={handleNext}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Tutorial content */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* Skip button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSkip();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tap to continue indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-white text-center"
            >
              <p className="text-xl font-bold mb-2">Tap to continue</p>
              <div className="flex justify-center gap-1">
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Tutorial message */}
          <div
            className={`absolute left-0 right-0 flex justify-center px-4 ${
              step.position === "top"
                ? "top-20"
                : step.position === "bottom"
                ? "bottom-32"
                : "top-1/3"
            }`}
          >
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl max-w-sm relative"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-base leading-relaxed">{step.message}</p>

              {/* Arrow pointer */}
              {step.position === "bottom" && (
                <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-green-500" />
              )}
              {step.position === "top" && (
                <div className="absolute -top-2 right-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-green-500" />
              )}
            </motion.div>
          </div>

          {/* Step indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep ? "bg-white w-6" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
