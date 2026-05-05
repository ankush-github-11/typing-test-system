import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
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
    rawWpm: result.rawWpmPerSecondArr[index],
  }));
  const allValues = [
    ...result.avgWpmPerSecondArr,
    ...result.burstPerSecondArr,
    ...result.rawWpmPerSecondArr,
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
          <div>Accuracy</div>
          <div className="text-3xl text-color1">{result.totalCharsTyped > 0 ? Math.round((result.totalCharsTyped - result.wrongCharsTyped) / result.totalCharsTyped * 100) : 0}%</div>
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
              <Line
                type="monotone"
                name="Burst"
                dataKey="burst"
                stroke="#D6D6D6"
                strokeWidth={2}
                dot={{ r: 2, fill: "#BDBDBD", strokeWidth: 0 }}
                activeDot={{ r: 3, fill: "#BDBDBD", stroke: "#BDBDBD", strokeWidth: 1 }}
              />
              <Line
                type="natural"
                dataKey="rawWpm"
                name="Raw"
                stroke="#FB923C"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={{ r: 2, fill: "#FB8323", strokeWidth: 0 }}
                activeDot={{ r: 3, fill: "#FB8323", stroke: "#FB8323", strokeWidth: 1 }}
              />
              <Line
                type="natural"
                dataKey="wpm"
                name="Wpm"
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
              <Line
                type="monotone"
                name="Burst"
                dataKey="burst"
                stroke="#4D4D4D"
                strokeWidth={2}
                dot={{ r: 2, fill: "#737373", strokeWidth: 0 }}
                activeDot={{ r: 3, fill: "#737373", stroke: "#737373", strokeWidth: 1 }}
              />
              <Line
                type="natural"
                name="Raw"
                dataKey="rawWpm"
                stroke="#FB923C"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={{ r: 2, fill: "#FBA760", strokeWidth: 0 }}
                activeDot={{ r: 3, fill: "#FBA760", stroke: "#FBA760", strokeWidth: 1 }}
              />
              <Line
                type="natural"
                name="Wpm"
                dataKey="wpm"
                stroke="#FB923C"
                strokeWidth={3}
                dot={{ r: 2.5, fill: "#FBA760", strokeWidth: 1 }}
                activeDot={{ r: 4, fill: "#FBA760", stroke: "#FBA760", strokeWidth: 1 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
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
        </div>
      </div>

      <h1 className="text-xl font-bold mt-4">Your Results</h1>
      <p>Typed Text: {result.typedText}</p>
      <p>Wrong Characters: {result.wrongCharsTyped}</p>
      <p>Total Characters: {result.totalCharsTyped}</p>
    </div>
  );
}
