import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DataVisualization as DataVizType } from "@/data/case1-story";
import { BarChart3, Table2, ScrollText } from "lucide-react";

interface DataVisualizationProps {
  visualization: DataVizType;
}

export function DataVisualization({ visualization }: DataVisualizationProps) {
  const renderChart = () => {
    const { data } = visualization;
    const chartData = data.labels.map((label: string, index: number) => {
      const point: any = { name: label };
      data.datasets.forEach((dataset: any) => {
        point[dataset.label] = dataset.data[index];
      });
      return point;
    });

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#f3f4f6'
            }}
          />
          <Legend />
          {data.datasets.map((dataset: any, index: number) => (
            <Line
              key={index}
              type="monotone"
              dataKey={dataset.label}
              stroke={dataset.color}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderTable = () => {
    const { data } = visualization;
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-600">
              {data.headers.map((header: string, index: number) => (
                <th key={index} className="text-left px-3 py-2 text-slate-300 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row: string[], rowIndex: number) => (
              <tr key={rowIndex} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-2 text-slate-200">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderLog = () => {
    const { data } = visualization;
    return (
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {data.entries.map((entry: any, index: number) => (
          <div
            key={index}
            className="bg-slate-800/50 border border-slate-600/30 rounded px-3 py-2 font-mono text-xs"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-slate-400">{entry.time}</span>
              <span className="text-blue-400">{entry.user}</span>
              <span className="text-slate-300">{entry.action}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                entry.status === "성공" || entry.status.includes("성공") 
                  ? "bg-green-900/50 text-green-300" 
                  : "bg-red-900/50 text-red-300"
              }`}>
                {entry.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getIcon = () => {
    switch (visualization.type) {
      case "chart":
        return <BarChart3 className="w-5 h-5" />;
      case "table":
        return <Table2 className="w-5 h-5" />;
      case "log":
        return <ScrollText className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-800/80 border border-slate-600/50 rounded-lg p-4 my-4"
    >
      <div className="flex items-center gap-2 mb-4 text-amber-400">
        {getIcon()}
        <h3 className="font-semibold">{visualization.title}</h3>
      </div>
      
      <div className="bg-slate-900/50 rounded-lg p-4">
        {visualization.type === "chart" && renderChart()}
        {visualization.type === "table" && renderTable()}
        {visualization.type === "log" && renderLog()}
      </div>
    </motion.div>
  );
}
