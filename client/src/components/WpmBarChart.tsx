import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

export interface DataPoint {
  range: string;
  count: number;
}

interface WpmBarChartProps {
  data: DataPoint[];
}

const colors = [
  "#c607f3"
];

export default function WpmBarChart({ data }: WpmBarChartProps) {
  return (
    <div
      style={{
        width: "100%",
        height: 330,
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          marginBottom: 20,
          fontWeight: 600,
        }}
      >
        WPM Distribution
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />

          <XAxis
            dataKey="range"
            tick={{ fill: "#6B7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#6B7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(99,102,241,0.08)" }}
            contentStyle={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            }}
          />

          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}