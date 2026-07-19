import { useLeaderboard } from "../hooks/useLeaderboard";
import { useState } from "react";
import Loader from "./Loader";
import useMinimumLoader from "../hooks/useMinimumLoader";

const LeaberboardTable = () => {
  const [selectedDuration, setSelectedDuration] = useState<15 | 30 | 60 | 120>(
    15,
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard"
  >("easy");
  const {
    leaderboard = [],
    isLoading,
    isError,
  } = useLeaderboard({
    duration: selectedDuration,
    difficulty: selectedDifficulty,
  });

  const showPageLoader = useMinimumLoader(isLoading);
  if (isError) {
    return <div>Error loading leaderboard</div>;
  }
  return (
    <div className="px-[10vw]">
      <p className="font-semibold text-[45px] py-3">Leaderboard of <span className="text-color1">{selectedDuration}s, {selectedDifficulty}</span></p>
      <div className="flex gap-x-5 justify-center min-h-screen">
        <div className="h-fit flex flex-col gap-y-5">
          <div className="h-fit w-50">
            <div className="w-full h-fit">
              <div className="w-fit h-fit bg-bgcolorless px-5 py-3 rounded-t-lg">
                Difficulty
              </div>
              <div className="bg-bgcolorless rounded-lg rounded-tl-[0px] p-2 flex flex-col gap-y-2">
                <div
                  onClick={() => setSelectedDifficulty("easy")}
                  className={`h-fit px-5 py-3 cursor-pointer rounded-lg transition-[background-color] ${
                    selectedDifficulty === "easy"
                      ? "bg-color1 text-white"
                      : "hover:bg-lightgray"
                  }`}
                >
                  Easy
                </div>

                <div
                  onClick={() => setSelectedDifficulty("medium")}
                  className={`h-fit px-5 py-3 cursor-pointer rounded-lg transition-[background-color] ${
                    selectedDifficulty === "medium"
                      ? "bg-color1 text-white"
                      : "hover:bg-lightgray"
                  }`}
                >
                  Medium
                </div>

                <div
                  onClick={() => setSelectedDifficulty("hard")}
                  className={`h-fit px-5 py-3 cursor-pointer rounded-lg transition-[background-color] ${
                    selectedDifficulty === "hard"
                      ? "bg-color1 text-white"
                      : "hover:bg-lightgray"
                  }`}
                >
                  Hard
                </div>
              </div>
            </div>
          </div>
          <div className="h-fit w-50">
            <div className="w-full h-fit">
              <div className="w-fit h-fit bg-bgcolorless px-5 py-3 rounded-t-lg">
                Duration
              </div>
              <div className="bg-bgcolorless rounded-lg rounded-tl-[0px] p-2 flex flex-col gap-y-2">
                <div
                  onClick={() => setSelectedDuration(15)}
                  className={`h-fit px-5 py-3 cursor-pointer rounded-lg transition-[background-color] ${
                    selectedDuration === 15
                      ? "bg-color1 text-white"
                      : "hover:bg-lightgray"
                  }`}
                >
                  15
                </div>

                <div
                  onClick={() => setSelectedDuration(30)}
                  className={`h-fit px-5 py-3 cursor-pointer rounded-lg transition-[background-color] ${
                    selectedDuration === 30
                      ? "bg-color1 text-white"
                      : "hover:bg-lightgray"
                  }`}
                >
                  30
                </div>

                <div
                  onClick={() => setSelectedDuration(60)}
                  className={`h-fit px-5 py-3 cursor-pointer rounded-lg transition-[background-color] ${
                    selectedDuration === 60
                      ? "bg-color1 text-white"
                      : "hover:bg-lightgray"
                  }`}
                >
                  60
                </div>
                <div
                  onClick={() => setSelectedDuration(120)}
                  className={`h-fit px-5 py-3 cursor-pointer rounded-lg transition-[background-color] ${
                    selectedDuration === 120
                      ? "bg-color1 text-white"
                      : "hover:bg-lightgray"
                  }`}
                >
                  120
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl w-full p-4">
          {/* Header */}
          <div className="grid grid-cols-[80px_2fr_1fr_1fr_80px_1fr_1fr] font-bold border-b-2 border-color1/50 py-3">
            <div>Rank</div>
            <div>Email</div>
            <div>WPM</div>
            <div>Accuracy</div>
            <div>Time</div>
            <div>Difficulty</div>
            <div>Date</div>
          </div>
          {showPageLoader ? (
            <div className="h-20 flex justify-center items-center">
              <Loader />
            </div>
          ) : !leaderboard.length ? (
            <div className="h-20 text-center py-6">
              No leaderboard entries found
            </div>
          ) : (
            leaderboard.map((entry, index) => (
              <div
                key={`${entry.id}-${entry.created_at}`}
                className={`px-6 rounded-xl grid grid-cols-[80px_2fr_1fr_1fr_80px_1fr_1fr] py-3 text-textcolorless items-center ${
                  index % 2 === 1 ? "bg-bgcolorless" : ""
                }`}
              >
                <div>{index + 1}</div>
                <div>{entry.email}</div>
                <div>{entry.wpm}</div>
                <div>{entry.accuracy}%</div>
                <div>{entry.test_time}s</div>
                <div>{entry.difficulty}</div>
                <div>
                  {new Date(entry.created_at).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaberboardTable;
