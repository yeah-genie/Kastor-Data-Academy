import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BaseEvidenceCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function BaseEvidenceCard({ children, delay = 0, className = "" }: BaseEvidenceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}
