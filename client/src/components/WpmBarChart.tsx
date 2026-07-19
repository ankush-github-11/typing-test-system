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
import { WpmCustomTooltip } from "./WpmCustomTooltip";

interface DataPoint {
  range: string;
  count: number;
}

interface WpmBarChartProps {
  data: DataPoint[];
}

export default function WpmBarChart({ data }: WpmBarChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 4);
  const maxValue = Math.max(...data.map((d) => d.count));
  return (
    <div
      style={{
        width: "100%",
        height: 280,
        padding: 10,
        display: "flex",
        alignItems: "center",
        borderRadius: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#5f5f5f"
          />

          <XAxis
            dataKey="range"
            tick={{ fill: "#6B7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            width={25}
            domain={[0, maxCount]}
            allowDecimals={false}
            ticks={Array.from({ length: maxCount + 1 }, (_, i) => i)}
            tick={{ fill: "#6B7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(99,102,241,0.08)" }}
            content={<WpmCustomTooltip />}
          />

          <Bar dataKey="count" radius={[8, 8, 0, 0]} animationDuration={800}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.count === maxValue ? "#8EE600" : "#c607f3"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
