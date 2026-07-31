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
  wpmCount: number;
}

interface WpmBarChartProps {
  data: DataPoint[];
}

export default function WpmBarChart({ data }: WpmBarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.wpmCount), 4);
  const getYAxisConfig = (maxValue: number) => {
    const targetTicks = 5;

    const rawStep = maxValue / targetTicks;
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));

    const normalized = rawStep / magnitude;

    let niceStep;
    if (normalized <= 1) niceStep = 1;
    else if (normalized <= 2) niceStep = 2;
    else if (normalized <= 5) niceStep = 5;
    else niceStep = 10;

    const step = niceStep * magnitude;
    const max = Math.ceil(maxValue / step) * step;

    const ticks = [];
    for (let i = 0; i <= max; i += step) {
      ticks.push(i);
    }

    return { max, ticks };
  }
  const { max, ticks } = getYAxisConfig(maxValue);
  return (
    <div
      className="bg-bgcolorless border-1 border-gray/50"
      style={{
        width: "100%",
        height: 280,
        padding: 10,
        display: "flex",
        alignItems: "center",
        borderRadius: 8,
        boxShadow: "0 8px 16px -4px rgba(0,0,0,0.2)",
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
            width={40}
            domain={[0, max]}
            ticks={ticks}
            allowDecimals={false}
            tick={{ fill: "#6B7280", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(99,102,241,0.08)" }}
            content={<WpmCustomTooltip maxWpmCount={maxValue} />}
          />

          <Bar dataKey="wpmCount" radius={[8, 8, 0, 0]} animationDuration={800}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.wpmCount === maxValue ? "#8EE600" : "#c607f3"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
