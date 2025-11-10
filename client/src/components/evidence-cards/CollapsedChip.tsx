import { Users, BarChart3, MessageSquare, Image as ImageIcon, FileText } from "lucide-react";
import { EvidenceType } from "@/lib/stores/useDetectiveGame";

interface CollapsedChipProps {
  type: EvidenceType;
  title: string;
  onClick?: () => void;
}

export function CollapsedChip({ type, title, onClick }: CollapsedChipProps) {
  const getNodeColor = () => {
    switch (type) {
      case "CHARACTER": return "bg-gradient-to-br from-blue-400 to-blue-600 text-white border-blue-300";
      case "DATA": return "bg-gradient-to-br from-green-400 to-green-600 text-white border-green-300";
      case "DIALOGUE": return "bg-gradient-to-br from-purple-400 to-purple-600 text-white border-purple-300";
      case "PHOTO": return "bg-gradient-to-br from-pink-400 to-pink-600 text-white border-pink-300";
      case "DOCUMENT": return "bg-gradient-to-br from-orange-400 to-orange-600 text-white border-orange-300";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "CHARACTER": return <Users className="w-3 h-3 md:w-4 md:h-4" />;
      case "DATA": return <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />;
      case "DIALOGUE": return <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />;
      case "PHOTO": return <ImageIcon className="w-3 h-3 md:w-4 md:h-4" />;
      case "DOCUMENT": return <FileText className="w-3 h-3 md:w-4 md:h-4" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer select-none ${getNodeColor()} rounded-xl p-2 md:p-3 shadow-lg hover:shadow-xl transition-all border-2 w-28 md:w-36`}
    >
      <div className="flex items-center gap-1.5 md:gap-2 mb-1">
        {getIcon()}
        <span className="text-[10px] md:text-xs font-bold opacity-90 uppercase tracking-wide">{type}</span>
      </div>
      <p className="text-xs md:text-sm font-medium line-clamp-2 leading-tight">{title}</p>
    </div>
  );
}
