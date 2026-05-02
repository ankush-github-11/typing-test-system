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

  return (
    <div className="h-full">
      <div className="flex gap-x-5 justify-center">
        <div className="flex gap-x-2 items-center">
          <div>WPM:</div>
          <div className="text-2xl text-color1">{result.wpm}</div>
        </div>
        <div className="flex gap-x-2 items-center">
          <div>Raw Accuracy: </div>
          <div className="text-2xl text-color1">{result.rawAccuracy}%</div>
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto h-[350px]">
        {!isDark && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid stroke="#C9C9C9" strokeDasharray="3 3" />
              <XAxis stroke="#828282" strokeWidth={2} dataKey="second" />
              <YAxis stroke="#828282" strokeWidth={2} dataKey="wpm" />{" "}
              {/* domain={[0, 200]} */}
              <Tooltip
                labelFormatter={(label) => `second: ${label}`}
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
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend />
              <Line
                type="natural"
                dataKey="burst"
                stroke="#BABABA"
                strokeWidth={2}
              />
              <Line
                type="natural"
                dataKey="wpm"
                stroke="#FB923C"
                strokeWidth={3}
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
              <XAxis stroke="#707070" strokeWidth={2} dataKey="second" />
              <YAxis stroke="#707070" strokeWidth={2} dataKey="wpm" />{" "}
              {/* domain={[0, 200]} */}
              <Tooltip
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
                labelStyle={{ color: "#9ca3af" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend />
              <Line
                type="natural"
                dataKey="burst"
                stroke="#4D4D4D"
                strokeWidth={2}
              />
              <Line
                type="natural"
                dataKey="wpm"
                stroke="#FB923C"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <h1 className="text-xl font-bold mt-4">Your Results</h1>
      <p>Typed Text: {result.typedText}</p>
    </div>
  );
}
