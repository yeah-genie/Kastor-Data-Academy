import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, ExternalLink, Info, List } from "lucide-react";

interface EvidenceBoardProps {
  onClose: () => void;
  onSwitchToList: () => void;
}

export function EvidenceBoard({ onClose, onSwitchToList }: EvidenceBoardProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [boardId, setBoardId] = useState(() => {
    return localStorage.getItem('miro_board_id') || '';
  });
  const [tempBoardId, setTempBoardId] = useState(boardId);

  const handleSaveBoardId = () => {
    localStorage.setItem('miro_board_id', tempBoardId);
    setBoardId(tempBoardId);
    setShowSettings(false);
  };

  const getMiroEmbedUrl = (id: string) => {
    if (!id) return '';
    return `https://miro.com/app/live-embed/${id}/?autoplay=true&embedMode=view_only`;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800/90 border-b border-slate-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-slate-100">Evidence Board</h2>
          <span className="text-sm text-slate-400">powered by Miro</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchToList}
            className="px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 flex items-center gap-2"
            title="Switch to List View"
          >
            <List className="w-5 h-5" />
            <span className="hidden md:inline">List View</span>
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-100"
          >
            Close
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 border-b border-slate-700 p-4"
        >
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Miro Board Settings</h3>
            <p className="text-sm text-slate-400 mb-4">
              Enter your Miro board ID to connect your evidence board.
            </p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Board ID
                </label>
                <input
                  type="text"
                  value={tempBoardId}
                  onChange={(e) => setTempBoardId(e.target.value)}
                  placeholder="e.g., uXjVKBxxxxx="
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                  <p className="font-medium mb-1">How to get your Board ID:</p>
                  <ol className="list-decimal list-inside space-y-1 text-slate-400">
                    <li>Go to <a href="https://miro.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">miro.com</a> and create a board</li>
                    <li>Click "Share" → "Get embed code"</li>
                    <li>Copy the board ID from the URL (after /live-embed/)</li>
                  </ol>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveBoardId}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setTempBoardId(boardId);
                    setShowSettings(false);
                  }}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Miro Embed */}
      <div className="flex-1 relative">
        {boardId ? (
          <iframe
            src={getMiroEmbedUrl(boardId)}
            className="w-full h-full border-0"
            allowFullScreen
            title="Miro Evidence Board"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md p-8">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">
                Connect Your Miro Board
              </h3>
              <p className="text-slate-400 mb-6">
                Click the settings icon above to enter your Miro board ID and start organizing your evidence.
              </p>
              <button
                onClick={() => setShowSettings(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white font-medium"
              >
                Setup Board
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
