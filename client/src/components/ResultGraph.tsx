import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
// import { RechartsDevtools } from "@recharts/devtools";
import { useTheme } from "../context/useTheme";
import type { TypingResult } from "../types/typingResult";

export default function ResultGraph({ result }: { result: TypingResult }) {
  const { isDark } = useTheme();
  const data = result.avgWpmPerSecondArr.map((wpm, index) => ({
    second: index + 1,
    wpm: wpm,
    burst: result.burstPerSecondArr[index],
  }));
  const allValues = [
    ...result.avgWpmPerSecondArr,
    ...result.burstPerSecondArr,
  ];
  const maxValue = Math.max(...allValues);
  const upperLimit = Math.ceil(maxValue / 20) * 20;
  const step = upperLimit / 4;
  const ticks = [
    0,
    step,
    step * 2,
    step * 3,
    upperLimit,
  ];

  return (
    <div className="h-full">
      <div className="flex gap-x-5 justify-center">
        <div className="flex gap-x-2 items-center">
          <div>WPM</div>
          <div className="text-3xl text-color1">{result.wpm}</div>
        </div>
        <div className="flex gap-x-2 items-center">
          <div>Raw Accuracy</div>
          <div className="text-3xl text-color1">{result.rawAccuracy}%</div>
        </div>
      </div>
      <div className="w-full max-w-5xl mx-auto h-[350px]">
        {!isDark && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid stroke="#C9C9C9" strokeDasharray="3 3" />
              <XAxis stroke="#828282" strokeWidth={1} dataKey="second" />
              <YAxis stroke="#828282" strokeWidth={1} dataKey="wpm" domain={[0, upperLimit]} ticks={ticks} />
              {/* domain={[0, 200]} */}
              <Tooltip
                labelFormatter={() => ``}
                cursor={{
                  stroke: "#FB923C",
                  strokeWidth: 2,
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  backgroundColor: "#EDEDED",
                  border: "none",
                  borderRadius: "8px",
                  color: "#000",
                }}
                itemStyle={{ color: "#000000" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="burst"
                stroke="#D6D6D6"
                strokeWidth={2}
                dot={{ r: 2, fill: "#BDBDBD", strokeWidth: 0 }}
                activeDot={{ r: 3, fill: "#BDBDBD", stroke: "#BDBDBD", strokeWidth: 1 }}
              />
              <Line
                type="natural"
                dataKey="wpm"
                stroke="#FB923C"
                strokeWidth={3}
                dot={{ r: 2.5, fill: "#FB8323", strokeWidth: 1 }}
                activeDot={{ r: 4, fill: "#FB8323", stroke: "#FB8323", strokeWidth: 1 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {isDark && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid stroke="#444" strokeDasharray="3 3" />
              <XAxis stroke="#707070" strokeWidth={1} dataKey="second" />
              <YAxis stroke="#707070" strokeWidth={1} dataKey="wpm" domain={[0, upperLimit]} ticks={ticks} />
              {/*  */}
              <Tooltip
                labelFormatter={() => ``}
                cursor={{
                  stroke: "#FB923C",
                  strokeWidth: 2,
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  backgroundColor: "#333333",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="burst"
                stroke="#4D4D4D"
                strokeWidth={2}
                dot={{ r: 2, fill: "#737373", strokeWidth: 0 }}
                activeDot={{ r: 3, fill: "#737373", stroke: "#737373", strokeWidth: 1 }}
              />
              <Line
                type="natural"
                dataKey="wpm"
                stroke="#FB923C"
                strokeWidth={3}
                dot={{ r: 2.5, fill: "#FBA760", strokeWidth: 1 }}
                activeDot={{ r: 4, fill: "#FBA760", stroke: "#FBA760", strokeWidth: 1 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <h1 className="text-xl font-bold mt-4">Your Results</h1>
      <p>Typed Text: {result.typedText}</p>
      <p>Burst: {result.burstPerSecondArr.join(", ")}</p>

    </div>
  );
}
