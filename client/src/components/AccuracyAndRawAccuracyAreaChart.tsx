import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AccuracyAndRawAccuracyCustomTooltip } from "./AccuracyAndRawAccuracyCustomTooltip";

interface DataPoint {
  range: string;
  accuracyCount: number;
  rawAccuracyCount: number;
}

interface AccuracyAreaChartProps {
  data: DataPoint[];
}

export default function AccuracyAreaChart({
  data,
}: AccuracyAreaChartProps) {
  const maxCount = Math.max(
    ...data.map((d) => Math.max(d.accuracyCount, d.rawAccuracyCount)),
    4
  );

  return (
    <div
      className="w-full h-[280px] rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] p-3"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="rawAccuracyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#696969" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#696969" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c607f3" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#c607f3" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(107,114,128,0.2)"
            vertical={false}
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
            cursor={{ stroke: "#c607f3", strokeWidth: 1 }}
            content={<AccuracyAndRawAccuracyCustomTooltip />}
          />

          <Area
            type="monotone"
            dataKey="rawAccuracyCount"
            stroke="#696969"
            strokeWidth={2}
            fill="url(#rawAccuracyGradient)"
            fillOpacity={1}
            animationDuration={800}
            activeDot={{ r: 5 }}
          />
          <Area
            type="monotone"
            dataKey="accuracyCount"
            stroke="#c607f3"
            strokeWidth={3}
            fill="url(#accuracyGradient)"
            fillOpacity={1}
            animationDuration={800}
            activeDot={{ r: 5 }}
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}