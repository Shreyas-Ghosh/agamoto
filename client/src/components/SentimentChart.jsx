import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

function SentimentChart({ data }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Sentiment Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} />
          <YAxis domain={[-1, 1]} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
            labelStyle={{ color: '#f9fafb' }}
          />
          <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="4 4" />
          <Line
            type="monotone"
            dataKey="sentiment"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SentimentChart;