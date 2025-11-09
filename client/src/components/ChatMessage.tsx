import { motion } from "framer-motion";
import { User, Users, FileText, Eye } from "lucide-react";
import { Message } from "@/data/case1-story";
import { useEffect } from "react";
import { useAudio } from "@/lib/stores/useAudio";

interface ChatMessageProps {
  message: Message;
  index: number;
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  const { playMessageSound } = useAudio();
  
  useEffect(() => {
    playMessageSound();
  }, []);
  
  const getAvatar = () => {
    switch (message.speaker) {
      case "detective":
        return <Eye className="w-5 h-5" />;
      case "client":
        return <User className="w-5 h-5" />;
      case "narrator":
        return <FileText className="w-5 h-5" />;
      case "system":
        return <Users className="w-5 h-5" />;
    }
  };

  const getSpeakerName = () => {
    switch (message.speaker) {
      case "detective":
        return "탐정";
      case "client":
        return "의뢰인";
      case "narrator":
        return "";
      case "system":
        return "";
    }
  };

  const getMessageStyle = () => {
    if (message.speaker === "system") {
      return "bg-amber-900/30 border border-amber-600/50 text-amber-100 text-center font-bold py-3";
    }
    if (message.speaker === "narrator") {
      return "bg-slate-800/50 border border-slate-600/30 text-slate-300 italic text-center";
    }
    if (message.speaker === "detective") {
      return "bg-blue-900/40 border border-blue-600/50 text-blue-100 ml-auto";
    }
    return "bg-slate-700/60 border border-slate-500/50 text-slate-100";
  };

  const shouldShowAvatar = message.speaker === "detective" || message.speaker === "client";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.3, duration: 0.4 }}
      className={`flex gap-3 items-start ${message.speaker === "detective" ? "flex-row-reverse" : ""}`}
    >
      {shouldShowAvatar && (
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          message.speaker === "detective" ? "bg-blue-700" : "bg-slate-600"
        }`}>
          {getAvatar()}
        </div>
      )}
      
      <div className={`flex-1 ${!shouldShowAvatar ? "ml-0" : ""}`}>
        {shouldShowAvatar && (
          <div className={`text-xs text-slate-400 mb-1 ${message.speaker === "detective" ? "text-right" : ""}`}>
            {getSpeakerName()}
          </div>
        )}
        <div className={`rounded-lg px-4 py-3 max-w-[85%] ${message.speaker === "detective" ? "ml-auto" : ""} ${getMessageStyle()}`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>
      </div>
    </motion.div>
  );
}
