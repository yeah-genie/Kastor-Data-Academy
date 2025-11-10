import { motion } from "framer-motion";

interface TypingIndicatorProps {
  speaker?: string;
}

export function TypingIndicator({ speaker = "typing" }: TypingIndicatorProps) {
  const isDetective = speaker === "detective";
  
  const getSpeakerName = () => {
    switch (speaker) {
      case "detective":
        return "Detective";
      case "maya":
        return "Maya";
      case "chris":
        return "Chris";
      case "ryan":
        return "Ryan";
      default:
        return "Someone";
    }
  };

  const getSpeakerAvatar = () => {
    switch (speaker) {
      case "detective":
        return "/detective.jpg";
      case "maya":
        return "/characters/maya.jpg";
      case "chris":
        return "/characters/chris.jpg";
      case "ryan":
        return "/characters/ryan.jpg";
      default:
        return null;
    }
  };

  const avatarUrl = getSpeakerAvatar();

  return (
    <motion.div
      initial={{ opacity: 0, x: isDetective ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isDetective ? 20 : -20 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2 ${isDetective ? 'flex-row-reverse' : ''}`}
    >
      <div className="flex-shrink-0">
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={getSpeakerName()} 
            className="w-10 h-10 md:w-8 md:h-8 rounded-full object-cover object-center"
          />
        ) : (
          <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-xs">💬</span>
          </div>
        )}
      </div>

      <div className={`flex flex-col max-w-[80%] md:max-w-[75%] ${isDetective ? 'items-end' : 'items-start'}`}>
        <div className="text-xs md:text-[11px] text-gray-500 mb-1 px-2">
          {getSpeakerName()} is typing...
        </div>
        <div className={`${
          isDetective 
            ? 'bg-blue-500 rounded-2xl rounded-tr-sm' 
            : 'bg-white border border-gray-200 rounded-2xl rounded-tl-sm'
        } px-4 py-3 md:py-2`}>
          <div className="flex gap-1 items-center">
            <motion.div
              className={`w-2 h-2 ${isDetective ? 'bg-white/70' : 'bg-gray-400'} rounded-full`}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className={`w-2 h-2 ${isDetective ? 'bg-white/70' : 'bg-gray-400'} rounded-full`}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className={`w-2 h-2 ${isDetective ? 'bg-white/70' : 'bg-gray-400'} rounded-full`}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
