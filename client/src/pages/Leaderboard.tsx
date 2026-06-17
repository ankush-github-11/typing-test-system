import Navbar from "../components/Navbar";
import { useTheme } from "../context/useTheme";
import { useTitle } from "../hooks/useTitle";
import { useLeaderboard } from "../hooks/useLeaderboard";

const Leaderboard = () => {
  const { isDark } = useTheme();
  useTitle("Leaderboard");
  const { leaderboard = [], isLoading, isError } = useLeaderboard();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load leaderboard data</div>;
  }
  return (
    <div
      data-theme={isDark ? "dark" : ""}
      className="bg-bgcolor text-textcolor font-poppins w-full"
    >
      <Navbar />
      <div className="w-full max-w-5xl mx-auto p-4">
        {/* Header */}
        <div className="grid grid-cols-[80px_2fr_1fr_1fr_120px] font-bold border-b-2 border-gray-400 py-3">
          <div>Rank</div>
          <div>Name</div>
          <div>WPM</div>
          <div>Accuracy</div>
          <div>Difficulty</div>
        </div>

        {/* Rows */}
        {leaderboard.map((entry, index) => (
          <div
            key={`${entry.id}-${entry.created_at}`}
            className="grid grid-cols-[80px_2fr_1fr_1fr_120px] py-3"
          >
            <div>{index + 1}</div>
            <div>{entry.email}</div>
            <div>{entry.wpm}</div>
            <div>{entry.accuracy}%</div>
            <div>{entry.difficulty}</div>
          </div>
        ))}

        {!leaderboard.length && (
          <div className="text-center py-6">No leaderboard entries found</div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
