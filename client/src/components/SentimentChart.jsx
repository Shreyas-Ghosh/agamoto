import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

const CHART_COLORS = {
  grid: 'rgba(255, 255, 255, 0.06)',
  axis: '#666',
  line: '#818cf8',
  dot: '#818cf8',
  reference: 'rgba(255, 255, 255, 0.12)',
  tooltipBg: 'rgba(10, 5, 20, 0.95)',
  tooltipBorder: 'rgba(255, 255, 255, 0.1)',
  tooltipText: '#fff',
};

function SentimentChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
        <XAxis
          dataKey="date"
          stroke={CHART_COLORS.axis}
          tick={{ fontSize: 11, fill: '#888', fontFamily: "'Inter', sans-serif" }}
          tickLine={{ stroke: CHART_COLORS.grid }}
        />
        <YAxis
          domain={[-1, 1]}
          stroke={CHART_COLORS.axis}
          tick={{ fontSize: 11, fill: '#888', fontFamily: "'Inter', sans-serif" }}
          tickLine={{ stroke: CHART_COLORS.grid }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: CHART_COLORS.tooltipBg,
            border: `1px solid ${CHART_COLORS.tooltipBorder}`,
            borderRadius: '8px',
            padding: '10px 14px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
          }}
          labelStyle={{ color: CHART_COLORS.tooltipText, fontWeight: 500, marginBottom: '4px' }}
          itemStyle={{ color: CHART_COLORS.line }}
        />
        <ReferenceLine y={0} stroke={CHART_COLORS.reference} strokeDasharray="4 4" />
        <Line
          type="monotone"
          dataKey="sentiment"
          stroke={CHART_COLORS.line}
          strokeWidth={2}
          dot={{ fill: CHART_COLORS.dot, r: 4, strokeWidth: 0 }}
          activeDot={{ fill: '#fff', stroke: CHART_COLORS.line, strokeWidth: 2, r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SentimentChart;