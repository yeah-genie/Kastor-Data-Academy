import { forwardRef } from "react";
import { BaseEvidenceCard } from "./BaseEvidenceCard";
import { DocumentEvidence } from "@/lib/stores/useDetectiveGame";
import { FileText } from "lucide-react";

interface DocumentCardProps {
  evidence: DocumentEvidence;
  delay?: number;
  isHighlighted?: boolean;
  collapsed?: boolean;
}

export const DocumentCard = forwardRef<HTMLDivElement, DocumentCardProps>(
  ({ evidence, delay = 0, isHighlighted = false, collapsed = false }, ref) => {
    if (collapsed) {
      return (
        <div className="flex items-center gap-3 p-4 min-w-[140px]">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 shadow-sm">
            <FileText className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-base font-bold text-gray-900 line-clamp-2 flex-1">{evidence.title}</p>
        </div>
      );
    }

    return (
      <BaseEvidenceCard delay={delay} isHighlighted={isHighlighted} ref={ref}>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 md:w-5 md:h-5 text-orange-600 flex-shrink-0" />
          <h4 className="font-semibold text-sm md:text-base text-gray-900 truncate">{evidence.title}</h4>
        </div>
        <p className="text-xs md:text-sm text-gray-700 whitespace-pre-line leading-relaxed">{evidence.content}</p>
      </BaseEvidenceCard>
    );
  }
);

DocumentCard.displayName = "DocumentCard";
