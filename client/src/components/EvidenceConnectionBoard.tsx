import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Link as LinkIcon, Eye, List, Network } from "lucide-react";

interface EvidenceNode {
  id: string;
  label: string;
  type: 'evidence' | 'data' | 'conclusion';
  color: string;
  description?: string;
}

interface Connection {
  from: string;
  to: string;
}

interface EvidenceConnectionBoardProps {
  nodes: EvidenceNode[];
  correctConnections: Connection[];
  title: string;
  instructions: string;
  onComplete: (correct: boolean) => void;
}

type ViewMode = 'list' | 'network';

export function EvidenceConnectionBoard({
  nodes,
  correctConnections,
  title,
  instructions,
  onComplete,
}: EvidenceConnectionBoardProps) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connectionMode, setConnectionMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const handleNodeTap = (nodeId: string) => {
    if (submitted) return;

    if (!connectionMode) {
      if (expandedNode === nodeId) {
        setExpandedNode(null);
      } else {
        setExpandedNode(nodeId);
      }
    } else {
      if (selectedNode === null) {
        setSelectedNode(nodeId);
      } else {
        if (selectedNode !== nodeId) {
          const newConnection: Connection = {
            from: selectedNode,
            to: nodeId,
          };

          const alreadyExists = connections.some(
            (conn) =>
              (conn.from === selectedNode && conn.to === nodeId) ||
              (conn.from === nodeId && conn.to === selectedNode)
          );

          if (!alreadyExists) {
            setConnections([...connections, newConnection]);
          }
        }
        setSelectedNode(null);
        setConnectionMode(false);
      }
    }
  };

  const removeConnection = (index: number) => {
    if (!submitted) {
      setConnections(connections.filter((_, i) => i !== index));
    }
  };

  const checkConnections = () => {
    const normalizedUserConnections = connections.map((conn) => ({
      from: conn.from,
      to: conn.to,
    }));

    const allCorrect = correctConnections.every((correctConn) =>
      normalizedUserConnections.some(
        (userConn) =>
          (userConn.from === correctConn.from && userConn.to === correctConn.to) ||
          (userConn.from === correctConn.to && userConn.to === correctConn.from)
      )
    );

    const noExtraConnections = normalizedUserConnections.length === correctConnections.length;

    return allCorrect && noExtraConnections;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const isCorrect = checkConnections();

    if (isCorrect) {
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    }
  };

  const getNodeById = (id: string) => nodes.find((node) => node.id === id);

  const getConnectionsForNode = (nodeId: string) => {
    return connections.filter((conn) => conn.from === nodeId || conn.to === nodeId);
  };

  const getConnectedNodeIds = (nodeId: string) => {
    const nodeConnections = getConnectionsForNode(nodeId);
    return nodeConnections.map(conn => conn.from === nodeId ? conn.to : conn.from);
  };

  const groupedNodes = {
    evidence: nodes.filter((n) => n.type === 'evidence'),
    data: nodes.filter((n) => n.type === 'data'),
    conclusion: nodes.filter((n) => n.type === 'conclusion'),
  };

  const renderEvidenceCard = (node: EvidenceNode) => {
    const nodeConnections = getConnectionsForNode(node.id);
    const isSelected = selectedNode === node.id;
    const isExpanded = expandedNode === node.id;
    const isConnected = nodeConnections.length > 0;

    return (
      <motion.div
        key={node.id}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-2 rounded-lg overflow-hidden transition-all ${
          isSelected
            ? 'border-blue-500 bg-blue-50'
            : isConnected
            ? 'border-purple-400 bg-purple-50'
            : 'border-gray-300 bg-white'
        }`}
      >
        <div
          onClick={() => handleNodeTap(node.id)}
          className="p-4 cursor-pointer active:bg-gray-100 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: node.color }}
                />
                <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                  {node.label}
                </h4>
              </div>
              {node.description && isExpanded && (
                <p className="text-xs text-gray-600 mt-2">{node.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {isConnected && (
                <div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded-full">
                  <LinkIcon className="w-3 h-3 text-purple-600" />
                  <span className="text-xs font-semibold text-purple-600">
                    {nodeConnections.length}
                  </span>
                </div>
              )}
              {isSelected && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>

          {isExpanded && isConnected && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Connected to:</p>
              <div className="space-y-1">
                {getConnectedNodeIds(node.id).map(connectedId => {
                  const connectedNode = getNodeById(connectedId);
                  return connectedNode ? (
                    <div key={connectedId} className="flex items-center gap-2 text-xs">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: connectedNode.color }}
                      />
                      <span className="text-gray-700">{connectedNode.label}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderNetworkView = () => {
    const nodePositions = new Map<string, { x: number; y: number }>();
    
    nodes.forEach((node, index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);
      nodePositions.set(node.id, {
        x: col * 100 + 50,
        y: row * 80 + 40,
      });
    });

    return (
      <div className="bg-white border border-gray-300 rounded-lg p-4 overflow-x-auto">
        <svg width="100%" height="400" className="min-w-[300px]">
          {connections.map((conn, index) => {
            const fromPos = nodePositions.get(conn.from);
            const toPos = nodePositions.get(conn.to);
            if (!fromPos || !toPos) return null;

            return (
              <line
                key={index}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke="#9333ea"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            );
          })}
          
          {nodes.map((node) => {
            const pos = nodePositions.get(node.id);
            if (!pos) return null;
            const nodeConnections = getConnectionsForNode(node.id);

            return (
              <g key={node.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="20"
                  fill={nodeConnections.length > 0 ? node.color : '#e5e7eb'}
                  stroke={nodeConnections.length > 0 ? '#9333ea' : '#9ca3af'}
                  strokeWidth="2"
                />
                <text
                  x={pos.x}
                  y={pos.y + 30}
                  textAnchor="middle"
                  className="text-[10px] fill-gray-700"
                  style={{ maxWidth: '60px' }}
                >
                  {node.label.substring(0, 8)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-800">{instructions}</p>
        <div className="mt-3 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-blue-100">
          <p className="text-xs text-gray-700 font-medium mb-2">📱 How to use:</p>
          <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
            <li>Tap "Connect Evidence" button below</li>
            <li>Tap a card to select it (blue checkmark)</li>
            <li>Tap another card to create connection</li>
            <li>Repeat until all connections are made</li>
          </ol>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setViewMode('list')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all ${
            viewMode === 'list'
              ? 'bg-white text-blue-600 shadow-sm font-semibold'
              : 'text-gray-600'
          }`}
        >
          <List className="w-4 h-4" />
          <span className="text-sm">List</span>
        </button>
        <button
          onClick={() => setViewMode('network')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all ${
            viewMode === 'network'
              ? 'bg-white text-purple-600 shadow-sm font-semibold'
              : 'text-gray-600'
          }`}
        >
          <Network className="w-4 h-4" />
          <span className="text-sm">Network</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {Object.entries(groupedNodes).map(([type, typeNodes]) => (
              <div key={type} className="space-y-2">
                <h4 className="text-sm font-bold text-gray-700 capitalize px-2 flex items-center gap-2">
                  {type === 'evidence' && '🔍'}
                  {type === 'data' && '📊'}
                  {type === 'conclusion' && '💡'}
                  <span>{type === 'evidence' ? 'Evidence' : type === 'data' ? 'Data' : 'Conclusions'}</span>
                </h4>
                <div className="space-y-2">
                  {typeNodes.map((node) => renderEvidenceCard(node))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="network"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderNetworkView()}
          </motion.div>
        )}
      </AnimatePresence>

      {connections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-purple-600" />
              Connections Made ({connections.length})
            </h4>
          </div>
          <div className="space-y-2">
            {connections.map((conn, index) => {
              const fromNode = getNodeById(conn.from);
              const toNode = getNodeById(conn.to);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between bg-white border border-purple-200 rounded-lg px-3 py-2"
                >
                  <div className="flex items-center gap-2 text-xs flex-1 min-w-0">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: fromNode?.color }}
                    />
                    <span className="font-medium text-gray-900 truncate">
                      {fromNode?.label}
                    </span>
                    <span className="text-purple-400 flex-shrink-0">→</span>
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: toNode?.color }}
                    />
                    <span className="font-medium text-gray-900 truncate">
                      {toNode?.label}
                    </span>
                  </div>
                  {!submitted && (
                    <button
                      onClick={() => removeConnection(index)}
                      className="text-gray-400 hover:text-red-500 p-1 ml-2 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      <div className="sticky bottom-0 bg-white pt-2 pb-4 space-y-2">
        {!submitted && (
          <>
            <button
              onClick={() => {
                setConnectionMode(!connectionMode);
                if (connectionMode) setSelectedNode(null);
              }}
              disabled={submitted}
              className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                connectionMode
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {connectionMode ? (
                <>
                  <X className="w-5 h-5" />
                  Cancel Connection
                </>
              ) : (
                <>
                  <LinkIcon className="w-5 h-5" />
                  Connect Evidence
                </>
              )}
            </button>

            {connections.length >= correctConnections.length && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Submit Connections
              </motion.button>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {connectionMode && selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-2xl z-50"
          >
            <p className="text-sm font-semibold mb-1">First card selected:</p>
            <p className="text-xs opacity-90">{getNodeById(selectedNode)?.label}</p>
            <p className="text-xs mt-2 opacity-75">Now tap another card to connect</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-4 flex items-center justify-center z-50 p-4`}
          >
            <div
              className={`w-full max-w-md p-6 rounded-2xl shadow-2xl ${
                checkConnections()
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300'
                  : 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                {checkConnections() ? (
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-7 h-7 text-white" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <X className="w-7 h-7 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {checkConnections() ? 'Perfect!' : 'Not quite right'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {checkConnections()
                      ? 'All connections are correct!'
                      : 'Some connections need adjustment'}
                  </p>
                </div>
              </div>
              {!checkConnections() && (
                <>
                  <p className="text-sm text-gray-700 mb-4">
                    Review the evidence relationships carefully. Think about how each piece connects to the story.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setConnections([]);
                    }}
                    className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
                  >
                    Reset and Try Again
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
