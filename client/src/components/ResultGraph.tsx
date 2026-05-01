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

type TypingResult = {
  wpm: number;
  rawAccuracy: number;
  typedText: string;
  wpmPerSecondArr: number[];
};

export default function ResultGraph({ result }: { result: TypingResult }) {
  const data = result.wpmPerSecondArr.map((wpm, index) => ({
    second: index + 1,
    wpm: wpm,
  }));

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="w-full max-w-3xl mx-auto h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid stroke="#444" strokeDasharray="3 3" />

            <XAxis stroke="#707070" strokeWidth={2} dataKey="second" />
            <YAxis stroke="#707070" strokeWidth={2} dataKey="wpm" />

            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="wpm"
              stroke="#EB7C05"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h1 className="text-xl font-bold mt-4">Your Results</h1>
      <p>WPM: {result.wpm}</p>
      <p>Raw Accuracy: {result.rawAccuracy}%</p>
      <p>Typed Text: {result.typedText}</p>
    </div>
  );
}
