import {
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { AverageAccuracyCustomTooltip } from "./AverageAccuracyCustomTooltip";

interface ScatterPoint {
  x: number;
  y: number;
  date: string;
}

interface AverageAccuracyScatterChartProps {
  data: ScatterPoint[];
}

export default function AverageAccuracyScatterChart({
  data,
}: AverageAccuracyScatterChartProps) {
  const maxAccuracy = Math.max(...data.map((d) => d.y));

  return (
    <div
      style={{
        width: "100%",
        height: 280,
        padding: 10,
        borderRadius: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="x"
            type="number"
            allowDecimals={false}
            tick={false}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Timeline",
              position: "insideBottom",
              offset: -2,
              fill: "#6B7280",
            }}
          />

          <YAxis
            dataKey="y"
            type="number"
            width={35}
            domain={[0, Math.ceil(maxAccuracy / 10) * 10]}
            tick={{ fill: "#6B7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Accuracy",
              angle: -90,
              position: "insideLeft",
              fill: "#6B7280",
              dx: -10,
              dy: 25,
            }}
          />

          <Tooltip
            cursor={{ stroke: "#C607F3", strokeDasharray: "3 3" }}
            content={<AverageAccuracyCustomTooltip />}
          />

          {/* Connecting line */}
          <Line
            type="monotone"
            dataKey="y"
            stroke="#C607F3"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy, payload } = props;
              const isMax = payload.y === maxAccuracy;

              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={isMax ? 3 : 2.5}
                  fill={isMax ? "#8EE600" : "#C607F3"}
                />
              );
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
