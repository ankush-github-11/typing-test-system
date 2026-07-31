import {
  ResponsiveContainer,
  ComposedChart,
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
  const minTime = Math.min(...data.map((d) => d.x));
  const maxTime = Math.max(...data.map((d) => d.x));

  return (
    <div
      className="bg-bgcolorless shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2)] border-1 border-gray/50"
      style={{
        width: "100%",
        height: 280,
        padding: 10,
        borderRadius: 8,
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
            domain={[minTime, maxTime]}
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
            width={55}
            domain={[0, Math.ceil(maxAccuracy / 10) * 10]}
            tick={{ fill: "#6B7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Accuracy",
              angle: -90,
              position: "insideLeft",
              fill: "#6B7280",
              dx: 3,
              dy: 32,
            }}
          />

          <Tooltip
            cursor={{ stroke: "#C607F3", strokeDasharray: "3 3" }}
            content={<AverageAccuracyCustomTooltip maxAverageAccuracyCount={maxAccuracy} />}
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
                  r={isMax ? 2 : 0}
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
