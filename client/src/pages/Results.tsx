import Navbar from "../components/Navbar";
import { useTheme } from "../context/useTheme";
import ResultGraph from "../components/ResultGraph";
import useButtonNavigator from "../hooks/useButtonNavigator";
import { useTitle } from "../hooks/useTitle";
import { useLocation, useNavigate } from "react-router-dom";
import type { TypingResult } from "../types/typingResult";
import { useMe } from "../hooks/useMe";
import { useTests } from "../hooks/useTests";
import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

const Results = () => {
  const { data: user } = useMe();
  const { addTest } = useTests();
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state as TypingResult | null;
  const { isDark } = useTheme();
  useTitle("Results");
  useButtonNavigator({
    targetKey: "Escape",
    targetPath: "/typingtest",
    onBeforeNavigate: () => {
      queryClient.invalidateQueries({
        queryKey: ["tokens"],
      });
    },
  });
  const queryClient = useQueryClient();

  const hasRun = useRef(false);
  useEffect(() => {
    if (!user || !data || hasRun.current) return;
    hasRun.current = true;
    addTest({
      id: user.id,
      wpm: data.wpm,
      accuracy:
        data.totalCharsTyped > 0
          ? ((data.totalCharsTyped - data.wrongCharsTyped) * 100) /
            data.totalCharsTyped
          : 0,
      raw_accuracy: data.rawAccuracy,
      total_chars_typed: data.totalCharsTyped,
      correct_chars: data.totalCharsTyped - data.wrongCharsTyped,
      test_time: data.testTime,
      difficulty: data.difficulty,
    });
  }, [user, data, addTest]);

  if (!data) {
    navigate("/");
    return null;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // BACKSPACE
    if (e.key === "Backspace") {
      e.preventDefault();
      navigate("/");
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      data-theme={isDark ? "dark" : ""}
      className="font-poppins h-screen bg-bgcolor text-textcolor"
    >
      <Navbar />
      <div className="pt-7">
        <ResultGraph result={data} />
      </div>
    </div>
  );
};
export default Results;
