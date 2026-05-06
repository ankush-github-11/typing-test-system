import {
  ComposedChart,
  Line,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
// import { RechartsDevtools } from "@recharts/devtools";
import { useTheme } from "../context/useTheme";
import type { TypingResult } from "../types/typingResult";

type ScatterPointProps = {
  cx?: number;
  cy?: number;
  payload?: {
    errors: number;
  };
};

export default function ResultGraph({ result }: { result: TypingResult }) {
  const { isDark } = useTheme();
  const data = result.avgWpmPerSecondArr.map((wpm, index) => ({
    second: index + 1,
    wpm: wpm,
    burst: result.burstPerSecondArr[index],
    rawWpm: result.rawWpmPerSecondArr[index],
    errors: result.wrongCharsPerSecondArr[index],
  }));
  const allValues = [
    ...result.avgWpmPerSecondArr,
    ...result.burstPerSecondArr,
    ...result.rawWpmPerSecondArr,
    ...result.wrongCharsPerSecondArr,
  ];
  const maxValue = Math.max(...allValues);
  const upperLimit = Math.ceil(maxValue / 20) * 20;
  const step = upperLimit / 4;
  const ticks = [0, step, step * 2, step * 3, upperLimit];

  const errorValues = result.wrongCharsPerSecondArr;
  const maxError = errorValues.length > 0 ? Math.max(...errorValues) : 0;
  const errorUpperLimit = Math.max(8, Math.ceil(maxError / 4) * 4);
  const errorStep = errorUpperLimit / 4;
  const errorTicks = [
    0,
    errorStep,
    errorStep * 2,
    errorStep * 3,
    errorUpperLimit,
  ];
  return (
    <div className="h-full">
      <div className="flex gap-x-5 justify-center">
        <div className="flex gap-x-2 items-center">
          <div className="font-semibold text-2xl">WPM</div>
          <div className="font-semibold text-5xl text-color1">{result.wpm}</div>
        </div>
        <div className="flex gap-x-2 items-center">
          <div className="font-semibold text-2xl">Accuracy</div>
          <div className="font-semibold text-5xl text-color1">
            {result.totalCharsTyped > 0 ? Math.round(((result.totalCharsTyped - result.wrongCharsTyped) / result.totalCharsTyped) * 100) : 0}%
          </div>
        </div>
      </div>
      <div
        className="rounded-full w-full max-w-6xl mx-auto h-[350px]"
        onMouseDown={(e) => e.preventDefault()}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              stroke={isDark ? "#444" : "#C9C9C9"}
              strokeDasharray="3 3"
            />

            <XAxis
              stroke={isDark ? "#696969" : "#A8A8A8"}
              strokeWidth={1}
              dataKey="second"
            />

            <YAxis
              yAxisId="left"
              stroke={isDark ? "#696969" : "#A8A8A8"}
              strokeWidth={1}
              domain={[0, upperLimit]}
              ticks={ticks}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={isDark ? "#696969" : "#A8A8A8"}
              strokeWidth={1}
              domain={[0, errorUpperLimit]}
              ticks={errorTicks}
            />

            <Tooltip
              labelFormatter={() => ``}
              cursor={{
                stroke: "#FB923C",
                strokeWidth: 2,
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                backgroundColor: isDark ? "#333333" : "#EDEDED",
                border: "none",
                borderRadius: "8px",
                color: isDark ? "#fff" : "#000",
              }}
              itemStyle={{ color: isDark ? "#fff" : "#000" }}
            />

            <Line
              yAxisId="left"
              type="monotone"
              name="Burst"
              dataKey="burst"
              stroke={isDark ? "#4D4D4D" : "#D6D6D6"}
              strokeWidth={2}
              dot={{
                r: 2,
                fill: isDark ? "#737373" : "#BDBDBD",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 3,
                fill: isDark ? "#737373" : "#BDBDBD",
                stroke: isDark ? "#737373" : "#BDBDBD",
                strokeWidth: 1,
              }}
            />

            <Line
              yAxisId="left"
              type="monotone"
              name="Raw"
              dataKey="rawWpm"
              stroke="#FB923C"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={{
                r: 2,
                fill: isDark ? "#FBA760" : "#FB8323",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 3,
                fill: isDark ? "#FBA760" : "#FB8323",
                stroke: isDark ? "#FBA760" : "#FB8323",
                strokeWidth: 1,
              }}
            />

            <Line
              yAxisId="left"
              type="monotone"
              name="Wpm"
              dataKey="wpm"
              stroke="#FB923C"
              strokeWidth={3}
              dot={{
                r: 2.5,
                fill: isDark ? "#FBA760" : "#FB8323",
                strokeWidth: 1,
              }}
              activeDot={{
                r: 4,
                fill: isDark ? "#FBA760" : "#FB8323",
                stroke: isDark ? "#FBA760" : "#FB8323",
                strokeWidth: 1,
              }}
            />

            <Scatter
              name="Errors"
              yAxisId="right"
              dataKey="errors"
              shape={(props: ScatterPointProps) => {
                const { cx, cy, payload } = props;

                if (cx == null || cy == null) return null;

                // 👇 hide when errors = 0
                if (!payload || payload.errors === 0) return null;

                return <circle cx={cx} cy={cy} r={2.5} fill="#E00006" />;
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex gap-x-6 justify-center">
          <div className="flex items-center gap-x-2">
            <div className="h-[4px] w-5 bg-[#FB923C] dark:bg-[#FB923C]" />
            <p>WPM</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex gap-x-[3px]">
              <div className="h-[2px] w-2 bg-[#FB923C] dark:bg-[#FB923C]" />
              <div className="h-[2px] w-2 bg-[#FB923C] dark:bg-[#FB923C]" />
              <div className="h-[2px] w-2 bg-[#FB923C] dark:bg-[#FB923C]" />
            </div>
            <p>Raw</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="h-1 w-5 bg-[#D6D6D6] dark:bg-[#4D4D4D]" />
            <p>Burst</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="rounded-full h-[7px] w-[7px] bg-[#E00006] dark:bg-[#E00006]" />
            <p>Wrong</p>
          </div>
        </div>
      </div>

      <h1 className="text-xl font-bold mt-4">Your Results</h1>
      <p>Typed Text: {result.typedText}</p>
      <p>Wrong Characters: {result.wrongCharsTyped}</p>
      <p>Total Characters: {result.totalCharsTyped}</p>
    </div>
  );
}
